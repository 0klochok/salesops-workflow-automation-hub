# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 4 slice 3 - persisted failure details and manual retry endpoints |
| Overall status | on-track |
| Quality gate status | Phase 4 slice 3 required validation passed; live Docker/PostgreSQL checks and forbidden scans skipped with written reasons |
| Completion | Phase 4 slice 3 implemented and ready for user review |
| Main blocker | none |

## 1. Current Objective

- Add backend-only failure detail lookup for persisted automation runs.
- Add backend-only manual retry for failed and queued persisted automation runs.
- Preserve the existing `POST /leads/intake` response shape and persisted dedupe behavior.
- Keep CRM and Slack behavior deterministic, mocked, and local-only.
- Do not add real integrations, paid API calls, GitHub Actions, deployment config, staging, commits, pushes, PRs, or secrets.

## 2. Status Snapshot

- `GET /leads/runs/{run_id}/failure` now returns the latest failed attempt and sanitized intake payload for persisted failed runs.
- `POST /leads/runs/{run_id}/retry` now accepts `failed` and `queued` runs, appends a `retried` attempt, updates the run status, and writes a `manual_retry` audit record.
- Unknown run IDs return `404`; runs without failed attempts return `409` for failure lookup; `success` and already-`retried` runs return `409` for retry.
- Existing persistence columns were sufficient: `run_attempts.error_type`, `error_message`, `suggested_action`, and `audit_records.payload` already cover this slice.
- No Alembic migration was added because no schema change was needed.
- No real CRM, Slack, Google Sheets, OpenAI, paid API, webhook, Docker volume, GitHub Actions, commit, push, stage, or PR action was performed.

## 3. Files Changed For Phase 4 Slice 3

| Path | Purpose | Status |
|---|---|---|
| `backend/app/leads/schemas.py` | Added failure detail and retry response models | updated |
| `backend/app/leads/retry.py` | Allowed deterministic retry for `failed` and `queued` runs; continued rejecting `success` and `retried` | updated |
| `backend/app/leads/persistence.py` | Added run loading, latest failed attempt lookup, sanitized intake payload lookup, and manual retry persistence | updated |
| `backend/app/leads/routes.py` | Added `GET /leads/runs/{run_id}/failure` and `POST /leads/runs/{run_id}/retry` | updated |
| `tests/test_lead_intake_api.py` | Added API tests for failure detail, retry transitions, non-retryable records, unknown IDs, and exact replay dedupe stability | updated |
| `tests/test_run_logging.py` | Updated retry policy tests for queued and successful run behavior | updated |
| `README.md`, `CONTEXT.md`, `DESIGN.md`, `EXEC_PLAN.md`, `REQ.md`, `RUNBOOK.md`, `TDD.md`, `STATE.md` | Updated source-of-truth docs for Phase 4 slice 3 behavior and validation | updated |

No dependency, lockfile, Compose, frontend source, GitHub Actions, deployment, real integration, or secret files were changed.

## 4. Validation

| Gate | Command | Status | Notes |
|---|---|---|---|
| Frozen frontend install | `pnpm install --frozen-lockfile` | pass | Scope all 2 workspace projects; already up to date; pnpm `v11.3.0`. |
| Frozen backend install | `uv sync --frozen` | pass | Checked 42 packages in 4 ms. |
| Backend tests | `uv run pytest` | pass | 42 passed; 1 Starlette/httpx deprecation warning from dependencies. |
| Backend lint | `uv run ruff check .` | pass | All checks passed. |
| Backend typecheck | `uv run mypy backend tests` | pass | No issues found in 25 source files. |
| Frontend lint | `pnpm --dir apps/web lint` | pass | ESLint completed with exit 0. |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | 3 files, 9 tests passed. |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` completed with exit 0. |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js 15.5.18 production build completed successfully. |
| Compose static validation | `docker compose config` | pass | Local PostgreSQL service rendered successfully without starting containers. |
| Alembic offline migration validation | `uv run alembic upgrade head --sql` | pass | Initial PostgreSQL SQL rendered without opening a DB connection; no new migration was needed. |
| Git whitespace check | `git diff --check` | pass | Exit 0. Git reported Windows LF-to-CRLF normalization warnings only; no whitespace errors. |
| Staged-files check | `git diff --cached --name-only` | pass | Returned no files. |
| GitHub Actions absence | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`; no workflow directory exists. |

Focused pre-full validation also passed:

```powershell
uv run pytest tests\test_run_logging.py tests\test_lead_intake_api.py
```

Result: 19 passed; 1 Starlette/httpx deprecation warning from dependencies.

## 5. Skipped Checks

| Check | Status | Written reason |
|---|---|---|
| Live PostgreSQL validation: `docker compose up -d postgres`; online `uv run alembic upgrade head`; live API smoke against PostgreSQL | skipped | Not run because this slice explicitly says not to run Docker containers or mutate Docker volumes unless needed. Static `docker compose config` and offline Alembic SQL validation passed. |
| New Alembic migration | skipped | Existing schema already stores failure detail fields on `run_attempts` and stored intake payloads on `audit_records`; no schema change was required. |
| Forbidden likely-secret/token scan | skipped | The task listed this as a forbidden scan. An attempted approval request for the scan was rejected by the escalation reviewer, so no workaround or equivalent scan was run. |
| Forbidden real integration endpoint scan | skipped | The task listed this as a forbidden scan; no workaround or equivalent scan was run. |
| Forbidden merge conflict marker scan | skipped | The task listed this as a forbidden scan; no workaround or equivalent scan was run. |
| Forbidden trailing whitespace scan | skipped | The task listed this as a forbidden scan. The allowed required `git diff --check` gate still passed. |

## 6. Manual Verification

When the user wants to verify against live local PostgreSQL:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
docker compose up -d postgres
uv run alembic upgrade head
uv run uvicorn backend.app.main:app --reload
```

Failure detail lookup for a known failed run:

```powershell
$runId = "<failed-run-id>"
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs/$runId/failure"
```

Manual retry for a known failed or queued run:

```powershell
$runId = "<failed-or-queued-run-id>"
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs/$runId/retry" -Method Post
```

## 7. Known Limitations And Risks

- The frontend dashboard remains session-only and does not call the new failure detail or retry endpoints yet.
- There is still no persisted admin run-history list endpoint, owner assignment, seed data, or dedicated failure detail page.
- Manual retry currently records deterministic local retry intent; it does not re-run CRM or Slack adapters.
- Sanitized failure-detail responses omit high-risk freeform intake fields such as `phone` and `message`; the underlying audit payload remains the local persistence record.
- Optional live PostgreSQL validation was not run by Codex to avoid Docker container and volume mutation.

## 8. Next Suggested Phase

Phase 4 slice 4: add a persisted admin run-history endpoint and demo seed data for successful, failed, queued, and retried runs, then wire the frontend/admin surface in a later slice.

## 9. Scope Control And Safety

- Nothing was staged, committed, pushed, deployed, or connected to real external services.
- No GitHub Actions directory was added.
- No real secrets were created, printed, stored, logged, screenshotted, or committed.
- No real HubSpot, Slack, Google Sheets, OpenAI, CRM, webhook, paid API, or production service was called.
- Changes were limited to the documented Phase 4 failure-detail/retry backend slice, local deterministic tests, and source-of-truth docs.

## 10. Suggested Commit Message

```text
Add persisted failure detail and retry endpoints
```
