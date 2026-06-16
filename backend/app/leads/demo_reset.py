from __future__ import annotations

import argparse
from collections.abc import Sequence
from dataclasses import dataclass
from typing import Any

from sqlalchemy import ColumnElement, delete, func, or_, select
from sqlalchemy.engine import make_url
from sqlalchemy.orm import Session

from backend.app.config import Settings, get_settings
from backend.app.db import get_database_session_factory
from backend.app.leads.demo_seed import DEMO_LEAD_IDS, DEMO_RUN_IDS, seed_demo_data
from backend.app.leads.persistence import (
    AuditRecord,
    AutomationRunRecord,
    LeadRecord,
    RunAttemptRecord,
)

LOCAL_RESET_APP_ENVS = frozenset({"local", "demo", "test", "development"})
LOCAL_RESET_DB_HOSTS = frozenset({"localhost", "127.0.0.1", "::1"})
LOCAL_RESET_DB_NAMES = frozenset({"salesops_local", "salesops_demo", "salesops_test"})
RESERVED_EMAIL_DOMAINS = frozenset(
    {
        "example.com",
        "example.net",
        "example.org",
        "example.test",
    }
)
RESERVED_COMPANY_DOMAINS = RESERVED_EMAIL_DOMAINS


class DemoResetSafetyError(RuntimeError):
    """Raised when the current settings are not safe for demo reset."""


@dataclass(frozen=True)
class DemoResetCandidates:
    lead_ids: tuple[str, ...]
    run_ids: tuple[str, ...]

    @property
    def lead_count(self) -> int:
        return len(self.lead_ids)

    @property
    def run_count(self) -> int:
        return len(self.run_ids)


@dataclass(frozen=True)
class DemoResetResult:
    applied: bool
    candidate_lead_count: int
    candidate_run_count: int
    deleted_audit_count: int = 0
    deleted_attempt_count: int = 0
    deleted_run_count: int = 0
    deleted_lead_count: int = 0
    seeded_run_ids: tuple[str, ...] = ()


def validate_demo_reset_safety(settings: Settings) -> None:
    app_env = settings.app_env.strip().lower()
    if app_env not in LOCAL_RESET_APP_ENVS:
        raise DemoResetSafetyError(
            f"APP_ENV must be one of {sorted(LOCAL_RESET_APP_ENVS)}; got {settings.app_env!r}."
        )
    if not settings.mock_mode:
        raise DemoResetSafetyError("MOCK_MODE must be true for demo reset.")
    if settings.crm_provider.strip().lower() != "mock":
        raise DemoResetSafetyError("CRM_PROVIDER must be mock for demo reset.")
    if settings.slack_provider.strip().lower() != "mock":
        raise DemoResetSafetyError("SLACK_PROVIDER must be mock for demo reset.")
    if settings.google_sheets_provider.strip().lower() not in {"disabled", "mock"}:
        raise DemoResetSafetyError(
            "GOOGLE_SHEETS_PROVIDER must be disabled or mock for demo reset."
        )
    if settings.database_url is None:
        raise DemoResetSafetyError("DATABASE_URL is required for demo reset.")

    database_url = make_url(settings.database_url)
    driver_name = database_url.drivername.split("+", maxsplit=1)[0].lower()
    if driver_name == "sqlite":
        return
    if driver_name not in {"postgresql", "postgres"}:
        raise DemoResetSafetyError(
            f"DATABASE_URL driver must be postgresql or sqlite; got {database_url.drivername!r}."
        )

    host = (database_url.host or "").lower()
    if host not in LOCAL_RESET_DB_HOSTS:
        raise DemoResetSafetyError(f"DATABASE_URL host must be local; got {database_url.host!r}.")

    database_name = database_url.database or ""
    if database_name not in LOCAL_RESET_DB_NAMES:
        raise DemoResetSafetyError(
            f"DATABASE_URL database must be one of {sorted(LOCAL_RESET_DB_NAMES)}; "
            f"got {database_name!r}."
        )


def reset_demo_data(session: Session, *, apply: bool) -> DemoResetResult:
    candidates = collect_demo_reset_candidates(session)
    if not apply:
        return DemoResetResult(
            applied=False,
            candidate_lead_count=candidates.lead_count,
            candidate_run_count=candidates.run_count,
        )

    deletion_result = _delete_demo_reset_candidates(session, candidates)
    seed_result = seed_demo_data(session)
    return DemoResetResult(
        applied=True,
        candidate_lead_count=candidates.lead_count,
        candidate_run_count=candidates.run_count,
        deleted_audit_count=deletion_result.deleted_audit_count,
        deleted_attempt_count=deletion_result.deleted_attempt_count,
        deleted_run_count=deletion_result.deleted_run_count,
        deleted_lead_count=deletion_result.deleted_lead_count,
        seeded_run_ids=seed_result.run_ids,
    )


def collect_demo_reset_candidates(session: Session) -> DemoResetCandidates:
    lead_ids = set(
        session.scalars(
            select(LeadRecord.lead_id).where(
                or_(
                    LeadRecord.is_demo.is_(True),
                    _legacy_resettable_lead_predicate(),
                )
            )
        ).all()
    )
    run_rows = session.execute(
        select(AutomationRunRecord.run_id, AutomationRunRecord.lead_id).where(
            or_(
                AutomationRunRecord.is_demo.is_(True),
                AutomationRunRecord.run_id.in_(DEMO_RUN_IDS),
                AutomationRunRecord.lead_id.in_(lead_ids),
            )
        )
    ).all()

    run_ids: set[str] = set()
    for run_id, _lead_id in run_rows:
        run_ids.add(run_id)

    return DemoResetCandidates(
        lead_ids=tuple(sorted(lead_ids)),
        run_ids=tuple(sorted(run_ids)),
    )


def _legacy_resettable_lead_predicate() -> ColumnElement[bool]:
    """Match pre-marker local demo rows from earlier reset implementations."""

    email = func.lower(LeadRecord.email)
    company_domain = func.lower(LeadRecord.company_domain)
    email_predicates: list[ColumnElement[bool]] = [
        email.like(f"%@{domain}") for domain in RESERVED_EMAIL_DOMAINS
    ]
    email_predicates.extend(
        [
            email.like("%@%.example"),
            email.like("%@%.example.com"),
            email.like("%@%.example.net"),
            email.like("%@%.example.org"),
            email.like("%@%.example.test"),
            email.like("%@%.test"),
        ]
    )
    domain_predicates: list[ColumnElement[bool]] = [
        company_domain == domain for domain in RESERVED_COMPANY_DOMAINS
    ]
    domain_predicates.extend(
        [
            company_domain.like("%.example"),
            company_domain.like("%.example.com"),
            company_domain.like("%.example.net"),
            company_domain.like("%.example.org"),
            company_domain.like("%.example.test"),
            company_domain.like("%.test"),
        ]
    )
    return or_(
        LeadRecord.lead_id.in_(DEMO_LEAD_IDS),
        *email_predicates,
        *domain_predicates,
    )


def _delete_demo_reset_candidates(
    session: Session,
    candidates: DemoResetCandidates,
) -> DemoResetResult:
    audit_conditions: list[ColumnElement[bool]] = []
    if candidates.run_ids:
        audit_conditions.append(AuditRecord.run_id.in_(candidates.run_ids))
    if candidates.lead_ids:
        audit_conditions.append(AuditRecord.lead_id.in_(candidates.lead_ids))

    deleted_audit_count = 0
    if audit_conditions:
        deleted_audit_count = _rowcount(
            session.execute(delete(AuditRecord).where(or_(*audit_conditions)))
        )

    deleted_attempt_count = 0
    deleted_run_count = 0
    if candidates.run_ids:
        deleted_attempt_count = _rowcount(
            session.execute(
                delete(RunAttemptRecord).where(RunAttemptRecord.run_id.in_(candidates.run_ids))
            )
        )
        deleted_run_count = _rowcount(
            session.execute(
                delete(AutomationRunRecord).where(
                    AutomationRunRecord.run_id.in_(candidates.run_ids)
                )
            )
        )

    deleted_lead_count = 0
    if candidates.lead_ids:
        deleted_lead_count = _rowcount(
            session.execute(delete(LeadRecord).where(LeadRecord.lead_id.in_(candidates.lead_ids)))
        )

    return DemoResetResult(
        applied=True,
        candidate_lead_count=candidates.lead_count,
        candidate_run_count=candidates.run_count,
        deleted_audit_count=deleted_audit_count,
        deleted_attempt_count=deleted_attempt_count,
        deleted_run_count=deleted_run_count,
        deleted_lead_count=deleted_lead_count,
    )


def _rowcount(result: Any) -> int:
    rowcount = getattr(result, "rowcount", 0)
    if isinstance(rowcount, int) and rowcount >= 0:
        return rowcount
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Safely reset local/demo synthetic SalesOps data and reseed deterministic "
            "portfolio runs."
        )
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Perform the reset. Without this flag, the command reports a dry run only.",
    )
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    settings = get_settings()
    try:
        validate_demo_reset_safety(settings)
    except DemoResetSafetyError as exc:
        print(f"Refusing demo reset: {exc}")
        return 2

    session_factory = get_database_session_factory(settings)
    with session_factory() as session:
        result = reset_demo_data(session, apply=args.apply)
        if args.apply:
            session.commit()
        else:
            session.rollback()

    if not args.apply:
        print(
            "Dry run only. "
            f"Matched {result.candidate_run_count} synthetic/demo runs and "
            f"{result.candidate_lead_count} synthetic/demo leads. "
            "Re-run with --apply to delete them and reseed deterministic demo data."
        )
        return 0

    print(
        "Demo reset applied. "
        f"Deleted {result.deleted_run_count} runs, {result.deleted_lead_count} leads, "
        f"{result.deleted_attempt_count} attempts, and {result.deleted_audit_count} audit records. "
        f"Seeded {len(result.seeded_run_ids)} demo runs: {', '.join(result.seeded_run_ids)}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
