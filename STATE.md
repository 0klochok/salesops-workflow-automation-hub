# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-02 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 4 slice 7 - read-only admin run detail visibility |
| Overall status | on-track |
| Quality gate status | Required automated gates passed; live local smoke passed |
| Completion | Slice 7 implementation is ready for user review |
| Main blocker | none |

## 1. Current Objective

- Add a read-only run-detail backend contract for one persisted automation run.
- Add a same-page selected run detail panel under `/admin/runs`.
- Reuse existing persisted lead, run, attempt, and audit records without a migration.
- Preserve mock-only integration boundaries and avoid retry/mutation UI.
- Do not stage, commit, push, add GitHub Actions, call real services, use paid APIs, print secrets, or overwrite `.env`.

## 2. Status Snapshot

- `GET /leads/runs/{run_id}` now returns one selected run with persisted lead identity, source, status, timestamps, all attempts, failure-detail availability, sanitized intake payload, and allowlisted audit/mock result payloads.
- Unknown run IDs return `404`.
- Detail responses expose only allowlisted audit payloads for `dedupe`, `crm_upsert`, `slack_notification`, and `manual_retry`.
- Detail responses omit raw audit payloads, `phone`, `message`, unknown payload fields, and unsanitized secret-like text.
- `/api/leads/runs/[runId]` proxies selected run detail through local GET requests only.
- `/admin/runs` keeps the existing read-only run list and adds a same-page selected run detail panel with no retry, edit, delete, submit, or mutation action.
- No migrations, background workers, real integrations, deployment config, GitHub Actions, staging, commit, push, PR, or secret handling were added.
- `apps/web/tsconfig.tsbuildinfo` was modified by TypeScript/build validation; no manual edit was made to that generated file.

## 3. Files Changed

| Path | Purpose | Status |
|---|---|---|
| `backend/app/leads/schemas.py` | Added run-detail response models | updated |
| `backend/app/leads/persistence.py` | Added selected run detail mapping and audit payload allowlisting/sanitization | updated |
| `backend/app/leads/routes.py` | Added `GET /leads/runs/{run_id}` | updated |
| `tests/test_lead_persistence.py` | Added repository coverage for safe run detail | updated |
| `tests/test_lead_intake_api.py` | Added API coverage for run detail and unknown run IDs | updated |
| `apps/web/src/lib/types.ts` | Added run-detail frontend types | updated |
| `apps/web/src/lib/run-history-api.ts` | Added `fetchRunDetail` | updated |
| `apps/web/src/app/api/leads/runs/[runId]/route.ts` | Added read-only Next.js detail proxy | added |
| `apps/web/src/components/admin-run-history.tsx` | Added same-page selected run detail panel | updated |
| `apps/web/src/components/admin-run-history.test.tsx` | Added detail selection/loading/error/read-only coverage | updated |
| `README.md`, `REQ.md`, `DESIGN.md`, `EXEC_PLAN.md`, `RUNBOOK.md`, `TDD.md`, `CONTEXT.md` | Source-of-truth Slice 7 updates | updated |
| `STATE.md` | Current status, validation, smoke, and risks | updated |
| `apps/web/tsconfig.tsbuildinfo` | TypeScript incremental build artifact changed by validation | generated update |

No dependency, lockfile, migration, Compose, GitHub Actions, `.env`, or secret files were changed.

## 4. Automated Validation

| Gate | Command | Status | Result |
|---|---|---|---|
| Frozen backend install | `uv sync --frozen` | pass | Checked 42 packages. |
| Backend tests | `uv run pytest` | pass | 48 passed; 1 existing Starlette/httpx deprecation warning from dependencies. |
| Backend lint | `uv run ruff check .` | pass | All checks passed. |
| Backend typecheck | `uv run mypy backend tests` | pass | No issues found in 26 source files. |
| Frozen frontend install | `pnpm install --frozen-lockfile` | pass | Already up to date using pnpm `v11.3.0`. |
| Frontend lint | `pnpm --dir apps/web lint` | pass | `eslint .` completed with exit 0. |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | 4 files and 17 tests passed. |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` completed with exit 0. |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js 15.5.18 production build completed; `/api/leads/runs/[runId]` included. |
| Compose static validation | `docker compose config` | pass | Local PostgreSQL service rendered successfully. |
| Git whitespace check | `git diff --check` | pass | Exit 0 with Git LF-to-CRLF normalization warnings only; no whitespace errors. |
| GitHub Actions absence | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`; no workflow directory exists. |

Development notes:

- An initial backend test run failed on sanitizer punctuation expectations; tests were aligned with the existing sanitizer and the full backend suite then passed.
- An initial frontend test run failed on a duplicate email assertion in the detail panel; the test was corrected and the full frontend suite then passed.
- An initial frontend typecheck failed because a fetch mock signature was too narrow; the mock was widened and typecheck then passed.

## 4.1 Manual Smoke

Live local smoke used temporary ports `8017` for FastAPI and `3027` for Next.js to avoid disturbing default dev ports.

| Check | Status | Result |
|---|---|---|
| Local database safety check | `.env` `DATABASE_URL` pattern validation | pass | Local PostgreSQL URL was present; value was not printed. |
| PostgreSQL service | `docker compose up -d postgres` | pass | `salesops-postgres` reported running. |
| Migration | `uv run alembic upgrade head` | pass | Alembic used `PostgresqlImpl` and transactional DDL. |
| Demo seed | `uv run python -m backend.app.leads.demo_seed` | pass | Seeded 4 demo runs: success, failed, retried, queued. |
| Backend health | `Invoke-RestMethod -Uri "http://127.0.0.1:8017/health"` | pass | Returned service status `ok`. |
| Backend run history | `Invoke-RestMethod -Uri "http://127.0.0.1:8017/leads/runs"` | pass | Returned 4 seeded rows. |
| Backend run detail | `Invoke-RestMethod -Uri "http://127.0.0.1:8017/leads/runs/run_demo_failed"` | pass | Returned `run_demo_failed` with 2 attempts; no `phone`; no raw secret text. |
| Frontend admin page HTTP | `Invoke-WebRequest -Uri "http://127.0.0.1:3027/admin/runs" -UseBasicParsing` | pass | Returned HTTP 200. |
| Frontend run-history proxy | `Invoke-RestMethod -Uri "http://127.0.0.1:3027/api/leads/runs"` | pass | Returned 4 seeded rows. |
| Frontend run-detail proxy | `Invoke-RestMethod -Uri "http://127.0.0.1:3027/api/leads/runs/run_demo_failed"` | pass | Returned selected run detail; no retry URL. |
| Browser admin list | Playwright opened `http://127.0.0.1:3027/admin/runs` | pass | Rendered 4 seeded rows and the no-selection detail state. |
| Browser selected detail | Playwright clicked `View details` for `run_demo_failed` | pass | Rendered run detail, attempts, safe intake payload, and allowlisted audit/mock result data. |
| Browser network behavior | Playwright `requests` | pass | API calls shown were local GETs: `/api/leads/runs` and `/api/leads/runs/run_demo_failed`. |
| No retry/mutation UI | Browser snapshot review | pass | Detail action is `View details`; no retry, edit, delete, submit, or mutation control was visible. |
| External API safety | Browser/API smoke | pass | No real CRM, Slack, Google Sheets, OpenAI, paid API, webhook, or external service call was made. |

Smoke notes:

- The only browser console error was a local missing `favicon.ico` 404.
- The first frontend smoke start command used an incorrect argument separator for `next dev`; the corrected `pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3027` command passed.
- Temporary backend/frontend smoke processes and Playwright browser session were stopped. Temporary smoke logs and Playwright snapshots were removed.
- Local Docker PostgreSQL was left running because it is the project dev database and may already have been running.

## 5. Skipped Checks

| Check | Status | Written reason |
|---|---|---|
| Real CRM/Slack/Google Sheets/OpenAI/API smoke | skipped | Explicitly out of scope; the project remains mock-first and local-only. |
| GitHub Actions / CI | skipped | The task explicitly forbids adding CI or GitHub Actions; `.github\workflows` remains absent. |
| Retry or mutation smoke | skipped | This slice is read-only; no retry button, mutation endpoint, or mutation UI was added. |

## 6. Manual Verification Commands

After local PostgreSQL, migrations, and demo seed are available:

```powershell
uv run uvicorn backend.app.main:app --reload
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs"
Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs/run_demo_failed"
```

In another PowerShell window:

```powershell
pnpm --dir apps/web dev
Invoke-RestMethod -Uri "http://localhost:3000/api/leads/runs"
Invoke-RestMethod -Uri "http://localhost:3000/api/leads/runs/run_demo_failed"
```

Then open `http://localhost:3000/admin/runs`, select `View details` for a run, and confirm the same-page panel shows read-only details with no retry, edit, delete, submit, or mutation action.

## 7. Known Limitations And Risks

- Full persisted admin filters by date, owner, status, source, and error type are still future work.
- Dedicated frontend failure-detail navigation and retry controls are intentionally not implemented in this read-only slice.
- Persisted suggested-action text may mention retry as read-only guidance; no retry button or mutation call is exposed.
- Existing local dev servers may need a restart after `pnpm --dir apps/web build` because the build updates `.next`.
- `apps/web/tsconfig.tsbuildinfo` remains a tracked generated artifact and changed during validation.
- Docker PostgreSQL was started or confirmed running for smoke; stop it manually if not needed.

## 8. Next Suggested Phase

Continue Phase 4 with portfolio polish docs such as the architecture diagram, before/after workflow explanation, safe credentials handoff notes, and demo script/video plan.

## 9. Scope Control And Safety

- Nothing was staged, committed, pushed, deployed, or connected to real external services.
- No GitHub Actions directory was added.
- No real secrets were created, printed, stored, logged, screenshotted, or committed.
- No real HubSpot, Slack, Google Sheets, OpenAI, CRM, webhook, paid API, or production service was called.
- No retry button, frontend mutation action, background worker change, migration, or real integration was added.
- Changes stayed inside the repository.

## 10. Suggested Commit Message

```text
Add read-only admin run detail view
```
