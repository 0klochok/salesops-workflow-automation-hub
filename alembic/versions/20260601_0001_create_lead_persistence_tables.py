"""Create lead persistence tables.

Revision ID: 20260601_0001
Revises:
Create Date: 2026-06-01
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "20260601_0001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "leads",
        sa.Column("lead_id", sa.String(length=64), nullable=False),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("first_name", sa.String(length=100), nullable=False),
        sa.Column("last_name", sa.String(length=100), nullable=False),
        sa.Column("company_name", sa.String(length=200), nullable=False),
        sa.Column("company_domain", sa.String(length=255), nullable=False),
        sa.Column("source", sa.String(length=10), nullable=False),
        sa.Column("lead_score", sa.Integer(), nullable=False),
        sa.Column("job_title", sa.String(length=200), nullable=True),
        sa.Column("phone", sa.String(length=50), nullable=True),
        sa.Column("message", sa.String(length=2000), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("lead_id"),
    )
    op.create_index(op.f("ix_leads_company_domain"), "leads", ["company_domain"], unique=False)
    op.create_index(op.f("ix_leads_email"), "leads", ["email"], unique=True)

    op.create_table(
        "automation_runs",
        sa.Column("run_id", sa.String(length=64), nullable=False),
        sa.Column("lead_id", sa.String(length=64), nullable=False),
        sa.Column("status", sa.String(length=7), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["lead_id"], ["leads.lead_id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("run_id"),
    )
    op.create_index(
        op.f("ix_automation_runs_lead_id"),
        "automation_runs",
        ["lead_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_automation_runs_status"),
        "automation_runs",
        ["status"],
        unique=False,
    )

    op.create_table(
        "run_attempts",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("run_id", sa.String(length=64), nullable=False),
        sa.Column("attempt_number", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=7), nullable=False),
        sa.Column("error_type", sa.String(length=10), nullable=True),
        sa.Column("error_message", sa.String(length=1000), nullable=True),
        sa.Column("suggested_action", sa.String(length=1000), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["run_id"], ["automation_runs.run_id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("run_id", "attempt_number"),
    )
    op.create_index(op.f("ix_run_attempts_run_id"), "run_attempts", ["run_id"], unique=False)

    op.create_table(
        "audit_records",
        sa.Column("audit_id", sa.String(length=64), nullable=False),
        sa.Column("lead_id", sa.String(length=64), nullable=False),
        sa.Column("run_id", sa.String(length=64), nullable=False),
        sa.Column("event_type", sa.String(length=80), nullable=False),
        sa.Column("payload", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["lead_id"], ["leads.lead_id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["run_id"], ["automation_runs.run_id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("audit_id"),
    )
    op.create_index(
        op.f("ix_audit_records_event_type"),
        "audit_records",
        ["event_type"],
        unique=False,
    )
    op.create_index(op.f("ix_audit_records_lead_id"), "audit_records", ["lead_id"], unique=False)
    op.create_index(op.f("ix_audit_records_run_id"), "audit_records", ["run_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_audit_records_run_id"), table_name="audit_records")
    op.drop_index(op.f("ix_audit_records_lead_id"), table_name="audit_records")
    op.drop_index(op.f("ix_audit_records_event_type"), table_name="audit_records")
    op.drop_table("audit_records")
    op.drop_index(op.f("ix_run_attempts_run_id"), table_name="run_attempts")
    op.drop_table("run_attempts")
    op.drop_index(op.f("ix_automation_runs_status"), table_name="automation_runs")
    op.drop_index(op.f("ix_automation_runs_lead_id"), table_name="automation_runs")
    op.drop_table("automation_runs")
    op.drop_index(op.f("ix_leads_email"), table_name="leads")
    op.drop_index(op.f("ix_leads_company_domain"), table_name="leads")
    op.drop_table("leads")
