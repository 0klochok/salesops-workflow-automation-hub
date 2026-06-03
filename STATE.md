# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-03 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Post-Slice-14 - `/admin/runs` regression hardening |
| Overall status | on-track |
| Quality gate status | Required frontend gates passed; in-app Browser smoke passed |
| Completion | Post-Slice-14 `/admin/runs` regression hardening complete |
| Main blocker | none |

## 1. Current Objective

- Verify the read-only `/admin/runs` page after Slice 14 UI polish.
- Preserve API contracts, local proxy routes, fetch methods, query behavior, visible text, accessible labels, and read-only behavior.
- Add only frontend test coverage for a clear Slice 14 regression gap.
- Do not redesign the page, add pagination, add backend work, add dependencies, add GitHub Actions, stage, commit, push, or call real external APIs.

## 2. Phase Summary

- Reviewed the current `/admin/runs` component, local run-history API helper, Next proxy routes, page entrypoint, and existing admin tests.
- Confirmed the implementation still uses read-only local `GET` fetches for run history and selected run detail.
- Confirmed selecting a run still uses `router.replace` to preserve filters and add `runId`.
- Confirmed the current component does not expose retry, edit, delete, rerun, submit, worker, background-job, or other mutation controls.
- Added minimal test coverage for the missing forbidden worker/background-job controls in the existing read-only regression test.
- No component, API route, backend, schema, migration, seed, adapter, dependency, or visual design changes were made.

## 3. Files Changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.test.tsx` | Added explicit read-only regression assertions for worker and background-job controls |
| `STATE.md` | Recorded Post-Slice-14 phase summary, validation, smoke results, skipped checks, known issues, and git safety posture |

Generated validation artifact handling:

| Path | Status |
|---|---|
| `apps/web/tsconfig.tsbuildinfo` | Changed during typecheck/build validation, then restored from a temp backup to pre-validation SHA256 `97C17D7278383392CE1C0AF684E63133640D3E580373C172E644CE5B48CCAF75`; no intended diff remains |

## 4. Automated Validation

| Gate | Command | Status | Exact result |
|---|---|---|---|
| Frontend lint | `pnpm --dir apps/web lint` | pass | `$ eslint .` completed with exit 0 |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | `Test Files 4 passed (4)`; `Tests 26 passed (26)`; duration `13.92s` |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit` completed with exit 0 |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `4.3s`; `/admin/runs`, local API routes, and `/icon.svg` built |
| Git whitespace check | `git diff --check` | pass | Exit 0; Git reported LF-to-CRLF normalization warnings for changed text files |

Validation notes:

- The Windows sandbox could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- `apps/web/tsconfig.tsbuildinfo` was backed up before typecheck/build and restored after validation-only churn.
- No dependency installation, dependency update, GitHub Actions, staging, commits, pushes, paid API calls, or real external API calls were performed.

## 5. Manual Smoke

Local smoke used backend port `8065` and frontend port `3075`.

| Step | Status | Result |
|---|---|---|
| Port precheck | pass | Ports `8065` and `3075` had no listeners before smoke |
| Start PostgreSQL | pass | `docker compose up -d postgres` returned `Container salesops-postgres Running` |
| Apply migrations | pass | `uv run alembic upgrade head` used `PostgresqlImpl` and transactional DDL |
| Seed demo data | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| Start backend | pass | `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8065 --log-level info`; listener PID `12472` |
| Backend health | pass | `GET http://127.0.0.1:8065/health` returned `status = ok` |
| Backend run history | pass | `GET http://127.0.0.1:8065/leads/runs` returned the 4 seeded demo runs |
| Start frontend | pass | `pnpm.cmd --dir apps/web exec next dev --hostname 127.0.0.1 --port 3075`; backend env vars pointed at `http://127.0.0.1:8065`; listener PID `19476` |
| Frontend run-history proxy | pass | `GET http://127.0.0.1:3075/api/leads/runs` returned the 4 seeded demo runs |
| Browser path | pass | Used Codex in-app Browser with desktop viewport `1440x1100` and mobile viewport `390x900` |
| Admin page render | pass | Loaded `http://127.0.0.1:3075/admin/runs`; title was `SalesOps Workflow Automation Hub`; seeded rows rendered |
| Desktop layout | pass | Document client/scroll width was `1425/1425`; table wrapper client/scroll width was `1182/1182`; idle detail text rendered |
| Select failed run | pass | Clicked `View details for run_demo_failed`; URL became `http://127.0.0.1:3075/admin/runs?runId=run_demo_failed`; `Run detail` rendered |
| Desktop selected detail | pass | Document client/scroll width remained `1425/1425`; detail client/scroll width was `1214/1214`; table wrapper remained `1182/1182` |
| Mobile selected detail | pass | Document client/scroll width was `375/375`; detail client/scroll width was `342/342`; table scrolling stayed inside the table wrapper (`310` client, `1180` scroll) |
| Mobile filtered empty state | pass | `http://127.0.0.1:3075/admin/runs?q=no-local-match` showed `No runs match these filters.`; reset buttons were `308/308`; document client/scroll width was `375/375` |
| No mutation controls | pass | Control audit found no retry, edit, delete, rerun, submit, worker, background-job, archive, create, send, or resubmit controls |
| Console/runtime health | pass | In-app Browser console warning/error log was empty |
| Request method safety | pass | Frontend dev log and backend Uvicorn access log showed local `GET` requests only for `/admin/runs`, `/api/leads/runs`, `/api/leads/runs/run_demo_failed`, `/leads/runs`, `/leads/runs/run_demo_failed`, and `/health` |

Smoke cleanup:

- Reset the in-app Browser viewport override.
- Stopped only the local smoke listener processes started by Codex: backend PID `12472` and frontend PID `19476`.
- Final port check for `8065` and `3075` returned no listeners.
- Docker PostgreSQL was left running as the local development database.

## 6. Skipped Checks

| Check | Status | Written reason |
|---|---|---|
| Backend tests/lint/typecheck | skipped | No backend/API/schema/contract files changed; frontend gates plus local backend/proxy/browser smoke covered the affected UI surface |
| Backend migration generation | skipped | No persistence models or database schema changed |
| Manual browser loading/error state forcing | skipped | Existing component tests cover loading and error states; forcing server/env failure during smoke would add risk without changing the Slice 14 regression surface |
| Real HubSpot/Slack/Google Sheets/OpenAI/API smoke | skipped | Explicitly forbidden; project remains mock-first, local-only, and demo-safe |
| Paid API, production API, external CRM, webhook, or external service calls | skipped | Explicitly forbidden without user approval and not needed for this phase |
| GitHub Actions / CI validation | skipped | The project uses local validation first and this task forbids GitHub Actions changes |
| Commit, push, or staging | skipped | Explicitly forbidden; no files were staged, committed, or pushed |

## 7. Known Limitations And Non-Blocking Notes

- Admin filtering remains client-side over the current unpaginated sanitized run list.
- Source-specific admin filtering remains future work.
- Backend retry endpoints remain implemented and tested, but the public admin UI intentionally exposes no mutation action.
- Suggested-action copy may mention retry as read-only guidance; this is not an actionable public admin control.
- Docker PostgreSQL remains running after smoke unless stopped manually.
- `apps/web/tsconfig.tsbuildinfo` is tracked even though `.gitignore` ignores `*.tsbuildinfo`; validation can rewrite it, so it was restored from backup.
- The frontend smoke used `next dev`; normal dev compilation messages appeared, but no browser console warnings/errors were observed.

## 8. Manual Verification Commands

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port <backend-port>
Invoke-RestMethod -Uri "http://127.0.0.1:<backend-port>/health"
Invoke-RestMethod -Uri "http://127.0.0.1:<backend-port>/leads/runs"
```

In another PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:<backend-port>"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:<backend-port>"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port <frontend-port>
Invoke-RestMethod -Uri "http://127.0.0.1:<frontend-port>/api/leads/runs"
```

Then open `http://127.0.0.1:<frontend-port>/admin/runs`, select `View details for run_demo_failed`, verify the URL includes `runId=run_demo_failed`, verify desktop and mobile no-overflow behavior, and confirm admin interactions issue local `GET` requests only.

## 9. Git Safety

- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.

## 10. Next Suggested Phase

Continue Phase 4 with remaining portfolio polish artifacts, such as architecture diagram refinements, before/after workflow explanation, safe credentials handoff notes, and demo script/video plan.

## 11. Suggested Commit Message

```text
Harden admin run history regression coverage
```
