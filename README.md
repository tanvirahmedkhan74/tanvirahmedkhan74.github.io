# Academic Portfolio — Tanvir Ahmed Khan

Static academic homepage and research-dossier site for [tanvirahmedkhan74.github.io](https://tanvirahmedkhan74.github.io/).

The site is organized around research questions, evidence, project status, and contribution boundaries. It uses semantic HTML, one shared CSS file, and a small navigation script; there is no framework, package manager, or build step.

## Information architecture

```text
/
├── index.html
├── cv/index.html
├── research/
│   ├── index.html
│   ├── erl/
│   ├── rift/
│   ├── avatar-systems/
│   ├── pneuma/
│   ├── airflow/
│   └── archive/streamtalker-gs/
├── notes/
├── assets/public/
│   ├── css/main.css
│   ├── js/main.js
│   ├── documents/
│   ├── figures/
│   └── images/
├── 404.html
├── robots.txt
└── sitemap.xml
```

## Public asset policy

Only `assets/public/**` is intended for publication as website assets. The rest of the local `assets/` tree contains research records, source PDFs, academic material, and working files. `.gitignore` excludes new files there, but does not untrack existing files; check the tracked file list before publication. Hiding a file from site navigation is not a privacy control.

See `PUBLIC_ASSET_RISK_AUDIT.md` before adding or moving any asset.

## Local preview

Serve the repository root with any static file server, for example:

```text
python -m http.server 8080 --bind 127.0.0.1
```

Then open `http://localhost:8080/`. Root-relative links require a server rather than opening files directly from disk.

## Content rules

- Keep ERL (Emergent Retrieval Landmark) and RIFT (Recoverability-Gated Implicit Facial Dynamics) labeled as ongoing research. Distinguish completed evaluations from proposed experiments; do not imply venue acceptance.
- Keep PNEUMA labeled as discontinued thesis work.
- Keep CAT-GS under minor revision at Neurocomputing until a final decision is confirmed. The accepted AACL-IJCNLP paper links to its public OpenReview record.
- Keep StreamTalker-GS labeled as an archived negative-result study.
- Treat speech-avatar work as one collaborative applied-research trajectory.
- State upstream, inherited, collaborative, custom, and incomplete work separately.
- Verify publication status and every numeric claim against a primary source.
- Do not add ignored internal files directly to the public site.

## Deployment

### CV synchronization

`/cv/` contains the current web CV and a download link to `assets/public/documents/Tanvir_Ahmed_Khan_CV.pdf`. The public PDF is the owner-supplied two-page Overleaf build received on 28 September 2026, copied without modification.

The editable source is `assets/Tanvir_s_Resume_Latest_2/main.tex` with `myresume.sty`. Upload the accompanying `Tanvir_Ahmed_Khan_CV_Overleaf.zip` to Overleaf, select XeLaTeX, and inspect the compiled PDF. For future revisions, replace the public PDF only with the reviewed output and update its download-link version. Keep the web CV and source in sync on future edits. The source ZIP is a local handoff, not a public website asset.

To host this revision, open repository **Settings → Pages**, select **Deploy from a branch**, choose **`redesign/academic-portfolio-v2`**, select **`/(root)`**, and save. This is a static site with `.nojekyll`; no build command is required. Pushing this branch does not itself change the selected Pages source.

Content © Tanvir Ahmed Khan.
