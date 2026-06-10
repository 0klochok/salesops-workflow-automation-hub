# RUNBOOK.md

## 1. Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-10 |
| Status | final portfolio readiness review |
| Project | salesops-workflow-automation-hub-fresh |
| Primary environment | Windows 11 / PowerShell |
| Current phase | Backend/admin run-history and retry hardening |

## 2. Operating Rules

- Run commands from the repository root unless a section says otherwise.
- Use PowerShell-compatible commands.
- Use `-LiteralPath` or quoted paths because the repository path contains spaces and Cyrillic characters.
- Do not commit or push from Codex.
- Use `uv` for backend dependencies and `pnpm` for frontend dependencies.
- Do not call real external APIs without explicit approval.
- Keep CRM, Slack, Google Sheets, OpenAI, and other external services mocked or absent unless explicitly approved.

## 3. Enter The Repository

```powershell
Set-Location -LiteralPath "repository root"
```

## 4. Check Git Status

```powershell
git status --short --branch
git remote -v
```

Expected final local QA observation: worktree changes should stay limited to intentional documentation corrections, and generated/build artifacts should not appear as source changes. No files should be staged, committed, or pushed by Codex.

## 5. Check Tool Versions

```powershell
python --version
uv --version
node --version
corepack --version
pnpm --version
git --version
```

Recent local validation uses Python 3.12 through `uv`, pnpm `11.5.0`, and the scripts defined in `pyproject.toml` and `apps/web/package.json`. Older phase entries in `STATE.md` preserve their original tool-version evidence.

## 6. Environment Variables

- `.env.example` contains placeholders only.
- `.env` is ignored and must contain only local values if created manually.
- Real secrets must not be committed, logged, printed, or placed in docs.
- CRM, Slack, and Google Sheets are mocked/optional unless explicitly approved.
- Frontend local proxy defaults:
  - `BACKEND_API_BASE_URL=http://127.0.0.1:8000`
  - `NEXT_PUBLIC_BACKEND_API_BASE_URL=http://127.0.0.1:8000`
- Local database default:
  - `DATABASE_URL=postgresql+psycopg://salesops_user:salesops_local_password@localhost:5432/salesops_local`

Local intake persistence requires `DATABASE_URL`. Create a local ignored `.env` from placeholders if it does not already exist:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
```

## 7. Backend Commands

```powershell
uv sync
uv run pytest
uv run ruff check .
uv run mypy backend tests
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --reload
```

Manual backend smoke check while the server is running:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/health"
```

Manual lead intake smoke check while the server is running:

```powershell
$payload = @{
    email = "ada@example.com"
    first_name = "Ada"
    last_name = "Lovelace"
    company_name = "Example Co"
    company_domain = "example.com"
    source = "demo_form"
    lead_score = 90
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/intake" -Method Post -ContentType "application/json" -Body $payload
```

Expected response shape includes deterministic `lead_id`, `run_id`, `run_status`, `dedupe`, `crm`, and nullable `slack` fields. This endpoint uses mock adapters only and persists local lead, run, attempt, and audit records.

Manual persisted run-history lookup:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs"
```

Expected behavior:

- runs are loaded from local persistence and sorted by created timestamp descending, then run ID ascending;
- each run includes `lead_id`, persisted lead `email`, `lead_name`, `company_name`, `company_domain`, derived demo owner, source, current status, run-level error type, created/updated timestamps, attempt count, latest attempt summary, and whether failure detail is available;
- raw audit payloads, phone, message, and unrestricted error detail are not returned.

Manual persisted run-detail lookup for a known run:

```powershell
$runId = "run_demo_failed"
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs/$runId"
```

Expected behavior:

- unknown run IDs return `404`;
- the selected run includes stored lead identity, derived demo owner, source, status, run-level error type, timestamps, all persisted attempts, failure-detail availability, sanitized intake payload, and allowlisted audit/mock result data;
- raw audit payloads, phone, message, secrets, retry buttons/actions, mutation behavior, real CRM, Slack, Google Sheets, OpenAI, paid APIs, and external webhooks are not returned or called.

Manual failure detail lookup for a known failed run:

```powershell
$runId = "<failed-run-id>"
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs/$runId/failure"
```

Expected behavior:

- unknown run IDs return `404`;
- runs without a failed attempt return `409`;
- failed runs return the latest failed attempt, sanitized error detail, suggested action, and a safe allowlist of the stored intake payload.

Manual retry for a known failed or queued run:

```powershell
$runId = "<failed-or-queued-run-id>"
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs/$runId/retry" -Method Post
```

Expected behavior:

- unknown run IDs return `404`;
- unsafe non-local or non-mock provider settings return `403` before mutating persisted run records;
- successful or already-retried runs return `409`;
- failed or queued runs append a local `retried` attempt, update the run status to `retried`, and write a `manual_retry` audit record;
- retry is local persistence only and does not call real CRM, Slack, Google Sheets, OpenAI, paid APIs, or external webhooks.

Reset and seed deterministic local demo runs:

```powershell
uv run python -m backend.app.leads.demo_reset --apply
```

Expected behavior:

- refuses to run unless `APP_ENV` is local/demo/test/development, mock providers are enabled, and the database URL points to local SQLite or a local `salesops_*` demo/test PostgreSQL database;
- dry-runs without `--apply` and reports matched rows without mutating the database;
- deletes rows explicitly marked through local `leads.is_demo` or `automation_runs.is_demo`;
- keeps a narrow backward-compatible fallback for pre-marker known demo IDs and reserved example/test-domain synthetic smoke rows;
- writes exactly four synthetic demo runs marked as demo data: success, failed, queued, and retried;
- uses fixed timestamps and local SQLAlchemy persistence only;
- does not call real CRM, Slack, Google Sheets, OpenAI, paid APIs, webhooks, or external services.

If you only need to refresh the four known seed records without removing old synthetic
smoke rows, run `uv run python -m backend.app.leads.demo_seed`.

## 7.1 Local Database Commands

The local persistence foundation uses local PostgreSQL through Docker Compose. These commands do not call external CRM, Slack, Google Sheets, OpenAI, or paid APIs.

```powershell
docker compose config
docker compose up -d postgres
uv run alembic upgrade head
```

SQLite is used only in repository unit tests to validate SQLAlchemy mappings without requiring Docker for every test run.

## 7.2 Local Persistence Run-History Smoke

Use this smoke path to verify that persisted run history is wired to local PostgreSQL. These commands are local-only and do not call real CRM, Slack, Google Sheets, OpenAI, paid APIs, or external webhooks.

Create the ignored local `.env` only if it is missing:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
```

Verify that `DATABASE_URL` exists and points at the local development PostgreSQL database without printing the value:

```powershell
$databaseUrlLine = Select-String -LiteralPath ".env" -Pattern "^DATABASE_URL=" | Select-Object -First 1
if ($null -eq $databaseUrlLine) { throw "DATABASE_URL is missing from .env" }

$databaseUrl = $databaseUrlLine.Line -replace "^DATABASE_URL=", ""
if ($databaseUrl -notmatch "^postgresql\+psycopg://[^@]+@(localhost|127\.0\.0\.1):5432/salesops_local$") {
    throw "DATABASE_URL does not look like the local Docker PostgreSQL database."
}

"DATABASE_URL is present and points at local development PostgreSQL; value not printed."
```

Start PostgreSQL, apply migrations, and reset deterministic demo run data:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
```

Start the backend API:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8010 --log-level debug
```

In a second PowerShell window, call the persisted run-history endpoint:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8010/leads/runs"
```

Expected run-history result:

- HTTP 200 with sanitized run-history JSON;
- records include stored lead identity, run metadata, and latest attempt summaries;
- raw audit payloads, phone, message, and unrestricted error fields are not returned.

Call a selected persisted run detail:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8010/leads/runs/run_demo_failed"
```

Expected run-detail result:

- HTTP 200 with the selected run, all persisted attempts, sanitized intake payload, and allowlisted audit/mock result data;
- unknown IDs return HTTP 404;
- raw audit payloads, phone, message, secrets, retry actions, mutation behavior, and real external calls are absent.

## 8. Frontend Commands

```powershell
pnpm install
pnpm --dir apps/web dev
pnpm --dir apps/web lint
pnpm --dir apps/web test -- --run
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

The frontend app runs at `http://localhost:3000` by default. It proxies local intake submissions through `POST /api/leads/intake`, read-only persisted run history through `GET /api/leads/runs`, and selected run detail through `GET /api/leads/runs/[runId]` to the FastAPI backend. The `/admin/runs` screen stays read-only, supports URL-backed status/source/search/date/owner/error-type filters client-side, and does not trigger retry, edit, delete, submit, resubmit, rerun, send, archive, worker-start, background-job, `POST`, `PUT`, `PATCH`, or `DELETE` actions.

## 9. Manual Frontend Verification

Start backend and frontend in separate PowerShell windows:

```powershell
uv run uvicorn backend.app.main:app --reload
```

```powershell
pnpm --dir apps/web dev
```

Submit a lead through the UI:

1. Open `http://localhost:3000`.
2. Fill required form fields with synthetic data, for example `ada@example.com`, `Ada`, `Lovelace`, `Example Co`, `example.com`, source `demo_form`, lead score `90`.
3. Select `Submit lead`.
4. Confirm the latest result shows `Success`, backend dedupe `unique`, CRM action, Slack sent/skipped, and a dashboard row.

Test duplicate handling:

1. Submit the same email or company domain again during the same browser session.
2. Confirm the UI shows a same-session duplicate hint.
3. Confirm the backend dedupe field remains displayed separately and reports persisted backend dedupe once the first lead has been stored locally.

Test CSV import:

1. Paste this CSV into the CSV input:

```text
email,first_name,last_name,company_name,company_domain,lead_score,job_title
grace@example.com,Grace,Hopper,Example Co,example.com,88,Director
```

2. Select `Import rows`.
3. Confirm the import summary reports one local submission and the dashboard includes the CSV row with source `csv_upload`.
4. Remove a required CSV value and import again to verify row-level validation errors appear before invalid rows are submitted.

Test read-only persisted admin run history:

1. Reset local demo data with `uv run python -m backend.app.leads.demo_reset --apply` after PostgreSQL is running and migrations are applied.
2. Open `http://localhost:3000/admin/runs`.
3. Confirm the page shows persisted seeded runs such as `run_demo_success`, `run_demo_failed`, `run_demo_queued`, and `run_demo_retried`.
4. Confirm the page shows persisted lead email/name/company identity, derived demo owner, run status, source, run-level error type, timestamps, attempt count, latest attempt summary, and failure-detail availability.
5. Apply the status filter `failed` and confirm only `run_demo_failed` remains visible while the URL includes `status=failed`.
6. Clear the status filter, apply the source filter `csv_upload`, and confirm only CSV-sourced runs remain visible while the URL includes `source=csv_upload`.
7. Search for `atlas` and confirm only `run_demo_retried` remains visible while the URL includes `q=atlas`; combine source and search to confirm the filters intersect.
8. Use the Owner filter and confirm only rows for that derived owner remain visible while the URL includes `owner=<owner-name>`.
9. Use the Error type filter with `adapter` and confirm failed/retried adapter-error rows remain visible while rows without a run-level error type are hidden.
10. Confirm `Reset filters` stays visually secondary, is aligned with the filter group, wraps cleanly on narrow layouts, and clears active filters.
11. Search for a value with no matches and confirm the filtered empty state says no runs match the filters.
12. Apply date filters such as `from=2026-06-01` and `to=2026-06-01` and confirm the date values persist in the URL.
13. Select `View details` for a run such as `run_demo_failed`.
14. Confirm the same-page detail panel shows the selected run, derived owner/error type, persisted attempts, sanitized intake payload, and allowlisted mock/audit result data.
15. Change filters so the selected run is hidden, for example open `http://localhost:3000/admin/runs?status=success&runId=run_demo_failed`, and confirm the page explicitly says the selected run is outside the current filtered list while keeping the read-only detail visible.
16. Confirm the browser Network tab shows only local GET requests such as `/api/leads/runs` and `/api/leads/runs/run_demo_failed`.
17. Confirm no retry button, mutation action, edit action, delete action, send action, archive action, POST, PUT, PATCH, DELETE, real external API call, or webhook is visible or triggered.

## 10. Current Local Validation

```powershell
git status --short
git diff --check
uv run --no-python-downloads --python 3.12 --frozen pytest
uv run --no-python-downloads --python 3.12 --frozen ruff check .
uv run --no-python-downloads --python 3.12 --frozen mypy backend tests
pnpm --dir apps/web lint
pnpm --dir apps/web test -- --run
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
git ls-files -- .github
```

Also run the current phase's tracked secret-pattern, CI/deploy-config, and live-endpoint `git grep` scans. The secret and live-endpoint scans should return no matches. The CI/deploy scan should return no tracked workflow or deployment config; GitHub workflow files should remain absent unless the user explicitly requests CI later.

## 10.1 Full Local Portfolio Handoff Validation

```powershell
uv sync --frozen
uv run pytest
uv run ruff check .
uv run mypy backend tests
pnpm install --frozen-lockfile
pnpm --dir apps/web lint
pnpm --dir apps/web test -- --run
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
docker compose config
git diff --check
Test-Path -LiteralPath ".github\workflows"
git ls-files -ci --exclude-standard
git ls-files -- apps/web/tsconfig.tsbuildinfo
git check-ignore -v apps/web/tsconfig.tsbuildinfo apps/web/.next apps/web/node_modules node_modules coverage/ apps/web/coverage/ .mypy_cache .pytest_cache .ruff_cache .venv .env logs/uvicorn-smoke.out.log
git diff --cached --name-only
git status --short
```

Live Docker/PostgreSQL and manual HTTP smoke checks require starting containers and local servers. If they cannot be run on a machine, record the reason in `STATE.md`; static `docker compose config`, automated API/repository tests, and frontend tests remain required.

`apps/web/tsconfig.tsbuildinfo` is an ignored generated artifact and should not be tracked. Verify it with `git ls-files -- apps/web/tsconfig.tsbuildinfo` and `git check-ignore -v apps/web/tsconfig.tsbuildinfo`; TypeScript and Next.js validation may rewrite the local ignored file without producing a tracked diff.

For a local portfolio demo smoke with temporary ports:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028 --log-level info
```

In another PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Open `http://127.0.0.1:3042/admin/runs`, confirm unfiltered seeded runs load, apply status/source/search/date/owner/error-type filters, confirm the filtered empty state, select a run detail after filtering, open `http://127.0.0.1:3042/admin/runs?status=success&runId=run_demo_failed`, confirm the selected-run-hidden notice, and verify browser requests for admin interactions remain local GET-only.

Open `http://127.0.0.1:3042/docs` and confirm it redirects to the local FastAPI docs at `http://127.0.0.1:8028/docs`.

## 10.2 Final Local Portfolio Recording Checklist

Use this checklist before recording the manual portfolio demo, capturing screenshots, handing the project to a reviewer, or manually preparing a commit. The demo is local-first and mock-safe: it does not require paid APIs, production credentials, real provider dashboards, webhooks, GitHub Actions, staging, commits, or pushes.

### Pre-Recording Commands

Run these commands from the repository root in PowerShell. Docker Desktop must be running because the recording path uses the local PostgreSQL service from `compose.yml`.

1. Confirm the worktree and staging area before validation:

```powershell
git status --short --branch
git diff --cached --name-only
```

2. For a fresh clone or clean machine, install locked dependencies if they are not already present:

```powershell
uv sync --frozen
pnpm install --frozen-lockfile
```

3. Create the local ignored `.env` from placeholders only if it is missing. Do not print the file contents during recording:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
```

4. Start local PostgreSQL, apply migrations, and reset synthetic demo data:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
```

5. Start the backend on a free local-only port. Port `8028` is the known-good recording example; choose another free local port if it is busy:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

6. Start the frontend in a second PowerShell window, pointed at that backend. Port `3042` is the known-good recording example; choose another free local port if it is busy:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

If you chose different ports, replace `8028` and `3042` in the commands and browser URLs below.

### Browser Pages To Show

Open these local pages in the recording browser:

- `http://127.0.0.1:3042/` for the public lead form and CSV import;
- `http://127.0.0.1:3042/admin/runs` for the read-only persisted admin dashboard;
- `http://127.0.0.1:3042/docs` for the local FastAPI docs redirect;
- `http://127.0.0.1:3042/admin/runs?status=failed` for status filtering; expect seeded `run_demo_failed`;
- `http://127.0.0.1:3042/admin/runs?source=csv_upload` for source filtering; expect seeded `run_demo_failed`;
- `http://127.0.0.1:3042/admin/runs?q=atlas` for search filtering; expect seeded `run_demo_retried`;
- `http://127.0.0.1:3042/admin/runs?owner=Maya%20Patel` for owner filtering; expect seeded `run_demo_failed` and `run_demo_queued`;
- `http://127.0.0.1:3042/admin/runs?errorType=adapter` for error-type filtering; expect seeded `run_demo_failed` and `run_demo_retried`;
- `http://127.0.0.1:3042/admin/runs?from=2026-06-01&to=2026-06-01` for date filtering; expect the four seeded demo runs because the demo seed uses fixed `2026-06-01` timestamps;
- `http://127.0.0.1:3042/admin/runs?q=no-such-run` for the filtered empty state;
- `http://127.0.0.1:3042/admin/runs?status=success&runId=run_demo_failed` for the selected-run-hidden detail path; expect the success row in the table plus the detail panel for `run_demo_failed`.

### Screenshot And Recording Targets

Use `docs/DEMO_ASSETS.md` as the source of truth for exact filenames and framing.

- Store still screenshots in `docs/assets/screenshots/`.
- Store optional GIFs and video exports in `docs/assets/demo/`; keep draft recordings untracked unless the user intentionally selects them.
- Capture desktop screenshots at `1440x1100` when practical, or `1365x900` when a smaller local display is used.
- Capture mobile-width stills at `390x844`.
- Keep browser zoom at `100%`.
- Include the local browser URL when it helps prove the route, especially for `/docs` redirect evidence.
- Do not capture `.env`, secrets, provider dashboards, private browser tabs, personal account data, real customer data, or unrelated local files.

Recommended final stills:

- `salesops-home.png`: public form and CSV import entry point.
- `salesops-csv-session-dashboard.png`: synthetic CSV import and session dashboard.
- `salesops-admin-run-history.png`: seeded read-only run table.
- `salesops-admin-failed-detail.png`: failed run detail with sanitized payload and suggested action.
- `salesops-admin-filtered-detail.png`: selected run detail preserved while filters are active.
- `salesops-admin-empty-filter.png`: optional no-match filter state.
- `salesops-docs-swagger.png`: optional FastAPI Swagger UI after the frontend `/docs` redirect.
- `salesops-mobile-home.png`: optional mobile public intake layout.
- `salesops-mobile-admin-runs.png`: optional mobile admin layout.

On `/admin/runs`, verify:

- seeded success, failed, queued, and retried rows render;
- status, source, search, date, owner, and error-type filters work and update the URL;
- `Reset filters` is visually secondary, aligns with the filter group, wraps cleanly on narrow layouts, and clears active filters;
- selected detail opens on the same page;
- `?status=success&runId=run_demo_failed` shows the selected-run-hidden notice while keeping detail visible;
- admin interactions issue local `GET` requests for `/api/leads/runs` and `/api/leads/runs/<run-id>` only;
- no retry, edit, delete, submit, resubmit, rerun, send, archive, worker, background-job, `POST`, `PUT`, `PATCH`, or `DELETE` controls are visible or triggered;
- if the Next.js dev tools badge appears because the frontend is running under `next dev`, keep it closed or crop it out of final footage when desired. It is a local development indicator, not app behavior or an integration.

On `/docs`, verify that the browser lands on the local FastAPI Swagger UI served by the backend and remains on `127.0.0.1`.

On `/`, verify:

- no old internal or demo-phase label is visible near the heading;
- the public lead form submits a synthetic lead successfully and shows validation, dedupe, mock CRM, and mock Slack outcomes;
- the CSV textarea import submits valid synthetic CSV rows and records them in the session dashboard;
- the CSV file picker is English, custom styled, visually prominent, and updates the visible selected filename;
- desktop and mobile widths render without overlapping controls or page-level horizontal overflow.

### Manual Browser Visual QA

This is a manual browser visual QA procedure, not automated Playwright coverage. The repository does not provide a documented PowerShell-only browser automation script, and no Playwright dependency is required for this check.

Preconditions:

- Use PowerShell from the repository root on Windows 11.
- Docker Desktop must be running for the local PostgreSQL service in `compose.yml`.
- Create ignored local `.env` from `.env.example` if it is missing; do not print real local values.
- Keep CRM, Slack, Google Sheets, OpenAI, paid APIs, provider dashboards, and webhooks absent or mocked.
- Use the existing pre-recording commands above to start local PostgreSQL, apply migrations, seed synthetic demo data, start the backend on `127.0.0.1:8028`, and start the frontend on `127.0.0.1:3042` with both frontend backend-base environment variables pointed at `http://127.0.0.1:8028`.

Open the local pages listed in "Browser Pages To Show", including `/`, `/admin/runs`, the filter URLs, the filtered empty state, and the selected-run-hidden URL.

Visually pass the check only when:

- the public lead form and CSV import render without layout overlap or unreadable controls;
- no old internal/demo-phase label appears near the public-page heading;
- the custom CSV picker is English, visually prominent, and shows selected filename state;
- seeded success, failed, queued, and retried admin rows render with readable status, source, owner, error type, attempts, and failure-detail values;
- status, source, search, date, owner, and error-type filters update the URL and visible rows correctly;
- the filtered empty state, same-page detail panel, and selected-run-hidden notice are visible in the documented scenarios;
- controls wrap cleanly at narrow widths, with table overflow contained in the table scroller rather than the whole page;
- the admin UI remains read-only and exposes no retry, edit, delete, submit, resubmit, rerun, send, archive, worker, background-job, `POST`, `PUT`, `PATCH`, or `DELETE` controls.

Treat these browser findings as blocking:

- application console errors, hydration errors, runtime overlays, or persistent framework error overlays;
- failed local API requests for documented pages or admin interactions;
- non-local network requests, real provider requests, webhooks, or paid/external API calls;
- admin mutation requests or visible mutation controls;
- any visible secret, `.env` content, provider dashboard, private account data, real customer data, or unrelated local files.

These findings are acceptable during manual QA:

- the Next.js dev tools badge when using `next dev`;
- local static asset requests from the Next.js dev server;
- local `GET` requests to `/api/leads/runs`, `/api/leads/runs/<run-id>`, `/leads/runs`, and `/leads/runs/<run-id>`.

Stop local services with `Ctrl+C` in the backend and frontend PowerShell windows. Stop PostgreSQL only if you do not want it running after QA:

```powershell
docker compose stop postgres
```

### Suggested 3-5 Minute Sequence

1. Problem setup, 20 to 30 seconds: explain the growth agency, five sales reps, form/CSV lead intake, duplicate risk, slow handoffs, and poor auditability.
2. Public intake, 45 to 60 seconds: show the public form and CSV import with synthetic data only.
3. Automation behavior, 45 to 60 seconds: explain local validation, persisted dedupe evidence, mock CRM upsert, mock Slack notification, and audit/run records.
4. Admin inspection, 60 to 90 seconds: show `/admin/runs`, apply status/source/search/date/owner/error-type filters, open `run_demo_failed`, show the filtered empty state, and show the selected-run-hidden detail path.
5. Safety and handoff, 30 to 45 seconds: explain local-only defaults, mocked integrations, placeholder-only `.env.example`, no paid APIs, no production credentials, and approval-gated future live providers.

### What Not To Show

- Do not show `.env` contents, local secrets, tokens, private keys, webhook URLs, account IDs, client secrets, refresh tokens, or terminal output that prints any secret value.
- Do not show real HubSpot, Slack, Google Sheets, OpenAI, paid-provider, production, hosting, or private account dashboards.
- Do not show private browser tabs, personal account data, real customer data, or unrelated local files.
- Do not claim that GitHub Actions, staging, deployment, production smoke, real provider smoke, commits, or pushes are part of the portfolio recording path.

### Post-Recording Cleanup

1. Stop the backend and frontend dev servers with `Ctrl+C` in their PowerShell windows.
2. Stop local PostgreSQL only if you do not want it running after recording:

```powershell
docker compose stop postgres
```

3. Close the recording browser/session and review generated artifacts before any manual commit:

```powershell
git status --short
git diff --stat
git ls-files -ci --exclude-standard
git ls-files -- apps/web/tsconfig.tsbuildinfo
git check-ignore -v apps/web/tsconfig.tsbuildinfo apps/web/.next apps/web/node_modules node_modules coverage/ apps/web/coverage/ .mypy_cache .pytest_cache .ruff_cache .venv .env logs/uvicorn-smoke.out.log
```

Generated artifacts such as TypeScript build-info, Next.js output, dependency folders, coverage, caches, logs, and local `.env` files are ignored and should not appear as source changes.

## 11. Docker/PostgreSQL Validation

Use these commands when validating the local PostgreSQL service beyond static Compose configuration:

```powershell
docker compose up -d postgres
docker compose ps
docker compose logs --tail=100 postgres
uv run alembic upgrade head
```

Stop local containers manually when finished if you do not want them running:

```powershell
docker compose stop postgres
```

## 12. Troubleshooting

| Symptom | Likely cause | Action |
|---|---|---|
| Backend command fails because `uv` is missing | `uv` is not installed or not on PATH | Install `uv` locally, then rerun the command |
| Health endpoint is unreachable | Uvicorn is not running or port 8000 is in use | Start the server or choose a free port |
| Lead intake returns 422 | Payload failed local Pydantic validation | Check required fields, email format, company domain, source, and `lead_score` range |
| Lead intake returns a database configuration error | `DATABASE_URL` is missing or PostgreSQL is not available | Create local `.env`, start Docker PostgreSQL, and run Alembic migrations |
| Failure detail returns 404 | The run ID does not exist in the configured local database | Check the run ID and `DATABASE_URL` |
| Failure detail returns 409 | The run exists but has no failed attempt | Use a failed run ID; successful intake runs are not failure records |
| Run history is empty | The configured local database has no persisted run records | Submit leads locally or run `uv run python -m backend.app.leads.demo_reset --apply` |
| Retry returns 409 | The run is already `success` or `retried` | Retry only `failed` or `queued` local runs |
| Frontend cannot submit | Backend is not running or base URL is wrong | Start backend or set `BACKEND_API_BASE_URL` in local ignored `.env` |
| CSV row is not submitted | Client-side CSV validation failed | Check required headers and row-level validation messages |
| Repeated UI submission shows backend `unique` | The first lead was not persisted or the backend is pointing at a fresh database | Check `DATABASE_URL`, migrations, and local PostgreSQL state |
| Docker command fails | Compose file not created yet or Docker is not running | Wait for compose phase or start Docker Desktop |
| `docker compose up -d postgres` fails before creating the local database | Docker Desktop or Docker Engine is not running | Start Docker Desktop, wait for the engine to be ready, rerun `docker compose up -d postgres`, then inspect with `docker compose ps` and `docker compose logs --tail=100 postgres` |
| Real API credential requested | Live integration is not approved | Use mock mode and placeholders |
| `.env` appears in `git status` | Ignore rules or file handling problem | Stop and fix before committing |

## 13. Manual Commit Checklist For User

Codex must not perform these steps.

```powershell
git status --short
git diff --check
git diff --stat
git diff -- .
```

The user may manually stage, commit, and push after reviewing validation results.
