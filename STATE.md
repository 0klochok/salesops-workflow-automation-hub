# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 4 slice 1 - backend persistence foundation |
| Overall status | on-track |
| Quality gate status | Phase 4 slice 1 validation passed with documented online-DB skip |
| Completion | Phase 4 slice 1 implemented and ready for user review |
| Main blocker | none |

## 1. Current Objective

- Start the next documented phase after repaired Phase 3 frontend lint validation.
- Keep the slice narrow: add local-safe backend persistence foundation only.
- Add SQLAlchemy/Alembic mappings for leads, automation runs, attempts, and audit records.
- Add local PostgreSQL Docker Compose configuration.
- Add repository tests for persistence behavior.
- Keep the existing `POST /leads/intake` API and Phase 3 frontend behavior deterministic and mock-only until a later wiring slice.
- Do not add real CRM, Slack, Google Sheets, OpenAI, paid API calls, deployment config, GitHub Actions, staging, commits, pushes, or deployments.

## 2. Status Snapshot

- Phase 3 frontend demo scaffold remains present and validated.
- Phase 4 slice 1 adds backend persistence scaffolding without changing the public intake route behavior.
- New SQLAlchemy metadata covers:
  - `leads`;
  - `automation_runs`;
  - `run_attempts`;
  - `audit_records`.
- New repository behavior records lead/run/attempt/audit data and exposes persisted lead snapshots for future durable dedupe.
- Duplicate-email persistence reuses the matched persisted lead id to avoid creating a second lead row for the same email.
- Alembic can render the initial PostgreSQL migration offline.
- `compose.yml` defines a local PostgreSQL service with non-production demo credentials.
- SQLite is used only as a local unit-test fallback for SQLAlchemy repository tests.
- No real external service clients, webhooks, API keys, deployment commands, GitHub Actions, commits, pushes, or staging were added.

## 3. Phase 4 Slice 1 Done State

Phase 4 slice 1 is done when:

- Persistence dependencies are declared and locked through `uv`.
- SQLAlchemy tables and repository code exist for the core lead/run/audit records.
- Alembic has an initial migration matching the SQLAlchemy table set.
- Local PostgreSQL Compose configuration validates statically.
- Backend persistence tests, backend lint, backend typecheck, frontend lint/tests/typecheck/build, install checks, diff checks, and forbidden-pattern scans pass or have explicit skip reasons.
- Source-of-truth docs describe the persistence slice, limitations, and next work.

## 4. Files Changed For Phase 4 Slice 1

| Path | Purpose | Status |
|---|---|---|
| `pyproject.toml`, `uv.lock` | Added SQLAlchemy, Alembic, and psycopg dependencies | updated |
| `.env.example` | Added local PostgreSQL URL aligned to Compose demo credentials | updated |
| `backend/app/db.py` | SQLAlchemy base, engine, and session-factory helpers | created |
| `backend/app/leads/persistence.py` | ORM records and persistence repository | created |
| `tests/test_lead_persistence.py` | Repository tests for lead/run/attempt/audit persistence and duplicate email behavior | created |
| `alembic.ini`, `alembic/env.py`, `alembic/script.py.mako`, `alembic/versions/20260601_0001_create_lead_persistence_tables.py` | Alembic migration environment and initial migration | created |
| `compose.yml` | Local PostgreSQL service definition | created |
| `README.md`, `RUNBOOK.md`, `DESIGN.md`, `EXEC_PLAN.md`, `TDD.md`, `CONTEXT.md`, `REQ.md`, `STATE.md` | Phase 4 slice 1 docs, commands, status, and validation notes | updated |

Existing Phase 3 frontend files remain unstaged in the worktree for user review.

## 5. Validation

| Gate | Command | Status | Notes |
|---|---|---|---|
| Required pre-edit staged check | `git diff --cached --name-only` | pass | Returned no files before edits. |
| Frontend frozen install | `pnpm install --frozen-lockfile` | pass | Workspace already up to date. |
| Backend frozen install | `uv sync --frozen` | pass | Checked 42 packages. |
| Backend tests | `uv run pytest` | pass | 29 passed, 1 Starlette/httpx deprecation warning from dependencies. |
| Backend lint | `uv run ruff check .` | pass | All checks passed. |
| Backend typecheck | `uv run mypy backend tests` | pass | No issues found in 25 source files. |
| Frontend lint | `pnpm --dir apps/web lint` | pass | ESLint completed with exit 0. |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | 3 files, 9 tests passed. |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` completed with exit 0. |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js 15.5.18 production build completed successfully. |
| Compose static validation | `docker compose config` | pass | Local PostgreSQL service rendered successfully. |
| Alembic offline migration validation | `uv run alembic upgrade head --sql` | pass | Initial PostgreSQL SQL rendered without opening a DB connection. |
| Online PostgreSQL migration | `docker compose up -d postgres`; `uv run alembic upgrade head` | skipped | Not run to avoid starting local containers and creating persistent Docker volume state during this narrow slice. Static Compose validation and offline Alembic SQL generation passed. |
| Git whitespace check | `git diff --check` | pass | Exit 0. Git reported Windows LF-to-CRLF normalization warnings only; no whitespace errors. |
| Final staged check | `git diff --cached --name-only` | pass | Returned no files. |
| GitHub Actions absence | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`; no workflow directory exists. |
| Likely secret/token scan | PowerShell scan excluding `.git`, `.venv`, `node_modules`, `.next`, and local caches | pass | No likely secret/token patterns found. |
| Real integration endpoint scan | PowerShell scan for real Slack/HubSpot/OpenAI/Google Sheets endpoint URLs | pass | No real external integration endpoint patterns found. |
| Paid/external API usage scan | PowerShell scan for external API client imports and direct `requests` calls in `backend` and `apps` | pass | No paid/external API client usage patterns found in app code. |
| Trailing whitespace scan | PowerShell scan excluding `.git`, `.venv`, `node_modules`, `.next`, and local caches | pass | No trailing whitespace patterns found. |

## 6. Manual Verification

Optional local database verification when the user wants to start Docker:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
docker compose ps
```

Stop the local PostgreSQL container when finished:

```powershell
docker compose stop postgres
```

The current API and frontend smoke checks are unchanged from Phase 3:

```powershell
uv run uvicorn backend.app.main:app --reload
pnpm --dir apps/web dev
```

Open `http://localhost:3000`, submit synthetic demo leads, and verify the session dashboard updates. The API still uses mock CRM/Slack behavior and does not yet persist intake requests.

## 7. Known Limitations

- Persistence is not wired into `POST /leads/intake` yet.
- No persisted admin dashboard, failure detail endpoint, manual retry endpoint, owner assignment, or seed data exists yet.
- Online PostgreSQL migration was not run in this slice; only Compose static validation and offline Alembic SQL generation were run.
- The frontend dashboard remains session-only and stored in browser `sessionStorage`.
- The local Compose password is a non-production demo value and must not be reused as a real secret.
- Next.js may print anonymous telemetry information during `next build`; no deployment or real integration call is made.

## 8. Open Questions And Follow-Ups

| ID | Question / follow-up | Needed by | Current default / assumption |
|---|---|---|---|
| Q-001 | Wire persistence into `POST /leads/intake` through database session dependencies? | Next Phase 4 slice | Yes, after this repository foundation is reviewed. |
| Q-002 | Add persisted failure detail and manual retry endpoints? | Phase 4 API wiring | Yes, after durable run storage is active. |
| Q-003 | Add demo seed command for leads, failures, and retries? | Portfolio polish | After API persistence wiring. |
| Q-004 | What is the owner assignment rule for 5 sales reps? | Before admin owner filters | TBD; start with deterministic rule. |
| Q-005 | Should `lead_score >= 70` remain the qualification rule? | Before demo polish | Current backend default. |
| Q-006 | How strict should company-domain dedupe be? | Before persisted dedupe hardening | Email first, company domain second. |

## 9. Scope Control And Safety

- Nothing was staged, committed, pushed, deployed, or connected to real external services.
- No GitHub Actions directory was added.
- No real secrets were created, printed, stored, logged, screenshotted, or committed.
- No real HubSpot, Slack, Google Sheets, OpenAI, CRM, webhook, or production service was called.
- Changes were limited to the documented Phase 4 persistence foundation, local database infrastructure, tests, dependency lockfile, and source-of-truth docs.

## 10. Suggested Commit Message

```text
Add Phase 4 persistence foundation
```
