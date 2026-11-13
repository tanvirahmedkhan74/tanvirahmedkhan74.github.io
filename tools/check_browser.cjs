/* Local browser QA; reports and screenshots remain in the ignored cache. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
function dependency(name, override, cached) {
  for (const candidate of [override, name, cached].filter(Boolean)) {
    try { return require(candidate); } catch (error) { if (error.code !== 'MODULE_NOT_FOUND') throw error; }
  }
  throw new Error(`Missing optional dependency ${name}; see README.md for browser QA setup.`);
}
const { chromium } = dependency('playwright', process.env.PLAYWRIGHT_MODULE,
  path.join(root, '.cache/renovation/node_modules/playwright-core'));
let axeSource;
try { axeSource = fs.readFileSync(require.resolve(process.env.AXE_MODULE || 'axe-core/axe.min.js'), 'utf8'); }
catch {
  const cached = path.join(root, '.cache/renovation/node_modules/axe-core/axe.min.js');
  if (!fs.existsSync(cached)) throw new Error('Missing optional axe-core; see README.md.');
  axeSource = fs.readFileSync(cached, 'utf8');
}
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:8080';
const out = path.join(root, '.cache/portfolio-update/browser');
const routes = ['/', '/research/', '/publications/', '/milab/', '/cv/',
  '/research/erl/', '/research/cg-swr/', '/research/rift/', '/research/deadline-articulation/',
  '/research/pneuma/', '/research/airflow/', '/research/avatar-systems/', '/research/rsi/',
  '/research/archive/streamtalker-gs/', '/notes/', '/notes/appearance-of-wisdom/',
  '/notes/study/', '/notes/study/rank-and-collapse/', '/notes/study/gaussian-splatting/',
  '/notes/study/attention/', '/notes/study/jepa-world-models/',
  '/notes/study/collapse-diagnostics/', '/404.html'];
const widths = [320, 390, 430, 768, 1024, 1440, 1920];
const orientationRoutes = ['/', '/research/', '/publications/', '/milab/', '/research/deadline-articulation/'];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch(process.env.BROWSER_EXECUTABLE
    ? { executablePath: process.env.BROWSER_EXECUTABLE } : {});
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [], audits = [], positions = [], requests = new Set();
  page.on('pageerror', e => errors.push(e.message));
  page.on('requestfailed', r => errors.push(`${r.url()}: ${r.failure()?.errorText}`));
  page.on('request', r => requests.add(r.url()));
  try {
    for (const route of routes) {
      const slug = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
      for (const width of widths) {
        await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
        const response = await page.goto(base + route);
        assert.equal(response.status(), 200);
        await page.locator('img').evaluateAll(imgs => imgs.forEach(img => img.loading = 'eager'));
        await page.waitForFunction(() => [...document.images].every(i => i.complete));
        const layout = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          broken: [...document.images].filter(i => !i.naturalWidth).map(i => i.src),
          mathOverflow: [...document.querySelectorAll('.equation')]
            .filter(e => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflowX !== 'auto')
            .length,
          nav: [...document.querySelectorAll('.nav-menu a')].every(a => {
            const r = a.getBoundingClientRect(); return r.width > 0 && r.left >= 0 && r.right <= innerWidth + 1;
          }),
          headerHeight: document.querySelector('.site-header').getBoundingClientRect().height,
          offset: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header'))
        }));
        assert.equal(layout.overflow, false, `${route} overflows at ${width}`);
        assert.deepEqual(layout.broken, [], `${route} broken image at ${width}`);
        assert.ok(layout.nav, `${route} navigation hidden at ${width}`);
        assert.equal(layout.mathOverflow, 0, `${route} equation overflows at ${width}`);
        assert.ok(layout.headerHeight <= layout.offset + 2, `${route} sticky offset too short at ${width}`);
        if ([390, 1440].includes(width)) {
          await page.addScriptTag({ content: axeSource });
          const result = await page.evaluate(async () => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa'] } }));
          audits.push({ route, width, violations: result.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })) });
          await page.screenshot({ path: path.join(out, `${slug}-${width}.png`), fullPage: true });
        }
      }
    }
    // Header, profile, parent route, and footer clearance at real scroll positions.
    for (const route of orientationRoutes) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(base + route);
      for (const progress of [0, .5, 1]) {
        await page.evaluate(f => scrollTo(0, f * (document.documentElement.scrollHeight - innerHeight)), progress);
        const state = await page.evaluate(() => {
          const header = document.querySelector('.site-header').getBoundingClientRect();
          const profile = document.querySelector('.profile').getBoundingClientRect();
          const footer = document.querySelector('.site-footer').getBoundingClientRect();
          const location = document.querySelector('.page-location').getBoundingClientRect();
          return { header: header.top, profileTop: profile.top, profileBottom: profile.bottom, footer: footer.top,
            location: location.top, parent: !!document.querySelector('.page-location a[href]') };
        });
        assert.ok(Math.abs(state.header) < 2, `${route} header lost at ${progress}`);
        assert.ok(state.profileTop >= 65, `${route} profile overlaps header`);
        assert.ok(state.profileBottom <= state.footer + 1, `${route} profile overlaps footer`);
        assert.ok(state.location >= 64, `${route} local context overlaps header`);
        assert.ok(state.parent);
        positions.push({ route, progress, ...state });
      }
    }
    // Short-height and 200% zoom-equivalent CSS viewport: profile reflows.
    for (const viewport of [{ width: 1440, height: 600 }, { width: 720, height: 500 }, { width: 768, height: 1024 }, { width: 320, height: 600 }]) {
      await page.setViewportSize(viewport);
      await page.goto(base + '/milab/');
      assert.equal(await page.locator('.profile').evaluate(el => getComputedStyle(el).position), 'static');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
    }
    // Keyboard-accessible persistent navigation and skip link; there is no hidden menu.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + '/');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').innerText(), 'Skip to content');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'main');
    await page.locator('.contribution summary').first().focus();
    await page.keyboard.press('Enter');
    assert.ok(await page.locator('.contribution').first().evaluate(el => el.open));
    await page.locator('.nav-menu a').filter({ hasText: 'Publications', exact: true }).click();
    assert.equal(new URL(page.url()).pathname, '/publications/');
    await page.goto(base + '/milab/#rag-tools');
    const anchor = await page.locator('#rag-tools').boundingBox();
    assert.ok(anchor.y >= 145, 'Direct anchor is hidden by persistent navigation');
    await page.locator('.page-location a').first().click();
    assert.equal(new URL(page.url()).pathname, '/research/');
    await page.goBack();
    assert.equal(new URL(page.url()).hash, '#rag-tools');
    // Controlled motion, real video decoding, static reduced-motion fallback.
    await page.goto(base + '/research/deadline-articulation/');
    assert.equal(await page.locator('video').getAttribute('autoplay'), null);
    await page.locator('.animation summary').click();
    await page.locator('video').evaluate(async el => { el.load(); await new Promise((resolve, reject) => { el.onloadedmetadata = resolve; el.onerror = reject; }); });
    assert.ok(await page.locator('video').evaluate(el => el.duration > 6 && el.videoWidth === 960));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('video').isVisible(), false);
    assert.equal(await page.locator('.motion-note').isVisible(), true);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    // Preview allowlist, including newly added pages, PDF delivery and private cache exclusion.
    for (const missing of ['/missing-page/', '/README.md', '/.git/config', '/.cache/portfolio-update/content-model.md', '/assets/Tanvir_s_Resume_Latest_2/main.tex']) {
      const response = await context.request.get(base + missing);
      assert.equal(response.status(), 404, missing);
      assert.ok((await response.text()).includes('Page not found'));
    }
    const pdf = await context.request.get(base + '/assets/public/documents/Tanvir_Ahmed_Khan_CV.pdf');
    assert.equal(pdf.status(), 200);
    assert.equal((await pdf.body()).subarray(0, 5).toString(), '%PDF-');
    const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
    const plain = await nojs.newPage();
    await plain.goto(base + '/');
    await plain.locator('.nav-menu a').filter({ hasText: 'CV', exact: true }).click();
    assert.equal(new URL(plain.url()).pathname, '/cv/');
    await nojs.close();
    assert.ok([...requests].every(url => url.startsWith(base + '/')), 'Unexpected external runtime dependency');
    // A request still in flight when the next navigation starts is cancelled by the browser,
    // not broken by the site: deferred images and the tab icon abort this way, and which ones
    // do differs between runs. Each abort is re-fetched here; one that serves 200 on its own
    // was a cancellation, and anything else stays a fault.
    const faults = [], cancelled = [];
    for (const entry of errors) {
      const aborted = entry.match(/^(\S+): net::ERR_ABORTED$/);
      if (!aborted) { faults.push(entry); continue; }
      const retry = await context.request.get(aborted[1]);
      (retry.status() === 200 ? cancelled : faults).push(entry);
    }
    const report = { layouts: routes.length * widths.length, widths, audits, positions,
                     errors: faults, cancelledRequests: cancelled };
    fs.writeFileSync(path.join(out, 'browser-report.json'), JSON.stringify(report, null, 2));
    assert.deepEqual(faults, []);
    assert.equal(audits.flatMap(a => a.violations).length, 0, 'Accessibility violations; inspect browser-report.json');
    console.log(`PASS: ${report.layouts} layouts; ${audits.length} accessibility audits; scrolling, reflow, keyboard, anchors, motion, privacy and PDF.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
