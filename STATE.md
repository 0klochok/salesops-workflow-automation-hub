# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-02 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 4 slice 8 - read-only persisted admin run filters |
| Overall status | on-track |
| Quality gate status | Required automated gates passed; live local smoke passed |
| Completion | Slice 8 implementation is ready for user review |
| Main blocker | none |

## 1. Current Objective

- Add read-only persisted run filters to `/admin/runs`.
- Preserve filter state with URL query parameters for status, search, created-date range, and selected `runId`.
- Keep run detail selection working after filters are applied, including when the selected run is outside the filtered list.
- Keep the slice local-only and read-only: no retry, edit, delete, submit, mutation UI, real integrations, paid APIs, CI, staging, commit, or push.

## 2. Status Snapshot

- Backend run-history rows now include sanitized `lead_name` derived from persisted first and last name.
- `/leads/runs` remains unfiltered server-side; Slice 8 filtering is client-side because the current run list is unpaginated and already exposes sanitized summary fields.
- `/admin/runs` now supports URL-backed filters:
  - `status=queued|success|failed|retried`;
  - `q=<search text>` across run ID, lead email, lead name, company name, and company domain;
  - `from=YYYY-MM-DD` and `to=YYYY-MM-DD` against persisted `created_at`;
  - `runId=<selected run id>` for selected detail preservation.
- Invalid or empty filter values are normalized out of the URL.
- Filtered empty state is distinct from the no-data state and includes a reset action.
- Selected run details still load through `GET /api/leads/runs/[runId]`; if filters hide the selected run, the UI explicitly says the detail is outside the filtered list.
- No backend query parameters, pagination, migrations, new dependencies, background workers, real integrations, deployment config, GitHub Actions, staging, commit, push, PR, or secret handling were added.
- `apps/web/tsconfig.tsbuildinfo` was modified by TypeScript/build validation; no manual edit was made to that generated file.

## 3. Files Changed

| Path | Purpose | Status |
|---|---|---|
| `backend/app/leads/schemas.py` | Added allowlisted `lead_name` to run-history summaries | updated |
| `backend/app/leads/persistence.py` | Maps sanitized persisted lead names into run-history rows | updated |
| `tests/test_lead_persistence.py` | Added repository coverage for sanitized `lead_name` | updated |
| `tests/test_lead_intake_api.py` | Added API coverage for `lead_name` in run-history responses | updated |
| `apps/web/src/lib/types.ts` | Added optional frontend `lead_name` run-history field | updated |
| `apps/web/src/app/admin/runs/page.tsx` | Wrapped the search-param client view in `Suspense` for Next.js build safety | updated |
| `apps/web/src/components/admin-run-history.tsx` | Added URL-preserved filters, filtered states, and selected-detail preservation | updated |
| `apps/web/src/components/admin-run-history.test.tsx` | Added status/search/date/empty/detail/read-only filter coverage | updated |
| `RUNBOOK.md` | Added filtered run-history smoke instructions and Slice 8 validation commands | updated |
| `STATE.md` | Current Slice 8 status, validation, smoke, and risks | updated |
| `apps/web/tsconfig.tsbuildinfo` | TypeScript incremental build artifact changed by validation | generated update |

No dependency, lockfile, migration, Compose, GitHub Actions, `.env`, or secret files were changed.

## 4. Automated Validation

| Gate | Command | Status | Result |
|---|---|---|---|
| Frozen backend install | `uv sync --frozen` | pass | Checked 42 packages. |
| Backend tests | `uv run pytest` | pass | 48 passed; 1 existing Starlette/httpx deprecation warning from dependencies. |
| Backend lint | `uv run ruff check .` | pass | All checks passed. |
| Backend typecheck | `uv run mypy backend tests` | pass | No issues found in 26 source files. |
| Frozen frontend install | `pnpm install --frozen-lockfile` | pass | Already up to date using pnpm `v11.5.0`. |
| Frontend lint | `pnpm --dir apps/web lint` | pass | `eslint .` completed with exit 0. |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | 4 files and 23 tests passed. |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` completed with exit 0. |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js 15.5.18 production build completed; `/admin/runs` built with the filter UI. |
| Compose static validation | `docker compose config` | pass | Local PostgreSQL service rendered successfully. |
| Git whitespace check | `git diff --check` | pass | Exit 0 with Git LF-to-CRLF normalization warnings only; no whitespace errors. |
| GitHub Actions absence | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`; no workflow directory exists. |
| Staged-files check | `git diff --cached --name-only` | pass | No staged files. |

Development notes:

- Targeted backend tests passed: `uv run pytest tests/test_lead_persistence.py tests/test_lead_intake_api.py` returned 25 passed with the existing Starlette/httpx warning.
- The first targeted frontend admin test run had one assertion issue because two reset buttons are visible in the filtered-empty state; the test was corrected and rerun successfully.
- `pnpm --dir apps/web build` was run twice because early `next dev` smoke attempts rewrote `.next`; the second production build passed before final `next start` smoke.

## 4.1 Manual Smoke

Live local smoke used temporary port `8028` for FastAPI and final temporary port `3042` for Next.js production start. Temporary backend/frontend processes and Playwright browser session were stopped after validation.

| Check | Status | Result |
|---|---|---|
| PostgreSQL service | `docker compose up -d postgres` | pass | `salesops-postgres` reported running. |
| Migration | `uv run alembic upgrade head` | pass | Alembic used `PostgresqlImpl` and transactional DDL. |
| Demo seed | `uv run python -m backend.app.leads.demo_seed` | pass | Seeded 4 demo runs: success, failed, retried, queued. |
| Backend health | `Invoke-RestMethod -Uri "http://127.0.0.1:8028/health"` | pass | Returned service status `ok`. |
| Frontend admin page HTTP | `Invoke-WebRequest -Uri "http://127.0.0.1:3042/admin/runs" -UseBasicParsing` | pass | Returned HTTP 200. |
| Frontend run-history proxy | `Invoke-RestMethod -Uri "http://127.0.0.1:3042/api/leads/runs"` | pass | Returned 4 seeded rows with `lead_name`. |
| Browser unfiltered list | Playwright opened `http://127.0.0.1:3042/admin/runs` | pass | Rendered 4 seeded rows and disabled reset filters. |
| Browser status filter | Status `failed` | pass | URL became `?status=failed`; list showed 1 failed run and 4 total persisted. |
| Browser search filter | Search `atlas` | pass | URL became `?q=atlas`; list showed the Atlas Demand retried run. |
| Browser filtered empty state | Search `no-local-match` | pass | Rendered "No runs match these filters" and reset controls. |
| Browser date filters | `?from=2026-06-01&to=2026-06-01` | pass | Date controls preserved the query values and showed seeded rows for the date. |
| Browser selected detail after filtering | `status=failed`, then `View details` | pass | URL became `?status=failed&runId=run_demo_failed`; detail panel rendered. |
| Browser selected run hidden by filters | `?status=success&runId=run_demo_failed` | pass | List showed the success run, warning showed selected run outside filter, detail panel stayed visible. |
| Browser network behavior | Playwright `requests` | pass | Shown non-static requests were local GETs: `/api/leads/runs`, `/api/leads/runs/run_demo_failed`, and local RSC prefetch `/`. |
| Browser console | Playwright `console` | pass | 0 errors, 0 warnings after the smoke flow. |
| No retry/mutation UI | Browser snapshot review | pass | No retry, edit, delete, submit, or mutation control was visible. |
| External API safety | Browser/API smoke | pass | No real CRM, Slack, Google Sheets, OpenAI, paid API, webhook, or external service call was made. |

Smoke notes:

- An initial frontend smoke start on `3038` had malformed env quoting and was stopped.
- A corrected `next dev` attempt on `3039` failed with JavaScript heap out-of-memory after the extra dev server was already running.
- `next start` attempts on `3040` and `3041` failed because the dev-server attempts had rewritten `.next`; rebuilding restored `apps/web/.next/BUILD_ID`.
- Final smoke used `next start` from `apps/web` on `3042` with `BACKEND_API_BASE_URL` and `NEXT_PUBLIC_BACKEND_API_BASE_URL` pointing to `http://127.0.0.1:8028`.
- Temporary `.playwright-cli` snapshots and `.scratch/slice8-*` smoke logs were removed.
- Local Docker PostgreSQL was started or confirmed running and was left running because it is the project dev database and may already have been running.

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

Then open `http://localhost:3000/admin/runs`, apply status/search/date filters, select `View details`, and confirm the same-page panel remains read-only.

## 7. Known Limitations And Risks

- Filtering is client-side over the current unpaginated sanitized run list; backend query parameters can be added later if data volume justifies them.
- Owner and error-type filters are still future work.
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
Add read-only admin run filters
```
