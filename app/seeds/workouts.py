from app.models import db, Workouts, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_workouts():
    workouts = [
    Workouts(user_id=1, title="Upper Body Strength Training", duration=30, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935048/FitCircle%20Seeders/Lower-Body-Workouts.960_xdrtn4.jpg", private=False),
    Workouts(user_id=1, title="HIIT Cardio Blast", duration=45, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935047/FitCircle%20Seeders/upper-body-arm-hiit-workouts_blogheader-notitle_v0q2jl.jpg", private=True),
    Workouts(user_id=2, title="Quick Core Workout", duration=20, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935046/FitCircle%20Seeders/mandoingsitupsat_696216_1_wiah8k.jpg", private=False),
    Workouts(user_id=2, title="Full Body Conditioning", duration=60, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935046/FitCircle%20Seeders/generic-training-inset-1-700xh_b85qee.jpg", private=True),
    Workouts(user_id=3, title="Lower Body Strength Session", duration=50, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935048/FitCircle%20Seeders/Lower-Body-Workouts.960_xdrtn4.jpg", private=False),
    Workouts(user_id=4, title="Flexibility and Stretching Routine", duration=35, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935046/FitCircle%20Seeders/flexibility-yoga-h_ejl3es.jpg", private=True),
    Workouts(user_id=4, title="Quick Cardio Burn", duration=25, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935045/FitCircle%20Seeders/best-cardio-exercises-promo-2000-498cbfb8f07541b78572bf810e7fb600_mevt8j.jpg", private=False),
    Workouts(user_id=5, title="Strength and Stability Workout", duration=40, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935044/FitCircle%20Seeders/Full-Squat_dlthj5.jpg", private=False),
    Workouts(user_id=6, title="Advanced Muscle Building", duration=55, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935047/FitCircle%20Seeders/upper-body-workout-routine_rfqqai.webp", private=True),
    Workouts(user_id=7, title="Basic Bodyweight Exercises", duration=30, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935048/FitCircle%20Seeders/Lower-Body-Workouts.960_xdrtn4.jpg", private=False),
    Workouts(user_id=8, title="Intermediate Strength Training", duration=45, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935047/FitCircle%20Seeders/upper-body-workout-routine_rfqqai.webp", private=False),
    Workouts(user_id=8, title="Yoga for Relaxation", duration=20, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935046/FitCircle%20Seeders/flexibility-yoga-h_ejl3es.jpg", private=True),
    Workouts(user_id=9, title="Endurance Training Session", duration=60, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935045/FitCircle%20Seeders/best-cardio-exercises-promo-2000-498cbfb8f07541b78572bf810e7fb600_mevt8j.jpg", private=False),
    Workouts(user_id=9, title="Plyometric Power Workout", duration=50, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935042/FitCircle%20Seeders/211109_SELF_087_z9b2gt.webp", private=True),
    Workouts(user_id=10, title="Beginner's Full Body Workout", duration=35, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935041/FitCircle%20Seeders/images_6_zanftq.jpg", private=False),
    Workouts(user_id=11, title="Core Strength and Stability", duration=25, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935042/FitCircle%20Seeders/mandoingsitupsat_696216_1_1_hkobzj.jpg", private=False),
    Workouts(user_id=12, title="Upper Body Circuit", duration=40, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935046/FitCircle%20Seeders/generic-training-inset-1-700xh_b85qee.jpg", private=False),
    Workouts(user_id=12, title="Intense HIIT Workout", duration=55, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935047/FitCircle%20Seeders/upper-body-arm-hiit-workouts_blogheader-notitle_v0q2jl.jpg", private=True),
    Workouts(user_id=13, title="Quick Abs Routine", duration=30, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935046/FitCircle%20Seeders/mandoingsitupsat_696216_1_wiah8k.jpg", private=False),
    Workouts(user_id=14, title="Leg Day Strength Training", duration=45, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935048/FitCircle%20Seeders/Lower-Body-Workouts.960_xdrtn4.jpg", private=True),
    Workouts(user_id=15, title="Full Body Cardio Circuit", duration=20, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935042/FitCircle%20Seeders/images_5_dfhklb.jpg", private=False),
    Workouts(user_id=16, title="Strength and Endurance Combo", duration=60, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935044/FitCircle%20Seeders/91_Craig-capurso-advanced-level_dp6fth.jpg", private=False),
    Workouts(user_id=17, title="High Intensity Interval Training", duration=50, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935042/FitCircle%20Seeders/images_5_dfhklb.jpg", private=True),
    Workouts(user_id=18, title="Functional Fitness Workout", duration=35, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935046/FitCircle%20Seeders/generic-training-inset-1-700xh_b85qee.jpg", private=False),
    Workouts(user_id=18, title="Quick Upper Body Pump", duration=25, preview_img="https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718935047/FitCircle%20Seeders/upper-body-workout-routine_rfqqai.webp", private=True)
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
