# Demo Assets

This directory contains portfolio demo assets for the local-only SalesOps Workflow Automation Hub.

## Screenshots

The screenshots in `screenshots/` were captured from a local Windows 11 reviewer run with:

- local PostgreSQL from Docker Compose;
- FastAPI running on `127.0.0.1`;
- Next.js served locally from the existing production build;
- deterministic synthetic demo seed data;
- mocked CRM and Slack adapters only.

No real HubSpot, Slack, Google Sheets, OpenAI, paid API, production API, webhook, or external provider call was made during capture.

Current screenshot set:

- `salesops-home.png` - public lead form and CSV import entry point.
- `salesops-csv-session-dashboard.png` - synthetic form and CSV submissions with latest result and session dashboard.
- `salesops-admin-run-history.png` - persisted run-history table and filters.
- `salesops-admin-failed-detail.png` - selected failed run with sanitized detail.
- `salesops-admin-filtered-detail.png` - filtered admin table with selected run detail preserved.

The 3-5 minute demo script and before/after workflow explanation remain in `HANDOFF.md`.
