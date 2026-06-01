# EXEC_PLAN.md

## 1. Purpose

Deliver a local-first portfolio demo for sales operations workflow automation. The project will be built in phases, starting with source-of-truth documentation and ending with a polished demo package.

## 2. Current Phase

Phase 1 is active. It introduces the minimal local FastAPI backend foundation and must not add live integrations, GitHub Actions, commits, pushes, or real secrets.

## 3. Phase Plan

| Phase | Name | Deliverables | Acceptance criteria | Validation |
|---|---|---|---|---|
| Phase 0 | Docs/source-of-truth normalization | Project-specific docs, `.gitignore`, `.env.example` | Docs capture context, requirements, design, plan, runbook, TDD, safety rails; placeholders only | `git diff --check`; `git diff --stat`; `git status --short`; docs review |
| Phase 1 | Backend foundation | FastAPI app scaffold, Python project config, health endpoint, local-safe config, test setup | Backend starts locally; health endpoint responds; no database or external service is required at startup; no real integrations | `uv sync`; `uv run pytest`; `uv run ruff check .`; `uv run mypy backend tests`; backend smoke check |
| Phase 2 | Lead processing, dedupe, CRM/Slack mocks, retry logic | Intake validation, lead persistence, dedupe service, mock CRM adapter, mock Slack adapter, run/attempt logging, retry service | Valid leads process through mock workflow; invalid leads fail safely; retries preserve attempt history | Backend unit/integration tests; adapter contract tests; retry tests; lint; typecheck; API smoke |
| Phase 3 | Frontend demo form, CSV import UI, admin dashboard | Next.js app, lead form, CSV import UI, run dashboard, filters, failure details, retry action | User can submit/import leads, inspect run states, filter dashboard, and retry failures locally | `pnpm install`; `pnpm test`; `pnpm lint`; `pnpm typecheck`; `pnpm build`; browser smoke |
| Phase 4 | Portfolio polish | Seed data, architecture diagram, before/after workflow explanation, handoff doc, demo script/video plan | Project is understandable as a portfolio artifact without claiming live production integrations | Full local quality gate; seeded demo smoke; docs review; secret check |

## 4. Phase 1 Work Items

- Add `pyproject.toml` for `uv`-managed Python backend tooling.
- Add `backend.app.main:app` with a local `GET /health` endpoint.
- Add local-safe settings with environment defaults and no required external services.
- Add pytest coverage for health and configuration behavior.
- Run backend tests, Ruff, mypy, git whitespace checks, and forbidden-pattern checks.
- Update source-of-truth docs for the new backend commands and phase state.

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
| Docker/PostgreSQL validation | n/a | skipped until compose exists | required | required | required |
| Manual smoke | docs only | backend health | workflow API | UI workflow | seeded demo |

## 6. Recovery And Safety

- Phase 1 changes are limited to local backend foundation and docs and can be reviewed through `git diff`.
- Do not run destructive Git commands.
- Do not delete unrelated user files.
- Do not add real credentials.
- If a later phase introduces a bad scaffold, revert through normal reviewed Git changes, not history rewrites.

## 7. Recommended Next Phase

After Phase 1 is validated, proceed to Phase 2: lead intake validation, persistence planning, dedupe service, and mock CRM/Slack adapter boundaries.
