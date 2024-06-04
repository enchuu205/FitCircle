"""create workouts table

Revision ID: 61ec2fdbdabc
Revises: b00624d4b3b5
Create Date: 2024-06-02 23:52:17.617009

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '61ec2fdbdabc'
down_revision = 'b00624d4b3b5'
branch_labels = None
depends_on = None

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

def upgrade():
    op.create_table(
        'workouts',
        sa.Column('id',
                  sa.Integer(),
                  nullable=False
                  ),
        sa.Column('user_id',
                  sa.Integer(),
                  nullable=False
                  ),
        sa.Column('title',
                  sa.String(),
                  nullable=False
                  ),
        sa.Column('duration',
                  sa.Integer(),
                  nullable=False
                  ),
        sa.Column('preview_img',
                  sa.String(),
                  nullable=True
                  ),
        sa.Column('private',
                  sa.Boolean(),
                  nullable=False
                  ),
        sa.Column('created_at',
                   sa.DateTime(),
                   nullable=False),
        sa.Column('updated_at',
                  sa.DateTime(),
                  nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

def downgrade():
    op.drop_table('workouts')
