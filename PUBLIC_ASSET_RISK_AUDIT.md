# Public Asset Risk Audit

**Repository:** `tanvirahmedkhan74/tanvirahmedkhan74.github.io`

**Audit date:** 21 September 2026

**Publication model:** public GitHub repository; GitHub Pages deployed from `main` at the repository root

**Purpose:** identify local material that must not be mistaken for private merely because it is absent from navigation

## Executive finding

The remote repository is public. The tracked tree is currently limited to the static site shell and `assets/public/**`. Internal research records and personal academic files are ignored and are not present in the remote repository snapshot reviewed during this audit.

No plaintext file matched the filename-only secret-pattern scan for private keys, access tokens, API keys, client secrets, or password assignments. This is a limited check: ignored binary PDFs and archives were classified by path and purpose rather than treated as safe.

Important distinction: an ignored file is protected from accidental Git publication only while it remains untracked. It can still be served by a local static server started at the repository root, and it would become public if force-added or moved under `assets/public/`.

## Risk register

| File or path | Why it may be sensitive | Tracked now | May be served by current public Pages site | Recommended action |
|---|---|---:|---:|---|
| `assets/BASE_SOP_Tanvir_Ahmed_Khan.pdf` | Personal statement containing private biography, motivation, and application material | No | No | Keep ignored and outside any future public asset directory. |
| `assets/[identity-document filename redacted].pdf` | Filename and document appear to contain a personal identifier or official record | No | No | Move to encrypted/private storage outside the repository working tree; do not print the full filename in public reports. |
| `assets/NSU_transcript_academic_profile.md` | Transcript and academic-profile details | No | No | Move to private storage; keep only manually selected, necessary facts on the website. |
| `assets/Tanvir_s_Resume_Latest_2.pdf` | Source résumé may contain application-specific or stale information | No | No | Keep private; publish only the reviewed CV copy under `assets/public/documents/`. |
| `assets/interview_prep/**` | Personal audits, question banks, claim-risk notes, and application preparation | No | No | Keep ignored; preferably move outside the Pages repository to reduce accidental exposure. |
| `assets/final_semester_thesis/**` | Unpublished thesis source and internal academic artifacts | No | No | Keep ignored until the owner explicitly approves a public thesis release and checks third-party material. |
| `assets/computer_graphics_vision_industy_project/**` | Deep internal research documentation, collaboration records, implementation details, and closed-source work | No | No | Keep outside the public tree; copy only individually reviewed, sanitized figures or facts. |
| `assets/Project_DOCS/**` | Internal provenance audits, contribution summaries, prompt specifications, uncertainty records, and project images | No | No | Keep ignored. Only the eight reviewed diagrams copied into `assets/public/figures/**` are intended for publication. |
| `assets/publications/**` | Local paper PDFs used as evidence; may include pre-publication versions | No | No | Keep ignored. Link publisher/arXiv records instead of duplicating the source PDFs unless redistribution is deliberate and licensed. |
| `assets/media/**` | Personal photographs, memes, travel images, and large research videos | No | No | Keep ignored; review consent, licensing, and project confidentiality before any individual file is published. |
| `assets/Project_DOCS/Academic_Resume.zip` | Archive can contain multiple source documents and metadata that are easy to publish accidentally | No | No | Move to private storage outside the repository. |
| `Master Agentic Prompt — Academic GitHub Portfolio.md` | Internal execution instructions and repository map | No | No | Keep ignored; it is not website content. |
| `WEBSITE_ACADEMIC_AUDIT_2026-09.md` | Internal editorial audit and unresolved factual questions | No | No | Keep ignored; use this public risk register for publishable operational guidance. |
| `assets/public/documents/Tanvir_Ahmed_Khan_CV.pdf` | Intentionally public CV; contains contact, education, work history, and a project/status summary | Yes | Yes | Owner should review before merge: it does not yet foreground ERL and still describes older research directions as current. Replace only with an approved revision. |
| `assets/public/documents/Tanvir_Ahmed_Khan_Implicit_Manifold_Entanglement_Proposal.pdf` | Intentionally public but speculative unpublished note with strong novelty language and no results | Yes | Yes | Retain only if the owner wants it public. The Notes page labels it as a speculative working proposal; consider revising the PDF's claim language. |
| `assets/public/images/tanvir-ahmed-khan*.webp` | Public portrait | Yes | Yes | Confirm the owner consents to continued public use. |
| `assets/public/figures/**` | Selected research diagrams copied from ignored internal records | Yes after this redesign | Yes after merge | Keep only the reviewed subset; captions must preserve custom/upstream boundaries and negative-result wording. |

## Pages exposure assessment

- The GitHub repository is publicly visible.
- The tracked README states that Pages deploys from `main` at the repository root.
- `git ls-files` showed no tracked source material outside the deliberate public set before the redesign.
- `.gitignore` excludes `assets/*` and then re-includes only `assets/public/**`.
- The redesign does not change Pages settings and does not force-add ignored files.

## Required owner actions before merge

1. Review the public CV for alignment with the new research taxonomy and statuses.
2. Decide whether the speculative manifold proposal should remain publicly downloadable.
3. Move the identity document, transcript, SOP, interview-preparation folder, and archive ZIP outside the Pages repository working tree for defense in depth.
4. Confirm that the selected diagrams contain no confidential client or collaborator information.
5. Re-run `git ls-files` and a secret scan immediately before merging to `main`.

## What this audit did not do

- It did not rewrite Git history.
- It did not delete or relocate private local files.
- It did not assert that an ignored binary is safe.
- It did not change GitHub Pages configuration.
- It did not publish or deploy the redesign.
