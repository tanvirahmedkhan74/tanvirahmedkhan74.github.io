# Academic Portfolio — Tanvir Ahmed Khan

Personal academic portfolio site for [Tanvir Ahmed Khan](https://tanvirahmedkhan74.github.io/),
hosted on GitHub Pages at `tanvirahmedkhan74.github.io`.

The site presents the profile of an early-career computer science researcher working on
computer vision, 3D neural rendering, multimodal AI, and memory-driven video understanding,
with a publication-first structure: peer-reviewed venues appear immediately below the hero,
and every paper entry states the author's specific contribution. Ph.D. availability is
stated as Fall 2027.

## Architecture

Plain static site — semantic HTML5, hand-written CSS, and a small amount of vanilla
JavaScript (navbar toggle, scroll-spy, intersection-observer reveals). No build system,
no package manager, no framework. Committing to `main` is sufficient to publish.

```
.
├── index.html                  # Single-page site (all sections)
├── 404.html                    # GitHub Pages 404
├── favicon.svg / favicon-32.png / favicon-512.png / apple-touch-icon.png
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── assets/public/              # The ONLY public asset directory
    ├── css/main.css            # Design system + responsive layout
    ├── js/main.js              # Vanilla JS (~2 KB)
    ├── images/                 # Portrait WebP derivatives
    └── documents/Tanvir_Ahmed_Khan_CV.pdf
```

## Public asset policy

`assets/*` is git-ignored **except** `assets/public/`. Everything else under `assets/`
(source research documentation, interview preparation material, private PDFs, original
media files) is local reference material only and is deliberately excluded from the
repository. When adding media for the site, place files in `assets/public/` only.

## Local development

No install required. Serve statically from the repository root:

```bash
python -m http.server 8080
```

or simply open `index.html` through any static server. Browser-based live reload is the
only development workflow.

## Deployment (GitHub Pages)

1. Create remote repo `tanvirahmedkhan74.github.io` (public).
2. Initialize and push `main`:

```bash
git init
git add .
git commit -m "Initial academic portfolio"
git branch -M main
git remote add origin git@github.com:tanvirahmedkhan74/tanvirahmedkhan74.github.io.git
git push -u origin main
```

3. Repo → Settings → Pages → Build and deployment → Source: *Deploy from a branch* →
   Branch: `main` / root → Save.
4. Site becomes available at `https://tanvirahmedkhan74.github.io/`.

## Updating content

| Content | What to change |
| --- | --- |
| Publications | `index.html` → Publications section (also update JSON-LD in `<head>`); keep status labels honest (Published, Accepted, Under revision) and restate contributions |
| Research | `index.html` → Research Directions pillars and Selected projects |
| Systems | `index.html` → Systems, Hardware & Deployment (industry work, compute facts, public artifacts) |
| News | `index.html` → News section |
| Research experience | `index.html` → Experience section |
| CV | Replace `assets/public/documents/Tanvir_Ahmed_Khan_CV.pdf` |
| Portrait | Replace/optimize WebP in `assets/public/images/` (1000–4000 px, WebP, ~5:4 or 4:5 ratio) |
| Links | `index.html` → Contact section |

Keep the academic-status labels honest: Published, In press / Accepted, Ongoing
Research, Undergraduate Thesis, Industry Collaboration.

## License

Content © Tanvir Ahmed Khan. Repository structure may be reused freely.
