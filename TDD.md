# TDD.md

## 1. Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-02 |
| Status | active draft |
| Applies to | salesops workflow automation hub |
| Current phase | Phase 4 slice 6 - read-only run-history contract enrichment |
| Related docs | `REQ.md`, `DESIGN.md`, `EXEC_PLAN.md`, `RUNBOOK.md`, `STATE.md` |

## 2. Local-First Validation Philosophy

- Local validation comes before CI.
- GitHub Actions are not default until local validation is stable and explicitly requested.
- Every serious implementation phase must include tests, linting, type checks, and manual verification commands.
- Tests must use synthetic data.
- Tests must not call real HubSpot, Slack, Google Sheets, OpenAI, paid, or external APIs unless explicitly approved and isolated.
- Mock adapters are the default integration test boundary.
- Write tests first where feasible for validation, business logic, persistence, adapters, retry state, and UI behavior.

## 3. Phase 4 Slice 6 Test Status

Phase 4 slice 6 adds backend and frontend tests for additive read-only run-history lead summary fields while preserving existing seed, retry, intake, and admin UI tests.

Current backend commands:

```powershell
uv sync --frozen
uv run pytest
uv run ruff check .
uv run mypy backend tests
```

Current backend persistence tests cover:

- SQLAlchemy persistence for leads, runs, attempts, and audit records;
- stored lead snapshots feeding the existing dedupe service;
- duplicate-email storage reusing the matched persisted lead id;
- failed-run error details and suggested actions.
- run-history summaries include persisted lead email, company name, and company domain.
- deterministic demo seed data is exercised through the API test database.

Current backend intake API tests cover:

- successful `POST /leads/intake` persistence for leads, runs, attempts, and audit records;
- persisted email dedupe feeding mock CRM update behavior;
- persisted company-domain dedupe reporting possible duplicates;
- unchanged response shape and mock-only CRM/Slack adapter behavior.
- exact replay behavior for deterministic `lead_id` and `run_id`;
- persisted failure detail lookup, including unknown IDs and no-failure conflict handling;
- manual retry for failed and queued runs;
- rejection of unknown, successful, and already-retried runs without mutating attempts.
- persisted run-history records sorted by created timestamp and run ID tie-breaker;
- success, failed, queued, and retried run-history examples from deterministic seed data;
- correct failure-detail availability for failed and retried runs;
- sanitized latest attempt summaries without raw payload, phone, message, or secret-like material;
- repeatable demo seed behavior across multiple runs.
- enriched run-history contract fields from persisted lead records.

Current frontend commands:

```powershell
pnpm --dir apps/web lint
pnpm --dir apps/web test -- --run
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

Current frontend tests still cover:

- form fields aligned to the backend intake schema;
- expected JSON payload sent to the local proxy;
- successful mocked API response appearing in the dashboard;
- FastAPI-style `422` validation details;
- CSV parsing for valid and invalid rows;
- same-session duplicate hint behavior;
- dashboard filtering by source.
- read-only persisted run-history rows;
- persisted lead email/company identity in run-history rows;
- older run-history rows remain readable if enriched identity fields are absent from a mocked response;
- empty and error states for `/admin/runs`;
- absence of retry controls or non-GET run-history fetches.

Existing backend tests also cover:

- health endpoint and local-safe configuration defaults/overrides;
- lead intake schema normalization and validation failures;
- deterministic `POST /leads/intake` API behavior for qualified, unqualified, and invalid payloads;
- in-memory dedupe by normalized email and company domain;
- mock CRM and Slack adapter deterministic local records;
- local run logging and retry history preservation.

## 4. Planned Test Matrix

| Area | Primary behaviors | Test layer | Command |
|---|---|---|---|
| Validation tests | Required fields, email format, source values, invalid payload handling | Backend unit/API tests | `uv run pytest` |
| Dedupe tests | Exact email match, company domain match, non-duplicate lead, ambiguous edge cases | Backend unit/integration tests | `uv run pytest` |
| CRM adapter mock tests | Contact/deal create, update, duplicate, adapter failure, no live API calls | Backend unit/contract tests | `uv run pytest` |
| Slack notifier mock tests | Qualified notification, unqualified skip, formatting, adapter failure, no live API calls | Backend unit/contract tests | `uv run pytest` |
| Retry logic tests | Failed/queued run retry, new attempt creation, history preservation, status transitions, rejection of non-retryable runs | Backend unit/API tests | `uv run pytest` |
| Persistence tests | Lead/run/attempt/audit persistence, persisted snapshots, failed-run details | Backend repository tests | `uv run pytest` |
| Admin run history tests | Persisted run list, deterministic sorting, latest attempt summaries, failure availability | Backend API tests and frontend component tests | `uv run pytest`; `pnpm --dir apps/web test -- --run` |
| Demo seed tests | Success/failed/queued/retried examples, repeatability, local-only deterministic records | Backend API/repository tests | `uv run pytest` |
| Lead form tests | Schema-aligned inputs, success/error states, local proxy payload | Frontend component tests | `pnpm --dir apps/web test -- --run` |
| CSV import tests | Valid rows, invalid rows, mixed batches, row-level errors, local-only parsing | Frontend unit/component tests | `pnpm --dir apps/web test -- --run` |
| Session dashboard tests | Filters, current-session results, duplicate hints | Frontend component tests | `pnpm --dir apps/web test -- --run` |
| End-to-end demo smoke test | Submit/import lead, inspect dashboard, verify duplicate hint | Manual smoke | `RUNBOOK.md` steps |

## 5. Frontend Testing Expectations

Phase 3 frontend tests are local and deterministic:

- no real backend process is needed for component tests;
- `fetch` is mocked in UI tests;
- CSV parsing is tested as a pure local utility;
- same-session duplicate hints are tested separately from backend dedupe;
- lint, typecheck, and production build are required.

Browser/manual smoke is still recommended because component tests do not prove that a live FastAPI process and Next.js dev server are running together on the developer machine.

## 6. Quality Gates By Change Type

| Change type | Required checks |
|---|---|
| Docs/config only | `git diff --check`, `git diff --stat`, `git status --short --branch`, docs review |
| Backend behavior | Targeted pytest, full backend pytest, Ruff, typecheck, API smoke when runnable |
| Backend persistence | Repository/service tests, migration check, PostgreSQL validation or documented local-Docker skip |
| Adapter behavior | Mock contract tests, no-network verification, failure-path tests |
| Frontend behavior | Component/unit tests, lint, typecheck, build, browser smoke |
| End-to-end demo | Full local quality gate, seeded data, manual smoke script |

## 7. Definition Of Done

A serious implementation phase is done only when:

- requirements and expected behavior are documented;
- applicable tests exist and pass;
- lint and type checks pass, or skipped gates have written reasons;
- manual verification commands are documented and run when the app is runnable;
- source-of-truth docs and `STATE.md` are current;
- no real secrets or live external calls are introduced.
