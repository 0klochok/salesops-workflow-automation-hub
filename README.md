# SalesOps Workflow Automation Hub

SalesOps Workflow Automation Hub is a local-first portfolio demo for automating a growth agency's lead intake workflow. It accepts leads from a public form and CSV upload, validates and deduplicates them, simulates CRM contact/deal upsert behavior, simulates qualified-lead Slack notification, persists audit/run records, and gives reviewers a read-only admin dashboard for run history and failure detail.

The demo is built for a fake growth agency with 5 sales reps. It is intended for sales operations, revenue operations, and agency teams that need faster lead handoff, fewer duplicates, and clearer auditability without depending on spreadsheets or manual CRM/Slack updates.

All demo data is synthetic. All CRM and Slack behavior is deterministic mock behavior. No paid APIs, real provider calls, live webhooks, production accounts, or real customer data are required to run or review the project locally.

## 60-Second Portfolio Read

- **Client problem:** a growth agency with 5 sales reps is losing time and audit clarity to manual form/CSV lead handling, duplicate checks, CRM updates, and Slack handoffs.
- **Automated workflow:** local intake validates leads, checks duplicates by email and company domain, simulates CRM contact/deal upsert, simulates qualified-lead Slack notification, and stores run/audit evidence.
- **Reviewer proof:** committed screenshots show the public intake page, CSV import evidence, read-only admin run history, filtered admin views, and sanitized failure detail.
- **Safety boundary:** the project is mock-only and local-first by default; it does not require or call real HubSpot, Slack, Google Sheets, OpenAI, paid APIs, production APIs, or live webhooks.

## What It Does

- Accepts synthetic leads through a FastAPI intake endpoint and a Next.js demo form.
- Imports CSV leads through the frontend and submits them through the same local intake path.
- Validates lead payloads with Pydantic.
- Detects duplicates by email and company domain against persisted local lead snapshots.
- Simulates CRM contact/deal create-or-update behavior with a mock adapter.
- Simulates Slack notifications for qualified leads with a mock adapter.
- Persists local lead, automation run, attempt, and audit records.
- Shows a read-only admin run-history dashboard with date, source, status, owner, error-type, and search filters.
- Shows selected run details with sanitized payload, validation/failure context, attempts, and suggested action.
- Keeps manual retry as a backend-only local endpoint; the public admin demo stays read-only.

## Demo Proof Points

- Form and CSV leads use the same local intake path.
- Invalid or duplicate-prone leads produce inspectable validation, dedupe, and failure evidence.
- Qualified synthetic leads show mock CRM and mock Slack outcomes without leaving the local environment.
- Seeded success, failed, queued, and retried runs make the admin dashboard useful immediately after setup.
- Reviewers can filter run history by date, source, status, owner, error type, and search text, then inspect sanitized failure detail.

## Tech Stack

| Area | Technology |
|---|---|
| Backend | FastAPI, Python 3.12+, Pydantic, SQLAlchemy, Alembic |
| Backend tooling | uv, pytest, Ruff, mypy |
| Database | PostgreSQL through Docker Compose; SQLite only for unit-test fallback |
| Frontend | Next.js App Router, TypeScript, Tailwind CSS, TanStack Table, local shadcn-style primitives |
| Frontend tooling | pnpm, Vitest, Testing Library |
| Integrations | Mock CRM and mock Slack adapters only |

## Safety Boundaries

This repository is intentionally local-only by default.

- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider call is required or made by the demo.
- `.env.example` contains placeholders only. Keep local values in ignored `.env` files and do not commit credential values.
- No GitHub Actions, deployment config, production credentials, or live-provider setup is included.
- The public admin dashboard is read-only; backend retry behavior remains local-only and is not exposed as a public admin action.
- Future real-provider work requires a separate approved phase; see [HANDOFF.md](HANDOFF.md) for safe boundaries.

## Screenshots

Portfolio-ready screenshots are stored under `docs/assets/screenshots/` and use synthetic local data only.

![SalesOps public lead form and CSV import](docs/assets/screenshots/salesops-home.png)

![SalesOps CSV import latest result and session dashboard](docs/assets/screenshots/salesops-csv-session-dashboard.png)

![SalesOps read-only admin run-history table](docs/assets/screenshots/salesops-admin-run-history.png)

![SalesOps failed run detail with sanitized retry guidance](docs/assets/screenshots/salesops-admin-failed-detail.png)

![SalesOps filtered admin view with selected run detail preserved](docs/assets/screenshots/salesops-admin-filtered-detail.png)

Asset notes are in [docs/assets/README.md](docs/assets/README.md), and the optional capture checklist is in [docs/DEMO_ASSETS.md](docs/DEMO_ASSETS.md).

Final still screenshots belong in `docs/assets/screenshots/`. Optional GIFs or short recordings belong in `docs/assets/demo/` and should stay untracked until intentionally selected for the portfolio. The exact capture checklist, suggested filenames, and desktop/mobile viewport recommendations are in [docs/DEMO_ASSETS.md](docs/DEMO_ASSETS.md).

Additional local captures for the filtered empty state, `/docs` Swagger redirect, and mobile-width layouts are also kept in `docs/assets/screenshots/` for final portfolio review.

## Quick Start

Prerequisites:

- Windows 11 with PowerShell.
- Python 3.12+ and `uv`.
- Node.js, Corepack, and `pnpm`.
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

Start the backend in one PowerShell window:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

Start the frontend in another PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Open:

- `http://127.0.0.1:3042/` for the public lead form and CSV import.
- `http://127.0.0.1:3042/admin/runs` for the read-only run dashboard.
- `http://127.0.0.1:3042/docs` to redirect to the local FastAPI docs at `http://127.0.0.1:8028/docs`.

## Suggested Demo Walkthrough

1. Submit one synthetic lead from `/` and show validation, backend dedupe, mock CRM, and mock Slack results.
2. Import one valid CSV row and show it in the browser-session dashboard.
3. Open `/admin/runs` and show seeded success, failed, queued, and retried runs.
4. Filter by status, source, owner, error type, date, and search text.
5. Open `run_demo_failed` and show sanitized failure detail and suggested action.
6. Point out that the admin UI is read-only and all provider behavior is mocked locally.

The concise local reviewer checklist is in [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md). The portfolio case study is in [docs/CASE_STUDY.md](docs/CASE_STUDY.md). The full handoff and 3-5 minute script are in [HANDOFF.md](HANDOFF.md). Recommended screenshot, GIF, and video shots are in [docs/DEMO_ASSETS.md](docs/DEMO_ASSETS.md). Detailed local operations are in [RUNBOOK.md](RUNBOOK.md).

## Local Validation

These checks are intended to run locally from PowerShell before treating the portfolio demo as ready for review. They do not require paid APIs or real provider calls.

Run from the repository root:

```powershell
git status --short
git diff --check
uv run ruff check .
uv run mypy .
uv run pytest
pnpm --dir apps/web run lint
pnpm --dir apps/web exec vitest run
pnpm --dir apps/web run typecheck
pnpm --dir apps/web run build
```

If Docker Desktop is available, also validate the documented local database demo path:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
```

## Documentation Map

- [REQ.md](REQ.md): requirements, acceptance criteria, and out-of-scope items.
- [DESIGN.md](DESIGN.md): architecture, data model, and local integration boundaries.
- [RUNBOOK.md](RUNBOOK.md): setup, local smoke checks, troubleshooting, and manual QA.
- [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md): concise local reviewer checklist and asset inventory.
- [docs/DEMO_ASSETS.md](docs/DEMO_ASSETS.md): optional screenshot, GIF, and video capture checklist.
- [docs/CASE_STUDY.md](docs/CASE_STUDY.md): concise portfolio case study for reviewers and clients.
- [TDD.md](TDD.md): test strategy and coverage matrix.
- [HANDOFF.md](HANDOFF.md): reviewer demo sequence and future credential boundary notes.
- [STATE.md](STATE.md): current phase status, latest validation, skipped checks, and known issues.

## Project Status And Limitations

Current status: portfolio-ready local demo, not a production service.

Known boundaries:

- Real CRM, Slack, Google Sheets, OpenAI, paid-provider, production API, webhook, deployment, auth, and CI flows are intentionally absent.
- The admin UI is read-only; backend retry exists for local workflow records but is not exposed in the public admin page.
- Demo seed data is synthetic and deterministic.
- Local PostgreSQL is the documented demo database. SQLite is only used by tests where it is justified as a local fallback.
- Browser recording or video export is not committed; the demo script is documented for manual recording.

Codex must not stage, commit, or push. The user manually reviews, stages, commits, and pushes after local validation.
