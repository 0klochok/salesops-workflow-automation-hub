# Demo Asset Checklist

Use this checklist when capturing portfolio screenshots, GIFs, or a short video from the local-only demo. Keep all captures synthetic, mock-only, and free of `.env` values, real credentials, provider dashboards, private account data, and unrelated local files.

Do not commit large binary recordings by default. Store draft exports locally, review them manually, and only track intentionally selected assets.

## Recommended Still Screenshots

| Suggested filename | Current status | Screen or state | What it proves |
|---|---|---|---|
| `docs/assets/screenshots/salesops-home.png` | Captured and committed | Public landing page with lead form and CSV import | The reviewer can see the core intake surfaces immediately |
| `docs/assets/screenshots/salesops-form-success.png` | Not captured yet | Synthetic form submission result | Validation, backend dedupe, mock CRM, and mock Slack outcomes are visible |
| `docs/assets/screenshots/salesops-csv-session-dashboard.png` | Captured and committed | CSV import result and session dashboard | CSV rows use the same local intake path and update the browser-session evidence |
| `docs/assets/screenshots/salesops-admin-run-history.png` | Captured and committed | Read-only admin run table with seeded rows | Persisted success, failed, queued, and retried runs are reviewable |
| `docs/assets/screenshots/salesops-admin-failed-detail.png` | Captured and committed | `run_demo_failed` selected detail | Sanitized payload, attempts, failure context, and suggested action are visible |
| `docs/assets/screenshots/salesops-admin-filtered-detail.png` | Captured and committed | Filtered admin state with selected detail preserved | Filters work while detail remains inspectable |
| `docs/assets/screenshots/salesops-admin-empty-filter.png` | Not captured yet | No-match filtered admin state | Empty-state behavior is understandable and safe |

Existing committed screenshots cover the main page, CSV session dashboard, run history, failed detail, and filtered detail. The optional form-success and empty-filter screenshots are not present yet and should only be added if they are useful for the final portfolio story.

## Release Audit Verification - 2026-06-09

Committed screenshot assets were verified during the final public portfolio release audit:

- `docs/assets/screenshots/salesops-home.png`
- `docs/assets/screenshots/salesops-csv-session-dashboard.png`
- `docs/assets/screenshots/salesops-admin-run-history.png`
- `docs/assets/screenshots/salesops-admin-failed-detail.png`
- `docs/assets/screenshots/salesops-admin-filtered-detail.png`

No GIF or video asset was captured in this phase. Capture was skipped because the still screenshots already cover the public portfolio proof points, no paid or third-party capture tool was needed, and large binary recordings should remain optional until the user intentionally selects a final clip for the portfolio.

## Recommended GIF Or Video Shots

| Suggested filename | Current status | Shot | What it proves |
|---|---|---|---|
| `docs/assets/demo/salesops-public-intake.gif` | Not captured yet | Fill a synthetic form lead, submit it, then show the latest result | The public form works end to end with mock adapters |
| `docs/assets/demo/salesops-csv-import.gif` | Not captured yet | Paste one valid synthetic CSV row, import it, and show the dashboard row | CSV upload behavior is understandable without a live provider |
| `docs/assets/demo/salesops-admin-filters.gif` | Not captured yet | Open `/admin/runs`, apply status/source/search/owner/error-type filters, then reset | The run dashboard supports reviewer-friendly investigation |
| `docs/assets/demo/salesops-failure-detail.gif` | Not captured yet | Open `run_demo_failed` and show failure detail plus suggested action | Failure evidence is sanitized, actionable, and read-only |
| `docs/assets/demo/salesops-portfolio-demo.mp4` | Not captured yet | 3-5 minute full walkthrough following `HANDOFF.md` | The whole local story is easy to evaluate without extra setup narration |

No GIF or video binaries are currently committed. `docs/assets/demo/README.md` remains the placeholder location for future intentionally selected recordings.

## Capture Rules

- Capture only local URLs such as `http://127.0.0.1:3042/`, `http://127.0.0.1:3042/admin/runs`, and `http://127.0.0.1:8028/docs`.
- Use deterministic demo seed data or synthetic form/CSV values only.
- Keep the admin page read-only in the recording; do not show retry, edit, delete, send, or provider-action workflows.
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
