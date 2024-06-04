from app.models import db, workouts_exercises_join_table, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_workouts_exercises_join():
    workouts_exercises_join = [
    {'workout_id': 1, 'public_exercise_id': 1},
    {'workout_id': 1, 'public_exercise_id': 2},
    {'workout_id': 1, 'public_exercise_id': 3},
    {'workout_id': 1, 'public_exercise_id': 4},
    {'workout_id': 1, 'public_exercise_id': 5},
    {'workout_id': 1, 'public_exercise_id': 6},
    {'workout_id': 2, 'public_exercise_id': 7},
    {'workout_id': 2, 'public_exercise_id': 8},
    {'workout_id': 2, 'public_exercise_id': 9},
    {'workout_id': 2, 'public_exercise_id': 10},
    {'workout_id': 2, 'public_exercise_id': 11},
    {'workout_id': 2, 'public_exercise_id': 12},
    {'workout_id': 2, 'public_exercise_id': 13},
    {'workout_id': 3, 'public_exercise_id': 14},
    {'workout_id': 3, 'public_exercise_id': 15},
    {'workout_id': 3, 'public_exercise_id': 16},
    {'workout_id': 3, 'public_exercise_id': 17},
    {'workout_id': 3, 'public_exercise_id': 18},
    {'workout_id': 3, 'public_exercise_id': 19},
    {'workout_id': 4, 'public_exercise_id': 20},
    {'workout_id': 4, 'public_exercise_id': 21},
    {'workout_id': 4, 'public_exercise_id': 22},
    {'workout_id': 4, 'public_exercise_id': 23},
    {'workout_id': 4, 'public_exercise_id': 24},
    {'workout_id': 4, 'public_exercise_id': 25},
    {'workout_id': 4, 'public_exercise_id': 1},
    # Add more workouts with at least 6 public exercises each
]
    db.session.execute(workouts_exercises_join_table.insert(), workouts_exercises_join)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_workouts_exercises_join():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workouts_exercises_join_table"))

    db.session.commit()
