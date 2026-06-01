# SalesOps Workflow Automation Hub

SalesOps Workflow Automation Hub is a portfolio project for a code-first lead operations workflow. It is currently in Phase 1: backend foundation.

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

Phase 1 has started with a minimal local FastAPI backend:

- `backend.app.main:app` exposes the FastAPI app object;
- `GET /health` returns deterministic local service health JSON;
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

## Roadmap

| Phase | Focus |
|---|---|
| Phase 0 | Documentation and safety rails |
| Phase 1 | Backend foundation |
| Phase 2 | Lead processing, dedupe, CRM/Slack mocks, retry logic |
| Phase 3 | Frontend demo form, CSV import UI, admin dashboard |
| Phase 4 | Portfolio polish, seed data, diagrams, handoff docs, demo script |

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
