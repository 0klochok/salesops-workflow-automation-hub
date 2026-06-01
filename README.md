# SalesOps Workflow Automation Hub

SalesOps Workflow Automation Hub is a portfolio project for a code-first lead operations workflow. It is currently in Phase 4 slice 3: persisted failure details and manual retry endpoints after the Phase 3 frontend demo scaffold.

## Problem

A growth agency with 5 sales reps receives leads from forms and CSV uploads. The team manually copies lead details into a CRM and Slack, which creates duplicates, slows response time, misses leads, and leaves weak audit trails.

## Planned Solution

The planned system demonstrates an automated workflow that:

- accepts leads from a public demo form and CSV imports;
- validates lead data;
- deduplicates by email and company domain;
- simulates CRM contact/deal create-or-update behavior through an adapter;
- simulates Slack notifications for qualified leads through an adapter;
- records backup/audit data and automation run history;
- provides an admin dashboard for run status, failures, filters, failure details, and manual retries.

## Stack

| Area | Technology |
|---|---|
| Backend | FastAPI, Python 3.12+, Pydantic, SQLAlchemy, Alembic |
| Backend tooling | `uv`, pytest, Ruff, mypy |
| Frontend | Next.js App Router, TypeScript, Tailwind CSS, TanStack Table, local shadcn-style primitives |
| Frontend tooling | `pnpm`, Vitest, Testing Library |
| Local database | PostgreSQL through Docker Compose; SQLite is used only as a unit-test fallback for SQLAlchemy mappings |
| Integrations | Mock CRM and mock Slack by default |

## Current Status

The current local demo includes:

- `backend.app.main:app` exposes `GET /health` and `POST /leads/intake`;
- `POST /leads/intake` validates lead payloads, uses persisted lead snapshots for dedupe, persists local workflow records, and returns deterministic mock workflow results;
- `apps/web` provides a Next.js demo form aligned to the backend request schema;
- the frontend posts through `POST /api/leads/intake`, which proxies to `BACKEND_API_BASE_URL` or `NEXT_PUBLIC_BACKEND_API_BASE_URL`, defaulting to `http://127.0.0.1:8000`;
- CSV rows are parsed client-side/local-app only and submitted through the same local proxy;
- the dashboard stores current browser-session submissions in `sessionStorage`;
- same-session duplicate hints are shown by email/domain in the frontend, while backend `dedupe.status` is displayed separately;
- Phase 4 wires SQLAlchemy/Alembic persistence into `POST /leads/intake` through explicit DB session dependencies;
- local intake now records leads, automation runs, attempts, and audit records while keeping CRM and Slack mocked by default;
- backend-only failure detail and manual retry endpoints are available for persisted workflow runs;
- no auth, real integrations, secrets, deployment config, or GitHub Actions exist.

## Local Backend Setup

From the repository root:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
uv sync
uv run pytest
uv run ruff check .
uv run mypy backend tests
docker compose up -d postgres
uv run alembic upgrade head
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

## Local Frontend Setup

From the repository root:

```powershell
pnpm install
pnpm --dir apps/web dev
```

Open `http://localhost:3000` after the frontend server starts. Keep the backend running at `http://127.0.0.1:8000`, or set a local ignored `.env` override for `BACKEND_API_BASE_URL`.

Frontend validation:

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
