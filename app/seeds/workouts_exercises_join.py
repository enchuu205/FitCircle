from app.models import db, workouts_exercises_join_table, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_workouts_exercises_join():
    workouts_exercises_join = [
        {'workout_id': 1, 'public_exercise_id': 1, 'sets': 3, 'reps': 12, 'rest_seconds': 60},
        {'workout_id': 1, 'public_exercise_id': 2, 'sets': 4, 'reps': 10, 'rest_seconds': 45},
        {'workout_id': 1, 'public_exercise_id': 3, 'sets': 3, 'reps': 15, 'rest_seconds': 60},
        {'workout_id': 1, 'public_exercise_id': 4, 'sets': 5, 'reps': 8, 'rest_seconds': 90},
        {'workout_id': 1, 'public_exercise_id': 5, 'sets': 4, 'reps': 12, 'rest_seconds': 75},
        {'workout_id': 1, 'public_exercise_id': 6, 'sets': 3, 'reps': 10, 'rest_seconds': 60},
        {'workout_id': 2, 'public_exercise_id': 7, 'sets': 3, 'reps': 12, 'rest_seconds': 60},
        {'workout_id': 2, 'public_exercise_id': 8, 'sets': 4, 'reps': 10, 'rest_seconds': 45},
        {'workout_id': 2, 'public_exercise_id': 9, 'sets': 3, 'reps': 15, 'rest_seconds': 60},
        {'workout_id': 2, 'public_exercise_id': 10, 'sets': 5, 'reps': 8, 'rest_seconds': 90},
        {'workout_id': 2, 'public_exercise_id': 11, 'sets': 4, 'reps': 12, 'rest_seconds': 75},
        {'workout_id': 2, 'public_exercise_id': 12, 'sets': 3, 'reps': 10, 'rest_seconds': 60},
        {'workout_id': 3, 'public_exercise_id': 13, 'sets': 3, 'reps': 12, 'rest_seconds': 60},
        {'workout_id': 3, 'public_exercise_id': 14, 'sets': 4, 'reps': 10, 'rest_seconds': 45},
        {'workout_id': 3, 'public_exercise_id': 15, 'sets': 3, 'reps': 15, 'rest_seconds': 60},
        {'workout_id': 3, 'public_exercise_id': 16, 'sets': 5, 'reps': 8, 'rest_seconds': 90},
        {'workout_id': 3, 'public_exercise_id': 17, 'sets': 4, 'reps': 12, 'rest_seconds': 75},
        {'workout_id': 3, 'public_exercise_id': 18, 'sets': 3, 'reps': 10, 'rest_seconds': 60},
        {'workout_id': 4, 'public_exercise_id': 19, 'sets': 3, 'reps': 12, 'rest_seconds': 60},
        {'workout_id': 4, 'public_exercise_id': 20, 'sets': 4, 'reps': 10, 'rest_seconds': 45},
        {'workout_id': 4, 'public_exercise_id': 21, 'sets': 3, 'reps': 15, 'rest_seconds': 60},
        {'workout_id': 4, 'public_exercise_id': 22, 'sets': 5, 'reps': 8, 'rest_seconds': 90},
        {'workout_id': 4, 'public_exercise_id': 23, 'sets': 4, 'reps': 12, 'rest_seconds': 75},
        {'workout_id': 4, 'public_exercise_id': 24, 'sets': 3, 'reps': 10, 'rest_seconds': 60},
        {'workout_id': 4, 'public_exercise_id': 25, 'sets': 3, 'reps': 12, 'rest_seconds': 60},
        {'workout_id': 4, 'public_exercise_id': 1, 'sets': 4, 'reps': 10, 'rest_seconds': 45},
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
        db.session.execute(f"TRUNCATE table {SCHEMA}.workouts_exercises_join_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workouts_exercises_join_table"))

    db.session.commit()
