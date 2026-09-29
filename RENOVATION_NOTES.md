# Academic homepage renovation — 30 September 2026

Branch: `codex/academic-homepage-renovation`

Starting commit: `1ffbf1a` on `redesign/academic-portfolio-v2`.

## Design and architecture

The reference was [Dong-Kyu Chae's academic homepage](https://dkchae.github.io/): a personal introduction, research context, and direct access to an academic record. Its layout was not copied. This renovation uses an 880-pixel reading column, Georgia for prose, system sans-serif for navigation and metadata, white paper, dark text, and blue underlined links. Section headings provide the main visual structure. There are no cards, alternating background bands, sticky menus, web-font requests, animations, or client-side scripts.

The existing static stack and all eleven HTML routes remain. Navigation is always visible, including on narrow screens and without JavaScript. Native HTML disclosures handle contribution notes and older news. Figures stay within the article column, use descriptive captions and alt text, and link to their full-resolution originals. Tables have column headers, named keyboard-focusable scroll regions, and a small-screen instruction.

## Content decisions

- The homepage begins with a personal introduction and current affiliation, then news, bibliography, selected research, background, and contact. Coursework, methods, and detailed project records remain on the CV and research pages.
- The bibliography groups published/accepted papers separately from the manuscript under revision. All four titles, author lists and ordering, venue/status text, and publication links are unchanged. Individual contribution statements remain available in expandable entries. The web CV uses the same grouping; the supplied PDF is unchanged.
- The research index distinguishes ongoing investigations, applied engineering, discontinued/archived studies, and earlier prototypes. DynApex and saliency distillation now have individual entries linking to their existing repositories. ICPC participation and the academic scholarship remain represented in the background and CV.
- ERL and RIFT remain ongoing; the negative RIFT pilot and conditional ERL findings remain explicit. PNEUMA remains discontinued, and StreamTalker-GS remains an archived negative result. AirFLOW retains its preliminary status, practitioner/MIST-graduate collaboration context, and explicit absence of official BAF/MIST sponsorship or a completed CFD run.
- Corrected StreamTalker-GS's contradictory table wording from “Rejected in 0 of 3 identities” to “The criterion was met in 0 of 3 identities,” consistent with the surrounding negative-result record. No metric was changed.
- Removed repetitive section labels, generic dossier-link prompts, the avatar page's duplicate Gaussian figure, and audit-style wording where it obscured the research. All original figures remain on disk. The unused ERL diagrams remain preserved but are not reintroduced into its newer evidence summary.
- The existing eight older milestones remain behind “Earlier milestones”; the separate nested news scrollbar is gone.

Six lossless WebP derivatives are used for figure delivery. Their decoded RGB pixels match the original PNGs exactly. Combined delivery size is 4,749,962 bytes instead of 6,589,271 bytes (27.9% smaller). Original PNGs and both public PDF documents are untouched.

## Validation

- Static validation: 11 pages and 202 local links/assets/fragments; valid nesting, one primary heading and main landmark per page, ordered headings, accessible image metadata, unique IDs, valid ARIA references, JSON-LD, canonical/social metadata, and matching sitemap.
- Chromium: 77 route/width combinations at 320, 390, 430, 768, 1024, 1440, and 1920 pixels. No page-level horizontal overflow, hidden navigation, missing images, console errors, page errors, failed requests, or HTTP errors on public routes.
- axe-core: 22 WCAG 2 A/AA and 2.1 AA audits at 390 and 1440 pixels; no reported violations. These are automated checks, supplemented with visual review and keyboard interaction.
- Keyboard checks: skip-to-content focus, publication navigation, opening news and contributions, and horizontal table scrolling. Also checked navigation and disclosures with JavaScript disabled, printable older news, the downloadable CV, and full-size figure links.
- Public preview: custom 404 response for unknown paths and non-public documents. Production remains the same static files; there is no build, application lint, or TypeScript step.
- Publication metadata compared programmatically with the starting commit on both homepage and CV. Original research images and the public CV PDF retained. Git whitespace checks passed after line-ending cleanup.
- Visual review covered the homepage, bibliography, research index, active dossiers, avatar systems, PNEUMA figures, and web CV at desktop/mobile sizes. Refined name wrapping and bibliography grouping after the first review.
- Fourteen external destinations checked: eleven returned HTTP 200 without a challenge redirect; IEEE resolved to its document URL with HTTP 202; OpenReview redirected to a verification challenge; LinkedIn returned its automated-access rejection (999). No URLs were guessed or replaced to work around those responses.

## Remaining limits and preserved work

OpenReview, IEEE, and LinkedIn content could not be fully verified by the automated link check. Their existing URLs remain. The speculative manifold PDF still contains its original wording; its Notes-page introduction clearly identifies it as an unvalidated hypothesis. This renovation does not revise the scientific evidence or infer new institutional affiliations.

The in-app browser could not initialize because of a Windows sandbox startup failure. Visual and interaction checks used the installed Chromium headless runtime instead. No Safari/Firefox run or standalone Lighthouse score is claimed.

Pre-existing local changes to `.gitignore`, the removed source-directory `main.pdf`, and `mailing/` were excluded from the renovation commit. `main`, the previous redesign branch, private working material, publication assets, and the public CV PDF were preserved. Nothing was pushed or deployed.

Preview: `python tools/preview.py --port 8080`, then open `http://127.0.0.1:8080/`.
