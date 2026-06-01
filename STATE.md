# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 4 slice 2 - persistence-backed local intake |
| Overall status | on-track |
| Quality gate status | Phase 4 slice 2 required validation passed; optional live PostgreSQL check skipped with written reason |
| Completion | Phase 4 slice 2 implemented and ready for user review |
| Main blocker | none |

## 1. Current Objective

- Wire the existing SQLAlchemy/Alembic persistence foundation into `POST /leads/intake`.
- Add explicit backend database session lifecycle handling without opening DB connections at import time.
- Persist successful local intake workflow results for leads, automation runs, attempts, and audit records.
- Use persisted lead snapshots for backend dedupe while preserving the existing response schema.
- Keep CRM and Slack behavior deterministic, mocked, and local-only.
- Do not add real integrations, paid API calls, GitHub Actions, deployment config, staging, commits, pushes, or secrets.

## 2. Status Snapshot

- Phase 4 slice 1 persistence foundation remains present.
- `POST /leads/intake` now depends on a request-scoped SQLAlchemy session.
- The route builds a `LeadPersistenceRepository`, loads persisted lead snapshots, processes the existing mock workflow, records the result, and returns the same `LeadIntakeResponse` schema.
- The service now exposes a workflow-result seam so callers can persist the run, dedupe, CRM, and Slack objects without changing `process_intake()` compatibility.
- Backend API tests override the DB dependency with deterministic in-memory SQLite and validate successful persistence plus persisted email/domain dedupe.
- Frontend behavior and type contracts are unchanged.
- No real external services, webhooks, API keys, deployment commands, GitHub Actions, commits, pushes, or staging were added.

## 3. Phase 4 Slice 2 Done State

Phase 4 slice 2 is done when:

- DB engine/session helpers are lazy and request sessions commit, roll back, and close explicitly.
- `POST /leads/intake` persists local workflow records and uses persisted lead snapshots for dedupe.
- Existing response shape and mock-only adapter behavior are preserved.
- Backend tests cover successful persistence, persisted dedupe behavior, and existing intake behavior.
- Required backend, frontend, database-static, diff, staged-file, GitHub Actions absence, and forbidden-pattern gates pass.
- Optional live PostgreSQL validation is either run or skipped with an explicit written reason.
- Source-of-truth docs describe the persistence wiring, limitations, and next work.

## 4. Files Changed For Phase 4 Slice 2

| Path | Purpose | Status |
|---|---|---|
| `backend/app/db.py` | Added lazy cached engine/session-factory helpers and request-scoped session lifecycle dependency | updated |
| `backend/app/leads/service.py` | Added workflow-result seam while keeping `process_intake()` response compatibility | updated |
| `backend/app/leads/routes.py` | Wired intake route to DB session, persistence repository, persisted snapshots, and workflow recording | updated |
| `tests/test_lead_intake_api.py` | Added SQLite dependency override tests for persistence and persisted dedupe | updated |
| `README.md`, `RUNBOOK.md`, `DESIGN.md`, `EXEC_PLAN.md`, `TDD.md`, `CONTEXT.md`, `REQ.md`, `STATE.md` | Updated source-of-truth docs for Phase 4 slice 2 behavior and validation | updated |

No dependency, lockfile, migration, Compose, frontend source, GitHub Actions, deployment, or real integration files were changed in this slice.

## 5. Validation

| Gate | Command | Status | Notes |
|---|---|---|---|
| Frozen frontend install | `pnpm install --frozen-lockfile` | pass | Workspace already up to date. |
| Frozen backend install | `uv sync --frozen` | pass | Checked 42 packages. |
| Backend tests | `uv run pytest` | pass | 32 passed; 1 Starlette/httpx deprecation warning from dependencies. |
| Backend lint | `uv run ruff check .` | pass | All checks passed. |
| Backend typecheck | `uv run mypy backend tests` | pass | No issues found in 25 source files. |
| Frontend lint | `pnpm --dir apps/web lint` | pass | ESLint completed with exit 0. |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | 3 files, 9 tests passed. |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` completed with exit 0. |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js 15.5.18 production build completed successfully. |
| Compose static validation | `docker compose config` | pass | Local PostgreSQL service rendered successfully. |
| Alembic offline migration validation | `uv run alembic upgrade head --sql` | pass | Initial PostgreSQL SQL rendered without opening a DB connection. |
| Git whitespace check | `git diff --check` | pass | Exit 0. Git reported Windows LF-to-CRLF normalization warnings only; no whitespace errors. |
| Staged-files check | `git diff --cached --name-only` | pass | Returned no files. |
| GitHub Actions absence | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`; no workflow directory exists. |
| Likely secret/token scan | PowerShell scan excluding `.git`, `.venv`, `node_modules`, `.next`, and local caches | pass | No likely secret/token patterns found. |
| Real integration endpoint scan | PowerShell scan for real Slack, HubSpot, OpenAI, and Google Sheets endpoint URL patterns | pass | No real external integration endpoint patterns found. |
| Paid/external API usage scan | `rg` scan for external API client imports and real integration URL patterns in `backend`, `apps`, and `tests` | pass | No matches found; `rg` exited 1 because the scan found no forbidden usage. |
| GitHub Actions scan | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`. |
| Merge conflict marker scan | PowerShell scan excluding `.git`, `.venv`, `node_modules`, `.next`, and local caches | pass | No conflict markers found. |
| Trailing whitespace scan | PowerShell scan excluding `.git`, `.venv`, `node_modules`, `.next`, and local caches | pass | No trailing whitespace patterns found. |

Focused pre-doc validation also passed:

```powershell
uv run pytest tests/test_lead_intake_api.py tests/test_lead_persistence.py
```

Result: 10 passed; 1 Starlette/httpx deprecation warning from dependencies.

## 6. Skipped Checks

| Check | Status | Written reason |
|---|---|---|
| Optional live PostgreSQL validation: `docker compose up -d postgres`; `uv run alembic upgrade head`; `uv run alembic current`; `uv run pytest tests/test_lead_persistence.py`; `docker compose down` | skipped | Not run to avoid starting local Docker containers and creating or updating persistent Docker volume state from Codex during this slice. Required `docker compose config` and offline Alembic SQL generation passed. |

## 7. Manual Verification

When the user wants to verify the route against live local PostgreSQL:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
docker compose up -d postgres
uv run alembic upgrade head
uv run uvicorn backend.app.main:app --reload
```

In another PowerShell window:

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

Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/intake" -Method Post -ContentType "application/json" -Body $payload
```

Start the frontend separately for the browser smoke path:

```powershell
pnpm --dir apps/web dev
```

Open `http://localhost:3000`, submit synthetic leads, and verify the UI session dashboard still updates while the backend dedupe field reflects persisted backend dedupe after an initial lead is stored.

## 8. Known Limitations

- The local intake endpoint now requires `DATABASE_URL` and a migrated local database for normal manual use.
- Exact repeated submissions still use deterministic `lead_id` and `run_id`; this keeps the response contract stable but means exact replays update the same persisted run rather than creating per-submission run history.
- No persisted admin run-history endpoint, failure detail endpoint, manual retry endpoint, owner assignment, or seed data exists yet.
- Optional live PostgreSQL validation was not run in this Codex slice; static Compose validation and offline Alembic SQL generation passed.
- The frontend dashboard remains session-only and stored in browser `sessionStorage`.
- The local Compose password is a non-production demo value and must not be reused as a real secret.
- Next.js may print anonymous telemetry information during `next build`; no deployment or real integration call is made.

## 9. Open Questions And Follow-Ups

| ID | Question / follow-up | Needed by | Current default / assumption |
|---|---|---|---|
| Q-001 | Add persisted failure detail and manual retry endpoints? | Next Phase 4 slice | Yes, now that durable intake records exist. |
| Q-002 | Add demo seed command for leads, failures, and retries? | Portfolio polish | After failure detail/retry API exists. |
| Q-003 | What is the owner assignment rule for 5 sales reps? | Before admin owner filters | TBD; start with deterministic rule. |
| Q-004 | Should `lead_score >= 70` remain the qualification rule? | Before demo polish | Current backend default. |
| Q-005 | Should exact repeated submissions get unique run IDs? | Before persisted admin run history | Current default keeps deterministic IDs for response stability. |
| Q-006 | How strict should company-domain dedupe be? | Before persisted dedupe hardening | Email first, company domain second. |

## 10. Scope Control And Safety

- Nothing was staged, committed, pushed, deployed, or connected to real external services.
- No GitHub Actions directory was added.
- No real secrets were created, printed, stored, logged, screenshotted, or committed.
- No real HubSpot, Slack, Google Sheets, OpenAI, CRM, webhook, or production service was called.
- Changes were limited to the documented Phase 4 intake persistence wiring, local deterministic tests, and source-of-truth docs.

## 11. Suggested Commit Message

```text
Wire intake route to local persistence
```
