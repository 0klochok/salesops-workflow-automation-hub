# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-02 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 4 Slice 9 - portfolio demo and handoff polish |
| Overall status | on-track |
| Quality gate status | Required automated gates passed; local smoke passed with browser-wide netlog caveat |
| Completion | Slice 9 docs update is ready for user review |
| Main blocker | none |

## 1. Current Objective

- Polish the portfolio demo and handoff path so a reviewer can understand and manually verify the local workflow.
- Document the safe local data flow from lead intake through persisted run history and the read-only `/admin/runs` screen.
- Keep the slice docs-only: no backend behavior changes, frontend behavior changes, dependency changes, CI, staging, commit, push, real integrations, paid APIs, or secrets.

## 2. Status Snapshot

- `README.md` now has a concise current portfolio demo path explaining what the app demonstrates, the mock/local safety boundary, the backend-to-frontend run-history flow, local PowerShell startup commands, demo seeding, and `/admin/runs` read-only verification.
- `RUNBOOK.md` keeps the operational smoke path and now names Slice 9, clarifies that `/admin/runs` is read-only, and includes the selected-run-hidden verification URL in the local demo smoke.
- No dedicated demo or handoff doc exists in the current repo, so this slice updates existing docs instead of creating new files.
- Public APIs, backend routes, frontend components, tests, migrations, lockfiles, dependency manifests, Compose config, GitHub Actions, `.env`, and secret handling were not changed.
- `apps/web/tsconfig.tsbuildinfo` remains a tracked generated artifact. It was not manually edited, but `pnpm --dir apps/web typecheck` / `pnpm --dir apps/web build` changed it during required validation.

## 3. Files Changed

| Path | Purpose | Status |
|---|---|---|
| `README.md` | Added current portfolio demo path, local/mock safety notes, data flow, startup/seed commands, and read-only `/admin/runs` verification | updated |
| `RUNBOOK.md` | Refreshed phase label and local admin smoke wording for Slice 9 | updated |
| `STATE.md` | Replaced Slice 8 implementation status with Slice 9 documentation status, validation results, smoke results, and risks | updated |
| `apps/web/tsconfig.tsbuildinfo` | Tracked TypeScript incremental build artifact changed by required validation; no manual edit | generated update |

No code, dependency, lockfile, migration, Compose, GitHub Actions, `.env`, or secret files were intentionally changed.

## 4. Automated Validation

| Gate | Command | Status | Result |
|---|---|---|---|
| Frozen backend install | `uv sync --frozen` | pass | Checked 42 packages in 6ms. |
| Backend tests | `uv run pytest` | pass | 48 passed; 1 existing Starlette/httpx deprecation warning from dependencies. |
| Backend lint | `uv run ruff check .` | pass | All checks passed. |
| Backend typecheck | `uv run mypy backend tests` | pass | No issues found in 26 source files. |
| Frozen frontend install | `pnpm install --frozen-lockfile` | pass | Already up to date using pnpm `v11.5.0`. |
| Frontend lint | `pnpm --dir apps/web lint` | pass | `eslint .` completed with exit 0. |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | 4 files and 23 tests passed. |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` completed with exit 0. |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js 15.5.18 production build completed; `/admin/runs` built successfully. |
| Compose static validation | `docker compose config` | pass | Local PostgreSQL service rendered successfully. |
| Git whitespace check | `git diff --check` | pass | Exit 0 with Git LF-to-CRLF normalization warnings only; no whitespace errors. |
| GitHub Actions absence | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`; no workflow directory exists. |
| Staged-files check | `git diff --cached --name-only` | pass | No staged files. |

Validation notes:

- PowerShell sandbox execution failed with `CreateProcessAsUserW failed: 5`, so local commands were run through approved escalated PowerShell.
- `apps/web/tsconfig.tsbuildinfo` changed during frontend typecheck/build validation. It remains unstaged.

## 4.1 Manual Smoke

Live local smoke used temporary port `8029` for FastAPI and temporary port `3044` for Next.js production start. Temporary backend/frontend processes and Slice 9 scratch artifacts were stopped or removed after validation.

| Check | Status | Result |
|---|---|---|
| Local `.env` presence | `Test-Path -LiteralPath ".env"` | pass | Returned `True`; value was not printed. |
| PostgreSQL service | `docker compose up -d postgres` | pass | `salesops-postgres` was running. |
| Migration | `uv run alembic upgrade head` | pass | Alembic used `PostgresqlImpl` and transactional DDL. |
| Demo seed | `uv run python -m backend.app.leads.demo_seed` | pass | Seeded 4 demo runs: success, failed, retried, queued. |
| Backend health | `Invoke-RestMethod -Uri "http://127.0.0.1:8029/health"` | pass | Returned service status `ok`. |
| Frontend startup | `next start` on `127.0.0.1:3044` | pass | Started with backend env vars pointed to `http://127.0.0.1:8029`. |
| Frontend run-history proxy | `Invoke-RestMethod -Uri "http://127.0.0.1:3044/api/leads/runs"` | pass | Returned 4 seeded rows: queued, retried, failed, success. |
| Browser unfiltered list | Headless Chrome rendered `/admin/runs` | pass | Rendered all 4 seeded runs. |
| Browser status filter | Headless Chrome rendered `?status=failed` | pass | Rendered `run_demo_failed` and not `run_demo_success`. |
| Browser search filter | Headless Chrome rendered `?q=atlas` | pass | Rendered `run_demo_retried` and `Atlas Demand`; did not render `run_demo_failed`. |
| Browser filtered empty state | Headless Chrome rendered `?q=no-local-match` | pass | Rendered `No runs match these filters.` |
| Browser date filters | Headless Chrome rendered `?from=2026-06-01&to=2026-06-01` | pass | Rendered the seeded runs for that date. |
| Browser selected detail | Headless Chrome rendered `?status=failed&runId=run_demo_failed` | pass | Rendered run detail, `Pipeline Labs`, safe intake payload, and attempts. |
| Browser selected-run-hidden notice | Headless Chrome rendered `?status=success&runId=run_demo_failed` | pass | Rendered the selected-run-hidden notice while keeping `run_demo_failed` detail visible. |
| Browser app request behavior | Chrome netlog filtered to page/app URLs | pass | Local app requests were `GET` only, including `/api/leads/runs` and `/api/leads/runs/run_demo_failed`; local non-GET count was 0. |
| External API safety | Browser/API smoke plus endpoint search | pass with caveat | No app/page request to real CRM, Slack, Google Sheets, OpenAI, paid API, or webhook was observed; source/config search found only `.env.example` `example.invalid` placeholder. Browser-wide Chrome netlog also included Chrome background Google service URLs, not app/page requests. |
| No retry/mutation UI | Headless Chrome rendered selected detail/hidden state | pass | No retry, edit, delete, submit, resubmit, rerun, worker, or background-job controls were found in the rendered admin UI. |

Smoke notes:

- Playwright CLI through `npx --package @playwright/cli` was not used because the approval review rejected fetching and executing an external npm package for convenience tooling.
- Local Chrome/Edge CDP remote-debugging attempts exited with code 13, so tab-scoped CDP request capture was unavailable.
- The browser smoke used local Chrome headless DOM rendering and Chrome netlog filtered to local app/page requests. Browser-wide netlog contained Chrome background service traffic; those entries are not treated as app traffic.
- Temporary local Next.js process `24548`, temporary FastAPI wrapper process `14828`, and backend child listener `11584` were stopped. Slice 9 `.scratch` files were removed.
- Local Docker PostgreSQL was started or confirmed running and was left running because it is the project dev database and may already have been running.

## 5. Skipped Checks

| Check | Status | Written reason |
|---|---|---|
| Real CRM/Slack/Google Sheets/OpenAI/API smoke | skipped | Explicitly out of scope; the project remains mock-first and local-only. |
| GitHub Actions / CI | skipped | The task explicitly forbids adding CI or GitHub Actions. |
| Retry, edit, delete, submit, resubmit, rerun, worker, or background-job controls | skipped | This docs-only slice must keep `/admin/runs` read-only and must not add mutation behavior. |

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
- `apps/web/tsconfig.tsbuildinfo` remains a tracked generated artifact and may change during TypeScript/build validation even though this slice does not intentionally edit it.
- Docker PostgreSQL may be started or confirmed running for smoke; stop it manually if not needed.

## 8. Next Suggested Phase

Continue Phase 4 with remaining portfolio polish artifacts such as the architecture diagram, before/after workflow explanation, safe credentials handoff notes, and demo script/video plan if they are still needed.

## 9. Scope Control And Safety

- Nothing was staged, committed, pushed, deployed, or connected to real external services.
- No GitHub Actions directory was added.
- No real secrets were created, printed, stored, logged, screenshotted, or committed.
- No real HubSpot, Slack, Google Sheets, OpenAI, CRM, webhook, paid API, or production service was called.
- No retry button, frontend mutation action, background worker change, migration, or real integration was added.
- Changes stayed inside the repository.

## 10. Suggested Commit Message

```text
Polish portfolio demo handoff docs
```
