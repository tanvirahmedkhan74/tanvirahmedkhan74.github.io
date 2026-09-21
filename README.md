# Academic Portfolio — Tanvir Ahmed Khan

Static academic homepage and research-dossier site for [tanvirahmedkhan74.github.io](https://tanvirahmedkhan74.github.io/).

The site is organized around research questions, evidence, project status, and contribution boundaries. It uses semantic HTML, one shared CSS file, and a small navigation script; there is no framework, package manager, or build step.

## Information architecture

```text
/
├── index.html
├── research/
│   ├── index.html
│   ├── erl/
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

Only `assets/public/**` is tracked and publishable. The rest of the local `assets/` tree contains internal research records, source PDFs, private academic material, and working files. `.gitignore` excludes those paths; hiding a file from site navigation is not a privacy control.

See `PUBLIC_ASSET_RISK_AUDIT.md` before adding or moving any asset.

## Local preview

Serve the repository root with any static file server, for example:

```text
python -m http.server 8080
```

Then open `http://localhost:8080/`. Root-relative links require a server rather than opening files directly from disk.

## Content rules

- Keep ERL labeled as active work and never imply venue acceptance.
- Keep PNEUMA labeled as a completed, discontinued thesis direction.
- Keep StreamTalker-GS labeled as an archived negative-result study.
- Treat speech-avatar work as one collaborative applied-research trajectory.
- State upstream, inherited, collaborative, custom, and incomplete work separately.
- Verify publication status and every numeric claim against a primary source.
- Do not add ignored internal files directly to the public site.

## Deployment

GitHub Pages publishes the repository root from `main`. The redesign is prepared on `redesign/academic-portfolio-v2` for review; it must not be merged or deployed without owner approval.

Content © Tanvir Ahmed Khan.
