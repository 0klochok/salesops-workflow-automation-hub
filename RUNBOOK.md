# RUNBOOK.md

## 1. Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-03 |
| Status | active draft |
| Project | salesops-workflow-automation-hub-fresh |
| Primary environment | Windows 11 / PowerShell |
| Current phase | Slice 12 - read-only owner and error-type admin filters |

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
Set-Location -LiteralPath "C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh"
```

## 4. Check Git Status

```powershell
git status --short --branch
git remote -v
```

Expected Slice 12 observation: worktree changes should stay limited to the read-only owner/error-type filter slice. No files should be staged, committed, or pushed by Codex.

## 5. Check Tool Versions

```powershell
python --version
uv --version
node --version
corepack --version
pnpm --version
git --version
```

Phase 3 was validated with Node `v24.16.0`, pnpm `11.3.0`, and uv `0.11.16`.

## 6. Environment Variables

- `.env.example` contains placeholders only.
- `.env` is ignored and must contain only local values if created manually.
- Real secrets must not be committed, logged, printed, or placed in docs.
- CRM, Slack, and Google Sheets are mocked/optional unless explicitly approved.
- Frontend local proxy defaults:
  - `BACKEND_API_BASE_URL=http://127.0.0.1:8000`
  - `NEXT_PUBLIC_BACKEND_API_BASE_URL=http://127.0.0.1:8000`
- Phase 4 local database default:
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
uv run python -m backend.app.leads.demo_seed
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
- successful or already-retried runs return `409`;
- failed or queued runs append a local `retried` attempt, update the run status to `retried`, and write a `manual_retry` audit record;
- retry is local persistence only and does not call real CRM, Slack, Google Sheets, OpenAI, paid APIs, or external webhooks.

Seed deterministic local demo runs:

```powershell
uv run python -m backend.app.leads.demo_seed
```

Expected behavior:

- writes exactly four synthetic demo runs: success, failed, queued, and retried;
- replaces only the known `run_demo_*` and `lead_demo_*` seed records on repeat runs;
- uses fixed timestamps and local SQLAlchemy persistence only;
- does not call real CRM, Slack, Google Sheets, OpenAI, paid APIs, webhooks, or external services.

## 7.1 Local Database Commands

The Phase 4 persistence foundation uses local PostgreSQL through Docker Compose. These commands do not call external CRM, Slack, Google Sheets, OpenAI, or paid APIs.

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

Start PostgreSQL, apply migrations, and seed deterministic demo run data:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
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

The frontend app runs at `http://localhost:3000` by default. It proxies local intake submissions through `POST /api/leads/intake`, read-only persisted run history through `GET /api/leads/runs`, and selected run detail through `GET /api/leads/runs/[runId]` to the FastAPI backend. The `/admin/runs` screen stays read-only, supports URL-backed status/search/date/owner/error-type filters client-side, and does not trigger retry, edit, delete, submit, resubmit, rerun, send, archive, worker-start, background-job, `POST`, `PUT`, `PATCH`, or `DELETE` actions.

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

1. Seed local demo data with `uv run python -m backend.app.leads.demo_seed` after PostgreSQL is running and migrations are applied.
2. Open `http://localhost:3000/admin/runs`.
3. Confirm the page shows persisted seeded runs such as `run_demo_success`, `run_demo_failed`, `run_demo_queued`, and `run_demo_retried`.
4. Confirm the page shows persisted lead email/name/company identity, derived demo owner, run status, source, run-level error type, timestamps, attempt count, latest attempt summary, and failure-detail availability.
5. Apply the status filter `failed` and confirm only `run_demo_failed` remains visible while the URL includes `status=failed`.
6. Clear the status filter, search for `atlas`, and confirm only `run_demo_retried` remains visible while the URL includes `q=atlas`.
7. Use the Owner filter and confirm only rows for that derived owner remain visible while the URL includes `owner=<owner-name>`.
8. Use the Error type filter with `adapter` and confirm failed/retried adapter-error rows remain visible while rows without a run-level error type are hidden.
9. Confirm `Reset filters` stays visually secondary, is aligned with the filter group, wraps cleanly on narrow layouts, and clears active filters.
10. Search for a value with no matches and confirm the filtered empty state says no runs match the filters.
11. Apply date filters such as `from=2026-06-01` and `to=2026-06-01` and confirm the date values persist in the URL.
12. Select `View details` for a run such as `run_demo_failed`.
13. Confirm the same-page detail panel shows the selected run, derived owner/error type, persisted attempts, sanitized intake payload, and allowlisted mock/audit result data.
14. Change filters so the selected run is hidden, for example open `http://localhost:3000/admin/runs?status=success&runId=run_demo_failed`, and confirm the page explicitly says the selected run is outside the current filtered list while keeping the read-only detail visible.
15. Confirm the browser Network tab shows only local GET requests such as `/api/leads/runs` and `/api/leads/runs/run_demo_failed`.
16. Confirm no retry button, mutation action, edit action, delete action, send action, archive action, POST, PUT, PATCH, DELETE, real external API call, or webhook is visible or triggered.

## 10. Phase 3 Validation

```powershell
git status --short --branch
pnpm install
pnpm --dir apps/web lint
pnpm --dir apps/web test -- --run
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
git diff --check
Test-Path -LiteralPath ".github\workflows"
$files = Get-ChildItem -Recurse -Force -File | Where-Object { $_.FullName -notmatch "\\(\.git|\.venv|node_modules|\.next|__pycache__|\.pytest_cache|\.mypy_cache|\.ruff_cache)\\" }
$secretPattern = "sk-[A-Za-z0-9_-]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|gh[pousr]_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}"
$endpointPattern = "hooks\.slack\.com|api\.hubapi\.com|api\.openai\.com|sheets\.googleapis\.com"
$files | Select-String -Pattern $secretPattern
$files | Select-String -Pattern $endpointPattern
$files | Select-String -Pattern "[ \t]+$"
```

The forbidden-pattern scans should return no matches for likely real secrets/tokens, real integration endpoints/webhooks, or trailing whitespace. `.github/workflows` should remain absent unless the user explicitly requests CI later.

## 10.1 Slice 12 Validation

```powershell
uv sync --frozen
uv run pytest
uv run ruff check .
uv run mypy backend tests
pnpm install --frozen-lockfile
pnpm --dir apps/web lint
pnpm --dir apps/web test -- --run
git diff -- apps/web/tsconfig.tsbuildinfo
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
git diff -- apps/web/tsconfig.tsbuildinfo
docker compose config
git diff --check
Test-Path -LiteralPath ".github\workflows"
git diff --cached --name-only
git status --short
```

Live Docker/PostgreSQL and manual HTTP smoke checks require starting containers and local servers. If they cannot be run on a machine, record the reason in `STATE.md`; static `docker compose config`, automated API/repository tests, and frontend tests remain required.

`apps/web/tsconfig.tsbuildinfo` is a tracked generated artifact even though `*.tsbuildinfo` is ignored. Check it before and after frontend typecheck/build, and record any validation churn in `STATE.md` instead of staging or committing it without review.

For a local portfolio demo smoke with temporary ports:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028 --log-level info
```

In another PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Open `http://127.0.0.1:3042/admin/runs`, confirm unfiltered seeded runs load, apply status/search/date/owner/error-type filters, confirm the filtered empty state, select a run detail after filtering, open `http://127.0.0.1:3042/admin/runs?status=success&runId=run_demo_failed`, confirm the selected-run-hidden notice, and verify browser requests for admin interactions remain local GET-only.

## 10.2 Final Local Portfolio Handoff Checklist

Use this checklist before recording screenshots, handing the project to a reviewer, or manually preparing a commit.

1. Confirm the worktree before validation:

```powershell
git status --short
git diff --cached --name-only
```

2. Start local PostgreSQL, apply migrations, and seed synthetic demo data:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
```

3. Start the backend on a free local-only port:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port <backend-port>
```

4. Start the frontend in a second PowerShell window, pointed at that backend:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:<backend-port>"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:<backend-port>"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port <frontend-port>
```

5. Open `http://127.0.0.1:<frontend-port>/admin/runs` and verify:

- seeded success, failed, queued, and retried rows render;
- status, search, date, owner, and error-type filters work and update the URL;
- `Reset filters` is visually secondary, aligns with the filter group, wraps cleanly on narrow layouts, and clears active filters;
- selected detail opens on the same page;
- `?status=success&runId=run_demo_failed` shows the selected-run-hidden notice while keeping detail visible;
- admin interactions issue local `GET` requests for `/api/leads/runs` and `/api/leads/runs/<run-id>` only;
- no retry, edit, delete, submit, resubmit, rerun, send, archive, worker, background-job, `POST`, `PUT`, `PATCH`, or `DELETE` controls are visible or triggered.

6. Review generated artifacts before any manual commit:

```powershell
git status --short
git diff --stat
```

`apps/web/tsconfig.tsbuildinfo` is ignored by `.gitignore` but currently tracked. TypeScript and Next.js validation may modify it; treat that as generated validation churn unless the user separately approves repository cleanup.

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
| Run history is empty | The configured local database has no persisted run records | Submit leads locally or run `uv run python -m backend.app.leads.demo_seed` |
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
