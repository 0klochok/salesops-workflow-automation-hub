# Freelance Platform Snippets

Use these snippets for freelance profiles, proposals, portfolio pages, or marketplace listings. This project is a local-first, mock-only, synthetic-data based portfolio demo. It is not a real deployed client system, and it does not use real customer data, paid APIs, live provider accounts, or production credentials.

## Upwork-Style Project Description

I built SalesOps Workflow Automation Hub as a local-first portfolio demo for lead intake automation. It shows how form and CSV leads can move through validation, dedupe checks, mock CRM handoff, mock Slack notification, local persistence, failure detail, and guarded retry without connecting to live providers.

The demo uses FastAPI, Next.js, TypeScript, PostgreSQL, SQLAlchemy, Alembic, Pydantic, Tailwind CSS, and TanStack Table. All data is synthetic, all CRM/Slack behavior is deterministic mock behavior, and the project is intended to demonstrate automation architecture and reviewer-ready workflow proof rather than a deployed client system.

## Fiverr/Contra-Style Version

Local-first SalesOps automation demo for form and CSV lead intake, validation, dedupe, mock CRM/Slack handoff, and local admin run-history review. Built with FastAPI, Next.js, TypeScript, and PostgreSQL using synthetic data only. Mock-only and not connected to live providers.

## Proof Points

- Form and CSV submissions use the same local intake workflow.
- Pydantic validation and normalized lead payloads keep data quality visible.
- Email and company-domain dedupe evidence is persisted locally.
- Mock CRM contact/deal upsert behavior is deterministic and inspectable.
- Mock Slack notification behavior is shown for qualified synthetic leads.
- Local run history records success, failed, queued, and retried workflow states.
- Admin filters, sanitized failure detail, suggested actions, and guarded retry support reviewer inspection.
- Screenshots, case study, demo script, and runbook give a short review path without live services.

## What This Demo Shows

- How I structure a workflow automation project around clear intake, validation, dedupe, provider boundaries, persistence, and auditability.
- How a local admin surface can expose run status, source, owner, error type, attempts, failure detail, and retry history.
- How mock adapters can prove the shape of CRM and team-notification handoffs before any real integration phase.
- How synthetic demo data and local setup instructions make a portfolio project reviewable without secrets or third-party accounts.

## What This Demo Does Not Claim

- It is not deployed.
- It is not a production SaaS product.
- It is not a real client implementation.
- It does not call real CRM, Slack, HubSpot, Salesforce, Google Sheets, OpenAI, Anthropic, Gemini, or other live provider APIs.
- It does not use paid API access, customer data, OAuth, production credentials, or provider dashboards.
- It does not include GitHub Actions, CI, hosting, auth, billing, multi-tenant permissions, or production security hardening.
- Real provider integrations would require a separate approved phase with scoped credentials, mock-first tests, redaction coverage, and synthetic-data smoke checks.

## Suggested Tags And Keywords

SalesOps automation, RevOps automation, lead intake automation, workflow automation, CRM workflow design, FastAPI, Next.js, TypeScript, PostgreSQL, SQLAlchemy, Pydantic, Tailwind CSS, TanStack Table, CSV import, lead dedupe, audit trail, run history, admin dashboard, mock integrations, synthetic data, local-first demo.
