# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-04 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Admin source filter dropdown |
| Overall status | on-track |
| Quality gate status | Required backend/frontend gates and scope/safety scans passed for the admin source filter dropdown phase; manual browser smoke was not run because the requested validation was automated/local and the runbook contains the manual browser path |
| Completion | Admin source filter dropdown phase complete |
| Main blocker | none |

## Latest Update - 2026-06-04 Admin Source Filter Dropdown

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.tsx` | Added a URL-backed Source filter dropdown derived from loaded row sources and the existing typed `LeadSource` contract; preserved search/status/date/owner/error-type filters and read-only detail behavior |
| `apps/web/src/components/admin-run-history.test.tsx` | Added admin source-filter tests for all-sources default, one-source filtering, URL preservation, source plus search interaction, and reset behavior |
| `README.md` | Updated current admin-filter and known-limitation wording to include the dedicated source dropdown |
| `REQ.md` | Updated FR-010 status and acceptance wording for source filtering |
| `CONTEXT.md` | Updated current frontend/admin filter context to include source |
| `DESIGN.md` | Updated current admin filter architecture and removed the source-filter future-limitation wording |
| `RUNBOOK.md` | Updated manual admin smoke instructions and local validation text to include source filtering |
| `TDD.md` | Updated current frontend test coverage notes for admin source filtering |
| `STATE.md` | Recorded this source-filter phase, validation, skipped checks, risks, and suggested commit message |

No backend code, public API, schema, database migration, dependency manifest, generated source file, GitHub Actions workflow, deployment config, real integration, secret, staging action, commit, or push was introduced.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | Final output listed intended files only: `M CONTEXT.md`, `M DESIGN.md`, `M README.md`, `M REQ.md`, `M RUNBOOK.md`, `M STATE.md`, `M TDD.md`, `M apps/web/src/components/admin-run-history.test.tsx`, `M apps/web/src/components/admin-run-history.tsx` |
| `git diff --check` | pass | Exit 0; no whitespace errors. Git printed LF-to-CRLF working-copy warnings for touched Markdown/TSX files |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | Python `3.12.13`; `48 passed`, `1 warning`; duration `2.70s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `Test Files 4 passed (4)`; `Tests 30 passed (30)`; duration `12.69s` |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `5.1s`; generated 8 routes including `/admin/runs` and local API proxy routes |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `git ls-files -- .github` | pass | No output; no tracked `.github` files |
| Tracked secret-pattern scan | pass | No output; command exited 1 because there were no matches |
| Tracked live-endpoint scan | pass | No output; command exited 1 because there were no matches |
| `git diff --cached --name-only` | pass | No output; no files staged |

Focused preflight:

- `pnpm --dir apps/web test -- --run admin-run-history` initially failed after adding the dropdown because existing source-cell assertions also matched dropdown option text. Assertions were tightened to the table scope, and the focused rerun passed with `1 passed` file and `21 passed` tests.

Validation notes:

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- Frontend build was run before typecheck to avoid the previously documented `.next/types` race.
- No dependency install, package upgrade, migration command, real external API call, or backend route change was needed.

### Manual verification and skipped checks

| Check | Status | Reason |
|---|---|---|
| Manual browser smoke | skipped | Not part of the requested required gate list; frontend behavior is covered by component tests, lint, typecheck, and build, and `RUNBOOK.md` now documents the exact browser path to verify source filtering locally |
| Dependency install | skipped | Existing locked environments were sufficient; all required gates ran without dependency changes |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment | skipped | Explicitly out of scope; no hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Staging, commit, and push | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

Manual browser verification recommendation:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

In another PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Open `http://127.0.0.1:3042/admin/runs` and confirm `All sources` shows all seeded rows, `csv_upload` shows CSV-sourced rows only, source plus search intersects correctly, reset clears source, selected detail remains read-only, and admin interactions remain local GET-only.

### Remaining risks

- Browser smoke was not run in this phase; rely on automated frontend tests/build plus the manual verification path above for final visual confirmation.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning still appears during backend tests but does not fail the gate.
- TypeScript and Next.js validation may rewrite ignored local `.next` or build-info artifacts without producing tracked source changes.

### Suggested commit message

```text
Add admin source filter dropdown
```

## Latest Update - 2026-06-04 Final Portfolio-Readiness Documentation Pass

### What changed

| Path | Purpose |
|---|---|
| `AGENTS.md` | Replaced stale Phase 0/future command text with current local backend/frontend commands and quality-gate expectations |
| `CONTEXT.md` | Reframed the project as the implemented local/mock demo and documented current admin/retry boundaries |
| `DESIGN.md` | Updated current phase, local flow wording, table scope, and known future admin filter limits |
| `EXEC_PLAN.md` | Updated current phase and next-step guidance for portfolio-readiness documentation |
| `README.md` | Refreshed reviewer-facing setup/validation wording, mock/no-paid-API boundaries, source-filter limitation, and Codex git safety note |
| `REQ.md` | Updated current status for local demo, backend-only retry, and admin filter coverage |
| `RUNBOOK.md` | Updated current validation commands, tool-version wording, and scope-scan guidance without embedding self-matching grep patterns |
| `TDD.md` | Updated current test status and Python 3.12 frozen backend gate commands |
| `STATE.md` | Recorded this final portfolio-readiness documentation pass, validation, skipped checks, risks, and suggested commit message |

No backend code, frontend code, public API, schema, route, UI behavior, dependency manifest, database migration, generated source file, GitHub Actions workflow, deployment config, screenshot, real integration, secret, staging action, commit, or push was introduced.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | Final output listed only docs: `M AGENTS.md`, `M CONTEXT.md`, `M DESIGN.md`, `M EXEC_PLAN.md`, `M README.md`, `M REQ.md`, `M RUNBOOK.md`, `M STATE.md`, `M TDD.md` |
| `git diff --check` | pass | Exit 0; no whitespace errors. Git printed LF-to-CRLF working-copy warnings for the touched Markdown files |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | Python `3.12.13`; `48 passed`, `1 warning`; duration `2.10s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `Test Files 4 passed (4)`; `Tests 27 passed (27)`; duration `16.09s` |
| `pnpm --dir apps/web typecheck` | pass after rerun | Initial parallel run with `pnpm --dir apps/web build` failed with `TS6053` missing `.next/types` files while Next.js regenerated them. Sequential rerun after build passed with `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `3.0s`; generated `/`, `/admin/runs`, local API proxy routes, and `/icon.svg` |

Validation notes:

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- The typecheck/build race was caused by running two local frontend gates in parallel while `next build` regenerated ignored `.next` type artifacts. The final sequential typecheck result is the accepted gate result.
- No dependency install, package upgrade, code generation into tracked files, or migration command was needed for this documentation-only pass.

### Scope and safety scans

| Check | Status | Exact result |
|---|---|---|
| `git ls-files -- .github` | pass | No output; no tracked `.github` files |
| Required tracked secret-pattern scan | pass | No output; command exited 1 because there were no matches |
| Required tracked CI/deploy config scan | pass | No output; command exited 1 because there were no matches |
| Required tracked live-endpoint scan | pass | No output; command exited 1 because there were no matches |

During the pass, an earlier scope scan found documentation self-matches because the exact grep patterns had been added to `RUNBOOK.md`; that wording was revised and the final required scans above are clean.

No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service call was made.

### Manual verification and skipped checks

| Check | Status | Reason |
|---|---|---|
| Affected setup/validation command verification | pass | Updated backend/frontend validation commands were run exactly as documented in the final docs |
| Long-running backend/frontend browser smoke | skipped | Smoke command behavior was not materially changed; this pass changed documentation wording and validation command text only. The 2026-06-04 manual-smoke closure remains the latest live browser/API smoke evidence |
| Screenshots | skipped | Explicitly out of scope; no suitable tracked docs screenshot section required a new image |
| Dependency install | skipped | Existing locked environments were sufficient and all required gates ran without dependency changes |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment | skipped | Explicitly out of scope; no hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Staging, commit, and push | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Remaining risks

- Browser smoke was not rerun in this pass; rely on the earlier 2026-06-04 manual-smoke closure for live UI/API evidence.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning still appears during backend tests but does not fail the gate.
- The public admin table displays source and includes it in text search, but there is still no dedicated source dropdown.
- TypeScript and Next.js validation may rewrite ignored local `.next` or build-info artifacts without producing tracked source changes.

### Suggested commit message

```text
Refresh portfolio-readiness documentation
```

## Latest Update - 2026-06-04 Manual-Smoke Closure And Environment Verification

### What changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded the fresh manual-smoke closure evidence, Python 3.12 backend compatibility pass, scope-creep checks, skipped checks, and remaining risks |

No backend code, frontend code, public API, schema, route, UI behavior, dependency manifest, database migration, generated source file, GitHub Actions workflow, deployment config, real integration, secret, staging action, commit, or push was introduced.

`RUNBOOK.md` was reviewed and did not need changes. Its local PostgreSQL, backend, frontend, and admin smoke instructions still match the working local/mock demo path.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | Starting status had no output |
| `git diff --check` | pass | No output; exit 0 |
| `uv run python --version` | pass | Initially `Python 3.14.4`; after the Python 3.12 compatibility gate the active uv environment reported `Python 3.12.13` |
| `uv run pytest` | pass | `48 passed`, `1 warning`; duration `2.42s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web test -- --run` | pass | `Test Files 4 passed (4)`; `Tests 27 passed (27)`; duration `14.27s` |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `2.7s`; generated `/`, `/admin/runs`, and local API proxy routes |
| `uv python list 3.12 --only-installed --no-python-downloads` | pass | Found local `cpython-3.12.13-windows-x86_64-none` at `C:\Users\Санька\AppData\Roaming\uv\python\cpython-3.12-windows-x86_64-none\python.exe` |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | `48 passed`, `1 warning`; platform Python `3.12.13`; uv rebuilt the ignored local `.venv` for Python 3.12 and installed locked packages |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |

Validation notes:

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- Python 3.12 was already available locally; no Python installation was attempted.
- The Python 3.12 compatibility gate changed only the ignored local `.venv` environment and did not modify tracked dependency manifests.

### Scope-creep checks

| Check | Status | Result |
|---|---|---|
| `Test-Path -LiteralPath .\.github\workflows` | pass | `False`; no GitHub Actions workflow directory exists |
| `git ls-files -- .github` | pass | No output; no tracked `.github` files |
| Tracked CI/deploy config file check | pass | No tracked GitHub workflow, GitLab CI, Azure, Bitbucket, CircleCI, Vercel, Netlify, Render, Railway, Fly, Wrangler, Terraform, Pulumi, Dockerfile, or `.dockerignore` config found |
| Refined tracked CI/deploy term scan | pass | No non-doc source matches |
| Tracked source secret-pattern scan | pass | No token-like or private-key matches in backend, frontend, tests, Alembic, or manifests |
| Tracked source live-endpoint scan | pass | No live HubSpot, Slack webhook/API, OpenAI, Anthropic, Google Sheets/Gemini, Supabase, or service-role endpoint matches in backend, frontend, tests, Alembic, or manifests |
| Network-call surface scan | pass | Matches were expected local frontend/client `fetch` calls through `/api/leads/intake`, `/api/leads/runs`, and `/api/leads/runs/[runId]` |

No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service call was made.

### Local API and browser smoke

- Pre-smoke `docker compose ps` showed `salesops-postgres` already `Up` and `healthy` on port `5432`; it was left running unchanged after the pass.
- `uv run --env-file .env.example alembic upgrade head` passed against local PostgreSQL.
- `uv run --env-file .env.example python -m backend.app.leads.demo_seed` seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Temporary backend ran at `http://127.0.0.1:8765`; `GET /health` returned `status=ok`.
- Backend API smoke passed for `GET /leads/runs`, `GET /leads/runs/run_demo_failed`, and `GET /leads/runs/run_demo_failed/failure`.
- Run-history summary returned `run_count=4`, run IDs `run_demo_queued,run_demo_retried,run_demo_failed,run_demo_success`, and statuses `queued,retried,failed,success`.
- Temporary frontend ran at `http://127.0.0.1:5499` after relaunching with a quote-safe encoded PowerShell command so backend env vars were inherited correctly.
- Frontend proxy smoke passed for `GET /api/leads/runs` and `GET /api/leads/runs/run_demo_failed`.
- Browser smoke used the in-app Browser against `http://127.0.0.1:5499`.
- `/` rendered the lead intake form and CSV import surface; filling `Email *` and selecting `Source * = csv_upload` worked without submitting.
- `/admin/runs` rendered all four seeded rows and the read-only marker with zero browser console warnings/errors.
- Status filter `failed` updated the URL to `/admin/runs?status=failed`, kept `run_demo_failed` visible, and hid success/queued/retried rows.
- `View details for run_demo_failed` opened the same-page detail panel, showed the mock CRM failure message and suggested action, and exposed no retry control.
- `/admin/runs?status=success&runId=run_demo_failed` showed the selected-run-hidden notice, kept the failed-run detail visible, and table DOM inspection showed only the success row in the filtered table.
- Visible admin controls were `Lead demo`, `Reset filters`, and `View details`; no retry, edit, delete, submit, resubmit, rerun, send, archive, or worker controls were visible.
- Frontend and backend logs showed local `GET` requests only for the admin browser/proxy path; no admin `POST`, `PUT`, `PATCH`, or `DELETE` request appeared.
- Temporary backend and frontend processes were stopped after smoke; ports `8765` and `5499` were clear afterward.
- Smoke screenshot was saved outside the repository at `C:\Users\Санька\AppData\Local\Temp\salesops-admin-smoke-hidden-selected.png`.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Python installation | skipped | Python `3.12.13` was already installed locally; no Python install was needed or attempted |
| Explicit dependency install command | skipped | Existing dependencies were present; the only environment change was uv rebuilding the ignored `.venv` for the requested Python 3.12 compatibility gate using locked packages |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment | skipped | Explicitly out of scope; no production hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- Browser smoke covered the in-app Chromium browser only; Firefox, Safari, Edge, and additional breakpoints were not manually checked in this pass.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning still appears during backend tests but does not fail the gate.
- The active ignored `.venv` is now Python `3.12.13` after the compatibility gate; this matches the project target but differs from the pre-pass `3.14.4` uv environment.
- Local PostgreSQL was already running before the pass and was left running for the user's environment.
- Temporary screenshots and logs were stored outside the repository in the OS temp directory; no source artifact was added.

### Suggested commit message

```text
Record manual smoke closure
```

## Latest Update - 2026-06-04 Final Local Release-Candidate QA

### What changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded Slice 18 final local release-candidate QA evidence, manual smoke results, skipped checks, known risks, and suggested commit message |

No backend code, frontend code, README text, public API, schema, route, UI behavior, dependency manifest, database migration, generated file, GitHub Actions workflow, deployment config, real integration, secret, staging action, commit, or push was introduced.

`README.md` did not need changes. It remains PowerShell-friendly, documents Docker Desktop for Compose, and explicitly states the local/mock-only boundaries: no auth, no deployment, no GitHub Actions, no real integrations, and no paid API requirement.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | Starting status had no output; final pre-edit status also had no output |
| `git diff --check` | pass | No output; exit 0 |
| `docker compose config` | pass | Compose config rendered successfully for local PostgreSQL service `salesops-postgres` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web test -- --run` | pass | `Test Files 4 passed (4)`; `Tests 27 passed (27)`; duration `14.48s` |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `3.5s`; generated `/`, `/admin/runs`, and local API proxy routes |
| `uv run pytest` | pass | `48 passed`, `1 warning`; duration `2.21s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `Test-Path -LiteralPath .\.github\workflows` | pass | `False`; no GitHub Actions workflow directory exists |
| README claim scan | pass | Matches were explicit local/mock/no-auth/no-deployment/no-CI/no-real-integration boundaries only |

Validation notes:

- The Windows sandbox could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- `uv run pytest` used the available local Python runtime reported by pytest as Python `3.14.4`; the project target remains Python `3.12+`.
- No dependency install was needed because `.venv` and `apps/web/node_modules` already existed and all gates ran.

### Manual README and local demo QA

- Read `README.md` as a first-time reviewer and confirmed the quick start is PowerShell-friendly.
- Confirmed Docker Desktop is documented for local PostgreSQL through Docker Compose.
- Confirmed the README does not overclaim production deployment, auth, live external integrations, paid API usage, or GitHub Actions.
- Confirmed local `.env` existed without printing it; read `.env.example` and confirmed it is placeholder-only.
- Confirmed local PostgreSQL was already healthy, ran `docker compose up -d postgres`, applied `uv run alembic upgrade head`, and ran `uv run python -m backend.app.leads.demo_seed`.
- Seed command created the expected synthetic runs: `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Started temporary local backend at `http://127.0.0.1:8000` and temporary local frontend at `http://127.0.0.1:3000`; stopped only those temporary processes afterward.
- Verified `GET /health`, `/`, `/admin/runs`, `/api/leads/runs`, and `/api/leads/runs/run_demo_failed`.
- Browser smoke used installed headless Chrome because Browser plugin tooling was unavailable in this implementation context and project Playwright is not installed.
- Chrome screenshots showed the home lead form/CSV page, the seeded admin run table, and `/admin/runs?status=success&runId=run_demo_failed` with the selected-run-hidden notice plus read-only failed-run detail.
- Frontend logs showed local `GET` requests only for `/`, `/admin/runs`, `/api/leads/runs`, `/api/leads/runs/run_demo_failed`, and local route assets during admin smoke.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service call was made.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Dependency install | skipped | `.venv` and `apps/web/node_modules` already existed; all validation gates ran without dependency changes |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment | skipped | Explicitly out of scope; no production hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- Browser smoke covered installed Chrome only; Firefox, Safari, Edge, and additional breakpoints were not manually checked in this pass.
- Local pytest used Python `3.14.4`, while the project target remains Python `3.12+`.
- The existing Starlette/httpx deprecation warning still appears during backend tests but does not fail the gate.
- Local PostgreSQL was left running for the user's environment.
- Temporary screenshots and logs were stored outside the repository in the OS temp directory; no source artifact was added.

### Suggested commit message

```text
Record Slice 18 release-candidate QA
```

## Latest Update - 2026-06-04 Portfolio Handoff And Public README Readiness

### What changed

| Path | Purpose |
|---|---|
| `README.md` | Reframed stale planned-solution wording as implemented local demo behavior; added a compact PowerShell reviewer quick start; made local validation and known local-only limitations easier to find |
| `STATE.md` | Recorded Slice 17 summary, validation, manual README review, skipped checks, risks, and suggested commit message |

No production application code, backend behavior, frontend behavior, API route, database migration, dependency, generated file, GitHub Actions, staged change, commit, or push was introduced.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | Starting status had no output; final documentation status showed `M README.md` and `M STATE.md` |
| `git diff --check` | pass | Exit 0; no whitespace errors; Git warned `README.md` and `STATE.md` LF will be replaced by CRLF when Git touches them |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web test -- --run` | pass | `Test Files 4 passed (4)`; `Tests 27 passed (27)`; duration `12.49s` |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `3.0s`; generated 8 routes including `/admin/runs` and local API proxy routes |
| `uv run pytest` | pass | `48 passed`, `1 warning`; duration `2.49s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `docker compose config` | pass | Compose config rendered successfully for local PostgreSQL service `salesops-postgres` |

### Manual README verification

- Read the README from a first-time reviewer perspective and moved the shortest runnable path near the top.
- Confirmed commands are PowerShell-friendly and use local URLs, `$env:` variables, and repo-root execution.
- Confirmed the documented demo path stays local-only with mocked CRM and Slack behavior.
- Confirmed README does not require paid APIs, real external API calls, real secrets, CI, commits, or pushes.
- Confirmed README presents the admin UI as read-only and keeps manual retry described as backend-only.
- Confirmed README does not claim auth, deployment, live integrations, or GitHub Actions are implemented.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Live backend server smoke | skipped | Documentation-only pass; backend code and runtime behavior were unchanged, and backend tests plus static Compose config passed |
| Live frontend browser QA | skipped | Documentation-only pass after Slice 16 admin UI QA closure; no UI code changed |
| PostgreSQL migration/seed execution | skipped | Existing commands were surfaced for reviewer quick start but not materially changed; static `docker compose config` and backend tests passed |
| Dependency install | skipped | Existing `.venv` and frontend dependencies were already available; validation gates ran without installing or changing dependencies |
| GitHub Actions / CI | skipped | Explicitly out of scope; no CI files were added or run |
| Real external API smoke | skipped | Explicitly forbidden; project remained local-only and mock-safe |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- README quick start assumes Docker Desktop is running before `docker compose up -d postgres`.
- Browser QA was not repeated because no frontend code changed; Slice 16 remains the latest live admin UI QA evidence.
- Backend tests used the available local Python runtime reported by pytest as Python `3.14.4`, while the project target remains Python `3.12+`.

### Suggested commit message

```text
Polish portfolio handoff README
```

## Latest Update - 2026-06-04 Admin UI Final Responsive QA Sweep

### What changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded Slice 16 final responsive QA, validation results, skipped checks, risks, and suggested commit message |

No admin component, backend code, API route, schema, database migration, dependency, GitHub Actions, commit, push, or staged change was introduced. Live QA found no clear layout issue that justified a JSX/CSS edit after the Slice 15 reset-button and table-truncation polish.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | Starting status had no output; final post-documentation status showed only `M STATE.md` |
| `git diff --check` | pass | Exit 0; no whitespace errors; Git warned `STATE.md` LF will be replaced by CRLF when Git touches it |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web test -- --run` | pass | `Test Files 4 passed (4)`; `Tests 27 passed (27)`; duration `17.52s` |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully; generated 8 routes including `/admin/runs` and local API proxy routes |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized; already at head |
| `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| `pnpm --dir apps/web exec playwright --version` | expected unavailable | Command failed because project Playwright is not installed; used local Chrome/CDP fallback without adding dependencies |

### Manual browser verification

Local setup used documented local-only commands:

- Temporary backend: `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8765 --log-level info`
- Temporary frontend: `pnpm --dir apps/web dev --hostname 127.0.0.1 --port 5499`, with `BACKEND_API_BASE_URL` and `NEXT_PUBLIC_BACKEND_API_BASE_URL` pointed at `http://127.0.0.1:8765`
- Temporary browser: installed Chrome `148.0.7778.217` in headless mode through Chrome DevTools Protocol because Browser plugin tooling was not exposed and project Playwright was unavailable

Results:

- `/admin/runs` loaded at desktop viewport `1366x768`; page title was `SalesOps Workflow Automation Hub`; seeded success, failed, queued, and retried rows rendered.
- Desktop had no body-level horizontal overflow: document/client width `1351`, document/body scroll width `1351`.
- Desktop filters rendered all six controls correctly. `Reset filters` stayed secondary, disabled with no active filters, and right-aligned below the filter grid.
- Desktop table stayed contained: table scroller `clientWidth=1182`, `scrollWidth=1182`; detail buttons were aligned, visible, and usable.
- Status filter `failed` updated the URL to `/admin/runs?status=failed`, showed only `run_demo_failed`, and enabled `Reset filters`.
- `Reset filters` returned the URL to `/admin/runs`, restored all four seeded rows, and returned to the disabled no-active-filter state.
- `View details` for `run_demo_failed` updated the URL to `/admin/runs?runId=run_demo_failed` and loaded the read-only detail panel.
- Opening `/admin/runs?status=success&runId=run_demo_failed` showed the selected-run-hidden notice and kept the failed run detail visible.
- Mobile viewport `390x844` had no body-level horizontal overflow: document/client width `390`, document/body scroll width `390`.
- Mobile filters stacked cleanly in the filter panel; `Reset filters` rendered as a full-width `324px` action and still cleared active filters correctly.
- Mobile table overflow stayed inside the table scroller: `clientWidth=324`, `scrollWidth=1075`; the body did not horizontally scroll.
- Mobile detail actions remained usable after horizontal table scrolling; `View details for run_demo_failed` opened the read-only detail panel.
- Browser console issues count was `0`; CDP log issues count was `0`; no Next.js, hydration, application, build, or runtime error overlay text was detected.
- Admin browser interactions issued local `GET` requests only for `/admin/runs`, Next.js route assets, `/api/leads/runs`, and `/api/leads/runs/run_demo_failed`; no non-GET admin requests were observed.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service call was made.
- Temporary backend, frontend, and Chrome processes started for QA were stopped afterward; local PostgreSQL was left running.
- QA screenshots were saved outside the repository in the OS temp directory for local inspection.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Admin component edit | skipped | Live desktop/mobile QA found no clear layout issue requiring JSX/CSS changes |
| Additional frontend tests | skipped | No production code changed; existing frontend tests already cover filtering, reset behavior, detail loading, and read-only boundaries |
| Backend test/lint/typecheck suite | skipped | Backend files and behavior were intentionally untouched; local migration, seed, and browser-backed API smoke covered the required admin QA path |
| Browser plugin | unavailable | Browser plugin tooling was not exposed in this implementation context |
| Project Playwright | unavailable | `pnpm --dir apps/web exec playwright --version` failed because `playwright` is not installed; no dependency was added |
| Dependency install | skipped | Existing dependencies were present; no dependency change was needed or introduced |
| GitHub Actions / CI | skipped | Explicitly out of scope; no CI files were added or run |
| Real external API smoke | skipped | Explicitly forbidden; project remained local-only and mock-safe |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- Browser QA covered Chrome/CDP at the requested desktop and mobile viewport sizes; Firefox, Safari, Edge, and additional breakpoints were not manually checked.
- The admin table intentionally relies on horizontal scrolling on narrow screens; extremely long real-world values still rely on the existing truncation/title behavior.
- Temporary QA script and screenshots were kept outside the repository in the OS temp directory; no source artifact was added.
- Local PostgreSQL remains running for the user's environment; stop it manually only if desired.

### Suggested commit message

```text
Record admin UI final responsive QA
```

## Latest Update - 2026-06-04 Admin UI Final QA And Reset Filter Layout

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.tsx` | Moved the filter-panel `Reset filters` button out of the six-control filter grid into a separate action row, right-aligned on `sm+` and full-width on mobile; preserved the same disabled state, handler, variant, and text |
| `STATE.md` | Recorded Slice 15 validation, local browser verification, skipped checks, and remaining risks |

No backend code, API route, schema, database migration, dependency, GitHub Actions, commit, push, or staged change was introduced. No tests were added because the change is CSS/layout-only and the existing component tests already cover reset behavior and URL preservation.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | Final post-documentation status showed `M STATE.md` and `M apps/web/src/components/admin-run-history.tsx` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web test -- --run` | pass | `Test Files 4 passed (4)`; `Tests 27 passed (27)`; duration `13.86s` |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `5.5s`; generated 8 routes including `/admin/runs` and local API proxy routes |
| `git diff --check` | pass | Exit 0; no whitespace errors; Git warned touched LF files will be replaced by CRLF when Git touches them |
| `git diff --stat` | pass | Final post-documentation stat showed 2 changed files: `STATE.md` and `apps/web/src/components/admin-run-history.tsx` |

### Manual browser verification

Local setup used documented local-only commands:

- `docker compose up -d postgres`: `Container salesops-postgres Running`
- `uv run alembic upgrade head`: PostgreSQL Alembic context initialized
- `uv run python -m backend.app.leads.demo_seed`: `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued`
- Temporary backend: `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8765 --log-level info`
- Temporary frontend: `pnpm --dir apps/web dev --hostname 127.0.0.1 --port 5499` with `BACKEND_API_BASE_URL` and `NEXT_PUBLIC_BACKEND_API_BASE_URL` pointed at `http://127.0.0.1:8765`

Browser tooling:

- Used the in-app Browser plugin with explicit viewport control.
- Captured desktop and mobile screenshots in the local temp directory.
- Reset the temporary browser viewport override after verification.

Results:

- `/admin/runs` loaded at desktop viewport `1366x768`; page title was `SalesOps Workflow Automation Hub`; seeded success, failed, queued, and retried rows rendered.
- The filter reset button now sits in a separate action row below the six filters; at desktop it is right-aligned below the row and the search input has more room.
- Desktop table stayed contained (`pageScrollWidth=1351`, `tableClientWidth=1182`, `tableScrollWidth=1182`) and all visible detail buttons remained aligned and clickable.
- Status filter `failed` updated the URL to `/admin/runs?status=failed`, showed only `run_demo_failed`, and enabled `Reset filters`.
- `Reset filters` returned the URL to `/admin/runs`, restored all four seeded rows, and returned to the disabled no-active-filter state.
- `View details` for `run_demo_failed` updated the URL to `/admin/runs?runId=run_demo_failed` and loaded the read-only detail panel with seeded failure data and suggested action.
- Opening `/admin/runs?status=success&runId=run_demo_failed` showed the selected-run-hidden notice, kept only the success row in the table, and kept the failed run detail loaded.
- Mobile viewport `390x844` rendered without body-level horizontal overflow (`pageScrollWidth=375`); table overflow stayed inside the table scroller (`tableClientWidth=310`, `tableScrollWidth=1075`).
- On mobile, the reset button is a single full-width action below the stacked filter fields and still clears filters correctly.
- Browser console error/warning count was `0`; no Next.js, hydration, or framework overlay text was detected.
- Frontend and backend logs showed local `GET` requests only for admin browser interactions: `/admin/runs`, `/api/leads/runs`, `/api/leads/runs/run_demo_failed`, `/leads/runs`, and `/leads/runs/run_demo_failed`.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service call was made.
- Temporary backend and frontend processes were stopped after verification; local PostgreSQL was left running.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Additional frontend tests | skipped | The change is layout-only; existing tests already cover reset behavior, URL state, filtering, detail loading, and read-only boundaries |
| Backend test/lint/typecheck suite | skipped | Backend code and behavior were intentionally untouched |
| Dependency install | skipped | Existing dependencies were present; no dependency change was needed or introduced |
| GitHub Actions / CI | skipped | Explicitly out of scope; no CI files were added or run |
| Real external API smoke | skipped | Explicitly forbidden; project remained local-only and mock-safe |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- Browser QA covered the in-app Chromium browser at desktop and mobile viewport sizes; other browsers were not manually checked.
- The local PostgreSQL container remains running for the user's environment; stop it manually only if desired.
- Extremely long real-world values still rely on the existing table truncation/title behavior rather than expanding table columns.

## Latest Update - 2026-06-04 Admin Run History Table Polish

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.tsx` | Replaced `break-all` table rendering for run IDs, lead IDs, emails, names, and domains with titled single-line truncation; added fixed table layout and tighter column sizing so detail buttons stay aligned and visible at the default desktop viewport |
| `apps/web/src/components/admin-run-history.test.tsx` | Added a focused long-value regression test that verifies full `title` text, truncation classes, monospace ID styling, and the existing detail button accessible label |
| `STATE.md` | Recorded this phase's changes, validation, manual browser verification, skipped checks, and remaining risks |

Public APIs, backend behavior, database schema, dependencies, GitHub Actions, commits, and pushes were not changed.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | Final post-documentation status showed `M STATE.md`, `M apps/web/src/components/admin-run-history.test.tsx`, and `M apps/web/src/components/admin-run-history.tsx` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web test -- --run` | pass | `Test Files 4 passed (4)`; `Tests 27 passed (27)`; duration `12.88s` |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `4.4s`; generated 8 routes including `/admin/runs` and local API proxy routes |
| `git diff --check` | pass | Exit 0; no whitespace errors; Git warned the three touched files use LF and will be replaced by CRLF when Git touches them |
| `git diff --stat` | pass | Final post-documentation stat showed 3 changed files: `STATE.md`, `apps/web/src/components/admin-run-history.test.tsx`, and `apps/web/src/components/admin-run-history.tsx` |

Focused preflight after the test addition also passed: `pnpm --dir apps/web test -- --run admin-run-history` returned `1 passed` file and `18 passed` tests.

### Manual browser verification

Local setup used documented local-only commands:

- `docker compose up -d postgres`: `Container salesops-postgres Running`
- `uv run alembic upgrade head`: PostgreSQL Alembic context initialized; already at head
- `uv run python -m backend.app.leads.demo_seed`: `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued`
- Temporary backend: `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8765`
- Temporary frontend: `pnpm --dir apps/web dev --hostname 127.0.0.1 --port 5499`

Browser tooling:

- Browser plugin was not available in this session.
- `pnpm --dir apps/web exec playwright --version` failed because `playwright` is not installed in the project.
- Used installed Chrome `148.0.7778.217` in headless mode through Chrome DevTools Protocol without adding dependencies.

Results:

- `/admin/runs` loaded at desktop `1366x768`; page title was `SalesOps Workflow Automation Hub`; seeded success, failed, queued, and retried rows rendered.
- Default desktop table used `table-fixed`; table scroller `clientWidth=1182`, `scrollWidth=1182`; detail buttons were aligned and visible in the default viewport.
- Run IDs, lead IDs, emails, and domains had `white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis`, and full `title` values; IDs used monospace font.
- Header order remained `Created|Run|Lead|Status|Source|Owner|Error type|Attempts|Latest attempt|Failure detail|Detail`.
- Status filter `failed` updated the URL to `/admin/runs?status=failed` and showed only the failed seeded run.
- `Reset filters` returned the URL to `/admin/runs` and restored all four seeded runs.
- `View details` for `run_demo_failed` updated the URL to `/admin/runs?runId=run_demo_failed` and loaded the read-only run detail with seeded failure data.
- Mobile `390x844` rendered the admin page, kept body horizontal overflow off (`pageScrollWidth=390`), and kept table overflow inside the table scroller (`tableClientWidth=324`, `tableScrollWidth=1075`).
- Browser console error/warning count was `0`; no hydration or framework overlay text was detected.
- Admin API browser requests were local `GET` calls only: `/api/leads/runs`, `/api/leads/runs/run_demo_failed`, `/api/leads/runs`; no non-GET admin proxy requests were observed.
- Temporary backend, frontend, and Chrome processes were stopped after verification; the existing PostgreSQL container was left running.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Playwright browser automation | skipped/fallback used | Browser plugin and project Playwright binary were unavailable; Chrome DevTools Protocol was used instead without adding dependencies |
| Dependency install | skipped | Existing dependencies were already present; no new dependency was needed or introduced |
| Backend test/lint/typecheck suite | skipped | This phase changed only frontend table presentation and a frontend component test; backend behavior was intentionally untouched |
| GitHub Actions / CI | skipped | Explicitly out of scope; no CI files were added or run |
| Real external API smoke | skipped | Explicitly forbidden; project remained local-only and mock-safe |
| Commit and push | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- Chrome DevTools verification covered Chrome headless at desktop and mobile viewport sizes; other browsers were not manually checked.
- Seeded demo values now render cleanly with truncation and titles, but extremely long real-world values would still depend on the same truncation/title behavior rather than expanding the table.

## 1. Current Objective

- Keep the `/admin/runs` table visually clean at the default desktop viewport.
- Prevent long run IDs, lead IDs, emails, and domains from creating awkward multi-line wrapping.
- Preserve responsive behavior for narrow/mobile widths through the existing table scroll container.
- Preserve filters, reset filters, detail buttons, read-only admin state, local proxy behavior, and backend behavior.
- Record validation and browser verification evidence for this polish phase.

## 2. What Was Inspected

- `STATE.md` was reviewed for stale or overstated readiness/audit wording.
- `package.json`, `apps/web/package.json`, `pyproject.toml`, and `compose.yml` were inspected to choose repo-supported validation commands.
- Backend configuration, DB dependency wiring, lead routes, deterministic seed script, and frontend proxy routes were inspected before smoke testing.
- The public admin frontend/proxy surface was checked for retry/edit/delete/resubmit/rerun mutation controls.
- Tracked files were scanned for token-shaped secrets, private-key patterns, live paid-service endpoints, network-call surfaces, and external-service wording.
- Local browser smoke covered `/`, `/admin/runs`, hydrated form controls, admin filters, seeded run detail, and console errors.

## 3. What Changed

| Path | Purpose |
|---|---|
| `STATE.md` | Corrected final release-gate evidence and removed overclaiming around forbidden-pattern scan output |

No README, CONTEXT, backend code, frontend behavior, UI design, API route, dependency, test, database schema, migration, generated file, GitHub Actions, real integration, secret, commit, or push changes were made.

Public APIs, interfaces, schemas, and types remain unchanged.

## 4. Automated Validation

| Gate | Command | Status | Exact result |
|---|---|---|---|
| Starting Git status | `git status --short` | pass | No output |
| Git whitespace check before update | `git diff --check` | pass | No output; exit 0 |
| Git diff names before update | `git diff --name-only` | pass | No output |
| Git diff stat before update | `git diff --stat` | pass | No output |
| Tool presence | `pnpm --version` | pass | `11.5.0` |
| Tool presence | `uv --version` | pass | `uv 0.11.16` |
| Frontend dependency presence | `Test-Path -LiteralPath .\apps\web\node_modules` | pass | `True` |
| Python venv presence | `Test-Path -LiteralPath .\.venv` | pass | `True` |
| Backend tests | `uv run pytest` | pass | `48 passed`, `1 warning`, duration `3.29s` |
| Backend lint | `uv run ruff check .` | pass | `All checks passed!` |
| Backend typecheck | `uv run mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| Frontend lint | `pnpm --dir apps/web lint` | pass | `$ eslint .` completed with exit 0 |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | `Test Files 4 passed (4)`; `Tests 26 passed (26)`; duration `15.14s` |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit` completed with exit 0 |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `3.3s`; generated 8 pages |
| Docker Compose status | `docker compose ps` | pass | `salesops-postgres` was already `Up` and `healthy` on port `5432` |
| Docker Compose config | `docker compose config` | pass | Compose config rendered successfully |
| Local PostgreSQL migration | `uv run alembic upgrade head` | pass | PostgreSQL migration context initialized; already at `head` |
| Deterministic demo seed | `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| GitHub Actions workflows | `Test-Path -LiteralPath .\.github\workflows` | pass | `False`; no workflow directory exists |
| Build-info tracking | `git ls-files -- apps/web/tsconfig.tsbuildinfo` | pass | No output; file is not tracked |

Validation notes:

- The Windows sandbox could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- `uv run pytest` used the available local Python runtime reported by pytest as Python `3.14.4`.
- The backend test warning was a dependency deprecation warning from FastAPI/Starlette testclient usage; it did not fail the gate.
- `apps/web/node_modules` and `.venv` already existed, so no dependency install command was needed.

## 5. Forbidden-Pattern And Local-Only Posture Checks

| Check | Command | Status | Result |
|---|---|---|---|
| Broad tracked token/private-key scan | `git grep -n -I -E 'sk-[A-Za-z0-9_-]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|gh[pousr]_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|ya29\.[0-9A-Za-z_-]+|SG\.[0-9A-Za-z_-]{20,}|supabase_service_role|service_role|-----BEGIN (RSA|OPENSSH|DSA|EC|PGP|PRIVATE) KEY-----' -- .` | limited/pass | The broad command self-matched its literal pattern text inside `STATE.md`; this was documentation self-reference, not a secret finding |
| Refined tracked token/private-key scan | Same token/private-key pattern with `:(exclude)STATE.md` | pass | No output; command exited 1 because there were no matches |
| Broad tracked live-endpoint scan | `git grep -n -I -E 'api\.hubapi\.com|hooks\.slack\.com|slack\.com/api|api\.openai\.com|api\.anthropic\.com|generativelanguage\.googleapis\.com|sheets\.googleapis\.com|supabase\.co/auth|supabase\.co/rest|service_role' -- .` | limited/pass | The broad command self-matched its literal pattern text inside `STATE.md`; this was documentation self-reference, not a live-endpoint finding |
| Refined tracked live-endpoint scan | Same live-endpoint pattern with `:(exclude)STATE.md` | pass | No output; command exited 1 because there were no matches |
| Network-call surface scan | `git grep -n -I -E 'fetch\(|axios|XMLHttpRequest|requests\.|httpx\.|aiohttp|urllib|Invoke-RestMethod|Invoke-WebRequest' -- backend apps tests README.md CONTEXT.md DESIGN.md EXEC_PLAN.md REQ.md RUNBOOK.md TDD.md STATE.md` | pass | Matches are local frontend/proxy `fetch` calls or documented local `127.0.0.1` smoke commands |
| Admin mutation-control scan | `git grep -n -I -E 'retry|edit|delete|resubmit|rerun|POST|PUT|PATCH|DELETE|worker|archive|send' -- apps/web/src/app/admin apps/web/src/components/admin-run-history.tsx apps/web/src/app/api/leads/runs` | pass | No output; command exited 1 because there were no matches |

No real HubSpot, Slack, Google Sheets, OpenAI, Anthropic, Gemini, paid API, production API, webhook, or external service call was made.

## 6. Local Smoke And Browser Verification

| Check | Command or action | Status | Result |
|---|---|---|---|
| Temporary backend server | `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8765` | pass | Local backend responded at `http://127.0.0.1:8765` |
| Backend health | `Invoke-RestMethod -Uri "http://127.0.0.1:8765/health" -Method Get` | pass | Returned `status=ok` and service name |
| Temporary frontend server | `pnpm --dir apps/web dev --hostname 127.0.0.1 --port 5499` with local backend env vars | pass | Local frontend responded at `http://127.0.0.1:5499` |
| Main app route | `Invoke-WebRequest -Uri "http://127.0.0.1:5499" -UseBasicParsing` | pass | HTTP 200; contained `Lead intake form` and `CSV import` |
| Admin route | `Invoke-WebRequest -Uri "http://127.0.0.1:5499/admin/runs" -UseBasicParsing` | pass | HTTP 200; contained `Admin run history` and `Read-only` |
| Run-history proxy | `Invoke-RestMethod -Uri "http://127.0.0.1:5499/api/leads/runs" -Method Get` | pass | Returned seeded local run data |
| Run-detail proxy | `Invoke-RestMethod -Uri "http://127.0.0.1:5499/api/leads/runs/run_demo_failed" -Method Get` | pass | Returned seeded failed-run detail with sanitized payload/audit data |
| Browser home page | In-app browser at `/` | pass | Page loaded; lead form, CSV import, and session dashboard rendered; console errors empty |
| Browser hydrated form interaction | Filled `Email *` and selected `Source *` | pass | Email value updated; source value became `csv_upload`; console errors empty |
| Browser admin page | In-app browser at `/admin/runs` | pass | Seeded success, failed, queued, and retried rows rendered; read-only badge visible; console errors empty |
| Browser admin filter | Selected `Status=failed` | pass | URL updated to `?status=failed`; failed row stayed visible; unrelated rows hid; console errors empty |
| Browser failed-run detail | Clicked `View details for run_demo_failed` | pass | URL updated with `runId=run_demo_failed`; failure message and suggested action displayed |
| Admin visible controls | Browser DOM inspection | pass | Actual buttons were `Reset filters` and `View details`; no public retry/edit/delete/resubmit/rerun controls |
| Temporary smoke cleanup | Process check for repo commands on ports `8765` and `5499` | pass | Temporary smoke backend/frontend processes were stopped |

Smoke notes:

- Local PostgreSQL was already running and healthy before this pass; it was not stopped.
- The deterministic seed script reinserted only the known synthetic demo run IDs.
- The browser screenshot showed the admin table wrapping long IDs/emails at the default viewport, but the layout remained usable and the read-only state was clear.

## 7. Skipped Or Limited Checks

| Check | Status | Written reason |
|---|---|---|
| Dependency install | skipped | `apps/web/node_modules` and `.venv` already existed; tool checks passed |
| GitHub Actions / CI validation | skipped | Local validation first; this task forbids GitHub Actions changes |
| Real HubSpot/Slack/Google Sheets/OpenAI/API smoke | skipped | Explicitly forbidden; project remains mock-first, local-only, and demo-safe |
| Paid API, production API, external CRM, webhook, or external service calls | skipped | Explicitly forbidden without user approval and not needed for this phase |
| Commit and push | skipped | Explicitly forbidden; Codex did not commit or push |

## 8. Known Risks And Non-Blocking Notes

- This update is documentation-only and should leave `STATE.md` as the only tracked diff.
- Ignored generated artifacts may continue to exist locally after `pnpm` test/build/dev commands, but tracked build-info was not present.
- Broad forbidden-pattern scans that include `STATE.md` can self-match the documented regex commands; refined scans excluding `STATE.md` are the cleaner release-gate signal.
- The admin run-history table long-value wrapping issue was resolved in the 2026-06-04 polish pass with titled single-line truncation and fixed column sizing.

## 9. Manual Verification Commands

```powershell
git status --short
git diff --check
git diff --name-only
git diff --stat
Test-Path -LiteralPath .\.github\workflows
git ls-files -- apps/web/tsconfig.tsbuildinfo
uv run pytest
uv run ruff check .
uv run mypy backend tests
pnpm --dir apps/web lint
pnpm --dir apps/web test -- --run
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
docker compose ps
docker compose config
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
```

Manual browser smoke:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8765
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8765"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8765"
pnpm --dir apps/web dev --hostname 127.0.0.1 --port 5499
```

Then open:

- `http://127.0.0.1:5499/`
- `http://127.0.0.1:5499/admin/runs`

## 10. Git Safety

- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No commits were created.
- No pushes were made.
- User manually commits and pushes after review.

## 11. Next Suggested Phase

After user review, manually commit the admin run-history table polish if the diff is acceptable.

## 12. Suggested Commit Message

```text
Polish admin run history table truncation
```
