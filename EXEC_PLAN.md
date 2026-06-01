# EXEC_PLAN.md

## 1. Purpose

Deliver a local-first portfolio demo for sales operations workflow automation. The project is built in phases, starting with source-of-truth documentation and moving toward a polished local demo package.

## 2. Current Phase

Phase 4 slice 4 is implemented as persisted admin run history and deterministic demo seed data after the Phase 4 slice 3 failure detail and manual retry work. It keeps mock CRM/Slack behavior and the intake response contract unchanged, uses existing persistence tables without a migration, and does not add auth, frontend admin persistence wiring, real integrations, deployment config, GitHub Actions, commits, pushes, or real secrets.

## 3. Phase Plan

| Phase | Name | Deliverables | Acceptance criteria | Validation |
|---|---|---|---|---|
| Phase 0 | Docs/source-of-truth normalization | Project-specific docs, `.gitignore`, `.env.example` | Docs capture context, requirements, design, plan, runbook, TDD, safety rails; placeholders only | `git diff --check`; `git diff --stat`; `git status --short`; docs review |
| Phase 1 | Backend foundation | FastAPI app scaffold, Python project config, health endpoint, local-safe config, test setup | Backend starts locally; health endpoint responds; no database or external service is required at startup; no real integrations | `uv sync`; `uv run pytest`; `uv run ruff check .`; `uv run mypy backend tests`; backend smoke check |
| Phase 2 | Backend lead intake domain foundation | Intake validation, deterministic API response, in-memory dedupe service, mock CRM adapter, mock Slack adapter, local run/attempt models, retry policy | Valid leads process through local mock workflow; invalid leads fail safely; dedupe and retries are unit-tested; no database or network is required | Backend unit/API tests; adapter contract tests; retry tests; lint; typecheck; optional API smoke |
| Phase 3 | Frontend demo form, CSV import UI, session dashboard | Next.js app, local proxy, lead form, CSV parser/import UI, session dashboard, frontend tests | User can submit/import leads, inspect current-session results, see backend validation/errors, and see same-session duplicate hints locally | `pnpm install`; `pnpm --dir apps/web lint`; `pnpm --dir apps/web test -- --run`; `pnpm --dir apps/web typecheck`; `pnpm --dir apps/web build` |
| Phase 4 | Persistence and portfolio polish | PostgreSQL/Docker infrastructure, SQLAlchemy/Alembic persistence, seed data, architecture diagram, before/after workflow explanation, handoff doc, demo script/video plan | Project is understandable as a portfolio artifact without claiming live production integrations | Full local quality gate; seeded demo smoke; docs review; secret check |

## 4. Completed Phase 3 Work Items

- Added `apps/web` as a Next.js App Router frontend with TypeScript, Tailwind CSS, TanStack Table, local UI primitives, Vitest, and Testing Library.
- Added root `pnpm` workspace files and frontend scripts.
- Added `POST /api/leads/intake` as a local Next.js proxy to the FastAPI endpoint.
- Added a schema-aligned lead form for the implemented backend request contract.
- Added local CSV parsing/import UI that maps rows to the same intake contract.
- Added a session-only dashboard with filters for available local/session fields.
- Added same-session duplicate hints by email/domain without changing backend behavior.
- Updated docs for Phase 3 usage, validation, limitations, and next phase.

## 4.1 Completed Phase 4 Slice 1 Work Items

- Added SQLAlchemy metadata and a persistence repository for leads, automation runs, run attempts, and audit records.
- Added an Alembic initial migration for the persistence tables.
- Added a local PostgreSQL Docker Compose service with non-production demo credentials.
- Added repository tests using SQLite as a fast unit-test fallback for SQLAlchemy mapping behavior.
- Kept the current API/frontend workflow deterministic and mock-only; API persistence wiring, seed data, admin failure pages, and retry endpoints remained future Phase 4 work for that slice.

## 4.2 Completed Phase 4 Slice 2 Work Items

- Added lazy backend database session lifecycle helpers with commit, rollback, and close handling.
- Wired `POST /leads/intake` to persisted lead snapshots and workflow result persistence.
- Added API tests for successful local persistence and persisted email/domain dedupe.
- Kept frontend behavior unchanged and kept CRM/Slack adapters mocked.
- Left failure-detail/retry endpoints, admin persisted run history, seed data, and portfolio polish documents for the next Phase 4 slice.

## 4.3 Completed Phase 4 Slice 3 Work Items

- Added backend failure-detail lookup for persisted runs with failed attempts.
- Added backend manual retry for failed and queued persisted runs.
- Preserved retry history by appending `retried` attempts and `manual_retry` audit records.
- Kept `POST /leads/intake` response shape unchanged and kept CRM/Slack mocked.
- Left persisted admin run history, seed data, and portfolio polish documents for the next Phase 4 slice.

## 4.4 Completed Phase 4 Slice 4 Work Items

- Added backend persisted run-history lookup at `GET /leads/runs`.
- Included run IDs, lead IDs, source, current status, timestamps, attempt counts, sanitized latest attempt summaries, and failure-detail availability.
- Added deterministic local demo seed data callable with `uv run python -m backend.app.leads.demo_seed`.
- Seed data covers success, failed, queued, and retried runs and is repeatable for known demo records.
- Reused existing persistence tables; no Alembic migration was needed.
- Kept frontend persisted admin wiring, owner assignment, broad admin filters, and portfolio polish documents for later slices.

## 5. Quality Gate Expectations By Phase

| Gate | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|---|---|---|---|---|
| Docs review | required | required | required | required | required |
| `git diff --check` | required | required | required | required | required |
| Backend tests | n/a | required | required | skipped if backend untouched | required |
| Backend lint | n/a | required | required | skipped if backend untouched | required |
| Backend typecheck | n/a | choose and run | required | skipped if backend untouched | required |
| Frontend tests | n/a | n/a | n/a | required | required |
| Frontend lint/typecheck/build | n/a | n/a | n/a | required | required |
| Docker/PostgreSQL validation | n/a | skipped until compose exists | skipped until infrastructure phase | skipped until infrastructure phase | `docker compose config` and offline Alembic SQL required; live PostgreSQL validation required or explicitly documented as skipped |
| Manual smoke | docs only | backend health | workflow API | UI workflow | seeded demo |

## 6. Recovery And Safety

- Phase 3 changes are limited to frontend scaffold, workspace package files, environment placeholders, and docs.
- Phase 4 slice 4 changes are limited to backend run history, deterministic demo seed data, local tests, and source-of-truth docs.
- Do not run destructive Git commands.
- Do not delete unrelated user files.
- Do not add real credentials.
- If the frontend scaffold needs reversal, review and revert through normal Git diff workflows, not history rewrites.

## 7. Recommended Next Phase

Continue Phase 4 by wiring a minimal admin UI to persisted run history, then add portfolio polish docs.
