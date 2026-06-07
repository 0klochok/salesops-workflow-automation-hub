# SalesOps Workflow Automation Hub

SalesOps Workflow Automation Hub is a portfolio project for a code-first lead operations workflow. It is ready for local reviewer handoff through a local-only, mock-safe demo path.

Reviewer-facing handoff material, safe future credential boundaries, and a compact demo script are documented in `HANDOFF.md`.

## Problem

A growth agency with 5 sales reps receives leads from forms and CSV uploads. The team manually copies lead details into a CRM and Slack, which creates duplicates, slows response time, misses leads, and leaves weak audit trails.

## Implemented Local Demo

The local demo demonstrates an automated workflow that:

- accepts leads from a public demo form and CSV imports;
- validates lead data;
- deduplicates by email and company domain;
- simulates CRM contact/deal create-or-update behavior through an adapter;
- simulates Slack notifications for qualified leads through an adapter;
- records backup/audit data and automation run history;
- provides an admin dashboard for run status, failures, filters, and failure details, with backend-only manual retry support kept out of the public read-only admin demo.
- documents safe future CRM/Slack credential handoff boundaries in `HANDOFF.md` without adding live integrations.

## Stack

| Area | Technology |
|---|---|
| Backend | FastAPI, Python 3.12+, Pydantic, SQLAlchemy, Alembic |
| Backend tooling | `uv`, pytest, Ruff, mypy |
| Frontend | Next.js App Router, TypeScript, Tailwind CSS, TanStack Table, local shadcn-style primitives |
| Frontend tooling | `pnpm`, Vitest, Testing Library |
| Local database | PostgreSQL through Docker Compose; SQLite is used only as a unit-test fallback for SQLAlchemy mappings |
| Integrations | Mock CRM and mock Slack by default |

## Reviewer Quick Start

Prerequisites:

- Windows 11 with PowerShell;
- Python 3.12+ and `uv`;
- Node.js, Corepack, and `pnpm`;
- Docker Desktop for local PostgreSQL.

From the repository root:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
uv sync
pnpm install
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
```

Start the backend in one PowerShell window. Port `8028` is the reviewer-demo port used by the final local QA path:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

Start the frontend in another PowerShell window, pointed at that local backend:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Open:

- `http://127.0.0.1:3042/` for the public demo form and CSV import;
- `http://127.0.0.1:3042/admin/runs` for the read-only persisted run dashboard;
- `http://127.0.0.1:8028/docs` for local FastAPI API docs.

Reviewer demo checklist:

1. On `/`, submit one synthetic lead through the form and confirm the latest result shows backend dedupe, mock CRM, and mock Slack outcomes.
2. Paste a valid CSV row into the CSV textarea, select `Import rows`, and confirm the session dashboard records the CSV submission.
3. Select a `.csv` file with the custom `Choose CSV file` picker and confirm the visible filename changes.
4. Open `/admin/runs`, confirm seeded success, failed, queued, and retried runs render, then exercise status/source/search/date/owner/error-type filters.
5. Open a run detail such as `run_demo_failed` and confirm the page stays read-only with sanitized failure detail only.

## Current Status

The current local demo includes:

- `backend.app.main:app` exposes `GET /health` and `POST /leads/intake`;
- `POST /leads/intake` validates lead payloads, uses persisted lead snapshots for dedupe, persists local workflow records, and returns deterministic mock workflow results;
- `apps/web` provides a Next.js demo form aligned to the backend request schema;
- the frontend posts through `POST /api/leads/intake`, which proxies to `BACKEND_API_BASE_URL` or `NEXT_PUBLIC_BACKEND_API_BASE_URL`, defaulting to `http://127.0.0.1:8000`;
- CSV rows are parsed client-side/local-app only and submitted through the same local proxy;
- the dashboard stores current browser-session submissions in `sessionStorage`;
- same-session duplicate hints are shown by email/domain in the frontend, while backend `dedupe.status` is displayed separately;
- SQLAlchemy/Alembic persistence is wired into `POST /leads/intake` through explicit DB session dependencies;
- local intake now records leads, automation runs, attempts, and audit records while keeping CRM and Slack mocked by default;
- backend-only failure detail and manual retry endpoints are available for persisted workflow runs;
- a persisted run-history endpoint returns stored runs with persisted lead email, company name, company domain, a derived demo owner, run-level error type, and latest attempt summaries;
- a persisted run-detail endpoint returns one selected run with sanitized attempts, intake payload, and allowlisted mock/audit result data;
- `/admin/runs` provides a read-only frontend view of persisted run history, URL-preserved status/source/search/date/owner/error-type filters, selected run detail, filtered empty state, and selected-run-hidden notice through local `GET` proxy routes;
- deterministic local demo seed data can create success, failed, queued, and retried workflow runs;
- the read-only admin dashboard includes source, owner, and error-type filters using existing persisted/demo data without migrations or mutation controls;
- no auth, real integrations, secrets, deployment config, or GitHub Actions exist.

## Current Portfolio Demo Path

The current demo shows how a growth agency lead can move from intake to an auditable admin view without manual CRM or Slack copy/paste work. It demonstrates local lead validation, persisted dedupe evidence, mock CRM upsert results, mock Slack notification decisions, run attempts, status history, and read-only admin inspection.

The demo is local-only and mock-safe. CRM and Slack behavior is simulated by local adapters, seeded data is synthetic, and the app should not call real HubSpot, Slack, Google Sheets, OpenAI, paid APIs, webhooks, or external services unless explicitly approved for a later phase.

For a before/after workflow explanation, 3-5 minute demo script, and safe real-provider credential handoff checklist, see `HANDOFF.md`.

Current data flow:

```text
lead form or CSV upload
-> POST /api/leads/intake
-> POST /leads/intake
-> persisted lead, automation run, attempt, and audit records
-> GET /leads/runs and GET /leads/runs/{run_id}
-> GET /api/leads/runs and GET /api/leads/runs/[runId]
-> /admin/runs
```

To prepare reviewer data locally, start PostgreSQL, apply migrations, and run the deterministic seed command:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
```

Start the backend and frontend in separate PowerShell windows for the final reviewer demo path:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Open `http://127.0.0.1:3042/`. Confirm the public form has no internal phase label near the heading, the CSV picker is English/custom-styled, form submission works with synthetic data, CSV textarea import works, selected CSV filenames are visible, and desktop/mobile layouts have no obvious overlap.

Open `http://127.0.0.1:3042/admin/runs`. Confirm the seeded success, failed, queued, and retried runs appear; status/source/search/date/owner/error-type filters update the URL; unmatched filters show the filtered empty state; selecting a run opens the same-page read-only detail panel; and a URL such as `http://127.0.0.1:3042/admin/runs?status=success&runId=run_demo_failed` shows that the selected run is outside the current filtered list while keeping its detail visible.

The admin screen is read-only. Interacting with `/admin/runs` should only issue local `GET` requests for run history and selected run detail through the Next.js API proxy. It must not expose retry, edit, delete, submit, resubmit, rerun, worker-start, background-job, `POST`, `PUT`, `PATCH`, or `DELETE` controls.

## Known Limitations And Local-Only Boundaries

- Real CRM integration, paid APIs, production authentication, deployment configuration, and GitHub Actions/CI are intentionally absent.
- CRM, Slack, Google Sheets, OpenAI, paid APIs, production APIs, and webhooks are not required for the documented demo path and must not be called without explicit approval.
- CRM upsert and Slack notification behavior is simulated by local mock adapters.
- The public admin UI is read-only; manual retry exists as a backend-only local endpoint and is intentionally not exposed in `/admin/runs`.
- Source is displayed in the admin run table, included in text search, and available as a dedicated source dropdown filter.
- `HANDOFF.md` documents future CRM/Slack credential boundaries and reviewer demo steps without real secrets or live provider calls.
- `.env.example` contains placeholders only. Keep any local values in ignored `.env` files and do not commit real secrets.
- Codex must not stage, commit, or push. The user manually reviews, stages, commits, and pushes.

Final local handoff checklist:

1. From PowerShell at the repository root, run `docker compose up -d postgres`.
2. Run `uv run alembic upgrade head`.
3. Run `uv run python -m backend.app.leads.demo_seed`.
4. Start the backend on `127.0.0.1:8028`, or another free local port if `8028` is busy.
5. Start the frontend on `127.0.0.1:3042` with `BACKEND_API_BASE_URL` and `NEXT_PUBLIC_BACKEND_API_BASE_URL` pointed at the backend port.
6. Open `/`, confirm public lead form submission, CSV textarea import, and custom CSV file selection all work with synthetic data.
7. Open `/admin/runs`, confirm seeded rows render, status/source/search/date/owner/error-type filters work, selected detail opens, and the selected-run-hidden notice appears for a filtered-out selected run.
8. Confirm the admin path uses local `GET` requests only and has no retry, edit, delete, submit, resubmit, rerun, worker, `POST`, `PUT`, `PATCH`, or `DELETE` controls.
9. Before any manual commit, review generated artifacts with `git status --short` and `git diff --stat`. TypeScript build-info, Next.js output, dependency folders, coverage, caches, logs, and local `.env` files are ignored and should not appear as source changes.

## Local Backend Setup

From the repository root:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
uv sync
uv run --no-python-downloads --python 3.12 --frozen pytest
uv run --no-python-downloads --python 3.12 --frozen ruff check .
uv run --no-python-downloads --python 3.12 --frozen mypy backend tests
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --reload
```

Static local database validation:

```powershell
docker compose config
uv run alembic upgrade head --sql
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

Manual persisted run-history smoke check while the server is running:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs"
```

Expected run rows include persisted `lead_id`, `email`, `company_name`, `company_domain`, derived demo owner, source, status, run-level error type, timestamps, attempt count, latest attempt summary, and failure-detail availability. The response remains read-only and does not expose phone, message, raw audit payloads, or unrestricted error detail.

Manual persisted run-detail smoke check for a known seeded run:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs/run_demo_failed"
```

Expected detail includes the selected run, lead identity, derived demo owner, run-level error type, timestamps, all persisted attempts, sanitized intake payload, and allowlisted mock/audit result data. It remains read-only and does not expose phone, message, raw audit payloads, secrets, retry actions, or mutation behavior.

## Local Frontend Setup

From the repository root:

```powershell
pnpm install
pnpm --dir apps/web dev
```

Open `http://localhost:3000` after the frontend server starts. The read-only admin run-history UI is available at `http://localhost:3000/admin/runs` and shows persisted lead email/company identity, derived owner/error-type fields, URL-backed filters including source, and a same-page selected run detail panel. Keep the backend running at `http://127.0.0.1:8000`, or set a local ignored `.env` override for `BACKEND_API_BASE_URL`.

## Local Validation

Required backend validation:

```powershell
git status --short
git diff --check
uv run --no-python-downloads --python 3.12 --frozen pytest
uv run --no-python-downloads --python 3.12 --frozen ruff check .
uv run --no-python-downloads --python 3.12 --frozen mypy backend tests
```

Required frontend validation:

```powershell
pnpm --dir apps/web lint
pnpm --dir apps/web test -- --run
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

## Roadmap

| Phase | Focus |
|---|---|
| Phase 0 | Documentation and safety rails |
| Phase 1 | Backend foundation |
| Phase 2 | Backend lead intake domain foundation |
| Phase 3 | Frontend demo form, CSV import UI, session dashboard |
| Phase 4 | Persistence foundation, then portfolio polish, seed data, diagrams, handoff docs, demo script |

## Safety Note

This project defaults to mock/no-real-API mode. Do not add real HubSpot, Slack, Google Sheets, OpenAI, paid API credentials, or live API calls unless explicitly approved. Use `.env.example` for placeholders only and keep real local values in ignored `.env` files.
