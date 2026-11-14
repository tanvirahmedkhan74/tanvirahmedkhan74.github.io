# Academic portfolio — Tanvir Ahmed Khan

Static academic homepage for [tanvirahmedkhan74.github.io](https://tanvirahmedkhan74.github.io/). Semantic HTML, one shared stylesheet, no framework or application JavaScript, and no build step.

The site separates first-author research in progress, co-authored publications, MILab applied projects and the academic CV. The reading layout uses a persistent header and a compact desktop profile column. At narrow widths or short heights, the profile reflows into the document. Navigation remains visible without JavaScript; project pages include contents links and a persistent parent/location strip.

## Pages

- `/`: profile, current research, publications and background.
- `/research/`: ERL, CG-SWR, RIFT and deadline articulation, each leading with what the study has found so far; completed PNEUMA thesis; other and archived studies.
- `/publications/`: four co-authored papers, full bylines, publisher and arXiv links, and the individual contribution shown open under each.
- `/milab/`: six strands of applied research holding seventeen named milestones, each milestone keeping its own anchor.
- `/cv/`: web CV and synchronized two-page PDF.
- `/notes/` and `/notes/study/`: personal reflections and study notes, linked from the footer and not from the header menu.
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

The coordinated illustrations are in `assets/public/figures/refresh-2026/`. Published-work thumbnails are conceptual artwork, including the rainfall illustration; they are not empirical result images. WIP figures explain research questions without private methods or results. The conceptual deadline and MILab loops and the PNEUMA illustration are no longer referenced by any page; their files remain in the asset tree. The robot-head and six-variant MILab clips are shown open; the other clips stay collapsed. There is no autoplay. Earlier, denser avatar and PNEUMA figures have been retired from the current public asset tree; historical Git versions remain unchanged.

## Content and CV maintenance

ERL, RIFT and deadline articulation are first-author work in preparation; CG-SWR is a first-author preregistered study in progress. None has been submitted. Each public entry states what the study has found so far in words, without exact unpublished figures; the drafts themselves stay private under the ignored `assets/ref/`. Venue plans are no longer listed. The RIFT entry uses the title of the current draft, and CG-SWR keeps its public title. CiteCheck results stay with its lead author. Keep these separate from the four co-authored publications. State upstream model attribution once, in the MILab Foundations section, and keep the distinction between primary earlier MILab work and team contributions to the robot head, the final Orin system and the RAG stage.

PNEUMA: the owner stated on 14 November 2026 that he designed the methodology and the pipeline and led the four-person thesis, and that V-JEPA attention scores were used to find the salient frames. The CV, the web CV, the home page and the PNEUMA page now state that role in the same words; keep them together if it changes. DynApex was a group project for CSE425.

AACL links to its official 2026 main long-paper proceedings. CAT-GS is listed as published online in 2026, in the January 2027 issue. Private manuscripts, raw records, internal protocols, credentials and source ZIPs are not public downloads.

CV source: `assets/Tanvir_s_Resume_Latest_2/main.tex` with `myresume.sty`; use XeLaTeX. `padua_cv.tex` reads `main.tex` and changes only the closing sentence of the profile, so the two-page versions cannot drift. Public output: `assets/public/documents/Tanvir_Ahmed_Khan_CV.pdf`. Keep the web CV, TeX, reviewed PDF and private source package synchronized. Build intermediates and the current source package remain in `.cache/portfolio-update/cv/`. The pre-existing deleted source-adjacent `main.pdf` is a separate historical build and is not needed by the website.

No push, deployment or paper submission is part of this local refresh. Preserve unrelated working-tree changes and stage intended files explicitly.

Content © Tanvir Ahmed Khan.
