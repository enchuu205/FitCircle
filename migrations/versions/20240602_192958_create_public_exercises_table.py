"""create public_exercises_table

Revision ID: b00624d4b3b5
Revises: fbc55d11388b
Create Date: 2024-06-02 19:29:58.510241

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b00624d4b3b5'
down_revision = 'fbc55d11388b'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'public_exercises',
        sa.Column('id',
                  sa.Integer(),
                  nullable=False),
        sa.Column('name',
                  sa.String(),
                  nullable=False),
        sa.Column('description',
                  sa.String(),
                  nullable=False),
        sa.Column('img',
                  sa.String,
                  nullable=True),
         sa.Column('created_at',
                   sa.DateTime(),
                   nullable=False),
        sa.Column('updated_at',
                  sa.DateTime(),
                  nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name')
    )


def downgrade():
    op.drop_table('public_exercises')
