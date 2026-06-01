# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 3 - frontend demo scaffold |
| Overall status | on-track |
| Quality gate status | Phase 3 validation passed after frontend lint dependency repair |
| Completion | Phase 3 repaired and ready for user review |
| Main blocker | none |

## 1. Current Objective

- Build frontend demo scaffolding for the deterministic backend `POST /leads/intake` endpoint.
- Keep backend behavior unchanged.
- Add local Next.js demo form, local CSV import UI, and a session-only dashboard.
- Keep behavior local and deterministic.
- Do not add real CRM, Slack, email, auth, database persistence, Docker, GitHub Actions, deployment config, paid API usage, staging, commits, pushes, or deployments.

## 2. Status Snapshot

- `apps/web` is a Next.js App Router frontend managed with `pnpm`.
- The frontend uses TypeScript, Tailwind CSS, TanStack Table, local shadcn-style UI primitives, Vitest, Testing Library, and jsdom.
- `POST /api/leads/intake` proxies to `BACKEND_API_BASE_URL` or `NEXT_PUBLIC_BACKEND_API_BASE_URL`, defaulting to `http://127.0.0.1:8000`.
- The lead form matches the implemented backend schema: `email`, `first_name`, `last_name`, `company_name`, `company_domain`, `source`, optional `job_title`, `phone`, `message`, and `lead_score`.
- CSV rows are parsed locally in the browser/app and submitted through the same local proxy. Invalid rows show row-level errors before submission.
- The dashboard stores current browser-session results in `sessionStorage`.
- Same-session duplicate hints compare email and company domain in the frontend. Backend `dedupe.status` remains displayed separately.
- Backend files under `backend/` were not changed in Phase 3.
- Phase 3 validation repair on 2026-06-01 added an explicit `eslint-plugin-react-hooks` frontend dev dependency and excluded generated `next-env.d.ts` from ESLint; frontend lint, tests, typecheck, and build now pass again.
- Manual review found Phase 3 repair incomplete: pnpm --dir apps/web lint failed because ESLint could not resolve @next/eslint-plugin-next from apps/web. Added @next/eslint-plugin-next as an explicit apps/web devDependency matching eslint-config-next/Next version. Reran install, lint, test, typecheck, build, diff check, staged-file check, and GitHub Actions absence check. No files staged, committed, pushed, deployed, or connected to external services.

## 3. Phase 3 Done State

Phase 3 frontend demo scaffold is done when:

- User can submit a synthetic lead through the UI to the local deterministic backend.
- User can import local CSV rows through the UI without external upload/service calls.
- User can inspect current-session success, validation, duplicate hint, CRM, Slack, and error results in a dashboard.
- Frontend tests, lint, typecheck, build, install, git whitespace check, and forbidden-pattern checks pass or have documented skip reasons.
- Source-of-truth docs describe Phase 3 behavior, commands, limitations, and next phase.

## 4. Changed Files For Phase 3

| Path | Purpose | Status |
|---|---|---|
| `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml` | Root `pnpm` workspace, frontend scripts, dependency lockfile, narrow build-script allowlist | created |
| `.env.example` | Added local frontend proxy placeholder URLs | updated |
| `apps/web/` | Next.js App Router app, local proxy route, UI, utilities, config, and tests | created |
| `README.md`, `RUNBOOK.md`, `DESIGN.md`, `EXEC_PLAN.md`, `TDD.md`, `CONTEXT.md`, `REQ.md`, `STATE.md` | Phase 3 docs, commands, status, and validation notes | updated |

## 5. Validation

| Gate | Command | Status | Notes |
|---|---|---|---|
| Worktree status | `git status --short --branch` | pass | Initial Phase 3 check showed clean `main`; final status must show unstaged Phase 3 files only. |
| Frontend install | `pnpm install`; `pnpm install --frozen-lockfile` | pass | Phase 3 repair required normal `pnpm install` to update `pnpm-lock.yaml` after adding `eslint-plugin-react-hooks`; frozen install then confirmed the lockfile is consistent. |
| Frontend lint | `pnpm --dir apps/web lint` | pass | ESLint completed with exit 0 after direct React Hooks plugin declaration and generated `next-env.d.ts` ignore. |
| Frontend tests | `pnpm --dir apps/web test -- --run` | pass | 3 files, 9 tests passed. |
| Frontend typecheck | `pnpm --dir apps/web typecheck` | pass | `tsc --noEmit` completed with exit 0. |
| Frontend build | `pnpm --dir apps/web build` | pass | Next.js 15.5.18 production build completed successfully. |
| Browser smoke | In-app browser against `http://localhost:3000` with backend on `http://127.0.0.1:8000` | pass | Submitted a lead, verified same-session duplicate hint, imported one CSV row, and saw dashboard updates. |
| Backend gates | `uv sync --frozen`; `uv run pytest`; `uv run ruff check .`; `uv run mypy backend tests` | skipped | Backend implementation files were not touched in Phase 3. |
| Docker/PostgreSQL validation | n/a | skipped | Explicitly out of Phase 3 scope; no compose file, database models, migrations, or persistence implementation exists yet. |
| External integration smoke | n/a | skipped | Real CRM, Slack, Google Sheets, OpenAI, Anthropic, and other external calls are forbidden without explicit approval. |
| GitHub Actions validation | `Test-Path -LiteralPath ".github\workflows"` | pass | Returned `False`; no workflow directory exists. |
| Git whitespace check | `git diff --check` | pass | Exit 0. Git reported Windows LF-to-CRLF normalization warnings only; no whitespace errors. |
| Likely secret/token scan | PowerShell scan excluding `.git`, `.venv`, `node_modules`, `.next`, and local caches | pass | No matches. |
| Real integration endpoint scan | PowerShell scan for Slack/HubSpot/OpenAI/Google Sheets endpoints excluding generated/cache directories | pass | No matches. |
| Trailing whitespace scan | PowerShell scan excluding `.git`, `.venv`, `node_modules`, `.next`, and local caches | pass | No matches. |

## 6. Manual Verification

Start the backend:

```powershell
uv run uvicorn backend.app.main:app --reload
```

Start the frontend:

```powershell
pnpm --dir apps/web dev
```

Submit a lead:

1. Open `http://localhost:3000`.
2. Fill required form fields with synthetic data.
3. Select `Submit lead`.
4. Confirm the latest result and dashboard show the backend response.

Test duplicate handling:

1. Submit the same email or company domain again during the same browser session.
2. Confirm the UI shows a same-session duplicate hint.
3. Confirm backend `dedupe.status` is shown separately.

Test CSV import:

1. Paste a CSV with required headers into the CSV input.
2. Select `Import rows`.
3. Confirm valid rows submit locally and invalid rows show row-level errors.

## 7. Known Limitations

- The dashboard is session-only and stored in browser `sessionStorage`.
- Backend duplicate results remain deterministic per request because Phase 2 did not add persistence or process-level lead storage for normal API calls.
- Manual retry is not a UI action yet because there is no persisted failed-run API endpoint.
- Owner assignment, date persistence, error type filtering, failure detail pages, backup/audit records, seed data, Docker/PostgreSQL, and portfolio polish remain future work.
- Next.js may print anonymous telemetry information during `next build`; no deployment or real integration call is made.

## 8. Open Questions For Later Phases

| ID | Question | Needed by | Current default / assumption |
|---|---|---|---|
| Q-001 | Real HubSpot vs mock CRM? | Before live CRM integration | Mock CRM |
| Q-002 | Real Slack webhook vs mock/log notifier? | Before live Slack integration | Mock/log notifier |
| Q-003 | What is the owner assignment rule for 5 sales reps? | Before lead routing/admin filters | TBD; start with deterministic rule |
| Q-004 | Should `lead_score >= 70` remain the qualification rule? | Before UI/demo polish | Current backend default |
| Q-005 | How should dedupe handle shared domains, aliases, and updated emails? | Before persistence/admin workflow | Email first, company domain second |
| Q-006 | Should manual retry be added before or after persistence? | Before retry UI | After persistence/failure record API |

## 9. Next Actions

1. User reviews the Phase 3 diff and manually stages/commits/pushes if acceptable.
2. Recommended next phase: Phase 4 persistence and portfolio polish with PostgreSQL/Docker only after approval.

## 10. Suggested Commit Message

```text
Add Phase 3 frontend demo scaffold
```
