# SalesOps Workflow Automation Hub Case Study

## Business Problem

A fake growth agency with 5 sales reps receives leads from website forms and CSV uploads. The manual process requires reps to check lead quality, look for duplicates, update CRM records, notify the team, and reconstruct failures from scattered notes. That creates duplicate records, delayed follow-up, missed qualified leads, and weak auditability.

## Solution

SalesOps Workflow Automation Hub turns that manual handoff into a local, code-first workflow. A FastAPI backend accepts validated lead payloads, persists lead/run/audit records, checks duplicate evidence by email and company domain, simulates CRM contact/deal upsert behavior, and simulates qualified-lead Slack notification. A Next.js frontend provides a public demo intake experience plus a read-only admin run dashboard for reviewers.

## Core Workflow

1. A synthetic lead enters through the public form or CSV import.
2. Pydantic validation normalizes and rejects invalid payloads.
3. Duplicate evidence is checked against local persisted lead snapshots.
4. A mock CRM adapter simulates contact/deal create-or-update behavior.
5. A mock Slack adapter simulates qualified-lead notification.
6. Run, attempt, payload summary, failure detail, and audit records are persisted locally.
7. The admin dashboard shows run history, filters, selected detail, and suggested action for failures.

## Technical Stack

| Layer | Stack |
|---|---|
| Backend | FastAPI, Python 3.12+, Pydantic, SQLAlchemy, Alembic |
| Database | PostgreSQL through Docker Compose for the local demo |
| Frontend | Next.js App Router, TypeScript, Tailwind CSS, TanStack Table, local shadcn-style primitives |
| Tooling | uv, pytest, Ruff, mypy, pnpm, Vitest, ESLint, TypeScript |
| Integrations | Mock CRM and mock Slack adapters only |

## Validation Performed

The project includes backend tests for validation, dedupe, persistence, adapter behavior, intake API behavior, run logging, retry logic, configuration, and health checks. Frontend tests cover CSV parsing, session behavior, public lead submission, and admin run-history interactions. The documented local gate also runs backend lint/typecheck, frontend lint/tests/typecheck/build, Git whitespace checks, no-staged-file checks, and a check that no GitHub Actions workflow directory exists.

## Mock And Synthetic-Data Boundary

This is intentionally a local portfolio demo. It uses synthetic data, local PostgreSQL, local FastAPI/Next.js routes, and deterministic mock CRM/Slack adapters. It does not require paid APIs, production accounts, real provider calls, live webhooks, deployment infrastructure, or real customer data.

## Client Adaptation Opportunities

A client could adapt this pattern for lead routing, inbound sales qualification, partner intake, event follow-up, operations QA, or any workflow that needs validation, dedupe, traceable external-system handoff, and failure review. Real CRM, Slack, Google Sheets, or other provider integrations should be added only in a separate approved phase behind the existing adapter boundaries, with mock-first tests and explicit credential handling.

