from app.models import db, Workouts, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_workouts():
    workouts=[
    Workouts(id=1, user_id=1, title="Workout 1", duration=30, preview_img="workout1.jpg", private=False),
    Workouts(id=2, user_id=1, title="Workout 2", duration=45, preview_img="workout2.jpg", private=True),
    Workouts(id=3, user_id=2, title="Workout 3", duration=20, preview_img="workout3.jpg", private=False),
    Workouts(id=4, user_id=2, title="Workout 4", duration=60, preview_img="workout4.jpg", private=True),
    Workouts(id=5, user_id=3, title="Workout 5", duration=50, preview_img="workout5.jpg", private=False),
    Workouts(id=6, user_id=4, title="Workout 6", duration=35, preview_img="workout6.jpg", private=True),
    Workouts(id=7, user_id=4, title="Workout 7", duration=25, preview_img="workout7.jpg", private=False),
    Workouts(id=8, user_id=5, title="Workout 8", duration=40, preview_img="workout8.jpg", private=False),
    Workouts(id=9, user_id=6, title="Workout 9", duration=55, preview_img="workout9.jpg", private=True),
    Workouts(id=10, user_id=7, title="Workout 10", duration=30, preview_img="workout10.jpg", private=False),
    Workouts(id=11, user_id=8, title="Workout 11", duration=45, preview_img="workout11.jpg", private=False),
    Workouts(id=12, user_id=8, title="Workout 12", duration=20, preview_img="workout12.jpg", private=True),
    Workouts(id=13, user_id=9, title="Workout 13", duration=60, preview_img="workout13.jpg", private=False),
    Workouts(id=14, user_id=9, title="Workout 14", duration=50, preview_img="workout14.jpg", private=True),
    Workouts(id=15, user_id=10, title="Workout 15", duration=35, preview_img="workout15.jpg", private=False),
    Workouts(id=16, user_id=11, title="Workout 16", duration=25, preview_img="workout16.jpg", private=False),
    Workouts(id=17, user_id=12, title="Workout 17", duration=40, preview_img="workout17.jpg", private=False),
    Workouts(id=18, user_id=12, title="Workout 18", duration=55, preview_img="workout18.jpg", private=True),
    Workouts(id=19, user_id=13, title="Workout 19", duration=30, preview_img="workout19.jpg", private=False),
    Workouts(id=20, user_id=14, title="Workout 20", duration=45, preview_img="workout20.jpg", private=True),
    Workouts(id=21, user_id=15, title="Workout 21", duration=20, preview_img="workout21.jpg", private=False),
    Workouts(id=22, user_id=16, title="Workout 22", duration=60, preview_img="workout22.jpg", private=False),
    Workouts(id=23, user_id=17, title="Workout 23", duration=50, preview_img="workout23.jpg", private=True),
    Workouts(id=24, user_id=18, title="Workout 24", duration=35, preview_img="workout24.jpg", private=False),
    Workouts(id=25, user_id=18, title="Workout 25", duration=25, preview_img="workout25.jpg", private=True)

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
