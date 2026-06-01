# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 4 slice 4 docs follow-up - local persistence run-history smoke |
| Overall status | on-track |
| Quality gate status | Docs follow-up validation passed; required gates passed; optional local PostgreSQL and `/leads/runs` smoke passed |
| Completion | Local persistence smoke documentation implemented and ready for user review |
| Main blocker | none |

## 1. Current Objective

- Improve local development documentation for the lead run-history persistence smoke path.
- Keep the change documentation-only unless validation proves the documented command path is false.
- Preserve Windows/PowerShell-first local validation guidance.
- Do not change backend behavior, add CI, use real APIs, print secrets, stage, commit, push, or open PRs.

## 2. Status Snapshot

- `GET /leads/runs` now returns persisted run history from existing lead, run, and attempt tables.
- Run-history records include run ID, lead ID, source, current status, created/updated timestamps, attempt count, latest attempt summary, and failure-detail availability.
- Records are sorted deterministically by `automation_runs.created_at DESC`, then `automation_runs.run_id ASC`.
- Latest attempt summaries are sanitized and do not expose raw audit payloads, phone, message, or unrestricted error fields.
- `backend.app.leads.demo_seed` now provides deterministic local seed data through `uv run python -m backend.app.leads.demo_seed`.
- Seed data creates exactly four synthetic local runs: success, failed, queued, and retried.
- Seed data is repeatable and replaces only known `run_demo_*` and `lead_demo_*` records.
- No Alembic migration was added because existing tables already store run IDs, lead IDs, statuses, timestamps, attempts, error fields, audit payloads, and lead source.
- No real CRM, Slack, Google Sheets, OpenAI, paid API, webhook, GitHub Actions, commit, push, stage, or PR action was performed. The current follow-up used local Docker PostgreSQL for optional smoke validation only.
- Manual smoke follow-up verified `backend.app.main:app` is the ASGI app path and `GET /leads/runs` is registered.
- Earlier in the prior investigation, missing local persistence configuration explained the HTTP 500 path: without `DATABASE_URL`, `uv run python -m backend.app.leads.demo_seed` fails before seeding with `RuntimeError: DATABASE_URL is required for persistent storage`.
- TestClient reproduction of `GET /leads/runs` without a database URL raises the same `RuntimeError` through `backend/app/db.py`, which uvicorn surfaces as HTTP 500.
- Existing TestClient coverage with an explicit SQLite test session still passes for run-history query behavior and response serialization, including sanitization of phone/message/raw secret-like text.
- Previous manual validation later started Docker Desktop / Docker Engine successfully.
- docker compose up -d postgres passed.
- uv run alembic upgrade head passed.
- uv run python -m backend.app.leads.demo_seed passed.
- uvicorn started successfully on 127.0.0.1:8010.
- Invoke-RestMethod http://127.0.0.1:8010/leads/runs returned HTTP 200 / valid JSON.
- No backend source changes were required.
- Remaining risk: this validates the local Docker PostgreSQL path only.
- `RUNBOOK.md` now documents the local persistence run-history smoke path, including guarded `.env` creation, a non-printing `DATABASE_URL` local-shape check, Docker PostgreSQL startup, Alembic migrations, deterministic demo seed data, uvicorn on `127.0.0.1:8010`, and `Invoke-RestMethod` against `/leads/runs`.
- The current workspace has an ignored `.env`; Codex did not overwrite or print it. A safe shape check confirmed `DATABASE_URL` points at local development PostgreSQL without outputting the value.
- Docker Engine was available during this follow-up. Local PostgreSQL was already running, Alembic was applied, deterministic seed data succeeded, and `GET http://127.0.0.1:8010/leads/runs` returned HTTP 200 with 4 run records through an already-running local server.
- Port `8010` was already accepting connections, so Codex did not start or stop a uvicorn process.
- No source code, dependency files, lockfiles, Compose files, GitHub Actions, real integrations, real API calls, secrets, staging, commits, pushes, or PRs were changed or used for this follow-up.

## 3. Files Changed For Documentation Follow-Up

| Path | Purpose | Status |
|---|---|---|
| `RUNBOOK.md` | Added the local persistence run-history smoke path and Docker Desktop troubleshooting guidance | updated |
| `STATE.md` | Recorded the documentation follow-up, validation results, skipped checks, risks, and safety notes | updated |

No backend source, frontend source, dependency, lockfile, Compose, GitHub Actions, deployment, real integration, migration, `.env`, or secret files were changed.

## 4. Validation

| Gate | Command | Status | Result |
|---|---|---|---|
| Frozen backend install | `uv sync --frozen` | pass | Checked 42 packages in 4 ms. |
| Targeted backend tests | `uv run pytest tests\test_lead_persistence.py tests\test_lead_intake_api.py` | pass | 21 passed; 1 Starlette/httpx deprecation warning from dependencies. |
| Backend tests | `uv run pytest` | pass | 44 passed; 1 Starlette/httpx deprecation warning from dependencies. |
| Backend lint | `uv run ruff check .` | pass | All checks passed. |
| Backend typecheck | `uv run mypy backend tests` | pass | No issues found in 26 source files. |
| Frozen frontend install | `pnpm install --frozen-lockfile` | pass | Scope all 2 workspace projects; already up to date; done in 84 ms using pnpm `v11.3.0`. |
| Frontend lint | `pnpm --dir apps/web lint` | pass | `eslint .` completed with exit 0. |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | 3 files and 9 tests passed; Vitest duration 11.69 s. |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` completed with exit 0. |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js 15.5.18 production build completed successfully. |
| Compose static validation | `docker compose config` | pass | Local PostgreSQL service rendered successfully without starting containers. |
| Safe local `DATABASE_URL` shape check | PowerShell `Select-String` check from `RUNBOOK.md` | pass | Confirmed `DATABASE_URL` is present and local-development shaped; the value was not printed. |
| Docker Engine availability | `docker info --format "{{.ServerVersion}}"` | pass | Docker Engine reported version `29.4.3`. |
| Optional local PostgreSQL startup | `docker compose up -d postgres` | pass | `salesops-postgres` was already running. |
| Optional online migration | `uv run alembic upgrade head` | pass | Alembic used `PostgresqlImpl`; no migration errors. |
| Optional deterministic seed | `uv run python -m backend.app.leads.demo_seed` | pass | Seeded 4 demo runs: success, failed, retried, and queued. |
| Optional port check | `Test-NetConnection -ComputerName 127.0.0.1 -Port 8010 -InformationLevel Quiet` | pass | Returned `True`; port `8010` was already accepting connections. |
| Optional live run-history smoke | `Invoke-RestMethod -Uri "http://127.0.0.1:8010/leads/runs"` | pass | HTTP 200; 4 run records returned; restricted field-name/value smoke check passed. |
| Git whitespace check | `git diff --check` | pass | Exit 0 with Git LF-to-CRLF normalization warnings only; no whitespace errors. |
| Staged-files check | `git diff --cached --name-only` | pass | Returned no files. |
| GitHub Actions absence | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`; no workflow directory exists. |

## 4.1 Manual Smoke Follow-Up

| Item | Result |
|---|---|
| Failed manual smoke result | `GET http://127.0.0.1:8010/leads/runs` returned HTTP 500 under local uvicorn when persistent database configuration was unavailable. |
| App path | Verified: `backend.app.main:app` creates the FastAPI app and includes the leads router. |
| Route registration | Verified: `/leads/runs`, `/leads/runs/{run_id}/failure`, and `/leads/runs/{run_id}/retry` are present in `app.routes`. |
| TestClient traceback | Reproduced without dependency override: `get_db_session()` -> `get_database_session_factory()` -> `resolve_database_url()` -> `RuntimeError: DATABASE_URL is required for persistent storage`. |
| Seed/config parity | `demo_seed` and uvicorn both use `get_database_session_factory()` and the same settings loader, so both require the same local `DATABASE_URL` source. |
| Missing table/column check | The run-history query uses `leads`, `automation_runs`, and `run_attempts`; offline Alembic SQL renders those tables and columns, and persistence/API tests pass against the ORM-created test schema. |
| Response serialization check | `tests\test_lead_intake_api.py` covers `GET /leads/runs` through TestClient with seeded records and passes. |
| Data-safety check | Run-history responses expose run IDs, lead IDs, source, statuses, timestamps, attempt counts, latest sanitized attempt summaries, and failure availability only; tests assert no phone, message, or raw secret-like token text is returned. |
| Explanation | No Phase 4 slice 4 source-code defect was found. The failed manual smoke omitted the local persistence prerequisites: create local `.env` from `.env.example`, start PostgreSQL, run Alembic migrations, then run the seed command before starting uvicorn. |
| Documentation follow-up smoke result | Docker Engine was running, local `DATABASE_URL` shape was verified without printing the value, PostgreSQL was running, Alembic and demo seed passed, and `GET http://127.0.0.1:8010/leads/runs` returned HTTP 200 with 4 run records. |
| Uvicorn process handling | Port `8010` was already accepting connections, so Codex used the existing local server for the HTTP smoke and did not start or stop a uvicorn process. |
| Final validation result | Required backend/frontend/static gates passed. Optional local PostgreSQL and `/leads/runs` live smoke also passed. |

## 5. Skipped Checks

| Check | Status | Written reason |
|---|---|---|
| Starting a new uvicorn process for optional live smoke | skipped | Port `8010` was already accepting connections; Codex used the existing local server and did not stop or kill any process. |
| Backend or frontend source changes | skipped | The requested work was documentation-only and validation did not prove any documented command path false. |
| README changes | skipped | `README.md` already has a brief backend setup path and no false claim was found that required changing it. |
| GitHub Actions / CI | skipped | The task explicitly forbids adding CI or GitHub Actions; `Test-Path -LiteralPath ".github\workflows"` returned `False`. |

## 6. Manual Verification

When the user wants to verify against live local PostgreSQL:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --reload
```

Run-history lookup while the server is running:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs"
```

Failure detail lookup for a known failed run:

```powershell
$runId = "run_demo_failed"
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs/$runId/failure"
```

Manual retry for a known failed or queued run:

```powershell
$runId = "run_demo_failed"
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs/$runId/retry" -Method Post
```

## 7. Known Limitations And Risks

- The frontend dashboard remains session-only and does not call the persisted run-history endpoint yet.
- Lead owner assignment and admin filters by owner/error type are not implemented because the current schema has no owner field and this slice avoided schema changes.
- Manual retry still records deterministic local retry intent; it does not re-run CRM or Slack adapters.
- Seed data writes to the configured local database if the seed command is run manually.
- Optional live PostgreSQL validation was run because Docker Engine was available; it used local Docker PostgreSQL and deterministic local seed data only.
- The live HTTP smoke used an already-running service on port `8010`; if that process is later stopped, rerun the uvicorn command from `RUNBOOK.md` before calling `/leads/runs`.

## 8. Next Suggested Phase

Phase 4 slice 5: wire a minimal admin UI to the persisted run-history endpoint, then add portfolio polish docs such as the architecture diagram, before/after workflow explanation, real-credentials handoff notes, and demo script/video plan.

## 9. Scope Control And Safety

- Nothing was staged, committed, pushed, deployed, or connected to real external services.
- No GitHub Actions directory was added.
- No real secrets were created, printed, stored, logged, screenshotted, or committed.
- The existing ignored `.env` was read only for a non-printing local-shape check; Codex did not overwrite it or print its value.
- No real HubSpot, Slack, Google Sheets, OpenAI, CRM, webhook, paid API, or production service was called.
- Changes were limited to `RUNBOOK.md` and `STATE.md`.

## 10. Suggested Commit Message

```text
Document local run-history persistence smoke path
```
