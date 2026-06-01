# SalesOps Workflow Automation Hub

SalesOps Workflow Automation Hub is a portfolio project for a code-first lead operations workflow. It is currently in Phase 2: backend lead intake domain foundation.

## Problem

A growth agency with 5 sales reps receives leads from forms and CSV uploads. The team manually copies lead details into a CRM and Slack, which creates duplicates, slows response time, misses leads, and leaves weak audit trails.

## Planned Solution

The planned system will demonstrate an automated workflow that:

- accepts leads from a public demo form and CSV imports;
- validates lead data;
- deduplicates by email and company domain;
- simulates CRM contact/deal create-or-update behavior through an adapter;
- simulates Slack notifications for qualified leads through an adapter;
- records backup/audit data and automation run history;
- provides an admin dashboard for run status, failures, filters, failure details, and manual retries.

## Planned Stack

| Area | Planned technology |
|---|---|
| Backend | FastAPI, Python 3.12+, Pydantic, SQLAlchemy, Alembic |
| Backend tooling | `uv`, pytest, Ruff, mypy or pyright |
| Database | PostgreSQL through Docker Compose |
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui, TanStack Table |
| Frontend tooling | `pnpm` |
| Integrations | Mock CRM and mock Slack by default |

## Planned Architecture

```text
lead sources -> FastAPI intake -> validation -> database/run log -> dedupe -> CRM adapter -> Slack adapter -> backup/audit -> admin dashboard
```

CRM, Slack, and Google Sheets are mocked/optional unless real usage is explicitly approved.

## Current Status

Phase 2 adds a local-safe backend lead intake foundation:

- `backend.app.main:app` exposes the FastAPI app object;
- `GET /health` returns deterministic local service health JSON;
- `POST /leads/intake` validates lead payloads and returns deterministic local workflow results;
- lead intake schemas normalize email and company domain values;
- dedupe foundation checks in-memory lead snapshots by normalized email and company domain;
- mock CRM and Slack adapter boundaries return deterministic local records only;
- run logging and retry policy foundations model queued, success, failed, and retried states without persistence;
- configuration reads environment variables with local-safe defaults;
- backend tests, Ruff, and mypy are configured through `uv`;
- `.gitignore` and `.env.example` are present as safety rails;
- no frontend app exists yet;
- no database models or migrations exist yet;
- no real APIs are called;
- no real secrets are created or required.

## Local Backend Setup

From the repository root:

```powershell
uv sync
uv run pytest
uv run ruff check .
uv run mypy backend tests
uv run uvicorn backend.app.main:app --reload
```

Manual health smoke check while the server is running:

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/health"
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

Invoke-RestMethod -Uri "http://localhost:8000/leads/intake" -Method Post -ContentType "application/json" -Body $payload
```

## Roadmap

| Phase | Focus |
|---|---|
| Phase 0 | Documentation and safety rails |
| Phase 1 | Backend foundation |
| Phase 2 | Backend lead intake domain foundation |
| Phase 3 | Frontend demo form, CSV import UI, admin dashboard |
| Phase 4 | Persistence, portfolio polish, seed data, diagrams, handoff docs, demo script |

## Safety Note

This project defaults to mock/no-real-API mode. Do not add real HubSpot, Slack, Google Sheets, OpenAI, paid API credentials, or live API calls unless explicitly approved. Use `.env.example` for placeholders only and keep real local values in ignored `.env` files.

## Local Validation

From the repository root:

```powershell
git diff --check
git status --short
uv run pytest
uv run ruff check .
uv run mypy backend tests
```
