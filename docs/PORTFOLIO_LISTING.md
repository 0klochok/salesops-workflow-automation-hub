# SalesOps Workflow Automation Hub

## Summary

SalesOps Workflow Automation Hub is a local-first portfolio demo that automates lead intake for a small growth agency. It shows how form and CSV leads can be validated, deduplicated, routed through mock CRM/Slack handoff steps, and reviewed through an admin run-history dashboard without using real customer data or paid APIs.

The repository is designed for freelance-client review: it demonstrates workflow automation, auditability, failure visibility, and safe retry patterns using synthetic data and local services only.

## Client Problem

A sales or growth team receiving leads from forms and CSV uploads can lose time to manual copy/paste work, inconsistent duplicate checks, slow sales handoff, and unclear failure history. When lead records, CRM updates, team notifications, and error evidence are scattered across tools, teams have a harder time proving what happened and recovering missed work.

## Solution

This project turns that manual handoff into a traceable local workflow. A FastAPI backend accepts validated leads, checks duplicate evidence by email and company domain, simulates CRM contact/deal upsert behavior, simulates qualified-lead Slack notification, and persists lead/run/audit records. A Next.js frontend provides public form/CSV intake plus a local-only admin dashboard for filtering run history, inspecting sanitized failure detail, and retrying failed or queued runs through guarded mock-only behavior.

## Key Features

- Public synthetic lead intake form with validation feedback.
- CSV import path that submits rows through the same local workflow.
- Backend validation, normalization, and dedupe evidence by email and company domain.
- Mock CRM contact/deal upsert behavior with deterministic local results.
- Mock Slack notification behavior for qualified synthetic leads.
- Local persistence for leads, automation runs, attempts, and audit evidence.
- Admin run-history dashboard with status, source, date, owner, error-type, and search filters.
- Selected run detail with sanitized payload, attempt history, failure context, and suggested action.
- Guarded local retry for failed or queued selected runs.
- Portfolio screenshots and reviewer scripts for a short local demo.

## Tech Stack

| Area | Technology |
|---|---|
| Backend | Python 3.12+, FastAPI, Pydantic, SQLAlchemy, Alembic |
| Database | PostgreSQL 17 Alpine through Docker Compose for local demo use |
| Frontend | Next.js App Router 15, React 19, TypeScript, Tailwind CSS, TanStack Table |
| Tooling | uv, pytest, Ruff, mypy, pnpm, Vitest, Testing Library, ESLint |
| Integrations | Mock CRM and mock Slack adapters only |

## Intentionally Mocked Or Local-Only

- CRM behavior is simulated by local mock adapters, not HubSpot or another live CRM.
- Slack notification behavior is simulated locally, not sent to a real Slack workspace.
- Lead data is synthetic demo data only.
- The database is local PostgreSQL for the demo, with SQLite used only where tests justify a local fallback.
- The admin dashboard is local-only and does not expose production admin controls.
- `.env.example` contains placeholders only; real secrets are not required.
- OAuth flows, GitHub Actions, deployment config, hosted automation, live webhooks, and production infrastructure are intentionally absent.

## What The Demo Proves

- A lead can enter from a form or CSV and pass through one consistent local intake path.
- Validation, dedupe evidence, mock CRM behavior, and mock Slack behavior are visible and inspectable.
- Successful, failed, queued, and retried workflow states can be represented in persisted run history.
- Admin users can filter runs, inspect sanitized failure context, and perform a guarded local retry.
- The workflow can be reviewed without paid APIs, real provider credentials, production accounts, or customer data.

## What This Project Is Not

- Not deployed.
- Not a production SaaS product.
- Not a real HubSpot, Slack, Google Sheets, OpenAI, or live-provider integration.
- Not based on paid API usage.
- Not a production security, authentication/OAuth, billing, or multi-tenant system.
- Not a replacement for a client-specific CRM implementation without a separate approved integration phase.

## Freelance Platform Descriptions

### Upwork Version

I built a local-first SalesOps workflow automation demo for teams that receive leads from forms and CSVs. It validates submissions, checks duplicates, records auditable run history, and uses mock CRM/Slack adapters to show the handoff shape without live providers. The demo includes a local admin review dashboard with filters, sanitized failure detail, and guarded retry behavior.

### Contra Version

A portfolio-ready SalesOps automation case study for lead intake, dedupe, mock CRM handoff, mock Slack notification, and local run-history review. Built with FastAPI, Next.js, TypeScript, PostgreSQL, and synthetic data, it demonstrates traceable workflow automation with clear provider boundaries.

### Fiverr/Gig Version

I can build custom lead intake automation workflows for sales/admin teams: validation, duplicate checks, run-history evidence, and CRM/team-notification handoff design. This demo shows the pattern locally with FastAPI, Next.js, PostgreSQL, and mock integrations so the workflow can be reviewed safely without live customer systems.

## How I Would Adapt This For A Real Client

For a real client, I would first map the current lead sources, required fields, dedupe rules, routing rules, CRM objects, notification channels, failure states, and audit needs. Then I would keep this repository's mock-first adapter approach while adding provider-specific implementations in a separate approved phase, with secrets stored outside source control, mocked tests first, explicit redaction coverage, and a controlled synthetic-data smoke test before any live usage.

Likely client adaptations include CRM-specific contact/deal mapping, Slack or Teams notifications, Google Sheets or warehouse reporting exports, owner assignment rules, SLA alerts, approval queues, richer admin permissions, and client-specific dashboards. Those would be added as new scoped work rather than implied as already present in this local portfolio repository.

## Related Portfolio Docs

- [Case study](CASE_STUDY.md)
- [Demo script](DEMO_SCRIPT.md)
- [Demo assets checklist](DEMO_ASSETS.md)
- [Project README](../README.md)
