/* Optional browser QA. Install playwright and @axe-core/playwright locally.
 * PREVIEW_URL, PLAYWRIGHT_MODULE, AXE_MODULE and BROWSER_EXECUTABLE may override
 * the test environment; nothing here is shipped to site visitors. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { default: AxeBuilder } = require(process.env.AXE_MODULE || '@axe-core/playwright');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:8080';
const out = path.resolve(__dirname, '../.cache/renovation');
const routes = ['/', '/research/', '/research/erl/', '/research/rift/', '/research/rsi/',
  '/research/avatar-systems/', '/research/pneuma/', '/research/airflow/',
  '/research/archive/streamtalker-gs/', '/notes/', '/cv/', '/404.html'];
const widths = [320, 390, 430, 768, 1024, 1440, 1920];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch(process.env.BROWSER_EXECUTABLE
    ? { executablePath: process.env.BROWSER_EXECUTABLE } : {});
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [], audits = [], requests = new Set();
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('requestfailed', r => errors.push(`${r.url()}: ${r.failure()?.errorText}`));
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()}: ${r.url()}`); });
  page.on('request', r => requests.add(r.url()));
  try {
    for (const route of routes) {
      const slug = route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '-').replace(/-$/, '');
      for (const width of widths) {
        await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
        await page.goto(base + route);
        // Load below-fold figures before checking intrinsic dimensions and assets.
        await page.locator('img').evaluateAll(imgs => imgs.forEach(img => img.loading = 'eager'));
        await page.waitForFunction(() => [...document.images].every(i => i.complete));
        const layout = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          broken: [...document.images].filter(i => !i.naturalWidth).map(i => i.src),
          navVisible: [...document.querySelectorAll('.nav-menu a')].every(a => {
            const r = a.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && r.right <= innerWidth;
          })
        }));
        assert.equal(layout.overflow, false, `${route} overflows at ${width}`);
        assert.deepEqual(layout.broken, [], `${route} broken image at ${width}`);
        assert.equal(layout.navVisible, true, `${route} navigation hidden at ${width}`);
        if ([390,1440].includes(width)) {
          const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
          const violations = result.violations.map(v => ({id:v.id, impact:v.impact, targets:v.nodes.map(n=>n.target)}));
          audits.push({route, width, violations});
          // Visit and decode each figure so full-page captures include raster
          // content that Chromium otherwise defers until it enters the viewport.
          for (const img of await page.locator('img').all()) {
            await img.scrollIntoViewIfNeeded();
            await img.evaluate(el => el.decode());
          }
          await page.evaluate(() => scrollTo(0,0));
          await page.screenshot({path:path.join(out,`${slug}-${width}.png`),fullPage:true});
          await page.screenshot({path:path.join(out,`${slug}-${width}-top.png`)});
        }
      }
    }
    // Native disclosure, navigation, focus, and scrolling behavior.
    await page.setViewportSize({width:390,height:844});
    await page.goto(base + '/');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').innerText(),'Skip to content');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'),'main');
    const history = page.locator('.news-history');
    await history.locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await history.getAttribute('open'),'');
    assert.equal(await history.locator('li').count(),8);
    const contribution = page.locator('.contribution').first();
    await contribution.locator('summary').focus();
    await page.keyboard.press('Space');
    assert.equal(await contribution.getAttribute('open'),'');
    await page.locator('.nav-menu a').filter({hasText:'Publications'}).click();
    assert.equal(new URL(page.url()).hash,'#publications');
    await page.locator('.nav-menu a').filter({hasText:'Research',exact:true}).click();
    assert.equal(new URL(page.url()).pathname,'/research/');
    await page.goto(base+'/research/avatar-systems/');
    const table = page.locator('.table-wrap').first();
    await table.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);
    assert.ok(await table.evaluate(el=>el.scrollLeft > 0),'Table should scroll by keyboard');
    const figureLink = '/assets/public/figures/avatar-systems/personaplex-imtalker-bridge.png';
    const imageResponse = await context.request.get(base+figureLink);
    assert.equal(imageResponse.status(),200);
    assert.ok(imageResponse.headers()['content-type'].startsWith('image/'));
    // Production behavior, including correct status and private-file exclusion.
    for(const missing of ['/missing-page/', '/README.md', '/.git/config', '/assets/Tanvir_s_Resume_Latest_2/main.tex']) {
      const response=await context.request.get(base+missing);
      assert.equal(response.status(),404,missing);
      assert.ok((await response.text()).includes('Page not found'));
    }
    const pdf=await context.request.get(base+'/assets/public/documents/Tanvir_Ahmed_Khan_CV.pdf');
    assert.equal(pdf.status(),200);
    assert.ok((await pdf.body()).subarray(0,5).toString()==='%PDF-');
    // The entire site remains operable without JavaScript.
    const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:844}});
    const plain=await nojs.newPage();
    await plain.goto(base+'/');
    await plain.locator('.news-history summary').click();
    assert.equal(await plain.locator('.news-history').getAttribute('open'),'');
    await plain.locator('.nav-menu a').filter({hasText:'CV',exact:true}).click();
    assert.equal(new URL(plain.url()).pathname,'/cv/');
    await nojs.close();
    await page.goto(base+'/');
    await page.emulateMedia({media:'print'});
    const printed=await page.locator('.news-history ol').evaluate(el=>el.getBoundingClientRect().height);
    assert.ok(printed>0,'Older news should be printable');
    assert.ok([...requests].every(url=>url.startsWith(base+'/')),'Unexpected external runtime dependency');
    const report={layouts:routes.length*widths.length, widths, audits, errors, requestedResources:requests.size};
    fs.writeFileSync(path.join(out,'browser-report.json'),JSON.stringify(report,null,2));
    assert.deepEqual(errors,[],'Browser errors');
    assert.equal(audits.flatMap(a=>a.violations).length,0,'Accessibility violations; see browser-report.json');
    console.log(`PASS: ${report.layouts} route/width layouts; ${audits.length} WCAG A/AA audits; keyboard, disclosures, no-JS navigation, print, figures, PDF, and 404 behavior.`);
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
