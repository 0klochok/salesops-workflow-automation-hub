# Demo Asset Checklist

Use this checklist when capturing portfolio screenshots, GIFs, or a short video from the local-only demo. Keep all captures synthetic, mock-only, and free of `.env` values, real credentials, provider dashboards, private account data, and unrelated local files.

This checklist aligns with the README screenshot section: committed still screenshots are the current portfolio proof, while GIF/video capture remains optional until the user intentionally selects final recording assets.

Do not commit large binary recordings by default. Store draft exports locally, review them manually, and only track intentionally selected assets.

## Storage And Viewports

Store final still screenshots in `docs/assets/screenshots/`.

Store optional GIFs, screen recordings, and exported video clips in `docs/assets/demo/`. Keep draft recordings untracked unless the user intentionally selects them for the portfolio.

Recommended browser settings:

- Desktop screenshots: `1440x1100` preferred, `1365x900` acceptable, browser zoom `100%`.
- Mobile screenshots: `390x844` preferred, browser zoom `100%`, device toolbar or narrow browser width.
- GIFs: `1280x900` or `1440x900`, browser zoom `100%`, record only the app viewport.
- Video: `1920x1080` if available, otherwise `1440x900`; keep terminal windows out of frame unless showing local commands is intentional.

Use local URLs only:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:3042/docs`
- `http://127.0.0.1:8028/docs` after the redirect lands on the local-only API docs page

## Recommended Still Screenshots

| Suggested filename | Current status | Viewport | Screen or state | What it should show |
|---|---|---|---|---|
| `docs/assets/screenshots/salesops-home.png` | Included | Desktop | Public landing page with lead form and CSV import | Page heading, lead form, CSV import surface, and no provider-dashboard context |
| `docs/assets/screenshots/salesops-form-success.png` | Optional, not included | Desktop | Synthetic form submission result | Success status plus validation, backend dedupe, mock CRM, and mock Slack outcomes |
| `docs/assets/screenshots/salesops-csv-session-dashboard.png` | Included | Desktop | CSV import result and session dashboard | A valid synthetic CSV import, latest result, and browser-session evidence |
| `docs/assets/screenshots/salesops-admin-run-history.png` | Included | Desktop | Local-only admin run table with seeded rows | Seeded success, failed, queued, and retried runs with filters visible |
| `docs/assets/screenshots/salesops-admin-failed-detail.png` | Included | Desktop | `run_demo_failed` selected detail | Sanitized intake payload, attempts, failure context, and suggested action |
| `docs/assets/screenshots/salesops-admin-filtered-detail.png` | Included | Desktop | Filtered admin state with selected detail preserved | Filters active while selected run detail remains inspectable |
| `docs/assets/screenshots/salesops-admin-empty-filter.png` | Included | Desktop | No-match filtered admin state | The filtered empty state and reset path are understandable |
| `docs/assets/screenshots/salesops-docs-swagger.png` | Included; refresh recommended | Desktop | Local-only API docs page after `/docs` redirect; filename retained from the earlier Swagger capture | Local docs title, `/openapi.json` link, local `127.0.0.1:8028/docs` URL, and no external provider page |
| `docs/assets/screenshots/salesops-mobile-home.png` | Included | Mobile | Public page at mobile width | Form and CSV controls stack cleanly without overlap or horizontal page overflow |
| `docs/assets/screenshots/salesops-mobile-admin-runs.png` | Included | Mobile | Admin page at mobile width | Filters wrap cleanly and the table scrolls inside its container |

The included screenshots cover the main page, CSV session dashboard, run history, failed detail, filtered detail, empty-filter state, `/docs` redirect target, and mobile-width public/admin layouts. The optional form-success screenshot is intentionally not part of the current portfolio set and should only be added if it improves the final story.

## Release Audit Verification - 2026-06-09

Committed screenshot assets were verified during the final public portfolio release audit:

- `docs/assets/screenshots/salesops-home.png`
- `docs/assets/screenshots/salesops-csv-session-dashboard.png`
- `docs/assets/screenshots/salesops-admin-run-history.png`
- `docs/assets/screenshots/salesops-admin-failed-detail.png`
- `docs/assets/screenshots/salesops-admin-filtered-detail.png`

No GIF or video asset was captured in this phase. Capture was skipped because the still screenshots already cover the public portfolio proof points, no paid or third-party capture tool was needed, and large binary recordings should remain optional until the user intentionally selects a final clip for the portfolio.

## Manual Capture Checklist

Before capture:

1. Run the local setup and seed path from `README.md` or `RUNBOOK.md`.
2. Start FastAPI on `127.0.0.1:8028`.
3. Start Next.js on `127.0.0.1:3042` with both backend base URL environment variables pointed at `http://127.0.0.1:8028`.
4. Open a clean browser window or profile, use browser zoom `100%`, and close unrelated tabs.
5. Do not open `.env`, provider dashboards, personal accounts, private local files, or real customer data.

Desktop stills to capture:

1. `/`: capture `salesops-home.png` before submitting if the page needs a fresh hero/intake view.
2. `/`: submit one synthetic form lead and capture `salesops-form-success.png` only if that result improves the story.
3. `/`: import one valid synthetic CSV row and capture `salesops-csv-session-dashboard.png` if refreshing the committed asset.
4. `/admin/runs`: capture `salesops-admin-run-history.png` with seeded success, failed, queued, and retried rows visible.
5. `/admin/runs?runId=run_demo_failed`: capture `salesops-admin-failed-detail.png` with sanitized failure detail visible.
6. `/admin/runs?status=success&runId=run_demo_failed`: capture `salesops-admin-filtered-detail.png` with the selected-run-hidden notice and detail visible.
7. `/admin/runs?q=no-such-run`: capture `salesops-admin-empty-filter.png` if an empty-state asset is wanted.
8. `/docs`: follow the redirect and capture `salesops-docs-swagger.png` after the browser lands on `http://127.0.0.1:8028/docs` and shows the local-only API docs page.

Mobile stills to capture:

1. `/`: capture `salesops-mobile-home.png` at `390x844` after confirming the public form and CSV controls stack cleanly.
2. `/admin/runs`: capture `salesops-mobile-admin-runs.png` at `390x844` after confirming filters wrap and the table scrolls inside its container.

## Recommended GIF Or Video Shots

| Suggested filename | Current status | Shot | What it proves |
|---|---|---|---|
| `docs/assets/demo/salesops-public-intake.gif` | Optional, not included | Fill a synthetic form lead, submit it, then show the latest result | The public form works end to end with mock adapters |
| `docs/assets/demo/salesops-csv-import.gif` | Optional, not included | Paste one valid synthetic CSV row, import it, and show the dashboard row | CSV upload behavior is understandable without a live provider |
| `docs/assets/demo/salesops-admin-filters.gif` | Optional, not included | Open `/admin/runs`, apply status/source/search/owner/error-type filters, then reset | The run dashboard supports reviewer-friendly investigation |
| `docs/assets/demo/salesops-failure-detail.gif` | Optional, not included | Open `run_demo_failed` and show failure detail plus suggested action | Failure evidence is sanitized, actionable, and local-only |
| `docs/assets/demo/salesops-portfolio-demo.mp4` | Optional, not included | 3-5 minute full walkthrough following `HANDOFF.md` | The whole local story is easy to evaluate without extra setup narration |

No GIF or video binaries are currently committed. `docs/assets/demo/README.md` remains the placeholder location for future intentionally selected recordings.

## Capture Rules

- Capture only local URLs such as `http://127.0.0.1:3042/`, `http://127.0.0.1:3042/admin/runs`, `http://127.0.0.1:3042/docs`, and the redirected FastAPI docs URL `http://127.0.0.1:8028/docs`.
- Use deterministic demo seed data or synthetic form/CSV values only.
- Keep the admin page local-only in the recording; show retry only as a guarded failed/queued selected-run action, and do not show demo reset, edit, delete, send, or provider-action workflows.
- Show the mock-only boundary briefly: local FastAPI, local Next.js, local PostgreSQL, mock CRM, and mock Slack.
- Do not show `.env` contents, shell history with secrets, browser profiles, provider dashboards, or personal/private data.
- Do not claim deployment, GitHub Actions, production smoke, real CRM, real Slack, paid API, or live provider validation.

## Portfolio Reviewer Proof Points

A complete asset set should make these points obvious without a long explanation:

- leads can enter from both a form and CSV;
- validation, dedupe, mock CRM, and mock Slack outcomes are visible to the user;
- persisted automation runs exist for success, failed, queued, and retried statuses;
- the admin dashboard supports filtering and selected run review;
- failure detail is sanitized and includes a suggested action;
- the demo is local-only, mock-only, and safe to review without credentials.
