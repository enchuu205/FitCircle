from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey, Table

schema = SCHEMA if environment == 'production' else None

workouts_exercises_join_table = Table(
    "workouts_exercises_join_table",
    db.metadata,
    db.Column('workout_id', ForeignKey(add_prefix_for_prod('workouts.id')), primary_key=True),
    db.Column('public_exercise_id', ForeignKey(add_prefix_for_prod('public_exercises.id')), primary_key=True),
    db.Column('sets', db.Integer(), nullable=False),
    db.Column('reps', db.Integer(), nullable=False),
    db.Column('rest_seconds', db.Integer(), nullable=False),
    schema=schema
)
if environment == "production":
    workouts_exercises_join_table.schema = SCHEMA
