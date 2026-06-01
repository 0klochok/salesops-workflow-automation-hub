# RUNBOOK.md

## 1. Meta

| Field | Value |
|---|---|
| Last updated | 2026-06-01 |
| Status | active draft |
| Project | salesops-workflow-automation-hub-fresh |
| Primary environment | Windows 11 / PowerShell |
| Current phase | Phase 2 - backend lead intake domain foundation |

## 2. Operating Rules

- Run commands from the repository root unless a section says otherwise.
- Use PowerShell-compatible commands.
- Use `-LiteralPath` or quoted paths because the repository path contains spaces and Cyrillic characters.
- Do not commit or push from Codex.
- Use `uv` for backend dependency management.
- Do not call real external APIs without explicit approval.
- Keep CRM, Slack, Google Sheets, OpenAI, and other external services mocked or absent unless explicitly approved.

## 3. Enter The Repository

```powershell
Set-Location -LiteralPath "C:\Users\Санька\Documents\Coding Projects\Portfolio Projects\salesops-workflow-automation-hub-fresh"
```

## 4. Check Git Status

```powershell
git status --short --branch
git remote -v
```

Expected Phase 2 observation: worktree may show lead domain, test, and doc changes until the user manually commits.

## 5. Check Tool Versions

These are version checks. Install only the tools needed for the active phase.

```powershell
python --version
uv --version
node --version
corepack --version
pnpm --version
docker --version
git --version
```

If a command is missing, record it before the phase that needs it.

## 6. Environment Variables

- `.env.example` contains placeholders only.
- `.env` is ignored and must contain only local values if created manually in later phases.
- Real secrets must not be committed, logged, printed, or placed in docs.
- CRM, Slack, and Google Sheets are mocked/optional unless explicitly approved.

Optional local copy command, only when local overrides are needed:

```powershell
Copy-Item -LiteralPath ".env.example" -Destination ".env"
```

## 7. Backend Commands

```powershell
# Install/sync backend dependencies
uv sync

# Run backend tests
uv run pytest

# Run backend lint
uv run ruff check .

# Run backend typecheck
uv run mypy backend tests

# Start local FastAPI server
uv run uvicorn backend.app.main:app --reload
```

Manual backend smoke check while the server is running:

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/health"
```

Manual Phase 2 lead intake smoke check while the server is running:

```powershell
$payload = @{
    email = "ada@example.com"
    first_name = "Ada"
    last_name = "Lovelace"
    company_name = "Example Co"
    company_domain = "example.com"
    source = "demo_form"
    lead_score = 90
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/leads/intake" -Method Post -ContentType "application/json" -Body $payload
```

Expected response shape includes deterministic `lead_id`, `run_id`, `run_status`, `dedupe`, `crm`, and optional `slack` fields. This endpoint uses mock adapters only and does not persist data.

## 8. Phase 2 Validation

```powershell
git status --short --branch
uv sync --frozen
uv run pytest
uv run ruff check .
uv run mypy backend tests
git diff --check
Test-Path -LiteralPath ".github\workflows"
$files = Get-ChildItem -Recurse -Force -File | Where-Object { $_.FullName -notmatch "\\(\.git|\.venv|__pycache__|\.pytest_cache|\.mypy_cache)\\" }
$secretPattern = "sk-[A-Za-z0-9_-]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|gh[pousr]_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}"
$endpointPattern = "hooks\.slack\.com|api\.hubapi\.com|api\.openai\.com|sheets\.googleapis\.com"
$files | Select-String -Pattern $secretPattern
$files | Select-String -Pattern $endpointPattern
$files | Select-String -Pattern "[ \t]+$"
```

The forbidden-pattern scans should return no matches for likely secrets/tokens, real integration endpoints/webhooks, or trailing whitespace. `.github/workflows` should remain absent unless the user explicitly requests CI later.

Previously configured backend gates remain:

```powershell
uv run pytest
uv run ruff check .
uv run mypy backend tests
```

## 9. Future Frontend Commands

These commands are planned for Phase 3 and will not work until the frontend exists.

```powershell
# Enable package manager support if needed
corepack enable

# Install frontend dependencies
pnpm install

# Run frontend dev server
pnpm dev

# Run frontend tests
pnpm test

# Run frontend lint
pnpm lint

# Run frontend typecheck
pnpm typecheck

# Run frontend build
pnpm build
```

Future manual frontend smoke check:

```powershell
# Open manually in browser after dev server starts
# http://localhost:3000
```

## 10. Future Docker/PostgreSQL Validation

These commands are planned for the phase that adds Docker Compose and PostgreSQL config.

```powershell
docker compose up -d
docker compose ps
docker compose logs --tail=100
```

Future database health checks should be added here once compose services and names exist.

## 11. Troubleshooting

| Symptom | Likely cause | Action |
|---|---|---|
| Backend command fails because `uv` is missing | `uv` is not installed or not on PATH | Install `uv` locally, then rerun the command |
| Health endpoint is unreachable | Uvicorn is not running or port 8000 is in use | Start the server or choose a free port |
| Lead intake returns 422 | Payload failed local Pydantic validation | Check required fields, email format, company domain, source, and `lead_score` range |
| Future frontend command fails | Frontend not scaffolded yet | Wait for Phase 3 |
| Docker command fails | Compose file not created yet or Docker not running | Wait for compose phase or start Docker Desktop |
| Real API credential requested | Live integration is not approved | Use mock mode and placeholders |
| `.env` appears in `git status` | Ignore rules or file handling problem | Stop and fix before committing |

## 12. Manual Commit Checklist For User

Codex must not perform these steps.

```powershell
git status --short
git diff --check
git diff --stat
git diff -- .
```

The user may manually stage, commit, and push after reviewing validation results.
