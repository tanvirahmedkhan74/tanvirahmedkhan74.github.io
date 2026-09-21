# Academic CV revision notes

Date: 21 September 2026
Branch: redesign/academic-portfolio-v2
Workspace: D:\Coding\github_portfolio. The requested D:\Coding\github\_portfolio path does not exist. Initial Git status was clean.

## Assessment and editorial decisions

The previous document was a content hybrid: an academic publication list and restrained typography combined with resume-style project coverage and an eight-category technology inventory. Its main problems were an absent current research program, stale ongoing-project claims, duplicated avatar work, and insufficient personal contribution information. The visual design itself did not require replacement.

Retained the existing A4, 11-point XeLaTeX setup, TeX Gyre fonts, single-column reading order, subdued hyperlinks, aligned dates, and page-number footer. No new packages or decorative elements were introduced. The existing myresume.sty is required and is included unchanged in the commit because it was previously ignored/untracked. Fonts/ is not required by this style.

New order: Research Interests; Education (including scholarship); Active Research; Publications and Accepted Work; Research Experience (including the applied avatar program); Completed Research; Industry Experience; Technical Competencies. The intentional page break separates the research identity/publication record from experience and prior thesis work.

## Entry-by-entry decisions

| Original entry | Decision | Reason |
| --- | --- | --- |
| Speech2Avatar | Merge | Incorporated into the MILab Speech-Driven Avatar Systems program; removed the implication of an ongoing successful 3DGS method. |
| Predictive Representation Learning for Long-Video Understanding | Remove | The current taxonomy does not establish this JEPA/world-model line as active. It is not simply renamed ERL. |
| Saliency Detection via Knowledge Distillation | Remove | Earlier university prototype adds little beyond stronger research evidence. |
| DynApex | Remove | Earlier implementation prototype; lower relevance to the present application narrative. |
| MILab appointment | Keep and reorganize | Separate attributable multi-GPU/Audio2Face work from collaborative program scope. |
| Tuctuc | Shorten | Retain employment dates and substantive engineering experience in one paragraph. |
| Academic Scholarship | Move | Place with education rather than maintaining a separate honors section. |
| ICPC preliminary qualifier | Remove | Limited added evidence for research-focused graduate applications. |
| Technical skills | Shorten | Consolidate methods, tools, systems, and programming; remove speculative or redundant inventories. |
| ERL (previously absent) | Add | The canonical active independent research program. |
| PNEUMA (previously absent) | Add | Completed four-person undergraduate thesis with explicit team attribution and discontinued status. |
| StreamTalker-GS archive | Omit standalone entry | The negative result remains on the linked portfolio. ERL already demonstrates controlled negative-result reasoning; a separate archive entry would over-weight 3DGS. No successful-method claim survives in the CV. |
| AirFLOW | Omit | Completed academic engineering MVP, but less relevant than the papers, active research, and thesis. No CFD validation claim is imported. |

## Research status and attribution

- ERL is active independent research with an ACL-targeted manuscript in preparation, outside the publication list. The original routing tie and retired relational-selector claim are explicit; acceptance, submission, positive superiority, and completed follow-up experiments are not asserted.
- PNEUMA is a completed thesis with a discontinued research direction. Frozen upstream models and team-level architecture are distinguished from personal contribution. Neither individual module ownership nor final aggregate accuracy is invented. Exact thesis dates are omitted pending confirmation.
- Avatar work is a collaborative MILab/industry program with portions closed source. Individual attribution is strongest for distributed inference and Audio2Face/ARKit investigation. Deeper modules remain collaborative. No absolute Orin speedup, latency, or end-to-end real-time claim is retained because the dossier records power-mode caveats.
- ERL and avatar dossier links preserve fuller upstream and assistance disclosures; the CV does not claim unaided or sole implementation.

## Sources and publication verification

Read the complete MASTER_PORTFOLIO_INSTRUCTIONS.md, homepage, research index, and all five named research dossiers. Inspected all four local publication PDFs, including the AACL context-ablation table and the PLOS author-contribution statement. Historical plans and contribution summaries were unnecessary because conservative attribution resolved the available evidence.

1. PLOS ONE: local final PDF and publisher page verify 21(3), e0342646, publication on 10 March 2026, author order, and Conceptualization/Methodology/Writing-review & editing credit. https://doi.org/10.1371/journal.pone.0342646
2. CAT-GS: local v2 verifies author order and subject matter but does not establish final acceptance. Public arXiv v3, checked 21 September 2026, states acceptance in Neurocomputing. The CV now qualifies the formerly unconditional statement as "accepted as reported in arXiv v3," matching the redesigned portfolio. Final editorial notice remains to be confirmed. https://arxiv.org/abs/2608.24947
3. Crisis sentiment: local PDF is an anonymous ACL submission, so it cannot establish authorship or acceptance. Current portfolio and public arXiv supply author order and accepted status; arXiv explicitly says "Accepted at AACL." Main Conference/AACL-IJCNLP wording follows the current portfolio, pending proceedings/acceptance-letter confirmation. Added the missing public manuscript link. https://arxiv.org/abs/2609.16997
4. ICCIT: local PDF confirms the conference and author order, including "Md Mushfique Anwar" (correcting "Musfique" in the old ICCIT entry; PLOS spelling remains as printed). Pages 413-418 and published status follow the current portfolio. Use the verified public manuscript link instead of the old DOI, which was not independently verified during this audit. https://arxiv.org/abs/2512.15547

Formal full-author citations and consistent bolding of Tanvir's name are retained. Publication contribution statements follow the canonical homepage; the PLOS role is additionally supported by its CRediT statement. The sole accuracy comparison retained in experience (64.19% to 74.72%) is directly supported by Table 4 of the local crisis-sentiment manuscript; it is explicitly a controlled input ablation, not a universal performance claim.

## User verification before external use

- Confirm CAT-GS editorial acceptance and final bibliographic details; replace the arXiv qualification once primary editorial evidence is available.
- Confirm AACL Main Conference designation and add the ACL Anthology citation when available; confirm final ICCIT publisher metadata/pages.
- Confirm personal contributions in the three papers without individual CRediT evidence, and specific avatar responsibilities before strengthening any attribution.
- Confirm PNEUMA's official thesis title, completion date, and personal scope. The portfolio gives a completed B.Sc. in 2025 while the thesis dossier has no dated completion record; this revision does not infer a thesis year.
- Education dates, degree honors, CGPA, appointment dates, scholarship, and Tuctuc dates are retained from the portfolio/CV, not independently verified with certificates or employers.
- Removed the unsupported English C1 label; "English" remains. Add a dated language-test score only after checking the certificate.

## Validation and delivery

Compilation attempted with bundled Tectonic 0.17.0, including a retry with network permission. Both attempts failed before processing the document because the standard bundle at https://relay.fullyjustified.net/default_bundle_v33.tar.index.gz could not be downloaded. No XeLaTeX/TeX Live alternative is installed. No revised PDF was produced. Resulting page count is unverified: the source targets two pages with a deliberate break, but overflow, rendered layout, and PDF text extraction must be checked in Overleaf (XeLaTeX) before external use. Source checks verify balanced braces/environments, four publication entries, and preserved public-CV content.

The public CV at assets/public/documents/Tanvir_Ahmed_Khan_CV.pdf is unchanged. No website pages or unrelated files are modified. No merge, deployment, or push is performed. The narrowly scoped commit includes the revised source, its required unchanged style, these notes, and the review PDF if compilation succeeds; ignored research archives and publication PDFs are not staged.

## Faculty-review assessment

The opening identifies the research question, education, current independent work, and four peer-reviewed/accepted papers. Each paper has a concise contribution statement. Page two separates the applied appointment from the completed team thesis. Links lead to papers and detailed evidence. This supports a fast assessment without mistaking discontinued research, upstream models, or collaborative infrastructure for individual novel methods.
