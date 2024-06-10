from app.models import db, Workouts, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_workouts():
    workouts = [
    Workouts(id=1, user_id=1, title="Upper Body Strength Training", duration=30, preview_img="workout1.jpg", private=False),
    Workouts(id=2, user_id=1, title="HIIT Cardio Blast", duration=45, preview_img="workout2.jpg", private=True),
    Workouts(id=3, user_id=2, title="Quick Core Workout", duration=20, preview_img="workout3.jpg", private=False),
    Workouts(id=4, user_id=2, title="Full Body Conditioning", duration=60, preview_img="workout4.jpg", private=True),
    Workouts(id=5, user_id=3, title="Lower Body Strength Session", duration=50, preview_img="workout5.jpg", private=False),
    Workouts(id=6, user_id=4, title="Flexibility and Stretching Routine", duration=35, preview_img="workout6.jpg", private=True),
    Workouts(id=7, user_id=4, title="Quick Cardio Burn", duration=25, preview_img="workout7.jpg", private=False),
    Workouts(id=8, user_id=5, title="Strength and Stability Workout", duration=40, preview_img="workout8.jpg", private=False),
    Workouts(id=9, user_id=6, title="Advanced Muscle Building", duration=55, preview_img="workout9.jpg", private=True),
    Workouts(id=10, user_id=7, title="Basic Bodyweight Exercises", duration=30, preview_img="workout10.jpg", private=False),
    Workouts(id=11, user_id=8, title="Intermediate Strength Training", duration=45, preview_img="workout11.jpg", private=False),
    Workouts(id=12, user_id=8, title="Yoga for Relaxation", duration=20, preview_img="workout12.jpg", private=True),
    Workouts(id=13, user_id=9, title="Endurance Training Session", duration=60, preview_img="workout13.jpg", private=False),
    Workouts(id=14, user_id=9, title="Plyometric Power Workout", duration=50, preview_img="workout14.jpg", private=True),
    Workouts(id=15, user_id=10, title="Beginner's Full Body Workout", duration=35, preview_img="workout15.jpg", private=False),
    Workouts(id=16, user_id=11, title="Core Strength and Stability", duration=25, preview_img="workout16.jpg", private=False),
    Workouts(id=17, user_id=12, title="Upper Body Circuit", duration=40, preview_img="workout17.jpg", private=False),
    Workouts(id=18, user_id=12, title="Intense HIIT Workout", duration=55, preview_img="workout18.jpg", private=True),
    Workouts(id=19, user_id=13, title="Quick Abs Routine", duration=30, preview_img="workout19.jpg", private=False),
    Workouts(id=20, user_id=14, title="Leg Day Strength Training", duration=45, preview_img="workout20.jpg", private=True),
    Workouts(id=21, user_id=15, title="Full Body Cardio Circuit", duration=20, preview_img="workout21.jpg", private=False),
    Workouts(id=22, user_id=16, title="Strength and Endurance Combo", duration=60, preview_img="workout22.jpg", private=False),
    Workouts(id=23, user_id=17, title="High Intensity Interval Training", duration=50, preview_img="workout23.jpg", private=True),
    Workouts(id=24, user_id=18, title="Functional Fitness Workout", duration=35, preview_img="workout24.jpg", private=False),
    Workouts(id=25, user_id=18, title="Quick Upper Body Pump", duration=25, preview_img="workout25.jpg", private=True)
]
    db.session.add_all(workouts)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_workouts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.public_exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM public_exercises"))

    db.session.commit()
