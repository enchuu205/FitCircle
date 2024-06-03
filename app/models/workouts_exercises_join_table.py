from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey, Table

workouts_exercises_join_table = Table(
    "workouts_exercises_join_table",
    db.metadata,
    db.Column('workout_id', ForeignKey(add_prefix_for_prod('workouts.id')), primary_key=True),
    db.Column('public_exercise_id', ForeignKey(add_prefix_for_prod('public_exercises.id')), primary_key=True)
)
