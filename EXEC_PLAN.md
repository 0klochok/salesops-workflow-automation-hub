# EXEC_PLAN.md

## 1. Purpose

Deliver a local-first portfolio demo for sales operations workflow automation. The project will be built in phases, starting with source-of-truth documentation and ending with a polished demo package.

## 2. Current Phase

Phase 0 is active. It is documentation-only and must not create application code, scaffold apps, install dependencies, commit, push, call real APIs, or create real secrets.

## 3. Phase Plan

| Phase | Name | Deliverables | Acceptance criteria | Validation |
|---|---|---|---|---|
| Phase 0 | Docs/source-of-truth normalization | Project-specific docs, `.gitignore`, `.env.example` | Docs capture context, requirements, design, plan, runbook, TDD, safety rails; placeholders only | `git diff --check`; `git diff --stat`; `git status --short`; docs review |
| Phase 1 | Backend foundation | FastAPI app scaffold, Python project config, health endpoint, database config, initial models/migrations, test setup | Backend starts locally; health endpoint responds; database config documented; no real integrations | `uv sync`; `uv run pytest`; `uv run ruff check .`; typecheck command chosen and run; backend smoke check |
| Phase 2 | Lead processing, dedupe, CRM/Slack mocks, retry logic | Intake validation, lead persistence, dedupe service, mock CRM adapter, mock Slack adapter, run/attempt logging, retry service | Valid leads process through mock workflow; invalid leads fail safely; retries preserve attempt history | Backend unit/integration tests; adapter contract tests; retry tests; lint; typecheck; API smoke |
| Phase 3 | Frontend demo form, CSV import UI, admin dashboard | Next.js app, lead form, CSV import UI, run dashboard, filters, failure details, retry action | User can submit/import leads, inspect run states, filter dashboard, and retry failures locally | `pnpm install`; `pnpm test`; `pnpm lint`; `pnpm typecheck`; `pnpm build`; browser smoke |
| Phase 4 | Portfolio polish | Seed data, architecture diagram, before/after workflow explanation, handoff doc, demo script/video plan | Project is understandable as a portfolio artifact without claiming live production integrations | Full local quality gate; seeded demo smoke; docs review; secret check |

## 4. Phase 0 Work Items

- Inspect repository state and existing docs.
- Patch `AGENTS.md` with project-specific safety rails.
- Normalize `CONTEXT.md`, `STATE.md`, `REQ.md`, `DESIGN.md`, `EXEC_PLAN.md`, `RUNBOOK.md`, `TDD.md`, and `README.md`.
- Add `.gitignore`.
- Add `.env.example` with placeholders only.
- Run required validation commands.

## 5. Quality Gate Expectations By Phase

| Gate | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|---|---|---|---|---|
| Docs review | required | required | required | required | required |
| `git diff --check` | required | required | required | required | required |
| Backend tests | n/a | required | required | required if backend touched | required |
| Backend lint | n/a | required | required | required if backend touched | required |
| Backend typecheck | n/a | choose and run | required | required if backend touched | required |
| Frontend tests | n/a | n/a | n/a | required | required |
| Frontend lint/typecheck/build | n/a | n/a | n/a | required | required |
| Docker/PostgreSQL validation | n/a | required once compose exists | required | required | required |
| Manual smoke | docs only | backend health | workflow API | UI workflow | seeded demo |

## 6. Recovery And Safety

- Phase 0 changes are documentation/config only and can be reviewed through `git diff`.
- Do not run destructive Git commands.
- Do not delete unrelated user files.
- Do not add real credentials.
- If a later phase introduces a bad scaffold, revert through normal reviewed Git changes, not history rewrites.

## 7. Recommended Next Phase

After Phase 0 is validated, proceed to Phase 1: backend foundation.
