# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-17 |
| Owner | User |
| Contributors | Codex |
| Repository path | repository root |
| Current branch | `main` |
| Current phase | Final portfolio publishing QA pass |
| Overall status | Portfolio-facing docs inspected; local-first, mock-only, synthetic-data boundaries confirmed; only `STATE.md` documentation changed |
| Quality gate status | Static docs/link/safety scans passed or produced expected boundary-only matches; backend/frontend runtime gates skipped with docs-only reason |
| Completion | Complete for final portfolio publishing QA pass, subject to user manual recording/posting review |
| Main blocker | None |

## Owner manual browser QA completed on 2026-06-17.

Verified:
- Home page loads.
- Admin runs page loads.
- Filters work.
- Selecting a run updates the detail panel.
- Backend docs load.
- Network requests are local-only.
- No real provider/send/reset/delete controls are visible.
- No paid API/provider behavior is triggered.

Result: manual browser QA passed.

## Latest Update - 2026-06-17 Final Portfolio Publishing QA Pass

Performed a final portfolio publishing QA pass for the SalesOps Workflow Automation Hub docs. The inspection stayed documentation-only and did not change product behavior, backend code, frontend code, package files, lockfiles, migrations, generated assets, `.env` files, GitHub Actions, deployment config, provider integrations, staged files, commits, or pushes.

### Phase summary

- Confirmed the portfolio-facing docs consistently present the project as a local-first portfolio demo using deterministic mock CRM/Slack/provider behavior and synthetic data.
- Confirmed the docs do not claim real client deployment, production readiness, paid API usage, live CRM/OAuth integration, GitHub Actions/CI deployment, real Slack delivery, or real customer-data processing.
- Found local absolute Windows path literals in historical `STATE.md` validation records and replaced them with neutral repo-root placeholders for publishing safety.
- Added this current state entry with files inspected, gates run, skipped gates, remaining manual checks, and final git status.

### Files inspected

- `README.md`
- `STATE.md`
- `RUNBOOK.md`
- `HANDOFF.md`
- `docs/PORTFOLIO_LISTING.md`
- `docs/CASE_STUDY.md`
- `docs/DEMO_SCRIPT.md`
- `docs/DEMO_ASSETS.md`
- `docs/FREELANCE_PLATFORM_SNIPPETS.md`
- `.env.example`

### Files changed

- `STATE.md`: updated current meta, recorded this final portfolio publishing QA pass, and redacted historical local absolute path literals to repo-root placeholders.

### Gates run

| Command | Result |
|---|---|
| `rg --files` | Pass; repository inventory returned expected backend, frontend, docs, lockfiles, screenshots, and config files |
| `rg --files -g AGENTS.md` | Pass; only top-level `AGENTS.md` found |
| `git status --branch --short` | Pass before edit; `## main...origin/main` with no working-tree entries |
| `git diff --check` | Pass before edit; no whitespace errors |
| `git diff --name-only` | Pass before edit; no output |
| `git ls-files --others --exclude-standard` | Pass before edit; no output |
| Required docs inspection | Pass; all requested portfolio-facing docs and `.env.example` were read |
| Forbidden-claim `Select-String` scan | Pass/expected matches; matches are mock-only boundaries, explicit exclusions, or future approval-gated guidance, not overclaims |
| Secret-like `Select-String` scan | Pass/expected matches; matches are docs safety wording, local demo `DATABASE_URL` references, and placeholder `.env.example` tokens, not real secrets |
| Absolute-path `Select-String` scan | Initially found historical `STATE.md` local absolute path literals; fixed in this entry by replacing them with repo-root placeholders, and final post-redaction scan returned no matches |
| README link check | Pass; README relative documentation and screenshot links resolve to existing repository paths |
| Final `git diff --check` | Pass; no whitespace errors; Git warned that `STATE.md` LF will be replaced by CRLF the next time Git touches it |
| Final `git diff --name-only` | Pass; only `STATE.md` |
| Final `git ls-files --others --exclude-standard` | Pass; no output |
| Final `git status --branch --short` | Pass; `## main...origin/main` and ` M STATE.md` |

### Skipped gates with reasons

| Gate | Status | Reason |
|---|---|---|
| Backend pytest/Ruff/mypy | Skipped | This pass changed documentation only and did not touch backend source, schemas, persistence, migrations, runtime config, dependencies, or lockfiles |
| Frontend lint/tests/typecheck/build | Skipped | This pass changed documentation only and did not touch frontend source, routes, UI behavior, package files, dependencies, or lockfiles |
| Docker/PostgreSQL/local server smoke | Skipped | No runtime, database, migration, seed, or product behavior changed |
| Manual browser QA by Codex | Skipped | This was a static publishing documentation QA pass; manual recording/browser checks remain documented in `RUNBOOK.md` and `docs/DEMO_SCRIPT.md` |
| Real provider/API checks | Skipped | Explicitly forbidden; the project remains local-first, mock-only, and synthetic-data based |
| GitHub Actions/CI/deployment checks beyond local absence/docs scan | Skipped | GitHub Actions, CI, deployment, hosted automation, staging, commits, and pushes are out of scope |

### Remaining manual checks

- Manually review the final portfolio listing, case study, freelance snippets, screenshots, and any planned public profile copy before posting.
- If recording or refreshing screenshots, follow `RUNBOOK.md` section `10.2` and `docs/DEMO_ASSETS.md`; show only local pages, synthetic data, and mock behavior.
- Before a manual commit, optionally rerun the full local quality gate from `README.md` if a fresh all-green runtime checkpoint is desired.

### Final git status

Final status after this docs-only state edit:

```text
## main...origin/main
 M STATE.md
```

### Suggested commit message

```text
Record final portfolio publishing QA pass
```

## Latest Update - 2026-06-17 Manual Browser Recording Rehearsal QA Reconciliation

Recorded the user's latest manual browser recording rehearsal QA result without changing product code. The user reported that manual browser QA was completed successfully and that everything works fine. Codex did not perform browser QA in this reconciliation pass; Codex only recorded the user-provided result.

This entry is documentation/state-only and distinguishes the current evidence categories:

- Codex static/test/build validation: command-based repository gates are separate from browser QA and are reported by Codex after the `STATE.md` reconciliation edit.
- Manual browser QA: passed per the user's explicit 2026-06-17 report. This is a user-performed manual browser result, not a Codex-performed browser result.
- Real provider/API checks: skipped intentionally because real HubSpot, Slack, Google Sheets, OpenAI, paid APIs, production APIs, webhooks, provider dashboards, and real credentials remain forbidden and outside the local mock-only portfolio boundary.
- CI/deployment checks: skipped intentionally because GitHub Actions, CI, staging, deployment, and production smoke validation remain out of scope for this phase; workflow absence is checked locally.

No backend behavior, frontend behavior, UI behavior, API contract, dependency, lockfile, migration, generated asset, GitHub Actions workflow, deployment config, real provider integration, secret, ignored `.env` contents, staged change, commit, push, reset, rebase, stash, or discard operation was changed or performed.

## Latest Update - 2026-06-17 Final Portfolio Recording Rehearsal QA

Performed a validation-first recording rehearsal QA pass without changing product code. `RUNBOOK.md` section `10.2 Final Local Portfolio Recording Checklist` and the latest active `STATE.md` checkpoint were reviewed. The runbook checklist is accurate for the current local reviewer route, uses synthetic/mock-safe data, and does not claim that Codex performed automated browser QA; it explicitly frames browser visual QA as a manual procedure. Historical `STATE.md` entries preserve prior smoke/manual/browser evidence and should not be read as claims that browser QA was rerun in this pass.

No backend behavior, frontend behavior, UI behavior, API contract, dependency, lockfile, migration, generated asset, GitHub Actions workflow, deployment config, real provider integration, secret, ignored `.env` contents, staged change, commit, or push was changed.

### Required validation results

| Gate | Command | Result |
|---|---|---|
| Repository root | `git rev-parse --show-toplevel` | Pass; resolved to repository root |
| Initial git status | `git status --short --branch` | Pass; `## main...origin/main` |
| Whitespace | `git diff --check` | Pass; no output |
| Backend dependency sync | `uv sync --frozen` | Pass; checked 42 packages |
| Backend tests, safe equivalent | `uv --project "<repository root>" run --no-python-downloads --python 3.12 --frozen pytest --rootdir "<repository root>" "<repository root>\tests"` from `apps/web` | Pass; 69 passed, 1 existing Starlette/FastAPI `TestClient` deprecation warning |
| Backend lint | `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; all checks passed |
| Backend format check | `uv run --no-python-downloads --python 3.12 --frozen ruff format --check .` | Pass; 32 files already formatted |
| Backend typecheck | `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | Pass; no issues found in 29 source files |
| Frontend dependency install | `pnpm install --frozen-lockfile` | Pass; all 2 workspace projects already up to date with pnpm 11.5.0 |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| Frontend tests | `pnpm --dir apps/web test -- --run` | Pass; 5 files passed, 56 tests passed |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled successfully and generated 8 routes |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Workflow directory | `Test-Path -LiteralPath ".github\workflows"` | Pass; `False` |
| Tracked env/workflow paths | `git ls-files -- .env .env.example .github .github\workflows` | Pass; only `.env.example` is tracked |

### Skipped or adjusted checks

| Check | Status | Reason |
|---|---|---|
| Exact root-level `uv run --no-python-downloads --python 3.12 --frozen pytest` | Adjusted | An ignored root `.env` exists, and `backend/app/config.py` declares `env_file=".env"`. Running app-importing pytest from the repository root would read that file. The safe equivalent above ran from `apps/web`, where `.env` is absent, while keeping the project root and test path explicit. |
| App startup and browser visual QA by Codex | Skipped | Not required to complete the requested static/local gate, and starting the app was only requested if needed for recording rehearsal. No browser QA was performed or claimed in this pass. Use `RUNBOOK.md` section `10.2` for the exact manual recording rehearsal steps. |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, provider dashboard, or external provider smoke | Skipped | Explicitly forbidden and outside the local mock-only portfolio boundary. |
| GitHub Actions / CI / deployment validation | Skipped | Explicitly out of scope; workflow absence was checked locally instead. |
| Commit, push, staging, reset, rebase, stash, branch operations, destructive cleanup | Skipped | Explicitly forbidden. Codex did not perform these actions. |
| Ignored `.env` read/print/edit/copy | Skipped | Explicitly forbidden. Only file presence was checked; contents were not read or printed. |

### Manual browser QA instructions

Use the runbook's pre-recording commands to start local PostgreSQL, apply migrations, seed synthetic data, run FastAPI on `127.0.0.1:8028`, and run Next.js on `127.0.0.1:3042` with `BACKEND_API_BASE_URL` and `NEXT_PUBLIC_BACKEND_API_BASE_URL` set to `http://127.0.0.1:8028`.

Then verify:

- `Invoke-RestMethod -Uri "http://127.0.0.1:8028/health" -Method Get -TimeoutSec 10` returns `status=ok`.
- `Invoke-RestMethod -Uri "http://127.0.0.1:8028/leads/runs" -Method Get -TimeoutSec 10` returns seeded synthetic runs.
- `http://127.0.0.1:3042/` renders the public lead form and CSV import without overlap.
- `http://127.0.0.1:3042/admin/runs` renders seeded run history.
- The CSV textarea and file-picker paths accept only synthetic CSV rows and show local session results.
- `View details` opens the same-page run detail panel, including `run_demo_failed`.
- Horizontal scroll/drag stays inside the admin table scroller, with the top rail and table body synchronized and no page-level horizontal overflow.
- The final reviewer/demo route list in `RUNBOOK.md` works locally, including `/`, `/admin/runs`, `/docs`, the documented filter URLs, filtered empty state, and selected-run-hidden detail URL.

### Suggested commit message

```text
Record final recording rehearsal QA
```

## Latest Update - 2026-06-16 Repository Release Finalization / Portfolio Handoff Review

Performed a validation-first final handoff review for `README.md`, `RUNBOOK.md`, `TDD.md`, and the active top entries in `STATE.md`. The working tree started clean with `git status --short` returning no output, and both required whitespace checks were clean before doc edits.

One active documentation drift was found and corrected: frontend test examples in `README.md`, `RUNBOOK.md`, and `TDD.md` used `pnpm --dir apps/web test`, while the repository command and current release gate require the explicit non-watch command `pnpm --dir apps/web test -- --run`.

Historical `STATE.md` entries still preserve older commands such as `mypy .` and old 3000/8000 smoke evidence. Those are historical validation records, not active reviewer instructions. The current reviewer path remains backend `127.0.0.1:8028`, frontend `127.0.0.1:3042`, `/`, `/admin/runs`, `/docs` frontend redirect to backend `/docs`, and backend `/openapi.json`.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Aligned local validation frontend test command with the current required gate |
| `RUNBOOK.md` | Aligned frontend command lists and full handoff validation command with the current required gate |
| `TDD.md` | Aligned current frontend test command and test matrix entries with the current required gate |
| `STATE.md` | Recorded this release finalization review, validation, skipped checks, risks, and next action |

No product code, backend behavior, frontend behavior, UI behavior, API contract, dependency, lockfile, migration, generated asset, GitHub Actions workflow, deployment config, real provider integration, secret, ignored `.env` file, staged change, commit, or push was changed.

### Documentation consistency and route review

| Check | Result |
|---|---|
| `README.md`, `RUNBOOK.md`, `TDD.md`, active `STATE.md` review | Pass after doc correction; active commands and reviewer flow now agree |
| Actual frontend scripts | Pass; `apps/web/package.json` exposes `lint`, `test`, `typecheck`, and `build`; root `frontend:test` already uses `pnpm --dir apps/web test -- --run` |
| Actual backend tooling | Pass; `pyproject.toml` scopes mypy to `backend` and `tests`; active docs use `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` |
| Actual frontend routes | Pass; source contains `/`, `/admin/runs`, `/docs`, and `/api/leads/...` route/proxy files |
| Actual backend routes | Pass; source exposes `/health`, `/leads/intake`, `/leads/runs`, selected run detail, failure detail, retry, `/docs`, and `/openapi.json` |
| Seeded demo filter examples | Pass; `backend/app/leads/demo_seed.py` supports documented `run_demo_success`, `run_demo_failed`, `run_demo_retried`, `run_demo_queued`, `csv_upload`, `atlas`, `adapter`, fixed `2026-06-01` dates, and derived owner `Maya Patel` for failed/queued rows |
| GitHub Actions / workflow files | Pass; `.github\workflows` does not exist and `git ls-files -- .github .github\workflows` returned no tracked workflow files |

### Search results

| Scan | Command | Result |
|---|---|---|
| Active stale command/port scan excluding historical `STATE.md` | `rg -n "localhost:3000|127\.0\.0\.1:3000|localhost:8000|127\.0\.0\.1:8000|mypy\s+\." README.md RUNBOOK.md TDD.md HANDOFF.md docs` | Pass/limited; only RUNBOOK source-code fallback defaults for `127.0.0.1:8000` remain |
| Active production/CI requirement scan | `rg -n -i "production-ready|production ready|deploy|deployment|staging|prod smoke|real provider smoke|GitHub Actions|\bCI\b" README.md RUNBOOK.md TDD.md HANDOFF.md docs` | Pass/limited; matches are explicit absence, out-of-scope, or do-not-claim guidance |
| Provider/API boundary scan | `rg -n -i "paid API|paid APIs|real provider|real providers|production API|production APIs|webhook|webhooks|real HubSpot|real Slack|real CRM|HubSpot|Slack|Google Sheets|OpenAI|provider dashboard|live provider|production credential" README.md RUNBOOK.md TDD.md STATE.md HANDOFF.md docs` | Pass/limited; matches are mock-only behavior, exclusions, or future approval-gated guidance |
| Active route scan | `rg -n "/admin/runs|/docs|/openapi\.json|/api/leads|/leads/(intake|runs)|127\.0\.0\.1:8028|127\.0\.0\.1:3042" README.md RUNBOOK.md TDD.md HANDOFF.md docs\DEMO_SCRIPT.md docs\DEMO_ASSETS.md docs\CASE_STUDY.md` | Pass; reviewer routes are supported local routes |
| Frontend test command verification | `rg -n "pnpm --dir apps/web test" README.md RUNBOOK.md TDD.md` | Pass; all active matches now include `-- --run` |

### Required validation results

| Gate | Command | Result |
|---|---|---|
| Initial Git status | `git status --short` | Pass; no output before edits |
| Initial whitespace | `git diff --check` | Pass; no output before edits |
| Initial staged whitespace | `git diff --cached --check` | Pass; no output before edits |
| Backend dependency sync | `uv sync --frozen` | Pass; checked 42 packages |
| Backend tests | `uv --project $repo run --no-python-downloads --python 3.12 --frozen pytest --rootdir $repo "$repo\tests"` from `logs/noenv` with explicit local/mock env | Pass; Python 3.12.10, 69 passed, 1 existing FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint | `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; all checks passed |
| Backend format check | `uv run --no-python-downloads --python 3.12 --frozen ruff format --check .` | Pass; 32 files already formatted |
| Backend typecheck | `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | Pass; no issues found in 29 source files |
| Frontend dependency install | `pnpm install --frozen-lockfile` | Pass; all 2 workspace projects already up to date with pnpm 11.5.0 |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| Frontend tests | `pnpm --dir apps/web test -- --run` | Pass; Vitest 3.2.4, 5 test files passed, 56 tests passed |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled successfully and generated 8 routes |

Validation setup note: `logs/noenv` was created or reused as an ignored working directory for app-importing pytest. No ignored `.env` contents were read, printed, copied, edited, or screenshotted.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Live browser visual QA by Codex | Skipped | This pass changed active validation docs only; full automated gate passed, and prior local HTTP/browser/manual QA remains recorded in the latest historical entries |
| Docker/PostgreSQL live smoke rerun | Skipped | Not required for the doc-only command correction; previous local Docker/PostgreSQL, route, docs redirect, and owner manual browser QA evidence remains the release signal |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, provider dashboard, or external provider smoke | Skipped | Explicitly forbidden and outside the local mock-only portfolio boundary |
| GitHub Actions / CI / deployment validation | Skipped | Explicitly out of scope; workflow absence was checked locally instead |
| Commit, push, staging, reset, rebase, stash, branch operations, destructive cleanup | Skipped | Explicitly forbidden. Codex did not perform these actions. |
| Ignored `.env` read/print/edit/copy | Skipped | Explicitly forbidden. Validation used tracked docs, source, and explicit local/mock environment variables only. |

### Remaining risks and manual recommendation

- Browser visual QA was not rerun in this pass because the only active correction was documentation command text. Use the documented local demo path for one final human visual review before recording or presentation if desired.
- Historical `STATE.md` entries intentionally preserve older commands and old local ports as evidence from earlier phases; use the meta block and newest entries as current truth.
- Git may continue to report LF-to-CRLF working-copy warnings for edited Markdown on Windows; `git diff --check` is the release signal for whitespace errors.

Manual reviewer path remains:

```powershell
docker compose up -d postgres
uv run --no-python-downloads --python 3.12 --frozen alembic upgrade head
uv run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_reset --apply
uv run --no-python-downloads --python 3.12 --frozen uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

In a second PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Open `http://127.0.0.1:3042/`, `http://127.0.0.1:3042/admin/runs`, and `http://127.0.0.1:3042/docs`; use synthetic data only and confirm requests stay local.

### Confirmation

- Product code was untouched.
- Active docs are internally consistent after the doc-only correction.
- Reviewer/demo instructions use supported local routes and local mock flows.
- No instruction requires GitHub Actions, paid APIs, production APIs, webhooks, or real providers.
- Repository is ready for final portfolio presentation, subject to optional final human visual review.

### Suggested commit message

```text
Finalize portfolio handoff validation docs
```

## Latest Update - 2026-06-16 Final Release Evidence Record

Recorded final portfolio release audit evidence without changing product code. `README.md`, `RUNBOOK.md`, `TDD.md`, and the latest `STATE.md` entries were reviewed. No stale active README/RUNBOOK/TDD instruction requiring a docs correction was found before this entry: active docs use `mypy backend tests`, the documented reviewer path uses backend `127.0.0.1:8028` and frontend `127.0.0.1:3042`, GitHub Actions/CI remain absent or explicitly out of scope, and real providers/paid APIs remain excluded.

This entry intentionally separates earlier smoke/browser evidence from the current validation rerun:

- Automated backend checks passed in the previous final readiness gate: pytest, Ruff check, Ruff format check, and mypy were green.
- Automated frontend checks passed in the previous final readiness gate: lint, Vitest, typecheck, and Next build were green.
- Docker/PostgreSQL smoke passed in the previous final readiness gate: Compose started local PostgreSQL, Alembic reached head, and deterministic demo reset seeded the four synthetic demo runs.
- Backend/frontend HTTP smoke passed in the previous final readiness gate: local backend and frontend routes, run-history proxy, run-detail proxy, docs redirect, backend docs, and `/openapi.json` were verified on local-only ports.
- Browser automation was skipped in the previous final readiness gate because the Browser plugin control tool was unavailable and Playwright was not installed as a project executable; no browser automation dependency was installed.
- User manual browser QA passed after the final audit: home page rendered correctly, CSV import shell rendered correctly, admin runs page rendered correctly, filters worked, `run_demo_failed` detail opened correctly, `/docs` redirected to backend docs correctly, `/openapi.json` worked, no real provider/paid API/reset/edit/delete/destructive controls were visible, and all requests stayed local.
- The previous audit observed one transient first dynamic run-detail proxy `500`; the same run-detail request passed immediately on retry.
- Docker PostgreSQL may still be running after the smoke path and should be stopped manually with `docker compose stop postgres` if it is not needed.

### Files changed

| Path | Purpose |
|---|---|
| `STATE.md` | Added this final release evidence record and current validation results |

No product code, backend behavior, frontend behavior, API contract, dependency, lockfile, migration, generated artifact, GitHub Actions workflow, deployment config, real provider integration, secret, local `.env` file, staged change, commit, or push was changed.

### Current validation gate

| Gate | Command | Result |
|---|---|---|
| Whitespace | `git diff --check` | Pass; exit 0 with Git LF-to-CRLF working-copy warning for `STATE.md` |
| Staged whitespace | `git diff --cached --check` | Pass; no output |
| Backend dependency sync | `uv sync --frozen` | Pass; checked 42 packages |
| Backend tests | `uv --project "$repo" run --no-python-downloads --python 3.12 --frozen pytest --rootdir "$repo" "$repo\tests"` from `logs/noenv` with explicit mock/local env | Pass; Python 3.12.10, 69 passed, 1 existing FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint | `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; all checks passed |
| Backend format check | `uv run --no-python-downloads --python 3.12 --frozen ruff format --check .` | Pass; 32 files already formatted |
| Backend typecheck | `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | Pass; no issues found in 29 source files |
| Frontend dependency install | `pnpm install --frozen-lockfile` | Pass; all 2 workspace projects already up to date with pnpm 11.5.0 |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| Frontend tests | `pnpm --dir apps/web test` | Pass; Vitest 3.2.4, 5 test files passed, 56 tests passed |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled successfully and generated 8 routes |

Validation setup note: the first `New-Item -ItemType Directory -Force -LiteralPath "logs\noenv"` attempt failed because this PowerShell surface did not accept `-LiteralPath` for that parameter set. The retry with `New-Item -ItemType Directory -Force -Path "logs\noenv"` passed. No `.env` file was read, printed, copied, or edited.

### Documentation and forbidden-pattern scan status

| Scan | Command | Result |
|---|---|---|
| Active stale mypy target | `rg -n "mypy\s+\." README.md RUNBOOK.md TDD.md` | Pass; no matches, exit 1 |
| GitHub Actions / CI requirement wording | `rg -n -i "GitHub Actions|\bCI\b" README.md RUNBOOK.md TDD.md` | Pass/limited; matches are absence, out-of-scope, or "not default until explicitly requested" wording, not active CI requirements |
| Paid API / real-provider assumptions | `rg -n -i "paid API|paid APIs|real provider|real providers|real HubSpot|real Slack|real CRM|production API|webhook|provider dashboard|HubSpot|Slack|Google Sheets|OpenAI" README.md RUNBOOK.md TDD.md` | Pass/limited; matches are mock-only behavior, exclusions, or manual "do not show/call" guidance, not real-provider requirements |
| Active local ports | `rg -n "localhost:3000|127\.0\.0\.1:3000|localhost:8000|127\.0\.0\.1:8000|127\.0\.0\.1:8028|127\.0\.0\.1:3042" README.md RUNBOOK.md TDD.md` | Pass/limited; reviewer/demo path uses backend `8028` and frontend `3042`; `8000` and `3000` appear only as source-code fallback/default-port caveats |
| Destructive admin controls | `rg -n -i -g "!*.test.ts" -g "!*.test.tsx" "\b(edit|delete|archive|send|PUT|PATCH|DELETE|demo reset|reset run|provider action|destructive)\b" apps/web/src/app/admin apps/web/src/components/admin-run-history.tsx apps/web/src/app/api/leads/runs` | Pass; no matches, exit 1 |
| `.env` read/print/edit/copy docs | `rg -n -i "(Copy-Item|Get-Content|Select-String|Set-Content|Add-Content).*\.env|\.env.*(Copy-Item|Get-Content|Select-String|Set-Content|Add-Content|read|print|edit|copy)" README.md RUNBOOK.md TDD.md` | Limited; README/RUNBOOK contain human setup helpers that copy `.env.example` to ignored `.env` and one RUNBOOK local verification command that selects `DATABASE_URL` without printing it. Codex did not execute them. |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Browser automation by Codex | Skipped | Browser plugin control tool was unavailable in the previous audit and Playwright was not installed; installing browser automation dependencies is explicitly out of scope. |
| Real provider, paid API, production API, webhook, or provider dashboard smoke | Skipped | Explicitly forbidden; the project remains local-first and mock-only. |
| GitHub Actions / CI / deployment validation | Skipped | Explicitly out of scope; no workflow files are required or added. |
| Commit, push, staging, reset, rebase, stash, branch operations, destructive cleanup | Skipped | Explicitly forbidden. Codex did not perform these actions. |
| Ignored local `.env` read/print/edit/copy | Skipped | Explicitly forbidden for this phase; validation uses `.env.example` and explicit local/mock environment values where needed. |

### Remaining manual checks

- Stop Docker PostgreSQL manually with `docker compose stop postgres` if it is still running and not needed.
- For a final visual check, use the documented local-only backend/frontend commands, then verify `/`, `/admin/runs`, filters, `run_demo_failed` detail, `/docs`, and `/openapi.json` with synthetic data only.

### Suggested commit message

```text
Record final release evidence
```

## Latest Update - 2026-06-16 Final Portfolio Handoff Readiness Polish

Reviewed the current reviewer-facing docs and made the smallest correction needed for command consistency: `README.md`, `RUNBOOK.md`, and `TDD.md` now document the backend typecheck as `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests`, matching the project command list and the gate actually run.

No application behavior, UI behavior, backend API behavior, persistence logic, seed data, tests, dependency manifests, lockfiles, migrations, screenshots, GitHub Actions, deployment config, provider integration, secret, or ignored `.env` file was changed. The before/after is documentation-only:

- Before: reviewer validation examples used `mypy .` in some docs.
- After: reviewer validation examples use the explicit backend target `mypy backend tests`.

Manual browser QA was already completed by the project owner before this phase. Codex did not run browser automation in this pass; local HTTP smoke covered the documented backend/frontend routes and proxies.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Aligned local validation typecheck command with the project command |
| `RUNBOOK.md` | Aligned backend command lists and portfolio handoff validation typecheck command |
| `TDD.md` | Aligned current reviewer handoff validation and backend command examples |
| `STATE.md` | Recorded this readiness polish, exact validation results, smoke evidence, skipped checks, caveats, manual steps, and suggested commit message |

Pre-existing repository state note: `git status --short --branch` showed `M  STATE.md` staged before this pass edited `STATE.md`; the staged change recorded owner-completed manual browser QA. Codex did not stage, unstage, commit, reset, stash, rebase, or push.

### Documentation inspection

| Command | Result |
|---|---|
| `Get-Content -Path .\STATE.md -Tail 260` | Pass after approved escalation; showed the latest local smoke/browser-QA context |
| `rg --files` | Pass; confirmed repository files and no nested `AGENTS.md` was needed beyond the top-level instructions already supplied |
| `Get-Content -Path .\README.md -Raw` | Pass; reviewer path remains local-first, mock-only, and PowerShell-based |
| `Get-Content -Path .\RUNBOOK.md -Raw` | Pass; local setup, smoke, manual QA, and recording path reviewed |
| `Get-Content -Path .\docs\DEMO_SCRIPT.md -Raw` | Pass; concise reviewer path reviewed |
| `Get-Content -Path .\HANDOFF.md -Raw` | Pass; handoff and future provider boundary reviewed |
| `Get-Content -Path .\docs\DEMO_ASSETS.md -Raw` | Pass; capture checklist reviewed |
| `Get-Content -Path .\docs\CASE_STUDY.md -Raw` | Pass; portfolio wording reviewed |
| `Get-Content -Path .\package.json -Raw` | Pass; frontend workspace scripts checked |
| `Get-Content -Path .\apps\web\package.json -Raw` | Pass; frontend lint/test/typecheck/build scripts checked |
| `Get-Content -Path .\pyproject.toml -Raw` | Pass; backend Python/tooling configuration checked |
| `Get-Content -Path .\compose.yml -Raw` | Pass; local PostgreSQL service checked |
| `Get-Content -Path .\apps\web\src\app\docs\route.ts -Raw` | Pass; `/docs` redirect source checked |
| `rg -n -i "production-ready|production ready|production service|deployed|deployment|github actions|\bci\b|live provider|real hubspot|real slack|api\.hubapi|hooks\.slack|api\.openai|paid api|webhook" README.md RUNBOOK.md HANDOFF.md docs\DEMO_SCRIPT.md docs\DEMO_ASSETS.md docs\CASE_STUDY.md CONTEXT.md DESIGN.md REQ.md TDD.md .env.example` | Pass; findings are out-of-scope caveats or placeholder-only local docs, not implemented production/CI/provider claims |
| `rg -n -i "todo|fixme|tbd|placeholder|lorem|staging|prod smoke|provider dashboard|external provider|real provider|mock-only|local-only" README.md RUNBOOK.md HANDOFF.md docs\DEMO_SCRIPT.md docs\DEMO_ASSETS.md docs\CASE_STUDY.md CONTEXT.md DESIGN.md REQ.md TDD.md .env.example` | Pass; findings are legitimate placeholder-only or local/mock safety wording |
| `rg -n "mypy \.|mypy backend tests" README.md RUNBOOK.md TDD.md HANDOFF.md docs\DEMO_SCRIPT.md docs\DEMO_ASSETS.md CONTEXT.md DESIGN.md REQ.md` | Pass after docs edit; only `mypy backend tests` remains in active docs |
| `git diff -- README.md RUNBOOK.md TDD.md` | Pass; diff limited to replacing `mypy .` with `mypy backend tests` |

### Required gate results

| Gate | Command | Result |
|---|---|---|
| Whitespace | `git diff --check` | Pass; exit 0 with Git LF-to-CRLF working-copy warnings for `README.md`, `RUNBOOK.md`, and `TDD.md` |
| Backend dependency sync | `uv sync --frozen` | Pass; checked 42 packages |
| Backend tests | `uv --project "<repository root>" run --no-python-downloads --python 3.12 --frozen pytest --rootdir "<repository root>" "<repository root>\tests"` from `logs/noenv` | Pass; Python 3.12.10, 69 passed, 1 existing FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint | `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; all checks passed |
| Backend format check | `uv run --no-python-downloads --python 3.12 --frozen ruff format --check .` | Pass; 32 files already formatted |
| Backend typecheck | `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | Pass; no issues found in 29 source files |
| Frontend dependency install | `pnpm install --frozen-lockfile` | Pass; all 2 workspace projects already up to date with pnpm 11.5.0 |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| Frontend tests | `pnpm --dir apps/web test` | Pass; Vitest 3.2.4, 5 test files passed, 56 tests passed |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled successfully and generated 8 routes |

The pytest command used the noenv equivalent instead of running from the repository root because a local ignored `.env` exists and `SettingsConfigDict(env_file=".env")` reads `.env` from the current working directory. No ignored `.env` contents were read, printed, edited, or screenshotted.

### Local smoke results

Smoke commands used `logs/noenv` plus explicit local/mock environment values where app imports were involved. PostgreSQL was started through `compose.yml` with `.env.example` only.

| Check | Command or URL | Result |
|---|---|---|
| Port precheck | `Get-NetTCPConnection -LocalPort 8028,3042 -ErrorAction SilentlyContinue \| Select-Object LocalAddress,LocalPort,State,OwningProcess` | Pass; no listeners before smoke start |
| PostgreSQL start | `docker compose --env-file "<repository root>\.env.example" -f "<repository root>\compose.yml" up -d postgres` | Pass; `salesops-postgres` running |
| Alembic noenv first attempt | `uv --project $repo run --no-python-downloads --python 3.12 --frozen python -c "... command.upgrade(config, 'head')"` without `PYTHONPATH` | Expected local-command failure; `ModuleNotFoundError: No module named 'backend'` |
| Alembic noenv corrected | Same command with `$env:PYTHONPATH = $repo` and explicit `APP_ENV`, `MOCK_MODE`, `CRM_PROVIDER`, `SLACK_PROVIDER`, `GOOGLE_SHEETS_PROVIDER`, and local `DATABASE_URL` | Pass; PostgreSQL migration context initialized and was at head |
| Demo reset | `uv --project $repo run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_reset --apply` with explicit local/mock env | Pass; deleted 4 runs, 4 leads, 8 attempts, and 18 audit records; seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Backend first background start | `Start-Process -FilePath "uv" -ArgumentList @("--project", $repo, ...)` | Expected Windows quoting failure for path with spaces; corrected below |
| Backend corrected background start | `Start-Process -FilePath "uv" -ArgumentList "--project `"$repo`" run --no-python-downloads --python 3.12 --frozen uvicorn backend.app.main:app --host 127.0.0.1 --port 8028 --log-level info" -WindowStyle Hidden` | Pass; Uvicorn listened on `127.0.0.1:8028` with smoke PID `8036` |
| Backend health | `Invoke-RestMethod -Uri "http://127.0.0.1:8028/health" -Method Get -TimeoutSec 10` | Pass; returned `status=ok` and service name |
| Backend run history | `Invoke-RestMethod -Uri "http://127.0.0.1:8028/leads/runs" -Method Get -TimeoutSec 10` | Pass; returned seeded `run_demo_queued`, `run_demo_retried`, `run_demo_failed`, and `run_demo_success` |
| Backend docs | `Invoke-WebRequest -Uri "http://127.0.0.1:8028/docs" -UseBasicParsing -TimeoutSec 10` | Pass; HTTP 200, local docs title present, `/openapi.json` link present |
| Backend OpenAPI | `Invoke-RestMethod -Uri "http://127.0.0.1:8028/openapi.json" -Method Get -TimeoutSec 10` | Pass; title `SalesOps Workflow Automation Hub API`, 6 paths |
| Frontend background start | `Start-Process -FilePath "$env:APPDATA\npm\pnpm.cmd" -ArgumentList "--dir `"$repo\apps\web`" exec next dev --hostname 127.0.0.1 --port 3042" -WindowStyle Hidden` with backend-base env vars set to `http://127.0.0.1:8028` | Pass; Next.js listened on `127.0.0.1:3042` with smoke PID `20984` |
| Frontend home | `Invoke-WebRequest -Uri "http://127.0.0.1:3042/" -UseBasicParsing -TimeoutSec 20` | Pass; HTTP 200 and page shell contained `Lead intake form` and `CSV import` |
| Frontend admin | `Invoke-WebRequest -Uri "http://127.0.0.1:3042/admin/runs" -UseBasicParsing -TimeoutSec 20` | Pass; HTTP 200 and page shell contained `Admin run history` |
| Frontend run-history proxy | `Invoke-RestMethod -Uri "http://127.0.0.1:3042/api/leads/runs" -Method Get -TimeoutSec 20` | Pass; returned the four canonical seeded run IDs |
| Frontend run-detail proxy | `Invoke-RestMethod -Uri "http://127.0.0.1:3042/api/leads/runs/run_demo_failed" -Method Get -TimeoutSec 20` | Pass; returned `run_demo_failed` with `run_status=failed` |
| Frontend docs redirect | `HttpClient` no-redirect `GET http://127.0.0.1:3042/docs` | Pass; HTTP 307 to `http://127.0.0.1:8028/docs` |
| Smoke cleanup | `Stop-Process -Id 8036,20984 -ErrorAction SilentlyContinue` | Pass; no listeners remained on `8028` or `3042` afterward |

No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, external provider, production credential, deployment, GitHub Actions workflow, commit, push, staging, reset, rebase, stash, or ignored `.env` content was used.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Browser automation / visual QA by Codex | Skipped | The project owner manually completed browser QA before this phase. This pass changed docs only and local HTTP smoke passed. |
| Real provider, paid API, production API, webhook, or provider dashboard smoke | Skipped | Explicitly forbidden and outside the local portfolio demo boundary. |
| GitHub Actions / CI / deployment validation | Skipped | No workflow or deployment config is part of the project; CI remains out of scope unless explicitly requested later. |
| Commit, push, staging, reset, rebase, stash, branch operations, destructive cleanup | Skipped | Explicitly forbidden. Codex did not perform these actions. |
| Ignored `.env` read/print/edit | Skipped | Explicitly forbidden. Validation used tracked `.env.example`, `logs/noenv`, and explicit local/mock environment values instead. |

### Caveats

- Sandboxed PowerShell failed with `CreateProcessAsUserW failed: 5`, so commands were run through approved escalated PowerShell.
- Git reports LF-to-CRLF working-copy warnings for touched Markdown files, but `git diff --check` exits 0.
- The first noenv Alembic attempt and first background backend start exposed local command-construction issues only; corrected commands passed and app behavior was not changed.
- Smoke wrote temporary stdout/stderr files under ignored `logs/` paths.
- Docker PostgreSQL was left running, matching the local demo dependency behavior from the previous phase.

### Manual verification steps

The owner already completed browser QA before this phase. For a final manual reviewer check, use:

```powershell
docker compose up -d postgres
uv run --no-python-downloads --python 3.12 --frozen alembic upgrade head
uv run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_reset --apply
uv run --no-python-downloads --python 3.12 --frozen uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

In a second PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then verify:

- `http://127.0.0.1:3042/` renders the public lead form and CSV import without overlap; use synthetic data only.
- `http://127.0.0.1:3042/admin/runs` shows `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Status/source/search/date/owner/error-type filters work and update the URL.
- `run_demo_failed` detail shows sanitized payload, attempts, failure context, and suggested action.
- `http://127.0.0.1:3042/admin/runs?status=success&runId=run_demo_failed` keeps selected detail visible while showing the selected-run-hidden notice.
- `http://127.0.0.1:3042/docs` redirects to `http://127.0.0.1:8028/docs` and links to `http://127.0.0.1:8028/openapi.json`.
- Browser requests stay local; no `.env`, provider dashboard, real customer data, real provider call, paid API, webhook, reset/edit/delete/send/archive/provider action, `PUT`, `PATCH`, or `DELETE` control is visible or triggered.

### Remaining risks

- Browser visual QA was not automated by Codex in this pass; owner-completed browser QA is the visual signal.
- Existing staged `STATE.md` content predates this pass and was preserved.
- Local demo smoke verifies route/proxy behavior over HTTP, not pixel-level layout.

### Suggested commit message

```text
Polish portfolio handoff validation docs
```

## Latest Update - 2026-06-16 Final Local Demo Smoke

Ran the final local demo smoke path against Docker PostgreSQL, Alembic migrations, deterministic demo reset data, a local FastAPI backend on `127.0.0.1:8028`, and a local Next.js frontend on `127.0.0.1:3042`.

Manual browser QA completed by project owner after Codex run:
- Home page, lead form, CSV import shell, admin runs table, filters, detail panel, selected-run-hidden notice, horizontal drag/scroll, docs redirect, layout, and absence of reset/edit/delete/provider actions were checked manually.
- Result: passed.

No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, external provider, secret, GitHub Actions workflow, deployment, commit, push, staging, reset, rebase, stash, or `.env` content was used. A local ignored `.env` file exists, so app-importing commands were run from an ignored `logs/noenv` working directory with explicit local/mock environment variables and `uv --project` to avoid reading `.env`.

### Files changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded final local demo smoke commands, results, skipped browser reason, warnings, manual notes, and changed-file summary |

No application code, tests, dependency manifests, lockfiles, migrations, screenshots, GitHub Actions, deployment config, or provider integrations were changed.

### Local demo smoke results

| Check | Command or action | Result |
|---|---|---|
| Initial git status | `git status --short --branch` | Pass; `## main...origin/main` with no working-tree changes |
| Initial diff stat | `git diff --stat` | Pass; no output |
| Initial diff | `git diff --` | Pass; no output |
| Required docs read | `Get-Content` for `STATE.md`, `README.md`, `RUNBOOK.md`, `HANDOFF.md`, `docs/DEMO_SCRIPT.md`, `CONTEXT.md`, `DESIGN.md`, and `TDD.md` | Pass; latest `STATE.md` entry showed Docker/PostgreSQL and browser validation were the prior skipped gap |
| Startup command inspection | `Get-Content` for `package.json`, `apps/web/package.json`, `pyproject.toml`, `compose.yml`, `alembic.ini`, `backend/app/main.py`, `backend/app/config.py`, and `apps/web/src/app/docs/route.ts` | Pass; documented reviewer commands match current repo scripts, ports, Compose service, app import path, and `/docs` redirect design |
| Nested agent override check | `rg --files -g AGENTS.md` | Pass; only top-level `AGENTS.md` found |
| `.env` existence-only check | `Test-Path -LiteralPath ".env"` | Pass with constraint; returned `True`, so `.env` contents were not read and app-importing smoke commands used noenv equivalents |
| PostgreSQL start | `docker compose --env-file "$repo\.env.example" -f "$repo\compose.yml" up -d postgres` | Pass; `salesops-postgres` was already running |
| Alembic direct noenv attempt | `uv --project $repo run --no-python-downloads --python 3.12 --frozen alembic -c "$repo\alembic.ini" upgrade head` from `logs/noenv` | Expected limitation; failed before migration because `script_location = alembic` is relative to the working directory |
| Alembic upgrade equivalent | `uv --project $repo run --no-python-downloads --python 3.12 --frozen python -c "... Config(...); config.set_main_option('script_location', repo + '\\alembic'); command.upgrade(config, 'head')"` | Pass; PostgreSQL migration context initialized and was at head |
| Demo reset | `uv --project $repo run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_reset --apply` with explicit local/mock env vars | Pass; deleted 4 runs, 4 leads, 9 attempts, and 19 audit records; seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Backend first launch | `Start-Process uv ... --project $repo ... uvicorn ... --port 8028` | Expected quoting issue; initial launch failed before app startup because the repo path contains spaces |
| Backend corrected launch | `Start-Process uv ... --project "$repo" ... uvicorn backend.app.main:app --host 127.0.0.1 --port 8028 --log-level info` | Pass; Uvicorn listened on `127.0.0.1:8028` |
| Frontend first launch | `Start-Process pnpm ... next dev --hostname 127.0.0.1 --port 3042` | Expected shim issue; direct `pnpm` shim was not a Win32 executable for `Start-Process` |
| Frontend corrected launch | `Start-Process pnpm.cmd ... next dev --hostname 127.0.0.1 --port 3042` | Pass; Next.js 15.5.18 was ready on `127.0.0.1:3042` |
| Backend health | `Invoke-RestMethod -Uri "http://127.0.0.1:8028/health"` | Pass; returned `{"status":"ok","service":"salesops-workflow-automation-hub"}` |
| Backend run history | `Invoke-RestMethod -Uri "http://127.0.0.1:8028/leads/runs"` | Pass; returned 4 seeded runs: `run_demo_queued`, `run_demo_retried`, `run_demo_failed`, `run_demo_success` |
| Frontend home | `Invoke-WebRequest -Uri "http://127.0.0.1:3042/"` | Pass; HTTP 200 and raw page content included `Lead intake form` and `CSV import` |
| Frontend admin | `Invoke-WebRequest -Uri "http://127.0.0.1:3042/admin/runs"` | Pass; HTTP 200 and raw page shell included `Admin run history` |
| Frontend docs redirect | `Invoke-WebRequest -Uri "http://127.0.0.1:3042/docs" -MaximumRedirection 0` | Pass; HTTP 307 to `http://127.0.0.1:8028/docs` |
| Backend docs and OpenAPI | `Invoke-WebRequest -Uri "http://127.0.0.1:8028/docs"` and `Invoke-WebRequest -Uri "http://127.0.0.1:8028/openapi.json"` | Pass; docs page and OpenAPI JSON returned HTTP 200 |
| Smoke cleanup | `Stop-Process` for port-owning smoke PIDs on `8028` and `3042` | Pass; both ports were no longer listening afterward |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Browser visual QA | Skipped | The Browser plugin was present, but its required `node_repl js` control tool was not exposed after the required discovery attempts. `pnpm --dir apps/web exec playwright --version` also failed because Playwright is not installed as an executable in the project. No dependency was installed. |
| Direct repo-root app-importing smoke commands | Limited | A local ignored `.env` exists and the app settings automatically read `.env` from the current working directory. To honor the no-`.env` rule, app-importing smoke commands used `logs/noenv`, explicit local/mock environment variables, and `uv --project $repo`. |
| Real provider or paid API smoke | Skipped | Explicitly forbidden; project remained local-only and mock-only. |
| GitHub Actions, deployment, hosted CI, commit, push, staging, reset, rebase, stash | Skipped | Explicitly forbidden; Codex did not run these actions. |

### Known warnings

- Sandboxed PowerShell failed with `CreateProcessAsUserW failed: 5`; requested commands were run through approved escalated PowerShell.
- `git diff --check` exited 0 with a Git LF-to-CRLF working-copy warning for `STATE.md`.
- PostgreSQL was already running before this smoke pass and was left running.
- The raw HTTP response for `/admin/runs` verifies the server-rendered page shell. Client-rendered row/filter/detail visual behavior still needs manual browser verification because browser control was unavailable in this session.

### Required quality gate results

| Gate | Command | Result |
|---|---|---|
| Whitespace | `git diff --check` | Pass; exit 0 with Git LF-to-CRLF working-copy warning for `STATE.md` |
| Backend dependency sync | `uv sync --frozen` | Pass; checked 42 packages |
| Backend tests | `uv --project $repo run --no-python-downloads --python 3.12 --frozen pytest --rootdir $repo "$repo\tests"` from `logs/noenv` | Pass; 69 passed, 1 existing FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint | `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; all checks passed |
| Backend format check | `uv run --no-python-downloads --python 3.12 --frozen ruff format --check .` | Pass; 32 files already formatted |
| Backend typecheck | `uv run --no-python-downloads --python 3.12 --frozen mypy .` | Pass; no issues found in 32 source files |
| Frontend dependency install | `pnpm install --frozen-lockfile` | Pass; all 2 workspace projects already up to date with pnpm 11.5.0 |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; ESLint exited 0 |
| Frontend tests | `pnpm --dir apps/web test` | Pass; Vitest 3.2.4, 5 test files passed, 56 tests passed |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled successfully and generated 8 routes |

The backend pytest command was run through the noenv equivalent above instead of directly from the repository root because a local ignored `.env` exists and the app settings automatically read `.env` from the current working directory. This preserved the required test coverage while honoring the no-`.env` rule.

### Manual verification notes

For final visual QA, run the documented backend/frontend commands in separate PowerShell windows with local/mock environment values, then open:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:3042/admin/runs?status=failed`
- `http://127.0.0.1:3042/admin/runs?source=csv_upload`
- `http://127.0.0.1:3042/admin/runs?q=atlas`
- `http://127.0.0.1:3042/admin/runs?owner=Maya%20Patel`
- `http://127.0.0.1:3042/admin/runs?errorType=adapter`
- `http://127.0.0.1:3042/admin/runs?from=2026-06-01&to=2026-06-01`
- `http://127.0.0.1:3042/admin/runs?q=no-such-run`
- `http://127.0.0.1:3042/admin/runs?status=success&runId=run_demo_failed`
- `http://127.0.0.1:3042/docs`

Confirm seeded rows, filters, detail panel, selected-run-hidden notice, local-only docs redirect, no layout overlap, no runtime overlay, and no visible reset/edit/delete/send/archive/provider actions. Do not show `.env`, provider dashboards, real customer data, or unrelated local files.

### Remaining risks

- Browser visual QA remains unverified in this session because the supported browser-control tool was unavailable.
- Direct repo-root app-importing smoke commands were intentionally not used while an ignored local `.env` exists; no `.env` contents were read, printed, or modified.
- Manual visual confirmation is still recommended before recording or portfolio handoff.

### Suggested commit message

```text
Record final local demo smoke
```

## Latest Update - 2026-06-16 Reviewer Handoff Documentation Polish

Polished reviewer-facing documentation for the existing local demo without changing application behavior. The pass started as documentation-only, but the required `ruff format --check .` gate failed on four existing Python files. I ran the repository formatter on only those files and reran the backend gate successfully.

No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, provider dashboard, production credential, deployment, GitHub Actions workflow, commit, push, staging, reset, rebase, stash, or secret exposure was used.

PowerShell sandbox note: sandboxed PowerShell failed with `CreateProcessAsUserW failed: 5`, so local commands were run through approved escalated PowerShell.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Reviewer setup now uses frozen installs, Python 3.12 frozen `uv` commands, exact required gate list, and a non-stale `STATE.md` validation pointer |
| `RUNBOOK.md` | Corrected stale project metadata, clarified source fallback ports versus reviewer ports, aligned backend/frontend/manual validation commands, and removed stale path wording |
| `HANDOFF.md` | Aligned local run sequence with frozen installs and frontend `/docs` redirect check |
| `docs/DEMO_SCRIPT.md` | Aligned shortest reviewer setup path with frozen installs and Python 3.12 frozen `uv` commands |
| `CONTEXT.md` | Corrected repository name, current phase/status, and existing-project wording |
| `DESIGN.md` | Corrected current phase/status and removed greenfield wording from current scope |
| `TDD.md` | Replaced stale validation counts with the current required gate and aligned test matrix commands |
| `backend/app/leads/demo_reset.py` | Formatter-only cleanup from `ruff format`; no behavior change intended |
| `backend/app/leads/persistence.py` | Formatter-only cleanup from `ruff format`; no behavior change intended |
| `backend/app/leads/retry.py` | Formatter-only cleanup from `ruff format`; no behavior change intended |
| `tests/test_demo_reset.py` | Formatter-only cleanup from `ruff format`; no behavior change intended |
| `STATE.md` | Recorded this pass, required validation results, skipped checks, manual browser steps, and caveats |

### Required gate results

| Gate | Command | Result |
|---|---|---|
| Initial status | `git status --short --branch` | Pass; `## main...origin/main` with intended docs changes before this `STATE.md` entry |
| Initial whitespace | `git diff --check` | Pass; exit 0 with Git LF-to-CRLF working-copy warnings for touched Markdown files |
| Backend dependency sync | `uv sync --frozen` | Pass; checked 42 packages |
| Frontend dependency install | `pnpm install --frozen-lockfile` | Pass; all 2 workspace projects already up to date with pnpm 11.5.0 |
| Backend tests, first run | `uv run --no-python-downloads --python 3.12 --frozen pytest` | Pass; 69 passed, 1 existing FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint, first run | `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; all checks passed |
| Backend format, first run | `uv run --no-python-downloads --python 3.12 --frozen ruff format --check .` | Fail; reported 4 files would be reformatted |
| Backend formatter | `uv run --no-python-downloads --python 3.12 --frozen ruff format backend\app\leads\demo_reset.py backend\app\leads\persistence.py backend\app\leads\retry.py tests\test_demo_reset.py` | Pass; 4 files reformatted |
| Backend tests, final run | `uv run --no-python-downloads --python 3.12 --frozen pytest` | Pass; 69 passed, 1 existing FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint, final run | `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; all checks passed |
| Backend format, final run | `uv run --no-python-downloads --python 3.12 --frozen ruff format --check .` | Pass; 32 files already formatted |
| Backend typecheck, final run | `uv run --no-python-downloads --python 3.12 --frozen mypy .` | Pass; no issues found in 32 source files |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Frontend tests | `pnpm --dir apps/web test` | Pass; Vitest 3.2.4, 5 test files passed, 56 tests passed |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled successfully and generated 8 routes |
| Final status | `git status --short --branch` | Pass; `## main...origin/main` with modified docs plus formatter-only Python/test files and no staged changes |
| Final whitespace | `git diff --check` | Pass; exit 0 with Git LF-to-CRLF working-copy warnings for touched Markdown files |
| Final docs-aware backend tests | `uv run --no-python-downloads --python 3.12 --frozen pytest` | Pass; 69 passed, 1 existing FastAPI/Starlette `TestClient` deprecation warning |

### Documentation consistency checks

| Check | Result |
|---|---|
| Command drift scan | Pass; active docs no longer contain stale `mypy backend tests`, `test -- --run`, `uv run pytest`, `localhost:3000`, `port 8000`, `salesops-workflow-automation-hub-fresh`, `greenfield`, or old path wording in current reviewer instructions |
| Reviewer URL consistency | Pass; reviewer path uses backend `127.0.0.1:8028`, frontend `127.0.0.1:3042`, and `/docs` frontend redirect to backend docs |
| Source fallback URL caveat | Pass; `RUNBOOK.md` explicitly documents that source-code fallback values still use backend port `8000` when no backend-base environment variable is set |
| Placeholder/filler scan | Pass; no TODO/FIXME/TBD/lorem/placeholder-filler findings in active docs |
| Local-demo caveat scan | Pass; real provider, paid API, production, GitHub Actions, CI, and deployment mentions remain out-of-scope caveats rather than claims of implemented live behavior |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Browser or visual QA | Skipped | This pass changed documentation plus formatter-only Python layout, with no frontend UI behavior or styling changes. Manual browser verification steps are listed below. |
| Docker/PostgreSQL/Alembic/demo reset smoke | Skipped | Not part of the user's required command list for this pass. The documented commands were reviewed and updated for reviewer consistency. |
| Real provider or paid API smoke | Skipped | Explicitly forbidden; project remained local-only and mock-only. |
| GitHub Actions, deployment, hosted CI, commit, push, staging, reset, rebase, stash | Skipped | Explicitly forbidden; Codex did not run these actions. |
| `.env` read or print | Skipped | `.env.example` was inspected; local `.env` contents were not read, printed, edited, or screenshotted. |

### Manual browser verification steps

Use these exact steps for final visual/browser verification:

```powershell
docker compose up -d postgres
uv run --no-python-downloads --python 3.12 --frozen alembic upgrade head
uv run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_reset --apply
uv run --no-python-downloads --python 3.12 --frozen uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

In a second PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then open and verify:

- `http://127.0.0.1:3042/`: public lead form and CSV import render without overlap; submit only synthetic data and confirm validation, dedupe, mock CRM, and mock Slack outcomes.
- `http://127.0.0.1:3042/admin/runs`: seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` render.
- `http://127.0.0.1:3042/admin/runs?status=failed`: only `run_demo_failed` remains visible.
- `http://127.0.0.1:3042/admin/runs?source=csv_upload`: CSV-sourced seeded runs remain visible.
- `http://127.0.0.1:3042/admin/runs?q=atlas`: `run_demo_retried` remains visible.
- `http://127.0.0.1:3042/admin/runs?owner=Maya%20Patel`: Maya Patel rows remain visible.
- `http://127.0.0.1:3042/admin/runs?errorType=adapter`: adapter-error rows remain visible.
- `http://127.0.0.1:3042/admin/runs?from=2026-06-01&to=2026-06-01`: all four canonical seeded runs remain visible.
- `http://127.0.0.1:3042/admin/runs?q=no-such-run`: filtered empty state is clear and reset is available.
- `http://127.0.0.1:3042/admin/runs?status=success&runId=run_demo_failed`: the selected-run-hidden notice appears while `run_demo_failed` detail remains inspectable.
- `http://127.0.0.1:3042/docs`: redirects to `http://127.0.0.1:8028/docs`, shows the local-only API docs page, and links to `http://127.0.0.1:8028/openapi.json`.

During browser verification, confirm requests stay on `127.0.0.1` or local Next.js static assets, no provider dashboard or `.env` content is visible, no real CRM/Slack/Google Sheets/OpenAI/paid API/webhook request occurs, and the admin UI exposes no demo reset, edit, delete, send, archive, provider-action, `PUT`, `PATCH`, or `DELETE` controls. If `Retry run` is clicked for a failed or queued selected run, rerun the guarded demo reset afterward to restore canonical screenshot state.

### Remaining risks and caveats

- Ruff formatter touched four Python files outside the docs set because the required format gate was failing before this pass. The diff is formatter-only and backend tests/lint/typecheck passed afterward.
- Visual browser QA was not run in this pass because there were no frontend behavior or style changes.
- Docker/PostgreSQL local smoke was not rerun in this pass; use the manual browser verification steps above for a full local demo check.
- Git emits LF-to-CRLF working-copy warnings for touched Markdown files during diff/status checks, but `git diff --check` exits 0.

### Confirmation

Codex did not stage, commit, push, create a branch, reset, rebase, stash, discard changes, deploy, add CI, add GitHub Actions, call paid APIs, call real HubSpot/Slack/Google Sheets/OpenAI, print `.env`, print secrets, edit `.env`, or call real external providers.

### Suggested commit message

```text
Polish reviewer handoff documentation
```

## Latest Update - 2026-06-16 Strict Local Demo Verification

Ran a strict local demo verification and reviewer-readiness pass from the repository root on Windows PowerShell. Commands stayed local to the repository, Docker/PostgreSQL, FastAPI/Next.js localhost services, and synthetic demo data. No real HubSpot, Slack, Google Sheets, OpenAI, CRM, webhook, paid API, production service, or secret was used.

PowerShell sandbox note: sandboxed PowerShell failed with `CreateProcessAsUserW failed: 5`, matching prior local notes, so the requested local commands were run through approved escalated PowerShell.

### Required gate results

| Gate | Command | Result |
|---|---|---|
| Initial status | `git status --short --branch` | Pass; `## main...origin/main` and no working-tree changes |
| Initial whitespace | `git diff --check` | Pass; no output |
| Python launcher check | `py -3.12 --version` | Fail/environment caveat; `py` is not on PATH |
| uv Python check | `uv run --no-python-downloads --python 3.12 --frozen python --version` | Pass; Python 3.12.10 |
| Backend dependency sync | `uv sync --frozen` | Pass; checked 42 packages |
| Backend tests | `uv run --no-python-downloads --python 3.12 --frozen pytest` | Pass; 69 passed, 1 existing FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint | `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; all checks passed |
| Backend typecheck | `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | Pass; no issues in 29 source files |
| Frontend dependency install | `pnpm install --frozen-lockfile` | Pass; already up to date with pnpm 11.5.0 |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; ESLint exited 0 |
| Frontend tests | `pnpm --dir apps/web test -- --run` | Pass; 5 test files and 56 tests passed |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled successfully and generated 8 routes |
| Docker Compose config | `docker compose config` | Pass; rendered local PostgreSQL service only |
| Local PostgreSQL start | `docker compose up -d postgres` | Pass; `salesops-postgres` was running |
| Local PostgreSQL status | `docker compose ps` | Pass; container was healthy on port 5432 |
| Alembic | `uv run --no-python-downloads --python 3.12 --frozen alembic upgrade head` | Pass; PostgreSQL migration context initialized, no pending migration output |
| Demo reset | `uv run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_reset --apply` | Pass; seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |

### Local API and route smoke

Temporary local services used documented ports `127.0.0.1:8028` for FastAPI and `127.0.0.1:3042` for Next.js. Both ports were free before startup. Backend and frontend smoke processes started for this pass were stopped afterward; Docker PostgreSQL was left running.

| Check | Command or URL | Result |
|---|---|---|
| Backend health | `GET http://127.0.0.1:8028/health` | Pass; `status=ok` |
| Backend OpenAPI | `GET http://127.0.0.1:8028/openapi.json` | Pass; title `SalesOps Workflow Automation Hub API` |
| Backend docs page | `GET http://127.0.0.1:8028/docs` | Pass; HTTP 200, local docs title present, `/openapi.json` link present, no `cdn`, `jsdelivr`, `unpkg`, or FastAPI remote asset marker |
| Backend run history | `GET http://127.0.0.1:8028/leads/runs` | Pass; 4 canonical seeded runs after final reset |
| Backend run detail | `GET http://127.0.0.1:8028/leads/runs/run_demo_failed` | Pass; selected run detail returned |
| Backend failure detail | `GET http://127.0.0.1:8028/leads/runs/run_demo_failed/failure` | Pass; adapter error type and suggested action returned |
| Backend intake | `POST http://127.0.0.1:8028/leads/intake` with synthetic `example.test` lead | Pass; local success response with mock CRM result and run id |
| Frontend home route | `GET http://127.0.0.1:3042/` | Pass; HTTP 200 with `Lead intake form` and `CSV import` |
| Frontend admin route | `GET http://127.0.0.1:3042/admin/runs` | Pass; HTTP 200 with `Admin run history` |
| Frontend run-history proxy | `GET http://127.0.0.1:3042/api/leads/runs` | Pass; canonical 4 seeded runs after final reset and `run_demo_failed` present |
| Frontend run-detail proxy | `GET http://127.0.0.1:3042/api/leads/runs/run_demo_failed` | Pass; `run_demo_failed` returned with `run_status=failed` |
| Frontend intake proxy | `POST http://127.0.0.1:3042/api/leads/intake` with synthetic `example.test` lead | Pass; local success response through the proxy with mock CRM result |
| Frontend docs redirect | `GET http://127.0.0.1:3042/docs` with redirects disabled | Pass; HTTP 307 to `http://127.0.0.1:8028/docs` |
| Canonical seed restore | `uv run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_reset --apply` | Pass; removed smoke rows and restored exactly 4 canonical seeded runs |

The first frontend `/docs` redirect probe used `Invoke-WebRequest -MaximumRedirection 0`, which emitted a non-terminating redirection warning while still reporting HTTP 307. A clean `HttpClient` no-redirect check was run afterward and confirmed HTTP 307 to `http://127.0.0.1:8028/docs`.

### Documentation accuracy check

Reviewed `README.md`, `RUNBOOK.md`, `docs/DEMO_SCRIPT.md`, `docs/DEMO_ASSETS.md`, `TDD.md`, and `.env.example` for the requested reviewer-readiness topics:

- Python 3.12 requirement is documented in `README.md`, and current backend validation commands use `uv run --no-python-downloads --python 3.12 --frozen ...`.
- Local setup uses `uv`, `pnpm`, Docker PostgreSQL, Alembic, and the guarded demo reset.
- Backend and frontend validation commands are documented.
- Docker/PostgreSQL demo setup and local route smoke are documented.
- Mock/no-paid-API mode, placeholder-only `.env.example`, and real-provider prohibitions are documented.

No README, RUNBOOK, DEMO_SCRIPT, DEMO_ASSETS, TDD, `.env.example`, source-code, dependency, lockfile, migration, GitHub Actions, deployment, auth, or provider-integration correction was needed. This `STATE.md` entry is the only documentation update for the pass.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Direct in-app visual browser smoke | Skipped | Browser skill instructions were loaded, but `tool_search` for `node_repl js` returned no callable browser-control tool in this session. HTTP route/proxy smoke passed; manual browser steps are listed below. |
| Real provider or paid API smoke | Skipped | Explicitly forbidden; project remained local-only and mock-only. |
| GitHub Actions, deployment, hosted CI, commit, push, staging, reset, rebase, stash | Skipped | Explicitly forbidden; Codex did not run these actions. |
| `.env` read or print | Skipped | `.env.example` was inspected; local `.env` values were not read or printed. |

### Manual browser verification steps

Use these exact steps for final visual/browser verification:

```powershell
docker compose up -d postgres
uv run --no-python-downloads --python 3.12 --frozen alembic upgrade head
uv run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_reset --apply
uv run --no-python-downloads --python 3.12 --frozen uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

In a second PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then open and verify:

- `http://127.0.0.1:3042/`: public lead form and CSV import render without overlap; submit only synthetic data and confirm validation, dedupe, mock CRM, and mock Slack outcomes.
- `http://127.0.0.1:3042/admin/runs`: seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` render.
- `http://127.0.0.1:3042/admin/runs?status=failed`: only `run_demo_failed` remains visible.
- `http://127.0.0.1:3042/admin/runs?source=csv_upload`: CSV-sourced seeded runs remain visible.
- `http://127.0.0.1:3042/admin/runs?q=atlas`: `run_demo_retried` remains visible.
- `http://127.0.0.1:3042/admin/runs?owner=Maya%20Patel`: Maya Patel rows remain visible.
- `http://127.0.0.1:3042/admin/runs?errorType=adapter`: adapter-error rows remain visible.
- `http://127.0.0.1:3042/admin/runs?from=2026-06-01&to=2026-06-01`: all four canonical seeded runs remain visible.
- `http://127.0.0.1:3042/admin/runs?q=no-such-run`: filtered empty state is clear and reset is available.
- `http://127.0.0.1:3042/admin/runs?status=success&runId=run_demo_failed`: the selected-run-hidden notice appears while `run_demo_failed` detail remains inspectable.
- `http://127.0.0.1:3042/docs`: redirects to `http://127.0.0.1:8028/docs`, shows the local-only API docs page, and links to `http://127.0.0.1:8028/openapi.json`.

During browser verification, confirm requests stay on `127.0.0.1` or local Next.js static assets, no provider dashboard or `.env` content is visible, no real CRM/Slack/Google Sheets/OpenAI/paid API/webhook request occurs, and the admin UI exposes no demo reset, edit, delete, send, archive, provider-action, `PUT`, `PATCH`, or `DELETE` controls. If `Retry run` is clicked for a failed or queued selected run, rerun the guarded demo reset afterward to restore canonical screenshot state.

### Remaining risks

- The Windows `py` launcher is not available on PATH, so `py -3.12 --version` fails even though `uv` can run Python 3.12.10 and all Python 3.12 gates passed.
- Visual browser QA was not directly automated in this session because the Browser control tool was not exposed.
- Docker PostgreSQL remains running after this pass as the requested local dependency.

### Confirmation

Codex did not stage, commit, push, create a branch, reset, rebase, stash, discard changes, deploy, add CI, add GitHub Actions, call paid APIs, call real HubSpot/Slack/Google Sheets/OpenAI, print `.env`, print secrets, edit `.env`, or call real external providers.

### Suggested commit message

```text
Record strict local demo verification
```

## Local validation repair - Python 3.12

- Installed Python 3.12 manually and made it discoverable to `uv`.
- Confirmed backend validation now runs with:
  - `uv run --no-python-downloads --python 3.12 --frozen pytest`
  - `uv run --no-python-downloads --python 3.12 --frozen ruff check .`
  - `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests`
- Frontend validation passed:
  - `pnpm --dir apps/web lint`
  - `pnpm --dir apps/web test -- --run`
  - `pnpm --dir apps/web typecheck`
  - `pnpm --dir apps/web build`
- Local Docker/PostgreSQL smoke passed:
  - `docker compose config`
  - `docker compose ps`
  - `uv run --no-python-downloads --python 3.12 --frozen alembic upgrade head`
  - `uv run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_reset --apply`
- Remaining blocker: none.

## Latest Update - 2026-06-11 Final Demo Docs Consistency Pass

Audited `README.md`, `RUNBOOK.md`, `STATE.md`, `docs/DEMO_ASSETS.md`, `docs/DEMO_SCRIPT.md`, and `docs/assets/README.md` for the current local-only API docs evidence. The current docs evidence is `docs/assets/screenshots/salesops-local-api-docs.png`, and the backend `/docs` page is a local-only HTML page that links to `/openapi.json`.

No new screenshot was created. The existing screenshot inventory under `docs/assets/screenshots/` contains exactly the nine documented files, including `salesops-local-api-docs.png`, and does not contain `salesops-docs-swagger.png`.

PowerShell sandbox note: sandboxed PowerShell still failed with `CreateProcessAsUserW failed: 5`, so requested local commands were run through approved escalated PowerShell. Commands stayed local to the repository, local Docker/PostgreSQL, local FastAPI/Next.js services, and localhost HTTP checks.

### What changed

| Path | Purpose |
|---|---|
| `README.md` | Clarified that the current `/docs` evidence is the local-only API docs page with its `/openapi.json` link |
| `docs/DEMO_SCRIPT.md` | Updated the reviewer path to use the frontend `/docs` redirect and verify `/openapi.json` |
| `docs/assets/README.md` | Clarified that `salesops-local-api-docs.png` includes the `/openapi.json` link |
| `STATE.md` | Recorded this audit, validation, manual QA, skipped checks, and remaining risks |

`RUNBOOK.md` and `docs/DEMO_ASSETS.md` were audited and already described the current local-only `/docs` page and `/openapi.json` correctly, so they were left unchanged.

### Required gate results

| Gate | Command | Result |
|---|---|---|
| Repo status | `git status --short` | Pass; final output was `M README.md`, `M STATE.md`, `M docs/DEMO_SCRIPT.md`, and `M docs/assets/README.md` |
| Focused docs tests | `uv run pytest tests\test_docs.py` | Pass; 2 passed, 1 known FastAPI/Starlette `TestClient` deprecation warning |
| Backend tests | `uv run pytest` | Pass; 69 passed, 1 known FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint | `uv run ruff check .` | Pass; all checks passed |
| Backend typecheck | `uv run mypy .` | Pass; no issues found in 32 source files |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| Frontend tests | `pnpm --dir apps/web test` | Pass; 5 test files passed, 56 tests passed |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled successfully and generated 8 routes including `/docs` |
| Whitespace check | `git diff --check` | Pass; exit 0 with Git LF-to-CRLF working-copy warnings for touched Markdown only |

### Manual QA results

| Check | Command or URL | Result |
|---|---|---|
| Port precheck | `Get-NetTCPConnection` for `8028` and `3042` | Pass; both ports were free before QA |
| PostgreSQL | `docker compose up -d postgres` | Pass; `salesops-postgres` was running |
| Alembic | `uv run alembic upgrade head` | Pass; PostgreSQL migration context initialized and no pending migration output |
| Demo reset | `uv run python -m backend.app.leads.demo_reset --apply` | Pass; deleted 4 runs, 4 leads, 8 attempts, and 18 audit records, then seeded 4 demo runs |
| Backend docs | `http://127.0.0.1:8028/docs` | Pass; HTTP 200, local docs title present, `/openapi.json` link present, no requested remote-runtime markers |
| OpenAPI JSON | `http://127.0.0.1:8028/openapi.json` | Pass; title `SalesOps Workflow Automation Hub API` |
| Frontend home | `http://127.0.0.1:3042/` | Pass; HTTP 200, `Lead intake form` and `CSV import` present |
| Frontend admin | `http://127.0.0.1:3042/admin/runs` and `/api/leads/runs` | Pass; HTTP 200, admin heading present, seeded `run_demo_failed` available through the local proxy |
| Frontend docs redirect | `http://127.0.0.1:3042/docs` | Pass; HTTP 307 to `http://127.0.0.1:8028/docs` |
| Port cleanup | `Stop-Process` for the backend/frontend process IDs started by Codex | Pass; ports `8028` and `3042` were clear afterward |

The first local HTTP QA script failed before frontend checks because `$home` conflicts with PowerShell's read-only `$HOME` variable. The corrected script reran successfully; this was a script variable-name issue, not an application failure.

### Documentation and pattern checks

| Check | Result |
|---|---|
| Active screenshot inventory | Pass; actual files under `docs/assets/screenshots/` match the documented current set |
| Old asset file on disk | Pass; `salesops-docs-swagger.png` is absent from `docs/assets/screenshots/` |
| Old asset references in active docs | Pass/limited; active docs mention `salesops-docs-swagger.png` only as removed legacy history |
| Swagger wording in active docs | Pass/limited; active docs mention Swagger only to say the current docs page is not Swagger UI and the former asset was removed |
| Remote runtime markers in active docs | Pass; no `cdn`, `unpkg`, or `jsdelivr` matches in active docs outside historical `STATE.md` |
| Accidental secret markers in active docs | Pass; no matches for the requested key-name/token markers outside historical `STATE.md` |
| `STATE.md` historical audit | Pass/limited; older sections preserve prior Swagger-era evidence and search-command text, but this latest entry and the meta table are the current source of truth |

### Skipped checks

| Check | Status | Reason |
|---|---|---|
| New screenshot capture | Skipped | Not necessary; `salesops-local-api-docs.png` already exists and the inventory matches disk |
| Fallback frontend port | Skipped | Canonical `127.0.0.1:3042` was free and passed QA |
| Browser screenshot/video capture | Skipped | Not necessary for this docs consistency pass; localhost HTTP QA verified the required routes and redirect |
| Real provider or paid API smoke | Skipped | Explicitly forbidden; CRM, Slack, Google Sheets, OpenAI, paid APIs, production APIs, and webhooks remain absent/mock-only |
| Commit, push, staging, branch, deploy, CI | Skipped | Explicitly forbidden; no GitHub Actions, deployment config, commit, push, or staging action was performed |
| `.env` read/edit | Skipped | `.env` existence was checked only; contents were not read, printed, edited, or screenshotted |

### Remaining risks

- Manual QA used PowerShell localhost HTTP checks rather than a new visual browser screenshot; no layout or pixel review was needed for this docs-only wording pass.
- Historical `STATE.md` entries still contain old Swagger-era evidence by design; the current meta table and latest update supersede them.
- `docker compose up -d postgres` found PostgreSQL already running and it was left running. Backend and frontend QA processes started by Codex were stopped.
- Ignored generated artifacts from frontend test/build and ignored QA logs may exist locally, but tracked source changes remained documentation-only.

### Confirmation

Codex did not stage, commit, push, create a branch, reset, rebase, stash, deploy, add CI, call paid APIs, call real HubSpot/Slack/Google Sheets/OpenAI, print `.env`, print secrets, edit `.env`, or call real external providers.

### Suggested commit message

```text
Clarify local docs demo evidence
```

## Latest Update - 2026-06-11 RC Demo Asset Cleanup

Refreshed the demo asset inventory after the old Swagger UI screenshot was manually removed. The current `/docs` page is a local-only backend HTML page, not Swagger UI, so the docs now use the truthful screenshot filename `salesops-local-api-docs.png` and explicitly mark the old `salesops-docs-swagger.png` capture as removed legacy history.

Captured `docs/assets/screenshots/salesops-local-api-docs.png` from `http://127.0.0.1:8028/docs` with local Chrome headless at `1440x1100`. Visual inspection confirmed it shows `SalesOps Workflow Automation Hub API Docs`, the `/openapi.json` link, and no Swagger UI or remote provider page.

PowerShell sandbox note: sandboxed PowerShell still failed with `CreateProcessAsUserW failed: 5`, so local commands were run through approved escalated PowerShell. Commands stayed local to the repository, local Docker/PostgreSQL, local FastAPI/Next.js services, and local Chrome screenshot/QA tooling.

### Files changed

| Path | Purpose |
|---|---|
| `docs/assets/screenshots/salesops-local-api-docs.png` | Added current local-only API docs screenshot |
| `docs/DEMO_ASSETS.md` | Replaced stale Swagger-named screenshot guidance with the new local API docs screenshot and refresh note |
| `docs/assets/README.md` | Updated current screenshot inventory and marked the old Swagger screenshot as removed legacy history |
| `docs/DEMO_SCRIPT.md` | Expanded the existing asset list to include empty-filter, docs, and mobile screenshots |
| `RUNBOOK.md` | Updated phase metadata and recommended final docs screenshot filename |
| `STATE.md` | Recorded this cleanup, validation, manual QA, blocker, and remaining risk |

### Required gate results

| Gate | Command | Result |
|---|---|---|
| Repo status | `git status --short` | Pass; `M RUNBOOK.md`, `M docs/DEMO_ASSETS.md`, `M docs/DEMO_SCRIPT.md`, `M docs/assets/README.md`, `?? docs/assets/screenshots/salesops-local-api-docs.png` |
| Focused docs tests | `uv run pytest tests/test_docs.py` | Pass; 2 passed, 1 known FastAPI/Starlette `TestClient` deprecation warning |
| Backend tests | `uv run pytest` | Pass; 69 passed, 1 known FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint | `uv run ruff check .` | Pass; all checks passed |
| Backend typecheck | `uv run mypy .` | Pass; no issues found in 32 source files |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| Frontend tests | `pnpm --dir apps/web test` | Pass; Vitest 5 files passed, 56 tests passed |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled successfully and generated 8 routes including `/docs` |
| Whitespace check | `git diff --check` | Pass with Git line-ending warnings only for touched Markdown files; exit code 0 |

### Runtime and manual QA

| Check | Command or URL | Result |
|---|---|---|
| PostgreSQL | `docker compose up -d postgres` | Pass; `salesops-postgres` was already running |
| Alembic | `uv run alembic upgrade head` | Pass; PostgreSQL migration context initialized and no pending migration output |
| Demo reset | `uv run python -m backend.app.leads.demo_reset --apply` | Pass; deleted 4 runs, 4 leads, 8 attempts, and 18 audit records, then seeded 4 demo runs |
| Backend server command | `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028` | Not rerun; port `8028` was already occupied by Python process `5724` serving the expected local backend |
| Frontend server command | `pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042` | Not rerun; port `3042` was already occupied by Node process `8120` |
| Backend docs | `http://127.0.0.1:8028/docs` | Pass; HTTP 200, local docs title present, `/openapi.json` link present, 0 forbidden remote docs markers |
| OpenAPI JSON | `http://127.0.0.1:8028/openapi.json` | Pass; title `SalesOps Workflow Automation Hub API` |
| Frontend exact-port home | `http://127.0.0.1:3042/` | Blocked; existing Next dev server returned HTTP 500 after the required build rewrote `.next` |
| Frontend exact-port admin | `http://127.0.0.1:3042/admin/runs` | Blocked; existing Next dev server returned HTTP 500 with stale `.next` module errors |
| Frontend exact-port docs | `http://127.0.0.1:3042/docs` | Blocked; existing Next dev server returned HTTP 500 instead of redirecting |
| Process-safety approval | `Stop-Process -Id 8120` | Rejected by approval reviewer because the user has not explicitly approved stopping the pre-existing process |
| Fallback frontend server | `pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3043` | Pass; started on free port `3043` with backend base URL set to `http://127.0.0.1:8028`, then stopped after QA |
| Fallback home QA | `http://127.0.0.1:3043/` | Pass; HTTP 200, `Lead intake form` and `CSV import` present; temporary screenshot visually confirmed |
| Fallback admin QA | `http://127.0.0.1:3043/admin/runs` and `/api/leads/runs` | Pass; page HTTP 200 with admin heading; API HTTP 200 included `run_demo_failed`; temporary screenshot visually confirmed seeded run rows |
| Fallback docs redirect | `http://127.0.0.1:3043/docs` | Pass; HTTP 307 to `http://127.0.0.1:8028/docs`; temporary screenshot visually confirmed local docs page |

### Manual validation recommendation

To finish the exact requested frontend QA, manually stop or approve stopping the existing Node process on `127.0.0.1:3042`, then restart:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then open:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:3042/docs`

Expected result: `/` renders the public intake and CSV import, `/admin/runs` renders seeded run history including `run_demo_failed`, `/docs` redirects to `http://127.0.0.1:8028/docs`, and no external provider or CDN request is needed for the docs page.

### Remaining risks

- Exact frontend QA on `3042` is not complete until the pre-existing broken Next dev process is restarted with approval or manually by the user.
- Backend process `5724`, frontend process `8120`, and Docker PostgreSQL were pre-existing or requested local services and were left running. The fallback `3043` process started by Codex was stopped.
- The known FastAPI/Starlette `TestClient` deprecation warning remains non-blocking.
- `git diff --check` reports LF-to-CRLF working-copy warnings for touched Markdown files on Windows, with exit code 0.

### Confirmation

- Codex did not stage, commit, push, create a branch, rebase, reset, stash, deploy, add CI, call paid APIs, call real HubSpot/Slack/Google Sheets/OpenAI, print `.env`, print secrets, or call real external providers.
- No production credentials, real provider calls, GitHub Actions, deployment config, migrations, schema changes, application features, retry logic, lead form logic, or unrelated UI behavior were changed.

### Suggested commit message

```text
Refresh local demo assets for docs page
```

## Latest Update - 2026-06-11 RC Docs Local-Only Release Blocker Repair

Repaired the RC release blocker where `/docs` was unsafe for strict local-only browser QA. The root cause was FastAPI's default Swagger UI HTML: it referenced remote Swagger assets from `cdn.jsdelivr.net` and a FastAPI favicon from `fastapi.tiangolo.com`. The Next.js `/docs` route only redirected to backend `/docs`; it did not introduce external assets.

The repair disables FastAPI's generated Swagger/ReDoc pages and replaces backend `/docs` with a simple local-only HTML page that links to `/openapi.json`. The OpenAPI JSON endpoint remains available. The frontend `/docs` redirect remains unchanged and now lands on the local-only backend docs page.

PowerShell sandbox note: the managed sandbox still failed to start PowerShell with `CreateProcessAsUserW failed: 5`, so local PowerShell commands were run through approved escalated PowerShell. Commands stayed local to the repo and local runtime services except for Docker/Chrome process operations needed for requested QA.

### Files changed

| Path | Purpose |
|---|---|
| `backend/app/main.py` | Disabled generated FastAPI Swagger/ReDoc docs pages and added local-only `/docs` HTML response |
| `tests/test_docs.py` | Added regression coverage for local-only `/docs` HTML and preserved `/openapi.json` |
| `README.md` | Replaced stale `/docs` Swagger wording with local API docs wording |
| `RUNBOOK.md` | Updated manual `/docs` QA instructions to require local-only docs and `/openapi.json` link |
| `docs/DEMO_ASSETS.md` | Updated `/docs` capture guidance for the local-only docs page; retained the legacy screenshot filename |
| `docs/assets/README.md` | Noted that the legacy `/docs` screenshot filename should be refreshed if it still shows Swagger UI |
| `STATE.md` | Recorded this repair, validation, browser QA, and remaining risks |

### Commands and gate results

| Gate | Command or action | Result |
|---|---|---|
| Starting repo state | `git status --short` | Pass; no output |
| Focused docs tests | `uv run pytest tests/test_docs.py` | Pass; 2 passed, 1 known FastAPI/Starlette `TestClient` deprecation warning |
| Backend tests | `uv run pytest` | Pass; 69 passed, 1 known FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint, first run | `uv run ruff check .` | Fail; Ruff requested import-block blank-line cleanup in touched files only |
| Backend lint, final run | `uv run ruff check .` | Pass; all checks passed |
| Backend typecheck | `uv run mypy .` | Pass; no issues found in 32 source files |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| Frontend tests | `pnpm --dir apps/web test` | Pass; Vitest 5 files passed, 56 tests passed |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled successfully and generated 8 routes including `/docs` |
| Local PostgreSQL | `docker compose up -d postgres` | Pass; `salesops-postgres` was running |
| Alembic migrations | `uv run alembic upgrade head` | Pass; PostgreSQL migration context initialized and at head |
| Demo reset | `uv run python -m backend.app.leads.demo_reset --apply` | Pass; deleted 4 runs, 4 leads, 8 attempts, and 18 audit records, then seeded 4 demo runs |
| Port precheck | `Get-NetTCPConnection` on ports `8028` and `3042` | Pass; both ports were free before local runtime QA |
| Playwright availability | `pnpm --dir apps/web exec playwright --version` | Expected unavailable; `playwright` command not found and no dependency was installed |
| Existing CDP dependency | `uv run python -c "import websockets; print('websockets available')"` | Pass; existing `websockets` package available |
| Runtime HTTP smoke, final run | Local backend on `127.0.0.1:8028` and frontend on `127.0.0.1:3042` | Pass; `/health`, `/`, `/admin/runs`, backend `/docs`, `/openapi.json`, and frontend `/docs` redirect worked locally |
| Frontend `/docs` redirect | .NET `HttpClient` with redirects disabled | Pass; `GET http://127.0.0.1:3042/docs` returned `307` to `http://127.0.0.1:8028/docs` |
| Backend docs HTML | `Invoke-WebRequest -Uri "http://127.0.0.1:8028/docs" -UseBasicParsing` plus forbidden-marker check | Pass; HTTP 200, contained `/openapi.json`, and matched no forbidden docs runtime URL markers |
| OpenAPI JSON | `Invoke-RestMethod -Uri "http://127.0.0.1:8028/openapi.json"` | Pass; title `SalesOps Workflow Automation Hub API` |
| Browser QA | Headless Chrome CDP against `/`, `/admin/runs`, and `/docs` | Pass; expected text rendered, no console warnings/errors, no runtime exceptions, no HTTP 4xx/5xx browser responses, no non-local requests, and no forbidden docs HTML markers |
| Source scan | Requested `Get-ChildItem ... Select-String` URL scan | Pass/limited; command completed, with matches limited to local URLs, tests/sentinel strings, generated `.pytest_cache` docs, documentation history, and the new negative-test markers |
| Stale Swagger wording scan | `rg -n "Swagger UI|Swagger|swagger" README.md RUNBOOK.md docs` | Pass/limited; remaining matches are the legacy screenshot filename and explicit refresh notes |
| Whitespace check before `STATE.md` update | `git diff --check` | Pass; only Git LF-to-CRLF working-copy warnings |
| Repo state before `STATE.md` update | `git status --short` | Pass; expected changes in `README.md`, `RUNBOOK.md`, `backend/app/main.py`, `docs/DEMO_ASSETS.md`, `docs/assets/README.md`, and new `tests/test_docs.py` |

Runtime script notes:

- One runtime smoke attempt failed because `$home` conflicts with PowerShell's read-only `$HOME` variable; the cleanup block ran and ports were verified clear before retry.
- One redirect-inspection attempt failed because `Invoke-WebRequest -MaximumRedirection 0` throws on this PowerShell version; the final pass used .NET `HttpClient` with redirects disabled.
- No app failure was caused by either script issue.

### Browser QA evidence

| Route | Result |
|---|---|
| `http://127.0.0.1:3042/` | Pass; final URL stayed local, title `SalesOps Workflow Automation Hub`, expected `Lead intake form` and `CSV import` text rendered, 6 requests, no console warnings/errors, no exceptions, no non-local requests |
| `http://127.0.0.1:3042/admin/runs` | Pass; final URL stayed local, title `SalesOps Workflow Automation Hub`, expected `Admin run history` and `run_demo_failed` text rendered, 15 requests, no console warnings/errors, no exceptions, no non-local requests |
| `http://127.0.0.1:3042/docs` | Pass; redirected to `http://127.0.0.1:8028/docs`, title `SalesOps Workflow Automation Hub API Docs`, expected local docs and `OpenAPI contract` text rendered, 5 requests, no console warnings/errors, no exceptions, no non-local requests, no forbidden HTML markers |

### Local-only docs assertions

| Assertion | Result |
|---|---|
| Backend `/docs` no longer uses FastAPI default Swagger UI | Pass; `docs_url=None` and `redoc_url=None` disable generated external-asset docs pages |
| Backend `/docs` has no `cdn.jsdelivr.net`, `fastapi.tiangolo.com`, `unpkg.com`, `cdnjs.cloudflare.com`, Google Fonts, `http://`, or `https://` references | Pass; covered by `tests/test_docs.py` and runtime HTML check |
| `/openapi.json` remains available | Pass; backend test and runtime check returned title `SalesOps Workflow Automation Hub API` |
| Next.js `/docs` remains the reviewer entrypoint | Pass; route still returns `307` to configured backend `/docs` |

### Manual browser QA instructions

Run from the repository root in PowerShell:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then open:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:3042/docs`

Pass criteria:

- `/docs` redirects to `http://127.0.0.1:8028/docs`.
- `/docs` renders `SalesOps Workflow Automation Hub API Docs` and links to `/openapi.json`.
- Browser console shows no warnings/errors.
- Browser network requests stay on `127.0.0.1`, `localhost`, or local browser internals only; no CDN, FastAPI-site favicon, Google Fonts, or other non-local runtime URLs.
- `/` still renders the lead intake form and CSV import.
- `/admin/runs` still renders seeded run history, including `run_demo_failed`.

### Remaining risks

- The existing screenshot file `docs/assets/screenshots/salesops-docs-swagger.png` may still show the old Swagger UI capture. Text docs now mark the legacy filename and recommend refreshing it before final portfolio use.
- The broad requested source scan intentionally matches historical `STATE.md` evidence, local URLs, tests, generated `.pytest_cache` docs, and negative-test sentinel strings. The repaired runtime `/docs` HTML and browser network evidence are the relevant release-blocker signals.
- Docker PostgreSQL was left running because the requested runtime setup started it. Backend, frontend, and headless Chrome processes started by Codex were stopped after QA.
- The known FastAPI/Starlette `TestClient` deprecation warning remains non-blocking.

### Confirmation

- Codex did not stage, commit, push, create a branch, rebase, reset, stash, deploy, add CI, call paid APIs, call real HubSpot/Slack/Google Sheets/OpenAI, print `.env`, print secrets, or call real external providers.
- No production credentials, real provider calls, GitHub Actions, deployment config, migrations, schema changes, retry logic, lead form logic, or unrelated UI behavior were changed.

### Suggested commit message

```text
Make API docs local-only for RC QA
```

## Latest Update - 2026-06-11 RC Final Browser QA and Release-Readiness Sign-Off

Performed the requested final local runtime verification on 2026-06-11 at 08:16:54 +03:00. This pass used only local mock/demo paths, local PostgreSQL, FastAPI on `127.0.0.1:8028`, and Next.js on `127.0.0.1:3042`.

This phase changed `STATE.md` only. It did not change backend code, frontend code, migrations, package manifests, lockfiles, GitHub Actions, deployment config, provider config, secrets, commits, pushes, branches, rebases, resets, stashes, or production/paid integrations.

PowerShell sandbox note: the managed sandbox failed before executing commands with `CreateProcessAsUserW failed: 5`, so the requested PowerShell commands were run through approved escalated PowerShell. The commands stayed inside the repository except for local browser/process/runtime operations needed for QA.

### Commands and gate results

| Gate | Command or action | Result |
|---|---|---|
| Starting repo state | `git status --short` | Pass; no output |
| Env guard | `if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }` | Pass; `.env` present, contents not printed |
| Backend dependency sync | `uv sync` | Pass; resolved 44 packages, checked 42 packages |
| Frontend dependency install | `pnpm install` | Pass; already up to date, pnpm `11.5.0` |
| Local PostgreSQL | `docker compose up -d postgres` | Pass; `salesops-postgres` running |
| Alembic migrations | `uv run alembic upgrade head` | Pass; PostgreSQL migration context initialized and at head |
| Demo reset | `uv run python -m backend.app.leads.demo_reset --apply` | Pass; initial reset deleted 4 runs, 4 leads, 9 attempts, 19 audit records, then seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Backend tests | `uv run pytest` | Pass; 67 passed, 1 known FastAPI/Starlette `TestClient` deprecation warning |
| Backend lint | `uv run ruff check .` | Pass; all checks passed |
| Backend typecheck | `uv run mypy .` | Pass; no issues found in 31 source files |
| Frontend lint | `pnpm --dir apps/web lint` | Pass; ESLint exited 0 |
| Frontend tests | `pnpm --dir apps/web test` | Pass; Vitest 5 files passed, 56 tests passed |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| Frontend build | `pnpm --dir apps/web build` | Pass; Next.js 15.5.18 compiled and generated 8 routes |
| Backend runtime | `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028` | Pass; `/health` returned `status=ok` and service `salesops-workflow-automation-hub` |
| Frontend runtime | `$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"` plus `$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"` and `pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042` | Pass after stopping a stale listener already on `3042`; clean proxy smoke returned `PROXY_OK` through backend `8028` |
| Public browser QA | Headless Chrome CDP against `http://127.0.0.1:3042/` | Pass; homepage loaded, lead form submitted synthetic data, latest result showed success, backend dedupe `unique`, CRM `created`, Slack `sent`, CSV import reported `1 of 1 rows submitted locally`, no console warnings/errors, and no non-local network URLs |
| Admin browser QA | Headless Chrome CDP against `http://127.0.0.1:3042/admin/runs` | Pass; seeded rows rendered, status/source/owner/error-type/date/search filters worked, empty filter state rendered, `View details` opened `run_demo_failed`, scroll/focus moved to `run-detail-heading`, retry succeeded locally, unsafe admin controls were absent, no console warnings/errors, and no non-local network URLs |
| Post-retry demo restore | `uv run python -m backend.app.leads.demo_reset --apply` | Pass; restored canonical demo state after retry QA; `run_demo_failed` returned to `failed` with 2 attempts |
| API docs HTML | `Invoke-WebRequest -Uri "http://127.0.0.1:8028/docs" -UseBasicParsing` plus remote-URL scan | Fail for local-only browser requirement; local HTML returned but referenced `https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js`, `https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css`, and `https://fastapi.tiangolo.com/img/favicon.png` |
| Browser `/docs` open | Not opened in Chrome | Skipped for safety; opening it would trigger known non-local CDN/FastAPI image requests |
| Workflow directory | `Test-Path -LiteralPath ".\.github\workflows"` | Pass; `False` |
| Tracked workflow files | `git ls-files -- .github .github/workflows` | Pass; no output |
| Secret/private-key scan | `git grep -n -I -E "...secret/private-key sentinel..." -- . ":(exclude)STATE.md"` | Pass; no matches, exit 1 means no matches |
| Live-provider endpoint scan | `git grep -n -I -E "...live provider endpoint sentinel..." -- . ":(exclude)STATE.md"` | Pass; no matches, exit 1 means no matches |
| Changed-doc forbidden git/deployment command scan | `git diff -- STATE.md | Select-String -Pattern "git add|git commit|git push|git reset|git rebase|git stash|deploy|wrangler|vercel|netlify|gh workflow"` | Pass/limited; matches were documentation evidence or negative confirmation around deployment, not runnable forbidden commands |
| Final whitespace check | `git diff --check` | Pass; exit 0 with Git's LF-to-CRLF working-copy warning for `STATE.md` |
| Final changed files | `git diff --name-only` | Pass; `STATE.md` only |
| Final repo state | `git status --short` | Pass; `M STATE.md` only |

### Browser QA evidence

| Check | Result |
|---|---|
| `http://127.0.0.1:3042/` homepage | Pass; title `SalesOps Workflow Automation Hub`, visible `Lead intake form` and `CSV import` |
| Lead form submit | Pass; synthetic `rc.browser.qa.<timestamp>@example.com` lead produced success, backend dedupe `unique`, CRM `created`, Slack `sent` |
| CSV import path | Pass; synthetic CSV row submitted locally and summary showed `1 of 1 rows submitted locally.` |
| `http://127.0.0.1:3042/admin/runs` | Pass; rendered `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Filters | Pass; status `failed`, source `csv_upload`, owner `Maya Patel`, error type `adapter`, date `2026-06-01` to `2026-06-01`, and no-match search were verified through URL and DOM state |
| View details | Pass; `run_demo_failed` detail rendered, URL became `?runId=run_demo_failed`, `scrollY=1959`, detail top was `94`, and active element was `run-detail-heading` |
| Guarded retry | Pass; failed run showed `Retry run`, retry succeeded locally, and the detail showed `Retry outcome: request succeeded and was recorded locally.` |
| Unsafe controls | Pass; visible admin buttons were `Reset filters` and `View details`; no delete, edit, resubmit, rerun, send, archive, worker, reset-demo, or provider controls were visible |
| Local-only app traffic | Pass for `/` and `/admin/runs`; Chrome CDP saw no non-local HTTP(S) URLs for those app pages |
| API docs browser traffic | Fail/blocked; `/docs` HTML uses external Swagger/FastAPI assets, so browser-opening `/docs` would not remain local-only |

### Skipped checks and reasons

| Check | Status | Reason |
|---|---|---|
| In-app Browser plugin | skipped/fallback used | The Browser skill was read, but tool discovery returned no required `node_repl js` tool. Headless Chrome through local DevTools was used without adding dependencies |
| Browser open of `http://127.0.0.1:8028/docs` | skipped | The local `/docs` HTML was inspected first and contains external asset URLs; opening it in a browser would make non-local requests |
| GitHub Actions or CI | skipped | Explicitly forbidden; workflow absence was checked locally instead |
| Deployment/staging validation | skipped | Explicitly forbidden and no deployment was attempted |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden; only local mock/demo paths were used |
| Git staging, commit, push, branch, rebase, reset, stash, or destructive checkout | skipped | Explicitly forbidden; Codex did not run these operations |

### Remaining risks

- Release sign-off is blocked until the `/docs` local-only traffic issue is either accepted as a known FastAPI Swagger UI limitation or fixed in an approved repair phase by serving docs assets locally or disabling/replacing Swagger UI for the portfolio path.
- Headless Chrome covered desktop viewport behavior for the requested flows; manual visual review in a visible browser is still recommended before recording portfolio assets.
- Browser QA submitted synthetic local leads and retried one failed run, then `demo_reset --apply` restored the canonical four seeded demo runs.
- Docker PostgreSQL was left running because the requested setup started it. Backend and frontend dev servers started by Codex were stopped after QA.
- The known FastAPI/Starlette `TestClient` deprecation warning remains non-blocking.

### Confirmation

- Codex did not commit, push, create a branch, rebase, reset, stash, deploy, add CI, call paid APIs, call real HubSpot/Slack/Google Sheets/OpenAI, print `.env`, print secrets, or call real external providers.
- The only tracked file intentionally changed in this phase is `STATE.md`.

### Suggested commit message

```text
Record RC final browser QA evidence
```

## Latest Update - 2026-06-11 RC Final Manual Verification + Portfolio Release Evidence

Performed a verification-only release evidence pass for the portfolio RC. This pass did not change app behavior, backend code, frontend code, package manifests, lockfiles, migrations, GitHub Actions, deployment config, provider configuration, secrets, demo/runtime data, commits, pushes, branches, rebases, resets, or stashes.

PowerShell sandbox note: initial managed-sandbox shell startup failed with `CreateProcessAsUserW failed: 5`, so the requested local PowerShell commands were rerun through approved escalated PowerShell. No forbidden git write, deployment, CI, paid API, real-provider, or demo-data mutation command was run.

### Previous RC audit confirmation

| Check | Result |
|---|---|
| Latest `STATE.md` entry before this update | Pass; the previous latest entry was `2026-06-11 RC-FINAL Portfolio Release Evidence Audit` |
| Previous audit accuracy | Pass; it records no runtime behavior changes, no GitHub Actions/deployment/provider changes, reviewer setup using `uv run python -m backend.app.leads.demo_reset --apply`, and skipped runtime mutation/browser checks |
| Reviewer-facing demo reset guidance | Pass; `README.md`, `HANDOFF.md`, `docs/DEMO_SCRIPT.md`, and `RUNBOOK.md` use `uv run python -m backend.app.leads.demo_reset --apply` as the full reviewer reset path |
| Remaining `demo_seed` references | Pass; `HANDOFF.md` and `RUNBOOK.md` frame `demo_seed` as a narrower optional refresh of the four known seed records, while asset docs use seed wording as deterministic demo-data context |
| `.env.example` posture | Pass; placeholder-only local/mock settings, `CRM_PROVIDER=mock`, `SLACK_PROVIDER=mock`, `GOOGLE_SHEETS_PROVIDER=disabled`, and `example.invalid` placeholder URLs |

### Commands run and results

| Command | Result |
|---|---|
| `git status --short` | Pass; no output before validation |
| `rg --files` | Pass; repository file inventory listed expected backend, frontend, docs, tests, Alembic, and asset paths |
| `Get-Content -LiteralPath README.md -Raw` | Pass; README inspected |
| `Get-Content -LiteralPath STATE.md -Raw` | Pass; previous latest entry inspected |
| `rg -n "demo_reset\|demo_seed\|uv run python -m backend\.app\.leads\|seed\|reset" README.md HANDOFF.md docs/DEMO_SCRIPT.md RUNBOOK.md docs/DEMO_ASSETS.md docs/CASE_STUDY.md docs/assets/README.md docs/assets/demo/README.md .env.example` | Pass; full reset path is `demo_reset --apply`; `demo_seed` references are optional or contextual |
| `git diff --check` | Pass; no output before `STATE.md` update |
| `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | Pass; Vitest `v3.2.4`, `5` test files passed, `56` tests passed |
| `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | Pass; Next.js `15.5.18` compiled successfully and generated `8` routes |
| `uv run python -c "import backend.app.leads.demo_reset; print('demo_reset import OK')"` | Pass; printed `demo_reset import OK` |
| `uv run python -m pytest` | Pass with existing warning; Python `3.12.13`, `67 passed`, `1` FastAPI/Starlette `TestClient` deprecation warning |
| `uv run python -m ruff check .` | Pass; `All checks passed!` |
| `uv run python -m mypy backend` | Pass; `Success: no issues found in 19 source files` |
| Tracked content scan for token-shaped secret values, excluding `STATE.md` to avoid historical regex self-matches | Pass; `NO_MATCHES` |
| Tracked content scan for private-key headers, excluding `STATE.md` to avoid historical regex self-matches | Pass; `NO_MATCHES` |
| Tracked content scan for live provider/production endpoints, excluding `STATE.md` to avoid historical regex self-matches | Pass; `NO_MATCHES` |
| Initial tracked content scan for accidental real-provider configuration | Failed as scanner syntax only; `git grep -E` rejected a PCRE lookahead with `Invalid preceding regular expression` |
| Corrected tracked content scan for accidental real-provider configuration, excluding `STATE.md` to avoid historical regex self-matches | Pass; `NO_MATCHES` |
| `Test-Path -LiteralPath ..github\workflows` | Pass; `False` for the literal task-provided path |
| `Test-Path -LiteralPath .\.github\workflows` | Pass; `False` for the canonical repository workflow path |
| `git ls-files -- .github .github/workflows` | Pass; no tracked workflow files |
| `git status --short` | Pass; no output before this `STATE.md` update |

### Skipped checks and exact reasons

| Check | Status | Exact reason |
|---|---|---|
| `uv run python -m backend.app.leads.demo_reset --apply` | skipped | Explicitly not run because it mutates local demo/runtime data and the user did not approve demo-data mutation in this Codex session |
| Docker/PostgreSQL startup | skipped | Not part of the requested safe local gate list for this pass; starting local services was unnecessary for the non-mutating verification evidence |
| Alembic migration against local PostgreSQL | skipped | Not run because the local database runtime path was not needed for the requested safe gates and demo-data mutation was not approved |
| Browser QA | skipped | No backend/frontend dev servers were started in this verification-only pass; browser QA should be run manually with the local-only checklist below |
| Dependency install | skipped | Existing local dependencies were available; no dependency manifests or lockfiles changed |
| GitHub Actions / CI execution | skipped | Explicitly forbidden; workflow absence was checked locally instead |
| Deployment or staging validation | skipped | Explicitly forbidden and no deployment config was added or used |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden; the project remains local/mock-only by default |
| Git staging, commit, push, branch, rebase, reset, stash, or destructive cleanup | skipped | Explicitly forbidden; Codex did not run any git write or destructive operation |

### Manual browser QA checklist

Run these steps from the repository root in PowerShell when you intentionally want to start local services and reset local demo data:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
uv sync
pnpm install
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then open:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:3042/docs`

Manual pass criteria:

- public lead form renders and submits a synthetic lead through local Next.js and FastAPI only;
- CSV import accepts a small synthetic CSV row and shows the same-session result;
- `/admin/runs` shows seeded success, failed, queued, and retried runs;
- date, source, status, owner, error-type, and search filters update the table and URL correctly;
- selected run detail shows sanitized payload, attempts, failure detail, suggested action, and retry only for failed or queued selected runs;
- `/docs` redirects to local FastAPI docs at `http://127.0.0.1:8028/docs`;
- browser network activity stays on `127.0.0.1`, `localhost`, or local Next.js/FastAPI routes;
- no secrets, real customer data, provider dashboards, live webhooks, real external provider calls, deployment actions, or unsafe admin mutation controls appear.

### Remaining risks

- Manual browser QA and the local PostgreSQL reset path were not rerun in this pass.
- The content sentinel scans intentionally exclude `STATE.md` because historical evidence entries contain literal regex command text that self-matches; reviewer-facing docs and source/config files were scanned.
- `uv run python -m pytest` still emits the known non-blocking FastAPI/Starlette `TestClient` deprecation warning.
- The first accidental real-provider configuration scan failed because the scanner used unsupported regex syntax; the corrected ERE-compatible scan passed with `NO_MATCHES`.
- Final tracked diff should remain limited to this `STATE.md` release evidence update until the user manually reviews, stages, commits, and pushes.

### Suggested commit message

```text
Record RC final manual verification evidence
```

## Latest Update - 2026-06-11 RC-FINAL Portfolio Release Evidence Audit

Performed a final portfolio release evidence audit focused on reviewer setup, demo reset guidance, handoff consistency, local validation instructions, CI/deployment absence, paid/live-provider boundaries, and secret-like string hygiene. This pass did not change runtime behavior, app code, package manifests, lockfiles, migrations, GitHub Actions, deployment config, demo/runtime data, secrets, commits, or pushes.

### Files inspected

| Path | Purpose |
|---|---|
| `README.md` | Portfolio overview, Quick Start, screenshots, validation, and documentation map |
| `HANDOFF.md` | Reviewer handoff, demo reset/seed notes, 3-5 minute demo sequence, credential boundary |
| `docs/DEMO_SCRIPT.md` | Short reviewer checklist and install/seed path |
| `STATE.md` | Current and historical validation evidence |
| `RUNBOOK.md` | Local setup, reset, manual QA, validation, troubleshooting |
| `docs/DEMO_ASSETS.md` | Screenshot/GIF/video capture checklist and safety rules |
| `docs/CASE_STUDY.md` | Public portfolio case study and mock/synthetic-data boundary |
| `docs/assets/README.md` | Screenshot asset provenance |
| `docs/assets/demo/README.md` | Optional recording asset placeholder |
| `REQ.md` | Requirements, out-of-scope items, and acceptance criteria |
| `DESIGN.md` | Architecture, data model, adapter boundaries, local-only retry/reset posture |
| `CONTEXT.md` | Current project context, constraints, and feature status |
| `EXEC_PLAN.md` | Phase history, acceptance criteria, and safety/recovery notes |
| `TDD.md` | Test strategy, current gate expectations, and quality matrix |

### Audit findings

| Check | Result |
|---|---|
| Full reviewer/demo reset command | Pass; current reviewer-facing setup paths use `uv run python -m backend.app.leads.demo_reset --apply` after local PostgreSQL and Alembic setup |
| `demo_seed` positioning | Pass; current handoff/runbook wording describes `demo_seed` as a narrower optional refresh of the four known seed records, while historical `STATE.md` entries preserve older phase evidence |
| Setup and demo instructions | Pass; README, HANDOFF, DEMO_SCRIPT, RUNBOOK, and DEMO_ASSETS consistently use PowerShell, local PostgreSQL, local FastAPI/Next.js ports, and mock-only provider boundaries |
| Reviewer handoff | Pass; future real-provider work is documented as a separate approved phase with placeholder-only `.env.example` guidance |
| Manual QA instructions | Pass; manual browser/runtime QA steps are documented, but were not rerun in this no-runtime audit |
| Accidental CI/deployment references | Pass; references describe GitHub Actions/CI/deployment as absent, out of scope, or explicitly skipped |
| Paid/live-provider references | Pass; references describe paid APIs, HubSpot, Slack, Google Sheets, OpenAI, webhooks, and production APIs as absent/mock-only unless explicitly approved |
| Secret-like strings | Pass; filename-only tracked scans did not find token/private-key or live-provider endpoint patterns outside historical `STATE.md` documentation |

### Files changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded this final audit evidence, validation results, skipped checks, risks, and suggested commit message |

### Validation results

| Command | Result |
|---|---|
| `git status --short` before edits | Pass; no output |
| `git diff --check` before edits | Pass; no output |
| `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | Pass; Vitest `v3.2.4`, `5` test files passed, `56` tests passed |
| `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | Pass; Next.js `15.5.18` compiled successfully and generated `8` routes |
| `uv run python -c "import backend.app.leads.demo_reset; print('demo_reset import OK')"` | Pass; printed `demo_reset import OK` |
| Filename-only tracked token/private-key scan excluding `STATE.md` | Pass; no filenames printed; `git grep` exited 1 because there were no matches |
| Filename-only tracked live-provider endpoint scan excluding `STATE.md` | Pass; no filenames printed; `git grep` exited 1 because there were no matches |
| `Test-Path -LiteralPath .\.github\workflows` | Pass; `False` |
| `git ls-files -- .github .github\workflows` | Pass; no output |

Validation note: PowerShell could not start inside the managed sandbox in this workspace (`CreateProcessAsUserW failed: 5`), so the same local commands were run through approved escalated PowerShell. No forbidden git write, runtime mutation, real-provider, or paid/external API command was run.

### Skipped or limited checks

| Check | Status | Written reason |
|---|---|---|
| Docker/PostgreSQL startup | skipped | Explicitly not run because this was a no-runtime audit and starting local services was approval-gated |
| Alembic migration against local PostgreSQL | skipped | Explicitly not run because it requires the local database runtime path and was approval-gated |
| `demo_reset --apply` execution | skipped | Explicitly not run because it mutates local demo/runtime data |
| App server startup and browser QA | skipped | Explicitly not run because runtime/browser QA required prior explanation and approval; docs already contain manual QA steps |
| Backend pytest/Ruff/mypy | skipped | Not part of the user's allowed safe validation list for this RC-FINAL audit; latest broader backend gate evidence remains historical in this file |
| Dependency install | skipped | No dependency manifests or lockfiles changed, and requested frontend/backend import gates ran against existing local installs |
| GitHub Actions / CI validation | skipped | Explicitly forbidden; no workflow files exist or were added |
| Deployment/staging validation | skipped | Explicitly forbidden and no deployment config exists or was added |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden; the project remains local/mock-only |
| Staging, commit, push, branch, reset, rebase, or stash | skipped | Explicitly forbidden; Codex did not run these actions |

### Remaining risks

- Manual browser QA and local PostgreSQL reset flow were not rerun during this no-runtime audit.
- Historical `STATE.md` entries still preserve older `demo_seed` phase evidence; the current reviewer-facing docs now use `demo_reset --apply` as the full reset command and frame `demo_seed` as a narrow optional refresh.
- Broader backend pytest/Ruff/mypy gates were not rerun in this phase because they were outside the user-approved safe validation list.

### Suggested commit message

```text
Record RC final portfolio evidence audit
```

## Latest Update - 2026-06-11 Release/Package Documentation Audit

Performed a final release/package documentation audit for portfolio handoff. The audit stayed documentation-only and did not change runtime behavior, package manifests, lockfiles, migrations, CI, deployment config, provider behavior, secrets, commits, or pushes.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Added a concise public-facing note that final manual browser QA passed on 2026-06-11 and points readers to this file for pass criteria and risks |
| `HANDOFF.md` | Aligned the reviewer setup path with the safer `demo_reset --apply` command and clarified when `demo_seed` is only an optional narrow refresh |
| `docs/DEMO_SCRIPT.md` | Aligned the short reviewer install/seed path with `demo_reset --apply` |
| `STATE.md` | Recorded this final documentation audit, validation results, skipped checks, and remaining risks |

### Validation results

| Command | Result |
|---|---|
| `git status --short` before edits | Pass; no output |
| `git diff --check` | Pass; exited 0 with Git line-ending warnings for the edited Markdown files only |
| `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | Pass; Vitest `v3.2.4`, `5` test files passed, `56` tests passed |
| `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | Pass; Next.js `15.5.18` production build compiled successfully and generated `8` routes |

### Skipped or limited checks

| Check | Status | Written reason |
|---|---|---|
| Backend pytest/Ruff/mypy | skipped | This phase changed documentation only, and the requested extra local validation was limited to documented commands already available in package scripts |
| Dependency install | skipped | No dependency manifests or lockfiles changed; existing local installs were sufficient for validation |
| Docker/PostgreSQL startup, Alembic, and demo reset execution | skipped | Running local database mutation commands was not needed for a documentation audit and would alter local runtime state |
| Manual browser QA rerun | skipped | Final manual browser QA was already completed on 2026-06-11 and recorded in this file; no UI/runtime behavior changed in this phase |
| GitHub Actions / CI validation | skipped | Explicitly forbidden; no workflow files exist or were added |
| Deployment/staging validation | skipped | Explicitly forbidden and no deployment config exists or was added |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden; the project remains local/mock-only |
| Staging, commit, push, branch, reset, rebase, or stash | skipped | Explicitly forbidden; Codex did not run these actions |

### Remaining risks

- Final manual browser QA was not rerun during this documentation-only audit.
- Git reports line-ending normalization warnings for the edited Markdown files; `git diff --check` still passes.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains a known non-blocking backend test warning from prior validation.

### Suggested commit message

```text
Finalize portfolio handoff documentation
```

## Latest Update - 2026-06-11 Final Manual Browser QA Passed

Final manual browser QA was completed on 2026-06-11 and everything passed.

This update records the completed manual QA status only. No code, dependencies, lockfiles, CI, deployment config, provider behavior, secrets, commits, or pushes were changed.

### Files changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded that final manual browser QA passed on 2026-06-11 |

### Validation requested for this update

| Command | Result |
|---|---|
| `git status --short` | To run after this documentation-only update |
| `git diff --check` | To run after this documentation-only update |

### Suggested commit message

```text
Record final manual browser QA pass
```

## Latest Update - 2026-06-11 RC Final Freeze and Portfolio Handoff Check

### Phase summary

Performed a release-candidate freeze check focused on stability, reproducibility, documentation coherence, and local/mock-only handoff posture.

Reviewed `README.md`, `RUNBOOK.md`, `HANDOFF.md`, `docs/DEMO_SCRIPT.md`, `docs/DEMO_ASSETS.md`, root/frontend package scripts, `pyproject.toml`, and current repository status. The documented local demo path remains coherent: create ignored `.env` from `.env.example`, install with `uv sync` and `pnpm install`, start local PostgreSQL with Docker Compose, apply Alembic migrations, seed/reset deterministic demo data, run FastAPI on `127.0.0.1:8028`, run Next.js on `127.0.0.1:3042` with both backend-base environment variables pointed at the local backend, then open `/`, `/admin/runs`, and local API docs.

No README, RUNBOOK, HANDOFF, code, dependency, lockfile, migration, deployment, GitHub Actions, or production-behavior correction was needed. This `STATE.md` entry is the only intended documentation change for the phase.

### Files changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded final RC freeze validation, skipped-gate reasons, manual QA status, guardrails, residual risks, and suggested manual commit message |

### Required validation results

| Command | Result |
|---|---|
| `git status --short` | Pass before documentation update; no output |
| `git diff --check` | Pass before documentation update; no output |
| `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | Pass; Vitest `v3.2.4`, `5` test files passed, `56` tests passed |
| `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | Pass; Next.js `15.5.18` compiled successfully and generated `8` routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | Pass with existing warning; Python `3.12.13`, `67 passed`, `1` FastAPI/Starlette `TestClient` deprecation warning |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | Pass; `Success: no issues found in 28 source files` |

### Additional freeze checks

| Check | Command | Result |
|---|---|---|
| Static Docker Compose validation | `docker compose config` | Pass; rendered `postgres` service, local `salesops_local` database, local credentials, healthcheck, and port `5432` mapping |
| Post-validation tracked diffs before `STATE.md` update | `git diff --name-only` | Pass; no output |
| Workflow directory absence | `Test-Path -LiteralPath .\.github\workflows` | Pass; `False` |
| Tracked workflow/deployment config inventory | `git ls-files -- .github .github\workflows vercel.json netlify.toml render.yaml render.yml railway.toml fly.toml fly.yml wrangler.toml wrangler.json wrangler.jsonc Dockerfile .dockerignore` | Pass; no output |
| Dependency, lockfile, compose, and Next config diffs | `git diff -- package.json pnpm-lock.yaml pyproject.toml uv.lock apps/web/package.json apps/web/next.config.ts compose.yml` | Pass; no output |
| Staged files | `git diff --cached --name-only` | Pass; no output |
| `.env` ignore status | `git check-ignore -v .env` | Pass; `.gitignore:2:.env` |
| Tracked secret/private-key sentinel scan | PowerShell loop over token/private-key patterns using `git grep -I -q -E -e`, excluding `STATE.md` | Pass; `NO_MATCHES` |
| Tracked live-provider endpoint sentinel scan | PowerShell loop over live endpoint patterns using `git grep -I -q -E -e`, excluding `STATE.md` | Pass; `NO_MATCHES` |

Validation note: the first no-content secret sentinel scan failed before scanning because `git grep` parsed the dash-prefixed private-key pattern as an option. It was rerun with `-e` so every pattern was treated as a pattern; the corrected scan passed with `NO_MATCHES`.

### Manual and browser QA status

Final manual browser QA was completed on 2026-06-11 and everything passed. No Playwright or browser dependency was installed by Codex for this documentation-only status update.

The exact manual QA flow remains documented in `README.md`, `RUNBOOK.md`, `HANDOFF.md`, `docs/DEMO_SCRIPT.md`, and `docs/DEMO_ASSETS.md`. Manual browser QA should use:

```powershell
if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
uv sync
pnpm install
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then open:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:3042/docs`

Browser pass criteria remain: public form and CSV import render and submit synthetic data locally; seeded success, failed, queued, and retried runs render; date/source/status/owner/error-type/search filters update rows and URL; selected run detail shows sanitized payload, attempts, suggested action, and local retry only for failed or queued runs; `/docs` redirects to local FastAPI docs; browser/network evidence stays on `127.0.0.1` or local Next/FastAPI routes; no secrets, provider dashboards, real customer data, external provider calls, or unsafe admin mutation controls appear.

### Skipped or limited checks

| Check | Status | Written reason |
|---|---|---|
| Dependency install | skipped | `uv sync` and `pnpm install` were not rerun because no dependencies changed and all frozen/backend plus frontend gates ran against the existing local installs |
| Docker container startup | skipped | Static `docker compose config` passed; starting PostgreSQL was not required by the requested gate and would alter local runtime state |
| Alembic migration against live local PostgreSQL | skipped | The requested backend tests passed and static Compose validation passed; running migrations against the user's local database was not required for the non-mutating freeze pass |
| Demo reset/seed mutation | skipped | The commands are documented and previously covered by tests; running `demo_reset --apply` or retry actions would mutate local demo data during a freeze check |
| Automated browser smoke | skipped | No local dev servers were started in this phase, and no new Playwright/browser dependency may be installed; exact manual browser QA steps are documented above |
| GitHub Actions / CI validation | skipped | Explicitly forbidden; no workflow files exist or were added |
| Deployment/staging validation | skipped | Explicitly forbidden and no deployment config exists or was added |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden; the project remains local/mock-only |
| Staging, commit, push, branch, reset, rebase, or stash | skipped | Explicitly forbidden; Codex did not run these actions |

### Guardrails confirmed

- No production behavior or source code was changed.
- No dependencies were added, removed, upgraded, or installed.
- No lockfiles were changed.
- No deployment config or GitHub Actions were created or modified.
- No real provider/API call was made.
- No `.env` contents, secrets, tokens, private keys, provider dashboards, or real customer data were printed or stored.
- No commit or push was performed.

### Remaining risks

- Manual browser QA was not rerun in this phase; use the exact manual QA flow above before recording or presenting the demo.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains non-blocking.
- Secret/live-endpoint scans intentionally exclude `STATE.md` to avoid documentation self-matches; future scans should keep using no-content sentinel output when checking for sensitive patterns.
- Final tracked diff should remain limited to this `STATE.md` update until the user manually reviews, stages, commits, and pushes.

### Suggested commit message

```text
Record RC final freeze handoff check
```

## Latest Update - 2026-06-10 Admin Runs UX RC Validation and Final Polish

### Phase summary

Inspected `apps/web/src/components/admin-run-history.tsx`, `apps/web/src/components/admin-run-history.test.tsx`, `RUNBOOK.md`, and `STATE.md` for the Admin run detail auto-scroll implementation.

The component implementation is minimal and scoped: the scroll is gated by an explicit-click pending run-id ref, consumed once after the matching detail or error state renders, uses `prefers-reduced-motion: reduce` to switch from smooth to `auto`, and focuses the detail heading with `preventScroll`. Initial URL-selected details, filter changes, canonical query replacement, and retry-driven history/detail refreshes do not set the pending scroll ref.

No component behavior change was needed. A focused test-only polish added explicit one-shot assertions so the suite now proves the clicked detail scroll happens exactly once and retry refresh does not trigger a second scroll.

### Files changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.test.tsx` | Added narrow assertions for one-shot detail scroll and no extra scroll after successful retry refresh |
| `STATE.md` | Recorded RC validation, browser QA, skipped-tool reasons, guardrail results, and remaining risks |

### Scope and guardrails

| Check | Result |
|---|---|
| Retry behavior scope | Pass; no retry implementation or backend behavior changed |
| Backend source | Pass; no backend files changed |
| Dependency and lockfiles | Pass; no `package.json`, `pnpm-lock.yaml`, `pyproject.toml`, or `uv.lock` changes |
| Deployment config | Pass; no deployment config changes |
| GitHub Actions | Pass; no `.github/workflows` changes |
| Live provider/API additions | Pass; safe file-path-only scan of changed non-`STATE.md` files returned `NO_MATCHES` |
| Secrets/tokens/private keys | Pass; safe file-path-only scan of changed non-`STATE.md` files returned `NO_MATCHES` |
| Paid/live provider usage | Pass; no real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider call was made |
| Git actions | Pass; no staging, commit, push, branch creation, deploy, reset, rebase, or stash was run |

### Tests updated

| Test file | Coverage added |
|---|---|
| `apps/web/src/components/admin-run-history.test.tsx` | `opens run details on a normal View details click` now asserts `scrollIntoView` is called exactly once; `retries a failed selected run and refreshes history and detail` now asserts the initial clicked detail scroll remains a single call after retry refresh |

### Required validation results

| Command | Result |
|---|---|
| `git status --short` | Initial status was clean |
| `pnpm --dir apps/web test -- --run admin-run-history` | Pass; Vitest `v3.2.4`, `1` test file passed, `40` tests passed |
| `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | Pass; Vitest `v3.2.4`, `5` test files passed, `56` tests passed |
| `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | Pass; Next.js `15.5.18` production build compiled successfully and generated `8` routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | Pass with existing warning; `67 passed, 1 warning in 2.68s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | Pass; `Success: no issues found in 28 source files` |
| `git diff --check` | Pass; exit 0 with Git LF-to-CRLF working-copy warnings for `STATE.md` and `apps/web/src/components/admin-run-history.test.tsx` |

### Browser QA

Rendered browser QA used installed headless Microsoft Edge through Chrome DevTools Protocol because the in-app Browser control tool and an installed Playwright CLI were unavailable without adding dependencies.

Setup and cleanup:

- `docker compose ps postgres`: pass; `salesops-postgres` was already `Up` and `healthy`.
- `uv run alembic upgrade head`: pass; migrations were current.
- `uv run python -m backend.app.leads.demo_reset --apply`: pass before browser QA; seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Temporary backend/frontend servers on `127.0.0.1:8397` and `127.0.0.1:3397`: pass; `/health` and `/admin/runs` returned HTTP `200`.
- Temporary Edge CDP on `127.0.0.1:9337`: pass; CDP endpoint was ready.
- Post-retry restore: pass; `uv run python -m backend.app.leads.demo_reset --apply` restored canonical synthetic demo rows after the retry check.
- Temporary listener cleanup: pass; no listeners remained on `8397`, `3397`, or `9337`.

Observed browser checks:

| Scenario | Result |
|---|---|
| Low-row `View details` click | Pass; clicking `View details for run_demo_queued` scrolled from `scrollY=324` to `scrollY=1178`, placed the detail panel at `top=0`, and recorded one app `scrollIntoView({ block: "start", behavior: "smooth" })` call |
| One-shot scroll | Pass; clicked detail recorded exactly one app scroll call |
| Focus transfer | Pass; focus moved to `#run-detail-heading`; pressing Tab afterward moved to the normal `Retry run run_demo_queued` button, so keyboard flow remained usable |
| Initial URL-selected detail | Pass; `/admin/runs?runId=run_demo_failed` rendered the detail with `scrollY=0`, zero app scroll calls, and no forced heading focus |
| Filter change after selected detail | Pass; applying `status=success` showed the selected-run-hidden notice, kept the selected detail visible, and kept scroll call count at `1` |
| Reduced motion | Pass; emulated `prefers-reduced-motion: reduce` returned `matchMedia=true` and recorded one app scroll call with `behavior: "auto"` |
| Retry refresh | Pass; clicking `Retry run run_demo_failed` showed retry success and `Attempt 3`, refreshed detail/history, and kept scroll call count at `1` |
| Browser console/runtime/network | Pass; `0` console warnings/errors, `0` runtime exceptions, and `0` non-local browser requests were observed |

### Skipped or limited checks

| Check | Status | Written reason |
|---|---|---|
| In-app Browser control path | skipped/blocked | The Browser skill was read, but `tool_search` did not expose the required `node_repl js` browser-control tool in this thread; no in-app Browser result is claimed |
| Playwright CLI path | skipped | `npx` exists, but no installed `playwright` or `playwright-cli` binary and no project Playwright dependency are present; dependency downloads/installs were out of scope |
| Real provider smoke | skipped | Explicitly forbidden; the project remains local/mock-only |
| GitHub Actions / CI | skipped | Explicitly forbidden and no workflow files were added or run |
| Deployment/staging validation | skipped | Explicitly forbidden and no deployment config was added |
| Commit/push/staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- The existing FastAPI/Starlette `TestClient` deprecation warning remains.
- Browser QA used Edge/CDP as a local fallback rather than the in-app Browser plugin because the required control tool was unavailable.
- Cleanup note: the temporary cleanup script parsed the numeric `frontendPort=3397` line as a candidate process id and `Stop-Process` reported stopping PID `3397` if present. The canonical demo seed was restored, no repository files were affected by cleanup, and no temporary QA listeners remained afterward. Future cleanup scripts should parse only process-id keys.

### Suggested commit message

```text
Tighten admin run detail scroll regression coverage
```

## Latest Update - 2026-06-10 Admin Runs Detail Auto-Scroll UX

### Phase summary

Implemented a scoped Admin run-history UX improvement: after a user activates `View details`, the same-page selected run detail panel scrolls into view once after the matching detail has rendered. The scroll uses smooth behavior by default and `auto` behavior when `prefers-reduced-motion: reduce` is active. Focus moves to the detail heading with `tabIndex={-1}` so keyboard and screen-reader users get context after the detail opens.

The behavior is gated by an interaction-only pending run-id ref. Initial URL-selected run detail loads, filter changes, data refreshes, retry refreshes, and unrelated rerenders do not trigger the new auto-scroll.

### Files changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.tsx` | Added pending detail scroll/focus refs, reduced-motion-aware scroll behavior, focusable detail/error headings, and one-shot scroll after clicked detail render |
| `apps/web/src/components/admin-run-history.test.tsx` | Added `scrollIntoView` and `matchMedia` mocks plus assertions for smooth scroll/focus, reduced-motion `auto` scroll, initial URL load no-scroll, and clicked error-state scroll/focus |
| `RUNBOOK.md` | Updated the existing admin manual verification checklist to include auto-scroll and focus confirmation |
| `STATE.md` | Recorded this phase, validation, skipped/rejected checks, manual QA steps, risks, and final status |

### Behavior changed

- Clicking `View details` scrolls to the top of the selected `Run detail` section after the selected detail is rendered.
- Normal motion preference uses smooth scrolling.
- Reduced-motion preference uses instant/`auto` scrolling.
- Focus moves to the loaded detail heading, or to the run-detail error heading if the clicked detail request fails.
- Retry outcome behavior and wording remain unchanged: retry is still a local recorded retry request and does not imply real CRM/Slack retry execution.

### Tests added or updated

| Test file | Coverage |
|---|---|
| `apps/web/src/components/admin-run-history.test.tsx` | Verifies clicked detail opens and calls `scrollIntoView({ block: "start", behavior: "smooth" })`, moves focus to the focusable heading, renders the selected run detail, uses `behavior: "auto"` for reduced motion, does not scroll on initial URL-selected detail load, and scrolls/focuses the clicked error state |

### Commands run and validation results

| Command | Result |
|---|---|
| `git status --short` | Initial status was clean |
| `pnpm --dir apps/web test -- --run admin-run-history` | Pass; Vitest `v3.2.4`, `1` test file passed, `40` tests passed |
| `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | Pass; Vitest `v3.2.4`, `5` test files passed, `56` tests passed |
| `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | Pass; Next.js `15.5.18` production build compiled successfully and generated `8` routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | Pass with existing warning; `67 passed, 1 warning in 2.38s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | Pass; `Success: no issues found in 28 source files` |
| `git diff --check` | Pass; exit 0 with only Git LF-to-CRLF working-copy warnings for modified files |

### Forbidden-pattern and local-only checks

| Check | Command | Result |
|---|---|---|
| Tracked token/private-key patterns | `git grep -n -I -E "sk-[A-Za-z0-9_-]{20,}\|xox[baprs]-[A-Za-z0-9-]{10,}\|gh[pousr]_[A-Za-z0-9_]{20,}\|AKIA[0-9A-Z]{16}\|AIza[0-9A-Za-z_-]{20,}\|ya29\.[0-9A-Za-z_-]+\|SG\.[0-9A-Za-z_-]{20,}\|supabase_service_role\|service_role\|-----BEGIN (RSA\|OPENSSH\|DSA\|EC\|PGP\|PRIVATE) KEY-----" -- . ":(exclude)STATE.md"` | Skipped/rejected; the approval reviewer rejected the scan because the user prompt labeled token/private-key searches under `Forbidden scans`. No workaround or indirect scan was attempted. |
| Tracked live-provider endpoint patterns | `git grep -n -I -E "api\.hubapi\.com\|hooks\.slack\.com\|slack\.com/api\|api\.openai\.com\|api\.anthropic\.com\|generativelanguage\.googleapis\.com\|sheets\.googleapis\.com\|supabase\.co/auth\|supabase\.co/rest\|service_role" -- . ":(exclude)STATE.md"` | Pass; `NO_MATCHES` |
| `.github/workflows` absence | `Test-Path -LiteralPath ".github\workflows"` | Pass; `False` |
| Tracked deployment config absence | `git ls-files -- .github .github/workflows vercel.json netlify.toml render.yaml render.yml railway.toml fly.toml fly.yml wrangler.toml wrangler.json wrangler.jsonc Dockerfile .dockerignore` | Pass; no output |

### Manual browser QA instructions

Use local synthetic/demo data only:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

In another PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then verify:

1. Open `http://127.0.0.1:3042/admin/runs`.
2. If needed, zoom out or use enough data/rows so the `Run detail` section is not initially visible.
3. Click `View details` on a run row.
4. Confirm the page scrolls automatically to the beginning of the `Run detail` section after the detail renders.
5. Confirm the correct selected run is shown.
6. Confirm keyboard focus moves to the `Run detail` heading.
7. Confirm retry outcome wording is unchanged and still clearly local-only.
8. Confirm no console errors.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| In-app Browser rendered QA | skipped/blocked | `tool_search` did not expose a callable in-app Browser control tool in this thread; it returned unrelated sub-agent/automation tools only. Manual browser QA instructions above are the required user verification path for rendered scroll behavior. |
| Playwright browser automation | skipped | Browser plugin runtime was unavailable and no project Playwright workflow is configured; no dependency install was requested or added |
| Real provider smoke | skipped | Explicitly forbidden; retry remains local persistence only and no real provider calls were made |
| GitHub Actions / CI | skipped | Explicitly forbidden and no workflow files were added |
| Deployment/staging validation | skipped | Explicitly forbidden and no deployment config was added |
| Commit/push/staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- Scroll/focus behavior was verified in jsdom component tests by mocking `scrollIntoView` and `matchMedia`; rendered browser interaction still needs manual verification on the local app because the in-app Browser runtime was unavailable.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains.
- The token/private-key scan was not run because the approval reviewer rejected the exact requested command due the prompt's `Forbidden scans` wording.

### Final git status

```text
 M RUNBOOK.md
 M STATE.md
 M apps/web/src/components/admin-run-history.test.tsx
 M apps/web/src/components/admin-run-history.tsx
```

No files were staged, committed, or pushed.

### Suggested commit message

```text
Add admin run detail auto-scroll
```

## Latest Update - 2026-06-10 RC Repair - Clarify Admin Run Retry Outcome

### Manual QA defect summary

Manual RC QA found that pressing `Retry run` for a failed admin run changed the persisted run state to `retried`, but the Admin run history and selected run detail did not clearly explain whether the retry request succeeded, failed, remained in progress, or only marked the run as retried. The backend retry contract was verified as synchronous local persistence only: it appends a `retried` attempt, updates the run to `retried`, writes a `manual_retry` audit event, and does not produce a separate CRM/Slack rerun success or failure result.

### Starting evidence

| Check | Result |
|---|---|
| Initial `git status --short` | ` M STATE.md` was already present before this repair; the existing `STATE.md` edit was preserved and this phase entry was added above it |
| Required retry search | `git grep -n -I -i -E "retry\|retried\|Retry" -- .` completed and identified the admin UI, retry tests, Next.js retry proxy, backend retry endpoint/policy, demo seed/reset logic, and backend retry tests |

### Owner layers identified

| Layer | File(s) |
|---|---|
| Admin runs history UI/component | `apps/web/src/components/admin-run-history.tsx` |
| Run detail UI/component | `apps/web/src/components/admin-run-history.tsx` |
| Retry button/action handler | `handleRetryRun` and `RetryStatusNotice` in `apps/web/src/components/admin-run-history.tsx` |
| Frontend retry API client | `apps/web/src/lib/run-history-api.ts` |
| Retry API/proxy route | `apps/web/src/app/api/leads/runs/[runId]/retry/route.ts` |
| Backend retry endpoint/service | `backend/app/leads/routes.py`, `backend/app/leads/retry.py`, `backend/app/leads/persistence.py` |
| Demo data / reset logic | `backend/app/leads/demo_seed.py`, `backend/app/leads/demo_reset.py`, `tests/test_demo_reset.py` |
| Existing tests | `apps/web/src/components/admin-run-history.test.tsx`, `apps/web/src/app/api/leads/runs/retry-route.test.ts`, `tests/test_lead_intake_api.py`, `tests/test_run_logging.py`, `tests/test_demo_reset.py` |

### Files changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.tsx` | Added explicit retry-outcome copy in the history table, in-flight notice, retry success notice, and retried run detail panel summary |
| `apps/web/src/components/admin-run-history.test.tsx` | Updated retry success/in-flight assertions and added a generic retry-proxy failure assertion |
| `tests/test_demo_reset.py` | Added coverage that demo reset restores canonical `run_demo_failed` after a retry-style mutation |
| `RUNBOOK.md` | Updated manual admin retry QA instructions to check the new explicit outcome text |
| `STATE.md` | Recorded this phase, evidence, commands, validation, manual QA instructions, risks, and final status |

### Behavior changed

- History table retried rows now include `Retry outcome: request succeeded and was recorded locally.` in the latest-attempt column.
- After pressing `Retry run`, the run detail notice now says `Retry succeeded for ...` and states the local manual retry attempt was recorded as `retried`.
- Retried run detail now shows a persistent outcome summary explaining that the local retry request succeeded and that no separate CRM/Slack retry success or failure result exists for this demo.
- Retry in-flight copy now says `Retry in progress: submitting local manual retry...`.
- Retry error paths continue to show explicit failure/blocking messages, including a generic `Retry failed through the local proxy.` path.

### Tests added or updated

| Test file | Coverage |
|---|---|
| `apps/web/src/components/admin-run-history.test.tsx` | Asserts retry success does not leave only an ambiguous `retried` state, verifies success outcome text in history and detail, verifies in-flight wording, and verifies explicit failed outcome text for a retry proxy failure |
| `tests/test_demo_reset.py` | Asserts demo reset restores the canonical failed demo run after a retry-style mutation adds a `retried` attempt and `manual_retry` audit event |

### Commands run and validation results

| Command | Result |
|---|---|
| `git status --short` | Started with pre-existing ` M STATE.md`; final status is listed below |
| `git grep -n -I -i -E "retry\|retried\|Retry" -- .` | Pass; retry handling locations identified |
| `pnpm --dir apps/web test -- --run admin-run-history` | Pass; `1` test file, `39` tests passed |
| `uv run --no-python-downloads --python 3.12 --frozen pytest tests/test_demo_reset.py` | Pass; `16 passed in 1.47s` |
| `pnpm --dir apps/web lint` | Pass; `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | Pass; Vitest `v3.2.4`, `5` files passed, `55` tests passed |
| `pnpm --dir apps/web typecheck` | Pass; `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | Pass; Next.js `15.5.18` production build compiled successfully and generated `8` routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | Pass with existing warning; `67 passed, 1 warning in 2.35s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | Pass; `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | Pass; `Success: no issues found in 28 source files` |
| `git diff --check` | Pass; exit 0 with only Git LF-to-CRLF working-copy warnings for modified files |

### Forbidden-pattern checks

| Check | Command | Result |
|---|---|---|
| Tracked token/private-key patterns | `git grep -n -I -E "sk-[A-Za-z0-9_-]{20,}\|xox[baprs]-[A-Za-z0-9-]{10,}\|gh[pousr]_[A-Za-z0-9_]{20,}\|AKIA[0-9A-Z]{16}\|AIza[0-9A-Za-z_-]{20,}\|ya29\.[0-9A-Za-z_-]+\|SG\.[0-9A-Za-z_-]{20,}\|supabase_service_role\|service_role\|-----BEGIN (RSA\|OPENSSH\|DSA\|EC\|PGP\|PRIVATE) KEY-----" -- . ":(exclude)STATE.md"` | Pass; `NO_MATCHES` |
| Tracked live-provider endpoint patterns | `git grep -n -I -E "api\.hubapi\.com\|hooks\.slack\.com\|slack\.com/api\|api\.openai\.com\|api\.anthropic\.com\|generativelanguage\.googleapis\.com\|sheets\.googleapis\.com\|supabase\.co/auth\|supabase\.co/rest\|service_role" -- . ":(exclude)STATE.md"` | Pass; `NO_MATCHES` |
| `.github/workflows` absence | `Test-Path -LiteralPath ".github\workflows"` | Pass; `False` |
| Tracked deployment config absence | `git ls-files -- .github .github/workflows vercel.json netlify.toml render.yaml render.yml railway.toml fly.toml fly.yml wrangler.toml wrangler.json wrangler.jsonc Dockerfile .dockerignore` | Pass; no output |

### Manual browser QA instructions

Use local synthetic/demo data only:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

In another PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then verify:

1. Open `http://127.0.0.1:3042/admin/runs`.
2. Select `View details` for `run_demo_failed`.
3. Click `Retry run`.
4. Confirm the transient notice says `Retry succeeded for run_demo_failed` and explains the local manual retry attempt was recorded as `retried`.
5. Confirm the history table row shows `Attempt 3: retried` plus `Retry outcome: request succeeded and was recorded locally.`
6. Confirm the detail panel shows `Retry outcome: request succeeded and was recorded locally.` and `No separate CRM/Slack retry success or failure result exists for this local demo.`
7. Confirm no real HubSpot, Slack, Google Sheets, OpenAI, paid API, webhook, deployment, CI, reset, edit, delete, send, archive, `PUT`, `PATCH`, or `DELETE` action appears or fires.
8. Run `uv run python -m backend.app.leads.demo_reset --apply` after the manual retry if canonical seeded demo data is needed again.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| In-app Browser visual QA | skipped/blocked | `tool_search` did not expose a callable in-app Browser control tool in this thread. Manual browser QA instructions above are the required user verification path for rendered UI. |
| Real provider smoke | skipped | Explicitly forbidden; retry remains local persistence only and no real provider calls were made |
| GitHub Actions / CI | skipped | Explicitly forbidden and no workflow files were added |
| Deployment/staging validation | skipped | Explicitly forbidden and no deployment config was added |
| Commit/push/staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- The backend retry contract still records a local manual retry attempt; it does not re-run CRM/Slack adapters or create a separate final downstream success/failed run. The repaired UI now states that boundary explicitly.
- Rendered browser QA was not executed because the in-app Browser control tool was unavailable in this thread; manual browser QA remains recommended before final portfolio signoff.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains.

### Final git status

```text
 M RUNBOOK.md
 M STATE.md
 M apps/web/src/components/admin-run-history.test.tsx
 M apps/web/src/components/admin-run-history.tsx
 M tests/test_demo_reset.py
```

`git diff --name-only` returned the same five files. `git diff --stat` reported `5 files changed, 452 insertions(+), 12 deletions(-)`. No files were staged, committed, or pushed.

### Suggested commit message

```text
Clarify admin retry outcome
```

## Latest Update - 2026-06-10 Portfolio Release Candidate Visual QA + Public Presentation Polish

### Phase summary

Performed the requested final release-candidate portfolio review. The repository remains clear, credible, mock-safe, and locally reproducible from the public docs. Source-of-truth docs, handoff docs, case-study/demo docs, screenshot references, local setup commands, validation gates, known limitations, mock/demo boundaries, no-paid-API posture, and no-live-provider defaults were checked.

No application behavior, backend code, frontend code, public API, schema, migration, dependency, lockfile, generated source, GitHub Actions workflow, deployment config, real-provider behavior, commit, push, staging action, or provider call was added or changed. No README, RUNBOOK, TDD, HANDOFF, demo asset, backend, frontend, migration, dependency, lockfile, CI, or deployment file needed edits. The only tracked edit is this `STATE.md` evidence entry.

### Files reviewed

| Path | Status | Review result |
|---|---|---|
| `README.md` | pass | Clearly explains project purpose, local setup, mock/demo mode, no paid API requirement, no live provider calls by default, validation commands, manual demo path, screenshots, and limitations |
| `RUNBOOK.md` | pass | Documents PowerShell setup, local PostgreSQL, backend/frontend startup, demo reset, smoke checks, manual QA, recording checklist, shutdown, troubleshooting, and validation commands |
| `TDD.md` | pass | Current test strategy and gate status match the local-only backend/frontend coverage without claiming production, deployment, CI, auth, live-provider, or full browser E2E coverage |
| `STATE.md` | updated | Prior RC evidence was present; this entry records the current visual/documentation review, validation, scans, smoke, skipped checks, risks, and git status |
| `HANDOFF.md` | pass | Documents reviewer path, mock adapter boundaries, before/after workflow, 3-5 minute demo sequence, and credential handling rules |
| `docs/DEMO_SCRIPT.md` | pass | Provides a concise local reviewer checklist and explicitly excludes real providers, paid APIs, CI, deployment, and real credentials |
| `docs/DEMO_ASSETS.md` | pass | Documents local screenshot/GIF/video capture rules, local URLs, synthetic data, and optional recording assets without overclaiming committed video output |
| `docs/CASE_STUDY.md` | pass | Presents the fake-client problem, local solution, stack, validation, and mock/synthetic-data boundary accurately |
| `docs/assets/README.md` | pass | Confirms committed screenshots are local-only captures using synthetic data and mocked CRM/Slack adapters |
| `docs/assets/screenshots/*` | pass | Referenced screenshot files are present: home, CSV/session dashboard, admin run history, failed detail, filtered detail, empty filter, docs, mobile home, and mobile admin |

### Files changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded the RC visual/documentation review, local smoke fallback, full gates, forbidden-pattern scans, skipped checks, risks, and git status |

### Scope confirmation

- Documentation/state evidence update only.
- Provider behavior stayed mock/demo/read-only by default.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider call was made.
- No secrets were printed, stored, logged, screenshotted, or added.
- No GitHub Actions, CI, deployment, staging, hosted automation, dependency change, lockfile change, migration, commit, push, or staging action was introduced.
- Temporary smoke logs were written under ignored `logs/`; no tracked generated artifact was introduced.

### Starting repository state

| Check | Status | Result |
|---|---|---|
| Initial changed files | pass | `git status --short` returned no output before any edit |
| Initial staged files | pass | `git diff --cached --name-only` returned no output |
| Pre-update tracked diff | pass | `git diff --name-only` returned no output before this `STATE.md` update |

### Local mock setup and smoke

The local demo was started in mock/demo mode only. `.env` already existed and was not printed. Local PostgreSQL was started through Docker Compose, Alembic reached head, and guarded demo reset restored synthetic seeded data.

Setup commands:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8128 --log-level warning
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8128"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8128"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3142
```

| Check | Status | Result |
|---|---|---|
| Local PostgreSQL | pass | `docker compose up -d postgres` reported `salesops-postgres Running`; `docker compose ps` showed the service healthy on port `5432` |
| Alembic migration | pass | PostgreSQL Alembic context initialized and migration command reached head |
| Guarded demo reset | pass | Reset applied and seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Backend health | pass | `GET http://127.0.0.1:8128/health` returned `status=ok` |
| Frontend home route | pass | `GET http://127.0.0.1:3142/` returned HTTP `200` and contained `Lead intake form` and `CSV import` |
| Frontend admin route | pass | `GET http://127.0.0.1:3142/admin/runs` returned HTTP `200` and contained `Admin run history` |
| Filter/detail routes | pass | The documented admin URLs for status, source, search, owner, error type, empty state, and selected-run-hidden state all returned HTTP `200` |
| Run-history proxy | pass | `GET http://127.0.0.1:3142/api/leads/runs` returned all four seeded run IDs |
| Run-detail proxy | pass | `GET http://127.0.0.1:3142/api/leads/runs/run_demo_failed` returned `run_status=failed` and did not match risky `secret`, `token`, `private key`, or `phone` strings |
| Retry proxy | pass | `POST http://127.0.0.1:3142/api/leads/runs/run_demo_failed/retry` returned `run_status=retried` and `attempt_count=3` |
| Demo restore after retry | pass | `uv run python -m backend.app.leads.demo_reset --apply` restored canonical seeded demo data after retry mutation |
| Docs route | pass | `GET http://127.0.0.1:3142/docs` followed the local redirect to `http://127.0.0.1:8128/docs` and returned Swagger UI content |
| Smoke process cleanup | pass | Smoke-owned listeners on ports `8128` and `3142` were stopped; PostgreSQL was left running as the documented local demo service |

Smoke notes:

- In-app browser visual QA was intended, but the Browser skill's required Node/browser control tool (`node_repl js`) was not exposed by tool discovery in this thread. Browser QA was therefore not claimed as passed.
- The fallback was the strongest available PowerShell-only local HTTP/API smoke across the same routes and proxy paths, including local retry and `/docs` redirect verification.
- One early frontend startup command used malformed environment variable quoting and was restarted after stopping only the smoke-owned frontend listener.
- One early smoke script used `$home`, which conflicts with PowerShell's read-only `$HOME`; the script was corrected to `$homeResponse` and rerun successfully.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `pnpm --dir apps/web lint` | pass | `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `5` test files passed; `54` tests passed; duration `12.80s` |
| `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18` production build compiled successfully; generated `8` app routes including `/`, `/admin/runs`, local API proxies, retry proxy, and `/docs` |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass with existing warning | Python `3.12.13`; `66 passed, 1 warning in 2.27s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 28 source files` |
| `git diff --check` before this `STATE.md` update | pass | Exit 0 with no whitespace errors |
| `git diff --check` after this `STATE.md` update | pass | Exit 0 with no whitespace errors; Git emitted only an LF-to-CRLF working-copy warning for `STATE.md` |

### Forbidden-pattern and local-only posture scans

| Check | Status | Result |
|---|---|---|
| Tracked token/private-key scan | pass | `git grep -n -I -E "sk-[A-Za-z0-9_-]{20,}\|xox[baprs]-[A-Za-z0-9-]{10,}\|gh[pousr]_[A-Za-z0-9_]{20,}\|AKIA[0-9A-Z]{16}\|AIza[0-9A-Za-z_-]{20,}\|ya29\.[0-9A-Za-z_-]+\|SG\.[0-9A-Za-z_-]{20,}\|supabase_service_role\|service_role\|-----BEGIN (RSA\|OPENSSH\|DSA\|EC\|PGP\|PRIVATE) KEY-----" -- . ":(exclude)STATE.md"` returned no matches; exit 1 was treated as the expected no-match result |
| Tracked live-provider endpoint scan | pass | `git grep -n -I -E "api\.hubapi\.com\|hooks\.slack\.com\|slack\.com/api\|api\.openai\.com\|api\.anthropic\.com\|generativelanguage\.googleapis\.com\|sheets\.googleapis\.com\|supabase\.co/auth\|supabase\.co/rest\|service_role" -- . ":(exclude)STATE.md"` returned no matches; exit 1 was treated as the expected no-match result |
| GitHub workflow directory | pass | `Test-Path -LiteralPath ".github\workflows"` returned `False` |
| Tracked deployment config paths | pass | `git ls-files -- .github .github/workflows vercel.json netlify.toml render.yaml render.yml railway.toml fly.toml fly.yml wrangler.toml wrangler.json wrangler.jsonc Dockerfile .dockerignore` returned no output |

### Skipped or limited checks

| Check | Status | Written reason |
|---|---|---|
| In-app browser visual QA | skipped/blocked | The installed Browser skill was read, but the required Node/browser control tool was unavailable through tool discovery in this thread. Visual browser QA is not claimed as passed. |
| PowerShell HTTP/API fallback | pass | Used instead of browser QA because browser tooling was unavailable; covered documented local frontend routes, local API proxies, retry proxy, and `/docs` redirect |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and outside the local mock-only project boundary |
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow files exist or were added |
| Deployment/staging validation | skipped | Explicitly forbidden; no deployment or staging config exists or was added |
| Dependency install, upgrade, or removal | skipped | Existing dependencies were already available; no dependency or lockfile change was needed |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Final git status

| Check | Status | Result |
|---|---|---|
| Final changed files | pass | `git status --short` returned only ` M STATE.md`; `git diff --name-only` returned only `STATE.md` |
| Diff stat | pass | `STATE.md | 145 +...`; 1 file changed with documentation evidence only |
| Staging area | pass | No staging action was run |

### Remaining risks

- Fresh visual browser QA was blocked by missing browser-control tooling in this thread, so final layout/console/network claims are limited to prior documented evidence plus the current PowerShell HTTP/API smoke.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains.
- Local PostgreSQL may remain running because it is the documented local demo service; stop it manually with `docker compose stop postgres` when not needed.
- Future real CRM/Slack/provider work remains documentation-only and must be a separately approved phase.

### Suggested commit message

```text
Record portfolio RC visual QA audit
```

## Latest Update - 2026-06-10 Portfolio Final Packaging / Public Review Prep

### Phase summary

Reviewed the repository for public portfolio presentation after RC manual acceptance. This was a packaging/review phase only: source-of-truth docs, portfolio/demo docs, local-first setup, mock-only CRM/Slack boundaries, no-paid-API posture, local run/reset commands, validation commands, and reviewer/client first-look guidance were checked.

No application behavior, backend code, frontend code, migrations, dependencies, lockfiles, generated source, GitHub Actions, deployment/staging config, real provider behavior, commit, push, or staging action was added or changed. The only required edit is this `STATE.md` entry with fresh review and validation evidence.

### Files changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded the portfolio final packaging review, docs review, full local gates, forbidden-pattern scans, PowerShell-only smoke, skipped checks, risks, and git status summary |

No README, RUNBOOK, TDD, HANDOFF, demo asset, backend, frontend, dependency, lockfile, migration, CI, or deployment file needed changes.

### Scope confirmation

- Documentation/state packaging review only.
- Local-first and mock-only boundaries remain clear.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider call was made.
- No secrets were printed, stored, logged, screenshotted, or added.
- No GitHub Actions, CI, deployment, staging, hosted automation, real-provider behavior, dependency change, lockfile churn, commit, push, or staging action was introduced.

### Docs reviewed

| Document | Status | Review result |
|---|---|---|
| `README.md` | pass | Clearly explains what the project does, local-first setup, mock CRM/Slack behavior, no paid API requirement, backend/frontend run commands, demo reset, validation gates, screenshots, reviewer path, and limitations |
| `RUNBOOK.md` | pass | Contains reproducible PowerShell-compatible setup, database, backend, frontend, reset, local smoke, manual QA, recording, shutdown, and troubleshooting steps |
| `TDD.md` | pass | Describes local tests and known coverage without claiming production, live-provider, deployment, auth, CI, or full visual E2E readiness |
| `STATE.md` | updated | Prior RC acceptance was present; this entry records the current packaging review and fresh gate results |
| `HANDOFF.md` | pass | Documents the safe local handoff path, mock adapter boundaries, before/after workflow, 3-5 minute demo sequence, and credential handling rules |
| `docs/DEMO_SCRIPT.md` | pass | Provides a concise local reviewer checklist and explicitly excludes real providers, paid APIs, CI, deployment, and real credentials |
| `docs/DEMO_ASSETS.md` | pass | Documents local screenshot/GIF/video capture rules, local URLs, synthetic data, and optional recording assets without overclaiming committed video output |
| `docs/CASE_STUDY.md` | pass | Presents the fake-client problem, local solution, stack, validation, and mock/synthetic-data boundary accurately |
| `docs/assets/README.md` | pass | Confirms committed screenshots are local-only captures using synthetic data and mocked CRM/Slack adapters |

### Starting repository state

| Check | Status | Result |
|---|---|---|
| Initial changed files | pass | `git status --short` returned no output before this phase's `STATE.md` update |
| Smoke temp artifacts | pass | Temporary `.scratch\portfolio-smoke` logs from smoke debugging were removed; existing non-smoke `.scratch` content was left untouched |

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `pnpm --dir apps/web lint` | pass | `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `5` test files passed; `54` tests passed; duration `18.52s` |
| `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18` production build compiled successfully; generated `8` app routes including `/`, `/admin/runs`, local API proxies, retry proxy, and `/docs` |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass with existing warning | Python `3.12.13`; `66 passed, 1 warning in 2.56s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 28 source files` |
| `git diff --check` before this `STATE.md` update | pass | Exit 0 with no whitespace errors |
| `git diff --check` after this `STATE.md` update | pass | Exit 0 with no whitespace errors; Git emitted only an LF-to-CRLF working-copy warning for `STATE.md` |

### Forbidden-pattern and local-only posture scans

| Check | Status | Exact command/result |
|---|---|---|
| Secret/token/private-key scan | pass | `git grep -n -I -E "sk-[A-Za-z0-9_-]{20,}\|xox[baprs]-[A-Za-z0-9-]{10,}\|gh[pousr]_[A-Za-z0-9_]{20,}\|AKIA[0-9A-Z]{16}\|AIza[0-9A-Za-z_-]{20,}\|ya29\.[0-9A-Za-z_-]+\|SG\.[0-9A-Za-z_-]{20,}\|supabase_service_role\|service_role\|-----BEGIN (RSA\|OPENSSH\|DSA\|EC\|PGP\|PRIVATE) KEY-----" -- . ":(exclude)STATE.md"` returned no output; exit 1 means no matches |
| Live-provider endpoint scan | pass | `git grep -n -I -E "api\.hubapi\.com\|hooks\.slack\.com\|slack\.com/api\|api\.openai\.com\|api\.anthropic\.com\|generativelanguage\.googleapis\.com\|sheets\.googleapis\.com\|supabase\.co/auth\|supabase\.co/rest\|service_role" -- . ":(exclude)STATE.md"` returned no output; exit 1 means no matches |
| GitHub workflow directory | pass | `Test-Path -LiteralPath ".github\workflows"` returned `False` |
| Tracked deployment config paths | pass | `git ls-files -- .github .github/workflows vercel.json netlify.toml render.yaml render.yml railway.toml fly.toml fly.yml wrangler.toml wrangler.json wrangler.jsonc Dockerfile .dockerignore` returned no output |

### PowerShell-only local smoke

Smoke followed the documented local route with local PostgreSQL, Alembic, guarded demo reset, temporary local backend/frontend servers, local API proxy checks, one local retry, demo data restore, and temporary listener cleanup.

Commands and setup used:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8128 --log-level warning
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8128"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8128"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3142
```

| Check | Status | Result |
|---|---|---|
| Local PostgreSQL | pass | `docker compose up -d postgres` reported `salesops-postgres Running` |
| Alembic migration | pass | PostgreSQL Alembic context initialized and migration command reached head |
| Guarded demo reset | pass | Reset applied against local synthetic demo data and seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Backend health | pass | `GET http://127.0.0.1:8128/health` returned HTTP `200` |
| Frontend home route | pass | `GET http://127.0.0.1:3142/` returned HTTP `200` and contained `Lead intake form` and `CSV import` |
| Frontend admin route | pass | `GET http://127.0.0.1:3142/admin/runs` returned HTTP `200` and contained `Admin run history` |
| Frontend run-history proxy | pass | `GET http://127.0.0.1:3142/api/leads/runs` returned seeded local runs: `run_demo_queued`, `run_demo_retried`, `run_demo_failed`, and `run_demo_success` |
| Frontend run-detail proxy | pass | `GET http://127.0.0.1:3142/api/leads/runs/run_demo_failed` returned the selected failed run without `phone`, `secret`, `token`, or private-key strings |
| Local retry proxy | pass | `POST http://127.0.0.1:3142/api/leads/runs/run_demo_failed/retry` returned a `retried` state |
| Demo restore after retry | pass | `uv run python -m backend.app.leads.demo_reset --apply` restored canonical seeded demo data after the retry mutation |
| Local docs route | pass | `GET http://127.0.0.1:3142/docs` followed the local redirect and returned HTTP `200` with Swagger/OpenAPI documentation content |
| Temporary listener cleanup | pass | Smoke-owned backend/frontend listeners on ports `8128` and `3142` were stopped; final listener checks returned `False` for both ports |

Smoke debugging notes:

- One early combined smoke attempt timed out waiting for `http://127.0.0.1:3042/`; cleanup checks showed the temporary listener was stopped and no app assertion had run.
- One frontend startup command failed because PowerShell treats `$HOME`/`$home` as a read-only built-in variable. The command was corrected to use `$homeResponse`; this was a smoke-script issue, not an application failure.
- The final segmented PowerShell smoke passed.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Visual Browser/Playwright QA | limited | The phase required PowerShell commands only, so smoke used local HTTP/API checks instead of browser automation or screenshots |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and outside the local mock-only project boundary |
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow files exist or were added |
| Deployment/staging validation | skipped | Explicitly forbidden; no deployment or staging config exists or was added |
| Dependency install, upgrade, or removal | skipped | Existing dependencies were already available; no dependency or lockfile change was needed |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Git status summary

| Check | Status | Result |
|---|---|---|
| Before documentation update | pass | `git status --short` returned no output |
| After documentation update | pass | `git status --short` returned only ` M STATE.md` |
| Staging area | pass | No staging action was run |

### Remaining risks

- This phase used PowerShell HTTP/API smoke rather than a fresh visual browser pass because the user required PowerShell commands only.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains.
- Local PostgreSQL may remain running because it is the documented local demo service; stop it manually with `docker compose stop postgres` when not needed.
- Future real CRM/Slack/provider work remains documentation-only and must be a separately approved phase.

### Suggested commit message

```text
Record portfolio packaging review
```

## Latest Update - 2026-06-10 RC Manual Acceptance + Portfolio Packaging Review

### Phase summary

Performed the requested final manual acceptance and portfolio packaging review against the current RC state. The project remains ready to show as a local-first portfolio repository: README, RUNBOOK, TDD, and STATE were reviewed for setup accuracy, mock-only provider boundaries, current gate evidence, skipped checks, risks, and reproducibility from docs.

No runtime product behavior, API route, UI feature, backend logic, migration, dependency, lockfile, GitHub Actions workflow, deployment config, real provider integration, staging action, commit, push, or git staging was added or performed. The only file changed in this phase is `STATE.md` to record the new review evidence.

### Files changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded the RC manual acceptance, docs review, safety scan, quality gate, local smoke, skipped-check, risk, and next-phase evidence |

### Scope confirmation

- Documentation/portfolio acceptance review only.
- No product feature expansion.
- No source-code, dependency, migration, lockfile, generated source, GitHub Actions, deployment, provider, commit, push, or staging changes.
- No paid API usage.
- No real HubSpot, Slack, Google Sheets, OpenAI, webhook, production API, or external provider call.
- No secrets were printed, stored, logged, screenshotted, or added to source files.

### Starting repository state

| Check | Status | Result |
|---|---|---|
| Initial changed files | pass | `git status --short` returned no output before this phase's `STATE.md` update |
| Staged files | pass | `git diff --cached --name-only` returned no output |
| GitHub workflow files | pass | `Test-Path -LiteralPath ".github\workflows"` returned `False`; `git ls-files -- .github` returned no output |
| Deployment config files | pass | No tracked `.github`, workflow, Vercel, Netlify, Render, Railway, Fly, Wrangler, Dockerfile, or `.dockerignore` deployment config paths were found |

### Docs reviewed

| Document | Status | Review result |
|---|---|---|
| `README.md` | pass | Accurate local-first portfolio positioning, clear setup/demo instructions, mock-only CRM/Slack boundary, no paid API requirement, and no misleading production/deployment claim found |
| `RUNBOOK.md` | pass | Includes local PostgreSQL/Docker Compose, Alembic, backend, frontend, demo reset, smoke checklist, recording checklist, shutdown, and cleanup guidance |
| `TDD.md` | pass | Current strategy and gate status match the implemented backend/frontend tests; coverage is not presented as live-provider, E2E browser, production, deployment, auth, or CI coverage |
| `STATE.md` | updated | Prior RC evidence was present; this new top entry records the current manual acceptance run, current gate outputs, skipped checks, risks, and next recommended phase |

### Forbidden-pattern and local-only posture checks

| Check | Status | Result |
|---|---|---|
| Tracked token/private-key scan excluding `STATE.md` self-references | pass | No matches for OpenAI-style keys, Slack tokens, GitHub tokens, AWS keys, Google API/OAuth tokens, SendGrid keys, service-role strings, or private-key markers |
| Tracked live-provider endpoint scan excluding `STATE.md` self-references | pass | No matches for live HubSpot, Slack API/webhook, OpenAI, Anthropic, Google Gemini/Sheets, Supabase auth/rest, or service-role endpoint patterns |
| Staged files | pass | No staged files |
| GitHub Actions / workflows | pass | No tracked workflow files and `.github\workflows` is absent |
| Deployment config | pass | No tracked deployment config files found |

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `pnpm --dir apps/web lint` | pass | `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `5` test files passed; `54` tests passed; duration `16.94s` |
| `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18` production build compiled successfully; generated `8` app routes including `/`, `/admin/runs`, local API proxies, retry proxy, and `/docs` |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass with existing warning | Python `3.12.13`; `66 passed, 1 warning in 2.62s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 28 source files` |
| `git diff --check` after this `STATE.md` update | pass | Exit 0 with no whitespace errors; Git emitted only an LF-to-CRLF working-copy notice for `STATE.md` |

### Local smoke result

PowerShell-only local smoke followed the documented RUNBOOK path on `127.0.0.1` with temporary backend/frontend jobs and no real provider calls:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028 --log-level warning
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

| Check | Status | Result |
|---|---|---|
| Local PostgreSQL | pass | `docker compose up -d postgres` reported `salesops-postgres Running` |
| Alembic migration | pass | PostgreSQL Alembic context initialized and migration command reached head |
| Guarded demo reset | pass | Reset applied against local synthetic demo data |
| Backend health | pass | `GET http://127.0.0.1:8028/health` returned `status=ok` |
| Frontend home route | pass | `GET http://127.0.0.1:3042/` returned HTTP `200` and included `Lead intake form` and `CSV import` |
| Frontend admin route | pass | `GET http://127.0.0.1:3042/admin/runs` returned HTTP `200` and included `Admin run history` |
| Frontend run-history proxy | pass | `GET http://127.0.0.1:3042/api/leads/runs` returned seeded local runs including `run_demo_success`, `run_demo_failed`, `run_demo_queued`, and `run_demo_retried` |
| Frontend run-detail proxy | pass | `GET http://127.0.0.1:3042/api/leads/runs/run_demo_failed` returned the selected failed run without risky raw `phone`, `secret`, or `token` fields |
| Local retry proxy | pass | `POST http://127.0.0.1:3042/api/leads/runs/run_demo_failed/retry` updated the local run to `retried` with `attempt_number` 3 |
| Demo restore | pass | `uv run python -m backend.app.leads.demo_reset --apply` restored the four canonical seeded demo runs after retry mutation |
| Temporary process cleanup | pass | Temporary backend and frontend listeners on ports `8028` and `3042` were stopped; final port checks returned `False` for both listeners |

Smoke note: the first smoke script attempt failed before app verification because PowerShell treats `$HOME`/`$home` as a read-only built-in variable. No app failure was observed, no retry mutation had run yet, and follow-up port checks showed no leftover listeners. The corrected PowerShell smoke passed.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Visual browser/manual UI QA in this phase | limited | This phase explicitly required PowerShell commands only, so the smoke used local HTTP/API checks rather than Browser/Playwright visual automation |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not required; the project remains mock-only and local-first |
| GitHub Actions / CI | skipped | Explicitly forbidden for this phase and not present in the repo |
| Dependency install or upgrade | skipped | Existing local dependencies were already present and no new dependency was needed |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- This phase's live smoke was PowerShell HTTP/API based, not a fresh visual browser QA pass, because the phase required PowerShell commands only.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains.
- Local PostgreSQL is running after smoke because it is the documented local demo service; stop it manually with `docker compose stop postgres` when not needed.

### Next recommended phase

User manual review, then manual staging/commit/push if the recorded RC evidence and final diff are acceptable. Optional next portfolio step is recording the 3-5 minute demo using `docs/DEMO_ASSETS.md` and `docs/DEMO_SCRIPT.md`.

### Suggested commit message

```text
Record RC manual acceptance review
```

## Latest Update - 2026-06-10 RC Final Documentation And Release-Readiness Audit

### Phase summary

Audited the local reviewer/client handoff path and tightened stale documentation wording only. No runtime product behavior, API route, UI feature, backend logic, migration, dependency, GitHub Actions workflow, provider integration, deployment, staging action, commit, push, or git staging was added or performed.

The documented demo path remains local-first and mock-only: PostgreSQL runs through Docker Compose, backend commands use `uv`, frontend commands use `pnpm`, CRM and Slack behavior remains deterministic mock behavior, and no real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call is required.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Aligned local validation commands with the strict RC gate commands |
| `RUNBOOK.md` | Updated the current phase label and local validation command order |
| `TDD.md` | Recorded final RC gate and smoke status |
| `STATE.md` | Recorded this release-readiness audit, validation, smoke result, limitations, and risks |

### Scope confirmation

- Documentation-only phase.
- No product feature expansion.
- No real provider/API calls.
- No paid API usage.
- No dependency additions, removals, or upgrades.
- No GitHub Actions or CI files.
- No commit, push, staging, branch operation, deployment, or hosted automation.
- No secrets were printed, stored, logged, or added to source files.

### Automated validation

| Command | Status | Result |
|---|---|---|
| `pnpm --dir apps/web lint` | pass | `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | pass | `5` test files passed, `54` tests passed |
| `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18` production build completed; route list included `/`, `/admin/runs`, local API proxies, retry proxy, and `/docs` |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass with existing warning | `66 passed, 1 warning in 2.46s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 28 source files` |
| Tracked live-endpoint and secret-pattern scan excluding `STATE.md` | pass | No matches for live provider endpoints, token-shaped secrets, service-role strings, or private-key markers |
| GitHub Actions workflow check | pass | `.github/workflows` is absent |
| `git diff --check` | pass | Exit 0 after final documentation edits |

### Local smoke result

Smoke followed the documented local path after documentation updates:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028 --log-level warning
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

| Check | Status | Result |
|---|---|---|
| Local PostgreSQL | pass | `salesops-postgres` was already running and healthy; it was left running intentionally |
| Alembic migration | pass | Local PostgreSQL migration check reached head |
| Guarded demo reset | pass | Reset applied against local synthetic demo data and seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Backend health | pass | `GET http://127.0.0.1:8028/health` returned `status=ok` |
| Frontend admin route | pass | `GET http://127.0.0.1:3042/admin/runs` returned HTTP 200 |
| Frontend run-history proxy | pass | `GET http://127.0.0.1:3042/api/leads/runs` returned the seeded local run data |
| Browser home/admin render | pass | Headless Chrome loaded `/` with `Lead intake form` and `CSV import`, then loaded `/admin/runs` with seeded `run_demo_failed` detail and retry action |
| Browser retry behavior | pass | Clicked `Retry run` for `run_demo_failed`; page showed `Retry recorded for run_demo_failed` and `Attempt 3` |
| Direct retry-state check | pass | Local detail response showed three attempts and latest attempt status `retried` |
| Browser network locality | pass | No remote HTTP or WebSocket requests, no failed requests, no console warnings/errors, and no runtime exceptions; one inline `data:` SVG URL was observed and did not leave the browser |
| Demo restore | pass | `uv run python -m backend.app.leads.demo_reset --apply` restored canonical seeded data after the retry mutation |
| Temporary process cleanup | pass | Temporary backend, frontend, and headless Chrome listeners on ports `8028`, `3042`, and `9234` were stopped; final port checks returned no listeners |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; the project remains local/mock-only |
| GitHub Actions / CI | skipped | Explicitly forbidden for this phase |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |
| In-app Browser plugin path | limited | Browser skill was loaded, but tool discovery returned no callable `node_repl js` browser-control tool in this thread |
| Playwright path | skipped | The project does not include Playwright, and no dependency was added |

### Remaining risks

- Browser smoke used installed local headless Chrome through DevTools because the in-app Browser control tool was unavailable.
- The first temporary frontend smoke process was started without the backend env inherited and correctly failed against the default local `127.0.0.1:8000`; it was stopped and restarted with the documented env before the passing smoke.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains.
- PostgreSQL was left running because it is the documented local demo service and was already healthy before this audit.

### Suggested commit message

```text
Finalize local handoff documentation
```

## Latest Update - 2026-06-10 Admin Retry Proxy/UI Release-Candidate Cleanup

### Phase summary

Added narrow release-candidate confidence for the existing admin retry behavior without changing runtime product behavior. The Next.js retry proxy now has direct route-handler tests for backend response preservation and safe backend-unreachable handling, and the admin component tests now cover in-flight retry disabling to prevent accidental duplicate submissions.

No public API, backend route, runtime frontend behavior, database migration, dependency, reset UI, provider reset control, unsafe reset endpoint, GitHub Actions workflow, real provider call, paid API call, staging action, commit, or push was added or performed.

### Files changed

| Path | Purpose |
|---|---|
| `apps/web/src/app/api/leads/runs/retry-route.test.ts` | Added direct route-handler coverage for the retry proxy success, `403`, `404`, `409`, and backend-unreachable `502` paths |
| `apps/web/src/components/admin-run-history.test.tsx` | Added in-flight retry coverage proving the retry button disables, avoids duplicate POSTs, and still refreshes history/detail after completion |
| `TDD.md` | Documented retry proxy route-handler coverage and duplicate-submit guard coverage |
| `STATE.md` | Recorded this phase, validation, smoke results, skipped checks, risks, and git status |

### Safety guardrails preserved

- Runtime code was not changed; this phase added tests and source-of-truth documentation only.
- No frontend demo reset control, provider reset control, unsafe reset endpoint, edit/delete/send/archive action, or non-local provider mutation was added.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider call was made.
- No dependency, migration, GitHub Actions workflow, staging action, commit, push, or branch operation was performed.

### Automated validation

| Command | Status | Result |
|---|---|---|
| `pnpm --dir apps/web test -- --run src/components/admin-run-history.test.tsx` | pass | `1 passed`; `38 tests` passed |
| `pnpm --dir apps/web test -- --run src/app/api/leads/runs/retry-route.test.ts` | pass | `1 passed`; `5 tests` passed |
| `pnpm --dir apps/web lint` | pass | `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | pass | `5 passed`; `54 tests` passed |
| `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | pass | Next.js build completed; route list includes `/api/leads/runs/[runId]/retry` |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass with existing warning | `66 passed, 1 warning in 2.52s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 28 source files` |
| Runtime forbidden-control scan | pass | No matches in runtime admin/API files for demo reset, provider reset, edit/delete/send/archive/resubmit/rerun/worker/background-job controls, or `PUT`/`PATCH`/`DELETE` actions |
| Broad forbidden-control scan | limited/pass | Only matched `delete process.env...` cleanup in the new test file; no runtime UI/API match |
| Tracked live-endpoint scan excluding `STATE.md` | pass | No live HubSpot, Slack, OpenAI, Anthropic, Google, Supabase, or service-role endpoint matches |
| Tracked token/private-key scan excluding `STATE.md` | pass | No token-like or private-key matches |
| GitHub Actions workflow check | pass | `.github/workflows` is absent |
| `git diff --check` | pass | Exit 0; Git reported LF-to-CRLF working-copy notices, with no whitespace errors |

### Rendered admin retry smoke

Temporary local smoke setup followed the existing `RUNBOOK.md` path:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028 --log-level warning
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

| Check | Status | Result |
|---|---|---|
| Backend health | pass | `GET http://127.0.0.1:8028/health` returned `status=ok` |
| Frontend route | pass | Headless Edge loaded `http://127.0.0.1:3042/admin/runs` with title `SalesOps Workflow Automation Hub` |
| Rendered retry path | pass | Opened `run_demo_failed`, clicked `Retry run`, saw `Retry recorded for run_demo_failed`, and saw `Attempt 3` in refreshed detail |
| Direct proxy detail after retry | pass | `GET /api/leads/runs/run_demo_failed` returned `run_status=retried`, `attempt_count=3`, latest attempt `3/retried` |
| Console/runtime health | pass | Edge/CDP collected no console warnings/errors and no runtime exceptions |
| Network locality | pass | Edge/CDP collected no non-local browser requests and no failed requests |
| Forbidden controls | pass | Visible controls were `Lead demo`, `Reset filters`, and `View details`; no forbidden reset/provider/edit/delete/send/archive/resubmit/rerun/worker controls were visible |
| Post-smoke restore | pass | `uv run python -m backend.app.leads.demo_reset --apply` restored canonical seeded rows after the live local retry |
| Temporary process cleanup | pass | Temporary backend, frontend, and Edge CDP listeners on ports `8028`, `3042`, and `9234` were stopped; final checks showed no remaining listeners |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; project remains local/mock-only |
| GitHub Actions / CI | skipped | Explicitly forbidden |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |
| In-app Browser plugin path | limited | Browser plugin was listed, but tool discovery did not expose usable browser-control tools in this thread |
| Playwright CLI path | limited | `pnpm --dir apps/web exec playwright --version` failed because Playwright is not installed; no dependency was added |

### Remaining risks

- Rendered smoke used a desktop headless Edge/CDP fallback instead of the in-app Browser plugin because no browser-control tool was available.
- Browser smoke covered the retry success path; automated route/component tests cover `403`, `404`, `409`, backend-unreachable, and duplicate-submit behavior.
- PostgreSQL was left running because it was already part of the documented local demo path.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains.

### Git status

```text
 M STATE.md
 M TDD.md
 M apps/web/src/components/admin-run-history.test.tsx
?? apps/web/src/app/api/leads/runs/retry-route.test.ts
```

### Suggested commit message

```text
Add admin retry proxy coverage
```

## Latest Update - 2026-06-10 Frontend/Admin Retry UI Hardening

### Phase summary

Implemented the frontend/admin hardening phase for manual lead-run retry behavior. The admin run detail panel now exposes `Retry run` only for selected failed or queued runs, posts through a local Next.js retry proxy, preserves backend `403`, `404`, and `409` meanings in user-visible messages, and refreshes run history plus selected detail after a successful retry.

No backend API contract, database migration, reset endpoint, reset UI, GitHub Actions workflow, real provider call, paid API call, staging action, commit, or push was added or performed.

### Files changed

| Path | Purpose |
|---|---|
| `apps/web/src/app/api/leads/runs/[runId]/retry/route.ts` | Added local Next.js POST proxy to the existing backend retry endpoint while preserving backend status/body |
| `apps/web/src/lib/types.ts` | Added the typed retry response contract |
| `apps/web/src/lib/run-history-api.ts` | Added `retryRun` client helper with normalized backend error handling |
| `apps/web/src/components/admin-run-history.tsx` | Added eligible detail-panel retry action, success refresh, status-specific retry errors, and local-only admin copy |
| `apps/web/src/components/admin-run-history.test.tsx` | Added retry success, `403`, `404`, `409`, non-retryable visibility, and no-reset-control coverage |
| `README.md`, `RUNBOOK.md`, `DESIGN.md`, `TDD.md`, `REQ.md`, `CONTEXT.md`, `HANDOFF.md` | Updated source-of-truth behavior from read-only/backend-only retry to guarded local admin retry |
| `docs/CASE_STUDY.md`, `docs/DEMO_ASSETS.md`, `docs/DEMO_SCRIPT.md` | Updated portfolio/demo guidance for local-only guarded retry |
| `STATE.md` | Recorded this phase, validation, smoke results, skipped checks, risks, and git status |

### Safety guardrails preserved

- No frontend demo reset control or reset endpoint was added.
- No unsafe reset route or provider-send action was added.
- Retry remains local/mock-only and is still blocked by the backend before mutation when provider settings are unsafe.
- The UI shows retry only for selected `failed` or `queued` runs; `success` and `retried` selected runs do not show the retry button.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider call was made.
- No dependency, migration, GitHub Actions workflow, commit, push, staging action, or branch operation was performed.

### Automated validation

| Command | Status | Result |
|---|---|---|
| `pnpm --dir apps/web test -- --run apps/web/src/components/admin-run-history.test.tsx` | failed then corrected | Vitest was run from `apps/web`, so the repo-root filter found no files |
| `pnpm --dir apps/web test -- --run src/components/admin-run-history.test.tsx` | pass | `1 passed`; `37 tests` passed |
| `pnpm --dir apps/web lint` | pass | `eslint .` exited 0 |
| `pnpm --dir apps/web test -- --run` | pass | `4 passed`; `48 tests` passed |
| `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web build` | pass | Next.js build completed; route list includes `/api/leads/runs/[runId]/retry` |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass with existing warning | `66 passed, 1 warning in 2.57s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 28 source files` |
| `git diff --check` | pass with Git line-ending notices | Exit 0; Git reported LF-to-CRLF working-copy notices, with no whitespace errors |

### Rendered admin retry smoke

Temporary local smoke setup:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8142 --log-level warning
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8142"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8142"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3142
```

| Check | Status | Result |
|---|---|---|
| Backend health | pass | `GET http://127.0.0.1:8142/health` returned `status=ok` |
| Frontend route | pass | `GET http://127.0.0.1:3142/admin/runs` returned HTTP `200` |
| Run-history proxy | pass | `GET http://127.0.0.1:3142/api/leads/runs` returned seeded run data |
| Browser path | limited | In-app Browser control tool was unavailable: `tool_search` for `node_repl js` returned 0 tools; project Playwright CLI was also not installed |
| Edge/CDP fallback | pass | Rendered `/admin/runs`, opened `run_demo_failed`, clicked `Retry run`, showed retry success, showed `Attempt 3`, and refreshed detail/history |
| Console/runtime health | pass | Captured browser smoke error count was `0` |
| Forbidden controls | pass | No demo reset, reset-data, edit, delete, send, archive, or provider controls were visible; allowed controls were `Lead demo`, `Reset filters`, and `View details` |
| Post-smoke restore | pass | `uv run python -m backend.app.leads.demo_seed` restored canonical seeded rows after the live local retry |
| Temporary process cleanup | pass | Temporary Edge DevTools, backend, and frontend smoke processes were stopped; final checks showed no remaining listeners on smoke ports `9231`, `8142`, or `3142` |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; project remains local/mock-only |
| GitHub Actions / CI | skipped | Explicitly forbidden |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |
| In-app Browser plugin path | limited | Browser plugin was listed, but the required `node_repl js` control tool was unavailable through tool discovery |
| Playwright CLI path | limited | No project Playwright CLI was installed; no dependency was added |

### Remaining risks

- Rendered smoke used a desktop Edge DevTools fallback instead of the in-app Browser plugin because the required control tool was unavailable.
- The browser smoke exercised the success path against local seeded data; automated component tests cover `403`, `404`, and `409` UI handling.
- PostgreSQL was left running because it was already part of the documented local demo path.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains.

### Suggested commit message

```text
Harden admin retry UI behavior
```

## Latest Update - 2026-06-10 Backend/Admin Run History And Retry Hardening

### Phase summary

Hardened the backend/admin run-history, run-detail, failure-detail, and retry surfaces after the explicit demo-marker reset work. Manual retry now refuses unsafe non-local or non-mock provider settings with `403` before mutating a run. Existing `404` missing-run behavior and `409` no-failed-attempt/non-retryable-run behavior are preserved.

No frontend feature, frontend reset control, reset endpoint, GitHub Actions workflow, real provider call, paid API call, staging action, commit, or push was added or performed.

### Files changed

| Path | Purpose |
|---|---|
| `backend/app/leads/retry.py` | Added local/mock retry safety validation and error type |
| `backend/app/leads/routes.py` | Applied retry safety precondition and stable `403` response for unsafe retry settings |
| `tests/test_lead_intake_api.py` | Added API coverage for empty history, exact missing-run/failure errors, failed-detail shape, unsafe retry refusal, and unrelated-row isolation |
| `README.md` | Documented backend retry refusal for unsafe non-local/non-mock settings |
| `RUNBOOK.md` | Updated manual retry smoke expectations with the `403` unsafe-settings case |
| `DESIGN.md` | Updated the retry API contract and local/mock retry boundary |
| `TDD.md` | Updated current backend API coverage notes |
| `STATE.md` | Recorded this phase, validation, smoke results, skipped checks, risks, and git status |

### Safety guardrails preserved

- No API or frontend reset endpoint was added.
- No frontend retry/reset button or mutation control was added.
- Manual retry remains backend-only.
- Retry is allowed only when `APP_ENV` is local/demo/test/development, `MOCK_MODE=true`, `CRM_PROVIDER=mock`, `SLACK_PROVIDER=mock`, and `GOOGLE_SHEETS_PROVIDER` is disabled or mock.
- Retry still records local persistence only; it does not call CRM, Slack, Google Sheets, OpenAI, paid APIs, webhooks, or external services.
- The guarded demo reset command remains dry-run-by-default and marker-first.

### Automated validation

| Command | Status | Result |
|---|---|---|
| `uv run pytest tests\test_lead_intake_api.py -q` | pass | `22 passed, 1 warning in 2.27s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run pytest tests/test_demo_reset.py -q` | pass | `15 passed in 0.85s` |
| `uv run pytest -q` | pass with existing warning | `66 passed, 1 warning in 2.39s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy .` | pass | `Success: no issues found in 31 source files` |
| `git diff --check` | pass with Git line-ending notices | Exit 0; Git reported LF-to-CRLF working-copy notices, with no whitespace errors |

### Local backend smoke

Temporary backend smoke server:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8131 --log-level info
```

| Check | Status | Result |
|---|---|---|
| `.env` existence | pass | `.env` exists; contents were not printed |
| Port check | pass | No listener was present on `127.0.0.1:8131` before startup |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized and was at head |
| Pre-smoke `uv run python -m backend.app.leads.demo_reset --apply` | pass | Deleted `4 runs`, `4 leads`, `8 attempts`, and `18 audit records`; seeded the four canonical demo runs |
| `GET /health` | pass | Returned `status=ok` and service name |
| `GET /leads/runs` | pass | Returned exactly four seeded runs: queued, retried, failed, and success |
| `GET /leads/runs/run_demo_failed` | pass | Returned failed status, 2 attempts, failure detail available, and sanitized intake payload keys |
| `GET /leads/runs/run_demo_failed/failure` | pass | Returned failed attempt 2, error type `adapter`, suggested action, and sanitized payload keys |
| `POST /leads/runs/run_demo_failed/retry` | pass | Returned `run_status=retried`, `attempt_count=3`, and latest attempt `retried` |
| Post-retry detail lookup | pass | Showed `queued`, `failed`, and `retried` attempts plus `manual_retry` audit event |
| Post-smoke reset restore | pass | Deleted `4 runs`, `4 leads`, `9 attempts`, and `19 audit records`; reseeded the four canonical demo runs |
| Final restored detail lookup | pass | `run_demo_failed` returned to `failed` with `queued` and `failed` attempts |
| Temporary process cleanup | pass | Stopped the smoke Uvicorn listener; final port check returned no listener on `127.0.0.1:8131` |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Frontend lint/tests/typecheck/build | skipped | No frontend source or frontend API proxy contract changed |
| Browser UI smoke | skipped | No frontend source changed; local backend/admin API smoke verified run history, detail, failure detail, and retry behavior |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; project remains local/mock-only |
| GitHub Actions / CI | skipped | Explicitly forbidden |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- The existing FastAPI/Starlette `TestClient` deprecation warning remains.
- Frontend rendering was not rechecked because no frontend source changed; the read-only admin UI consumes the same GET contracts.
- Local PostgreSQL was left running because it is part of the documented local demo path.

### Suggested commit message

```text
Harden admin run history and retry API behavior
```

## Latest Update - 2026-06-10 Explicit Demo Data Markers For Reset

### Phase summary

Hardened the local demo reset implementation so reset targeting no longer depends only on known seed IDs and reserved example/test-domain predicates. Persisted demo identity is now explicit on the lead and automation-run owner records, while the old predicate cleanup remains as a narrow migration-era fallback for pre-marker local demo rows.

No frontend source change, dependency install/update, GitHub Actions workflow, real provider call, paid API call, staging action, commit, or push was performed.

### Files changed

| Path | Purpose |
|---|---|
| `backend/app/leads/persistence.py` | Added `is_demo` SQLAlchemy columns to `LeadRecord` and `AutomationRunRecord` |
| `alembic/versions/20260610_0002_add_demo_markers.py` | Added Alembic migration for `leads.is_demo` and `automation_runs.is_demo` |
| `backend/app/leads/demo_seed.py` | Marked the four canonical demo leads and runs with `is_demo=True` |
| `backend/app/leads/demo_reset.py` | Made reset candidate collection marker-first and kept a narrow legacy fallback |
| `tests/test_demo_reset.py` | Expanded focused coverage for dry run, marker deletion, non-demo preservation, reseeding markers, legacy fallback, safety guards, and idempotency |
| `README.md` | Documented marker-first reset semantics |
| `RUNBOOK.md` | Updated reset expectations for marker targeting and legacy fallback |
| `DESIGN.md` | Recorded the lead/run marker design decision |
| `STATE.md` | Recorded this phase, validation, skipped checks, risks, and git status |

### Design decision

The explicit marker is a single non-null boolean:

- `leads.is_demo`
- `automation_runs.is_demo`

Attempts and audit records were not given duplicate marker columns because they are owned by run/lead foreign keys. Reset deletes attempts and audit records through marked run/lead relationships.

Reset candidate collection now:

- selects lead candidates from `leads.is_demo = true`;
- selects run candidates from `automation_runs.is_demo = true`;
- also selects runs attached to marked demo leads;
- preserves a narrow fallback for known `run_demo_*`/`lead_demo_*` IDs and reserved example/test-domain local rows created before the marker existed;
- does not delete an unmarked lead merely because a run points at it.

### Safety guardrails preserved

- `APP_ENV` must be local/demo/test/development.
- `MOCK_MODE` must be true.
- `CRM_PROVIDER` and `SLACK_PROVIDER` must be `mock`.
- `GOOGLE_SHEETS_PROVIDER` must be `disabled` or `mock`.
- PostgreSQL host must be local.
- PostgreSQL database name must be one of `salesops_local`, `salesops_demo`, or `salesops_test`.
- SQLite remains allowed only for local/test reset use.
- Reset dry-runs by default and mutates only with `--apply`.
- No API endpoint or frontend reset control was added.

### Automated validation

| Command | Status | Result |
|---|---|---|
| `uv run pytest tests/test_demo_reset.py -q` | pass | `15 passed in 0.95s` |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy .` | pass | `Success: no issues found in 31 source files` |
| `uv run pytest` | pass with existing warning | `63 passed, 1 warning in 2.33s`; warning is the existing FastAPI/Starlette `TestClient` deprecation |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | Ran `20260601_0001 -> 20260610_0002, Add explicit demo markers` |
| `uv run python -m backend.app.leads.demo_reset` | pass | Dry run matched `4 synthetic/demo runs` and `4 synthetic/demo leads` |
| `uv run python -m backend.app.leads.demo_reset --apply` | pass | Deleted `4 runs`, `4 leads`, `8 attempts`, and `18 audit records`; seeded the four canonical demo runs |
| `uv run python -m backend.app.leads.demo_reset` | pass | Post-apply dry run matched `4 synthetic/demo runs` and `4 synthetic/demo leads` |

### Local smoke

Temporary backend smoke server:

```powershell
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8131 --log-level info
```

| Check | Status | Result |
|---|---|---|
| `GET /health` | pass | Returned `status=ok` and service name |
| `GET /leads/runs` | pass | Returned exactly the four canonical runs: queued, retried, failed, and success |
| `GET /leads/runs/run_demo_failed` | pass | Returned failed status, 2 attempts, sanitized intake payload, and mock audit events |
| `GET /leads/runs/run_demo_failed/failure` | pass | Returned adapter error detail and suggested action |
| `POST /leads/runs/run_demo_failed/retry` | pass | Returned `run_status=retried`, `attempt_count=3`, and latest attempt `retried` |
| Post-retry detail lookup | pass | Showed 3 attempts and a `manual_retry` audit event |
| Post-smoke reset restore | pass | `uv run python -m backend.app.leads.demo_reset --apply` deleted the retried smoke state and reseeded the four canonical runs |
| Temporary process cleanup | pass | Stopped the launcher PID and verified/stopped the child Uvicorn process on port `8131`; final port check returned no listener |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Frontend lint/tests/typecheck/build | skipped | No frontend source changed in this phase |
| Browser UI smoke | skipped/limited | No frontend source changed; local backend/admin API smoke verified the reset-dependent run history, detail, failure, and retry paths |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; project remains local/mock-only |
| GitHub Actions / CI | skipped | Explicitly forbidden |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- The legacy fallback intentionally still deletes unmarked pre-marker local rows that use known demo IDs or reserved example/test domains. This is documented and narrow, but those rows are not marker-only by definition.
- Browser rendering was not rechecked because this phase did not modify frontend source; backend/admin API smoke passed.
- Local PostgreSQL was left running because it is part of the documented local demo path.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains.

### Suggested commit message

```text
Add explicit demo markers to reset flow
```

## Latest Update - 2026-06-10 Safe Local Demo Reset Command

### Phase summary

Implemented a CLI-only local/demo reset path so the portfolio database can be returned to deterministic seeded state without older reserved-domain synthetic smoke rows appearing in visible demo/admin views.

No migration, frontend source change, dependency install/update, GitHub Actions workflow, real provider call, paid API call, staging action, commit, or push was performed.

### Files changed

| Path | Purpose |
|---|---|
| `backend/app/leads/demo_reset.py` | Added dry-run-by-default guarded reset CLI and reset helper logic |
| `tests/test_demo_reset.py` | Added tests for dry run, guarded safety checks, synthetic cleanup, preservation of non-synthetic rows, and reseeding |
| `README.md` | Documented `uv run python -m backend.app.leads.demo_reset --apply` in local demo setup/validation |
| `RUNBOOK.md` | Updated operational demo setup, recording, and troubleshooting paths to use the guarded reset command |
| `STATE.md` | Recorded this implementation, validation, skipped checks, and remaining risks |

### Reset behavior

`uv run python -m backend.app.leads.demo_reset` is a dry run. It reports matched reset candidates and does not mutate the database.

`uv run python -m backend.app.leads.demo_reset --apply`:

- refuses unless `APP_ENV` is local/demo/test/development;
- refuses unless `MOCK_MODE=true`, `CRM_PROVIDER=mock`, `SLACK_PROVIDER=mock`, and Google Sheets is disabled or mock;
- refuses PostgreSQL URLs unless the host is local and the database name is `salesops_local`, `salesops_demo`, or `salesops_test`;
- allows SQLite only for local/test use;
- deletes only deterministic seed IDs and rows whose lead email or company domain uses reserved synthetic example/test domains;
- reseeds exactly `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`;
- does not expose a backend API endpoint or frontend UI control.

### Implementation notes

The existing schema has no explicit `is_demo` marker. The safe deletion boundary therefore uses current repository evidence: known `run_demo_*`/`lead_demo_*` seed IDs plus reserved synthetic domains such as `example.com`, `.example`, `.example.test`, and `.test`. Generic `lead_<hash>` or `run_<hash>` prefixes are not deleted by themselves because real local submissions and synthetic smoke submissions share that identifier shape.

### Automated validation

| Command | Status | Result |
|---|---|---|
| `uv run pytest tests\test_demo_reset.py` | failed then passed | Initial run found a missing SQLAlchemy `delete` import; after the fix, `5 passed` |
| `uv run ruff check .` | failed then passed | Initial run found import ordering; Ruff mechanical fix applied; final result `All checks passed!` |
| `uv run mypy .` | failed then passed | Initial run found SQLAlchemy result typing and settings alias construction issues; final result `Success: no issues found in 30 source files` |
| `uv run pytest` | pass | `53 passed, 1 warning`; warning is existing FastAPI/Starlette `TestClient` deprecation |

### Local reset and backend smoke

| Command or check | Status | Result |
|---|---|---|
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized and at head |
| `uv run python -m backend.app.leads.demo_reset` | pass | Dry run matched 36 synthetic/demo runs and 36 synthetic/demo leads |
| `uv run python -m backend.app.leads.demo_reset --apply` | pass | Deleted 36 runs, 36 leads, 72 attempts, and 178 audit records; seeded 4 demo runs |
| Post-reset DB metadata check | pass | Local DB had exactly 4 runs: queued, retried, failed, success seeded demo rows |
| Temporary backend | pass | Started on `http://127.0.0.1:8130` |
| Backend health | pass | `GET /health` returned `status=ok` |
| Backend docs/OpenAPI | pass | `GET /docs` returned HTTP 200; OpenAPI title was `SalesOps Workflow Automation Hub API` |
| Backend run history | pass | `GET /leads/runs` returned exactly 4 seeded runs |
| Backend run detail | pass | `GET /leads/runs/run_demo_failed` returned failed status and 2 attempts |
| Backend failure detail | pass | `GET /leads/runs/run_demo_failed/failure` returned adapter error detail and sanitized payload without `phone` |
| Backend retry smoke | pass | `POST /leads/runs/run_demo_failed/retry` changed the run to `retried` with 3 attempts |
| Post-retry reset | pass | Reset restored `run_demo_failed=failed/2`, `run_demo_queued=queued/1`, `run_demo_retried=retried/3`, and `run_demo_success=success/2` |

### Local frontend smoke

| Check | Status | Result |
|---|---|---|
| Temporary frontend | pass | Started on `http://127.0.0.1:3042` pointed at backend `8130` |
| Frontend root | pass | `GET /` returned HTTP 200 and contained `SalesOps Workflow Automation Hub` |
| Frontend admin | pass | `GET /admin/runs` returned HTTP 200 and contained `Admin run history` |
| Frontend docs redirect | pass with PowerShell redirect warning | `GET /docs` returned HTTP 307 to `http://127.0.0.1:8130/docs`; `Invoke-WebRequest` also printed the expected max-redirection warning because redirects were intentionally disabled |
| Frontend run-history proxy | pass | `GET /api/leads/runs` returned exactly 4 seeded runs |
| Frontend run-detail proxy | pass | `GET /api/leads/runs/run_demo_failed` returned failed status and 2 attempts |
| Frontend dev-server logs | pass | Next.js compiled `/`, `/admin/runs`, `/docs`, `/api/leads/runs`, and `/api/leads/runs/[runId]`; stderr log was empty |
| Temporary process cleanup | pass | Stopped only the backend/frontend smoke process trees started in this pass; PostgreSQL was left running |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Frontend lint/tests/typecheck/build | skipped | No frontend source files changed; only README/RUNBOOK docs referenced the reset command |
| Browser console check | limited/skipped | In-app Browser tool was not exposed by tool discovery; project Playwright was not installed; temporary `npx --package @playwright/cli` fallback was rejected because it would download and execute third-party npm code |
| Real provider, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; project remains local/mock-only |
| Migration generation | skipped | No schema change was needed |
| GitHub Actions / CI | skipped | Explicitly forbidden |
| Commit, push, and staging | skipped | Explicitly forbidden |

### Remaining risks

- The reset identifies synthetic rows through seed IDs and reserved example/test domains because the schema has no durable `is_demo` marker. Future non-example synthetic rows will not be deleted unless their predicates are added deliberately.
- Browser console errors were not verified with a real browser automation tool in this pass for the reasons above; HTTP/proxy checks and dev-server logs passed.
- Local PostgreSQL remains running because it is part of the documented local demo path.
- The existing FastAPI/Starlette `TestClient` deprecation warning remains.

### Manual validation commands

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_reset
uv run python -m backend.app.leads.demo_reset --apply
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8130 --log-level info
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8130"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8130"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then open:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:3042/docs`

### Git safety confirmation

- No files were staged.
- No commits were created.
- No pushes were made.
- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, or destructive checkout was run.

### Suggested commit message

```text
Add guarded local demo reset command
```

## Latest Update - 2026-06-10 Deterministic Demo Reset And Final Public Packaging Pass

### Phase summary

This pass verified the current source-of-truth docs, repeated the documented local PostgreSQL/Alembic/demo-seed path, started the backend and frontend with the documented command shapes, completed local API/proxy/rendered-route smoke checks, performed a safe live retry endpoint smoke, restored the seeded demo records afterward, ran the full requested quality gate, and scanned for public-readiness issues.

No dependency install/update, GitHub Actions workflow, real provider call, paid API call, webhook call, staging action, commit, push, or destructive git command was performed.

### Files changed

| Path | Purpose |
|---|---|
| `REQ.md` | Replaced one stale public-doc `TBD` wording with `future work` and updated the doc date |
| `STATE.md` | Recorded this reset, smoke, retry, quality-gate, and public-readiness pass |

### Initial inspection

| Check | Status | Result |
|---|---|---|
| Source docs read | pass | Reviewed `README.md`, `REQ.md`, `DESIGN.md`, `TDD.md`, `STATE.md`, `CONTEXT.md`, `RUNBOOK.md`, `AGENTS.md`, repo command files, `compose.yml`, and demo seed implementation |
| Repository file inventory | pass | `rg --files` showed the expected backend, frontend, Alembic, docs, tests, screenshots, lockfiles, and config files |
| Starting worktree | pass | `git status --short` returned no output |
| Starting whitespace check | pass | `git diff --check` returned no output |
| Working-tree scope | pass | Initial tree was clean; later tracked changes were limited to `REQ.md` and `STATE.md` |

### Demo data reset and seed evidence

| Command | Status | Result |
|---|---|---|
| `Test-Path -LiteralPath ".env"` | pass | `True`; contents were not printed |
| `docker compose ps` | pass | `salesops-postgres` was already `Up` and `healthy` on local port `5432` |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized; transactional DDL assumed |
| `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |

Full database wipe/reset was skipped because `RUNBOOK.md` documents the deterministic seed command, and `backend/app/leads/demo_seed.py` intentionally clears and rewrites only the known `run_demo_*` and `lead_demo_*` records. No documented full reset exists, and inventing one would be destructive. The local database still contains older synthetic smoke rows; the seeded demo records themselves were restored deterministically.

### Documented command and port verification

| Check | Status | Result |
|---|---|---|
| README/RUNBOOK startup commands | pass | Docs contain local PostgreSQL, Alembic, seed, backend, frontend, `/`, `/admin/runs`, `/docs`, and filter-route guidance |
| Backend default port | fallback used | `127.0.0.1:8028` was already occupied by a pre-existing local listener and was left untouched |
| Backend smoke port | pass | Used `127.0.0.1:8128` |
| Frontend smoke port | pass | Used documented `127.0.0.1:3042` |
| Backend command | pass | `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8128 --log-level info` |
| Frontend command | pass | Set both backend base URL env vars to `http://127.0.0.1:8128`, then ran `pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042` |
| Temporary process cleanup | pass | Stopped only the smoke Uvicorn and Next.js processes started in this pass; `8028` and PostgreSQL were left untouched |

### Live local smoke evidence

| Surface | Status | Result |
|---|---|---|
| Backend health | pass | `GET /health` returned `status=ok` and service name |
| Backend docs/OpenAPI | pass | `GET /docs` returned HTTP 200 with Swagger UI; `GET /openapi.json` returned title `SalesOps Workflow Automation Hub API` and 6 paths |
| Backend intake | pass | Synthetic local `POST /leads/intake` returned `success`, dedupe `unique`, CRM action `created`, and Slack delivered `true` |
| Backend run history | pass | `GET /leads/runs` returned seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`; older synthetic smoke rows were also present |
| Backend run detail | pass | `GET /leads/runs/run_demo_failed` returned failed status, 2 attempts, failure detail available, and sanitized payload without `phone` |
| Backend failure detail | pass | `GET /leads/runs/run_demo_failed/failure` returned failed attempt 2, error type `adapter`, suggested action, and sanitized payload without `phone` |
| Frontend root | pass | `GET /` returned HTTP 200 and contained `SalesOps Workflow Automation Hub` and `CSV import` |
| Frontend admin | pass | `GET /admin/runs` returned HTTP 200 and contained `Admin run history` and `Read-only` |
| Frontend proxy intake | pass | Synthetic local `POST /api/leads/intake` returned `success` and Slack delivered `true` |
| Frontend proxy run history | pass | `GET /api/leads/runs` returned seeded data including `run_demo_failed` |
| Frontend proxy run detail | pass | `GET /api/leads/runs/run_demo_failed` returned 2 attempts |
| Frontend docs redirect | pass | `GET /docs` returned `307` to `http://127.0.0.1:8128/docs` |

Rendered browser smoke used the in-app Browser plugin. Root, admin, status/source/search/owner/error-type/date filter URLs, empty state, selected-hidden detail URL, and `/docs` redirect rendered meaningful content with no framework overlay and no console warning/error entries. The detail button for `run_demo_failed` resolved to one button, opened `?runId=run_demo_failed`, displayed the failed mock CRM message and suggested action, and exposed no retry/resubmit/rerun control.

The first date-filter browser check was too early; after a 2.5 second wait it rendered all four seeded runs for `from=2026-06-01&to=2026-06-01`. Browser resource observations for checked Next.js routes found no non-local resource URLs. A detailed HAR/network trace was not captured because no existing project tooling exposed one without adding dependencies.

### Retry endpoint live smoke

| Command | Status | Result |
|---|---|---|
| `Invoke-RestMethod -Uri "http://127.0.0.1:8128/leads/runs/run_demo_failed/retry" -Method Post` | pass | Local retry changed `run_demo_failed` to `retried`; detail lookup showed 3 attempts and latest status `retried` |
| `uv run python -m backend.app.leads.demo_seed` | pass | Reseeded the four deterministic demo runs after retry smoke |
| Final seeded status check | pass | `run_demo_failed=failed/2`, `run_demo_queued=queued/1`, `run_demo_retried=retried/3`, `run_demo_success=success/2` |

Retry smoke was safe because it used a documented local synthetic failed run, performed no real external calls, and was followed by deterministic reseeding.

### Required automated validation

Validation note: sandboxed PowerShell process creation failed in this workspace with `CreateProcessAsUserW failed: 5`, so local commands were run through approved escalated PowerShell. No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, or webhook was called.

| Command | Status | Result |
|---|---|---|
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | 48 tests passed; 1 Starlette/FastAPI `TestClient` deprecation warning |
| `pnpm --dir apps/web run lint` | pass | ESLint completed with exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` completed with exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully and generated 8 routes |
| `git diff --check` | pass | Exit 0 before docs edits and after docs edits; final run printed LF-to-CRLF working-copy warnings for `REQ.md` and `STATE.md` but no whitespace errors |
| `git status --short` | pass | No output before docs edits; final output was `M REQ.md` and `M STATE.md` |
| `git diff --cached --name-only` | pass | No output; no files staged |
| `git diff --stat` | pass | `REQ.md` and `STATE.md` only; 148 insertions and 6 deletions |

### Sensitive and public-readiness scans

| Check | Status | Result |
|---|---|---|
| Tracked `.env` files | pass | `git ls-files -- .env` returned no output; `git ls-files -- .env .env.*` returned `.env.example` only |
| GitHub Actions workflows | pass | `Test-Path -LiteralPath ".github\workflows"` returned `False`; `git ls-files -- .github .github\workflows` returned no workflow files |
| Private Windows paths/usernames | pass | No tracked matches for local user/path patterns |
| Provider/API key and live endpoint patterns | pass after refinement | Broad scan matched historical regex command text in `STATE.md` only; refined scan excluding `STATE.md` returned no matches |
| Public stale wording | pass after cleanup | Initial scan found `TBD` in `REQ.md`; changed it to `future work` |
| Screenshot binary strings | pass | `rg -a` over `docs/assets/screenshots` returned no local-path, username, token, private-key, provider endpoint, `DATABASE_URL`, local DB password, or service-role matches |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Full destructive database wipe | skipped | Not documented; seed command intentionally resets only known demo records |
| Real provider, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; project remains local/mock-only |
| Dependency install/update | skipped | Existing locked local environment passed all gates |
| GitHub Actions / CI | skipped | Explicitly forbidden; absence was checked |
| Detailed browser network trace/HAR | limited | Browser console/resource checks and local HTTP/proxy checks passed; no dependency was added for HAR capture |
| Commit, push, and staging | skipped | Explicitly forbidden |

### Remaining risks

- The local database still contains older synthetic smoke rows because no documented full reset exists. Rerun the seed command before recording to restore the four deterministic `run_demo_*` rows, and use documented filter URLs when you need deterministic screenshots.
- Port `8028` remains occupied by a pre-existing local listener that Codex did not stop.
- Local PostgreSQL was left running because it is part of the documented local demo path.
- Browser validation covered the in-app Browser/Chromium path only; no other browser was checked.
- Backend pytest still emits the known Starlette/FastAPI `TestClient` deprecation warning.

### Git safety confirmation

- No files were staged.
- `git diff --cached --name-only` returned no output.
- No commits were created.
- No pushes were made.
- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, or destructive checkout was run.

### Suggested commit message

```text
Record final demo reset and packaging pass
```

## Latest Update - 2026-06-09 Final Local Live Smoke And Release-Readiness Verification

### Phase summary

This pass verified the documented local backend/frontend commands in `README.md` and `RUNBOOK.md`, ran the full requested automated validation gate, ran a live local smoke with PostgreSQL, FastAPI, Next.js, frontend proxy APIs, and rendered demo routes, checked CI/env tracking and sensitive-data patterns, and corrected stale `active draft` status rows in public source-of-truth docs.

No feature work, dependency install/update, GitHub Actions workflow, real provider call, paid API call, webhook call, staging action, commit, or push was performed.

### Files changed

| Path | Purpose |
|---|---|
| `DESIGN.md` | Changed stale `Status` row from `active draft` to `final portfolio readiness review` |
| `REQ.md` | Changed stale `Status` row from `active draft` to `final portfolio readiness review` |
| `TDD.md` | Changed stale `Status` row from `active draft` to `final portfolio readiness review` |
| `STATE.md` | Recorded final live smoke, release-readiness checks, skipped checks, risks, and suggested commit message |

### Documented command verification

| Source | Status | Evidence |
|---|---|---|
| `README.md` Quick Start | pass | Documents backend `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028` and frontend env plus `pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042` |
| `RUNBOOK.md` final demo path | pass | Documents local PostgreSQL, Alembic, demo seed, backend `8028`, frontend `3042`, `/`, `/admin/runs`, `/docs`, and admin filter URLs |
| Generic dev commands | pass | `pyproject.toml`, root `package.json`, and `apps/web/package.json` contain the documented backend and frontend lint/test/typecheck/build/dev commands |
| Port fallback | pass | `127.0.0.1:8028` was already occupied by an existing local listener, so the runbook's documented "choose another free local port if it is busy" fallback was used with backend port `8128`; frontend port `3042` was free |

### Required automated validation

Validation note: sandboxed PowerShell failed to launch in this workspace with `CreateProcessAsUserW failed: 5`, so local commands were run through approved escalated PowerShell. No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, or webhook was called.

| Command | Status | Result |
|---|---|---|
| `git status --short` | pass | No output at start of validation |
| `git diff --check` | pass | Exit 0 before edits; exit 0 after docs edits with expected LF-to-CRLF working-copy warnings for edited Markdown files |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | 48 tests passed; 1 known FastAPI/Starlette `TestClient` deprecation warning |
| `pnpm --dir apps/web run lint` | pass | ESLint completed with exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` completed with exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully and generated 8 routes including `/`, `/admin/runs`, proxy API routes, and `/docs` |

### Live local smoke evidence

Setup and server commands used:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8128 --log-level info
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8128"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8128"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Backend `8128` was used only because `8028` was already occupied. The frontend was launched on the documented `3042` port and pointed to `8128`.

| Check | Status | Result |
|---|---|---|
| `.env` handling | pass | Local `.env` already existed; contents were not printed |
| PostgreSQL | pass | `docker compose up -d postgres` reported `Container salesops-postgres Running` |
| Alembic | pass | PostgreSQL migration context initialized and reached head |
| Demo seed | pass | Seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Backend health | pass | `GET http://127.0.0.1:8128/health` returned `status=ok` and service name |
| Backend docs/OpenAPI | pass | `GET /docs` returned HTTP 200 with Swagger UI; `GET /openapi.json` returned title `SalesOps Workflow Automation Hub API` |
| Backend intake API | pass | Synthetic local lead `POST /leads/intake` returned `success`, dedupe `unique`, CRM action `created`, Slack delivered `True` |
| Backend run history | pass | `GET /leads/runs` returned local persisted runs including all four seeded `run_demo_*` records |
| Backend run detail | pass | `GET /leads/runs/run_demo_failed` returned failed run detail with 2 attempts, sanitized intake payload, and audit events |
| Backend failure detail | pass | `GET /leads/runs/run_demo_failed/failure` returned failed attempt 2, error type `adapter`, suggested action, and sanitized payload |
| Frontend home | pass | `GET http://127.0.0.1:3042/` returned HTTP 200 and contained `SalesOps Workflow Automation Hub`, `Lead intake form`, and `CSV import` |
| Frontend proxy intake | pass | Synthetic local `POST /api/leads/intake` returned `success`, dedupe `unique`, CRM action `created`, Slack delivered `True` |
| Frontend proxy run history | pass | `GET /api/leads/runs` returned seeded run data including `run_demo_failed` |
| Frontend proxy run detail | pass | `GET /api/leads/runs/run_demo_failed` returned failed run detail with 2 attempts |
| Frontend `/docs` redirect | pass | HTTP redirect status `307`; `Location` was `http://127.0.0.1:8128/docs` |

Rendered route smoke used installed local Chrome through `Start-Process -FilePath $chrome ... --headless=new --dump-dom <url>` with a temporary profile under `$env:TEMP`; no Playwright, Puppeteer, browser dependency, screenshot artifact, or committed test artifact was added.

| Rendered route | Status | Evidence |
|---|---|---|
| `/` | pass | Rendered expected home title, lead form, and CSV import text; old `Phase 3 Local Demo` label absent |
| `/admin/runs` | pass | Rendered `Admin run history`, `Read-only`, and seeded success, failed, queued, and retried rows; no retry/edit/delete/resubmit/rerun/archive controls matched |
| `/admin/runs?status=failed` | pass | Rendered `run_demo_failed`; success and queued rows absent |
| `/admin/runs?source=csv_upload` | pass | Rendered `run_demo_failed`; success and queued rows absent |
| `/admin/runs?q=atlas` | pass | Rendered `run_demo_retried`; success and failed rows absent |
| `/admin/runs?owner=Maya%20Patel` | pass | Rendered `run_demo_failed` and `run_demo_queued`; success and retried rows absent |
| `/admin/runs?errorType=adapter` | pass | Rendered `run_demo_failed` and `run_demo_retried`; success and queued rows absent |
| `/admin/runs?from=2026-06-01&to=2026-06-01` | pass | Rendered all four seeded demo runs |
| `/admin/runs?q=no-such-run` | pass | Rendered `No runs match these filters.` and `Reset filters`; seeded rows absent |
| `/admin/runs?status=success&runId=run_demo_failed` | pass | Rendered `run_demo_failed` detail and the selected-run-hidden notice |
| `/docs` | pass | Followed local redirect and rendered Swagger UI for `SalesOps Workflow Automation Hub API` |

Temporary smoke backend/frontend listeners on `8128` and `3042` were stopped after verification. The pre-existing listener on `8028` and local PostgreSQL were left untouched.

### CI, env, and sensitive-data checks

| Command or check | Status | Result |
|---|---|---|
| `Test-Path -LiteralPath "..github\workflows"` | pass | `False` for the exact user-provided path |
| `Test-Path -LiteralPath ".github\workflows"` | pass | `False` for the corrected GitHub Actions workflow path |
| `git ls-files -- .github .github\workflows` | pass | No tracked CI/workflow files |
| `git ls-files -- .env` | pass | No tracked `.env` file |
| Tracked local absolute path/private username scan | pass | No matches |
| Tracked secret/private-key/live-provider scan | pass with expected self-match | Broad scan matched `STATE.md` only because historical entries record regex command text; the same scan excluding `STATE.md` returned no matches |
| Tracked production-provider URL scan | pass | No matches, including the refined scan excluding `STATE.md` |
| Screenshot binary sensitive-string scan | pass | `rg -a` over `docs/assets/screenshots` returned no local-path, username, token, private-key, Slack webhook, OpenAI, HubSpot, Google Sheets, or service-role matches |
| Public-doc stale wording scan | pass after docs cleanup | `active draft` was corrected in `DESIGN.md`, `REQ.md`, and `TDD.md`; rescan for `active draft`, `old phase`, `not captured yet`, and `contradictory readiness` returned no matches |
| Public-doc placeholder/phase wording review | pass | Remaining `placeholder` wording is safety guidance about `.env.example`; remaining phase wording is historical plan/implementation context, not contradictory readiness status |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden; verification stayed local/mock-only |
| Dependency install/update | skipped | Not needed; existing locked local environment passed all gates |
| GitHub Actions / CI | skipped | Explicitly forbidden; absence was checked instead |
| Manual retry endpoint live mutation | skipped | Automated tests cover retry behavior; live smoke avoided mutating seeded failed/queued demo run state |
| Browser plugin / Playwright workflow | skipped/fallback used | Browser plugin was not available, and no Playwright dependency was installed; local headless Chrome DOM checks were used instead |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- The local database now contains additional synthetic smoke leads created by backend and frontend intake smoke. Rerun `uv run python -m backend.app.leads.demo_seed` to refresh the deterministic `run_demo_*` records before a manual recording.
- Port `8028` was already occupied by a pre-existing local listener and was left untouched; this pass used backend port `8128`.
- Chrome headless DOM checks covered the documented routes, but browser console logs, detailed network traces, and other browsers were not captured in this pass.
- Local PostgreSQL was left running because it was already available for the documented smoke path and was not stopped by Codex.
- The backend test suite still emits the known FastAPI/Starlette `TestClient` deprecation warning.

### Git safety confirmation

- `git diff --cached --name-only` returned no output.
- No files were staged.
- No commits were created.
- No pushes were made.
- No destructive git commands were run.

### Suggested commit message

```text
Record final local smoke readiness
```

## Latest Update - 2026-06-09 Final Portfolio Readiness Review

### Phase summary

This pass reviewed the public-facing portfolio presentation for the local-only SalesOps demo: `README.md`, `RUNBOOK.md`, `CONTEXT.md`, current and historical `STATE.md` context, `docs/DEMO_ASSETS.md`, `docs/assets/README.md`, and all tracked screenshots under `docs/assets/screenshots/`.

The review verified that the documentation explains what the project does, how to run it locally, how to seed synthetic demo data, how to view the Next.js app, how to reach the local FastAPI Swagger docs, what is mocked/local-only, and what each included screenshot demonstrates.

No backend behavior, frontend behavior, API contract, schema, migration, package manifest, lockfile, dependency, GitHub Actions workflow, real provider integration, paid API, live webhook, secret, staging action, commit, or push was introduced.

### Files changed

| Path | Purpose |
|---|---|
| `RUNBOOK.md` | Replaced stale phase/status labels with final-readiness wording and removed old Phase 4 labels from current local database guidance |
| `CONTEXT.md` | Replaced stale phase/status labels and old phase-specific implementation wording with current feature-status wording |
| `docs/DEMO_ASSETS.md` | Reworded screenshot/GIF status labels so included assets read as final portfolio evidence and optional assets read as intentionally not included |
| `STATE.md` | Recorded this final-readiness review, validation, skipped checks, risks, and suggested commit message |

### Documentation review result

| Area | Status | Result |
|---|---|---|
| What the project does | pass | `README.md` and `CONTEXT.md` describe form/CSV lead intake, validation, dedupe, mock CRM/Slack outcomes, persisted run/audit records, and read-only admin review |
| Local run path | pass | `README.md` and `RUNBOOK.md` document dependency setup, local PostgreSQL, Alembic, seeding, backend startup, frontend startup, and reviewer URLs |
| Demo seed path | pass | `README.md` and `RUNBOOK.md` document `uv run python -m backend.app.leads.demo_seed` and the deterministic synthetic run IDs |
| Web app URL | pass | Docs point reviewers to the local Next.js public form and `/admin/runs` dashboard |
| Backend Swagger/docs URL | pass | Docs explain the frontend `/docs` redirect and local FastAPI docs target |
| Mock/local-only boundary | pass | Docs state CRM and Slack are deterministic mocks, demo data is synthetic, `.env.example` is placeholder-only, real providers are absent, and paid/live APIs are forbidden without approval |
| Screenshot inventory | pass | `README.md`, `docs/DEMO_ASSETS.md`, and `docs/assets/README.md` list the included screenshots and what each demonstrates |
| Stale labels/TODOs | pass after cleanup | Active public docs no longer contain `active draft`, `Phase 2`, `Phase 3`, `Phase 4`, or `Not captured yet` markers outside historical `STATE.md` |

### Sensitive-data and CI checks

| Check | Command | Status | Result |
|---|---|---|---|
| Local absolute path/private username scan | `rg` local-path/private-username patterns over reviewed public docs | pass | No matches; no local absolute paths or private Windows username leaked in reviewed docs |
| Tracked token/live-endpoint scan outside `STATE.md` | `git grep` token/private-key/live-provider endpoint patterns over tracked files, excluding historical `STATE.md` | pass | No matches; exit 1 means no tracked live endpoint or token-shaped secret matched |
| Screenshot binary string scan | `rg -a` local-path/secret patterns over `docs\assets\screenshots` | pass | No matches in PNG binary strings |
| Screenshot visual inspection | Local image viewer | pass | All nine tracked screenshots matched their documented route/state and did not show provider dashboards, secrets, private files, local absolute paths, or private URLs |
| `.env` tracking | `git ls-files -- .env` | pass | No output; local `.env` is not tracked |
| GitHub Actions directory | `Test-Path -LiteralPath .\.github\workflows` | pass | `False`; no workflow directory exists |
| Tracked GitHub Actions files | `git ls-files -- .github .github\workflows` | pass | No output; no tracked GitHub Actions files |

The broad docs scan for words such as `secret`, `token`, and `password` produced expected safety-boundary wording and the documented local Docker demo database password in `RUNBOOK.md`; it did not identify a real provider key, token, private key, production credential, private URL, or personal secret.

### Required validation

Validation note: sandboxed PowerShell launch failed in this workspace with `CreateProcessAsUserW failed: 5`, so required local commands were run through approved escalated PowerShell. No paid API, live provider, real webhook, or external production service was called.

| Command | Status | Result |
|---|---|---|
| `git diff --check` | pass | Exit 0; Git printed LF-to-CRLF working-copy warnings for edited Markdown files; no whitespace errors |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | 48 tests passed; 1 known FastAPI/Starlette TestClient deprecation warning |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully; generated 8 routes including `/`, `/admin/runs`, API proxy routes, and `/docs` |

### Manual/browser smoke result

No live browser/server smoke was run in this phase because the task was a final documentation and public-readiness review, and the requested validation list did not require starting local services.

Manual screenshot review was completed by opening every tracked PNG in `docs/assets/screenshots/`. The screenshots were nonblank, route/state-appropriate, local-demo only, and free of visible secrets, provider dashboards, private files, local absolute paths, and private URLs.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Live backend/frontend smoke | skipped | Not required by the requested validation list; this phase focused on public docs, screenshots, safety scans, and local automated gates |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; project remains local/mock-only |
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow files were added or run |
| Dependency install/update | skipped | Not needed for review; existing locked environment ran all requested gates |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- Browser smoke in this pass was limited to manual inspection of committed screenshots; the live app was not started.
- The docs still include a local Docker demo database username/password in `RUNBOOK.md` because it matches `compose.yml` and `.env.example`; it is explicitly documented as non-production local demo configuration.
- Historical `STATE.md` entries still preserve older phase evidence and prior scan wording; the latest entry supersedes those historical notes for current readiness.
- The backend test suite still emits the known FastAPI/Starlette TestClient deprecation warning.

### Manual validation recommendation

Use the README Quick Start or `RUNBOOK.md` section 10.2 for an optional live reviewer smoke:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
```

In a second PowerShell window:

```powershell
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Then open `http://127.0.0.1:3042/`, `http://127.0.0.1:3042/admin/runs`, and `http://127.0.0.1:3042/docs`.

### Git safety confirmation

- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.

### Suggested commit message

```text
Finalize portfolio readiness docs
```

## Latest Update - 2026-06-09 Demo Asset Capture And Final Portfolio Packaging

### Phase summary

This pass reviewed the current README, RUNBOOK, `docs/DEMO_ASSETS.md`, CONTEXT, and STATE docs; verified the documented local demo route set; added exact screenshot/GIF capture guidance; captured four additional local still screenshots without adding dependencies; and updated portfolio documentation to make storage locations, suggested filenames, and viewport recommendations explicit.

No backend behavior, frontend behavior, API contract, schema, migration, package manifest, lockfile, GitHub Actions workflow, real provider integration, paid API, live webhook, secret, staging action, commit, or push was introduced.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Added a short pointer to final screenshot/GIF storage and viewport guidance |
| `RUNBOOK.md` | Updated current phase metadata and added screenshot/recording target guidance |
| `CONTEXT.md` | Updated current phase metadata |
| `docs/DEMO_ASSETS.md` | Added exact capture checklist, filenames, asset storage locations, and viewport recommendations |
| `docs/assets/README.md` | Added the new route/mobile screenshot assets to the inventory |
| `docs/assets/screenshots/salesops-admin-empty-filter.png` | Added no-match admin filter state screenshot |
| `docs/assets/screenshots/salesops-docs-swagger.png` | Added FastAPI Swagger UI screenshot after frontend `/docs` redirect |
| `docs/assets/screenshots/salesops-mobile-home.png` | Added mobile-width public intake screenshot |
| `docs/assets/screenshots/salesops-mobile-admin-runs.png` | Added mobile-width admin screenshot |
| `STATE.md` | Recorded this phase, validation, smoke evidence, skipped checks, risks, and suggested commit message |

### Required validation

Validation note: sandboxed PowerShell launch failed earlier in this workspace with `CreateProcessAsUserW failed: 5`, so required local commands were run through approved escalated PowerShell. No external provider, paid API, live webhook, or real integration command was run.

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | Before this STATE update: `M CONTEXT.md`, `M README.md`, `M RUNBOOK.md`, `M docs/DEMO_ASSETS.md`, `M docs/assets/README.md`, plus four untracked screenshots under `docs/assets/screenshots/` |
| `git diff --check` | pass | Exit 0; Git printed expected LF-to-CRLF working-copy warnings for edited Markdown files; no whitespace errors |
| `git diff --cached --name-only` | pass | No output; no files staged |
| `Test-Path -LiteralPath ".github\workflows"` | pass | `False` |
| `uv sync` | pass | `Resolved 44 packages in 2ms`; `Checked 42 packages in 290ms` |
| `pnpm install` | pass | Workspace already up to date; `Done in 84ms using pnpm v11.5.0` |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized; no pending migration output after head check |
| `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 2.27s`; warning is the known FastAPI/Starlette TestClient deprecation warning |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed; duration `15.11s` |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully; generated 8 routes including `/`, `/admin/runs`, API proxy routes, and `/docs` |

### Manual/browser smoke result

Browser smoke used installed Chrome `149.0.7827.55` headless through the local DevTools Protocol and Node `24.16.0` built-in WebSocket support. No Playwright, Puppeteer, browser plugin, or new dependency was added.

| Check | Status | Result |
|---|---|---|
| Backend route precheck | pass | Existing local backend on `http://127.0.0.1:8028/health` returned HTTP `200`; Codex did not stop this pre-existing backend |
| Frontend startup | pass after retry | First temporary start had a quoting issue and returned `/` HTTP `500`; Codex stopped only that temporary process tree, restarted with encoded PowerShell env setup, and `/` returned HTTP `200` |
| `/` desktop render | pass | Rendered title `SalesOps Workflow Automation Hub`, `Lead intake form`, and `CSV import`; old `Phase 3 Local Demo` label absent; browser error list empty |
| `/admin/runs` desktop render | pass | Rendered `Admin run history`, `Read-only`, and seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`; visible controls were reset/view-detail controls only; browser error list empty |
| `/admin/runs?q=no-such-run` | pass | Rendered no-match filtered empty state and reset path; screenshot saved as `salesops-admin-empty-filter.png` |
| `/docs` redirect | pass | Browser requested `http://127.0.0.1:3042/docs`, landed on `http://127.0.0.1:8028/docs`, and rendered `SalesOps Workflow Automation Hub API - Swagger UI`; screenshot saved as `salesops-docs-swagger.png` |
| Backend Swagger docs | pass | Swagger UI rendered from the local backend and requested local `http://127.0.0.1:8028/openapi.json` only |
| Mobile home smoke | pass | `390x844` viewport rendered public form and CSV import with page scroll width equal to viewport width; screenshot saved as `salesops-mobile-home.png` |
| Mobile admin smoke | pass | `390x844` viewport rendered admin filters and seeded run evidence with page scroll width equal to viewport width; screenshot saved as `salesops-mobile-admin-runs.png` |
| Console/runtime errors | pass | DevTools smoke reported no `Runtime.exceptionThrown`, console error, or log error events for the verified pages |
| Screenshot visual inspection | pass | New screenshot files were opened locally and visually checked for nonblank content, correct route/state, English browser locale text, and no Next dev overlay |
| Temporary process cleanup | pass | Codex stopped only the temporary Chrome/frontend process trees it started and removed ignored smoke logs/profile files; the pre-existing backend and Docker PostgreSQL were not stopped |

### Forbidden-check results

| Check | Status | Result |
|---|---|---|
| Local absolute path / username scan | pass | Filename-only scan for local absolute path and Windows username patterns returned `no-local-path-matches` |
| Stale demo/phase label scan outside historical `STATE.md` | pass | `rg -l -e 'Phase 3 Local Demo|Public portfolio packaging pass|Public Portfolio Packaging Pass' --glob '!STATE.md' .` returned `no-stale-phase-label-matches-outside-state` |
| `.github\workflows` absence | pass | `Test-Path -LiteralPath ".github\workflows"` returned `False` |
| Broad real/live/paid provider wording scan | reviewed / expected matches | Filename-only scan matched source docs that explicitly document local-only/no-paid/no-real-provider safety boundaries |
| Concrete live-provider endpoint scan | pass | No matches for HubSpot, Slack webhook/API, OpenAI, Anthropic, Gemini, or Google Sheets API endpoint strings |
| Secret-looking value scan | skipped after approval rejection | The requested repo-wide secret-pattern scan was rejected by the approval reviewer as conflicting with the "forbidden checks" wording. Codex did not retry, bypass, or work around the rejected action. |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; all verification stayed local/mock-only |
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow files were added or run |
| GIF/video capture | skipped | Still screenshots were captured; large binary recordings remain optional until the user intentionally selects final clips |
| Form-success screenshot | skipped | Existing screenshots plus the new empty-filter/docs/mobile stills cover the final portfolio story; docs keep `salesops-form-success.png` optional |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- The requested secret-looking value scan could not be run because the approval reviewer rejected the action; no workaround was attempted.
- Browser smoke covered installed Chrome headless at desktop and mobile widths; other browsers were not checked in this pass.
- Local PostgreSQL remains running because `docker compose up -d postgres` was a required validation command and Codex did not stop it.
- The backend on `127.0.0.1:8028` was already running before browser smoke and was left untouched.
- New screenshot files are untracked until the user manually stages them.
- The backend test suite still emits the known FastAPI/Starlette TestClient deprecation warning.

### Manual validation recommendation

Run the README Quick Start from PowerShell, then open:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:3042/docs`
- `http://127.0.0.1:8028/docs`

Confirm the public demo renders, seeded admin rows are visible and read-only, `/docs` redirects to local Swagger UI, mobile-width controls do not overlap, and all provider behavior remains local/mock-only.

### Git safety confirmation

- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.

### Suggested commit message

```text
Package final demo assets
```

## Latest Update - 2026-06-09 Final Public Demo Polish And Release Readiness

### Phase summary

This pass reran the README Quick Start, browser-smoked the public demo routes, and fixed one public-demo inconsistency: `http://127.0.0.1:3042/docs` returned `404` while the reviewer smoke path expected a docs route. The frontend now exposes a local-only `/docs` route that redirects to the configured FastAPI docs endpoint, which landed on `http://127.0.0.1:8028/docs` during smoke.

The README, runbook, demo asset checklist, and context docs were updated to describe the `/docs` redirect accurately. No real provider integration, paid API, secret, GitHub Actions workflow, staging, commit, push, deployment config, schema change, migration, dependency change, or public admin mutation behavior was added.

### Files changed

| Path | Purpose |
|---|---|
| `apps/web/src/app/docs/route.ts` | Added local Next.js `/docs` redirect to the configured FastAPI docs URL |
| `README.md` | Updated Quick Start open list to use `http://127.0.0.1:3042/docs` as the reviewer docs entrypoint |
| `RUNBOOK.md` | Added `/docs` to local smoke and recording checklist instructions |
| `docs/DEMO_ASSETS.md` | Added the frontend `/docs` URL to local capture rules |
| `CONTEXT.md` | Recorded the local `/docs` redirect in the frontend context |
| `STATE.md` | Recorded this release-readiness pass, validation evidence, smoke result, skipped checks, risks, and suggested commit message |

### README Quick Start result

| Command | Status | Result |
|---|---|---|
| `if (-not (Test-Path -LiteralPath ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }` | pass | Completed without printing local values |
| `uv sync` | pass | `Resolved 44 packages in 3ms`; `Checked 42 packages in 301ms` |
| `pnpm install` | pass | Workspace already up to date; pnpm `11.5.0` |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized and completed at head |
| `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| Backend start command | pass | README backend command served local API on `127.0.0.1:8028` |
| Frontend start command | pass after wrapper retry | README frontend command served local Next.js on `127.0.0.1:3042` with local backend env vars |

Validation note: sandboxed PowerShell launch failed in this workspace with `CreateProcessAsUserW failed: 5`, so required local commands were run through approved escalated PowerShell. No external provider, paid API, or real integration command was run.

### Manual browser smoke result

| Route | Status | Result |
|---|---|---|
| `http://127.0.0.1:3042/` | pass | Rendered `SalesOps Workflow Automation Hub`, `Lead intake form`, and `CSV import`; no browser warning/error logs; no old demo-phase label visible |
| `http://127.0.0.1:3042/admin/runs` | pass | Rendered `Admin run history`, `Read-only`, and seeded success, failed, queued, and retried runs after loading; no browser warning/error logs; no public retry/edit/delete/send/archive/rerun/resubmit control visible |
| `http://127.0.0.1:3042/docs` | pass after fix | Redirected to `http://127.0.0.1:8028/docs`; rendered `SalesOps Workflow Automation Hub API - Swagger UI`; no browser warning/error logs |
| HTTP smoke | pass | `/` and `/admin/runs` returned `200`; `/docs` now returned `200` after following the redirect to backend docs |

### Required validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | `M CONTEXT.md`, `M README.md`, `M RUNBOOK.md`, `M docs/DEMO_ASSETS.md`, `?? apps/web/src/app/docs/` before this `STATE.md` update |
| `git diff --check` | pass | Exit 0; Git printed expected LF-to-CRLF working-copy warnings for edited Markdown files; no whitespace errors |
| `git diff --cached --name-only` | pass | No output; no files staged |
| `Test-Path -LiteralPath ".github\workflows"` | pass | `False` |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 2.68s`; warning is the known FastAPI/Starlette `TestClient` deprecation warning |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed; duration `21.38s` |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully; generated 8 static pages and dynamic routes including `/docs` |

### Forbidden-pattern checks

| Check | Status | Result |
|---|---|---|
| Selected-doc local absolute path scan | pass | No output for `README.md`, `docs/DEMO_ASSETS.md`, `RUNBOOK.md`, `CONTEXT.md`, or `STATE.md` |
| Old public demo-phase label scan | pass with historical matches | Matches were limited to historical `STATE.md` entries; rendered `/`, `/admin/runs`, and `/docs` did not show the old label |
| Broad secret-word scan | reviewed / expected matches | Matches were placeholder `.env` and `.env.example` demo values, docs safety wording, lockfile package names, historical `STATE.md` entries, and generated cache/build artifacts included by the requested broad scan. No real API key, bearer credential, private key, provider token, or personal secret was found. |
| Workflow/CI wording scan | reviewed / expected matches | Matches were out-of-scope documentation and historical `STATE.md` entries. `Test-Path -LiteralPath ".github\workflows"` returned `False`; no workflow directory exists. |
| Provider-boundary wording scan | reviewed / expected matches | Matches are safety-boundary wording that says real/live/paid/production providers are absent or approval-gated. No real provider call path was introduced or run. |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; all smoke stayed local and mock-safe |
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow files were added or run |
| Dependency changes | skipped | `uv sync` and `pnpm install` found existing dependencies sufficient; no package manifest or lockfile change was needed |
| GIF/video capture | skipped | Not requested; committed still screenshots remain the current proof assets |
| Temporary dev-server cleanup | pending user approval | The browser smoke servers started for this pass were still running when this entry was written because stopping local processes requires explicit user approval after safety review |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- Temporary local backend/frontend smoke servers may still be listening on ports `8028` and `3042` until the user approves stopping the verified smoke processes or stops them manually.
- Browser smoke covered the in-app browser at the default desktop viewport only; other browsers and mobile widths were not rerun in this pass.
- The broad requested scans intentionally include ignored `.env`, generated caches, build output, and historical docs, so they produce expected wording matches that require review rather than a simple zero-match result.
- The backend test suite still emits the known FastAPI/Starlette `TestClient` deprecation warning.
- Demo GIF/video assets remain optional and not committed.

### Manual validation recommendation

Run the README Quick Start in PowerShell, then inspect:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:3042/docs`

Confirm the docs route redirects to `http://127.0.0.1:8028/docs`, admin remains read-only, seeded demo rows render, and all provider behavior remains local/mock-only.

### Git safety confirmation

- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.

### Suggested commit message

```text
Polish public demo docs route
```

## Latest Update - 2026-06-09 Public Portfolio Packaging Pass

### Phase summary

This pass polished the public portfolio presentation without adding application features. `README.md` now includes a short 60-second reviewer summary, keeps local setup and validation commands easy to find, and aligns the backend validation command order with this phase's requested gates. `docs/DEMO_ASSETS.md` now explicitly aligns its checklist with the README screenshot section and keeps GIF/video capture optional. `CONTEXT.md` and `RUNBOOK.md` phase metadata now point at the current packaging pass.

No backend code, frontend code, user-facing app behavior, schemas, migrations, dependencies, lockfiles, generated screenshots, GIFs, videos, GitHub Actions, real integrations, `.env` contents, staging, commits, pushes, deployment config, or live-provider setup was changed.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Added a concise 60-second portfolio summary, clarified local reviewer/demo wording, and aligned local validation command order |
| `docs/DEMO_ASSETS.md` | Added explicit README screenshot-section alignment and kept GIF/video assets optional |
| `RUNBOOK.md` | Updated operational metadata date/current phase only |
| `CONTEXT.md` | Updated context metadata date/current phase only |
| `STATE.md` | Recorded this phase, validation, skipped checks, risks, and no-stage/no-commit/no-push confirmation |

### Required validation

Validation note: sandboxed PowerShell launch failed in this workspace with `CreateProcessAsUserW failed: 5`, so required local commands were run through approved escalated PowerShell. No external provider, paid API, or real integration command was run.

| Command | Status | Result |
|---|---|---|
| `git status --short` | pass | `M CONTEXT.md`, `M README.md`, `M RUNBOOK.md`, `M docs/DEMO_ASSETS.md` before this `STATE.md` update |
| `git diff --check` | pass | Exit 0; Git printed expected LF-to-CRLF working-copy warnings for edited Markdown files; no whitespace errors |
| `Test-Path -LiteralPath ".github\workflows"` | pass | `False` |
| `git diff --cached --name-only` | pass | No output; no files staged |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 2.23s`; warning is the known FastAPI/Starlette `TestClient` deprecation warning |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed; duration `15.20s` |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully in `2.5s`; generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |

### Forbidden-pattern checks

| Check | Status | Result |
|---|---|---|
| Requested local absolute user-path grep | pass | No output; no tracked local absolute user path found |
| Old public phase-label grep | safe expected matches | Matched only historical `STATE.md` notes stating that the label was removed or should be absent from the UI |
| Credential/key wording grep | safe expected matches | Matched placeholder token names in `.env.example` and the local Docker Compose database password only; no real provider secret or API key found |
| Workflow-path wording grep | safe expected matches | Matched only historical `STATE.md` notes documenting that workflow files are absent; `Test-Path` returned `False` |
| Provider-boundary wording grep | safe expected matches | Matches are safety-boundary docs and historical `STATE.md` entries saying real/live/paid/production providers are absent or approval-gated |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Manual browser smoke | skipped | This phase changed public presentation docs and metadata only; no app code, UI behavior, routes, schemas, or runtime config changed |
| Dependency install/update | skipped | Existing dependencies were sufficient for all gates; this phase forbids dependency changes unless necessary |
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow directory or CI file was added |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; the project remains local-only and mock-safe |
| GIF/video capture | skipped | Not requested for this pass; committed still screenshots remain the current proof assets |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- Browser smoke was not rerun because the diff is documentation-only; manually review the existing local demo before recording or presenting.
- Long command outputs from Vitest and pytest include local machine paths in terminal output; they were not copied verbatim into tracked docs so the tracked local-path scan remains clean.
- The provider-boundary grep intentionally matches many safety statements and historical `STATE.md` entries; those are documentation context, not active provider integrations.
- The backend test suite still emits the known FastAPI/Starlette `TestClient` deprecation warning.
- GIF/video demo assets are still optional and not committed.

### Manual validation recommendation

Run the README Quick Start in PowerShell, then inspect:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:8028/docs`

Focus on synthetic form submit, CSV import, committed screenshots, seeded admin rows, filters, failed-run detail, read-only admin posture, and local/mock-only provider boundaries.

### Git safety confirmation

- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.

### Suggested commit message

```text
Polish public portfolio packaging docs
```

## Latest Update - 2026-06-09 Demo Asset Capture + Public Portfolio Release Audit

### Phase summary

This pass completed the final public portfolio release audit and demo asset verification. The primary public docs were reviewed for overclaims, local path leakage, private usernames, secret material, real-provider claims, production-readiness exaggeration, GIF/video claims, and GitHub Actions/CI claims. The README Quick Start local demo path was browser-smoked with synthetic data only.

No backend behavior, frontend behavior, schemas, migrations, dependencies, lockfiles, generated screenshots, GIFs, videos, GitHub Actions, real integrations, staging, commits, pushes, deployment config, `.env` contents, or live-provider setup was changed.

### Files changed

| Path | Purpose |
|---|---|
| `docs/DEMO_ASSETS.md` | Added release-audit verification of committed screenshots and the reason GIF/video capture remains optional and skipped |
| `CONTEXT.md` | Replaced a local absolute repository path with neutral `repository root` wording |
| `RUNBOOK.md` | Replaced a local absolute `Set-Location` example with neutral `repository root` wording |
| `.codex-prompts/phase-0.md` | Sanitized ignored local prompt text so broad local path scans no longer match the private repo path |
| `STATE.md` | Recorded this release audit, validation evidence, asset result, skipped checks, risks, and suggested commit message |

### Public documentation review

| Document | Result |
|---|---|
| `README.md` | Pass; states local-only, synthetic data, mock CRM/Slack, no paid/live-provider calls, no GitHub Actions/deployment config, and no committed GIF/video |
| `HANDOFF.md` | Pass; keeps real-provider credentials and future live integrations approval-gated |
| `docs/CASE_STUDY.md` | Pass; describes the project as a local portfolio demo with mock adapters and synthetic data |
| `docs/DEMO_ASSETS.md` | Pass after update; lists committed screenshots, optional missing screenshots, no committed GIF/video, and skipped capture reason |
| `STATE.md` | Updated with this audit; local absolute path references found elsewhere were sanitized |

### Browser smoke result

Validation note: sandboxed PowerShell launch failed in this workspace with `CreateProcessAsUserW failed: 5`, so local-only commands were run through approved escalated PowerShell. No external provider commands were run.

| Check | Status | Exact result |
|---|---|---|
| Port precheck | pass | Ports `8028` and `3042` were free before smoke |
| Dependency install commands | skipped | `.venv` and `apps/web/node_modules` already existed; `uv --version` returned `uv 0.11.16`; `pnpm --version` returned `11.5.0`; install/sync was skipped to avoid dependency changes |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `docker compose ps` | pass | `salesops-postgres` was `Up` and `healthy` on port `5432` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized and completed at head |
| `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| Backend dev server | pass | README command served local API on `127.0.0.1:8028` |
| Frontend dev server | pass | README command served local Next.js on `127.0.0.1:3042` with local backend env vars |
| `Invoke-RestMethod -Uri "http://127.0.0.1:8028/health" -Method Get` | pass | Returned `status=ok` and service name |
| Home HTTP smoke | pass | `http://127.0.0.1:3042/` returned HTTP `200`; contained `Lead intake form` and `CSV import` |
| Admin HTTP smoke | pass | `http://127.0.0.1:3042/admin/runs` returned HTTP `200`; contained `Admin run history` and `Read-only` |
| Headless Chrome diagnostic | pass after retry | First launch failed because the temporary profile path was not quoted; quoted retry exposed Chrome DevTools successfully using installed Chrome `149.0.7827.55` |
| Rendered home page | pass | Title `SalesOps Workflow Automation Hub`; lead form, CSV import, and latest-result area rendered |
| Upload control | pass | Custom `Choose CSV file` text rendered; file input had `opacity: 0`; no visible browser-native localized upload button text; no Cyrillic text found |
| Removed phase label | pass | `Phase 3 Local Demo` was not present on home or admin |
| Synthetic form submit | pass | Submitted a synthetic `demo_form` lead; UI showed email plus success, dedupe, CRM, and Slack outcomes |
| Synthetic CSV import | pass | Imported one synthetic CSV row; UI showed `1 of 1 rows submitted locally.`, `CSV upload`, and `Session dashboard` |
| Admin run history | pass | Seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` rendered |
| Failed run detail | pass | `run_demo_failed` detail showed read-only state, suggested action, safe intake payload, and attempts |
| Filtered admin state | pass | `?status=failed` preserved failed row and selected status value; `?q=no-such-run` showed `No runs match these filters.` |
| Browser console | pass | Final rendered smoke reported no warnings or errors |
| Cleanup | pass | Temporary backend/frontend smoke processes were stopped; ports `8028` and `3042` were clear afterward |

### Demo assets

| Asset area | Result |
|---|---|
| Tracked screenshot assets | pass; `git ls-files -- "docs/assets/screenshots" "docs/assets/demo"` lists five screenshots plus `docs/assets/demo/README.md` |
| Committed screenshots | `salesops-home.png`, `salesops-csv-session-dashboard.png`, `salesops-admin-run-history.png`, `salesops-admin-failed-detail.png`, `salesops-admin-filtered-detail.png` |
| Optional screenshots not captured | `salesops-form-success.png`, `salesops-admin-empty-filter.png` |
| GIF/video assets | not captured; no GIF/video binaries are committed |
| Skipped capture reason | Still screenshots already cover the public proof points, no paid or third-party capture tool was needed, and large binary recordings should remain optional until the user intentionally selects a final clip |

### Required validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | `M CONTEXT.md`, `M RUNBOOK.md`, `M STATE.md`, `M docs/DEMO_ASSETS.md` |
| `git diff --check` | pass | Exit 0; Git printed expected LF-to-CRLF working-copy warnings for edited Markdown files; no whitespace errors |
| `uv run ruff check .` | pass | `All checks passed!` |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 2.34s`; warning is the known FastAPI/Starlette `TestClient` deprecation warning |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed; duration `14.29s` |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully in `2.6s`; generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| `Test-Path -LiteralPath ".github\workflows"` | pass | `False` |
| `git diff --cached --name-only` | pass | No output; no files staged |

### Forbidden-pattern checks

The scan file list used a PowerShell-safe escaped directory exclusion equivalent for generated directories: `.git`, `.venv`, `node_modules`, `.next`, `dist`, `build`, and `coverage`.

| Check | Status | Result |
|---|---|---|
| Local path and private username scan | pass after docs sanitization | `MatchCount = 0` for the local user-path prefix and local username pattern |
| Credential/key wording pattern | reviewed / expected matches | 152 matches. Matches are safety-boundary docs, placeholder `.env.example` and Docker Compose local demo password text, redaction tests using sentinel strings such as `plain-text-secret`, a redaction regex, lockfile package text, and historical `STATE.md` entries. No real secret values, bearer credentials, private keys, provider tokens, or API keys were found. |
| GitHub Actions / workflow wording pattern | reviewed / expected matches | 156 matches. Matches are explicit out-of-scope documentation and historical `STATE.md` entries. `Test-Path -LiteralPath ".github\workflows"` returned `False`; no workflow directory exists. |
| Provider/action wording pattern | reviewed / expected matches | 122 matches. Matches are safety-boundary wording that says real providers, paid APIs, production APIs, live APIs, and provider actions are absent or approval-gated. No real provider call path was introduced or run. |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| `uv sync` | skipped | Existing `.venv` was present and backend gates ran; this phase forbids dependency changes unless necessary |
| `pnpm install` | skipped | Existing `apps/web/node_modules` was present and frontend gates ran; this phase forbids dependency changes unless necessary |
| Playwright CLI wrapper | skipped | Using it would fetch a package because Playwright is not a project dependency; installed Chrome DevTools Protocol was used instead without adding dependencies |
| GIF/video capture | skipped | Still screenshots are already committed; no paid or third-party capture tool was needed; large video/GIF assets remain optional |
| Optional screenshots | skipped | Form-success and empty-filter screenshots remain optional and not committed |
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow files were added or run |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; all smoke stayed local and mock-safe |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Remaining risks

- The browser smoke used installed Chrome headless at a desktop viewport only; other browsers were not manually checked.
- The smoke submitted two synthetic local records to the local database; deterministic seed rows remain available, but the seed script intentionally does not wipe every locally submitted lead.
- Broad forbidden-pattern scans include documentation and tests, so they intentionally match safety wording, redaction sentinel strings, and historical `STATE.md` entries.
- Demo GIF/video assets are still not captured or committed.
- The backend test suite still emits the known FastAPI/Starlette `TestClient` deprecation warning.

### Manual validation recommendation

Run the documented local flow in PowerShell and inspect:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:8028/docs`

Focus on synthetic form submit, CSV import, committed screenshots, seeded admin rows, filters, failed-run detail, read-only admin posture, and local/mock-only provider boundaries.

### Suggested commit message

```text
Finalize public portfolio release audit
```

## Latest Update - 2026-06-09 Public Portfolio Packaging

### Phase summary

This pass finalized public portfolio packaging for reviewer clarity. The README now opens with a stronger description of what the app does, who it is for, the workflow it automates, and the local mock/synthetic-data boundary. A concise case-study document was added and linked from README and HANDOFF. Demo asset documentation now distinguishes committed screenshots from shots that are not captured yet.

No product behavior, backend code, frontend code, user-facing app text, schemas, migrations, dependencies, lockfiles, generated assets, screenshots, videos, GIFs, `.env` contents, GitHub Actions, real integrations, staging, commits, pushes, deployment config, or live-provider setup was changed.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Strengthened the portfolio landing-page opening, demo proof points, safety boundaries, local validation wording, and case-study links |
| `HANDOFF.md` | Linked the new case study from the reviewer handoff |
| `docs/CASE_STUDY.md` | Added concise client/reviewer case-study content covering problem, solution, workflow, stack, validation, mock boundary, and adaptation opportunities |
| `docs/DEMO_ASSETS.md` | Added explicit captured/not-captured status for still screenshots, GIFs, and video recommendations |
| `STATE.md` | Recorded this packaging phase, validation evidence, skipped checks, remaining risks, and manual follow-up |

### Required validation

Validation note: sandboxed PowerShell launch failed in this workspace with `CreateProcessAsUserW failed: 5`, so local-only commands were run through approved escalated PowerShell. No external provider commands were run.

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | `M HANDOFF.md`, `M README.md`, `M STATE.md`, `M docs/DEMO_ASSETS.md`, `?? docs/CASE_STUDY.md` |
| `git diff --check` | pass | Exit 0; Git printed expected LF-to-CRLF working-copy warnings for edited Markdown files; no whitespace errors |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 2.84s`; warning is the known FastAPI/Starlette `TestClient` deprecation warning |
| `uv run ruff check .` | pass | `All checks passed!` |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed; duration `14.74s` |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully in `2.8s`; generated 8 static pages and expected routes including `/`, `/admin/runs`, and local API proxy routes |
| `Test-Path -LiteralPath ..github\workflows` | pass | `False` |
| `git diff --cached --name-only` | pass | No output; no files staged |

Optional safety check:

| Command | Status | Exact result |
|---|---|---|
| `Test-Path -LiteralPath .\.github\workflows` | pass | `False` |

### Forbidden-pattern checks

| Check | Status | Result |
|---|---|---|
| Requested local user-path pattern | expected command issue | The user-provided unescaped Windows user-profile regex failed before scanning because PowerShell/.NET regex treats that escape sequence as invalid |
| Corrected local user-path pattern | pass | The escaped equivalent returned no output |
| Credential/key wording pattern | pass/expected documentation matches | Matches are safety-boundary wording in HANDOFF/DEMO_SCRIPT/DEMO_ASSETS and historical STATE entries; no actual credential values, keys, bearer strings, passwords, or provider tokens were found |
| Action-word pattern | pass/expected documentation matches | Matches are read-only boundary wording, backend-only retry documentation, and historical STATE entries; no public admin mutation behavior or provider-send workflow was introduced |

### Documentation consistency review

| Area | Result |
|---|---|
| README public landing-page clarity | pass; top section now covers app purpose, audience, automated workflow, synthetic/mock data, and no paid/live-provider requirement |
| Case study | pass; `docs/CASE_STUDY.md` exists and is linked from README and HANDOFF |
| Handoff | pass; reviewers are pointed to demo script, case study, demo assets, and future live-provider boundary |
| Demo assets | pass; committed screenshots are labeled captured, optional screenshots/GIFs/video are labeled not captured yet, and no broken placeholder image links were added |
| Safety boundaries | pass; docs keep real provider calls, paid APIs, production accounts, live webhooks, and real customer data out of scope |
| GitHub Actions / CI | pass; no workflow directory exists and no CI file was added |
| Staging/commit/push | pass; no files staged, no commit created, no push run |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Manual browser smoke | skipped | This phase changed documentation only and did not change app code or user-facing app text; backend/frontend tests, typecheck, lint, and build passed |
| GitHub Actions / CI | skipped | Explicitly forbidden for this project phase; no workflow files were added or run |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; all validation stayed local and mock-safe |
| Demo video/GIF generation | skipped | Explicitly out of scope for this phase; `docs/DEMO_ASSETS.md` now marks video/GIF files as not captured yet |
| Dependency install/update | skipped | Existing dependencies were already present; no dependency manifest or lockfile change was needed |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Manual validation recommendation

Use the documented PowerShell flow in `README.md`, then review these local URLs with synthetic data only:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:8028/docs`

Focus on the public lead form, CSV import, seeded admin rows, filters, failed-run detail, read-only admin posture, and mock/synthetic-data boundary.

### Remaining risks

- Browser smoke was intentionally skipped for this documentation-only phase; the rendered app should still be manually checked before recording or presenting.
- The focused credential/action-word scans match intentional safety-boundary wording and historical `STATE.md` entries, so reviewers should read those matches as documentation context rather than active credential or mutation findings.
- Demo GIF/video files are still not captured or committed; only the still screenshots listed as captured in `docs/DEMO_ASSETS.md` currently exist.
- The backend test suite still emits the known FastAPI/Starlette `TestClient` deprecation warning.

### Next suggested step

Review `README.md`, `HANDOFF.md`, `docs/CASE_STUDY.md`, `docs/DEMO_ASSETS.md`, and `STATE.md` in VS Code. If the documentation diff is acceptable, the user can manually stage, commit, and push.

### Suggested commit message

```text
Finalize portfolio packaging docs
```

## Latest Update - 2026-06-09 Demo Smoke and Portfolio Handoff Polish

### Phase summary

This pass reviewed the demo documentation, added a small optional asset checklist, browser-smoked the documented local demo path with synthetic data only, and reran the required local quality gates.

The local/mock-only boundary remains explicit. No app behavior, schemas, migrations, dependencies, lockfiles, `.env` contents, screenshots, binary media, GitHub Actions, real integrations, staging, commits, pushes, deployment config, or live-provider setup were changed.

### Files changed

| Path | Purpose |
|---|---|
| `docs/DEMO_ASSETS.md` | Added recommended screenshot, GIF, and video shots, suggested filenames, capture rules, and reviewer proof points |
| `docs/DEMO_SCRIPT.md` | Linked the asset checklist and clarified that video/GIF export remains optional and uncommitted |
| `README.md` | Linked the new asset checklist from the screenshots/demo walkthrough and documentation map |
| `HANDOFF.md` | Linked the asset checklist from the reviewer handoff introduction |
| `STATE.md` | Removed absolute local user paths from status history and recorded this phase's smoke and validation evidence |

### Documentation consistency review

| Area | Result |
|---|---|
| Mock-only boundaries | pass; README, HANDOFF, DEMO_SCRIPT, and DEMO_ASSETS keep real providers and paid APIs out of scope |
| Real-provider call implication | pass; docs state CRM/Slack behavior is deterministic mock behavior and future live-provider work is approval-gated |
| Local install/run commands | pass; README, HANDOFF, and DEMO_SCRIPT agree on local PostgreSQL, backend `127.0.0.1:8028`, and frontend `127.0.0.1:3042` |
| Reviewer path | pass; DEMO_SCRIPT remains a 5-10 minute reviewer checklist and HANDOFF keeps the 3-5 minute narration |
| Links | pass; README/HANDOFF links to `docs/DEMO_SCRIPT.md`, `docs/DEMO_ASSETS.md`, and asset docs resolve to repository-relative paths |
| Absolute local Windows paths | pass after edit; focused scan over changed docs returned no local user-profile path matches |
| Large binary media | pass; no screenshots, videos, or GIFs were generated or tracked in this phase |

### Manual browser smoke

Validation note: sandboxed PowerShell launch failed in this workspace with `CreateProcessAsUserW failed: 5`, so local-only commands were run through approved escalated PowerShell. No external provider commands were run.

| Check | Status | Result |
|---|---|---|
| Port precheck | pass | Ports `8028` and `3042` were free before smoke |
| `.env` presence | pass | Local `.env` existed; contents were not printed or edited |
| `docker compose up -d postgres` | pass | `salesops-postgres` was running |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized and completed at head |
| `uv run python -m backend.app.leads.demo_seed` | pass | Seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Backend dev server | pass | `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028` served local API smoke |
| Frontend dev server | pass | Documented Next.js command served `http://127.0.0.1:3042`; `Start-Process` required the Windows `pnpm.cmd` shim, but normal PowerShell `pnpm` usage remains accurate |
| Backend health | pass | `Invoke-RestMethod -Uri "http://127.0.0.1:8028/health" -Method Get` returned `status=ok` |
| FastAPI docs | pass | `Invoke-WebRequest -Uri "http://127.0.0.1:8028/docs" -UseBasicParsing` returned HTTP `200 OK` |
| Frontend home | pass | `Invoke-WebRequest -Uri "http://127.0.0.1:3042/" -UseBasicParsing` returned HTTP `200 OK` |
| Browser home page | pass | Title was `SalesOps Workflow Automation Hub`; `Lead intake form` and `CSV import` rendered |
| Synthetic form submit | pass | Submitted `codex.smoke.form@example.test`; UI showed success plus dedupe, CRM, and Slack outcomes |
| Synthetic CSV import | pass | Imported `codex.smoke.csv@example.test`; UI showed latest result, `CSV upload` source label, and session dashboard update |
| Admin run history | pass | `/admin/runs` rendered read-only admin state and seeded success, failed, queued, and retried runs |
| Admin filters | pass | Direct filter URLs for status, source, search, owner, error type, and date showed the expected seeded rows |
| Empty state | pass | `?q=no-such-run` displayed `No runs match these filters.` |
| Failed run detail | pass | Opening `run_demo_failed` showed failure status, suggested action, sanitized payload, attempts, and read-only detail |
| Admin mutation controls | pass | Visible buttons were reset/details only; no retry, edit, delete, resubmit, rerun, send, or archive controls appeared |
| Browser console | pass | No warning or error entries were reported by the browser log check |
| Cleanup | pass | Temporary backend/frontend smoke processes were stopped; ports `8028` and `3042` were clear afterward |

### Required validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | `M HANDOFF.md`, `M README.md`, `M STATE.md`, `?? docs/DEMO_ASSETS.md`, `?? docs/DEMO_SCRIPT.md` |
| `git diff --check` | pass | Exit 0; Git printed expected LF-to-CRLF working-copy warnings for edited Markdown files; no whitespace errors |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 2.18s`; warning is the existing FastAPI/Starlette `TestClient` deprecation warning |
| `uv run ruff check .` | pass | `All checks passed!` |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed; duration `13.59s` |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully in `2.6s`; generated 8 routes including `/` and `/admin/runs` |
| `Test-Path -LiteralPath ..github\workflows` | pass | `False` |
| `git diff --cached --name-only` | pass | No output; no files staged |

### Docs safety search

| Check | Status | Result |
|---|---|---|
| Prompt-provided `Select-String` pattern | expected command issue | The unescaped local user-profile regex form fails in PowerShell with an invalid escape sequence before scanning |
| Corrected changed-doc safety search | pass | Equivalent escaped pattern was run across README, HANDOFF, STATE, DEMO_SCRIPT, and DEMO_ASSETS; matches were expected safety-boundary or historical-validation wording only |
| Focused absolute local path search | pass | No output for `README.md`, `HANDOFF.md`, `STATE.md`, `docs/DEMO_SCRIPT.md`, or `docs/DEMO_ASSETS.md` |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow files were added or run |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; all smoke stayed local and mock-safe |
| Demo video/GIF generation | skipped | This phase added a checklist only; no large binary media files were generated or tracked |
| Dependency install/update | skipped | Existing dependencies were present; no dependency manifest or lockfile change was needed |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Safety status

- `.env` contents were not printed or edited.
- `.github/workflows` remains absent.
- No files were staged.
- No backend or frontend app behavior was changed.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call was introduced or made.
- No binary screenshots, GIFs, or videos were generated in this phase.

### Remaining risks

- Browser smoke covered the local Windows browser path and documented demo ports only; other browsers were not manually checked.
- The backend test suite still emits the known FastAPI/Starlette `TestClient` deprecation warning.
- A polished demo video/GIF is still not committed; `docs/DEMO_ASSETS.md` now documents the recommended capture plan.

### Next suggested step

Review `docs/DEMO_ASSETS.md`, `docs/DEMO_SCRIPT.md`, `README.md`, `HANDOFF.md`, and `STATE.md` in VS Code. If the documentation diff and smoke evidence are acceptable, the user can manually stage, commit, and push.

### Suggested commit message

```text
Add demo asset checklist and smoke evidence
```

## Latest Update - 2026-06-09 Local Demo Checklist Evidence Pass

### Phase summary

This pass added a concise portfolio reviewer checklist so the local mock demo can be inspected in 5-10 minutes without reading the full handoff first. The checklist keeps the local/mock-only boundary explicit, lists install/run commands, identifies the UI areas and committed screenshot assets to inspect, and documents intentionally out-of-scope items.

No backend code, frontend code, application behavior, schemas, migrations, dependencies, lockfiles, `.env` contents, screenshots, GitHub Actions, real integrations, staging, commits, pushes, deployment config, or live-provider setup were changed.

### Files changed

| Path | Purpose |
|---|---|
| `docs/DEMO_SCRIPT.md` | Added the concise local demo checklist, 5-10 minute reviewer path, UI inspection list, screenshot inventory, safety boundary, and out-of-scope list |
| `README.md` | Linked the new checklist from the suggested demo walkthrough and documentation map |
| `HANDOFF.md` | Linked the new checklist while leaving the fuller handoff and future-provider guidance in place |
| `STATE.md` | Recorded this documentation evidence pass, validation results, skipped checks, remaining risks, and next suggested step |

### Documentation coverage

| Required item | Location |
|---|---|
| Local/mock-only boundary | `docs/DEMO_SCRIPT.md`, `README.md`, `HANDOFF.md` |
| No paid API usage | `docs/DEMO_SCRIPT.md`, `README.md`, `HANDOFF.md` |
| No real-provider calls | `docs/DEMO_SCRIPT.md`, `README.md`, `HANDOFF.md` |
| Install/run commands | `docs/DEMO_SCRIPT.md`, `README.md`, `HANDOFF.md`, `RUNBOOK.md` |
| UI areas to inspect | `docs/DEMO_SCRIPT.md` |
| Screenshots/assets inventory | `docs/DEMO_SCRIPT.md`, `docs/assets/README.md`, `README.md` |
| Intentionally out of scope | `docs/DEMO_SCRIPT.md`, `README.md` |
| 5-10 minute portfolio reviewer path | `docs/DEMO_SCRIPT.md` |

### Validation

Validation note: sandboxed PowerShell launch failed earlier in this workspace with `CreateProcessAsUserW failed: 5`, so the local-only commands were run through approved escalated PowerShell. No external provider commands were run.

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | `M HANDOFF.md`, `M README.md`, `M STATE.md`, `?? docs/DEMO_SCRIPT.md` |
| `git diff --stat` | pass | `HANDOFF.md | 2 ++`; `README.md | 3 +-`; `STATE.md | 101 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++---`; `3 files changed, 101 insertions(+), 5 deletions(-)`; Git printed expected LF-to-CRLF working-copy warnings; untracked `docs/DEMO_SCRIPT.md` is not included by `git diff --stat` until staged |
| `git diff --check` | pass | Exit 0; Git printed expected LF-to-CRLF working-copy warnings for `HANDOFF.md`, `README.md`, and `STATE.md`; no whitespace errors |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 1.86s`; warning is the existing FastAPI/Starlette `TestClient` deprecation warning |
| `uv run ruff check .` | pass | `All checks passed!` |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed; duration `13.66s` |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully in `2.3s`; generated 8 routes including `/` and `/admin/runs` |
| `Test-Path -LiteralPath .\.github\workflows` | pass | `False` |
| `git diff --cached --name-only` | pass | No output; no files staged |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| GitHub Actions / CI | skipped | Explicitly forbidden for this project phase; no workflow files were added or run |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; all validation stayed local and mock-safe |
| Manual browser smoke | skipped | This was a documentation-only checklist/linking pass with no app behavior changes; frontend tests, typecheck, and build passed |
| Dependency install/update | skipped | Existing dependencies were already present; no dependency manifest or lockfile change was needed |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Safety status

- `.github/workflows` remains absent.
- `.env` contents were not printed or edited.
- No files were staged.
- No backend or frontend app behavior was changed.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call was introduced or made.

### Manual validation recommendation

Use [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md) for the shortest reviewer path. After starting the documented local backend and frontend, open:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:8028/docs`

Confirm the public form, CSV import, seeded admin rows, filters, selected failed-run detail, read-only admin posture, and synthetic/mock-only boundary.

### Remaining risks

- This pass did not rerun manual browser smoke because no app behavior changed.
- The backend test suite still emits the known FastAPI/Starlette `TestClient` deprecation warning.
- A demo video/GIF is still not committed; the repository documents still screenshots and a manual recording path only.

### Next suggested step

Manually inspect `docs/DEMO_SCRIPT.md`, `README.md`, `HANDOFF.md`, and `STATE.md` in VS Code. If the documentation diff is acceptable, the user can manually stage, commit, and push.

### Suggested commit message

```text
Add local portfolio demo checklist
```

## Latest Update - 2026-06-09 Portfolio Packaging And Final Public Presentation Polish

### Phase summary

This pass reviewed the public-facing documentation and demo asset references for final portfolio presentation readiness after the accepted release-candidate audit. `README.md` and `HANDOFF.md` already clearly describe the project purpose, business problem, local/mock-only demo posture, stack, local run path, demo seed, frontend/admin/API URLs, out-of-scope boundaries, and reviewer handoff flow, so they were left unchanged.

No backend code, frontend code, application behavior, schemas, migrations, dependencies, lockfiles, `.env` contents, screenshots, GitHub Actions, real integrations, staging, commits, pushes, or live-provider setup were changed.

### Files changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded the accepted release-candidate packaging status, documentation audit result, screenshot path verification, validation results, skipped checks, and remaining risks |

### Documentation audit

| Area | Result |
|---|---|
| `README.md` | Acceptable as the cold-reviewer entry point; covers what the project does, problem solved, local/mock-only posture, stack, setup, seed, frontend/admin/API URLs, validation commands, docs map, and limitations |
| `HANDOFF.md` | Acceptable for reviewer/client handoff; covers mock boundaries, local run sequence, deterministic seed/reset behavior, 3-5 minute demo, before/after workflow, warnings, credential rules, and future live-provider boundary |
| Screenshot/GIF references | Acceptable; README image references point to existing committed local-demo PNGs, and `docs/assets/demo/README.md` accurately states that no video file is committed yet |
| Forbidden claims | No production deployment, live-provider usage, paid API usage, real customer data, or GitHub Actions/CI claim was found in the reviewed presentation docs |

### Screenshot path verification

| Path | Result |
|---|---|
| `docs/assets/screenshots/salesops-home.png` | `True` |
| `docs/assets/screenshots/salesops-csv-session-dashboard.png` | `True` |
| `docs/assets/screenshots/salesops-admin-run-history.png` | `True` |
| `docs/assets/screenshots/salesops-admin-failed-detail.png` | `True` |
| `docs/assets/screenshots/salesops-admin-filtered-detail.png` | `True` |

### Validation

| Check | Status | Result |
|---|---|---|
| Sandboxed PowerShell | blocked/recovered | Workspace sandbox process launch failed with `CreateProcessAsUserW failed: 5`; commands were run through approved escalated local PowerShell |
| Final `git status --short` | pass | `M STATE.md` |
| Final `git diff --stat` | pass | `STATE.md | 99 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++---`; 1 file changed, 95 insertions, 4 deletions; Git printed the expected LF-to-CRLF working-copy warning |
| Final `git diff --check` | pass | Exit 0; Git printed the expected LF-to-CRLF working-copy warning and no whitespace errors |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 2.21s`; warning is the existing FastAPI/Starlette `TestClient` deprecation warning |
| `uv run ruff check .` | pass | `All checks passed!` |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed; duration `14.02s` |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully; generated 8 routes including `/` and `/admin/runs` |
| `.github/workflows` check | pass | `Test-Path -LiteralPath ".\.github\workflows"` returned `False` |
| README image target check | pass | All five README screenshot paths returned `True` |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| GitHub Actions / CI | skipped | Explicitly forbidden for this phase; no workflow files were added or run |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; all validation stayed local and mock-safe |
| Manual browser smoke | skipped in this pass | The user-provided accepted release-candidate audit already recorded manual browser smoke as passed, and this pass changed only documentation status text |
| Dependency install/update | skipped | Existing dependencies were already present; no dependency manifest or lockfile change was needed |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Safety status

- `.github/workflows` remains absent.
- `.env` contents were not printed or edited.
- README, HANDOFF, screenshot assets, backend app code, frontend app code, dependency manifests, and lockfiles were not changed.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call was introduced or made.
- GitHub Actions, commits, pushes, staging, deployment config, and live provider setup remain absent.

### Manual validation recommendation

For reviewer-facing manual QA, run the documented local path from `README.md` or `HANDOFF.md`, then open:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:8028/docs`

Confirm the public form, CSV import, seeded admin rows, filters, selected failed-run detail, and read-only admin behavior using synthetic data only.

### Remaining known issues and backlog

- The backend test suite still emits the known FastAPI/Starlette `TestClient` deprecation warning.
- A demo video/GIF is not committed; `HANDOFF.md` documents the 3-5 minute recording plan.
- Real-provider adapters, auth, deployment, production hardening, and CI remain intentionally out of scope unless explicitly approved later.

### Suggested commit message

```text
Record final portfolio packaging status
```

## Latest Update - 2026-06-09 Final Portfolio Documentation And Handoff Polish Pass

### Phase summary

This pass made the repository easier to review from GitHub without changing app behavior. It tightened the README into a concise reviewer entry point, clarified the local/mock-only safety boundary, kept screenshot references explicit, and expanded the existing handoff document with the concrete local run sequence, demo seed/reset behavior, demo walkthrough, and known local warnings.

No backend code, frontend code, schemas, migrations, dependencies, lockfiles, `.env` contents, GitHub Actions, real integrations, staging, commits, or pushes were changed.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Reworked into a concise cold-reviewer overview with problem, features, stack, screenshots, mock-only safety note, setup/run commands, validation commands, docs map, and limitations |
| `HANDOFF.md` | Added clearer local run sequence, demo seed/reset notes, 3-5 minute walkthrough, known local warnings, and future live-provider boundaries without real-provider setup instructions |
| `STATE.md` | Recorded this phase, validation results, skipped checks, safety status, and remaining known issues |

### Screenshot path verification

| Path | Result |
|---|---|
| `docs/assets/screenshots/salesops-home.png` | `True` |
| `docs/assets/screenshots/salesops-csv-session-dashboard.png` | `True` |
| `docs/assets/screenshots/salesops-admin-run-history.png` | `True` |
| `docs/assets/screenshots/salesops-admin-failed-detail.png` | `True` |
| `docs/assets/screenshots/salesops-admin-filtered-detail.png` | `True` |

### Validation

| Check | Status | Result |
|---|---|---|
| Sandboxed PowerShell | blocked/recovered | Workspace sandbox process launch failed with `CreateProcessAsUserW failed: 5`; commands were run through approved escalated local PowerShell |
| Starting `git status --short` | pass | `M HANDOFF.md`, `M README.md` |
| Final `git diff --check` | pass | Exit 0; Git printed LF-to-CRLF working-copy warnings for `HANDOFF.md`, `README.md`, and `STATE.md`, with no whitespace errors |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 3.07s`; warning is the existing FastAPI/Starlette `TestClient` deprecation warning |
| `uv run ruff check .` | pass | `All checks passed!` |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `v3.2.4`; 4 test files passed; 43 tests passed; duration `14.02s` |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully; generated 8 routes including `/` and `/admin/runs` |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized and completed successfully |
| `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| Final `git status --short` | pass | `M HANDOFF.md`, `M README.md`, `M STATE.md` |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Required local validation gates | none skipped | All commands requested for this phase were run |
| GitHub Actions / CI | skipped | Explicitly forbidden for this project phase; no workflow files were added or run |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; all validation stayed local and mock-safe |
| Manual browser smoke | skipped | This was a documentation/readiness pass with no app behavior changes; README screenshot paths, frontend tests, typecheck, and build were validated instead |
| Dependency install/update beyond documented local commands | skipped | Existing dependencies were already present; no dependency manifest or lockfile change was needed |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Safety status

- `.github/workflows` was not added; `Test-Path -LiteralPath ".\.github\workflows"` returned `False`.
- No files were staged; `git diff --cached --name-only` returned no output.
- Dependency manifests and lockfiles were not changed; `git status --short -- .env .env.example package.json pnpm-workspace.yaml pnpm-lock.yaml uv.lock pyproject.toml apps/web/package.json` returned no output.
- `.env` contents were not printed or edited.
- No backend or frontend app-code diff exists; `git diff -- backend apps` returned no output.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call was introduced or made.
- GitHub Actions, commits, pushes, staging, and live provider setup remain absent.

### Manual validation recommendation

For reviewer-facing manual QA, run the documented local path from `README.md` or `HANDOFF.md`, then open:

- `http://127.0.0.1:3042/`
- `http://127.0.0.1:3042/admin/runs`
- `http://127.0.0.1:8028/docs`

Confirm the public form, CSV import, seeded admin rows, filters, selected failed-run detail, and read-only admin behavior using synthetic data only.

### Remaining known issues and backlog

- The backend test suite still emits the known FastAPI/Starlette `TestClient` deprecation warning.
- A demo video/GIF is not committed; `HANDOFF.md` documents the 3-5 minute recording plan.
- Real-provider adapters, auth, deployment, production hardening, and CI remain intentionally out of scope unless explicitly approved later.

### Suggested commit message

```text
Polish portfolio README and handoff docs
```

## Latest Update - 2026-06-08 Portfolio Demo Assets and Final Visual Release Polish

### Phase summary

This pass replaced the README screenshot placeholder with real local-demo screenshot references and added a small `docs/assets/` structure for portfolio review assets. It stayed documentation/demo-asset focused and did not change app behavior, tests, dependencies, lockfiles, environment files, GitHub Actions, backend APIs, frontend routes, schemas, migrations, real integrations, staging, commits, or pushes.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Replaced the screenshot placeholder with real Markdown references to committed local-demo PNG screenshots |
| `docs/assets/README.md` | Documented screenshot provenance, local-only capture boundaries, and current asset inventory |
| `docs/assets/demo/README.md` | Reserved a clean location for future local-only video/GIF/demo recording exports |
| `docs/assets/screenshots/*.png` | Added five portfolio screenshots captured from local synthetic data |
| `STATE.md` | Recorded this phase, validation, skipped checks, and safety status |

### Demo assets added

| Asset | Screen covered |
|---|---|
| `docs/assets/screenshots/salesops-home.png` | Main SalesOps Workflow Automation Hub page with public lead form and CSV import |
| `docs/assets/screenshots/salesops-csv-session-dashboard.png` | Synthetic form and CSV submissions, latest result, and session dashboard |
| `docs/assets/screenshots/salesops-admin-run-history.png` | Read-only admin run-history table and filters |
| `docs/assets/screenshots/salesops-admin-failed-detail.png` | Selected failed run detail with sanitized failure information and suggested action |
| `docs/assets/screenshots/salesops-admin-filtered-detail.png` | Filtered admin view with selected run detail preserved outside the filtered list |

Capture notes:

- The first local capture verified the documented reviewer path on `127.0.0.1:8028` and `127.0.0.1:3042`.
- The final PNGs were recaptured from a production `next start` server to avoid the Next.js dev indicator in portfolio screenshots.
- During the production recapture, preferred ports `8028` and `3042` were busy from capture child processes, so alternate local ports `23812` and `23814` were used. Those repo-local child processes were identified by command line, stopped, and final listener checks for `8028` and `3042` returned no output.
- Mobile viewport checks for `/` and `/admin/runs` reported `bodyScrollWidth=390`, `viewport=390`, and no page-level horizontal overflow.
- The admin screenshots reflect the current local PostgreSQL state, which includes deterministic seeded demo runs plus prior synthetic local smoke/capture submissions. No real customer data or provider data was used.

### Validation

| Check | Status | Result |
|---|---|---|
| Sandboxed PowerShell | blocked/recovered | Workspace sandbox process launch still failed with `CreateProcessAsUserW failed: 5`; commands were run through approved escalated local PowerShell |
| `git status --short` | pass | `M README.md`, `M STATE.md`, and untracked `docs/` before this `STATE.md` update |
| `git diff --check` | pass | Exit 0; Git printed LF-to-CRLF working-copy warnings for `README.md` and `STATE.md`, with no whitespace errors |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 2.84s`; warning is the existing FastAPI/Starlette `TestClient` deprecation warning |
| `uv run ruff check .` | pass | `All checks passed!` |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | 4 test files passed; 43 tests passed; duration `20.29s` |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js 15.5.18 production build compiled successfully and generated 8 routes |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized and completed successfully |
| `uv run python -m backend.app.leads.demo_seed` | pass | Seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Screenshot capture | pass | Captured five PNGs under `docs/assets/screenshots/` using installed Chrome/CDP and no new dependencies |
| README asset target check | pass | All five README screenshot paths returned `True` with `Test-Path` |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| GitHub Actions / CI | skipped | Explicitly forbidden for this phase; no workflow files were added or run |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-provider smoke | skipped | Explicitly forbidden and not needed; all validation stayed local and mock-safe |
| Dependency install/update | skipped | Existing dependencies were sufficient; no dependency manifest or lockfile change was needed |
| Video/GIF recording | skipped | This phase captured still PNG screenshots; `HANDOFF.md` remains the source for the 3-5 minute demo script/video plan |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Safety status

- `.github/workflows` was not added; `Test-Path -LiteralPath .\.github\workflows` returned `False`.
- No files were staged; `git diff --cached --name-only` returned no output.
- `.env` was not edited or printed.
- Dependency manifests and lockfiles were not changed; `git status --short -- .env .env.example package.json pnpm-workspace.yaml pnpm-lock.yaml uv.lock pyproject.toml apps/web/package.json` returned no output.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call was made.
- Browser activity for screenshot capture used local FastAPI, local Next.js, and local Chrome DevTools Protocol only.
- Temporary capture scripts and Chrome profiles were removed after screenshot generation.

### Known remaining release items

- Optional video/GIF capture remains a manual follow-up using the existing `HANDOFF.md` script.
- Other browsers were not manually checked; visual QA used installed Chrome/CDP at desktop and mobile viewport sizes.

### Suggested commit message

```text
Add portfolio demo screenshots
```

## Latest Update - 2026-06-08 Portfolio Release Readiness Documentation Hardening

### Phase summary

This pass is focused on portfolio-ready local release documentation, run instructions, demo flow clarity, mock/no-paid-API boundaries, and final local validation. It intentionally avoids new features, broad refactors, dependency changes, lockfile changes, GitHub Actions, staging, commits, pushes, real secrets, and real provider calls.

### Documentation review

- Reviewed `README.md`, `STATE.md`, `REQ.md`, `DESIGN.md`, `TDD.md`, `RUNBOOK.md`, `CONTEXT.md`, and `AGENTS.md`.
- Confirmed the docs continue to describe the app as local-first and mock-safe.
- Confirmed docs do not claim implemented CI, production deployment, paid-provider integration, or real provider calls.
- Confirmed the previous completed repair was the Alembic mypy fix in `alembic/env.py`, which made the SQLAlchemy URL fallback explicit and type-safe.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Added an explicit screenshots/demo-assets placeholder and aligned release-readiness validation commands with the current final local hardening gate |
| `STATE.md` | Updated current phase metadata and recorded this documentation/readiness pass |

### Current validation status

| Check | Status | Result |
|---|---|---|
| Sandboxed PowerShell | blocked/recovered | The workspace sandbox could not launch PowerShell (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell |
| Starting `git status --short` | pass | Modified files were limited to `README.md` and `STATE.md` |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 2.75s`; warning is the existing FastAPI/Starlette `TestClient` deprecation warning |
| `uv run ruff check .` | pass | `All checks passed!` |
| `git diff --check` | pass | Exit 0; Git reported LF-to-CRLF working-copy warnings for `README.md` and `STATE.md`, with no whitespace errors |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | 4 test files passed; 43 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js 15.5.18 production build compiled successfully and generated 8 routes |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL migration context initialized and Alembic completed successfully |
| `uv run python -m backend.app.leads.demo_seed` | pass | Seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |

Known non-blocking pytest warning: the backend test suite emitted the existing FastAPI/Starlette `TestClient` deprecation warning. It did not fail the gate.

### Forbidden-pattern checks

| Check | Status | Result |
|---|---|---|
| `.github/workflows` directory | pass | `Test-Path -LiteralPath ".\.github\workflows"` returned `False` |
| Staged files | pass | `git diff --cached --name-only` returned no output |
| `.env`, manifests, and lockfiles | pass | `git status --short -- .env .env.example package.json pnpm-workspace.yaml pnpm-lock.yaml uv.lock pyproject.toml apps/web/package.json` returned no output |
| Diff scope | pass | `git diff --name-only` listed only `README.md` and `STATE.md` |
| Real provider/API/webhook calls | pass | No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call was made |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| GitHub Actions / CI | skipped | Explicitly forbidden for this phase; no workflow files are being added or run |
| Production deployment or staging smoke | skipped | Explicitly out of scope for local portfolio release readiness |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider smoke | skipped | Explicitly forbidden; the project remains local-only and mock-safe |
| Commit, push, and staging | skipped | Explicitly forbidden; Codex must not run `git add`, `git commit`, or `git push` |

### Next recommended phase

After this local validation pass, the next recommended phase is user manual review: inspect the focused documentation diff, run or record the documented local demo path, then manually stage/commit/push only if the reviewer-ready diff is acceptable.

## Latest Update - 2026-06-08 Alembic Mypy Repair

### Reviewer-found failure

Manual backend validation found one mypy error:

```text
alembic\env.py:22: error: Incompatible return value type (got "str | None", expected "str")  [return-value]
```

Root cause: `get_database_url()` returned `config.get_main_option("sqlalchemy.url")` directly. Alembic types that value as `str | None`, while the function contract is `str`.

### Files changed

| Path | Purpose |
|---|---|
| `alembic/env.py` | Added an explicit missing-URL guard before returning the Alembic SQLAlchemy URL |
| `STATE.md` | Recorded the reviewer failure, minimal repair, validation results, skipped checks, and safety status |

### Repair summary

- Preserved the existing precedence: `settings.database_url` still wins when configured.
- Captured `config.get_main_option("sqlalchemy.url")` in a local variable.
- Added a clear `RuntimeError` when Alembic `sqlalchemy.url` is missing.
- Returned the narrowed `str` value after the guard.
- Did not use `or ""` and did not change database behavior beyond making the existing required config assumption explicit.

### Validation

| Check | Status | Result |
|---|---|---|
| Sandboxed PowerShell | blocked/recovered | The workspace sandbox could not launch PowerShell (`CreateProcessAsUserW failed: 5`), so required local commands were run through approved escalated PowerShell |
| `uv run mypy .` | pass | `Success: no issues found in 28 source files` |
| `uv run pytest` | pass with known warning | `48 passed, 1 warning in 2.39s`; warning is the existing FastAPI/Starlette `TestClient` deprecation warning |
| `uv run ruff check .` | pass | `All checks passed!` |
| `git diff --check` | pass | Exit 0; Git reported LF-to-CRLF working-copy warnings for `STATE.md` and `alembic/env.py`, with no whitespace errors |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL migration context initialized; Alembic completed successfully |
| `uv run python -m backend.app.leads.demo_seed` | pass | Seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | 4 test files passed; 43 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js 15.5.18 production build compiled successfully and generated 8 routes |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Requested local validation gates | none skipped | All requested backend, migration/seed, and frontend release commands were run |
| GitHub Actions / CI | skipped | Explicitly forbidden for this task; no workflow files were created or modified |
| Real external provider smoke | skipped | Explicitly forbidden; no real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call was made |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Forbidden-pattern checks

- `.github/workflows` was not added; `Test-Path -LiteralPath '.\.github\workflows'` returned `False`.
- `.env` was not edited or printed. `git status --short -- .env .env.example package.json pnpm-lock.yaml uv.lock pyproject.toml apps/web/package.json` returned no output.
- No dependency or lockfile change was made; the same dependency-file status check returned no output.
- No files were staged; `git diff --cached --name-only` returned no output.
- Final tracked changed files are limited to `STATE.md` and `alembic/env.py`.

## Latest Update - 2026-06-08 Final Portfolio Release Readiness Pass

### Phase summary

This was a final portfolio release-readiness pass focused on public presentation, reviewer documentation, visible app copy, local browser smoke, and release-safety checks.

What changed:

- `README.md` now has a concise portfolio reviewer summary and clearer tests/quality-gates wording while keeping the existing Windows/PowerShell setup path, mock-only boundaries, known limitations, and reviewer checklist intact.
- `apps/web/src/components/admin-run-history.tsx` now formats admin timestamps with explicit `en-US` locale. Browser smoke found that the previous locale-default formatter rendered Cyrillic date text such as `8 июн. 2026 г.` in the admin table on this machine.
- `apps/web/src/components/admin-run-history.test.tsx` now asserts English admin date text and guards against Cyrillic text in the rendered admin test fixture.
- `STATE.md` records this phase's validation, manual QA, skipped checks, and safety status.

No backend behavior, API contract, schema, migration, dependency manifest, lockfile, environment file, GitHub Actions workflow, real integration, provider call, staging action, commit, or push was changed.

### Documentation and presentation review

- Reviewed `README.md`, `STATE.md`, `CONTEXT.md`, `REQ.md`, `RUNBOOK.md`, `HANDOFF.md`, `DESIGN.md`, and `TDD.md`.
- Reviewed main-page and admin-page visible copy in `apps/web/src/components/lead-demo.tsx` and `apps/web/src/components/admin-run-history.tsx`.
- Checked tracked docs for screenshot/GIF/image references. No README/doc image asset references were stale or broken; tracked docs only mention screenshots as QA artifacts or recording guidance.
- Checked visible app copy for Russian text, internal phase/debug labels, placeholder copy, and awkward demo-only wording. The only true blocker found was admin timestamp localization, which was fixed.

### Files changed

| Path | Purpose |
|---|---|
| `README.md` | Added a portfolio reviewer summary and clarified the tests/quality-gates section |
| `apps/web/src/components/admin-run-history.tsx` | Made admin timestamp formatting explicitly English with `en-US` |
| `apps/web/src/components/admin-run-history.test.tsx` | Added regression coverage for English admin date text and no Cyrillic rendered copy |
| `STATE.md` | Recorded this final release-readiness pass |

### Validation

| Check | Status | Result |
|---|---|---|
| Sandboxed PowerShell | blocked/recovered | The workspace sandbox could not launch PowerShell (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell |
| Starting `git status --short --branch` | pass | `## main` before edits |
| Focused admin regression test | pass | `pnpm --dir apps/web exec vitest run admin-run-history`: 1 test file and 32 tests passed |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | 4 test files and 43 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js 15.5.18 production build compiled successfully and generated 8 routes including `/` and `/admin/runs` |
| Final `git diff --check` | pass | Exit 0 after this `STATE.md` update |

### Browser QA details

- Local setup: `.env` already existed; PostgreSQL was already running and healthy; ports `8028` and `3042` were clear before smoke. `uv run alembic upgrade head` reached head, and `uv run python -m backend.app.leads.demo_seed` seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Temporary smoke servers: backend ran on `127.0.0.1:8028`; frontend ran on `127.0.0.1:3042` with `BACKEND_API_BASE_URL` and `NEXT_PUBLIC_BACKEND_API_BASE_URL` pointed at the local backend.
- Main page desktop: `/` loaded with title/H1 `SalesOps Workflow Automation Hub`; reviewer-facing source labels rendered as `Demo form`, `CSV upload`, and `Manual entry`; page-level overflow was false (`scrollWidth=1351`, viewport `1366`).
- Main form flow: after waiting for hydration, a synthetic lead submit added the exact submitted email to the session dashboard and showed a successful latest result with backend dedupe, CRM, and Slack outcomes.
- CSV flow: CSV textarea import submitted one synthetic row, showed `1 of 1 rows submitted locally.`, and added the exact CSV email to the session dashboard.
- Main mobile: `390x844` viewport had no page-level horizontal overflow (`scrollWidth=375`, viewport `390`) and no visible Cyrillic/internal/debug copy.
- Admin desktop: `/admin/runs` loaded seeded runs, read-only labels, source labels, and English dates such as `Jun 8, 2026`; raw source enum cells and Cyrillic date text were absent; page-level overflow was false (`scrollWidth=1351`, viewport `1366`).
- Admin details: after narrowing to `q=run_demo_failed`, a visible click on `View details for run_demo_failed` opened the read-only detail panel with suggested action.
- Admin keyboard: local headless Chrome/CDP focused the visible native `View details for run_demo_failed` button and Space activation opened the run detail panel. In-app Browser key helpers focused the button but did not synthesize native activation; CDP verified the actual keyboard path.
- Admin horizontal scroll: top horizontal rail moved table and rail to `scrollLeft=159.2`.
- Admin mouse-drag scroll: table drag changed horizontal scroll from `159.2` to `162.4`.
- Admin mobile: `390x844` viewport had no page-level horizontal overflow (`scrollWidth=375`, viewport `390`); table overflow stayed contained (`clientWidth=310`, `scrollWidth=1345`); no visible Cyrillic/internal/debug copy.
- Console capture: in-app browser warning/error logs were empty for main and admin checks.
- Cleanup: temporary backend, frontend, and Chrome smoke processes were stopped; ports `8028`, `3042`, and `9224` were clear; temporary smoke logs/profiles were removed. PostgreSQL was left running as the existing local Docker service.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest/Ruff/mypy | skipped | This pass changed only README, frontend timestamp formatting/test coverage, and `STATE.md`; backend behavior, contracts, schemas, migrations, adapters, dependencies, and environment variables were intentionally untouched |
| Real provider/API smoke | skipped | Explicitly forbidden and not relevant; all app traffic stayed local and mock-safe |
| GitHub Actions/CI | skipped | Explicitly out of scope; no workflow files were created or modified |
| Dependency install/update | skipped | Existing dependencies were present; no dependency was needed or introduced |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No dependency, lockfile, `.env`, backend schema, migration, or GitHub Actions change was made.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call was made.
- Remaining risk: browser smoke used Chrome/in-app browser on this Windows machine; other browsers were not manually checked.

## Latest Update - 2026-06-08 Portfolio Release Polish and Final Local Smoke Pass

### Phase summary

This was a controlled frontend-only release-polish and local smoke pass for the reviewer demo path at `http://127.0.0.1:3042/` and `http://127.0.0.1:3042/admin/runs`.

Small polish issues found and fixed:

- Source dropdowns and source table/detail cells rendered raw enum text such as `demo_form`, `csv_upload`, and `manual`. They now display reviewer-facing labels while keeping the same submitted values, query params, and backend contract.
- A synthetic Chrome/CDP drag smoke check exposed a `setPointerCapture` `NotFoundError` when the browser event was not an active pointer. The table now continues dragging without capture in that edge case, preventing console errors during smoke checks.

No backend file, API route, schema, migration, dependency, environment variable, GitHub Actions workflow, real integration, secret, commit, push, or staging action was changed.

### Files changed

| Path | Purpose |
|---|---|
| `apps/web/src/lib/format.ts` | Added `leadSourceLabel()` for shared reviewer-facing lead source labels |
| `apps/web/src/components/lead-demo.tsx` | Displayed source labels in the main form, session dashboard, and source filter while preserving raw values |
| `apps/web/src/components/lead-demo.test.tsx` | Added assertions that source controls show English labels and keep API values |
| `apps/web/src/components/admin-run-history.tsx` | Displayed source labels in the admin filter, run table, and detail panel; guarded pointer capture during drag |
| `apps/web/src/components/admin-run-history.test.tsx` | Updated source-label expectations and added pointer-capture failure regression coverage |
| `STATE.md` | Recorded this final polish/smoke pass, validation, manual QA, skipped checks, and safety status |

### Validation

| Check | Status | Result |
|---|---|---|
| Sandboxed PowerShell | blocked/recovered | The workspace sandbox still could not launch PowerShell (`CreateProcessAsUserW failed: 5`), so required local commands were run through approved escalated local PowerShell |
| Starting `git status --short --branch` | pass | `## main` at phase start |
| Post-change `git status --short --branch` | pass | Branch `main`; modified files limited to frontend source/test files before this `STATE.md` update |
| Focused regression tests | pass after test selector/helper adjustments | `pnpm --dir apps/web exec vitest run lead-demo admin-run-history`: 2 test files and 39 tests passed |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | 4 test files and 43 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js 15.5.18 production build compiled successfully and generated 8 routes including `/` and `/admin/runs` |
| Final `git diff --check` | pass | Exit 0; Git printed LF-to-CRLF working-copy warnings for the touched files only |
| Final `git status --short --branch` | pass | Branch `main`; modified files are `STATE.md`, `admin-run-history` source/test, `lead-demo` source/test, and `apps/web/src/lib/format.ts`; no staged files |

### Browser QA details

- Browser path: direct Browser plugin tools were not exposed in this session; project Playwright was not installed and was not added. QA used installed Chrome headless through Chrome DevTools Protocol from PowerShell, with no dependency install and no external service calls.
- Local setup: PostgreSQL was already healthy, Alembic reached head, the deterministic demo seed inserted `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`, then temporary backend/frontend listeners were started on `127.0.0.1:8028` and `127.0.0.1:3042`.
- Main page desktop `1366x768`: page loaded at `/`, title and H1 were `SalesOps Workflow Automation Hub`, no internal phase/API/parser label appeared near the heading, source options displayed `Demo form`, `CSV upload`, and `Manual entry`, and page-level horizontal overflow was false (`scrollWidth=1351`, viewport `1366`).
- CSV controls: custom `Choose CSV file` control rendered with initial `No file selected`; selecting `agency-leads.csv` updated the visible filename and populated the CSV textarea; `Import rows` submitted the file content and showed `1 of 1 rows submitted locally.`
- Main form flow: a synthetic lead submission returned a successful latest result with backend dedupe, mock CRM, and mock Slack outcomes; no page-level overflow appeared after flows.
- Admin desktop `1366x768`: `/admin/runs` loaded, `run_demo_failed` was present, source labels were English-facing, raw source enum cells were absent from the table, the table had 11 headers and 11 cells in the first row, and page-level overflow was false (`scrollWidth=1351`, viewport `1366`).
- Admin detail and keyboard: focusing `View details for run_demo_failed` and activating from keyboard opened the detail panel.
- Admin drag and sync: top rail `scrollLeft=160` synced the table to `160`; table `scrollLeft=90` synced the rail to `90`; horizontal drag moved table scroll from `120` to `163`; drag-release over `View details` did not open details; the next normal click opened the read-only detail panel.
- Admin mobile `390x844`: page-level horizontal overflow was false (`scrollWidth=390`, viewport `390`); the table remained horizontally scrollable (`clientWidth=324`, `scrollWidth=1345`); rail/table sync stayed aligned at `scrollLeft=200`; 11 headers and 11 row cells remained present.
- Console capture: final main desktop, admin desktop, admin mobile, and CDP warning/error event captures were empty.
- Cleanup: temporary backend/frontend/Chrome listeners were stopped; ports `3042`, `8028`, and `9223` were clear; the temporary Chrome profile under the OS temp directory was removed. PostgreSQL was left running as the existing local Docker service.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest/Ruff/mypy | skipped | This phase changed only frontend source/tests and `STATE.md`; backend behavior, contracts, schemas, migrations, adapters, dependencies, and environment variables were intentionally untouched |
| Browser plugin direct QA | skipped/fallback used | Direct Browser MCP tools were not exposed; Chrome/CDP was used instead |
| Project Playwright QA | skipped | Playwright is not installed in this project, and the phase explicitly says not to introduce it unless already configured |
| Real provider/API smoke | skipped | Explicitly forbidden and not relevant; all traffic stayed local and mock-safe |
| GitHub Actions/CI | skipped | Explicitly out of scope; no workflow files were created or modified |
| Commit, push, and staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No dependency install, upgrade, removal, or lockfile change was performed.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service call was made.
- Forbidden-pattern checks for changed files are recorded in the final response for this phase.

## Latest Update - 2026-06-08 Final UX/Regression Hardening: Admin Persisted Runs Table

### What was checked

- `apps/web/src/components/admin-run-history.tsx` was inspected for the persisted-runs table interaction model after the drag-to-scroll and `View details` click repair.
- `apps/web/src/components/admin-run-history.test.tsx` was inspected for focused regression coverage around normal details clicks, real horizontal left-mouse drag, drag-release click suppression, post-drag click recovery, vertical-dominant movement, touch-pointer ignore behavior, and table/rail scroll sync.
- The component code already scoped drag behavior to primary non-touch left-pointer input, delayed pointer capture until the horizontal threshold is crossed, avoided `preventDefault()` for vertical-dominant motion, kept touch behavior natural by ignoring touch pointer gestures, and left `View details` as a native button.

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.test.tsx` | Added one focused regression test proving keyboard activation on `View details` still opens the selected run detail, covering the remaining accessibility edge case without changing component behavior |
| `STATE.md` | Recorded this final frontend-only hardening pass, validation, browser QA, skipped checks, and cleanup status |

No backend file, API route, schema, migration, dependency, environment variable, GitHub Actions workflow, real integration, or lead-demo file was changed. `apps/web/src/components/admin-run-history.tsx` was inspected but not edited.

### Validation

| Check | Status | Result |
|---|---|---|
| Sandboxed PowerShell | blocked/recovered | The workspace sandbox could not launch PowerShell (`CreateProcessAsUserW failed: 5`), so required local commands were run through approved escalated local PowerShell |
| `pnpm --dir apps/web exec vitest run admin-run-history` | pass | 1 test file and 31 tests passed |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | 4 test files and 42 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js 15.5.18 production build completed and generated `/admin/runs` plus local API proxy routes |
| `git diff --check` | pass | Exit 0 after this update |
| `git status --short --branch` | pass | Branch remained `main`; changed files are limited to `STATE.md` and `apps/web/src/components/admin-run-history.test.tsx`; no staged files |

### Browser QA details

- Browser path: Browser plugin tools were not available; project Playwright was not installed (`Command "playwright" not found`); Node REPL did not have Playwright; QA used installed Chrome headless through Chrome DevTools Protocol without adding dependencies.
- Local setup: the existing frontend listener on `3042` initially served a stale Next dev 500 error and exited before it could be stopped; the backend listener on `8028` later disappeared during setup. PostgreSQL was already healthy, Alembic reached head, deterministic demo seed wrote `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`, then temporary backend/frontend listeners were started on `127.0.0.1:8028` and `127.0.0.1:3042`.
- Desktop `1366x768`: `/admin/runs` loaded with title `SalesOps Workflow Automation Hub`; the page was not blank; no Next/runtime overlay appeared; page-level horizontal overflow was false (`scrollWidth=1351`, viewport `1366`).
- Normal `View details` click opened the read-only detail panel and updated the URL with the clicked run ID.
- Horizontal left-mouse drag over the table moved table `scrollLeft` from `120` to `163`; the top rail synced within a small browser scroll-limit rounding tolerance (`160`), and the detail panel stayed idle.
- Drag-release over `View details` did not open details; the next normal click opened details again.
- Vertical-dominant movement left table `scrollLeft` unchanged at `90`, did not add the dragging class, and did not open details.
- Scrollbar/table sync passed both directions: rail `160` synced table `160`, and table `90` synced rail `90`.
- Mobile `390x844`: page-level horizontal overflow was false (`scrollWidth=390`, viewport `390`), the table remained horizontally scrollable (`clientWidth=324`, `scrollWidth=1345`), computed `touch-action` was `auto`, touch vertical scroll moved the page from `0` to `395`, and table/rail sync stayed usable at `scrollLeft=200`.
- Console warning/error capture returned no entries; screenshots were captured under the OS temp directory for desktop and mobile evidence.
- Temporary Chrome profiles were removed after QA. The temporary backend/frontend listeners on `8028` and `3042` were stopped after verification; both ports were clear. PostgreSQL was left running as the existing local Docker service.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest/Ruff/mypy | skipped | This pass changed only a frontend component test and `STATE.md`; backend behavior, contracts, schemas, migrations, adapters, dependencies, and environment variables were intentionally untouched |
| Browser plugin QA | skipped | Browser plugin tools were not available in this session |
| Project Playwright QA | skipped | The project has no Playwright binary; no dependency install was requested or needed |
| Native scrollbar thumb drag | limited | Chrome CDP does not directly drag the native scrollbar thumb; scroll-handler sync was verified by scroll events on both scrollers and by real table drag movement |
| Real provider/API smoke | skipped | Explicitly forbidden and not relevant; all QA stayed local and mock-safe |
| GitHub Actions/CI | skipped | Explicitly out of scope |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, dependency install, provider API call, or GitHub Actions change was run.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service call was made.
- No lead-demo file was edited.

## Latest Update - 2026-06-08 RC Repair: Admin Run Details Click Regression

### Regression found

After the persisted-runs table drag-to-scroll phase, a normal click on `View details` could fail to open run details. The regression was isolated to `apps/web/src/components/admin-run-history.tsx`; the button still called `onSelectRun(run.run_id)` directly, but the parent table scroller captured pointer state before proving the gesture was a real horizontal drag.

### Root cause

The table scroll container called `setPointerCapture()` on every primary non-touch `pointerdown`, including ordinary clicks that started on nested `View details` buttons. In real browser behavior that premature capture could retarget or swallow the nested button click before the button handler ran. Click suppression also lived on the parent capture path, so the safe behavior is to arm capture and suppression only after the existing horizontal drag threshold is crossed.

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.tsx` | Moved pointer capture from `pointerdown` into the true-drag threshold branch, leaving `preventDefault()` and click suppression limited to real horizontal drags; preserved touch ignore behavior, vertical-dominant movement behavior, the top rail, table layout, and the simple `View details` button handler |
| `apps/web/src/components/admin-run-history.test.tsx` | Added focused regression coverage for normal details clicks, ordinary button pointer presses not arming capture, left-mouse horizontal drag scrolling, drag-release click suppression, post-drag click recovery, and vertical-dominant movement not hijacking the table |
| `STATE.md` | Recorded the regression, root cause, fix, validation, browser QA, skipped checks, and safety status for this frontend-only repair |

No backend file, API route, schema, migration, dependency, environment variable, GitHub Actions workflow, real integration, or lead-demo file was changed by this repair. Existing unrelated dirty `apps/web/src/components/lead-demo.tsx` and `apps/web/src/components/lead-demo.test.tsx` changes were preserved.

### Validation

| Check | Status | Result |
|---|---|---|
| Sandboxed PowerShell | blocked/recovered | The workspace sandbox still could not launch PowerShell (`CreateProcessAsUserW failed: 5`), so required local PowerShell commands were run through approved escalated local PowerShell |
| Focused admin tests | pass | `pnpm --dir apps/web exec vitest run admin-run-history` passed: 1 test file, 30 tests |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | 4 test files and 41 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js 15.5.18 production build completed and generated `/admin/runs` plus local API proxy routes |
| `git diff --check` | pass | Exit 0; Git printed existing LF-to-CRLF working-copy warnings |
| `git diff --name-only` | pass | Listed `STATE.md`, `apps/web/src/components/admin-run-history.test.tsx`, `apps/web/src/components/admin-run-history.tsx`, and the pre-existing dirty lead-demo files |
| `git diff --stat` | pass | Diff stat was produced; the total includes existing uncommitted admin and lead-demo changes from prior phases |
| `git status --short --branch` | pass | Branch remained `main` with modified `STATE.md`, admin-run-history files, and existing lead-demo files; no staged files |

### Browser QA details

- Local setup: PostgreSQL was already healthy, Alembic reached head, demo seed wrote `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`, backend health passed on `127.0.0.1:8028`, `/admin/runs` returned HTTP 200 on `127.0.0.1:3042`, and the frontend proxy returned local run data.
- Browser path: Browser plugin was not available; project Playwright was not installed (`Command "playwright" not found`), so QA used installed Chrome headless through Chrome DevTools Protocol without adding dependencies.
- Desktop `1366x768`: `/admin/runs` loaded with title `SalesOps Workflow Automation Hub`; initial detail panel stayed idle; document/body scroll width was `1351` against viewport `1366`, so page-level horizontal overflow was false.
- Desktop normal click: actual CDP mouse click on `View details for run_demo_failed` opened `/admin/runs?runId=run_demo_failed` and rendered the read-only `Run detail` panel.
- Desktop drag behavior: Chrome CDP mouse events did not synthesize DOM pointer movement for this React pointer-handler path, so the drag check used DOM-dispatched `PointerEvent` gestures against the rendered component; table `scrollLeft` moved to `160`, and drag-release/click over `View details` left the detail panel idle.
- Post-drag recovery: after the drag-release suppression check, a normal actual CDP mouse click on `View details for run_demo_failed` opened the run detail panel again.
- Scroll sync: setting the top rail scroll and dispatching a scroll event synced the table/rail to `160`; setting table scroll and dispatching a scroll event synced both to `90`.
- Mobile `390x844`: document/body scroll width stayed `390`, page-level horizontal overflow was false, table remained horizontally scrollable (`clientWidth=324`, `scrollWidth=1345`), computed `touch-action` was `auto`, vertical page scroll moved from `0` to `320`, and table/rail stayed synced at `scrollLeft=200`.
- Console checks returned no warning/error entries; no framework overlay was detected.
- Temporary backend/frontend listeners on ports `8028` and `3042` were stopped after QA; both ports were clear. PostgreSQL was left running as the existing local Docker service.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest/Ruff/mypy | skipped | This repair changed only frontend table interaction code, frontend component tests, and `STATE.md`; backend behavior, contracts, schemas, migrations, adapters, dependencies, and environment variables were intentionally untouched |
| Browser plugin QA | skipped | Browser plugin tools were not available in this session |
| Project Playwright QA | skipped | The project has no Playwright binary; no dependency install was requested or needed |
| Native scrollbar thumb drag | limited | Chrome CDP does not directly drag the overlay/native scrollbar thumb in this setup; scroll-handler sync was verified by dispatching scroll events on both scrollers, and component tests cover the same sync path |
| Real provider/API smoke | skipped | Explicitly forbidden and not relevant; all QA stayed local and mock-safe |
| GitHub Actions/CI | skipped | Explicitly out of scope |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, dependency install, provider API call, or GitHub Actions change was run.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service call was made.
- Temporary Chrome profile cleanup was attempted only under the OS temp directory; the Chrome process was stopped after QA.

## Latest Update - 2026-06-08 RC UI Polish: Persisted Runs Table Drag-To-Scroll

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.tsx` | Added horizontal drag-to-scroll on the persisted-runs table scroll container using primary pointer events, a small drag threshold, click suppression after real drags, rail synchronization, `cursor-grab`/`cursor-grabbing` affordance, touch-pointer ignore behavior, and a no-dependency mouse fallback for jsdom/non-pointer environments |
| `apps/web/src/components/admin-run-history.test.tsx` | Added regression coverage for horizontal drag updating `scrollLeft`, syncing the top rail, ignoring non-primary/touch-like input, preserving drag cursor classes, suppressing accidental detail clicks after a drag, and keeping normal `View details` clicks working |
| `STATE.md` | Recorded this frontend-only drag-to-scroll phase, validation, browser QA notes, skipped checks, limitations, and safety status |

Existing table heading/cell alignment, top rail behavior, Source/Owner truncation titles, `View details` button styling, no page-level horizontal overflow posture, and read-only admin behavior were preserved. Backend behavior, API contracts, migrations, dependencies, provider logic, environment variables, deployment configuration, GitHub Actions, real integrations, CSV import, lead demo behavior, secrets, commits, pushes, branch operations, stashes, resets, rebases, and destructive Git actions were not changed.

### Validation

| Check | Status | Result |
|---|---|---|
| Sandboxed PowerShell | blocked/recovered | Workspace sandbox still failed to launch PowerShell with `CreateProcessAsUserW failed: 5`; required PowerShell commands were rerun through approved escalated local PowerShell |
| `pnpm --dir apps/web exec vitest run admin-run-history` | pass after test adjustment | Focused admin suite passed: 1 file and 25 tests; an initial focused run failed because jsdom did not provide reliable pointer-event coordinates, so the implementation kept pointer events for browsers and added a no-dependency mouse fallback for jsdom/non-pointer environments |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | 4 test files and 36 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js 15.5.18 production build completed and generated 8 routes including `/admin/runs` |
| Local setup for browser QA | pass | `docker compose ps` showed PostgreSQL healthy, Alembic reached head, demo seed wrote `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`, backend health passed on `127.0.0.1:8028`, and `/admin/runs` returned HTTP 200 from frontend `127.0.0.1:3042` |
| Browser QA | pass/limited | In-app Browser loaded `/admin/runs`, verified seeded rows render, top rail scroll syncs into the table, table drag works, drag gestures do not open details, `View details` opens the detail panel, desktop/mobile page overflow stayed false, mobile table remained usable, computed mobile `touch-action` stayed `auto`, and console warnings/errors were empty |
| Final git checks | pass | `git status --short --branch`, `git diff --name-only`, `git diff --stat`, and `git diff --check` were run after this update; whitespace check exited 0 |

### Browser QA details

- Browser path: in-app Browser plugin was available and used.
- Desktop `1366x768`: page title was `SalesOps Workflow Automation Hub`; seeded `run_demo_failed` content was present; table cursor was `grab`; rail `clientWidth=1181`, `scrollWidth=1340`; table `clientWidth=1182`, `scrollWidth=1345`; body scroll width was `1351` against viewport `1366`; page-level horizontal overflow was false.
- Desktop top rail interaction: Browser horizontal scroll on the top rail moved both rail and table to `scrollLeft=159.2`.
- Desktop table drag interaction: dragging the table horizontally changed table `scrollLeft`, left the detail panel idle, kept URL at `/admin/runs`, and did not create page-level horizontal overflow; clicking `View details for run_demo_failed` then opened `/admin/runs?runId=run_demo_failed` and rendered the read-only detail panel.
- Mobile `390x844`: after scrolling to the table, body/document scroll width was `375` against viewport `390`; rail `clientWidth=308`, `scrollWidth=1340`; table `clientWidth=310`, `scrollWidth=1345`; table cursor was `grab`; computed `touch-action` was `auto`; table drag synced both rail and table to `scrollLeft=200`; page-level horizontal overflow remained false.
- Console checks returned no warnings or errors on desktop and mobile.
- Temporary backend/frontend listeners used for QA were stopped after verification; PostgreSQL was left running as the existing local Docker service.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest/Ruff/mypy | skipped | This phase changed only frontend table interaction code, frontend component tests, and `STATE.md`; backend behavior, API contracts, schemas, migrations, adapters, dependencies, and environment variables were intentionally untouched |
| Native bottom scrollbar sync in Browser | limited | The in-app Browser wheel-style table scroll can mutate `scrollLeft` without firing React scroll handlers, and the overlay/native scrollbar thumb was not directly draggable through Browser automation; scroll-event synchronization remains covered by Vitest and should be spot-checked manually with a real mouse if desired |
| Browser screenshots | limited | Browser screenshot capture timed out during desktop QA; DOM metrics, interactions, URL state, detail panel state, and console logs were captured instead |
| Real provider/API smoke | skipped | Explicitly forbidden and not relevant; all QA stayed local and mock-safe |
| GitHub Actions/CI | skipped | Explicitly out of scope |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, dependency install, provider API call, or GitHub Actions change was run.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service call was made.
- Existing unrelated dirty `apps/web/src/components/lead-demo.tsx` and `apps/web/src/components/lead-demo.test.tsx` changes were preserved and not modified in this phase.

## Latest Update - 2026-06-07 RC UI Polish: Persisted Runs Table Alignment And Top Scroll Rail

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.tsx` | Centered every persisted-runs table heading, centered Status/Source/Owner/Error type/Attempts/Failure detail/Detail cells, added a synchronized top horizontal scroll rail, and kept Source/Owner truncation titles plus centered `View details` actions |
| `apps/web/src/components/admin-run-history.test.tsx` | Added regression coverage for the top scroll rail, bidirectional scroll sync, centered headings, requested centered cells, and preserved Source/Owner truncation titles |
| `STATE.md` | Recorded this frontend-only repair, validation, browser QA, skipped backend reason, and git safety status |

CSV textarea behavior, backend behavior, API contracts, migrations, dependencies, provider logic, environment variables, deployment configuration, GitHub Actions, real integrations, secrets, commits, pushes, branch operations, stashes, resets, rebases, and destructive Git actions were not changed.

### Validation

| Check | Status | Result |
|---|---|---|
| `pnpm --dir apps/web exec vitest run admin-run-history` | pass | Focused admin component suite passed: 1 file, 24 tests |
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | 4 test files and 35 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js 15.5.18 production build completed, including `/admin/runs` |
| Local setup for browser QA | pass | PostgreSQL was running, Alembic reached head, demo seed wrote the four synthetic run IDs, backend listened on `127.0.0.1:8028`, and frontend listened on `127.0.0.1:3042` |
| Browser QA | pass | Chrome headless via CDP loaded `/admin/runs`, verified all headings centered, requested body cells centered, unrequested data cells left-aligned, Source/Owner titles and ellipsis preserved, `View details` loaded the detail panel, top rail and table scroller synced both directions, desktop/mobile page overflow stayed false, and console warnings/errors were empty |

### Browser QA details

- Browser plugin tools were not available in this session.
- `pnpm --dir apps/web exec playwright --version` failed because the project has no Playwright binary; `npx` was available, but the local wrapper is a shell script and this task requires PowerShell-compatible commands.
- Fallback used installed Chrome headless through Chrome DevTools Protocol without adding dependencies.
- Desktop `1366x768`: rail `clientWidth=1180`, `scrollWidth=1340`; table `clientWidth=1182`, `scrollWidth=1345`; page/body scroll widths stayed within viewport; `View details` center delta was `0.25px`.
- Mobile `390x844`: rail `clientWidth=322`, `scrollWidth=1340`; table `clientWidth=324`, `scrollWidth=1345`; page/body scroll widths were `390`; `View details` center delta was `0.25px`.
- Temporary backend/frontend listeners on ports `8028` and `3042` were stopped after QA; temporary Chrome profile directories were removed.

### Skipped checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest/Ruff/mypy | skipped | This repair changed only frontend table presentation, frontend tests, and `STATE.md`; backend behavior, API contracts, schemas, migrations, adapters, dependencies, and environment variables were intentionally untouched |
| Real provider/API smoke | skipped | Explicitly forbidden and not relevant; all QA stayed local and mock-safe |
| GitHub Actions/CI | skipped | Explicitly out of scope |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, dependency install, provider API call, or GitHub Actions change was run.

## Latest Update - 2026-06-07 RC UI Polish: CSV Empty State And Admin Table Alignment

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/lead-demo.tsx` | Made the CSV textarea empty by default and kept the example CSV as placeholder-only guidance |
| `apps/web/src/components/lead-demo.test.tsx` | Added regression coverage for the empty CSV textarea default and placeholder sample |
| `apps/web/src/components/admin-run-history.tsx` | Widened the persisted runs table, added column separation/padding, truncated Source/Owner values with titles, and used tabular numeric styling for table timestamps/attempt counts |
| `apps/web/src/components/admin-run-history.test.tsx` | Added focused assertions for the wider table, Source/Owner separation, and Source/Owner truncation |

Backend behavior, API contracts, migrations, dependencies, GitHub Actions, real integrations, secrets, staging, commits, pushes, branch operations, stashes, resets, rebases, and destructive cleanup were not changed.

### Validation

| Check | Status | Result |
|---|---|---|
| `pnpm --dir apps/web run lint` | pass | ESLint exited 0 |
| `pnpm --dir apps/web exec vitest run` | pass | 4 test files and 35 tests passed |
| `pnpm --dir apps/web run typecheck` | pass | `tsc --noEmit` exited 0 |
| `pnpm --dir apps/web run build` | pass | Next.js 15.5.18 production build completed and generated 8 routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | 48 tests passed with 1 existing FastAPI/Starlette deprecation warning |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | All checks passed |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | No issues in 26 source files |
| Local smoke | pass | Alembic upgrade reached local PostgreSQL, demo seed wrote 4 synthetic runs, backend `/health` passed on `127.0.0.1:8028`, frontend `/` and `/admin/runs` returned HTTP 200 on `127.0.0.1:3042`, and one synthetic proxy `POST /api/leads/intake` returned `run_status=success` |
| Browser QA | pass/limited | In-app Browser verified homepage load, empty CSV textarea default, placeholder sample, CSV textarea import, form submit, duplicate hint, `/admin/runs`, native date inputs with English app labels, clearer table separation, contained mobile overflow, and zero console warnings/errors; screenshot capture timed out and Browser file upload is not exposed, so CSV file upload remains covered by Vitest |
| Forbidden-pattern scans | pass/limited | No live provider URLs or token-shaped secrets found; old phase-label and Cyrillic matches are historical `STATE.md`/path text, not app-owned active UI |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, dependency install, provider API call, or GitHub Actions change was run.
- Temporary backend/frontend listeners started for QA on ports `8028` and `3042` were stopped after validation.

### Remaining risks

- Browser screenshot capture timed out through the Browser API, so visual proof is based on DOM, layout metrics, interactions, and console checks.
- The Browser API does not expose a file upload method; selected-file loading is covered by existing Vitest upload coverage rather than live Browser file selection.

## Latest Update - 2026-06-07 Final Portfolio Demo Readiness Pass

### What changed

| Path | Purpose |
|---|---|
| `README.md` | Recentered reviewer quick start and portfolio demo path on backend `127.0.0.1:8028` and frontend `127.0.0.1:3042`; added a reviewer demo checklist for public form submit, CSV textarea import, CSV file picker, admin run history, run detail, and mock-only boundaries |
| `RUNBOOK.md` | Updated phase metadata and added explicit `/` public-page QA checks for old-label absence, form submission, CSV textarea import, custom CSV picker filename state, and desktop/mobile layout |
| `apps/web/src/components/lead-demo.tsx` | Preserved the existing public demo polish: portfolio-facing labels, custom English CSV picker, improved empty states, search placeholder, and contained session-table overflow |
| `apps/web/src/components/lead-demo.test.tsx` | Preserved existing regression coverage for public demo labels, empty states, CSV file picker filename update, upload behavior, and dashboard filtering |
| `STATE.md` | Recorded final readiness validation, manual QA evidence, skipped checks, and git safety status |

Backend code, database schema, migrations, API contracts, adapters, proxy routes, dependencies, deployment config, GitHub Actions, CI, real integrations, secrets, staging, commits, pushes, branch operations, stashes, resets, rebases, and destructive checkout were not changed.

### Commands run and results

| Command or check | Status | Result |
|---|---|---|
| Sandboxed PowerShell checks | blocked/recovered | Windows sandbox failed to launch commands with `CreateProcessAsUserW failed: 5`; required PowerShell commands were rerun through approved escalated local PowerShell |
| `git status --short --branch` | pass | `## main` with modified `README.md`, `RUNBOOK.md`, `STATE.md`, `apps/web/src/components/lead-demo.test.tsx`, and `apps/web/src/components/lead-demo.tsx` |
| `git diff --name-only` | pass | `README.md`, `RUNBOOK.md`, `STATE.md`, `apps/web/src/components/lead-demo.test.tsx`, and `apps/web/src/components/lead-demo.tsx`; Git printed existing LF-to-CRLF working-copy warnings |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `4 passed` test files and `35 passed` tests |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully, checked types, and generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed existing LF-to-CRLF working-copy warnings |
| `git diff --cached --name-only` | pass | No output; no staged files |
| `Test-Path -LiteralPath ".env"` | pass | Returned `True`; local `.env` existed and was not printed |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized; no pending migration output |
| `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| Backend health check | pass | `GET http://127.0.0.1:8028/health` returned `{"status":"ok","service":"salesops-workflow-automation-hub"}` |
| Frontend readiness check | pass | `GET http://127.0.0.1:3042/` returned HTTP `200` |
| Frontend proxy smoke | pass after restart | Initial hidden frontend process inherited the default backend port and was stopped; restarting Next through `pnpm.cmd` with inherited local env made `POST http://127.0.0.1:3042/api/leads/intake` return `run_status=success` |
| Temporary listener cleanup | pass | Temporary backend/frontend listeners on ports `8028` and `3042` were stopped after QA; PostgreSQL was left running as the normal local Docker service |

### Manual browser QA status

- Local Browser QA passed at `http://127.0.0.1:3042/` with the frontend proxy pointed at backend `http://127.0.0.1:8028`.
- Desktop viewport `1366x900` loaded title `SalesOps Workflow Automation Hub`, rendered the public page heading, and showed no old internal/demo-phase label, `POST /leads/intake`, or `local parser` text.
- Desktop CSV picker checks passed: visible text `Choose CSV file`, initial filename `No file selected`, accept value `.csv,text/csv`, hidden input opacity `0`, primary CTA background `rgb(36, 150, 158)`, and white text `rgb(255, 255, 255)`.
- Desktop form submission passed with synthetic `browser-final-...@example.com`: latest result showed `Success`, backend dedupe `unique`, CRM `created`, Slack `sent`, a visible `run_...` value, and no page-level horizontal overflow.
- Desktop CSV textarea import passed with synthetic `csv-final-...@example.com`: summary showed `1 of 1 rows submitted locally.`, the CSV row appeared in the session dashboard, `Import rows` returned to idle state, and no page-level horizontal overflow appeared.
- Mobile viewport `390x844` passed: heading and CSV picker were visible, no old phase label appeared, selected filename state began as `No file selected`, page-level horizontal overflow was false (`bodyScrollWidth=375`, viewport width `390`), and session-table overflow stayed contained in its scroll region (`tableClientWidth=310`, `tableScrollWidth=1105`).
- Browser console checks passed on desktop and mobile with zero captured warnings/errors.
- CSV file-selection state was verified with a separate local headless Chrome DevTools check because the in-app Browser API does not expose an OS file-picker upload method. The synthetic temp CSV selection updated the visible filename to `salesops-final-upload.csv` and loaded the uploaded row into the CSV textarea.
- No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, provider dashboard, or external-service smoke was run.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest suite | skipped | Backend behavior, schemas, migrations, persistence, adapters, API routes, and contracts were intentionally untouched |
| Backend Ruff lint | skipped | Backend files were untouched |
| Backend mypy typecheck | skipped | Backend files and contracts were untouched |
| Real OS file-picker interaction through in-app Browser | limited | The available in-app Browser API does not expose a file-upload method; selected filename state was verified with local headless Chrome DevTools and existing Vitest upload regression |
| Dependency install, upgrade, replacement, or removal | skipped | Existing dependencies and tooling were sufficient |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service smoke | skipped | Explicitly forbidden and not required for local/mock portfolio readiness |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Commit, push, staging, branch, stash, reset, rebase, or history rewrite | skipped | Explicitly forbidden; user manually handles git publishing |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup command was run.
- No secrets were created, printed, stored, logged, screenshotted, or committed.
- No real provider credentials, paid API calls, production API calls, webhooks, deployment config, GitHub Actions, dependency changes, backend changes, schema changes, migration changes, or unrelated refactors were introduced.
- Temporary QA logs and synthetic upload files were written under the local user temp directory, not into tracked repository files.

### Remaining risks

- Browser QA covered the in-app Browser and a local headless Chrome upload-state check; other browsers were not manually checked.
- The local PostgreSQL container remains running for the user's environment; stop it manually only if desired.

### Suggested commit message

```text
Finalize portfolio demo readiness docs
```

## Latest Update - 2026-06-06 Final Frontend Polish Sweep

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/lead-demo.tsx` | Replaced technical main-page badges with portfolio-facing `Validated intake` and `CSV upload` labels, tightened header copy, matched the header/admin link focus and overflow behavior to the admin page, improved empty states, added a search placeholder, and contained session-table overflow with a labeled scroll region and truncated lead identity text |
| `apps/web/src/components/lead-demo.test.tsx` | Added regression coverage for polished labels, empty-state copy, search placeholder, accessible table scroll region, and filtered-empty dashboard messaging |
| `STATE.md` | Recorded the final frontend polish sweep, validation commands, browser QA evidence, skipped checks, and no-stage/no-commit/no-push status |

Backend behavior, database schema, migrations, API contracts, proxy routes, package managers, dependencies, deployment config, GitHub Actions, secrets, real integrations, staging, commits, pushes, branch operations, stashes, resets, and rebases were not changed.

### Commands run and results

| Command or check | Status | Result |
|---|---|---|
| Pre-edit sandboxed PowerShell checks | blocked | Windows sandbox failed to launch commands with `CreateProcessAsUserW failed: 5`; required commands were rerun through approved escalated PowerShell |
| Pre-edit `git status --short --branch` | pass | `## main` with no modified files |
| Pre-edit `git diff --name-only` | pass | No output; no pre-existing tracked diff |
| `git status --short --branch` | pass | Before `STATE.md` update: `## main` with modified `apps/web/src/components/lead-demo.test.tsx` and `apps/web/src/components/lead-demo.tsx` |
| `git diff --name-only` | pass | Before `STATE.md` update: `apps/web/src/components/lead-demo.test.tsx` and `apps/web/src/components/lead-demo.tsx`; Git printed existing LF-to-CRLF working-copy warnings |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `4 passed` test files and `35 passed` tests |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully, checked types, and generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| Pre-STATE `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed existing LF-to-CRLF working-copy warnings for touched frontend files |
| Pre-STATE `git diff --cached --name-only` | pass | No output; no staged files |
| `docker compose ps` | pass | Existing `salesops-postgres` container was already `Up` and `healthy` on local port `5432` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized; database was already at head |
| `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| Temporary backend health | pass | `GET http://127.0.0.1:8028/health` returned `status=ok` and service `salesops-workflow-automation-hub` |
| Temporary frontend readiness | pass | `GET http://127.0.0.1:3042/` returned HTTP `200` |
| Final `git status --short --branch` | pass | `## main` with modified `STATE.md`, `apps/web/src/components/lead-demo.test.tsx`, and `apps/web/src/components/lead-demo.tsx` |
| Final `git diff --name-only` | pass | `STATE.md`, `apps/web/src/components/lead-demo.test.tsx`, and `apps/web/src/components/lead-demo.tsx`; Git printed existing LF-to-CRLF working-copy warnings |
| Final `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed existing LF-to-CRLF working-copy warnings |
| Final `git diff --cached --name-only` | pass | No output; no staged files |

### Manual browser QA status

- Local Browser QA passed at `http://127.0.0.1:3042/` with the frontend pointed at backend `http://127.0.0.1:8028`.
- Desktop viewport `1365x900` loaded page title `SalesOps Workflow Automation Hub`, rendered meaningful app content, showed no framework overlay, reported no console warnings/errors, and had no body-level horizontal overflow (`pageScrollWidth=1350`, viewport width `1366`).
- Desktop copy checks passed: polished header copy rendered, `Validated intake` and `CSV upload` badges rendered, old `POST /leads/intake` and `local parser` labels were absent, the search placeholder was `Email or company domain`, the improved latest-result and dashboard empty states rendered, and the session table had role `region`.
- Lead form browser interaction passed with synthetic `browser-polish-...@example.com`: required fields filled, `Submit lead` submitted to the local backend, latest result showed backend dedupe/CRM/Slack metrics, the session dashboard included the lead, buttons returned to `Submit lead` and `Import rows`, console logs stayed clean, and horizontal overflow stayed false.
- CSV textarea import browser interaction passed with synthetic `csv-polish-...@example.com`: textarea updated, `Import rows` submitted one local row, summary showed `1 of 1 rows submitted locally.`, the dashboard included the CSV lead, console logs stayed clean, and horizontal overflow stayed false.
- CSV picker browser state remained correct: visible text was `Choose CSV file`, selected-file text started as `No file selected`, hidden input kept `accept=".csv,text/csv"` and computed opacity `0`, and submit/import CTAs remained visually prominent.
- Mobile viewport `390x844` passed after scrolling to the top: the title wrapped cleanly, the admin link and card layout aligned, no framework overlay appeared, console logs stayed clean, body-level horizontal overflow was false (`pageScrollWidth=375`, viewport width `390`), and the session table overflow stayed contained inside its scroller (`tableClientWidth=310`, `tableScrollWidth=1105`).
- Temporary backend and frontend listeners on ports `8028` and `3042` were stopped after QA. PostgreSQL was left running because it is the normal project Docker service and was already running before this pass.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest suite | skipped | Backend behavior, schemas, migrations, persistence, adapters, API routes, and contracts were intentionally untouched |
| Backend Ruff lint | skipped | Backend files were untouched |
| Backend mypy typecheck | skipped | Backend files and contracts were untouched |
| Real browser file-selection upload | limited | The in-app Browser API used for QA does not expose a file-upload method; the existing Vitest upload regression passed and verifies selected filename update plus CSV textarea loading |
| Dependency install, upgrade, replacement, or removal | skipped | Existing dependencies and tooling were sufficient |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service smoke | skipped | Explicitly forbidden and not required for local/mock frontend polish |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Commit, push, staging, branch, stash, reset, rebase, or history rewrite | skipped | Explicitly forbidden; user manually handles git publishing |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No branch, stash, reset, rebase, destructive checkout, or destructive cleanup command was run.
- No secrets, real provider calls, paid API calls, external webhooks, dependency changes, backend changes, API changes, route changes, schema changes, migration changes, deployment changes, or unrelated redesigns were made.
- Temporary QA logs were written under the local user temp directory, not into tracked repository files.

### Remaining risks

- Browser QA covered the in-app Browser at desktop and mobile viewport sizes; other browsers were not manually checked.
- Actual OS file-picker selection was not exercised in Browser because the available Browser API does not support file uploads; filename-update behavior remains covered by the frontend upload test.

### Suggested commit message

```text
Polish main frontend demo page
```

## Latest Update - 2026-06-06 CSV Picker Primary CTA Styling Repair

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/lead-demo.tsx` | Updated only the custom CSV file picker wrapper from secondary surface styling to the same primary CTA color convention used by `Submit lead` and `Import rows`: `bg-accent`, `text-accent-foreground`, and `hover:bg-teal-700`; hidden file input, English text, `.csv,text/csv` accept constraint, filename display, CSV textarea loading, and import behavior were preserved |
| `STATE.md` | Recorded the styling repair, validation evidence, browser QA result, skipped checks, and no-stage/no-commit/no-push status |

`apps/web/src/components/lead-demo.test.tsx` remains modified from the previous CSV picker phase, but it was not edited for this styling-only repair because accessible text, structure, upload behavior, and filename behavior did not change.

Backend behavior, API routes, routing, dependencies, CSV parsing, import submission behavior, `Submit lead`, `Import rows`, real integrations, secrets, GitHub Actions, staging, commits, and pushes were not changed.

### Commands run and results

| Command or check | Status | Result |
|---|---|---|
| Pre-edit sandboxed PowerShell checks | blocked | Windows sandbox failed to launch commands with `CreateProcessAsUserW failed: 5`; required commands were rerun through approved escalated PowerShell |
| Pre-edit `git status --short --branch` | pass | `## main` with modified `STATE.md`, `apps/web/src/components/lead-demo.test.tsx`, and `apps/web/src/components/lead-demo.tsx` |
| Pre-edit `git diff -- apps/web/src/components/lead-demo.tsx` | pass | Confirmed the existing custom picker wrapper used secondary-looking `border border-border bg-surface text-foreground shadow-panel hover:bg-muted` styling before this repair |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `4 passed` test files and `34 passed` tests |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully, checked types, and generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed existing LF-to-CRLF working-copy warnings for touched files |
| `git diff --cached --name-only` | pass | No output; no staged files |
| `git status --short --branch` | pass | `## main` with modified `STATE.md`, `apps/web/src/components/lead-demo.test.tsx`, and `apps/web/src/components/lead-demo.tsx` |
| `git diff --name-only` | pass | `STATE.md`, `apps/web/src/components/lead-demo.test.tsx`, and `apps/web/src/components/lead-demo.tsx`; Git printed existing LF-to-CRLF working-copy warnings |

### Manual browser QA status

- Manual/local browser visual QA passed at `http://127.0.0.1:3042/`.
- Local services were started per `RUNBOOK.md`: Docker PostgreSQL, Alembic migrations, synthetic demo seed, backend on `127.0.0.1:8028`, and frontend on `127.0.0.1:3042` with both backend-base environment variables pointed at the local backend.
- Local Chrome headless DevTools inspection rendered the page at desktop `1365x900` and mobile `390x844`, captured temporary screenshots under `.scratch`, and inspected computed styles.
- The CSV picker text remained `Choose CSV file`, its hidden file input kept `accept=".csv,text/csv"` and opacity `0`, and the picker computed to the same primary colors as `Submit lead` and `Import rows`: background `rgb(36, 150, 158)` and text `rgb(255, 255, 255)`.
- Filename display updated to `manual-qa-upload.csv` after selecting a CSV, and the CSV textarea included the uploaded `browser@example.com` row.
- Desktop and mobile checks showed no horizontal overflow; the focused mobile screenshot showed the picker, filename, CSV textarea, and `Import rows` aligned correctly.
- DevTools/CDP reported no app console errors, runtime exceptions, or page log errors.
- Temporary backend, frontend, and Chrome QA listeners on ports `8028`, `3042`, and `9333` were stopped after QA. PostgreSQL was left running because it uses the normal project Docker service and may have already been running.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest suite | skipped | Backend behavior, schemas, migrations, persistence, adapters, API routes, and contracts were intentionally untouched |
| Backend Ruff lint | skipped | Backend files were untouched |
| Backend mypy typecheck | skipped | Backend files and contracts were untouched |
| Test updates | skipped | Existing focused CSV picker test already covered English text, selected filename display, upload behavior, and textarea update; this phase changed styling classes only |
| Dependency install, upgrade, replacement, or removal | skipped | Existing frontend and local browser tooling were sufficient |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service smoke | skipped | Explicitly forbidden and not required for local/mock frontend visual repair |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Commit, push, staging, branch, stash, reset, rebase, or history rewrite | skipped | Explicitly forbidden; user manually handles git publishing |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No secrets, real provider calls, paid API calls, external webhooks, dependency changes, backend changes, API changes, route changes, or unrelated UI redesigns were made.
- Temporary QA artifacts were created under `.scratch`, inspected, and removed after QA; they did not affect tracked source changes.

### Remaining risks

- The browser QA was performed with local Chrome headless DevTools plus screenshot inspection in the Codex app; a human reviewer can still repeat the visual check manually in a regular browser before recording.

### Suggested commit message

```text
Match CSV picker to primary CTA styling
```

## Latest Update - 2026-06-06 Frontend Landing Page Polish Repair

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/lead-demo.tsx` | Removed the visible `Phase 3 local demo` heading badge and replaced the native CSV file input with a styled English file picker that keeps the real accessible file input, `.csv,text/csv` accept constraint, selected filename display, and CSV text loading behavior |
| `apps/web/src/components/lead-demo.test.tsx` | Added a focused upload regression test for the English custom CSV picker, neutral filename state, selected filename display, and textarea update |
| `STATE.md` | Recorded the frontend polish repair, validation evidence, skipped checks, manual QA steps, and safety status |

`RUNBOOK.md` was not changed because local setup, run, and manual QA instructions remain accurate. Backend behavior, CSV import contracts, API routes, schemas, migrations, dependencies, GitHub Actions, CI, Playwright/browser automation, secrets, real integrations, staging, commits, and pushes were not changed.

### Commands run and results

| Command or check | Status | Result |
|---|---|---|
| Pre-edit `git status --short --branch` | pass | `## main` with existing modified `STATE.md` only |
| Pre-edit `git diff --name-only` | pass | `STATE.md` only; Git printed the existing LF-to-CRLF working-copy warning |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 after the final frontend/test edits |
| Initial `pnpm --dir apps/web exec vitest run` | recovered | Failed after the first test addition because jsdom's uploaded `File` lacked `file.text()`; production code was unchanged and the new test was fixed with an explicit `text()` shim |
| Final `pnpm --dir apps/web exec vitest run` | pass | Vitest `4 passed` test files and `34 passed` tests |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully, checked types, and generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| Pre-STATE `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed existing LF-to-CRLF working-copy warnings for touched files |
| Pre-STATE `git diff --cached --name-only` | pass | No output; no staged files |
| Pre-STATE `git status --short --branch` | pass | `## main` with modified `STATE.md`, `apps/web/src/components/lead-demo.test.tsx`, and `apps/web/src/components/lead-demo.tsx` |
| Pre-STATE `git diff --name-only` | pass | `STATE.md`, `apps/web/src/components/lead-demo.test.tsx`, and `apps/web/src/components/lead-demo.tsx`; Git printed existing LF-to-CRLF working-copy warnings |

### Manual browser QA status

- Manual browser QA was not performed by Codex because this phase explicitly forbids Playwright/browser automation and keeps browser review manual.
- Reviewer should start backend/frontend per `RUNBOOK.md` if needed, open `http://127.0.0.1:3042/`, and confirm the `Phase 3 Local Demo` label is gone.
- Reviewer should confirm the CSV picker is English, styled, aligned, and does not expose the browser-native grey file button.
- Reviewer should select a CSV file and confirm the displayed filename updates and the CSV import layout has no desktop or mobile regression.
- Reviewer should check DevTools console for app errors.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest suite | skipped | Backend behavior, schemas, migrations, persistence, adapters, API routes, and CSV contracts were intentionally untouched |
| Backend Ruff lint | skipped | Backend files were untouched |
| Backend mypy typecheck | skipped | Backend files and contracts were untouched |
| Manual browser QA | skipped | Explicitly left for reviewer manual verification at `http://127.0.0.1:3042/` |
| Playwright/browser automation | skipped | Explicitly forbidden for this phase; no Playwright or browser automation was added or run |
| Dependency install, upgrade, replacement, or removal | skipped | Existing frontend dependencies were sufficient |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service smoke | skipped | Explicitly forbidden and not required for local/mock frontend polish |
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow files were added or run |
| Commit, push, staging, branch, stash, reset, rebase, or history rewrite | skipped | Explicitly forbidden; user manually handles git publishing |

### Safety status

- No files were staged.
- No commits were created.
- No pushes were made.
- No backend behavior, CSV import contract, dependency, GitHub Actions, CI, browser automation, real provider, paid API, credential, or secret change was made.
- The PowerShell sandbox still failed to launch commands in this workspace with `CreateProcessAsUserW failed: 5`, so local commands were run through approved escalated PowerShell.

### Remaining risks

- Manual browser visual QA remains pending and must be performed before claiming visual completion.
- Automated frontend gates verify component behavior and build correctness, but do not verify actual browser rendering, responsive layout, file-picker visual treatment, or DevTools console health.

### Suggested commit message

```text
Polish landing page CSV file picker
```

## Latest Update - 2026-06-05 Manual Browser QA Closure State Update

### What changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded the manual browser QA closure status, fresh frontend gate results, skipped backend gates, safety posture, final git checks, and exact reviewer follow-up |

`RUNBOOK.md` was inspected and left unchanged. Its manual browser visual QA subsection is PowerShell-only, uses local PostgreSQL/backend/frontend commands, points at the current local app routes, documents seeded run/filter expectations including `owner=Maya%20Patel`, and keeps real providers, paid APIs, credentials, Playwright, GitHub Actions, commits, and pushes out of scope.

No product code, public API, schema, migration, dependency, lockfile, package script, Playwright setup, browser automation, GitHub Actions, CI, deployment config, real integration, secret handling, staged file, commit, or push was changed.

### Commands run and results

| Command or check | Status | Result |
|---|---|---|
| `Get-Content -LiteralPath .\RUNBOOK.md -TotalCount 560` | pass | Manual browser visual QA instructions were clear, executable, and aligned with the current local app; no `RUNBOOK.md` edit was needed |
| `Get-Content -LiteralPath .\STATE.md -TotalCount 180` | pass | Existing phase state was inspected before the update |
| Pre-update `git status --short --branch` | pass | `## main`; clean baseline |
| Pre-update `git diff --name-only` | pass | No output; no tracked diff |
| Pre-update `git diff --check` | pass | Exit 0 with no whitespace errors |
| Pre-update `git diff --cached --name-only` | pass | No output; no staged files |
| Pre-update `git diff --stat` | pass | No output; no diff stat |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `4 passed` test files and `33 passed` tests |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully and generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| Post-gate pre-edit `git status --short --branch` | pass | `## main`; frontend gates produced no tracked changes |
| Post-gate pre-edit `git diff --name-only` | pass | No output; frontend gates produced no tracked diff |
| Post-gate pre-edit `git diff --check` | pass | Exit 0 with no whitespace errors |
| Post-gate pre-edit `git diff --cached --name-only` | pass | No output; no staged files |
| `docker compose ps` | pass | Existing `salesops-postgres` container was already `Up` and `healthy` on local port `5432`; this pass did not start it |
| `Get-NetTCPConnection -LocalPort 8028,3042 -State Listen -ErrorAction SilentlyContinue` | pass | No output; command exited 1 because the documented backend/frontend QA ports had no listeners |
| Final post-STATE `git status --short --branch` | pass | `## main` with modified `STATE.md` only |
| Final post-STATE `git diff --name-only` | pass | `STATE.md` only; Git printed the existing LF-to-CRLF working-copy warning |
| Final post-STATE `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed the existing LF-to-CRLF working-copy warning |
| Final post-STATE `git diff --cached --name-only` | pass | No output; no staged files |

### Manual browser QA status

- Manual human browser visual QA was not performed by Codex and remains pending for the reviewer.
- `RUNBOOK.md` section `10.2` is the current reviewer checklist. It covers the public lead form, CSV import, read-only admin run history, seeded success/failed/queued/retried rows, status/source/search/date/owner/error-type filters, filtered empty state, same-page detail panel, selected-run-hidden detail path, local GET-only admin interactions, narrow-width wrapping, and forbidden mutation/provider/secret findings.
- No Docker/PostgreSQL container or backend/frontend dev server was started for this closure pass because the requested verification was documentation alignment plus frontend quality gates, and the RUNBOOK instructions matched the current source and prior local smoke evidence.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest suite | skipped | Backend behavior, schemas, migrations, persistence, adapters, and route contracts were untouched in this docs-only closure |
| Backend Ruff lint | skipped | Backend files were untouched and no backend behavior changed |
| Backend mypy typecheck | skipped | Backend files and contracts were untouched |
| Docker/PostgreSQL startup | skipped | Not needed to verify the documentation alignment; no stack smoke or human browser QA was performed in this closure pass |
| Backend/frontend dev servers | skipped | Not needed because no manual browser QA was performed by the human reviewer during this pass |
| Automated browser visual QA / Playwright | skipped | Explicitly out of scope; no Playwright dependency or browser automation was added |
| Dependency install, upgrade, replacement, or removal | skipped | Existing dependencies were sufficient and no dependency change was needed |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service smoke | skipped | Explicitly forbidden and not required for the local/mock-safe path |
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow files were added or run |
| Deployment, staging, or production smoke | skipped | Explicitly out of scope |
| Commit, push, staging, branch, stash, reset, rebase, or history rewrite | skipped | Explicitly forbidden; user manually handles git publishing |

### Safety status

- Product code did not change.
- `RUNBOOK.md` did not change.
- Only `STATE.md` changed.
- No files were staged.
- No commits were created.
- No pushes were made.
- No dependencies, Playwright files, browser automation, GitHub Actions, CI, credentials, secrets, paid APIs, provider dashboards, webhooks, or real external integrations were added or used.
- The PowerShell sandbox still failed to launch commands in this workspace with `CreateProcessAsUserW failed: 5`, so local commands were run through approved escalated PowerShell.
- This phase did not start PostgreSQL, backend, frontend, browser automation, or dev-server processes. `docker compose ps` showed the existing `salesops-postgres` container was already running and healthy; the documented backend/frontend QA ports `8028` and `3042` had no listeners.

### Remaining risks

- Manual browser visual QA remains pending and must be performed by a human reviewer before claiming visual QA completion.
- Frontend gates and static documentation/source alignment do not verify actual browser layout, responsive wrapping, DevTools console output, or Network-tab request classification.
- Generated ignored artifacts from TypeScript/Next.js validation may exist locally, but final git checks show no tracked generated diff.
- Local PostgreSQL remains running from prior local work; stop it manually with `docker compose stop postgres` only if desired.

### Exact manual reviewer steps still required

1. Follow `RUNBOOK.md` section `10.2` from the repository root in PowerShell.
2. Start local PostgreSQL, apply migrations, seed synthetic demo data, start the backend on `127.0.0.1:8028`, and start the frontend on `127.0.0.1:3042` with both backend-base environment variables pointed at `http://127.0.0.1:8028`.
3. Open the documented local pages for `/`, `/admin/runs`, status/source/search/date/owner/error-type filters, filtered empty state, and `?status=success&runId=run_demo_failed`.
4. Confirm visual pass criteria, local GET-only admin interactions, no mutation controls, no console/runtime overlays, no non-local provider requests, and no visible secrets or private data.
5. Stop backend/frontend dev servers with `Ctrl+C`; stop PostgreSQL with `docker compose stop postgres` only if the reviewer does not want it left running.

### Suggested commit message

```text
Record manual browser QA closure status
```

## Latest Update - 2026-06-05 Final Browser Visual QA Documentation Closure

### What changed

| Path | Purpose |
|---|---|
| `RUNBOOK.md` | Added a concise manual browser visual QA subsection to the existing final portfolio recording checklist, with preconditions, localhost startup expectations, visual pass criteria, blocking console/network findings, acceptable dev-server findings, cleanup, and an explicit note that this is not Playwright coverage |
| `STATE.md` | Updated current metadata and recorded this phase's validation, skipped checks, risks, and safety status |

No product code, public API, schema, migration, dependency, lockfile, package script, Playwright setup, browser automation, GitHub Actions, CI, deployment config, real integration, secret handling, staged file, commit, or push was changed.

### Commands run and results

| Command or check | Status | Result |
|---|---|---|
| Initial `git status --short --branch` | pass | `## main`; clean baseline |
| Initial `git diff --name-only` | pass | No output; clean baseline |
| `git diff --name-only` after `RUNBOOK.md` edit | pass | `RUNBOOK.md`; Git printed the existing LF-to-CRLF working-copy warning |
| `git diff --check` after `RUNBOOK.md` edit | pass | Exit 0 with no whitespace errors; Git printed the existing LF-to-CRLF working-copy warning |
| `git diff --cached --name-only` | pass | No output; no staged files |
| `Test-Path -LiteralPath ".github\workflows"` | pass | `False`; no GitHub Actions workflow directory exists |
| `pnpm --dir apps/web run lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass | Vitest `4 passed` test files and `33 passed` tests |
| `pnpm --dir apps/web run typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass | Next.js `15.5.18`; compiled successfully and generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| `Get-NetTCPConnection -LocalPort 8028` before smoke | pass | No listener; command exited 1 with no output because the documented backend smoke port was free |
| `Get-NetTCPConnection -LocalPort 3042` before smoke | pass | No listener; command exited 1 with no output because the documented frontend smoke port was free |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized; transactional DDL assumed |
| `uv run python -m backend.app.leads.demo_seed` | pass | Seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| Backend smoke server on `127.0.0.1:8028` | pass | Uvicorn listener confirmed; owning process ID was `16196` |
| `Invoke-RestMethod -Uri "http://127.0.0.1:8028/health" -Method Get` | pass | Returned `status=ok` and service `salesops-workflow-automation-hub` |
| First frontend `Start-Process -FilePath "pnpm"` smoke attempt | recovered | Failed with Windows launcher error `%1 не является приложением Win32`; this was a PowerShell process-launch invocation issue, not app behavior |
| Frontend smoke server on `127.0.0.1:3042` via `pnpm.cmd` | pass | Next.js `15.5.18` reported ready at `http://127.0.0.1:3042`; stderr log was empty; owning process ID was `10340` |
| `Invoke-RestMethod -Uri "http://127.0.0.1:8028/leads/runs" -Method Get` | pass | Corrected response-shape summary returned 4 seeded runs: `run_demo_queued`, `run_demo_retried`, `run_demo_failed`, and `run_demo_success` |
| `Invoke-RestMethod -Uri "http://127.0.0.1:8028/leads/runs/run_demo_failed" -Method Get` | pass | Returned `run_id=run_demo_failed`, `run_status=failed`, and `error_type=adapter` |
| `Invoke-WebRequest -Uri "http://127.0.0.1:3042/" -UseBasicParsing` | pass | HTTP 200; content included lead-intake and CSV text |
| `Invoke-WebRequest -Uri "http://127.0.0.1:3042/admin/runs" -UseBasicParsing` | pass | HTTP 200; content included `Admin run history` and `Read-only` |
| `Invoke-RestMethod -Uri "http://127.0.0.1:3042/api/leads/runs" -Method Get` | pass | Corrected response-shape summary returned the same 4 seeded run IDs through the local frontend proxy |
| `Invoke-RestMethod -Uri "http://127.0.0.1:3042/api/leads/runs/run_demo_failed" -Method Get` | pass | Returned `proxy_run_id=run_demo_failed`, `proxy_run_status=failed`, and `proxy_error_type=adapter` |
| Documented admin filter/detail URL HTTP smoke | pass | `/admin/runs?status=failed`, `source=csv_upload`, `q=atlas`, `owner=Maya%20Patel`, `errorType=adapter`, date range, filtered empty state, and selected-run-hidden URLs all returned HTTP 200 |
| Temporary backend/frontend cleanup | pass | Stopped only the smoke listener PIDs `16196` and `10340`; follow-up port checks reported `backend_8028_listener=False` and `frontend_3042_listener=False` |
| Pre-STATE final `git status --short --branch` | pass | `## main` plus modified `RUNBOOK.md` only |
| Pre-STATE final `git diff --name-only` | pass | `RUNBOOK.md` only; Git printed the existing LF-to-CRLF warning |
| Pre-STATE final `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed the existing LF-to-CRLF warning |
| Pre-STATE final `git diff --cached --name-only` | pass | No output; no staged files |
| Post-STATE `git diff --cached --name-only` | pass | No output; no staged files after the `STATE.md` update |
| Post-STATE `git status --short --branch`, `git diff --name-only`, and `git diff --check` | blocked | Approval review timed out twice for these read-only escalated commands, and the sandbox fallback failed with `CreateProcessAsUserW failed: 5` |

### Local smoke details

- The documented local PostgreSQL, Alembic, seed, backend, frontend, backend API, frontend page, frontend proxy, and admin filter URL smoke paths ran in local/mock mode only.
- All HTTP smoke requests targeted `127.0.0.1`; no real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, provider dashboard, or external service was called.
- The initial run-history summary command treated the response wrapper as one object; a corrected wrapper-aware summary confirmed all four seeded demo runs through both backend and frontend proxy.
- Temporary backend and frontend servers were stopped after smoke. Local PostgreSQL was left running because `RUNBOOK.md` marks stopping it as optional.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Automated browser visual QA / Playwright | skipped | Explicitly out of scope for this phase; the repository has no documented PowerShell-only browser automation script and no project Playwright dependency/script |
| Manual human browser review | documented, not performed | This phase closes the documentation gap by providing the manual checklist; automated HTTP smoke verified documented local route availability, but a human still performs visual browser QA from the checklist |
| Backend test/lint/typecheck suite | skipped | This was a docs-only closure; backend code, schemas, runtime behavior, migrations, and command contracts were not changed |
| Dependency install or update | skipped | Existing frontend dependencies were present; no dependency install, upgrade, replacement, or removal was needed |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service smoke | skipped | Explicitly forbidden and not required for the local/mock-safe release path |
| GitHub Actions / CI | skipped | Explicitly forbidden; no workflow files were added or run |
| Deployment, staging, or production smoke | skipped | Explicitly out of scope |
| Commit, push, staging, branch, stash, reset, rebase, or history rewrite | skipped | Explicitly forbidden; user manually handles git publishing |
| Post-STATE final read-only git status/name/check | blocked | Approval review timed out twice and sandbox fallback failed with `CreateProcessAsUserW failed: 5`; pre-STATE checks passed and post-STATE staging check still showed no staged files |

### Git safety status

- No `git add`, `git commit`, `git push`, `git branch`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.
- No GitHub Actions, CI, dependency, Playwright, or product-code files were added.

### Readiness verdict

The final browser visual QA documentation gap is closed. `RUNBOOK.md` now contains a clear PowerShell-only manual browser visual QA path, and local frontend gates plus documented localhost HTTP smoke passed in local/mock/no-paid mode.

### Remaining risks

- Manual browser visual QA is intentionally human-run and was not automated; reviewers should still follow the new checklist before recording or handoff.
- HTTP smoke proves route availability and local proxy wiring, but it does not verify actual browser layout, responsive visual wrapping, DevTools console contents, or Network-tab request classification.
- The PowerShell sandbox could not start commands in this workspace (`CreateProcessAsUserW failed: 5`), so validation commands were run through approved escalated PowerShell.
- Docker PostgreSQL may remain running locally; stop it manually with `docker compose stop postgres` only if desired.

### Suggested commit message

```text
Document manual browser visual QA path
```

## Latest Update - 2026-06-05 Final Local Release/Readiness Verification

### What changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded the final local release/readiness validation evidence and updated the top metadata |

`README.md` and `RUNBOOK.md` were inspected and left unchanged because they match the validated local/mock/no-paid workflow. No app behavior, public API, types, schemas, dependencies, lockfiles, backend configuration, frontend configuration, CI, GitHub Actions, database schema, migration, generated source, real integration, paid API usage, secret handling, staging action, commit, push, branch, stash, reset, or git history was changed.

### Required gates and exact results

| Command or check | Status | Result |
|---|---|---|
| `git status --short --branch` | pass | Starting output: `## main` |
| `git diff --name-only` | pass | Starting output: no files |
| `git diff --cached --name-only` | pass | Starting output: no files |
| `.venv` presence check | pass | Existing backend dependencies present; install not needed |
| `apps/web/node_modules` presence check | pass | Existing frontend dependencies present; install not needed |
| `.env` presence check | pass | `.env` existed; contents were not printed |
| local-only `DATABASE_URL` check | pass | Value was not printed; it points at the local Docker PostgreSQL database |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | `48 passed`, `1 warning` on Python `3.12.13`; warning was Starlette/FastAPI testclient deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `4 passed` files and `33 passed` tests |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully; generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| `docker compose config` | pass | Compose config rendered successfully for local `salesops-postgres` |
| `docker compose ps` | pass | `salesops-postgres` was `Up` and `healthy` on local port `5432` |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run --no-python-downloads --python 3.12 --frozen alembic upgrade head` | pass | PostgreSQL migration context initialized; transactional DDL assumed |
| `uv run --no-python-downloads --python 3.12 --frozen python -m backend.app.leads.demo_seed` | pass | Seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| backend local smoke on `127.0.0.1:8028` | pass | `GET /health`, `GET /leads/runs`, and `GET /leads/runs/run_demo_failed` returned expected local seeded data |
| frontend local smoke on `127.0.0.1:3042` | pass | `/`, `/admin/runs`, `/api/leads/runs`, `/api/leads/runs/run_demo_failed`, and all documented filter URLs returned HTTP 200 |
| temporary server cleanup | pass | Temporary ports `8028` and `3042` were clear after cleanup |
| `git ls-files -- .github` | pass | No tracked `.github` files |
| `Test-Path -LiteralPath ".github\workflows"` | pass | `False`; workflow directory absent |
| `git ls-files -ci --exclude-standard` | pass | No tracked ignored files |
| `git ls-files -- apps/web/tsconfig.tsbuildinfo` | pass | No output; generated TypeScript build-info is not tracked |
| tracked secret-pattern scan outside `STATE.md` | pass | No tracked secret-pattern file matches; secret values were not printed |
| tracked live-endpoint scan outside `STATE.md` | pass | No tracked live-provider endpoint file matches |
| `git check-ignore -v ...` | pass | `.env`, logs, caches, build output, dependency folders, coverage, and TypeScript build-info are ignored |
| `git status --short --branch` | pass | Ending pre-edit output: `## main` |
| `git diff --name-only` | pass | Ending pre-edit output: no files |
| `git diff --cached --name-only` | pass | Ending pre-edit output: no files |
| `git diff --check` | pass | Ending pre-edit output: no whitespace errors |
| `git diff --stat` | pass | Ending pre-edit output: no diff stat |

### Local smoke details

- The backend health check returned `status=ok` and service `salesops-workflow-automation-hub`.
- Backend run history returned the four synthetic seeded run IDs: `run_demo_failed`, `run_demo_queued`, `run_demo_retried`, and `run_demo_success`.
- Backend failed-run detail returned `run_id=run_demo_failed`, `run_status=failed`, and `error_type=adapter`.
- The frontend proxy returned the same four seeded run IDs and the failed-run detail through local API routes.
- The documented admin filter URLs returned HTTP 200 for status, source, search, owner, error type, date range, filtered empty state, and selected-run-hidden paths.
- No paid API, real provider credential, provider dashboard, webhook, GitHub Actions, staging, deployment, commit, push, real CRM, real Slack, Google Sheets, OpenAI, or other real external integration was used.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Dependency install | skipped | `.venv` and `apps/web/node_modules` already existed and locked validation commands passed; no install was needed |
| Browser visual interaction automation | skipped | No repo-documented PowerShell-only browser automation path or Playwright dependency/script exists; local HTTP/API route smoke covered startup and documented local proxy behavior |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external-service smoke | skipped | Explicitly forbidden and not required for the local/mock-safe release path |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment, staging, or production smoke | skipped | Explicitly out of scope |
| Commit, push, branch, stash, reset, rebase, or history rewrite | skipped | Explicitly forbidden; user manually handles git publishing |

### Git safety status

- No `git add`, `git commit`, `git push`, `git branch`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.
- Pre-edit git checks were clean; after this docs-only update, the expected tracked diff is `STATE.md` only.

### Docs consistency

- `README.md` is consistent with the validated local reviewer handoff, mock adapters, read-only admin UI, local proxy routes, and no-real-API boundaries.
- `RUNBOOK.md` is consistent with the validated local commands, section `10.2` recording path, local PostgreSQL seed flow, and no-paid/no-CI/no-provider posture.
- `STATE.md` is now the only file updated to preserve the fresh validation evidence.

### Readiness verdict

Ready for final local portfolio recording and manual review. The release/readiness gate passed in local/mock/no-paid mode with backend, frontend, build, local database, API smoke, frontend route/proxy smoke, git, ignore, and safety checks passing.

### Remaining risks

- Browser visual interaction automation was not run because the repository does not provide a documented PowerShell-only browser automation path or Playwright script/dependency.
- HTTP/API route smoke validates documented local startup and proxy behavior, but a final human recording pass should still visually confirm the admin UI states.
- Docker PostgreSQL was already healthy and may remain running locally; stop it manually only if desired.
- Manual recording should avoid showing `.env`, private browser tabs, personal data, real customer data, terminal output that prints secrets, provider dashboards, production services, or unrelated local files.

### Suggested commit message

```text
Record final local release readiness validation
```

## Latest Update - 2026-06-05 Final Portfolio Recording Dry-Run Validation

### What changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded the final local/mock-safe portfolio recording dry-run evidence and updated the top metadata |

`README.md` and `RUNBOOK.md` were inspected and left unchanged because their documented local demo and `RUNBOOK.md` section `10.2` recording commands matched the validated dry-run path. No source code, tests, package manifests, lockfiles, dependency versions, backend configuration, frontend configuration, CI, GitHub Actions, database schema, migrations, generated source, public API, UI behavior, route contract, real integration, paid API usage, production credential, staging action, commit, or push was changed.

### Commands validated

| Command or check | Status | Result |
|---|---|---|
| `git status --short --branch` | pass | Baseline output was `## main`; final post-edit status showed only modified `STATE.md` |
| `git diff --name-only` | pass | Baseline had no output; final post-edit output was `STATE.md` only |
| `git diff --cached --name-only` | pass | No output; no staged files |
| `git diff --check` | pass | Exit 0 with no whitespace errors |
| `.env` presence check | pass | `.env` already existed and contents were not printed |
| `.venv` and `apps/web/node_modules` presence checks | pass | Existing dependencies were present; no install command was needed |
| local-only `DATABASE_URL` check | pass | Value was not printed; it points at the local Docker PostgreSQL database |
| `docker compose config` and `docker compose ps` | pass | Compose config rendered and `salesops-postgres` was healthy |
| `docker compose up -d postgres` | pass | Local PostgreSQL service was running |
| `uv run alembic upgrade head` | pass | PostgreSQL migration context initialized; transactional DDL assumed |
| `uv run python -m backend.app.leads.demo_seed` | pass | Seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| backend on `127.0.0.1:8028` | pass | `GET /health`, `GET /leads/runs`, and `GET /leads/runs/run_demo_failed` returned expected local data |
| frontend on `127.0.0.1:3042` | pass | `/`, `/admin/runs`, `/api/leads/runs`, `/api/leads/runs/run_demo_failed`, and all `RUNBOOK.md` 10.2 filter URLs returned HTTP 200 |
| temporary server cleanup | pass | Backend and frontend dry-run ports `8028` and `3042` were clear after cleanup |

### Dry-run details

- The seeded run-history response returned four synthetic demo runs: `run_demo_queued`, `run_demo_retried`, `run_demo_failed`, and `run_demo_success`.
- The seeded failed-run detail returned `run_id=run_demo_failed`, `run_status=failed`, and `error_type=adapter`.
- The frontend proxy returned the same four seeded run IDs and the failed-run detail through local API routes.
- The documented recording filter URLs were checked in local HTTP smoke: status, source, search, owner, error type, date range, filtered empty state, and selected-run-hidden detail path.
- No paid API, real credential, provider dashboard, webhook, GitHub Actions, staging, commit, push, or real external integration was used.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend tests | skipped | Docs-only evidence update; no backend source, schema, config, runtime behavior, or command contract changed |
| Backend lint | skipped | Docs-only evidence update; no backend source, schema, config, runtime behavior, or command contract changed |
| Backend typecheck | skipped | Docs-only evidence update; no backend source, schema, config, runtime behavior, or command contract changed |
| Frontend tests | skipped | Docs-only evidence update; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend lint | skipped | Docs-only evidence update; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend typecheck | skipped | Docs-only evidence update; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend build | skipped | Docs-only evidence update; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Browser visual interaction automation | skipped | No repo-provided PowerShell-only browser automation path was available without dependency/tool churn; local HTTP/API smoke covered the documented startup path |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service smoke | skipped | Explicitly forbidden and not required for the local/mock-safe recording path |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment, staging, or production smoke | skipped | Explicitly out of scope |

### Git safety status

- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.

### Readiness verdict

Ready for final local portfolio recording and manual review. The documented `RUNBOOK.md` section `10.2` path is accurate and safe to follow in local/mock mode; `README.md` and `RUNBOOK.md` required no corrections.

### Remaining risks

- Browser visual interaction automation was not run in this implementation pass; the dry run validated startup, backend API, frontend proxy, and documented route availability through local HTTP/API checks.
- Manual recording should still avoid showing `.env`, private browser tabs, personal account data, real customer data, terminal output that prints secrets, provider dashboards, production services, or unrelated local files.

### Suggested commit message

```text
Record final portfolio recording dry-run validation
```

## Latest Update - 2026-06-05 Final Portfolio Recording Documentation Reconciliation

### What changed

| Path | Purpose |
|---|---|
| `STATE.md` | Reconciled current metadata with the final portfolio recording documentation/readiness state and added this superseding latest update |

No source code, tests, package manifests, lockfiles, dependency versions, backend configuration, frontend configuration, CI, GitHub Actions, database schema, migrations, generated source, public API, UI behavior, route contract, real integration, paid API usage, production credential, staging action, commit, or push was changed.

### Docs inspected

- `README.md` was inspected and already documents the local/mock-safe reviewer handoff and demo path, so it was left unchanged.
- `RUNBOOK.md` section `10.2` was inspected and already contains the final local portfolio recording checklist, so it was left unchanged.
- Older `STATE.md` dry-run entries were preserved as historical evidence. This latest entry supersedes the stale top metadata that still referenced blocked final git checks.

### Commands run

| Command | Status | Result |
|---|---|---|
| `git status --short --branch` | pass | Baseline output was `## main`; post-edit output showed `## main` plus modified `STATE.md` only |
| `git diff --name-only` | pass | Baseline had no output; post-edit output was `STATE.md`; Git printed the existing LF-to-CRLF working-copy warning for `STATE.md` |
| `git diff --check` | pass | Baseline and post-edit checks exited 0 with no whitespace errors; Git printed the existing LF-to-CRLF working-copy warning for `STATE.md` |
| `Get-Content STATE.md -TotalCount 90` | pass | Confirmed stale metadata before the docs-only reconciliation edit |
| inspect changed `STATE.md` diff | pass | Confirmed the diff is limited to the metadata reconciliation and this latest update entry |

### Skipped checks

| Check | Status | Reason |
|---|---|---|
| Backend tests | skipped | Docs-only state reconciliation; no backend source, schema, config, runtime behavior, or command contract changed |
| Backend lint | skipped | Docs-only state reconciliation; no backend source, schema, config, runtime behavior, or command contract changed |
| Backend typecheck | skipped | Docs-only state reconciliation; no backend source, schema, config, runtime behavior, or command contract changed |
| Frontend tests | skipped | Docs-only state reconciliation; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend lint | skipped | Docs-only state reconciliation; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend typecheck | skipped | Docs-only state reconciliation; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend build | skipped | Docs-only state reconciliation; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service smoke | skipped | Explicitly forbidden; this reconciliation stayed docs-only and local/mock-safe |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or modified |
| Deployment, staging, or production smoke | skipped | Explicitly out of scope |

### Git safety status

- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.

### Readiness verdict

Ready for local portfolio recording and manual review. The recording checklist/docs are present, `README.md` and `RUNBOOK.md` section `10.2` require no further changes, and the previous blocked-final-check wording is superseded by current passing git checks.

### Remaining risks

- This pass did not rerun backend/frontend/runtime smoke checks because it changed documentation state only.
- Manual recording should still avoid showing `.env`, private browser tabs, personal account data, real customer data, terminal output that prints secrets, provider dashboards, production services, or unrelated local files.

### Suggested commit message

```text
Reconcile portfolio recording readiness state
```

## Latest Update - 2026-06-05 Mock-Safe Portfolio Recording Dry Run

### What changed

| Path | Purpose |
|---|---|
| `RUNBOOK.md` | Added a recording-hygiene note that the Next.js dev tools badge can appear under `next dev` and may be kept closed or cropped from final footage |
| `STATE.md` | Recorded the local/mock-safe checklist dry run, commands, browser verification, skipped checks, Git safety status, and readiness verdict |

No source code, tests, package manifests, lockfiles, dependency versions, backend configuration, frontend configuration, CI, GitHub Actions, database schema, migrations, generated source, public API, UI behavior, route contract, real integration, paid API usage, production credential, staging action, commit, or push was changed.

### What was checked

- Read `RUNBOOK.md` section `10.2` and `STATE.md`, then followed the final portfolio recording checklist in local/mock-safe mode.
- Confirmed preflight state: clean `main` branch, no staged files, existing ignored `.env` present without printing contents, and documented ports `8028` and `3042` available.
- Started local PostgreSQL, applied Alembic migrations, seeded the deterministic synthetic demo runs, and started local backend/frontend servers on `127.0.0.1:8028` and `127.0.0.1:3042`.
- Verified backend health, persisted run history, and `run_demo_failed` detail through local HTTP only.
- Verified the public lead demo page, admin dashboard, seeded run rows, status/source/search/date/owner/error-type filtered URLs, filtered empty state, selected-run-hidden detail path, reset filter interaction, and failed-run detail button interaction in the in-app browser.
- Checked browser console warnings/errors, framework overlay text, visible admin controls, and local frontend request logs.

### Commands run

| Command or action | Status | Result |
|---|---|---|
| `git status --short --branch` | pass | Starting output was `## main` |
| `git diff --cached --name-only` | pass | No output; no staged files |
| `Test-Path -LiteralPath ".env"` | pass | `True`; `.env` existed and contents were not printed |
| `Get-NetTCPConnection -LocalPort 8028,8029,3042,3043 -ErrorAction SilentlyContinue` | pass | No listeners before the dry run; documented ports were available |
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass | PostgreSQL migration context initialized; transactional DDL assumed |
| `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| local backend start on `127.0.0.1:8028` | pass | Uvicorn process `15548`; listener confirmed on port `8028` |
| `Invoke-RestMethod -Uri "http://127.0.0.1:8028/health" -Method Get` | pass | Returned `status=ok` and service `salesops-workflow-automation-hub` |
| `Invoke-RestMethod -Uri "http://127.0.0.1:8028/leads/runs" -Method Get` | pass | Returned seeded persisted run history |
| `Invoke-RestMethod -Uri "http://127.0.0.1:8028/leads/runs/run_demo_failed" -Method Get` | pass | Returned failed run detail with `run_status=failed`, `error_type=adapter`, sanitized intake payload, attempts, and audit events |
| local frontend start on `127.0.0.1:3042` | pass | Next.js `15.5.18`; ready at `http://127.0.0.1:3042`; listener process `21852` |
| `Invoke-WebRequest -Uri "http://127.0.0.1:3042/" -UseBasicParsing` | pass | HTTP 200 for the public lead demo route |
| `Invoke-WebRequest -Uri "http://127.0.0.1:3042/admin/runs" -UseBasicParsing` | pass | HTTP 200 for the admin route |
| `Invoke-RestMethod -Uri "http://127.0.0.1:3042/api/leads/runs" -Method Get` | pass | Frontend proxy returned seeded run history |
| Browser route checks | pass | `/`, `/admin/runs`, all checklist filter URLs, empty state, selected-run-hidden path, reset filters, and failed-run detail click matched expected visible state |
| Browser console check | pass | No relevant `error` or `warn` logs |
| Frontend request-log scan | pass | Admin dry-run traffic showed local `GET` requests for app routes and `/api/leads/runs` endpoints only |
| External provider/mutation log scans | pass | No `POST`, `PUT`, `PATCH`, `DELETE`, HubSpot, Slack, OpenAI, Google Sheets, paid API, webhook, or external-provider strings found in backend/frontend dry-run logs |
| dry-run backend/frontend cleanup | pass | Closed the dry-run browser tab, stopped only local listener processes `15548` and `21852`, and confirmed ports `8028` and `3042` no longer had listeners |

### Final validation

| Command | Status | Exact result |
|---|---|---|
| `git diff --check` | limited/pass before final evidence edits | Passed after the docs patch with exit 0 and no whitespace errors; Git printed LF-to-CRLF working-copy warnings for `RUNBOOK.md` and `STATE.md`. The final rerun after the final `STATE.md` evidence edits was attempted twice with escalation but blocked by approval-review timeout; sandboxed retry failed with `CreateProcessAsUserW failed: 5`. |
| `git diff --name-only` | limited/pass before final evidence edits | Returned `RUNBOOK.md` and `STATE.md` after the docs patch; Git printed LF-to-CRLF working-copy warnings for those files. The final rerun after the final `STATE.md` evidence edits was attempted twice with escalation but blocked by approval-review timeout; sandboxed retry failed with `CreateProcessAsUserW failed: 5`. |
| `git diff --cached --name-only` | pass | Final rerun after the `STATE.md` evidence edit had no output; no staged files |
| `git status --short --branch` | pass | Final rerun after the `STATE.md` evidence edit showed `## main` plus modified docs only: `M RUNBOOK.md` and `M STATE.md` |

### Browser verification

- `/` rendered the portfolio lead demo with `Lead intake`, CSV import UI, `Submit lead`, and `Import rows`.
- `/admin/runs` rendered `Admin run history`, `Read-only`, `4 automation runs shown.`, and the four seeded runs: `run_demo_success`, `run_demo_failed`, `run_demo_queued`, and `run_demo_retried`.
- Filter URL expectations matched the checklist:
  - `status=failed` and `source=csv_upload` showed only `run_demo_failed`;
  - `q=atlas` showed only `run_demo_retried`;
  - `owner=Maya Patel` showed `run_demo_failed` and `run_demo_queued`;
  - `errorType=adapter` showed `run_demo_failed` and `run_demo_retried`;
  - `from=2026-06-01&to=2026-06-01` showed all four seeded runs;
  - `q=no-such-run` showed `No runs match these filters.`;
  - `status=success&runId=run_demo_failed` showed the success row plus the selected-run-hidden notice and read-only failed-run detail.
- `Reset filters` cleared `status=failed` back to `/admin/runs` and restored all four seeded rows.
- `View details for run_demo_failed` updated the URL to `?runId=run_demo_failed` and showed the read-only detail panel, mock adapter failure, and suggested action `Review the synthetic CRM payload and retry locally.`
- Visible app controls stayed limited to `Reset filters`, `View details for ...`, and local navigation. The Next.js dev tools badge appeared because the checklist uses `next dev`; `RUNBOOK.md` now clarifies that it is a local development indicator, not app behavior or an integration.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend tests | skipped | Docs-only/manual recording dry run; no backend source, schema, config, runtime behavior, or command contract changed |
| Backend lint | skipped | Docs-only/manual recording dry run; no backend source, schema, config, runtime behavior, or command contract changed |
| Backend typecheck | skipped | Docs-only/manual recording dry run; no backend source, schema, config, runtime behavior, or command contract changed |
| Frontend tests | skipped | Docs-only/manual recording dry run; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend lint | skipped | Docs-only/manual recording dry run; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend typecheck | skipped | Docs-only/manual recording dry run; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend build | skipped | Docs-only/manual recording dry run; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service smoke | skipped | Explicitly forbidden; the dry run stayed local-only and mock-safe |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment, staging, or production smoke | skipped | Explicitly out of scope |
| Dependency install, upgrade, removal, or replacement | skipped | Existing dependencies and lockfiles were used; no dependency change was needed |
| Commit, push, and staging | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Checklist readiness

The `RUNBOOK.md` section `10.2` checklist is ready for actual portfolio evidence capture in local/mock-safe mode. The only gap found was the unmentioned Next.js dev tools badge visible during `next dev`; the runbook now calls that out for cleaner recording hygiene.

### Git safety status

- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.
- Temporary backend/frontend dry-run servers were started for validation and stopped before completion; local PostgreSQL was left running because it is part of the documented local database path and was already managed by Docker Compose.

### Remaining risks

- Browser verification covered the in-app Chromium browser at the default viewport; other browsers and a separate mobile recording viewport were not exercised in this dry run.
- Manual recording should still avoid showing `.env`, private browser tabs, personal account data, real customer data, terminal output that prints secrets, provider dashboards, production services, or unrelated local files.

### Suggested commit message

```text
Record mock-safe portfolio dry run
```

## Latest Update - 2026-06-05 Portfolio Recording Checklist Verification Tightening

### What changed

| Path | Purpose |
|---|---|
| `RUNBOOK.md` | Tightened section `10.2` for a clean local recording environment with dependency prerequisites, Docker Desktop/PostgreSQL requirement, known-good local ports, the missing date-filter URL, and seeded filter-result expectations |
| `STATE.md` | Recorded the verification evidence, checklist corrections, required git checks, skipped gates, and Git safety status |

No source code, tests, package manifests, lockfiles, dependency versions, backend configuration, frontend configuration, CI, GitHub Actions, database schema, migrations, generated files, public API, UI behavior, route contract, environment files, real integration, paid API usage, production credential, staging action, commit, or push was changed.

### What was verified

- `RUNBOOK.md` section `10.2` was checked against current repo commands and files: `pyproject.toml`, root `package.json`, `apps/web/package.json`, `uv.lock`, `pnpm-lock.yaml`, `compose.yml`, `.env.example`, `.gitignore`, `backend/app/main.py`, `backend/app/config.py`, `backend/app/leads/demo_seed.py`, `backend/app/leads/routes.py`, `backend/app/leads/persistence.py`, `apps/web/src/app/admin/runs/page.tsx`, `apps/web/src/components/admin-run-history.tsx`, and the local Next.js run-history proxy routes.
- The recording path is executable by a human from a clean local environment after installing locked dependencies with `uv sync --frozen` and `pnpm install --frozen-lockfile`, starting Docker Desktop, creating placeholder-only local `.env` if needed, starting local PostgreSQL, applying Alembic migrations, seeding synthetic data, and running local backend/frontend dev servers.
- The checklist remains local/mock-safe. It does not require paid APIs, production deployment, GitHub Actions, real customer data, real credentials, provider dashboards, external webhooks, commits, pushes, or staging.
- The admin recording URLs match the seeded demo data and frontend filters: `run_demo_failed` for failed and CSV source, `run_demo_retried` for `atlas` search, `run_demo_failed` plus `run_demo_queued` for `Maya Patel`, `run_demo_failed` plus `run_demo_retried` for `adapter`, and all four demo runs for fixed seed date `2026-06-01`.
- The frontend admin screen uses local `GET` requests for `/api/leads/runs` and `/api/leads/runs/<run-id>` and has no visible retry/edit/delete/mutation controls in the recording checklist path.

### Checklist corrections

- Added fresh-clone dependency prerequisites: `uv sync --frozen` and `pnpm install --frozen-lockfile`.
- Added Docker Desktop/PostgreSQL as a required local service for the recording path.
- Replaced abstract port placeholders with known-good local examples: backend `8028` and frontend `3042`, while keeping guidance to choose another free port if busy.
- Added the missing date-filter recording URL: `/admin/runs?from=2026-06-01&to=2026-06-01`.
- Clarified expected seeded results for status, source, search, owner, error-type, date, empty-state, and selected-run-hidden recording URLs.

### Validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short --branch` | pass | Starting status was clean on `main`: output `## main` |
| `git diff --check` | pass | Exit 0 with no whitespace errors after the documentation updates; Git printed LF-to-CRLF working-copy warnings for `RUNBOOK.md` and `STATE.md` |
| `git diff --name-only` | pass | `RUNBOOK.md` and `STATE.md` only; Git printed LF-to-CRLF working-copy warnings for those files |
| `git diff --cached --name-only` | pass | No output; no staged files |
| `git status --short --branch` | pass | Final status showed `## main` plus modified docs only: `M RUNBOOK.md` and `M STATE.md` |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend tests | skipped | Docs-only checklist verification; no backend source, schema, config, runtime behavior, or command contract changed |
| Backend lint | skipped | Docs-only checklist verification; no backend source, schema, config, runtime behavior, or command contract changed |
| Backend typecheck | skipped | Docs-only checklist verification; no backend source, schema, config, runtime behavior, or command contract changed |
| Frontend tests | skipped | Docs-only checklist verification; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend lint | skipped | Docs-only checklist verification; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend typecheck | skipped | Docs-only checklist verification; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Frontend build | skipped | Docs-only checklist verification; no frontend source, route behavior, UI behavior, proxy contract, or command contract changed |
| Browser smoke/manual recording rehearsal | skipped | This phase verified the checklist against current repo evidence and changed docs only; no runtime behavior changed |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service smoke | skipped | Explicitly forbidden; the checklist remains local-only and mock-safe |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment, staging, or production smoke | skipped | Explicitly out of scope |
| Commit, push, and staging | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Git safety status

- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.
- No files were staged.
- No commits were created.
- No pushes were made.

### Manual recording recommendation

Use `RUNBOOK.md` section `10.2` as the canonical manual recording checklist. It is ready for manual portfolio recording from a clean local environment with Docker Desktop, local PostgreSQL, locked dependencies, placeholder-only `.env`, synthetic seed data, and local backend/frontend ports.

### Remaining risks

- This phase did not start Docker, backend, frontend, or a browser because the requested change was docs-only and no source/config/runtime behavior changed.
- A real manual recording should still avoid showing `.env`, private browser tabs, personal account data, real customer data, terminal output that prints secrets, provider dashboards, production services, or unrelated local files.

### Suggested commit message

```text
Tighten portfolio recording checklist
```

## Latest Update - 2026-06-05 Portfolio Demo Recording Documentation Pass

### What changed

| Path | Purpose |
|---|---|
| `RUNBOOK.md` | Updated the final local checklist into an explicit portfolio recording checklist with pre-recording commands, browser pages, suggested sequence, safe screen hygiene, and cleanup |
| `STATE.md` | Recorded the documentation-only pass, inspected docs, validation commands, skipped heavier gates, final Git status, and Git safety posture |

No source code, tests, package manifests, lockfiles, dependency versions, backend configuration, frontend configuration, CI, GitHub Actions, database schema, migrations, generated files, public API, UI behavior, route contract, environment variable contract, real integration, paid API usage, production credential, staging action, commit, or push was changed.

No `docs/demo-recording-checklist.md` file was created because the existing `RUNBOOK.md` checklist and `HANDOFF.md` demo script/reviewer checklist already cover that surface. `HANDOFF.md` was inspected only and left unchanged because it is outside this task's allowed-change list.

### Docs inspected

- `README.md`: confirmed the reviewer quick start, local PostgreSQL/Alembic/seed/backend/frontend route path, mock/no-paid-API boundaries, placeholder-only `.env.example`, and Codex no-stage/no-commit/no-push rule are already documented.
- `RUNBOOK.md`: confirmed the local setup, validation, smoke workflow, and admin verification path; section `10.2` was updated to be recording-focused.
- `STATE.md`: confirmed same-day local demo rehearsal, full gate, browser-facing route/filter checks, and skipped external/CI/deployment checks were already recorded.
- `HANDOFF.md`: confirmed the before/after workflow, 3-5 minute demo script, reviewer checklist, and future credential boundaries already exist; left unchanged.

### Demo path confirmed

The recording checklist now explicitly covers:

- local PostgreSQL startup with `docker compose up -d postgres`;
- Alembic migration to head with `uv run alembic upgrade head`;
- deterministic synthetic seed data with `uv run python -m backend.app.leads.demo_seed`;
- backend startup with `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port <backend-port>`;
- frontend startup with local `BACKEND_API_BASE_URL` and `NEXT_PUBLIC_BACKEND_API_BASE_URL`;
- public app route `/`;
- admin route `/admin/runs`;
- admin filters for status, source, search, owner, error type, and date;
- filtered empty state via `q=no-such-run`;
- selected-run-hidden detail path via `?status=success&runId=run_demo_failed`.

The checklist also states that the demo is local-first, integrations remain mocked/demo-safe unless explicitly configured later, no paid APIs are required, no production credentials are included, and Codex did not stage, commit, or push.

### Validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short --branch` | pass | Starting status was clean on `main`: output `## main` |
| `git diff --check` | pass | Exit 0 with no whitespace errors after the documentation update; Git printed LF-to-CRLF working-copy warnings for `RUNBOOK.md` and `STATE.md` |
| `git diff --name-only` | pass | `RUNBOOK.md` and `STATE.md` only; Git printed LF-to-CRLF working-copy warnings for those files |
| `git diff --cached --name-only` | pass | No output; no staged files |
| `git status --short --branch` | pass | Final status showed `## main` plus modified docs only: `M RUNBOOK.md` and `M STATE.md` |

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Backend tests | skipped | Docs-only recording checklist update; no source/config/runtime command contract changed |
| Backend lint | skipped | Docs-only recording checklist update; no source/config/runtime command contract changed |
| Backend typecheck | skipped | Docs-only recording checklist update; no source/config/runtime command contract changed |
| Frontend tests | skipped | Docs-only recording checklist update; no source/config/runtime command contract changed |
| Frontend lint | skipped | Docs-only recording checklist update; no source/config/runtime command contract changed |
| Frontend typecheck | skipped | Docs-only recording checklist update; no source/config/runtime command contract changed |
| Frontend build | skipped | Docs-only recording checklist update; no source/config/runtime command contract changed |
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service smoke | skipped | Explicitly forbidden; the project remains local-only and mock-safe |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment, staging, or production smoke | skipped | Explicitly out of scope |
| Dependency install, upgrade, removal, or replacement | skipped | Explicitly out of scope; no dependency change was needed |
| Commit, push, and staging | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Manual recording recommendation

Use `RUNBOOK.md` section `10.2` as the canonical manual recording checklist. Record only local demo pages and synthetic data. Do not show `.env` contents, real tokens, private dashboards, private account data, or terminals that print secret values.

### Remaining risks

- This pass did not rerun browser smoke because it changed documentation only and did not alter source, config, runtime behavior, routes, or command contracts.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning remains non-blocking from the same-day full gate.
- The local demo remains mock/local-only; no live provider implementation, credential validation, or production smoke was added.

### Suggested commit message

```text
Document portfolio recording checklist
```

## Latest Update - 2026-06-05 Final Local Demo Rehearsal And Portfolio Recording Prep

### What changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded the final local validation gate, local smoke/demo rehearsal, browser-facing checks, warnings, skipped checks, and Git safety status |

No runtime code, tests, lockfiles, package manifests, migrations, generated source, `RUNBOOK.md`, GitHub Actions, deployment config, real credentials, real integrations, paid API usage, staging action, commit, push, or public admin mutation behavior was changed.

`RUNBOOK.md` sections `10.1` and `10.2` were accurate for the local demo rehearsal. No runbook correction was needed.

### Preflight

| Command | Status | Exact result |
|---|---|---|
| `git status --short --branch` | pass | Starting status was clean on `main`: output `## main` |
| `git diff --cached --name-only` | pass | No output; no staged files |
| `Test-Path -LiteralPath ".env"` | pass | `True`; no ignored `.env` copy was needed |
| local `DATABASE_URL` pattern check without printing the value | pass | `DATABASE_URL is present and points at local development PostgreSQL; value not printed.` |
| `git ls-files -- apps/web/tsconfig.tsbuildinfo` | pass | No output; TypeScript build-info is not tracked |

### Required validation gate

| Command | Status | Exact result |
|---|---|---|
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `Test Files 4 passed (4)`; `Tests 33 passed (33)`; duration `14.42s` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `2.8s`; generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | Python `3.12.13`; `48 passed`, `1 warning`; duration `2.19s` |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `git diff --check` | pass | Exit 0 with no whitespace errors |

Backend test warning:

- Existing FastAPI/Starlette testclient warning: using `httpx` with `starlette.testclient` is deprecated; this did not fail the gate.

### Local smoke and demo rehearsal

| Command or action | Status | Exact result |
|---|---|---|
| `docker compose up -d postgres` | pass | `Container salesops-postgres Running` |
| `docker compose ps` | pass | `salesops-postgres` was `Up 2 days (healthy)` on port `5432` |
| `uv run alembic upgrade head` | pass | PostgreSQL Alembic context initialized; transactional DDL assumed; already at head |
| `uv run python -m backend.app.leads.demo_seed` | pass | `Seeded 4 demo runs: run_demo_success, run_demo_failed, run_demo_retried, run_demo_queued` |
| temporary backend | pass | Started at `http://127.0.0.1:8028`; process ID `7028`; `/health` returned `status=ok` and service `salesops-workflow-automation-hub` |
| backend run history | pass | `GET http://127.0.0.1:8028/leads/runs` returned 4 seeded runs: `run_demo_queued`, `run_demo_retried`, `run_demo_failed`, `run_demo_success` |
| backend run detail | pass | `GET http://127.0.0.1:8028/leads/runs/run_demo_failed` returned `run_status=failed` with 2 attempts |
| backend failure detail | pass | `GET http://127.0.0.1:8028/leads/runs/run_demo_failed/failure` returned `error_type=adapter` and suggested action `Review the synthetic CRM payload and retry locally.` |
| temporary frontend | pass | Started at `http://127.0.0.1:3042`; process ID `17332`; `/` and `/admin/runs` returned HTTP 200 |
| frontend page/proxy smoke | pass | `/` contained lead intake and CSV UI; `/admin/runs` contained `Admin run history` and `Read-only`; `/api/leads/runs` returned 4 seeded runs; `/api/leads/runs/run_demo_failed` returned failed detail with 2 attempts |
| temporary process cleanup | pass | Stopped only process IDs `7028` and `17332`; follow-up port checks showed no listeners on `8028` or `3042` |

Local PostgreSQL was left running because it is part of the documented local database path and was already managed by Docker Compose.

### Browser-facing verification

Browser plugin verification passed after switching from unsupported `networkidle` waiting to `load` plus targeted visible-text waits.

| Route | Status | Visible result |
|---|---|---|
| `http://127.0.0.1:3042/` | pass | Page title `SalesOps Workflow Automation Hub`; `Lead intake` and `CSV` UI present; visible buttons `Submit lead` and `Import rows` |
| `http://127.0.0.1:3042/admin/runs` | pass | `Admin run history` rendered with `Read-only`; 4 rows visible: queued, retried, failed, and success seeded runs; detail panel idle text visible |
| `http://127.0.0.1:3042/admin/runs?status=failed` | pass | Status filter value `failed`; only `run_demo_failed` remained visible |
| `http://127.0.0.1:3042/admin/runs?status=success&runId=run_demo_failed` | pass | Success row stayed visible; selected-run-hidden notice appeared for `run_demo_failed`; read-only detail panel showed failed-run payload, attempts, suggested action, and allowlisted mock/audit data |
| `http://127.0.0.1:3042/admin/runs?source=csv_upload` | pass | Source filter value `csv_upload`; only `run_demo_failed` remained visible |
| `http://127.0.0.1:3042/admin/runs?q=atlas` | pass | Search value `atlas`; only `run_demo_retried` remained visible |
| `http://127.0.0.1:3042/admin/runs?owner=Maya%20Patel` | pass | Owner filter value `Maya Patel`; `run_demo_queued` and `run_demo_failed` remained visible |
| `http://127.0.0.1:3042/admin/runs?errorType=adapter` | pass | Error type filter value `adapter`; `run_demo_retried` and `run_demo_failed` remained visible |
| `http://127.0.0.1:3042/admin/runs?from=2026-06-01&to=2026-06-01` | pass | Date filter values persisted; all four seeded 2026-06-01 runs remained visible |
| `http://127.0.0.1:3042/admin/runs?q=no-such-run` | pass | Search value `no-such-run`; filtered empty state `No runs match these filters.` appeared |

Browser console result:

- `tab.dev.logs({ levels: ["error", "warn"], limit: 100 })` returned `[]` after the required routes and after the broader filter pass.

Visible controls on `/admin/runs` were the local read-only navigation/filter/detail controls only: `Lead demo`, status/source/owner/error-type selects, search/date inputs, `Reset filters`, and `View details` buttons. No retry, edit, delete, submit, resubmit, rerun, send, archive, worker, background-job, `POST`, `PUT`, `PATCH`, or `DELETE` controls were visible.

### Local request and backend error observations

Temporary log paths:

- Backend: `%TEMP%\salesops-backend-8028.err.log` and `%TEMP%\salesops-backend-8028.out.log`
- Frontend: `%TEMP%\salesops-frontend-3042.out.log` and `%TEMP%\salesops-frontend-3042.err.log`

Relevant backend access logs were local `GET` requests only, including:

- `GET /health`
- `GET /leads/runs`
- `GET /leads/runs/run_demo_failed`
- `GET /leads/runs/run_demo_failed/failure`

Relevant frontend dev logs were local `GET` requests only, including:

- `GET /`
- `GET /admin/runs`
- `GET /admin/runs?status=failed`
- `GET /admin/runs?status=success&runId=run_demo_failed`
- `GET /admin/runs?source=csv_upload`
- `GET /admin/runs?q=atlas`
- `GET /admin/runs?owner=Maya%20Patel`
- `GET /admin/runs?errorType=adapter`
- `GET /admin/runs?from=2026-06-01&to=2026-06-01`
- `GET /admin/runs?q=no-such-run`
- `GET /api/leads/runs`
- `GET /api/leads/runs/run_demo_failed`

Mutation-line scan across the temporary frontend/backend logs found `0` lines containing `POST`, `PUT`, `PATCH`, or `DELETE`.

No backend error was observed during the local smoke. No browser console error or warning was observed.

### Warnings and command notes

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- `Start-Process -FilePath "pnpm"` failed on Windows because the shim is not a directly runnable Win32 application in this environment; the frontend was then started successfully with `pnpm.cmd`.
- One local PowerShell HTTP smoke command initially used `$home`, which conflicts with the built-in read-only `$HOME`; the command was rerun with a neutral variable name and passed.
- Browser `waitForLoadState({ state: "networkidle" })` is unsupported in the Browser plugin runtime; browser verification was rerun using `load` plus targeted visible-text waits and passed.
- TypeScript/Next.js validation may rewrite ignored generated artifacts such as `.next` or `*.tsbuildinfo`; tracked checks stayed clean before the documentation update.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external service smoke | skipped | Explicitly forbidden; the rehearsal stayed local-only and mock-safe |
| GitHub Actions / CI | skipped | Explicitly out of scope; `Test-Path -LiteralPath ".github\workflows"` returned `False` |
| Deployment, staging, or production smoke | skipped | Explicitly out of scope |
| Dependency install, upgrade, replacement, or removal | skipped | Existing locked environments were sufficient; no dependency change was needed or introduced |
| `RUNBOOK.md` correction | skipped | The documented local demo path was accurate; no correction was needed |
| Commit, push, staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

### Git and artifact safety

Before the `STATE.md` update:

| Command | Status | Exact result |
|---|---|---|
| `git status --short --branch` | pass | `## main` |
| `git diff --cached --name-only` | pass | No output; no files staged |
| `git diff --stat` | pass | No output; no tracked diff |
| `Test-Path -LiteralPath ".github\workflows"` | pass | `False` |
| `git ls-files -- apps/web/tsconfig.tsbuildinfo` | pass | No output; build-info is not tracked |
| `git ls-files -ci --exclude-standard` | pass | No output; ignored files are not tracked |

After the `STATE.md` update:

| Command | Status | Exact result |
|---|---|---|
| `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed the existing LF-to-CRLF working-copy warning for `STATE.md` |
| `git status --short --branch` | pass | `## main` plus `M STATE.md` |
| `git diff --cached --name-only` | pass | No output; no files staged |
| `git diff --name-only` | pass | `STATE.md` only |
| `git diff --stat` | pass | `STATE.md | 197 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-`; 1 file changed, 194 insertions, 3 deletions |

No files were staged, committed, or pushed by Codex.

### Manual recording recommendation

For recording, start the documented local demo path again:

```powershell
docker compose up -d postgres
uv run alembic upgrade head
uv run python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8028
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8028"
pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 3042
```

Open `http://127.0.0.1:3042/` and `http://127.0.0.1:3042/admin/runs`. The repo is ready for manual portfolio recording from the verified local path.

### Remaining risks

- Browser verification covered the in-app Browser runtime only; other browsers were not manually checked in this pass.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning remains non-blocking.
- Temporary smoke logs were written under `%TEMP%`, outside the repository.
- Local PostgreSQL remains running for the user's environment; stop it manually only if desired.
- This pass is still mock/local-only; no live CRM/Slack provider code, provider SDK, credential validation, or live smoke was added.

### Suggested commit message

```text
Record final local demo rehearsal
```

### Next recommended phase

Manual portfolio review and optional 3-5 minute screen recording using the verified local runbook path.

## Latest Update - 2026-06-05 Local-First Final Readiness Audit After Documentation Polish

### What changed

| Path | Purpose |
|---|---|
| `REQ.md` | Updated the current phase metadata to the local-first final readiness audit |
| `CONTEXT.md` | Updated the current phase metadata to the local-first final readiness audit |
| `DESIGN.md` | Updated the current phase metadata to the local-first final readiness audit |
| `TDD.md` | Updated the current phase metadata to the local-first final readiness audit |
| `RUNBOOK.md` | Updated the current phase metadata to the local-first final readiness audit |
| `EXEC_PLAN.md` | Updated the current-phase and next-phase wording to describe the final readiness audit and manual portfolio review/demo-recording path |
| `STATE.md` | Recorded this audit's documentation-only corrections, validation results, skipped checks, risks, and Git safety status |

No application code, tests, lockfiles, package manifests, CI files, env files, database migrations, generated artifacts, public API, schema, route, UI behavior, runtime behavior, real integration, provider SDK, OAuth/webhook/credential flow, real secret, deployment config, staging action, commit, push, retry UI, or public admin mutation behavior was changed.

`README.md` and `HANDOFF.md` were reviewed and left unchanged. Their current wording already keeps CRM/Slack behavior mock-only, marks future live-provider work as approval-gated, documents the local ports/routes correctly, and does not imply CI, deployment, staging, production, browser screenshots, browser-console capture, paid APIs, or real external integrations were performed.

The source-of-truth docs accurately describe the implemented `/admin/runs` experience as a same-page read-only selected run detail panel backed by local `GET` proxy routes. Manual retry remains documented as backend-only and is intentionally not exposed in the public admin UI.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short --branch` | pass | Starting status was clean on `main`: output `## main` |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `Test Files 4 passed (4)`; `Tests 33 passed (33)`; duration `14.62s` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `2.6s`; generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | Python `3.12.13`; `48 passed`, `1 warning`; duration `2.40s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed LF-to-CRLF working-copy warnings for touched Markdown files |
| `git diff --cached --name-only` | pass | No output; no files staged |
| `git status --short --branch` | pass | Final status showed `## main` plus modified docs only: `CONTEXT.md`, `DESIGN.md`, `EXEC_PLAN.md`, `REQ.md`, `RUNBOOK.md`, `STATE.md`, and `TDD.md` |
| Targeted stale current-phase wording scan | pass | No matches for obsolete current-phase rows or prior next-phase instruction; `rg` exited 1 because no matches were found |

Validation notes:

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- No dependency install, package upgrade, backend route change, frontend route change, migration creation, code generation into tracked files, real external API call, staging action, commit, or push was needed.
- No tests were added because this pass changed documentation only and did not alter backend/frontend behavior, APIs, schemas, routes, or components.
- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.

### Manual verification

Full backend/frontend smoke verification was skipped for this final readiness audit because the current same-day `STATE.md` history already records local PostgreSQL/backend/frontend smoke for `/`, `/admin/runs`, `/api/leads/runs`, `/api/leads/runs/run_demo_failed`, backend `/health`, backend `/leads/runs`, backend `/leads/runs/run_demo_failed`, and backend `/leads/runs/run_demo_failed/failure`, and this audit changed only documentation metadata/current-state wording. No runtime files changed.

Manual verification recommendation:

```powershell
uv run --env-file .env.example alembic upgrade head
uv run --env-file .env.example python -m backend.app.leads.demo_seed
uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
$env:BACKEND_API_BASE_URL = "http://127.0.0.1:8000"
$env:NEXT_PUBLIC_BACKEND_API_BASE_URL = "http://127.0.0.1:8000"
pnpm --dir apps/web dev
```

Then open `http://localhost:3000/` and `http://localhost:3000/admin/runs`. Confirm seeded success, failed, queued, and retried rows render; status/source/search/date/owner/error-type filters work; selecting a run opens the same-page read-only detail panel; `/admin/runs?status=success&runId=run_demo_failed` shows the selected-run-hidden notice while keeping the failed-run detail visible; and admin interactions stay local GET-only.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Full backend/frontend smoke rerun | skipped | Recent same-day local PostgreSQL/backend/frontend smoke is already recorded in this file, and this audit changed documentation only |
| Browser console capture | skipped | Not required for this documentation-only audit; no browser tooling dependency was added |
| Screenshots | skipped | Not required for this documentation-only audit; no tracked docs require new screenshots |
| Behavior test additions | skipped | Documentation-only pass; no backend/frontend behavior changed |
| Dependency install or upgrade | skipped | Existing locked environments were sufficient; no dependency change was needed or introduced |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment, staging, or production smoke | skipped | Explicitly out of scope; no hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Staging, commit, and push | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Remaining risks

- Browser-rendered console/runtime capture was not repeated for this documentation-only audit.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning still appears during backend tests but does not fail the gate.
- TypeScript/Next.js validation may rewrite ignored local build artifacts without producing tracked source changes.
- This pass is documentation-only; no live CRM/Slack provider code, provider SDK, credential validation, or live smoke was added.

### Suggested commit message

```text
Record final local readiness audit
```

### Next recommended phase

After user review, manually commit the local-first final readiness audit if the diff is acceptable. Then proceed to manual portfolio review and optional demo recording using the existing runbook.

## Latest Update - 2026-06-05 Local-First Portfolio Readiness Polish Pass

### What changed

| Path | Purpose |
|---|---|
| `REQ.md` | Updated the current phase label and corrected FR-009 to describe the implemented backend failure endpoint plus same-page read-only selected run detail panel instead of a planned public failure page/action |
| `EXEC_PLAN.md` | Updated the current phase to the local-first readiness polish pass and added the current pass as documentation-only follow-up after the handoff slice |
| `CONTEXT.md` | Updated the current phase label |
| `DESIGN.md` | Updated the current phase label and last-updated date |
| `RUNBOOK.md` | Updated the current phase label and last-updated date |
| `TDD.md` | Updated the current phase label and last-updated date |
| `STATE.md` | Recorded this pass's changed files, validation, manual smoke, skipped checks, risks, and Git safety status |

No backend code, frontend code, public API, schema, route, UI behavior, dependency manifest, database migration, generated source file, GitHub Actions workflow, deployment config, real integration, provider SDK, OAuth/webhook/credential flow, real secret, staging action, commit, push, retry UI, or public admin mutation behavior was changed.

`README.md` and `HANDOFF.md` were reviewed and left unchanged. Their current wording already keeps CRM/Slack behavior mock-only, marks future live-provider work as approval-gated, and does not imply production integrations already exist.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short --branch` | pass | Starting status was clean on `main`: output `## main` |
| `git diff --cached --name-only` | pass | Starting staged-file check had no output |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `Test Files 4 passed (4)`; `Tests 33 passed (33)`; duration `13.89s` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `2.9s`; generated 8 routes including `/`, `/admin/runs`, and local API proxy routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | Python `3.12.13`; `48 passed`, `1 warning`; duration `2.28s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed existing LF-to-CRLF working-copy warnings for touched docs |
| `git diff --cached --name-only` | pass | Final staged-file check had no output; no files were staged |
| `git status --short --branch` | pass | Final status showed `## main` plus modified docs only: `CONTEXT.md`, `DESIGN.md`, `EXEC_PLAN.md`, `REQ.md`, `RUNBOOK.md`, `STATE.md`, and `TDD.md` |
| Targeted stale wording scan | pass | No remaining matches for outdated phase labels or obsolete public failure-page wording |

Validation notes:

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- No dependency install, package upgrade, backend route change, frontend route change, migration creation, code generation into tracked files, real external API call, staging action, commit, or push was needed.
- No tests were added because this pass changed documentation only and did not alter backend/frontend behavior, APIs, schemas, routes, or components.
- No `git add`, `git commit`, `git push`, `git reset`, `git rebase`, `git stash`, branch deletion, destructive checkout, or destructive cleanup was run.

### Local smoke and manual verification

- `docker compose up -d postgres` confirmed `salesops-postgres` was running.
- `docker compose ps` showed `salesops-postgres` as `Up` and `healthy` on port `5432`.
- `uv run --env-file .env.example alembic upgrade head` passed against local PostgreSQL without creating or printing a local `.env`.
- `uv run --env-file .env.example python -m backend.app.leads.demo_seed` seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Temporary backend ran at `http://127.0.0.1:8194`; `GET /health` returned `status=ok` and service `salesops-workflow-automation-hub`.
- Temporary frontend ran at `http://127.0.0.1:3194`.
- `GET http://127.0.0.1:3194/` returned HTTP 200 and contained the lead intake and CSV UI.
- `GET http://127.0.0.1:3194/admin/runs` returned HTTP 200 and contained `Admin run history` and `Read-only`.
- `GET http://127.0.0.1:3194/api/leads/runs` returned 4 seeded runs: `run_demo_queued`, `run_demo_retried`, `run_demo_failed`, and `run_demo_success`, with statuses `queued`, `retried`, `failed`, and `success`.
- `GET http://127.0.0.1:3194/api/leads/runs/run_demo_failed` returned the seeded failed-run detail with safe run metadata, persisted attempts, sanitized intake payload fields, and allowlisted mock/audit result data.
- The selected run-detail payload excluded lead `phone`, lead freeform `message`, and secret-like values; the response's `error_message` field is expected failure metadata, not the hidden lead message payload.
- `GET http://127.0.0.1:8194/leads/runs/run_demo_failed/failure` returned `error_type=adapter`, suggested action `Review the synthetic CRM payload and retry locally.`, and the same sanitized payload field allowlist.
- Frontend dev logs showed local `GET` requests only for `/`, `/admin/runs`, `/api/leads/runs`, and `/api/leads/runs/run_demo_failed`.
- Backend access logs showed local `GET` requests only for `/health`, `/leads/runs`, `/leads/runs/run_demo_failed`, and `/leads/runs/run_demo_failed/failure`.
- Temporary backend and frontend processes on ports `8194` and `3194` were stopped after smoke; follow-up port checks found no listeners on those ports.
- Local PostgreSQL was left running because it is part of the documented local database path and was already managed by Docker Compose.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Browser console capture | skipped/limited | No browser-control tool was exposed in this session; the project does not list Playwright as a dependency, and dependency changes were out of scope. HTTP smoke and server logs were used instead. |
| Screenshots | skipped | No tracked docs require screenshots for this phase; browser screenshot tooling was unavailable and the pass is documentation-only |
| Behavior test additions | skipped | Documentation-only pass; no backend/frontend behavior changed |
| Dependency install or upgrade | skipped | Existing locked environments were sufficient; no dependency change was needed or introduced |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment | skipped | Explicitly out of scope; no hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Staging, commit, and push | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Remaining risks

- Browser-rendered console/runtime capture was unavailable in this session; HTTP route/proxy smoke and server logs passed for the documented local demo path.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning still appears during backend tests but does not fail the gate.
- Temporary smoke logs were written under `%TEMP%`, outside the repository.
- Local PostgreSQL remains running for the user's environment; stop it manually only if desired.
- This pass is documentation-only; no live CRM/Slack provider code, provider SDK, credential validation, or live smoke was added.

### Suggested commit message

```text
Polish local-first portfolio readiness docs
```

### Next recommended phase

Superseded by the later local-first final readiness audit entry above. Use the latest audit entry for the current suggested commit message and next phase.

## Latest Update - 2026-06-05 Portfolio Handoff Materials Slice

### What changed

| Path | Purpose |
|---|---|
| `HANDOFF.md` | Added reviewer-facing handoff guidance, current mock CRM/Slack boundaries, safe future credential rules, before/after workflow framing, a 3-5 minute demo script, and reviewer checklist |
| `README.md` | Linked `HANDOFF.md` from the portfolio overview, demo path, and local-only boundaries |
| `REQ.md` | Marked FR-012 as documentation-only handoff implemented |
| `EXEC_PLAN.md` | Recorded the completed portfolio handoff materials slice and updated next-step guidance |
| `CONTEXT.md` | Recorded `HANDOFF.md` as a source-of-truth handoff document and added the implemented handoff material status |
| `STATE.md` | Recorded this phase's changed files, validation, local smoke, skipped checks, risks, and next recommended phase |

No backend code, frontend code, public API, schema, database migration, dependency manifest, generated source file, GitHub Actions workflow, deployment config, live integration, provider SDK, real credential, staging action, commit, push, mutation control, retry UI, or admin route behavior was changed.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short --branch` | pass | Starting status was clean on `main`: output `## main` |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `Test Files 4 passed (4)`; `Tests 33 passed (33)`; duration `14.54s` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `3.2s`; generated 8 routes including `/admin/runs` and local API proxy routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | Python `3.12.13`; `48 passed`, `1 warning`; duration `2.40s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| Targeted changed-doc secret-like token scan | pass | No output for `HANDOFF.md`, `README.md`, `REQ.md`, `EXEC_PLAN.md`, and `CONTEXT.md` |
| Targeted changed-doc live-endpoint scan | pass | No output for `HANDOFF.md`, `README.md`, `REQ.md`, `EXEC_PLAN.md`, and `CONTEXT.md` |
| Refined latest-`STATE.md` secret-like token scan | pass | No output in the new latest update section |
| Refined latest-`STATE.md` live-endpoint scan | pass | No output in the new latest update section |
| `git diff --check` | pass | Exit 0 with no whitespace errors; Git printed existing LF-to-CRLF working-copy warnings for touched docs |
| `git diff --cached --name-only` | pass | No output; no files staged |

Validation notes:

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- No dependency install, package upgrade, backend route change, migration creation, real external API call, staging action, commit, or push was needed.
- No behavior tests were added because this slice is documentation-only and does not change backend/frontend behavior.
- A broad scan across all of `STATE.md` self-matched older documented regex command text in historical phase notes; the refined scan of the new latest update section had no output.

### Local smoke and manual verification

- `docker compose up -d postgres` confirmed `salesops-postgres` was running.
- `uv run --env-file .env.example alembic upgrade head` passed against local PostgreSQL without creating or printing a local `.env`.
- `uv run --env-file .env.example python -m backend.app.leads.demo_seed` seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Temporary backend ran at `http://127.0.0.1:8190`; `GET /health` returned `status=ok` and service `salesops-workflow-automation-hub`.
- Temporary frontend ran at `http://127.0.0.1:3190`.
- `GET http://127.0.0.1:3190/` returned HTTP 200 with the public lead form route.
- `GET http://127.0.0.1:3190/admin/runs` returned HTTP 200 with the read-only admin route.
- `GET http://127.0.0.1:3190/api/leads/runs` returned seeded persisted run data.
- `GET http://127.0.0.1:3190/api/leads/runs/run_demo_failed` returned the seeded failed-run detail with sanitized payload and audit/mock result data.
- Frontend smoke logs showed local `GET` requests only for `/`, `/admin/runs`, `/api/leads/runs`, `/api/leads/runs/run_demo_failed`, route assets, and `/icon.svg`; no non-GET admin requests appeared in the smoke logs.
- Frontend stderr was empty.
- Browser plugin was not available in this session.
- Headless Chrome/CDP console collection was attempted on local-only ports `9226` and `9227`, but it did not complete reliably: the first attempt aborted the WebSocket after a PowerShell variable-name conflict, the retry timed out, and a redirected Chrome dump-DOM fallback hit a Windows access-denied error. This browser-console check is recorded as limited/inconclusive rather than passed.
- Temporary backend, frontend, and Chrome processes on ports `8190`, `3190`, `9226`, and `9227` were stopped; follow-up port checks found no listeners on those ports.
- Local PostgreSQL was left running because it was already running for the documented local database path.

### Skipped or limited checks

| Check | Status | Reason |
|---|---|---|
| Behavior test additions | skipped | This phase changed documentation only and did not alter behavior, APIs, routes, types, or components |
| Browser plugin QA path | skipped | Browser plugin was not available through the current tool set |
| Browser console/runtime capture | limited | Local Chrome/CDP and dump-DOM fallbacks did not complete reliably; HTTP route/proxy smoke and server logs were checked instead |
| Dependency install | skipped | Existing locked environments were sufficient; no dependency change was needed or introduced |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment | skipped | Explicitly out of scope; no hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Staging, commit, and push | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Remaining risks

- The handoff material is documentation-only; no live CRM/Slack provider code, provider SDK, credential validation, or live smoke was added.
- Browser-rendered console/runtime capture was attempted but inconclusive due local Chrome/CDP tooling behavior; no server-side runtime errors or frontend stderr appeared during the HTTP smoke.
- Local PostgreSQL remains running for the user's environment; temporary backend/frontend/Chrome smoke processes were stopped.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning still appears during backend tests but does not fail the gate.

### Suggested commit message

```text
Add portfolio handoff materials
```

### Next recommended phase

After user review, manually commit the portfolio handoff materials slice if the diff is acceptable. Later work should stay local-first and avoid real integrations, deployment config, GitHub Actions, staging, commits, pushes, and real credentials unless explicitly requested.

## Latest Update - 2026-06-05 Admin Run History Visual Polish And Responsive Alignment QA

### What changed

| Path | Purpose |
|---|---|
| `STATE.md` | Recorded this verification-only visual polish QA phase, validation, manual smoke, skipped checks, process cleanup, and residual risks |

No component or test code changed. Browser geometry confirmed the existing `Detail` column and `View details` button layout is already aligned, readable, keyboard-accessible, and contained on desktop and mobile.

No backend code, public API, schema, database migration, authentication, routing, dependency manifest, generated source file, GitHub Actions workflow, deployment config, real integration, secret, staging action, commit, push, mutation control, filter behavior, search behavior, or detail-loading contract was changed.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short --branch` | pass | Starting status was clean on `main`: output `## main` |
| `pnpm --dir apps/web test -- --run admin-run-history` | pass | Vitest `v3.2.4`; `1 passed` test file; `24 passed` tests; duration `7.29s` |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `Test Files 4 passed (4)`; `Tests 33 passed (33)`; duration `13.45s` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `2.2s`; generated 8 routes including `/admin/runs` and local API proxy routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | Python `3.12.13`; `48 passed`, `1 warning`; duration `2.14s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `git diff --check` | pass | Final post-documentation check exited 0 with no whitespace errors. Git printed the existing LF-to-CRLF working-copy warning for `STATE.md` |
| `git diff --cached --name-only` | pass | Final post-documentation check had no output; no files were staged |

Validation notes:

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- No dependency install, package upgrade, backend route change, migration creation, real external API call, staging action, commit, or push was needed.
- Because rendered QA found no Detail-column alignment defect, `apps/web/src/components/admin-run-history.tsx` and `apps/web/src/components/admin-run-history.test.tsx` were left unchanged.

### Local browser smoke

- Browser plugin was not available in this session.
- `pnpm --dir apps/web exec playwright --version` failed because Playwright is not installed in the project: `Command "playwright" not found`.
- Used installed Google Chrome `148.0.7778.217` headless through Chrome DevTools Protocol without adding dependencies.
- Existing local PostgreSQL container `salesops-postgres` was already `Up` and `healthy` on port `5432`.
- `uv run --env-file .env.example alembic upgrade head` passed against local PostgreSQL.
- `uv run --env-file .env.example python -m backend.app.leads.demo_seed` seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Temporary backend ran at `http://127.0.0.1:8162`; `GET /health` returned `status=ok`.
- Temporary frontend ran at `http://127.0.0.1:3162`; `GET /api/leads/runs` returned seeded persisted run data.
- Desktop Chrome/CDP smoke loaded `/admin/runs`, page title was `SalesOps Workflow Automation Hub`, all four seeded rows rendered, the `Read-only` marker was visible, and no framework overlay was detected.
- Source filter `csv_upload` updated the URL to `?source=csv_upload` and showed only the CSV-sourced `run_demo_failed` row while hiding demo-form/manual rows.
- Search `q=pipeline` after resetting Source to `All sources` updated the URL to `?q=pipeline`, returned the Pipeline Labs row, and excluded Northstar Growth.
- Opening details with `View details for run_demo_failed` updated the URL to `?q=pipeline&runId=run_demo_failed` and loaded the same-page read-only detail panel with the seeded failed-run suggested action.
- Keyboard tab focus reached the `Lead demo` link, filter controls, labeled table scroller, and multiple `View details` buttons.
- Desktop layout stayed contained: viewport `1366x768`, `documentScrollWidth=1351`, `bodyScrollWidth=1351`, `bodyHorizontalOverflow=false`, `tableClientWidth=1182`, `tableScrollWidth=1182`.
- Desktop Detail geometry was aligned: final column class `w-[128px]`, button width `113.9px`, button height `40px`, and button/header center delta `0px`.
- Mobile viewport `390x844` had no body horizontal overflow: `documentScrollWidth=390`, `bodyScrollWidth=390`, `bodyHorizontalOverflow=false`; table overflow stayed inside the scroller with `tableClientWidth=324` and `tableScrollWidth=1100`.
- Mobile Detail geometry remained aligned: final column class `w-[128px]`, button width `113.9px`, button height `40px`, and button/header center delta `0.5px`.
- Browser console messages and runtime exceptions were empty.
- Browser network capture showed local admin `GET` requests only for `/api/leads/runs` and `/api/leads/runs/run_demo_failed`; no external HTTP requests were observed.
- Temporary backend, frontend, and Chrome processes on ports `8162`, `3162`, and `9224` were stopped after smoke; follow-up port checks found no listeners on those ports.
- Local PostgreSQL was left running because it was already running and healthy before this phase.
- Screenshots were saved outside the repo under `%TEMP%\salesops-admin-visual-polish-smoke\admin-runs-desktop.png`, `%TEMP%\salesops-admin-visual-polish-smoke\admin-runs-mobile-390x844.png`, and `%TEMP%\salesops-admin-visual-polish-smoke\admin-runs-mobile-table-detail.png`.

### Skipped checks

| Check | Status | Reason |
|---|---|---|
| Component/test patch | skipped | Rendered desktop/mobile geometry confirmed the existing Detail-column and button layout already satisfies the phase goal |
| Dependency install | skipped | Existing locked environments were sufficient; all required gates ran without dependency changes |
| Browser plugin QA path | skipped | Browser plugin is not installed/available in this session |
| Playwright QA path | skipped | Project Playwright binary is not installed and dependency changes were out of scope |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment | skipped | Explicitly out of scope; no hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Staging, commit, and push | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Remaining risks

- Browser QA covered Chrome headless at desktop `1366x768` and mobile `390x844`; Firefox, Safari, Edge, and additional breakpoints were not manually checked.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning still appears during backend tests but does not fail the gate.
- Temporary smoke logs and screenshots were written under `%TEMP%`, outside the repo.
- Local PostgreSQL remains running for the user's environment; stop it manually only if desired.

### Suggested commit message

```text
Document admin run history visual QA
```

## Latest Update - 2026-06-05 Admin Run Detail UI Hardening

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/ui/button.tsx` | Added visible `focus-visible` ring styling to the shared button primitive without changing props or behavior |
| `apps/web/src/components/admin-run-history.tsx` | Added matching focus styling to the `Lead demo` admin link, made the table scroller keyboard-focusable/labeled, and labeled read-only detail-panel states |
| `apps/web/src/app/admin/runs/page.tsx` | Replaced the blank Suspense fallback with a small non-interactive admin loading shell |
| `apps/web/src/components/admin-run-history.test.tsx` | Added focused assertions for the labeled/focusable scroller, admin action focus styling, and detail-panel state labels |
| `STATE.md` | Recorded this phase's changed files, validation, smoke results, skipped checks, risks, and suggested commit message |

No backend code, public API, schema, database migration, authentication, routing contract, dependency manifest, generated source file, GitHub Actions workflow, deployment config, real integration, secret, staging action, commit, push, mutation control, filter behavior, search behavior, or detail-loading contract was changed.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short --branch` | pass | Starting status was clean on `main`: output `## main` |
| `git diff --cached --name-only` | pass | Starting staged-file check had no output |
| `pnpm --dir apps/web test -- --run admin-run-history` | pass | Vitest `v3.2.4`; `1 passed` test file; `24 passed` tests; duration `6.49s` after the UI hardening patch |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `Test Files 4 passed (4)`; `Tests 33 passed (33)`; duration `15.01s` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `7.5s`; generated 8 routes including `/admin/runs` and local API proxy routes |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | Python `3.12.13`; `48 passed`, `1 warning`; duration `4.88s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `git diff --check` | pass | Exit 0; no whitespace errors. Git printed LF-to-CRLF working-copy warnings for touched files |
| `git diff --cached --name-only` | pass | No output; no files staged |

Validation notes:

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- The auto-review for one parallel lint/type command group timed out; the same scoped commands were rerun individually and passed.
- Frontend build was run before frontend typecheck to stay consistent with the repo's documented Next/TypeScript generated-file validation note.
- No dependency install, package upgrade, backend route change, migration creation, real external API call, staging action, commit, or push was needed.

### Local browser smoke

- Browser plugin was not available in this session.
- `pnpm --dir apps/web exec playwright --version` failed because Playwright is not installed in the project: `Command "playwright" not found`.
- Used installed Google Chrome headless through Chrome DevTools Protocol without adding dependencies.
- `docker compose up -d postgres` confirmed `salesops-postgres` was running.
- `uv run --env-file .env.example alembic upgrade head` passed against local PostgreSQL.
- `uv run --env-file .env.example python -m backend.app.leads.demo_seed` seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Temporary backend ran at `http://127.0.0.1:8146`; temporary frontend ran at `http://127.0.0.1:3146`.
- Desktop Chrome/CDP smoke loaded `/admin/runs`, page title was `SalesOps Workflow Automation Hub`, seeded rows rendered, and no framework overlay was detected.
- Source filter `csv_upload` updated the UI/URL and the table showed CSV-sourced rows only.
- Search `q=pipeline` after resetting Source to `All sources` updated the UI/URL and returned the Pipeline Labs row while excluding Northstar Growth.
- Clicking `View details for run_demo_failed` loaded the same-page read-only detail panel with seeded failed-run data and the `Read-only` marker.
- Desktop layout stayed contained: `pageScrollWidth=1351`, `bodyScrollWidth=1351`, `tableClientWidth=1182`, `tableScrollWidth=1182`, `detailClientWidth=1214`, `detailScrollWidth=1214`.
- Mobile viewport `390x844` had no body horizontal overflow: `pageScrollWidth=390`, `bodyScrollWidth=390`; table overflow stayed inside the scroller: `tableClientWidth=324`, `tableScrollWidth=1100`; detail stayed contained: `detailClientWidth=356`, `detailScrollWidth=356`.
- Browser console, runtime exceptions, and Chrome log entries were empty.
- Browser network capture showed admin API calls were local `GET` requests only: `/api/leads/runs` and `/api/leads/runs/run_demo_failed`; no non-GET admin API requests and no external HTTP requests were observed.
- Frontend smoke logs showed local `GET` requests only for admin route/API interactions.
- Backend smoke logs showed local `GET /health`, `GET /leads/runs`, and `GET /leads/runs/run_demo_failed` requests only.
- Temporary backend/frontend processes on ports `8146` and `3146` were stopped after smoke; a follow-up port check found no listening processes on those ports.
- Screenshots were saved outside the repo under `%TEMP%\salesops-admin-ui-hardening-smoke\admin-runs-desktop.png` and `%TEMP%\salesops-admin-ui-hardening-smoke\admin-runs-mobile.png`.

### Skipped checks

| Check | Status | Reason |
|---|---|---|
| Dependency install | skipped | Existing locked environments were sufficient; all required gates ran without dependency changes |
| Browser plugin QA path | skipped | Browser plugin is not installed/available in this session |
| Playwright QA path | skipped | Project Playwright binary is not installed and dependency changes were out of scope |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment | skipped | Explicitly out of scope; no hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Staging, commit, and push | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Remaining risks

- Browser QA covered headless Chrome at desktop `1366x768` and mobile `390x844`; Firefox, Safari, Edge, and additional breakpoints were not manually checked.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning still appears during backend tests but does not fail the gate.
- Local PostgreSQL was left running because the smoke path uses the documented local database service; temporary backend/frontend smoke processes were stopped.
- Temporary smoke script, logs, and screenshots were written under `%TEMP%`, outside the repo.

### Suggested commit message

```text
Harden admin run detail accessibility
```

## Latest Update - 2026-06-05 Admin Run History Table Alignment And Responsive UI Polish

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.tsx` | Widened only the final Detail column, kept the existing table scroller, centered the inline detail action, and gave the `View details` button its standard height and breathing room |
| `apps/web/src/components/admin-run-history.test.tsx` | Extended the existing long-value admin table test to assert the detail button keeps its accessible label and non-cramped sizing classes |
| `STATE.md` | Recorded this UI polish phase, validation, browser smoke, skipped checks, risks, and suggested commit message |

No backend code, public API, schema, database migration, authentication, routing, dependency manifest, generated source file, GitHub Actions workflow, deployment config, real integration, secret, staging action, commit, push, mutation control, filter behavior, search behavior, or detail-navigation contract was changed.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short --branch` | pass | Starting status was clean on `main`: output `## main` |
| `pnpm --dir apps/web test -- --run admin-run-history` | pass | Vitest `v3.2.4`; `1 passed` test file; `24 passed` tests; duration `10.03s` after the corrected final-column patch |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `Test Files 4 passed (4)`; `Tests 33 passed (33)`; duration `21.77s` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `5.4s`; generated 8 routes including `/admin/runs` and local API proxy routes |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | Python `3.12.13`; `48 passed`, `1 warning`; duration `2.40s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `git diff --check` | pass | Exit 0; no whitespace errors. Git printed LF-to-CRLF working-copy warnings for the touched TSX files |
| `git diff --cached --name-only` | pass | No output; no files staged |

Validation notes:

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- An initial local patch widened the first `100px` column instead of the final `Detail` column; browser geometry caught it before final validation. The patch was corrected, and the full requested validation sequence was rerun after the correction.
- No dependency install, package upgrade, backend route change, migration creation, real external API call, staging action, commit, or push was needed.

### Local browser smoke

- `docker compose up -d postgres` confirmed `salesops-postgres` was running.
- `uv run alembic upgrade head` passed against local PostgreSQL.
- `uv run python -m backend.app.leads.demo_seed` seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Temporary backend ran at `http://127.0.0.1:8134`; temporary frontend ran at `http://127.0.0.1:3134`.
- In-app Browser desktop smoke loaded `/admin/runs`, rendered all four seeded rows, and showed the `Read-only` marker.
- Desktop table geometry after correction: table min width `1100px`, final column class `w-[128px]`, detail button width `113.5px`, rendered detail cell width about `138.5px`, and button/header center delta `0px`.
- The `View details` button text had breathing room through `h-10`, `min-w-[7rem]`, `px-4`, and `whitespace-nowrap`; it no longer stretched to the full cell width.
- Source filter `csv_upload` updated the URL to `?source=csv_upload` and returned only CSV-sourced rows.
- Search `q=pipeline` with Source reset to `All sources` updated the URL to `?q=pipeline` and returned the expected Pipeline Labs row.
- Clicking `View details for run_demo_failed` updated the URL to `?q=pipeline&runId=run_demo_failed` and loaded the same-page read-only detail panel with the seeded failed-run data.
- Mobile viewport `390x844` rendered four seeded rows, kept body-level horizontal overflow off (`pageScrollWidth=375`, `bodyScrollWidth=375`), and kept table overflow inside the scroller (`tableClientWidth=310`, `tableScrollWidth=1100`).
- Mobile detail-column geometry remained acceptable: detail button width `113.5px`, rendered detail cell width about `128.9px`, and button/header center delta about `0.3px`.
- Frontend smoke logs showed local `GET` requests only for admin interactions: `/admin/runs`, `/api/leads/runs`, and `/api/leads/runs/run_demo_failed`.
- Backend smoke logs showed local `GET /leads/runs` and `GET /leads/runs/run_demo_failed` requests only for admin browser interactions.
- Temporary backend/frontend processes on ports `8134` and `3134` were stopped after smoke; a follow-up port check found no listening processes on those ports.

Browser smoke note:

- Running `pnpm --dir apps/web build` while the first temporary `next dev` process was still alive produced a transient Next.js dev overlay and a retained browser console error for stale `.next` runtime chunks. The temporary frontend was restarted after the build; the final rendered desktop and mobile pages had no visible framework overlay, and no new server-side smoke errors appeared. The Browser console log API still retained the earlier stale entry, so final console health is recorded as visually clean with retained-log caveat.

### Skipped checks

| Check | Status | Reason |
|---|---|---|
| Dependency install | skipped | Existing locked environments were sufficient; all required gates ran without dependency changes |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment | skipped | Explicitly out of scope; no hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Staging, commit, and push | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Remaining risks

- Browser QA covered the in-app Chromium browser at desktop `1366x768` and mobile `390x844`; Firefox, Safari, Edge, and additional breakpoints were not manually checked.
- The Browser console log view retained a stale dev-overlay error from before the frontend restart; final DOM, route, server logs, and visible overlay checks passed after restart.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning still appears during backend tests but does not fail the gate.
- Local PostgreSQL was left running because it was already running before this phase; temporary backend/frontend smoke processes were stopped.

### Suggested commit message

```text
Polish admin run detail button alignment
```

## Latest Update - 2026-06-04 Admin Source Filter Hardening

### What changed

| Path | Purpose |
|---|---|
| `apps/web/src/components/admin-run-history.tsx` | Added `source` to the existing admin run-history text search fields so source values are searchable as documented |
| `apps/web/src/components/admin-run-history.test.tsx` | Added regression coverage for unknown source URL normalization, source text search, and source plus search no-match behavior |
| `STATE.md` | Recorded this hardening pass, validation, browser smoke, skipped checks, risks, and suggested commit message |

No backend code, public API, schema, database migration, dependency manifest, generated source file, GitHub Actions workflow, deployment config, real integration, secret, staging action, commit, push, mutation control, or new filter was introduced.

### Automated validation

| Command | Status | Exact result |
|---|---|---|
| `git status --short` | pass | Starting status had no output. After implementation and before `STATE.md`, output listed only `M apps/web/src/components/admin-run-history.test.tsx` and `M apps/web/src/components/admin-run-history.tsx` |
| `git diff --check` | pass | Exit 0; no whitespace errors. Git printed LF-to-CRLF working-copy warnings for the touched TSX files |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass | Python `3.12.13`; `48 passed`, `1 warning`; duration `5.99s`; warning is the existing FastAPI/Starlette `httpx` testclient deprecation |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass | `All checks passed!` |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass | `Success: no issues found in 26 source files` |
| `pnpm --dir apps/web lint` | pass | `$ eslint .`; exit 0 |
| `pnpm --dir apps/web test -- --run` | pass | Vitest `v3.2.4`; `Test Files 4 passed (4)`; `Tests 33 passed (33)`; duration `18.32s` |
| `pnpm --dir apps/web build` | pass | Next.js `15.5.18`; compiled successfully in `5.2s`; generated 8 routes including `/admin/runs` and local API proxy routes |
| `pnpm --dir apps/web typecheck` | pass | `$ tsc --noEmit`; exit 0 |
| `git ls-files -- .github` | pass | No output; no tracked `.github` files |
| Tracked secret-pattern scan | pass | No output; command exited 1 because there were no matches |
| Tracked live-endpoint scan | pass | No output; command exited 1 because there were no matches |
| `git diff --cached --name-only` | pass | No output; no files staged |

Focused preflight:

- `pnpm --dir apps/web test -- --run admin-run-history` passed with `1 passed` test file and `24 passed` tests; duration `7.06s`.

Validation notes:

- The Windows sandbox still could not start PowerShell in this workspace (`CreateProcessAsUserW failed: 5`), so local commands were run through approved escalated PowerShell.
- Frontend build was run before typecheck to avoid the previously documented `.next/types` race.
- No dependency install, package upgrade, backend route change, migration creation, or real external API call was needed.

### Local browser smoke

- Existing local PostgreSQL container `salesops-postgres` was already `Up` and `healthy` on port `5432`.
- `uv run --env-file .env.example alembic upgrade head` passed against local PostgreSQL.
- `uv run --env-file .env.example python -m backend.app.leads.demo_seed` seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued`.
- Temporary backend ran at `http://127.0.0.1:8127`; `GET /health` returned `status=ok`.
- Temporary frontend ran at `http://127.0.0.1:3127`; `GET /admin/runs` returned HTTP 200.
- In-app Browser smoke confirmed `/admin/runs` rendered all four seeded runs and the `Read-only` marker.
- Source dropdown `csv_upload` updated the URL to `?source=csv_upload`; the table contained `csv_upload` rows and no `manual` or `demo_form` rows.
- Search `q=csv_upload` with Source set to `All sources` returned only `csv_upload` table rows, proving source values participate in text search.
- Unknown URL source `?source=partner_event&q=demo` normalized to `?q=demo`, set Source to `All sources`, and preserved Search as `demo`.
- Combined `?source=manual&q=no-local-match` showed the filtered empty state with no run-history table.
- Frontend/backend smoke logs showed local `GET` requests only for admin interactions: `GET /admin/runs`, `GET /api/leads/runs`, and `GET /leads/runs`.
- Temporary backend/frontend processes on ports `8127` and `3127` were stopped after smoke; a follow-up port check found no listening processes on those ports.

### Skipped checks

| Check | Status | Reason |
|---|---|---|
| Dependency install | skipped | Existing locked environments were sufficient; all required gates ran without dependency changes |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files were added or run |
| Deployment | skipped | Explicitly out of scope; no hosting or deployment config was added |
| Real external API smoke | skipped | Explicitly forbidden; project remains local-only and mock-safe |
| Paid API smoke | skipped | Explicitly forbidden and not required for the local demo path |
| Staging, commit, and push | skipped | Explicitly forbidden; staged/committed/pushed: no/no/no |

### Remaining risks

- Browser smoke covered the in-app Chromium browser only; Firefox, Safari, Edge, and additional breakpoints were not manually checked in this pass.
- The existing FastAPI/Starlette `httpx` testclient deprecation warning still appears during backend tests but does not fail the gate.
- TypeScript and Next.js validation may rewrite ignored local `.next` or build-info artifacts without producing tracked source changes.
- Ignored smoke logs were written under `logs/`; they are not source changes.

### Suggested commit message

```text
Harden admin source filtering
```

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
| `uv python list 3.12 --only-installed --no-python-downloads` | pass | Found local `cpython-3.12.13-windows-x86_64-none` in the user uv Python cache; absolute local path omitted |
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
- Smoke screenshot was saved outside the repository in the local temp directory; absolute local path omitted.

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

# Final Pre-Release Portfolio Audit - 2026-06-08

## 1. Objective

- Perform a final reviewer-readiness audit without changing backend behavior, dependencies, migrations, lockfiles, or GitHub Actions.
- Verify README accuracy, mock/no-paid-API boundaries, frontend visible copy, local frontend gates, portfolio safety posture, and rendered admin/demo behavior.
- Keep the diff small and preserve a clean unstaged/uncommitted workflow for the user.

## 2. Findings And Changes

| Area | Result |
|---|---|
| README | Reviewed as accurate for a polished local portfolio/demo project; no README edit was needed |
| Frontend visible copy | No visible Cyrillic, debug, internal, Codex, phase, TODO, or FIXME copy found in rendered main/admin pages |
| Frontend source scan | `rg -n "\p{Cyrillic}" apps\web` found only a test assertion guarding against Cyrillic text; internal/debug scan found local backend URLs in proxy/tests and a non-rendered sessionStorage key |
| Safety scope | No backend code, frontend code, dependencies, lockfiles, migrations, `.env`, or GitHub Actions were changed |
| Documentation | Updated this `STATE.md` entry to record the new audit and validation evidence |

## 3. Automated Validation

| Command | Result |
|---|---|
| `git status --short --branch` | pass before changes: `## main`; pass after temporary artifact cleanup: `## main` |
| `git diff --check` | pass before documentation update; no output |
| `pnpm --dir apps/web run lint` | pass; `$ eslint .`; exit 0 |
| `pnpm --dir apps/web exec vitest run` | pass; Vitest `v3.2.4`; 4 test files passed; 43 tests passed; duration `14.18s` |
| `pnpm --dir apps/web run typecheck` | pass; `$ tsc --noEmit`; exit 0 |
| `pnpm --dir apps/web run build` | pass; Next.js `15.5.18`; compiled successfully in `3.0s`; generated 8 routes including `/` and `/admin/runs` |
| `docker compose up -d postgres` | pass; `Container salesops-postgres Running` |
| `uv run alembic upgrade head` | pass; PostgreSQL Alembic context initialized and at head |
| `uv run python -m backend.app.leads.demo_seed` | pass; seeded `run_demo_success`, `run_demo_failed`, `run_demo_retried`, and `run_demo_queued` |
| `pnpm --dir apps/web exec playwright --version` | expected unavailable; command failed because `playwright` is not installed; no dependency was added |

## 4. Manual Browser QA

Temporary local-only QA setup:

- Backend: `uv run uvicorn backend.app.main:app --host 127.0.0.1 --port 8856`
- Frontend: `pnpm --dir apps/web exec next dev --hostname 127.0.0.1 --port 5567`
- Frontend env: `BACKEND_API_BASE_URL=http://127.0.0.1:8856` and `NEXT_PUBLIC_BACKEND_API_BASE_URL=http://127.0.0.1:8856`
- Browser path: Browser plugin was not available; project Playwright was not installed; used installed Chrome `148.0.7778.217` through local DevTools Protocol with the existing Python `websockets` package and no dependency install

Rendered checks:

| Check | Result |
|---|---|
| Main page loads | pass; `http://127.0.0.1:5567/` rendered `Lead intake form` and `CSV import`; page title `SalesOps Workflow Automation Hub` |
| Admin run history loads | pass; `http://127.0.0.1:5567/admin/runs` rendered success, failed, retried, and queued seeded runs |
| Details opens by mouse | pass; `View details` for `run_demo_failed` updated URL to `?runId=run_demo_failed` and showed the read-only run detail panel with failure text |
| Details opens by keyboard | pass; focused `View details for run_demo_retried`, sent browser-level Enter/Space key events, URL updated to `?runId=run_demo_retried`, and the run detail panel rendered |
| Admin timestamps | pass; rendered English sample `Jun 8, 2026, 1:52 PM` |
| Persisted runs horizontal scrollbar | pass; desktop table `clientWidth=1182`, `scrollWidth=1345`; top rail `clientWidth=1180`, `scrollWidth=1340` |
| Mouse-drag horizontal scrolling | pass; drag moved table scroll from `0` to `160`, and top rail synced to `160` |
| Mobile overflow | pass at `390x844`; page `scrollWidth=390`, body `scrollWidth=390`, table scrolled internally with `clientWidth=324`, `scrollWidth=1345` |
| Browser console | pass; page console warning/error list was empty |
| Visible Russian/internal/debug copy | pass; rendered main/admin/mobile scans found no Cyrillic or debug/internal/Codex/phase/TODO/FIXME copy |

Temporary backend, frontend, and Chrome QA processes were stopped after verification. Temporary `.scratch` QA scripts, logs, screenshots, and Chrome profiles created by this audit were removed.

## 5. Portfolio Safety Checks

| Check | Result |
|---|---|
| `.env` tracking | pass; `git check-ignore -v .env` returned `.gitignore:2:.env .env`; contents were not printed |
| Tracked env/lock/migration/GitHub Actions paths | pass; `git ls-files -- .env .env.example pnpm-lock.yaml uv.lock alembic .github .github\workflows` listed `.env.example`, Alembic files, `pnpm-lock.yaml`, and `uv.lock`; `.env` and GitHub Actions were not tracked |
| GitHub Actions directory | pass; `Test-Path -LiteralPath .\.github\workflows` returned `False` |
| Staged files | pass; `git diff --cached --name-only` returned no output |
| Tracked live endpoint/secret pattern scan | pass; `git grep -n -I -E "api\.hubapi\.com|hooks\.slack\.com|slack\.com/api|api\.openai\.com|api\.anthropic\.com|generativelanguage\.googleapis\.com|sheets\.googleapis\.com|xox[baprs]-|sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|ya29\.[0-9A-Za-z_-]+|SG\.[0-9A-Za-z_-]{20,}|-----BEGIN (RSA|OPENSSH|DSA|EC|PGP|PRIVATE) KEY-----|service_role" -- . ":(exclude)STATE.md"` returned no matches; exit 1 means no matches |

No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call was made.

## 6. Skipped Or Limited Checks

| Check | Status | Reason |
|---|---|---|
| Backend pytest/Ruff/mypy | skipped | This audit made no backend behavior or source-code changes; user-requested gates for this phase were frontend gates plus local migration/seed/browser smoke |
| Playwright browser automation | skipped/fallback used | Browser plugin was absent and project Playwright was not installed; dependency installation was intentionally avoided |
| GitHub Actions / CI | skipped | Explicitly out of scope; no workflow files exist or were added |
| Real external API smoke | skipped | Explicitly forbidden and not required for the local mock-safe reviewer path |
| Commit, push, or staging | skipped | Explicitly forbidden; no `git add`, `git commit`, or `git push` was run |

## 7. Remaining Risks

- Browser QA covered installed Chrome headless through CDP at desktop and mobile viewports; other browsers were not manually checked.
- Manual QA used deterministic local seeded data only; real-provider credential handoff remains documentation-only in `HANDOFF.md`.
- The current admin detail surface is a same-page read-only detail panel, not a modal dialog; the requested detail-opening behavior was still verified by mouse and keyboard.

## 8. Suggested Commit Message

```text
Record final portfolio release audit
```

# Final Portfolio Recording Readiness Docs Checkpoint - 2026-06-17

## 1. Objective

- Prepare the repository docs for final portfolio recording readiness.
- Prefer documentation-only changes and leave backend/frontend product behavior untouched.
- Confirm the existing recording checklist covers local startup, required browser routes, visual checks, synthetic-data safety, and intentionally skipped real-provider/API work.

## 2. Documentation Reviewed

| Path | Result |
|---|---|
| `README.md` | Quick Start, route list, validation commands, safety boundaries, and demo-doc links matched current repo scripts and local-only posture |
| `RUNBOOK.md` | Existing section `10.2 Final Local Portfolio Recording Checklist` already covered startup commands, `/`, `/admin/runs`, `/docs`, synthetic data, and skipped paid/provider/API work; updated to call out horizontal scroll/drag verification explicitly |
| `docs/DEMO_SCRIPT.md` | Existing concise reviewer checklist covered local startup, public intake, CSV import, admin run history, filters, details, docs redirect, and mock-only safety |
| `docs/DEMO_ASSETS.md` | Existing capture checklist covered screenshot/video targets, local-only URLs, synthetic data, and no real providers or credentials |

No README command update was needed. No product code, dependencies, lockfiles, migrations, generated assets, GitHub Actions, secrets, or `.env` files were changed.

## 3. Recorded Final Local Validation Checkpoint

The prior final local checkpoint reported the repository clean and validation-ready before this documentation pass:

| Gate | Result |
|---|---|
| `git status --short` | clean |
| `uv sync --frozen` | pass |
| `uv run --no-python-downloads --python 3.12 --frozen pytest` | pass; `69 passed` |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass |
| `uv run --no-python-downloads --python 3.12 --frozen ruff format --check .` | pass |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass |
| `pnpm install --frozen-lockfile` | pass |
| `pnpm --dir apps/web lint` | pass |
| `pnpm --dir apps/web test -- --run` | pass; `56 tests` |
| `pnpm --dir apps/web build` | pass |
| `pnpm --dir apps/web typecheck` | pass after sequential rerun |
| Local route QA | pass on backend `127.0.0.1:8028` and frontend `127.0.0.1:3042` |

Browser automation was unavailable in that checkpoint because the Windows sandbox process launch failed with `CreateProcessAsUserW failed: 5`; no files were changed during that validation checkpoint.

## 4. Safety Notes

- Use synthetic demo data only for final recording and screenshots.
- Real HubSpot, Slack, Google Sheets, OpenAI, paid APIs, production APIs, production webhooks, provider dashboards, and real credentials remain intentionally skipped.
- Codex must not stage, commit, push, reset, rebase, stash, or discard changes; the user reviews, stages, commits, and pushes manually.

## 5. Suggested Commit Message

```text
Document final portfolio recording checklist
```

# Final Portfolio Handoff Documentation Pass - 2026-06-17

## 1. Objective

- Perform a final reviewer/client handoff documentation pass for the local SalesOps Workflow Automation Hub portfolio project.
- Keep the phase documentation-only unless a blocking documentation/runtime mismatch is found.
- Confirm that reviewer-facing docs explain the local-first mock workflow, stack, setup, validation, browser QA expectations, skipped real-provider work, and CI/deployment boundary.

## 2. Documentation Reviewed

| Path | Result |
|---|---|
| `README.md` | Clearly explains the project purpose, mock/local SalesOps workflow, backend/frontend stack, quick start, local backend/frontend commands, validation commands, screenshots, intentionally mocked integrations, and no-real-provider boundary |
| `RUNBOOK.md` | Clearly documents PowerShell setup, backend/frontend commands, tests/lint/typecheck/build, manual browser QA, local PostgreSQL demo flow, troubleshooting, skipped provider/API work, and CI/deployment out-of-scope posture |
| `HANDOFF.md` | Provides the short reviewer handoff, 3-5 minute demo path, mock boundaries, local run sequence, credential handling rules, and future live-provider approval boundary |
| `docs/DEMO_SCRIPT.md` | Provides the concise reviewer checklist for local public intake, CSV import, admin run history, filters, failure detail, `/docs`, and mock-only safety |
| `docs/DEMO_ASSETS.md` | Documents local-only screenshot/GIF/video capture targets, viewport guidance, synthetic-data rules, and forbidden secrets/provider-dashboard capture |
| `docs/CASE_STUDY.md` | Explains the business problem, solution, workflow, stack, validation posture, mock boundary, and client adaptation path |
| `docs/assets/README.md` and `docs/assets/demo/README.md` | Document current committed screenshot evidence and the optional future recording location |
| `STATE.md` | Latest entries already record final recording readiness, local validation history, safety posture, and Git-safety constraints |

## 3. Changes

- Added this state entry so the final handoff pass records its reviewed docs and browser-QA skip reason.
- No product code, dependencies, lockfiles, migrations, generated assets, GitHub Actions, secrets, or `.env` files were changed.
- No README, RUNBOOK, handoff, demo, or case-study content change was needed because the existing docs already covered the required reviewer/client handoff information.

## 4. Manual Browser QA

| Check | Status | Reason |
|---|---|---|
| Manual browser QA | skipped | The user explicitly instructed Codex not to perform browser QA unless asked. The manual procedure remains documented in `RUNBOOK.md` section `9. Manual Frontend Verification`, `RUNBOOK.md` section `10.2 Final Local Portfolio Recording Checklist`, and `docs/DEMO_SCRIPT.md`. |

## 5. Safety Notes

- This phase keeps the project in mock/local/demo mode.
- Real HubSpot, Slack, Google Sheets, OpenAI, paid APIs, production APIs, provider dashboards, live webhooks, and external provider checks remain intentionally skipped unless the user explicitly approves exact real usage in a later phase.
- GitHub Actions, CI, deployment config, hosted automation, commits, pushes, staging, reset, rebase, stash, discard, and history rewriting remain out of scope for Codex.

## 6. Suggested Commit Message

```text
Record final handoff documentation pass
```

# Portfolio Listing Package - 2026-06-17

## 1. Phase Name

Portfolio Listing Package.

## 2. Files Changed

- `docs/PORTFOLIO_LISTING.md`: added a concise client-facing portfolio listing package with title, summary, problem, solution, feature bullets, stack, mock/local boundaries, demo proof points, platform descriptions, and real-client adaptation notes.
- `STATE.md`: added this phase entry.

## 3. Validation Commands Run

| Command | Result |
|---|---|
| `git status --branch --short` | pass; working tree showed only `STATE.md` modified and `docs/PORTFOLIO_LISTING.md` untracked before final status |
| `git diff --check` | pass; no whitespace errors; Git warned that `STATE.md` LF will be replaced by CRLF on next Git touch |
| `uv sync --frozen` | pass; checked 42 packages |
| `uv run --no-python-downloads --python 3.12 --frozen ruff check .` | pass |
| `uv run --no-python-downloads --python 3.12 --frozen ruff format --check .` | pass; 32 files already formatted |
| `uv run --no-python-downloads --python 3.12 --frozen mypy backend tests` | pass; no issues in 29 source files |
| safe no-`.env` backend pytest equivalent | pass; ran from temp working directory with explicit local mock/test environment and `uv --project <repo> run --no-python-downloads --python 3.12 --frozen pytest <repo>\tests`; 69 passed, 1 known FastAPI/Starlette TestClient deprecation warning |
| `pnpm install --frozen-lockfile` | pass; already up to date |
| `pnpm --dir apps/web lint` | pass |
| `pnpm --dir apps/web test -- --run` | pass; 5 files and 56 tests passed |
| `pnpm --dir apps/web typecheck` | pass |
| `pnpm --dir apps/web build` | pass; Next.js 15.5.18 production build completed |
| `Test-Path -LiteralPath ".github\workflows"` | pass; returned `False` |
| `git ls-files -- .env .env.example .github .github\workflows` | pass; only `.env.example` is tracked |
| requested tracked secret-pattern `git grep` scan | completed; matches were placeholder/mock config references in `.env.example` and historical `STATE.md`, not live tokens or private keys |

## 4. Skipped Checks And Reasons

- Manual browser QA: skipped for this documentation-only portfolio listing package because no product code, UI behavior, routes, or runtime configuration changed.
- Real provider/API checks: skipped because this project remains mock-only and local-first, and real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, and webhook calls are intentionally forbidden for this phase.

## 5. Current Known Limitations

- The project is not deployed and is not production SaaS.
- Real CRM, Slack, Google Sheets, OpenAI, paid-provider, webhook, auth, billing, multi-tenant, and production-hardening work remains intentionally out of scope unless approved in a future phase.
- The new portfolio listing is documentation-only and relies on the existing local demo, screenshots, case study, and reviewer scripts for proof.

## 6. Suggested Commit Message

```text
Add portfolio listing package
```

# Portfolio Publishing Readiness Pass - 2026-06-17

## 1. Phase Summary

- Created a concise freelance/profile publishing snippet package for SalesOps Workflow Automation Hub.
- Kept the package explicitly local-first, mock-only, synthetic-data based, and clear that it is not a real deployed client system.
- Added the missing README documentation-map link to the existing portfolio listing package.
- No product code, dependencies, lockfiles, migrations, generated assets, GitHub Actions, secrets, `.env` files, provider integrations, commits, staging, or pushes were changed.

## 2. Files Changed

- `docs/FREELANCE_PLATFORM_SNIPPETS.md`: new Upwork-style description, shorter Fiverr/Contra-style version, proof points, demo-showing boundaries, non-claim boundaries, and suggested tags/keywords.
- `README.md`: added one minimal link to `docs/PORTFOLIO_LISTING.md` in the documentation map.
- `STATE.md`: added this phase record.

## 3. Gates Run

| Command | Result |
|---|---|
| `git status --branch --short` | pass before edits; branch `main...origin/main` with no working-tree changes |
| `rg --files` | pass; repository inventory inspected before edits |
| `rg --files -g AGENTS.md` | pass; only top-level `AGENTS.md` found |
| required docs inspection | pass; inspected `README.md`, `RUNBOOK.md`, `HANDOFF.md`, latest `STATE.md`, `docs/PORTFOLIO_LISTING.md`, `docs/CASE_STUDY.md`, `docs/DEMO_SCRIPT.md`, `docs/DEMO_ASSETS.md`, and `.env.example` |
| `git status --branch --short` | pass after edits; only `README.md`, `STATE.md`, and untracked `docs/FREELANCE_PLATFORM_SNIPPETS.md` were present |
| `git diff --check` | pass; no whitespace errors; Git warned that `README.md` and `STATE.md` LF will be replaced by CRLF on next Git touch |
| forbidden overclaim `Select-String` scan | pass/limited; matches in changed/portfolio docs were explicit safety boundaries, mock-only exclusions, or "does not claim" language, not claims of deployed, production, real-provider, paid-API, CI, OAuth, or customer-data capability |
| secret-pattern `Select-String` scan | pass; broad docs scan excluding historical `STATE.md` self-references returned no matches and included the new freelance snippets doc |
| `git diff --cached --name-only` | pass; no staged files |

## 4. Skipped Gates With Reasons

- Full backend tests/lint/typecheck were skipped because this phase changed documentation only and did not touch backend source, migrations, runtime configuration, schemas, or dependencies.
- Full frontend lint/tests/typecheck/build were skipped because this phase changed documentation only and did not touch frontend source, routes, UI behavior, package files, or lockfiles.
- Docker/PostgreSQL smoke checks were skipped because no persistence, migration, seed, runtime, or product behavior changed.
- Real provider/API checks were skipped because this repository remains mock-only and local-first, and real CRM, Slack, HubSpot, Salesforce, Google Sheets, OpenAI, Anthropic, Gemini, paid API, production API, webhook, OAuth, and customer-data checks are intentionally out of scope.
- Manual browser QA was skipped because no rendered product behavior, screenshots, or runtime flows changed.

## 5. Remaining Manual Checks

- Review `docs/FREELANCE_PLATFORM_SNIPPETS.md` for preferred personal tone before posting on Upwork, Fiverr, Contra, LinkedIn, or a portfolio site.
- Optionally review the README documentation map placement for preference; the change is intentionally one link only.
- Optionally run the full local quality gate before a manual commit if the user wants a fresh all-green repository checkpoint.

## 6. Suggested Commit Message

```text
Add freelance platform publishing snippets
```

# Portfolio Publishing Package Finalization - 2026-06-17

## 1. Phase Summary

- Performed a final local-only publishing readiness pass for the public SalesOps Workflow Automation Hub portfolio materials.
- Kept the review documentation-only and local-first; no runtime code, package file, lockfile, migration, `.env`, deployment config, CI file, generated asset, provider integration, commit, staging action, or push was changed.
- Confirmed the public copy remains conservative: local-first, mock-only, synthetic-data based, not deployed, not production SaaS, no real CRM/Slack/Google Sheets/OpenAI/provider API calls, no paid API usage, no OAuth/live-provider behavior, and no GitHub Actions/CI claim.

## 2. Files Inspected

- `README.md`
- `RUNBOOK.md`
- `HANDOFF.md`
- `docs/PORTFOLIO_LISTING.md`
- `docs/CASE_STUDY.md`
- `docs/DEMO_SCRIPT.md`
- `docs/DEMO_ASSETS.md`
- `docs/FREELANCE_PLATFORM_SNIPPETS.md`
- `.env.example`
- `STATE.md` latest entries
- `docs/assets/README.md`
- `docs/assets/demo/README.md`
- `AGENTS.md` scope discovery

## 3. Files Changed

- `STATE.md`: added this phase record only.

## 4. Checks Run

| Command or check | Result |
|---|---|
| `git status --branch --short` | pass before edits; `## main...origin/main` and clean worktree |
| `git diff --check` | pass before edits; no whitespace errors |
| `git diff --name-only` | pass before edits; no output |
| `git ls-files --others --exclude-standard` | pass before edits; no output |
| `rg --files` | pass; repository inventory inspected |
| `rg --files -g AGENTS.md` | pass; only top-level `AGENTS.md` found |
| Required public-materials read | pass; files listed above were inspected |
| Forbidden public-claim `Select-String` scan | pass/limited; matches were negative safety boundaries, explicit exclusions, or historical `STATE.md` entries, not claims of production deployment, real-provider integration, paid API use, OAuth, CI, or live-provider behavior |
| Secret-like `Select-String` scan | pass/limited; only `.env.example` placeholder token variables matched: `CRM_API_TOKEN=placeholder-not-a-real-secret` and `HUBSPOT_PRIVATE_APP_TOKEN=placeholder-not-a-real-secret` |
| Absolute local path `Select-String` scan | pass; no Windows or Unix user-home absolute paths found in scanned public docs |
| Relative Markdown link/image inventory | pass by practical review; README and docs relative links/images point to existing repository files or committed screenshot assets |
| `git status --branch --short` after `STATE.md` update | pass; `## main...origin/main` and ` M STATE.md` only |
| `git diff --check` after `STATE.md` update | pass; no whitespace errors; Git warned that `STATE.md` LF will be replaced by CRLF the next time Git touches it |
| `git diff --name-only` after `STATE.md` update | pass; `STATE.md` only; same LF-to-CRLF warning |
| `git ls-files --others --exclude-standard` after `STATE.md` update | pass; no output |
| `Test-Path -LiteralPath '.github\workflows'` | pass; `False` |

## 5. Skipped Checks With Reasons

- Backend pytest/Ruff/mypy were skipped because no backend source, schema, migration, dependency, package, or runtime configuration file changed.
- Frontend lint/tests/typecheck/build were skipped because no frontend source, route, component, package, lockfile, or runtime behavior changed.
- Docker/PostgreSQL/browser QA was skipped because no runtime behavior, screenshots, local database path, or UI behavior changed in this phase.
- Real CRM, Slack, HubSpot, Salesforce, Google Sheets, OpenAI, paid API, production API, OAuth, webhook, deployment, and live-provider checks were skipped because they are explicitly forbidden for this local mock-only portfolio phase.
- GitHub Actions/CI, deployment, staging, commit, push, reset, rebase, stash, and cleanup actions were skipped because they are out of scope or explicitly forbidden.

## 6. Remaining Manual Publishing Steps

- Review `docs/PORTFOLIO_LISTING.md` and `docs/FREELANCE_PLATFORM_SNIPPETS.md` for platform-specific tone before manually posting.
- Use the committed screenshots in `docs/assets/screenshots/` unless the user intentionally refreshes them through the local-only capture workflow in `docs/DEMO_ASSETS.md`.
- If refreshing screenshots or recording video, run the local PostgreSQL/backend/frontend demo path from `RUNBOOK.md`, use synthetic data only, and avoid `.env`, provider dashboards, private tabs, secrets, or unrelated local files.
- The user should manually stage, commit, and push only after reviewing the final diff and any optional full local gate they choose to run.

## 7. Final Git Status

`git status --branch --short` after this phase showed:

```text
## main...origin/main
 M STATE.md
```

## 8. Suggested Commit Message

```text
Record portfolio publishing package finalization
```

# Manual Portfolio Posting QA + Copy Tightening - 2026-06-17

## 1. Phase Summary

- Performed a strict final review of public-facing portfolio posting materials for conservative, client-safe publication.
- Kept the project positioned as local-first, mock-only, synthetic-data based, not deployed, not production-ready, no CI/GitHub Actions, no OAuth, no paid APIs, and no live CRM/Slack/OpenAI/Google Sheets/provider behavior.
- Tightened `docs/PORTFOLIO_LISTING.md` to explicitly state that OAuth flows are absent and that the project is not a production authentication/OAuth system.
- No code, package files, lockfiles, migrations, screenshots/assets, `.env`, deployment config, GitHub Actions, commits, staging, pushes, reset, rebase, or stash actions were changed or performed.

## 2. Files Inspected

- `README.md`
- `RUNBOOK.md`
- `HANDOFF.md`
- `.env.example`
- `docs/PORTFOLIO_LISTING.md`
- `docs/FREELANCE_PLATFORM_SNIPPETS.md`
- `docs/DEMO_SCRIPT.md`
- `docs/DEMO_ASSETS.md`
- `docs/CASE_STUDY.md`
- `docs/assets/README.md`
- `docs/assets/demo/README.md`
- `STATE.md` latest entries
- `AGENTS.md`

## 3. Files Changed

- `docs/PORTFOLIO_LISTING.md`: added explicit OAuth absence to the local/mock boundary and clarified that the project is not a production authentication/OAuth system.
- `STATE.md`: added this phase record.

## 4. Gates Run

| Command or check | Result |
|---|---|
| `git status --branch --short` | pass before edits; `## main...origin/main` and clean worktree |
| `git diff --name-only` | pass before edits; no output |
| `git ls-files --others --exclude-standard` | pass before edits; no output |
| `rg --files` | pass; repository inventory inspected |
| `rg --files -g AGENTS.md` | pass; only top-level `AGENTS.md` found |
| `Test-Path -LiteralPath ".github\workflows"` | pass; returned `False` |
| Required public-material reads | pass; files listed above were inspected |
| `Select-String` forbidden-claim scan over public docs | pass/limited; matches were negative safety boundaries, explicit exclusions, future approval-gated language, or broad `CI` false positives inside ordinary words, not claims of deployment, production readiness, live providers, paid API usage, OAuth capability, or customer-data processing |
| `Select-String` secret-like scan over public docs and `.env.example` | pass/limited; matches were safety wording, the documented non-production local database URL, and explicit placeholders such as `CRM_API_TOKEN=placeholder-not-a-real-secret`, `HUBSPOT_PRIVATE_APP_TOKEN=placeholder-not-a-real-secret`, and `SLACK_WEBHOOK_URL=https://example.invalid/not-a-real-webhook` |
| Refined token-shaped `Select-String` secret scan | pass; no output for token/key shapes such as OpenAI, Slack, GitHub, AWS, Google, SendGrid, or private-key patterns |
| `Select-String` absolute local path scan | pass; no Windows or Unix user-home absolute paths found in scanned public docs, `.env.example`, or `STATE.md` |
| Markdown link/image inventory for changed docs | pass; `docs/PORTFOLIO_LISTING.md` has four relative links and no images; `docs/FREELANCE_PLATFORM_SNIPPETS.md` has no Markdown links/images |
| Link target `Test-Path` checks | pass; `docs/CASE_STUDY.md`, `docs/DEMO_SCRIPT.md`, `docs/DEMO_ASSETS.md`, and `README.md` all returned `True` |
| `git diff -- docs\PORTFOLIO_LISTING.md` | pass; diff limited to two OAuth/authentication boundary wording lines |
| Final `git status --branch --short` | pass; `STATE.md` and `docs/PORTFOLIO_LISTING.md` modified only |
| Final `git diff --check` | pass; no whitespace errors; Git warned that `STATE.md` and `docs/PORTFOLIO_LISTING.md` LF will be replaced by CRLF the next time Git touches them |
| Final `git diff --name-only` | pass; `STATE.md` and `docs/PORTFOLIO_LISTING.md` only |
| Final `git ls-files --others --exclude-standard` | pass; no output |

## 5. Skipped Checks With Reasons

- Backend pytest/Ruff/mypy were skipped because no backend source, schema, migration, dependency, package, or runtime configuration file changed.
- Frontend lint/tests/typecheck/build were skipped because no frontend source, route, component, package, lockfile, or runtime behavior changed.
- Docker/PostgreSQL/browser QA was skipped because no runtime behavior, screenshots, local database path, UI behavior, or screenshot assets changed.
- Real CRM, Slack, HubSpot, Salesforce, Google Sheets, OpenAI, paid API, production API, OAuth, webhook, deployment, live-provider, and provider-dashboard checks were skipped because they are explicitly forbidden for this local mock-only portfolio phase.
- GitHub Actions/CI, deployment, staging, commit, push, reset, rebase, stash, and cleanup actions were skipped because they are out of scope or explicitly forbidden.

## 6. Remaining Risks

- This was a documentation QA pass, not a fresh runtime smoke test; runtime confidence relies on prior recorded validation until the user chooses to rerun the full local gate.
- Broad `Select-String` scans intentionally match safety-boundary wording and placeholders, so scan review depends on classifying those matches rather than expecting zero output.
- Platform-specific posting tone may still need manual adjustment for the user's preferred profile voice, but the current claims are conservative and bounded.

## 7. Final Git Status Summary

Final `git status --branch --short` after this phase showed:

```text
## main...origin/main
 M STATE.md
 M docs/PORTFOLIO_LISTING.md
```

No files are staged.

## 8. Suggested Commit Message

```text
Tighten portfolio posting copy
```
