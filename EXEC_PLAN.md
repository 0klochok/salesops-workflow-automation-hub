# EXEC_PLAN.md

## 1. Purpose

Deliver a local-first portfolio demo for sales operations workflow automation. The project will be built in phases, starting with source-of-truth documentation and ending with a polished demo package.

## 2. Current Phase

Phase 2 is active. It introduces the backend lead intake domain foundation and must not add live integrations, frontend work, production PostgreSQL/Docker infrastructure, GitHub Actions, commits, pushes, or real secrets.

## 3. Phase Plan

| Phase | Name | Deliverables | Acceptance criteria | Validation |
|---|---|---|---|---|
| Phase 0 | Docs/source-of-truth normalization | Project-specific docs, `.gitignore`, `.env.example` | Docs capture context, requirements, design, plan, runbook, TDD, safety rails; placeholders only | `git diff --check`; `git diff --stat`; `git status --short`; docs review |
| Phase 1 | Backend foundation | FastAPI app scaffold, Python project config, health endpoint, local-safe config, test setup | Backend starts locally; health endpoint responds; no database or external service is required at startup; no real integrations | `uv sync`; `uv run pytest`; `uv run ruff check .`; `uv run mypy backend tests`; backend smoke check |
| Phase 2 | Backend lead intake domain foundation | Intake validation, deterministic API response, in-memory dedupe service, mock CRM adapter, mock Slack adapter, local run/attempt models, retry policy | Valid leads process through local mock workflow; invalid leads fail safely; dedupe and retries are unit-tested; no database or network is required | Backend unit/API tests; adapter contract tests; retry tests; lint; typecheck; optional API smoke |
| Phase 3 | Frontend demo form, CSV import UI, admin dashboard | Next.js app, lead form, CSV import UI, run dashboard, filters, failure details, retry action | User can submit/import leads, inspect run states, filter dashboard, and retry failures locally | `pnpm install`; `pnpm test`; `pnpm lint`; `pnpm typecheck`; `pnpm build`; browser smoke |
| Phase 4 | Persistence and portfolio polish | PostgreSQL/Docker infrastructure when approved, seed data, architecture diagram, before/after workflow explanation, handoff doc, demo script/video plan | Project is understandable as a portfolio artifact without claiming live production integrations | Full local quality gate; seeded demo smoke; docs review; secret check |

## 4. Phase 1 Work Items

- Add `pyproject.toml` for `uv`-managed Python backend tooling.
- Add `backend.app.main:app` with a local `GET /health` endpoint.
- Add local-safe settings with environment defaults and no required external services.
- Add pytest coverage for health and configuration behavior.
- Run backend tests, Ruff, mypy, git whitespace checks, and forbidden-pattern checks.
- Update source-of-truth docs for the new backend commands and phase state.

## 5. Phase 2 Work Items

- Add `POST /leads/intake` to the existing FastAPI backend.
- Add Pydantic lead intake schemas with deterministic local validation and normalization.
- Add in-memory dedupe checks for normalized email and company domain.
- Add CRM and Slack adapter protocols plus deterministic mock implementations.
- Add local run-log models and deterministic retry policy.
- Add tests for schemas, API behavior, dedupe, adapters, run logging, and retry behavior.
- Update source-of-truth docs for the Phase 2 foundation-only scope.

## 6. Quality Gate Expectations By Phase

| Gate | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|---|---|---|---|---|
| Docs review | required | required | required | required | required |
| `git diff --check` | required | required | required | required | required |
| Backend tests | n/a | required | required | required if backend touched | required |
| Backend lint | n/a | required | required | required if backend touched | required |
| Backend typecheck | n/a | choose and run | required | required if backend touched | required |
| Frontend tests | n/a | n/a | n/a | required | required |
| Frontend lint/typecheck/build | n/a | n/a | n/a | required | required |
| Docker/PostgreSQL validation | n/a | skipped until compose exists | skipped until infrastructure phase | skipped unless infrastructure exists | required when persistence exists |
| Manual smoke | docs only | backend health | workflow API | UI workflow | seeded demo |

## 7. Recovery And Safety

- Phase 2 changes are limited to local backend domain code, tests, and docs and can be reviewed through `git diff`.
- Do not run destructive Git commands.
- Do not delete unrelated user files.
- Do not add real credentials.
- If a later phase introduces a bad scaffold, revert through normal reviewed Git changes, not history rewrites.

## 8. Recommended Next Phase

After Phase 2 is validated, proceed to Phase 3: frontend demo form, CSV import UI, admin dashboard scaffolding against the deterministic local backend endpoint, or add persistence first if the user wants database-backed runs before UI work.
