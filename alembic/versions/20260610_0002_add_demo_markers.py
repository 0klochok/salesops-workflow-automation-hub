"""Add explicit demo markers.

Revision ID: 20260610_0002
Revises: 20260601_0001
Create Date: 2026-06-10
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "20260610_0002"
down_revision: str | None = "20260601_0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "leads",
        sa.Column("is_demo", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    op.add_column(
        "automation_runs",
        sa.Column("is_demo", sa.Boolean(), nullable=False, server_default=sa.false()),
    )


def downgrade() -> None:
    op.drop_column("automation_runs", "is_demo")
    op.drop_column("leads", "is_demo")
