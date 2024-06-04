"""create the friends table

Revision ID: fbc55d11388b
Revises: ffdc0a98111c
Create Date: 2024-05-31 16:03:22.042345

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fbc55d11388b'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

def upgrade():
    op.create_table(
        'friends',
        sa.Column('id',
                  sa.Integer(),
                  nullable=False
                  ),
        sa.Column('user_1_id',
                  sa.Integer(),
                  nullable=False),
        sa.Column('user_2_id',
                  sa.Integer(),
                  nullable=False),
        sa.Column('pending',
                  sa.Boolean,
                  nullable=False),
        sa.Column('created_at',
                   sa.DateTime(),
                   nullable=False),
        sa.Column('updated_at',
                  sa.DateTime(),
                  nullable=False),
        sa.ForeignKeyConstraint(['user_1_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_2_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('friends')
