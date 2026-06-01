# REQ.md

## 1. Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Status | active draft |
| Project type | portfolio/demo automation |
| Current phase | Phase 0 - documentation and safety rails |
| Related docs | `CONTEXT.md`, `DESIGN.md`, `EXEC_PLAN.md`, `RUNBOOK.md`, `TDD.md`, `STATE.md` |

## 2. Product Brief

SalesOps Workflow Automation Hub is a planned portfolio demo for a growth agency with 5 sales reps. It will show how lead intake, validation, deduplication, CRM sync, Slack notification, backup/audit logging, failure inspection, and manual retries can be automated with a code-first system.

The project is not implemented yet. Phase 0 only establishes requirements, design direction, safety rails, and local validation expectations.

## 3. Goals

| ID | Goal | Priority | Success signal |
|---|---|---|---|
| G-001 | Replace manual lead copy/paste with a traceable automation workflow | P0 | Demo flow shows validated lead intake through run logging |
| G-002 | Reduce duplicate lead handling | P0 | Duplicate checks by email and company domain are tested |
| G-003 | Make failures inspectable and retryable | P0 | Admin view shows failure details and retry action |
| G-004 | Keep external integrations safe for a portfolio demo | P0 | CRM and Slack use mocks by default |
| G-005 | Present the project clearly as portfolio work | P1 | README, architecture diagram, seed data, handoff docs, and demo script exist |

## 4. In Scope

| ID | Item | Priority | Boundary |
|---|---|---|---|
| S-001 | Lead intake API endpoint | P0 | Backend API validates lead submissions |
| S-002 | Public demo lead form | P0 | Frontend submits demo leads to backend |
| S-003 | CSV lead import | P0 | Upload/import leads from CSV with validation feedback |
| S-004 | Deduplication | P0 | Detect duplicates by email and company domain |
| S-005 | CRM upsert simulation | P0 | Adapter simulates contact/deal create-or-update |
| S-006 | Slack notification simulation | P0 | Adapter logs/simulates notification for qualified leads |
| S-007 | Automation run log | P0 | Track queued, success, failed, and retried statuses |
| S-008 | Manual retry | P0 | Retry failed automation runs |
| S-009 | Failure detail view | P0 | Show payload, validation issue, error type, suggested action |
| S-010 | Admin run dashboard | P0 | Filter by date, source, status, lead owner, and error type |
| S-011 | Backup/audit records | P1 | Persist traceable records for processed leads and integration attempts |
| S-012 | Portfolio polish | P1 | Architecture diagram, seed data, before/after explanation, handoff docs, demo script |

## 5. Out Of Scope

| ID | Item | Reason | Revisit trigger |
|---|---|---|---|
| OOS-001 | Production deployment in early phases | Local portfolio validation comes first | After local app and smoke tests are stable |
| OOS-002 | Real external credentials | Avoid secret handling and accidental live calls | Explicit user approval |
| OOS-003 | Paid API usage | Keep demo safe and free by default | Explicit user approval |
| OOS-004 | Real HubSpot, Slack, Google Sheets, or OpenAI calls | Mock mode is the default safety boundary | Explicit user approval and adapter hardening |
| OOS-005 | GitHub Actions as default validation | Local validation must be stable first | User asks to add CI after local gates pass |
| OOS-006 | Auth and multi-tenant production controls | Portfolio demo scope | If project becomes production-facing |

## 6. Functional Requirements

| ID | Requirement | Priority | Acceptance signal | Status |
|---|---|---|---|---|
| FR-001 | The backend accepts lead submissions through an API endpoint and validates required fields. | P0 | Valid payload succeeds; invalid payload returns structured validation errors. | planned |
| FR-002 | The frontend provides a public demo form for lead submission. | P0 | User can submit a lead and see success/error feedback. | planned |
| FR-003 | The system imports leads from CSV. | P0 | Valid rows are processed; invalid rows are reported without hiding errors. | planned |
| FR-004 | The system detects duplicate leads by email and company domain. | P0 | Duplicate and non-duplicate cases are covered by tests. | planned |
| FR-005 | The CRM adapter simulates create-or-update behavior for contacts/deals. | P0 | Tests prove create, update, duplicate, and failure behavior in mock mode. | planned |
| FR-006 | The Slack adapter simulates notification for qualified leads. | P0 | Qualified lead produces a mock notification record; unqualified lead does not. | planned |
| FR-007 | Automation runs are logged with lifecycle statuses. | P0 | Queued, success, failed, and retried states are persisted and visible. | planned |
| FR-008 | Failed automation runs can be retried manually. | P0 | Retry creates a new attempt and updates run state without losing history. | planned |
| FR-009 | Failure details are inspectable. | P0 | Admin can view payload, validation issue, error type, and suggested action. | planned |
| FR-010 | Admin users can filter automation runs. | P0 | Filters work for date, source, status, lead owner, and error type. | planned |
| FR-011 | Demo data can be seeded locally. | P1 | Seed command creates representative leads, runs, failures, and retries. | planned |
| FR-012 | Portfolio handoff materials explain how real CRM/Slack credentials would be added safely. | P1 | Handoff doc documents credential boundaries without real secrets. | planned |

## 7. Non-Functional Requirements

| ID | Category | Requirement | Priority | Validation |
|---|---|---|---|---|
| NFR-001 | Safety | Mock/no-real-API mode is default. | P0 | Config review and adapter tests |
| NFR-002 | Secrets | Real secrets must not be committed, logged, or placed in docs. | P0 | `.gitignore`, `.env.example`, review |
| NFR-003 | Local development | Commands must work on Windows PowerShell. | P0 | Runbook command review and local validation |
| NFR-004 | Testability | Serious phases include tests, linting, type checks, and manual verification commands. | P0 | `TDD.md`, `EXEC_PLAN.md`, phase validation |
| NFR-005 | Auditability | Lead processing and integration attempts are traceable. | P0 | Run log and audit record tests |
| NFR-006 | Maintainability | Adapters isolate CRM/Slack implementations from core workflow logic. | P0 | Design review and contract tests |

## 8. Acceptance Criteria

| ID | Requirement | Given | When | Then | Validation |
|---|---|---|---|---|---|
| AC-001 | FR-001 | A complete lead payload | It is posted to the intake API | The lead is accepted and an automation run is queued/logged | Backend tests |
| AC-002 | FR-001 | An invalid lead payload | It is posted to the intake API | Structured validation details are returned and no unsafe side effect occurs | Backend tests |
| AC-003 | FR-004 | A lead with an existing email | It is processed | The system identifies it as a duplicate | Dedupe tests |
| AC-004 | FR-004 | A lead with a matching company domain | It is processed | The system flags a possible company duplicate | Dedupe tests |
| AC-005 | FR-005 | A valid qualified lead | CRM sync runs in mock mode | A CRM sync record is stored without live external calls | Adapter tests |
| AC-006 | FR-006 | A qualified lead | Notification runs in mock mode | A notification record is stored/logged without live Slack calls | Adapter tests |
| AC-007 | FR-008 | A failed automation run | User triggers retry | A new attempt is recorded and history is preserved | Retry tests |
| AC-008 | FR-010 | Existing automation runs | User applies admin filters | The table shows only matching rows | UI tests/manual smoke |

## 9. Assumptions

- The demo uses synthetic data.
- CRM, Slack, and Google Sheets remain mocked/optional unless explicitly approved.
- PostgreSQL is the intended integration database through Docker Compose.
- SQLite may be considered only for narrow local unit tests if justified.
- Authentication is not part of early portfolio scope unless later requested.

## 10. Open Questions

| ID | Question | Impact if unresolved | Default |
|---|---|---|---|
| Q-001 | Real HubSpot vs mock CRM? | Live integration scope and security posture | Mock CRM |
| Q-002 | Real Slack webhook vs mock/log notifier? | Notification adapter behavior | Mock/log notifier |
| Q-003 | Owner assignment rule? | Lead routing and admin filters | TBD |
| Q-004 | Qualification rule? | CRM/Slack trigger behavior | TBD |
| Q-005 | Dedupe edge cases? | False positives/negatives | Email first, domain second |
| Q-006 | PostgreSQL-only tests vs SQLite unit fallback? | Test speed and fidelity | PostgreSQL integration, SQLite only if justified |
