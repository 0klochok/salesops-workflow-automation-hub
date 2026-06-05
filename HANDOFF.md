# SalesOps Portfolio Handoff

## 1. Purpose

This handoff document explains how to review the current local portfolio demo and how future real CRM or Slack credential work would be introduced safely.

The current project is local-only and mock-first. It does not require, store, print, or call real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service credentials.

## 2. Current Mock Boundaries

The implemented workflow keeps CRM and Slack behind adapter boundaries:

- `backend/app/leads/adapters.py` defines the `CrmAdapter` and `SlackNotifier` protocols.
- `MockCrmAdapter` simulates contact/deal create-or-update behavior.
- `MockSlackNotifier` simulates qualified-lead notifications.
- `backend/app/leads/service.py` injects those adapter protocols into `LeadIntakeService`.
- `backend/app/config.py` reads local-safe provider settings, but there is no live provider dispatch or SDK integration.

The public demo and `/admin/runs` read-only dashboard use local FastAPI and Next.js routes. The admin screen should only issue local `GET` requests for persisted run history and selected run detail.

## 3. Credential Handling Rules

Use these rules before any future real-provider work:

- Keep real secrets only in ignored local `.env` files or a later approved secret manager.
- Keep `.env.example` placeholder-only.
- Do not place real tokens, webhook URLs, private keys, account IDs, client secrets, refresh tokens, or personal credentials in docs, tests, fixtures, screenshots, logs, prompts, or source files.
- Do not print secrets while validating configuration.
- Do not add GitHub Actions, deployment config, hosted automation, or production credentials unless explicitly requested.
- Do not call real HubSpot, Slack, Google Sheets, OpenAI, paid APIs, production APIs, webhooks, or external services without explicit approval for the exact usage.

The current placeholder names in `.env.example` document likely future configuration shape only. They are not active live integration settings.

## 4. Future Live-Provider Implementation Path

Any real CRM or Slack implementation should be a separate, approved phase. The minimum safe path is:

1. Confirm the provider, account, environment, allowed operations, rate limits, and test-data policy with the owner.
2. Add provider-specific adapter classes behind the existing `CrmAdapter` and `SlackNotifier` protocols.
3. Keep mock mode as the default and require an explicit local setting before live adapters can be selected.
4. Validate provider settings at startup without printing secret values.
5. Use mocked HTTP clients or fake provider servers in automated tests.
6. Add contract tests for success, update, duplicate, failure, timeout, and retry-safe behavior.
7. Add redaction tests for logs, audit records, API responses, and UI detail views.
8. Run the full local quality gate before any manual review.
9. Perform any real-provider smoke only after explicit approval and only with synthetic test leads.

Do not expose retry or mutation controls in the public admin demo unless that becomes an explicitly approved product change. The current public admin boundary is read-only by design.

## 5. Before And After Workflow

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
- The admin dashboard shows run status, source, owner, error type, failure detail, and retry history without exposing public mutation controls.

## 6. Demo Script And Video Plan

Target length: 3 to 5 minutes.

1. Problem setup, 20 to 30 seconds: describe the growth agency, five sales reps, form/CSV lead intake, duplicate risk, slow handoffs, and weak auditability.
2. Public intake, 45 to 60 seconds: submit one synthetic lead through the demo form, then import one CSV row. Show validation feedback and current-session results.
3. Automation behavior, 45 to 60 seconds: explain persisted dedupe, mock CRM upsert, mock Slack notification, and local audit/run records.
4. Admin inspection, 60 to 90 seconds: open `/admin/runs`, filter by status/source/owner/error type, search for a seeded company, and open `run_demo_failed` details.
5. Safety and handoff, 30 to 45 seconds: point to this handoff doc, explain mock-only defaults, placeholder-only env handling, and the approval requirement for live providers.

## 7. Reviewer Checklist

From the repository root in PowerShell:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
```

Start the backend:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```

Start the frontend in a second PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8000"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8000"
pnpm --dir apps/web dev
```

Review:

- `README.md` for the portfolio overview and quick start.
- `DESIGN.md` for the architecture flow and persistence data model diagrams.
- `RUNBOOK.md` for the detailed local smoke workflow.
- `REQ.md` for feature scope and local-only boundaries.
- `http://localhost:3000` for the public form and CSV import.
- `http://localhost:3000/admin/runs` for the read-only persisted run dashboard.

Expected reviewer signals:

- seeded success, failed, queued, and retried runs render;
- filters by date, source, status, owner, and error type work;
- selected run detail shows sanitized payload and attempt history;
- public admin interactions remain local read-only `GET` requests;
- no real provider calls, secrets, deployment config, GitHub Actions, staging, commits, or pushes are required.
