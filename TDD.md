# TDD.md

## 1. Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Status | active draft |
| Applies to | salesops workflow automation hub |
| Current phase | Phase 1 - backend foundation |
| Related docs | `REQ.md`, `DESIGN.md`, `EXEC_PLAN.md`, `RUNBOOK.md`, `STATE.md` |

## 2. Local-First Validation Philosophy

- Local validation comes before CI.
- GitHub Actions are not default until local validation is stable and explicitly requested.
- Every serious implementation phase must include tests, linting, type checks, and manual verification commands.
- Tests must use synthetic data.
- Tests must not call real HubSpot, Slack, Google Sheets, OpenAI, paid, or external APIs unless explicitly approved and isolated.
- Mock adapters are the default integration test boundary.
- Write tests first where feasible for validation, business logic, persistence, adapters, retry state, and UI behavior.

## 3. Phase 1 Test Status

Phase 1 establishes the first backend test surface:

```powershell
git diff --check
git status --short
uv run pytest
uv run ruff check .
uv run mypy backend tests
```

Current tests cover the health endpoint and local-safe configuration defaults/overrides. Database, lead intake, dedupe, adapter, retry, and frontend tests remain planned for later phases.

## 4. Planned Test Matrix

| Area | Primary behaviors | Test layer | Planned command |
|---|---|---|---|
| Validation tests | Required fields, email format, source values, invalid payload handling | Backend unit/API tests | `uv run pytest` |
| Dedupe tests | Exact email match, company domain match, non-duplicate lead, ambiguous edge cases | Backend unit/integration tests | `uv run pytest` |
| CRM adapter mock tests | Contact/deal create, update, duplicate, adapter failure, no live API calls | Backend unit/contract tests | `uv run pytest` |
| Slack notifier mock tests | Qualified notification, unqualified skip, formatting, adapter failure, no live API calls | Backend unit/contract tests | `uv run pytest` |
| Retry logic tests | Failed run retry, new attempt creation, history preservation, status transitions | Backend unit/integration tests | `uv run pytest` |
| CSV import tests | Valid rows, invalid rows, mixed batches, row-level errors, batch summary | Backend and frontend tests | `uv run pytest`; `pnpm test` |
| Admin dashboard/filter tests | Filter by date, source, status, owner, error type; failure detail view | Frontend component/integration tests | `pnpm test` |
| End-to-end demo smoke test | Submit/import lead, process mock workflow, inspect dashboard, retry failure | Later E2E/manual smoke | TBD after apps exist |

## 5. Backend Testing Expectations

Phase 1 establishes:

- pytest test structure.
- FastAPI test client coverage for the health endpoint.
- Settings tests for local defaults and environment overrides.
- Ruff linting.
- mypy type checking.

Phase 2 should add:

- FastAPI test client coverage for intake endpoints.
- Pydantic validation tests.
- SQLAlchemy persistence tests.
- Adapter contract tests for mock CRM and mock Slack.
- Retry state transition tests.
- Ruff linting.
- A selected type checker: mypy or pyright.

PostgreSQL is the target integration database. SQLite may be used only as a narrow unit-test fallback if justified and documented.

## 6. Frontend Testing Expectations

Phase 3 should establish:

- Tests for the demo lead form.
- Tests for CSV import UI states.
- Tests for admin dashboard filters.
- Tests for failure detail and retry interaction.
- TypeScript type checks.
- Linting.
- Production build validation.
- Browser/manual smoke checks for primary flows.

## 7. Quality Gates By Change Type

| Change type | Required checks |
|---|---|
| Docs/config only | `git diff --check`, `git diff --stat`, `git status --short`, docs review |
| Backend behavior | Targeted pytest, full backend pytest, Ruff, typecheck, API smoke when runnable |
| Backend persistence | Repository/service tests, migration check, PostgreSQL validation |
| Adapter behavior | Mock contract tests, no-network verification, failure-path tests |
| Frontend behavior | Component/integration tests, lint, typecheck, build, browser smoke |
| End-to-end demo | Full local quality gate, seeded data, manual smoke script |

## 8. Definition Of Done

A serious implementation phase is done only when:

- Requirements and expected behavior are documented.
- Applicable tests exist and pass.
- Lint and type checks pass, or skipped gates have written reasons.
- Manual verification commands are documented and run when the app is runnable.
- Source-of-truth docs and `STATE.md` are current.
- No real secrets or live external calls are introduced.
