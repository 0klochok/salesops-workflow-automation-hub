# CONTEXT.md

## 1. Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Owner | User |
| Status | active draft |
| Current phase | Phase 2 - backend lead intake domain foundation |
| Repository | salesops-workflow-automation-hub-fresh |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Primary runtime | Local Windows 11 / PowerShell |
| Git state | `main`; Phase 2 worktree changes remain unstaged for user review |

## 2. Project Summary

This is a greenfield portfolio project for a code-first sales operations workflow automation demo. The planned system captures leads, validates them, deduplicates them, simulates CRM upserts through an adapter, simulates Slack notifications through an adapter, records backup/audit data, and exposes an admin dashboard for runs, failures, and manual retries.

The fake client is a growth agency with 5 sales reps. Leads arrive from multiple forms and CSV uploads. The current manual process copies leads into a CRM and Slack, which causes duplicates, missed leads, slow response times, and weak auditability.

The backend now includes a `uv`-managed FastAPI app, local-safe settings, a deterministic health endpoint, and a Phase 2 lead intake domain foundation. `POST /leads/intake` validates synthetic lead payloads, runs deterministic in-memory dedupe, calls mock CRM/Slack adapter boundaries, and returns local run results without persistence or network calls. CRM, Slack, Google Sheets, PostgreSQL, and other external services are not required for startup.

## 3. Source-of-Truth Files

| File | Responsibility |
|---|---|
| `AGENTS.md` | Codex and agent operating rules |
| `CONTEXT.md` | Current context, assumptions, stack, and constraints |
| `STATE.md` | Current phase, status, validation, and open questions |
| `DESIGN.md` | Planned architecture, data model, adapter boundaries |
| `EXEC_PLAN.md` | Delivery phases, acceptance criteria, validation commands |
| `REQ.md` | Product requirements and out-of-scope items |
| `RUNBOOK.md` | Local setup, operational commands, troubleshooting |
| `TDD.md` | Test strategy, matrix, and quality gate expectations |
| `README.md` | Portfolio-facing overview and roadmap |

## 4. Constraints And Safety Defaults

- Codex must not commit or push.
- User manually commits and pushes.
- Use `uv` for backend dependencies.
- Do not scaffold Next.js, `apps/web`, or frontend code in Phase 2.
- Do not call real external APIs.
- Do not create real secrets or commit a real `.env` file.
- Use `.env.example` only for placeholders.
- Local validation comes before GitHub Actions.
- GitHub Actions are out of scope until local validation is stable and explicitly requested.
- Use quoted PowerShell paths or `-LiteralPath` because the repo path contains spaces and Cyrillic characters.

## 5. Planned Stack

| Area | Planned choice | Notes |
|---|---|---|
| Backend | FastAPI, Python 3.12+, Pydantic; SQLAlchemy and Alembic planned later | FastAPI foundation and lead intake domain added |
| Backend tooling | `uv`, pytest, Ruff, mypy | Configured in Phase 1 |
| Database | PostgreSQL through Docker Compose | Future phase; Phase 2 has no database dependency |
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui, TanStack Table | Planned for Phase 3 |
| Frontend tooling | `pnpm` | Default for TypeScript/JavaScript |
| Integrations | Mocked CRM and mocked Slack by default | Real services require explicit approval |
| Optional integration | Google Sheets | Mocked/optional unless explicitly approved |
| CI/CD | Not configured | Local validation first |

## 6. Planned Repository Shape

Current Phase 2 repository contents include root-level backend foundation code and the lead intake domain package. Future phases may introduce frontend and additional docs/scripts:

```text
/
  backend/
    app/        # FastAPI app, settings, health endpoint, lead intake domain
  tests/        # backend tests
  apps/
    web/        # planned Next.js frontend
  docs/         # optional durable docs, diagrams, handoff materials
  scripts/      # optional local validation and seed scripts
  pyproject.toml
  uv.lock
  AGENTS.md
  CONTEXT.md
  DESIGN.md
  EXEC_PLAN.md
  README.md
  REQ.md
  RUNBOOK.md
  STATE.md
  TDD.md
  .env.example
  .gitignore
```

## 7. Core Planned Features

- Lead intake API endpoint with Pydantic validation. Phase 2 local foundation implemented.
- Public demo lead form.
- CSV lead import.
- Duplicate detection by email and company domain. Phase 2 in-memory foundation implemented.
- CRM upsert adapter for contact/deal create-or-update behavior. Phase 2 mock boundary implemented.
- Slack notification adapter for qualified lead notifications. Phase 2 mock boundary implemented.
- Automation run log with queued, success, failed, and retried statuses. Phase 2 local model implemented.
- Manual retry for failed automation runs. Phase 2 deterministic retry policy implemented.
- Error detail page with payload, validation issue, and suggested action.
- Admin table with filters by date, source, status, lead owner, and error type.
- Backup/audit records.

## 8. Assumptions

- CRM behavior is mocked by default.
- Slack notification behavior is mocked/logged by default.
- Google Sheets is optional and mocked/disabled unless approved later.
- No paid API usage is allowed without explicit approval.
- Synthetic demo data will be used.
- No production deployment is planned in early phases.
- PostgreSQL is the primary database target for a future persistence phase; Phase 2 has no database dependency or SQLite fallback.

## 9. Open Questions

| ID | Question | Needed by | Current default |
|---|---|---|---|
| Q-001 | Should the final demo use real HubSpot or only a mock CRM? | Before live integration work | Mock CRM |
| Q-002 | Should Slack use a real webhook or a mock/log notifier? | Before live notification work | Mock/log notifier |
| Q-003 | What rule assigns leads to the 5 sales reps? | Before lead routing implementation | Round-robin or deterministic placeholder |
| Q-004 | What qualifies a lead for CRM sync and Slack notification? | Before demo polish | Phase 2 default: `lead_score >= 70` |
| Q-005 | How should dedupe handle shared domains, aliases, and updated emails? | Before dedupe implementation | Email first, company domain second |
| Q-006 | Should tests require PostgreSQL only, or allow SQLite unit fallback? | Before persistence work | PostgreSQL for integration, SQLite only if justified |
