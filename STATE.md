# STATE.md

## Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Owner | User |
| Contributors | Codex |
| Repository path | `C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh` |
| Current branch | `main` |
| Current phase | Phase 0 - repo/source-of-truth normalization |
| Overall status | on-track |
| Quality gate status | Phase 0 docs validation passed |
| Completion | Phase 0 complete pending user review |
| Main blocker | none |

## 1. Current Objective

- Normalize source-of-truth documentation and safety rails for a greenfield sales operations workflow automation portfolio project.
- Do not write application code.
- Do not scaffold FastAPI, Next.js, `apps/api`, or `apps/web`.
- Do not install dependencies.
- Do not commit or push.
- Do not call real external APIs.
- Do not create real secrets.

## 2. Status Snapshot

- The repository is documentation-only at Phase 0.
- Application code has not been scaffolded yet.
- `README.md` was empty before Phase 0 normalization.
- `.gitignore` and `.env.example` were missing before Phase 0 normalization.
- Git inspection showed no commits yet on `main`.
- No Git remote output was observed during Phase 0 inspection.

## 3. Phase 0 Done State

Phase 0 is done when:

- Source-of-truth docs reflect the salesops workflow automation project.
- Safety rails for no commits, no pushes, no real API calls, no secrets, and local validation first are documented.
- `.gitignore` ignores local/build/secret artifacts and keeps `.env.example` trackable.
- `.env.example` contains placeholders only.
- Required validation commands run:
  - `git diff --check`
  - `git diff --stat`
  - `git status --short`

## 4. Changed Files For Phase 0

| Path | Purpose | Status |
|---|---|---|
| `AGENTS.md` | Codex operating rules and project safety rails | updated |
| `CONTEXT.md` | Project context, stack, assumptions, open questions | updated |
| `STATE.md` | Current phase and validation status | updated |
| `DESIGN.md` | Planned architecture and conceptual data model | updated |
| `EXEC_PLAN.md` | Phase plan, deliverables, acceptance criteria | updated |
| `REQ.md` | Functional requirements and out-of-scope items | updated |
| `RUNBOOK.md` | Windows PowerShell local workflow and future commands | updated |
| `TDD.md` | Local-first test strategy and test matrix | updated |
| `README.md` | Portfolio-facing overview and roadmap | updated |
| `.gitignore` | Ignore local/generated/secret artifacts | created |
| `.env.example` | Placeholder-only environment template | created |

## 5. Validation

| Gate | Command | Status | Notes |
|---|---|---|---|
| Whitespace check | `git diff --check` | pass | No output. Note: repo has no tracked files yet, so untracked files are not represented in git diff output. |
| Diff summary | `git diff --stat` | pass | No output because repo has no tracked files yet and Phase 0 files are untracked. |
| Worktree status | `git status --short` | pass | Shows Phase 0 files as untracked; no commit was made. |
| Tests | n/a | skipped | No application code exists in Phase 0 |
| Lint | n/a | skipped | No application code or lint tooling exists yet |
| Typecheck | n/a | skipped | No typed code exists yet |
| Build | n/a | skipped | No buildable app exists yet |
| Smoke/manual | docs review | pass | Docs were patched to match Phase 0 prompt scope. |

## 6. Open Questions For Later Phases

| ID | Question | Needed by | Current default / assumption |
|---|---|---|---|
| Q-001 | Real HubSpot vs mock CRM? | Before live CRM integration | Mock CRM |
| Q-002 | Real Slack webhook vs mock/log notifier? | Before live Slack integration | Mock/log notifier |
| Q-003 | What is the owner assignment rule for 5 sales reps? | Before lead routing | TBD; start with deterministic rule |
| Q-004 | What is the qualification rule? | Before CRM/Slack automation | TBD; start simple and configurable |
| Q-005 | What dedupe edge cases should be handled? | Before dedupe implementation | Email first, company domain second |
| Q-006 | PostgreSQL-only tests vs SQLite unit fallback? | Before backend test setup | PostgreSQL integration; SQLite only if justified |

## 7. Next Actions

1. Complete Phase 0 validation and record results.
2. Start Phase 1 backend foundation only after Phase 0 is accepted.
3. Keep real integrations disabled unless explicitly approved.
