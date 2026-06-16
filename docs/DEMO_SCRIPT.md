# Local Demo Checklist

Use this checklist when a portfolio reviewer needs the shortest safe path to run and inspect the local SalesOps Workflow Automation Hub demo.

## Safety Boundary

- This demo is local-only and mock-only.
- Use synthetic lead data only.
- Do not use paid APIs.
- Do not call real HubSpot, Slack, Google Sheets, OpenAI, production APIs, webhooks, or other live providers.
- Do not print, paste, screenshot, or commit `.env` values or real credentials.
- `.env.example` contains placeholders only; ignored local `.env` files are for local setup.

## Install And Seed

Run from the repository root in PowerShell:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
uv sync --frozen
pnpm install --frozen-lockfile
docker compose up -d postgres
uv run --no-python-downloads --python 3.12 --frozen alembic upgrade head
uv run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_reset --apply
```

Start the backend in one PowerShell window:

```powershell
uv run --no-python-downloads --python 3.12 --frozen uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

Start the frontend in another PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

## Portfolio Reviewer Path

This path should take 5-10 minutes after dependencies are installed and the local servers are running.

1. Open `http://127.0.0.1:3042/`.
2. Submit one synthetic lead from the public form and confirm the local result shows validation, dedupe, mock CRM, and mock Slack outcomes.
3. Import a small synthetic CSV row and confirm the latest result plus session dashboard update.
4. Open `http://127.0.0.1:3042/admin/runs`.
5. Confirm seeded success, failed, queued, and retried runs are visible.
6. Filter by status, source, owner, error type, date, and search text.
7. Open `run_demo_failed` and inspect the sanitized failure detail, attempt history, payload summary, and suggested action.
8. Confirm the admin UI is local-only, shows retry only for failed or queued selected runs, and does not expose demo reset, edit, delete, send, or provider-action controls.
9. Open `http://127.0.0.1:3042/docs`, confirm it redirects to `http://127.0.0.1:8028/docs`, and confirm the local-only API docs page links to `http://127.0.0.1:8028/openapi.json`.
10. Mention that all CRM and Slack behavior is deterministic mock behavior backed by local persistence.

## UI Areas To Inspect

- Public lead intake form.
- CSV import panel.
- Latest result and browser-session dashboard.
- Admin run-history table.
- Date, source, status, lead owner, error type, and search filters.
- Selected run detail panel.
- Failed-run suggested action and sanitized payload.
- Local FastAPI docs at `/docs` and OpenAPI JSON at `/openapi.json`.

## Existing Assets

Screenshot assets are committed under `docs/assets/screenshots/`:

- `salesops-home.png`
- `salesops-csv-session-dashboard.png`
- `salesops-admin-run-history.png`
- `salesops-admin-failed-detail.png`
- `salesops-admin-filtered-detail.png`
- `salesops-admin-empty-filter.png`
- `salesops-local-api-docs.png`
- `salesops-mobile-home.png`
- `salesops-mobile-admin-runs.png`

Asset provenance and current recording notes are in `docs/assets/README.md` and `docs/assets/demo/README.md`. Recommended screenshot, GIF, and video shots are listed in `docs/DEMO_ASSETS.md`.

## Intentionally Out Of Scope

- Real CRM, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider calls.
- Real credentials, tokens, private keys, or production secrets.
- GitHub Actions, CI, deployment config, hosted automation, and production hardening.
- Auth, multi-user permissions, billing, or customer-data workflows.
- Public admin reset/provider controls; retry remains local-only and is exposed only for failed or queued selected runs.
- Demo video or GIF export; the repository currently commits still screenshots only and keeps the optional capture plan in `docs/DEMO_ASSETS.md`.

## Quality Gate Reminder

Run the validation commands in `README.md` before treating a documentation or demo-evidence pass as complete. If any gate is skipped, record the reason in `STATE.md`.
