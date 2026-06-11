# SalesOps Portfolio Handoff

## Purpose

This document gives a reviewer or future maintainer the shortest safe path to run, demo, and hand off the local SalesOps Workflow Automation Hub portfolio project.

The current project is local-only and mock-first. It does not require, store, print, or call real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service credentials.

For a concise 5-10 minute portfolio reviewer path, use [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md). For the client-facing portfolio story, use [docs/CASE_STUDY.md](docs/CASE_STUDY.md). For optional screenshot, GIF, or video planning, use [docs/DEMO_ASSETS.md](docs/DEMO_ASSETS.md). This handoff keeps the fuller operating notes, credential boundary, and future live-provider guidance.

## Current Mock Boundaries

- `backend/app/leads/adapters.py` defines the `CrmAdapter` and `SlackNotifier` protocols.
- `MockCrmAdapter` simulates contact/deal create-or-update behavior.
- `MockSlackNotifier` simulates qualified-lead notifications.
- `backend/app/leads/service.py` injects those protocols into the lead workflow service.
- `backend/app/config.py` reads local-safe configuration, but there is no live provider dispatch or SDK integration.
- The public demo and `/admin/runs` dashboard use local FastAPI, local Next.js routes, and local PostgreSQL.
- The admin screen should issue local `GET` requests for persisted run history and selected run detail, plus `POST /api/leads/runs/<run-id>/retry` only when retrying a failed or queued selected run.

## Local Run Sequence

Run from the repository root in PowerShell. Create `.env` only from placeholders and do not print local secret values.

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
uv sync
pnpm install
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
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

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:8028/docs`

## Demo Reset And Seed Notes

The recommended deterministic reviewer reset command is:

```powershell
uv run python -m backend.app.leads.demo_reset --apply
```

It validates local/mock safety settings, removes rows explicitly marked as demo data plus the narrow legacy synthetic fallback, and reseeds the known deterministic records:

- `run_demo_success`
- `run_demo_failed`
- `run_demo_retried`
- `run_demo_queued`
- their matching `lead_demo_*` records and related attempt/audit rows

If you only need to refresh those four known seed records without removing older synthetic smoke rows, run:

```powershell
uv run python -m backend.app.leads.demo_seed
```

Neither command is intended for production data. Keep the operation local-only and use the repository's documented local database workflow in [RUNBOOK.md](RUNBOOK.md) if a fully fresh local database is needed.

## Suggested 3-5 Minute Demo

1. Problem setup, 20 to 30 seconds: describe the growth agency, 5 sales reps, form/CSV intake, duplicate risk, slow handoffs, and weak auditability.
2. Public intake, 45 to 60 seconds: submit one synthetic lead through the form, then import one CSV row.
3. Automation behavior, 45 to 60 seconds: show validation, persisted dedupe evidence, mock CRM upsert, mock Slack notification, and local audit/run records.
4. Admin inspection, 60 to 90 seconds: open `/admin/runs`, filter by status/source/date/owner/error type, search for a seeded company, open `run_demo_failed`, show sanitized failure detail, and point out the local-only retry action.
5. Safety and handoff, 30 to 45 seconds: point out mock-only defaults, placeholder-only `.env.example`, no CI/deployment/live providers, and approval-gated future provider work.

Expected reviewer signals:

- seeded success, failed, queued, and retried runs render;
- filters by date, source, status, owner, and error type work;
- selected run detail shows sanitized payload and attempt history;
- public admin interactions remain local-only, with retry limited to `POST /api/leads/runs/<run-id>/retry` for failed or queued selected runs;
- no demo reset, edit, delete, submit, resubmit, rerun, send, archive, worker, `PUT`, `PATCH`, or `DELETE` control is visible in the admin UI;
- no real provider calls, secrets, deployment config, GitHub Actions, staging, commits, or pushes are required.

## Before And After Workflow

Before:

- Leads arrive from forms and CSV uploads.
- Sales reps manually copy lead data into a CRM.
- Qualified-lead notifications are sent manually.
- Duplicate checks are inconsistent.
- Failures and missed leads are hard to reconstruct.

After:

- Leads enter through a validated local API and Next.js demo UI.
- Email and company-domain dedupe evidence is recorded.
- CRM upsert and Slack notification steps are simulated by deterministic mock adapters.
- Lead, run, attempt, and audit records are persisted locally.
- The admin dashboard shows run status, source, owner, error type, failure detail, retry history, and guarded local retry without exposing reset or live-provider mutation controls.

## Known Local Warnings

- The backend pytest suite has recently emitted one FastAPI/Starlette `TestClient` deprecation warning. It is tracked in [STATE.md](STATE.md) when present and does not fail the test gate.
- The Next.js dev server may show a local dev indicator when using `next dev`. That is a development overlay, not app behavior or a provider integration.
- Docker Desktop must be running for the documented local PostgreSQL demo path.

## Credential Handling Rules

Use these rules before any future real-provider work:

- Keep real secrets only in ignored local `.env` files or a later approved secret manager.
- Keep `.env.example` placeholder-only.
- Do not place real tokens, webhook URLs, private keys, account IDs, client secrets, refresh tokens, or personal credentials in docs, tests, fixtures, screenshots, logs, prompts, or source files.
- Do not print secrets while validating configuration.
- Do not add GitHub Actions, deployment config, hosted automation, or production credentials unless explicitly requested.
- Do not call real HubSpot, Slack, Google Sheets, OpenAI, paid APIs, production APIs, webhooks, or external services without explicit approval for the exact usage.

The current placeholder names in `.env.example` document likely future configuration shape only. They are not active live integration settings.

## Future Live-Provider Boundary

Any real CRM or Slack implementation should be a separate, approved phase. Keep mock mode as the default, add live adapters behind the existing protocols only after approval, test with mocked clients first, add redaction coverage, and perform any real-provider smoke only with explicit approval and synthetic test leads.
