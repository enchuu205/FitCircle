"""Create join table for workouts and public_exercises

Revision ID: 0499e0f326e1
Revises: 61ec2fdbdabc
Create Date: 2024-06-03 02:02:49.032353

"""
from alembic import op
import sqlalchemy as sa



# revision identifiers, used by Alembic.
revision = '0499e0f326e1'
down_revision = '61ec2fdbdabc'
branch_labels = None
depends_on = None


def upgrade():
       op.create_table(
              'workouts_exercises_join_table',
              sa.Column('workout_id', sa.Integer(), sa.ForeignKey('workouts.id', ondelete='CASCADE'), primary_key=True),
              sa.Column('public_exercise_id', sa.Integer(), sa.ForeignKey('public_exercises.id', ondelete='CASCADE'), primary_key=True),
              )

def downgrade():
       op.drop_table('workouts_exercises')
