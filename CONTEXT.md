# CONTEXT.md

## 1. Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Owner | User |
| Status | active draft |
| Current phase | Phase 4 slice 2 - persistence-backed local intake |
| Repository | salesops-workflow-automation-hub-fresh |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Primary runtime | Local Windows 11 / PowerShell |
| Git state | `main`; Phase 4 slice 2 worktree changes remain unstaged for user review |

## 2. Project Summary

This is a greenfield portfolio project for a code-first sales operations workflow automation demo. The planned system captures leads, validates them, deduplicates them, simulates CRM upserts through an adapter, simulates Slack notifications through an adapter, records backup/audit data, and exposes an admin dashboard for runs, failures, and manual retries.

The fake client is a growth agency with 5 sales reps. Leads arrive from multiple forms and CSV uploads. The current manual process copies leads into a CRM and Slack, which causes duplicates, missed leads, slow response times, and weak auditability.

The backend includes a `uv`-managed FastAPI app, local-safe settings, a deterministic health endpoint, and a persistence-backed local lead intake path. `POST /leads/intake` validates synthetic lead payloads, uses persisted lead snapshots for dedupe, calls mock CRM/Slack adapter boundaries, records local workflow data, and returns local run results without network calls.

The frontend now includes `apps/web`, a `pnpm`-managed Next.js App Router demo. It provides a schema-aligned lead form, local CSV parser/import UI, Next.js proxy route, same-session duplicate hints, and a current-session dashboard stored in browser `sessionStorage`.

Phase 4 slice 2 wires backend persistence scaffolding into intake: SQLAlchemy metadata, a repository for leads/runs/attempts/audit records, an Alembic initial migration, a local PostgreSQL Docker Compose service, and explicit FastAPI database-session dependencies.

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
- Use `pnpm` for frontend dependencies.
- Do not call real external APIs.
- Do not create real secrets or commit a real `.env` file.
- Use `.env.example` only for placeholders.
- Local validation comes before GitHub Actions.
- GitHub Actions are out of scope until local validation is stable and explicitly requested.
- Use quoted PowerShell paths or `-LiteralPath` because the repo path contains spaces and Cyrillic characters.

## 5. Stack

| Area | Choice | Notes |
|---|---|---|
| Backend | FastAPI, Python 3.12+, Pydantic, SQLAlchemy, Alembic | FastAPI foundation, lead intake domain, and persistence foundation added |
| Backend tooling | `uv`, pytest, Ruff, mypy | Configured in Phase 1 |
| Database | PostgreSQL through Docker Compose | Local compose, migration, and intake API wiring added |
| Frontend | Next.js App Router, TypeScript, Tailwind CSS, local shadcn-style primitives, TanStack Table | Added in Phase 3 |
| Frontend tooling | `pnpm`, Vitest, Testing Library, ESLint, TypeScript | Added in Phase 3 |
| Integrations | Mocked CRM and mocked Slack by default | Real services require explicit approval |
| Optional integration | Google Sheets | Mocked/optional unless explicitly approved |
| CI/CD | Not configured | Local validation first |

## 6. Repository Shape

```text
/
  backend/
    app/        # FastAPI app, settings, health endpoint, lead intake domain
  tests/        # backend tests
  apps/
    web/        # Next.js frontend demo
  alembic/      # Migration environment and initial persistence migration
  compose.yml   # Local PostgreSQL service
  package.json
  pnpm-lock.yaml
  pnpm-workspace.yaml
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
- Public demo lead form. Phase 3 local frontend implemented.
- CSV lead import. Phase 3 local parser/import UI implemented.
- Duplicate detection by email and company domain. Backend local foundation exists; frontend same-session hints added.
- CRM upsert adapter for contact/deal create-or-update behavior. Phase 2 mock boundary implemented.
- Slack notification adapter for qualified lead notifications. Phase 2 mock boundary implemented.
- Automation run log with queued, success, failed, and retried statuses. Phase 2 local model and Phase 4 persistence-backed intake records implemented; manual retry API planned.
- Manual retry for failed automation runs. Phase 2 deterministic retry policy exists; persistence foundation added; UI/API action planned after route wiring.
- Error detail page with payload, validation issue, error type, suggested action. Phase 3 shows validation/error details inline; dedicated page planned later.
- Admin table with filters by date, source, status, lead owner, and error type. Phase 3 session dashboard filters available local fields; owner/error type filters require persistence/domain fields.
- Backup/audit records. Planned for persistence phase.

## 8. Assumptions

- CRM behavior is mocked by default.
- Slack notification behavior is mocked/logged by default.
- Google Sheets is optional and mocked/disabled unless approved later.
- No paid API usage is allowed without explicit approval.
- Synthetic demo data will be used.
- No production deployment is planned in early phases.
- PostgreSQL is the primary local database target; SQLite is used only as a test fallback for SQLAlchemy mapping/repository unit tests.
- Frontend duplicate hints are a Phase 3 UI aid, not a replacement for future backend persistence.

## 9. Open Questions

| ID | Question | Needed by | Current default |
|---|---|---|---|
| Q-001 | Should the final demo use real HubSpot or only a mock CRM? | Before live integration work | Mock CRM |
| Q-002 | Should Slack use a real webhook or a mock/log notifier? | Before live notification work | Mock/log notifier |
| Q-003 | What rule assigns leads to the 5 sales reps? | Before lead routing implementation | Round-robin or deterministic placeholder |
| Q-004 | Should `lead_score >= 70` remain the qualification rule? | Before demo polish | Current backend default |
| Q-005 | How should dedupe handle shared domains, aliases, and updated emails? | Before persistence/admin workflow | Email first, company domain second |
| Q-006 | Should tests require PostgreSQL only, or allow SQLite unit fallback? | Before persistence work | PostgreSQL for integration, SQLite only if justified |
