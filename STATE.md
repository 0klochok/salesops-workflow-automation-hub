# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 4 slice 5 - read-only web admin run-history UI |
| Overall status | on-track |
| Quality gate status | Required automated gates passed; optional live UI smoke partially validated and blocked by already-running local service errors |
| Completion | Slice 5 implementation is ready for user review |
| Main blocker | none for automated validation |

## 1. Current Objective

- Add a small read-only frontend/admin UI surface at `/admin/runs`.
- Load persisted run history through the existing backend `GET /leads/runs` contract via a local Next.js proxy.
- Preserve backend workflow behavior, retry mutation behavior, mock-only integration boundaries, and existing intake behavior.
- Do not stage, commit, push, create PRs, add GitHub Actions, call real services, use paid APIs, print secrets, or overwrite `.env`.

## 2. Status Snapshot

- Added `GET /api/leads/runs` in the Next.js app as a local read-only proxy to FastAPI `GET /leads/runs`.
- Added frontend run-history types for the existing backend response shape.
- Added `/admin/runs` with a read-only admin run-history table.
- The admin UI displays run ID, lead ID, source, status, created/updated timestamps, attempt count, latest attempt status/error/summary, and failure-detail availability.
- Loading, empty, and error states are implemented and covered by tests.
- No retry button, retry mutation, POST action, backend workflow behavior, real integration, deployment config, GitHub Actions, staging, commit, push, PR, or secret handling was added.
- The home page now includes a small link to `/admin/runs`.
- Source-of-truth docs now reflect Phase 4 slice 5 and the read-only admin UI.
- `apps/web/tsconfig.tsbuildinfo` was modified by the TypeScript/build validation artifact; no manual edit was made to that generated file.

## 3. Files Changed

| Path | Purpose | Status |
|---|---|---|
| `apps/web/src/app/api/leads/runs/route.ts` | Local read-only proxy to backend `/leads/runs` | added |
| `apps/web/src/app/admin/runs/page.tsx` | Admin run-history route | added |
| `apps/web/src/components/admin-run-history.tsx` | Read-only admin run-history UI | added |
| `apps/web/src/components/admin-run-history.test.tsx` | UI tests for rows, empty/error states, and no retry action | added |
| `apps/web/src/lib/run-history-api.ts` | Typed client fetch helper for run history | added |
| `apps/web/src/lib/types.ts` | Shared run-history response types | updated |
| `apps/web/src/components/lead-demo.tsx` | Home page link to admin runs | updated |
| `RUNBOOK.md` | Added `/admin/runs` manual smoke path and slice 5 validation label | updated |
| `README.md`, `REQ.md`, `DESIGN.md`, `CONTEXT.md`, `TDD.md`, `EXEC_PLAN.md` | Minimal source-of-truth updates for slice 5 | updated |
| `apps/web/tsconfig.tsbuildinfo` | TypeScript incremental build artifact changed by validation | generated update |

No backend source, migration, dependency, lockfile, Compose, GitHub Actions, deployment, `.env`, or secret files were changed.

## 4. Validation

| Gate | Command | Status | Result |
|---|---|---|---|
| Targeted frontend tests | `pnpm --dir apps/web test -- --run admin-run-history` | pass | 1 file and 4 tests passed. |
| Frozen backend install | `uv sync --frozen` | pass | Checked 42 packages in 87 ms. |
| Backend tests | `uv run pytest` | pass | 44 passed; 1 Starlette/httpx deprecation warning from dependencies. |
| Backend lint | `uv run ruff check .` | pass | All checks passed. |
| Backend typecheck | `uv run mypy backend tests` | pass | No issues found in 26 source files. |
| Frozen frontend install | `pnpm install --frozen-lockfile` | pass | Scope all 2 workspace projects; already up to date; done in 60 ms using pnpm `v11.3.0`. |
| Frontend lint | `pnpm --dir apps/web lint` | pass | `eslint .` completed with exit 0. |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | 4 files and 13 tests passed. |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` completed with exit 0. |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js 15.5.18 production build completed; `/admin/runs` and `/api/leads/runs` were included. |
| Compose static validation | `docker compose config` | pass | Local PostgreSQL service rendered successfully without starting containers. |
| Git whitespace check | `git diff --check` | pass | Exit 0 with Git LF-to-CRLF normalization warnings only; no whitespace errors. |
| Staged-files check | `git diff --cached --name-only` | pass | Returned no files. |
| GitHub Actions absence | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`; no workflow directory exists. |

## 4.1 Optional Manual Smoke

| Check | Status | Result |
|---|---|---|
| Docker Engine availability | `docker info --format "{{.ServerVersion}}"` | pass | Docker Engine reported version `29.4.3`. |
| Existing backend port | `Test-NetConnection -ComputerName 127.0.0.1 -Port 8000 -InformationLevel Quiet` | pass | Returned `True`; an existing service is listening. |
| Existing frontend port | `Test-NetConnection -ComputerName 127.0.0.1 -Port 3000 -InformationLevel Quiet` | pass | Returned `True`; an existing service is listening. |
| Existing backend run-history smoke | `Invoke-RestMethod -Uri "http://127.0.0.1:8000/leads/runs"` | fail | Existing local backend returned HTTP 500. |
| Existing frontend proxy smoke | `Invoke-RestMethod -Uri "http://localhost:3000/api/leads/runs"` | fail | Existing local frontend proxy returned HTTP 500 because the backend returned HTTP 500. |
| Existing admin page route | `Invoke-WebRequest -Uri "http://localhost:3000/admin/runs" -UseBasicParsing` | partial | Returned HTTP 200 and rendered the admin route shell. |
| Existing home page route | `Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing` | fail | Existing dev server returned a module error after the local build artifact changed. Restart the frontend dev server before manual browser smoke. |

The optional browser/data smoke was not counted as passed because the already-running local services were unhealthy. Codex did not stop, kill, or restart any existing local process. Restart the backend/frontend dev servers after confirming local `DATABASE_URL`, then use the `RUNBOOK.md` `/admin/runs` smoke path.

## 5. Skipped Checks

| Check | Status | Written reason |
|---|---|---|
| Full browser automation against seeded UI data | skipped | Existing localhost services returned backend/proxy HTTP 500; Codex did not kill or restart existing processes. Automated component tests and production build passed. |
| Starting replacement backend/frontend servers on alternate ports | skipped | Avoided leaving or force-stopping background process trees while existing local ports were already occupied. |
| Backend source compatibility change | skipped | No failing integration test proved a backend compatibility defect. |
| GitHub Actions / CI | skipped | The task explicitly forbids adding CI or GitHub Actions; `.github\workflows` remains absent. |

## 6. Manual Verification

After restarting local dev servers if needed:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --reload
```

In another PowerShell window:

```powershell
pnpm --dir apps/web dev
```

Then open:

- `http://localhost:3000/admin/runs`
- confirm seeded run IDs display;
- confirm no retry button or mutation action is visible.

## 7. Known Limitations And Risks

- The read-only admin UI shows only fields exposed by the current `/leads/runs` contract; email/company identity is not available without a backend contract change.
- Full persisted admin filters by date, owner, status, source, and error type are still future work.
- Failure-detail navigation and retry controls are intentionally not implemented in this slice.
- Existing local dev servers may need a restart after `pnpm --dir apps/web build` because the build updates `.next`.
- `apps/web/tsconfig.tsbuildinfo` remains a tracked generated artifact and changed during validation.

## 8. Next Suggested Phase

Continue Phase 4 with portfolio polish docs such as the architecture diagram, before/after workflow explanation, safe credentials handoff notes, and demo script/video plan.

## 9. Scope Control And Safety

- Nothing was staged, committed, pushed, deployed, or connected to real external services.
- No GitHub Actions directory was added.
- No real secrets were created, printed, stored, logged, screenshotted, or committed.
- No real HubSpot, Slack, Google Sheets, OpenAI, CRM, webhook, paid API, or production service was called.
- Changes stayed inside the repository.

## 10. Suggested Commit Message

```text
Add read-only admin run-history UI
```
