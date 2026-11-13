# Academic portfolio — Tanvir Ahmed Khan

Static academic homepage for [tanvirahmedkhan74.github.io](https://tanvirahmedkhan74.github.io/). Semantic HTML, one shared stylesheet, no framework or application JavaScript, and no build step.

The site separates independent research in progress, published collaborative papers, MILab applied projects and the academic CV. The reading layout uses a persistent header and a compact desktop profile column. At narrow widths or short heights, the profile reflows into the document. Navigation remains visible without JavaScript; project pages include contents links and a persistent parent/location strip.

## Pages

- `/`: profile, current research, publications and background.
- `/research/`: ERL, CG-SWR, RIFT and deadline articulation, each with its study design and scope; completed PNEUMA thesis; other and archived studies.
- `/publications/`: four published collaborative works, full bylines, publisher links and individual contributions.
- `/milab/`: six strands of applied research holding seventeen named milestones, each milestone keeping its own anchor.
- `/cv/`: web CV and synchronized three-page PDF.
- `/notes/`: personal reflections, separate from research findings.
- `/research/rsi/`: retained archived pilot, excluded from current listings and the sitemap, with `noindex`.
- `/research/avatar-systems/`: compatibility entry pointing readers to the differentiated MILab index.

## Local preview and checks

From this directory:

```sh
python tools/check_site.py
python tools/preview.py --port 8080
```

Open `http://127.0.0.1:8080/`. The preview serves only the public HTML routes, `assets/public/`, favicons and site metadata. It does not expose private working files or directory listings. Root-relative links require this server.

Optional browser QA requires Playwright, axe-core and an installed Chromium runtime. It can reuse packages in the ignored cache:

```sh
npm install --prefix .cache/renovation --no-save --package-lock=false playwright axe-core
PLAYWRIGHT_MODULE="$PWD/.cache/renovation/node_modules/playwright" \
AXE_MODULE="$PWD/.cache/renovation/node_modules/axe-core/axe.min.js" \
node tools/check_browser.cjs
```

`PREVIEW_URL` defaults to `http://127.0.0.1:8080`. `BROWSER_EXECUTABLE` can select an existing Chromium executable. The script covers 17 routes at seven widths, accessibility, scroll positions, profile reflow, keyboard/skip links, direct hashes, controlled video, reduced motion, no-JavaScript navigation and the preview privacy boundary. It includes a 720px CSS viewport to approximate the layout reflow of a 1440px desktop at 200% zoom; a real browser zoom check remains part of manual review. Reports stay under `.cache/portfolio-update/browser/`. A blocked or unavailable browser run is not a passing result.

## Public assets and visuals

Only `assets/public/**` is intended for website assets. Other local `assets/` directories and `.cache/` contain private inputs, source packages or working files. Ignoring a previously tracked file does not untrack it; review the exact staged list before publication. The preview allowlist does not change GitHub Pages behavior.

The coordinated illustrations are in `assets/public/figures/refresh-2026/`. Published-work thumbnails are conceptual artwork, including the rainfall illustration; they are not empirical result images. WIP figures explain research questions without private methods or results. The optional deadline and MILab loops have native controls, compressed WebM/MP4 versions, GIF downloads, static posters and reduced-motion fallbacks. There is no autoplay. Earlier, denser avatar and PNEUMA figures have been retired from the current public asset tree; historical Git versions remain unchanged.

## Content and CV maintenance

ERL, RIFT and deadline articulation are first-author work in preparation. ACL, TMLR, and the alternative NeurIPS 2027 or ICCV 2027 plans are targets, not submissions or acceptances. RIFT’s first-author role is stated without exposing its full author list. CG-SWR is active experimental work on representation/readout gaps and constrained weight repair. Keep these separate from the four published collaborative papers. Preserve upstream model attribution and the distinction between primary earlier MILab work and major team contributions to the final Orin and RAG stages.

AACL links to its official 2026 main long-paper proceedings. CAT-GS retains the distinction between online publication in 2026 and January 2027 assignment. Private manuscripts, raw records, internal protocols, credentials and source ZIPs are not public downloads.

CV source: `assets/Tanvir_s_Resume_Latest_2/main.tex` with `myresume.sty`; use XeLaTeX. Public output: `assets/public/documents/Tanvir_Ahmed_Khan_CV.pdf`. Keep the web CV, TeX, reviewed PDF and private source package synchronized. Build intermediates and the current source package remain in `.cache/portfolio-update/cv/`. The pre-existing deleted source-adjacent `main.pdf` is a separate historical build and is not needed by the website.

No push, deployment or paper submission is part of this local refresh. Preserve unrelated working-tree changes and stage intended files explicitly.

Content © Tanvir Ahmed Khan.
