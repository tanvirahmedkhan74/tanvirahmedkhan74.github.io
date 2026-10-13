# Academic Portfolio — Tanvir Ahmed Khan

Static academic homepage and research-dossier site for [tanvirahmedkhan74.github.io](https://tanvirahmedkhan74.github.io/).

The site is organized around research questions, evidence, project status, and contribution boundaries. It uses semantic HTML and one shared stylesheet. There is no framework, client-side JavaScript, font service, package manager requirement, or build step.

The September 2026 renovation uses a narrow reading column, system serif typography, a restrained blue link color, and conventional bibliography entries. Research pages share the same article layout. See `RENOVATION_NOTES.md` for the editorial decisions and validation record.

## Information architecture

```text
/
├── index.html
├── cv/index.html
├── research/
│   ├── index.html
│   ├── erl/
│   ├── rift/
│   ├── rsi/
│   ├── avatar-systems/
│   ├── pneuma/
│   ├── airflow/
│   └── archive/streamtalker-gs/
├── notes/
├── assets/public/
│   ├── css/main.css
│   ├── documents/
│   ├── figures/
│   └── images/
├── 404.html
├── robots.txt
├── sitemap.xml
└── tools/                   # local preview and validation
```

## Public asset policy

Only `assets/public/**` is intended for publication as website assets. The rest of the local `assets/` tree contains research records, source PDFs, academic material, and working files. `.gitignore` excludes new files there, but does not untrack existing files; check the tracked file list before publication. Hiding a file from site navigation is not a privacy control.

See `PUBLIC_ASSET_RISK_AUDIT.md` before adding or moving any asset.

## Local preview

From the repository root, run (Python 3.9 or newer):

```text
python tools/preview.py --port 8080
```

Then open `http://127.0.0.1:8080/`. This local-only server exposes the public HTML routes, public assets, and site metadata, and serves the custom 404 page for other paths. It does not serve private working documents or directory listings. Root-relative links require a server rather than opening files directly from disk. The same HTML/CSS/assets are the production site; no compilation is required.

## Validation

Run `python tools/check_site.py` to check all public pages, local links and anchors, image metadata, heading order, HTML nesting, accessibility references, canonical/social metadata, JSON-LD, and the sitemap. This check uses only the Python standard library.

Optional browser testing uses Playwright and axe-core. With a preview server running, install these development tools in the ignored cache directory:

```text
npm install --prefix .cache/renovation --no-save --package-lock=false playwright @axe-core/playwright
```

Point `PLAYWRIGHT_MODULE` and `AXE_MODULE` at those installed packages, then run `node tools/check_browser.cjs`. `PREVIEW_URL` defaults to `http://127.0.0.1:8080`; `BROWSER_EXECUTABLE` can point to an existing Chromium headless executable. If no browser is installed, use Playwright's browser installer. Reports and screenshots are written under `.cache/renovation/` and are not published.

The browser check covers all 12 pages at 320, 390, 430, 768, 1024, 1440, and 1920 pixels; accessibility at mobile and desktop widths; native disclosures; keyboard navigation; table scrolling; operation without JavaScript; printable news; PDF/figure delivery; and custom 404 behavior. There is no separate application lint or type-check pipeline because the site contains no application JavaScript or TypeScript.

## Content rules

- ERL is an ongoing controlled evidence-loss study. Further research and evaluation are in progress, and the manuscript is in preparation. RIFT is an active exploratory measurement study (RIFT-M), and RSI is an engineering pilot whose growth hypothesis remains untested. Distinguish completed work from proposed experiments.
- Keep PNEUMA labeled as discontinued thesis work.
- CAT-GS is published in Neurocomputing, article 135392 (2026), DOI 10.1016/j.neucom.2026.135392; the owner confirms acceptance on 12 October. The accepted AACL-IJCNLP paper links to its public OpenReview record.
- Keep StreamTalker-GS labeled as an archived negative-result study.
- Treat speech-avatar work as one collaborative applied-research trajectory.
- State upstream, inherited, collaborative, custom, and incomplete work separately.
- Verify publication status and every numeric claim against a primary source.
- Do not add ignored internal files directly to the public site.

## Deployment

### CV synchronization

`/cv/` contains the current web CV and a download link to `assets/public/documents/Tanvir_Ahmed_Khan_CV.pdf`. The public two-page PDF was regenerated from the synchronized LaTeX source for the October 2026 publication and research-status update. The September owner-supplied build remains the historical baseline.

The editable source is `assets/Tanvir_s_Resume_Latest_2/main.tex` with `myresume.sty`. Upload the accompanying `Tanvir_Ahmed_Khan_CV_Overleaf.zip` to Overleaf, select XeLaTeX, and inspect the compiled PDF. For future revisions, replace the public PDF only with the reviewed output and update its download-link version. Keep the web CV and source in sync on future edits. The source ZIP is a local handoff, not a public website asset.

The renovation is on `codex/academic-homepage-renovation`, based on `redesign/academic-portfolio-v2`. No Pages settings, remote branches, or deployments were changed. The prior branch and history remain available for comparison. A future publication should be a separate deliberate action after reviewing the tracked asset list; the local preview's allowlist does not alter GitHub Pages hosting behavior.

Content © Tanvir Ahmed Khan.
