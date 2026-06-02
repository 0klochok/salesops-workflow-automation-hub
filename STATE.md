# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-02 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 4 slice 6 - read-only run-history contract enrichment |
| Overall status | on-track |
| Quality gate status | Required automated gates passed; live local smoke passed |
| Completion | Slice 6 implementation is ready for user review |
| Main blocker | none |

## 1. Current Objective

- Enrich the read-only backend `GET /leads/runs` contract with safe lead summary fields already persisted in local lead records.
- Update `/admin/runs` to display persisted lead email and company identity without adding retry or mutation behavior.
- Preserve backend workflow behavior, existing retry endpoint behavior, mock-only integration boundaries, and local-first validation.
- Do not stage, commit, push, add GitHub Actions, call real services, use paid APIs, print secrets, or overwrite `.env`.

## 2. Status Snapshot

- `GET /leads/runs` now returns persisted `email`, `company_name`, and `company_domain` alongside existing `lead_id`, source, status, timestamps, attempts, and error summary metadata.
- The run-history enrichment is additive; existing `lead_id` remains present.
- `/admin/runs` displays the persisted lead summary in a read-only Lead column.
- The frontend type marks the enriched identity fields optional so older mocked responses remain readable.
- Backend repository and API tests cover the enriched contract.
- Frontend component tests cover enriched rows, older-response fallback, empty/error states, and absence of retry/mutation controls.
- No migrations, background workers, retry buttons, mutation actions, real integrations, deployment config, GitHub Actions, staging, commit, push, PR, or secret handling were added.
- `apps/web/tsconfig.tsbuildinfo` was modified by TypeScript/build validation; no manual edit was made to that generated file.

## 3. Files Changed

| Path | Purpose | Status |
|---|---|---|
| `backend/app/leads/schemas.py` | Added run-history lead summary response fields | updated |
| `backend/app/leads/persistence.py` | Maps persisted lead email/company fields into run history | updated |
| `tests/test_lead_persistence.py` | Adds repository coverage for lead summary fields | updated |
| `tests/test_lead_intake_api.py` | Adds API/seed assertions for enriched run-history rows | updated |
| `apps/web/src/lib/types.ts` | Adds optional enriched run-history identity fields | updated |
| `apps/web/src/components/admin-run-history.tsx` | Displays persisted lead email/company/domain read-only | updated |
| `apps/web/src/components/admin-run-history.test.tsx` | Adds enriched-row and older-response fallback coverage | updated |
| `README.md`, `REQ.md`, `DESIGN.md`, `EXEC_PLAN.md`, `RUNBOOK.md`, `TDD.md`, `CONTEXT.md` | Source-of-truth Slice 6 updates | updated |
| `STATE.md` | Current status, validation, smoke, and risks | updated |
| `apps/web/tsconfig.tsbuildinfo` | TypeScript incremental build artifact changed by validation | generated update |

No dependency, lockfile, migration, Compose, GitHub Actions, `.env`, or secret files were changed.

## 4. Automated Validation

| Gate | Command | Status | Result |
|---|---|---|---|
| Targeted backend tests | `uv run pytest tests/test_lead_persistence.py::test_repository_run_history_includes_persisted_lead_summary tests/test_lead_intake_api.py::test_get_run_history_returns_persisted_records_sorted_and_sanitized tests/test_lead_intake_api.py::test_get_run_history_represents_repeatable_demo_seed_data` | pass | 3 passed; 1 Starlette/httpx deprecation warning from dependencies. |
| Targeted frontend tests | `pnpm --dir apps/web test -- --run admin-run-history` | pass | 1 file and 5 tests passed. |
| Frozen backend install | `uv sync --frozen` | pass | Checked 42 packages in 4 ms. |
| Backend tests | `uv run pytest` | pass | 45 passed; 1 Starlette/httpx deprecation warning from dependencies. |
| Backend lint | `uv run ruff check .` | pass | All checks passed. |
| Backend typecheck | `uv run mypy backend tests` | pass | No issues found in 26 source files. |
| Frozen frontend install | `pnpm install --frozen-lockfile` | pass | Scope all 2 workspace projects; already up to date; done in 95 ms using pnpm `v11.3.0`. |
| Frontend lint | `pnpm --dir apps/web lint` | pass | `eslint .` completed with exit 0. |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | 4 files and 14 tests passed. |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` completed with exit 0. |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js 15.5.18 production build completed; `/admin/runs` and `/api/leads/runs` were included. |
| Compose static validation | `docker compose config` | pass | Local PostgreSQL service rendered successfully without starting new services. |
| Git whitespace check | `git diff --check` | pass | Exit 0 with Git LF-to-CRLF normalization warnings only; no whitespace errors. |
| GitHub Actions absence | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`; no workflow directory exists. |
| Staged-files check | `git diff --cached --name-only` | pass | Returned no files. |

## 4.1 Manual Smoke

Existing localhost checks were not usable: `http://127.0.0.1:8010/leads/runs` rejected the connection, and existing `http://localhost:3000` requests timed out. Codex did not stop or kill those existing processes.

Live local smoke then used temporary dev jobs and local Docker PostgreSQL:

| Check | Status | Result |
|---|---|---|
| Local database safety check | `.env` `DATABASE_URL` pattern validation | pass | Local PostgreSQL URL was present; value was not printed. |
| PostgreSQL service | `docker compose up -d postgres` | pass | `salesops-postgres` reported running. |
| Migration | `uv run alembic upgrade head` | pass | Alembic used `PostgresqlImpl` and transactional DDL. |
| Demo seed | `uv run python -m backend.app.leads.demo_seed` | pass | Seeded 4 demo runs: success, failed, retried, queued. |
| Backend run history | `Invoke-RestMethod -Uri "http://127.0.0.1:8010/leads/runs"` | pass | Returned 4 rows; sample included `success.demo@example.com`, `Northstar Growth`, `northstar.example`. |
| Frontend proxy | `Invoke-RestMethod -Uri "http://127.0.0.1:3020/api/leads/runs"` | pass | Returned 4 rows and preserved enriched lead summary fields. |
| Admin page HTTP | `Invoke-WebRequest -Uri "http://127.0.0.1:3020/admin/runs" -UseBasicParsing` | pass | Returned HTTP 200. |
| Browser admin page | Playwright CLI opened `http://127.0.0.1:3020/admin/runs` | pass | Page rendered admin heading, persisted email/company identity, and no retry text. |

Temporary backend and frontend smoke jobs were stopped after the checks. The local Docker PostgreSQL service was left running because it is the project local dev database and may already have been running.

## 5. Skipped Checks

| Check | Status | Written reason |
|---|---|---|
| Real CRM/Slack/Google Sheets/OpenAI/API smoke | skipped | Explicitly out of scope; the project remains mock-first and local-only. |
| GitHub Actions / CI | skipped | The task explicitly forbids adding CI or GitHub Actions; `.github\workflows` remains absent. |
| Retry UI or mutation smoke | skipped | No retry button or mutation action is part of this read-only slice. |

## 6. Manual Verification Commands

After local PostgreSQL, migrations, and demo seed are available:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8010 --log-level debug
Invoke-RestMethod -Uri "http://127.0.0.1:8010/leads/runs"
```

In another PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8010"
pnpm --dir apps/web dev
Invoke-RestMethod -Uri "http://localhost:3000/api/leads/runs"
```

Then open `http://localhost:3000/admin/runs` and confirm persisted lead email/company identity is visible with no retry button or mutation action.

## 7. Known Limitations And Risks

- Full persisted admin filters by date, owner, status, source, and error type are still future work.
- Failure-detail navigation and retry controls are intentionally not implemented in this slice.
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
Enrich read-only run history with lead summary
```
