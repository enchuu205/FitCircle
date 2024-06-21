from app.models import db, Public_Exercises, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_public_exercises():
    public_exercises = [
        Public_Exercises(name='Push Up', description='A basic upper body exercise that targets the chest, shoulders, and triceps by lifting and lowering the body using the arms.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718597016/FitCircle%20Seeders/6a6b99e9-72ec-4e55-a5d8-78ecd212c6e5.png'),
        Public_Exercises(name='Pull Up', description='An advanced upper body exercise that strengthens the back, shoulders, and arms by pulling the body up to a bar.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718597038/FitCircle%20Seeders/7613c40b-9269-4cdf-ab57-3eb5bca0aa68.png'),
        Public_Exercises(name='Squat', description='A fundamental lower body exercise that targets the thighs, hips, and buttocks by bending and straightening the legs.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718597051/FitCircle%20Seeders/c0c07213-6984-4087-9108-b26ccae6b240.png'),
        Public_Exercises(name='Lunge', description='A versatile lower body exercise that targets the thighs and glutes, performed by stepping forward and lowering the body.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718597092/FitCircle%20Seeders/385208ae-7970-453a-8352-023ed1295861.png'),
        Public_Exercises(name='Plank', description='A core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718597115/FitCircle%20Seeders/5e45eae6-d2e8-4cf9-916c-cb3857d0d836.png'),
        Public_Exercises(name='Deadlift', description='A full-body strength exercise that targets the lower back, hamstrings, and glutes by lifting a loaded barbell from the ground.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718597204/FitCircle%20Seeders/a268c530-c82e-497f-9e5e-9adcd4c39ae9.png'),
        Public_Exercises(name='Bench Press', description='A chest strength exercise performed by pressing a barbell or dumbbells upwards from a lying position.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718597177/FitCircle%20Seeders/6d872c23-5817-4dc7-a9e7-056ec46c21ad.png'),
        Public_Exercises(name='Bicep Curl', description='An arm strength exercise that targets the biceps by lifting a dumbbell or barbell in a curling motion.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718597231/FitCircle%20Seeders/283ad58b-c5ae-4a4e-af87-1827e021fdf8.png'),
        Public_Exercises(name='Tricep Dip', description='An arm strength exercise that targets the triceps by lowering and raising the body using parallel bars.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931913/FitCircle%20Seeders/dips-royalty-free-image-1697635553_samprl.jpg'),
        Public_Exercises(name='Leg Press', description='A leg strength exercise that targets the quadriceps, hamstrings, and glutes by pressing a weight away from the body using the legs.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931912/FitCircle%20Seeders/images_4_lakpy0.jpg'),
        Public_Exercises(name='Calf Raise', description='A calf strength exercise that involves raising the heels off the ground to work the calf muscles.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931912/FitCircle%20Seeders/2edbed_7435d4c5e834476580b10504f678c69c_mv2_fl7lg4.webp'),
        Public_Exercises(name='Shoulder Press', description='A shoulder strength exercise performed by pressing a weight overhead to work the deltoid muscles.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931911/FitCircle%20Seeders/seated-dumbbell-shoulder-press-800_qja8gx.jpg'),
        Public_Exercises(name='Lat Pulldown', description='A back strength exercise that targets the latissimus dorsi by pulling a bar down to the chest.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931910/FitCircle%20Seeders/lat-pulldown-800_bfw2io.jpg'),
        Public_Exercises(name='Row', description='A back strength exercise that involves pulling a weight towards the torso to target the upper and middle back.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931911/FitCircle%20Seeders/bent-over-row-1590133418_p0vn5h.jpg'),
        Public_Exercises(name='Chest Fly', description='A chest strength exercise performed by extending the arms in a wide arc to target the pectoral muscles.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931908/FitCircle%20Seeders/machine-chest-fly-800_srqfpc.jpg'),
        Public_Exercises(name='Leg Curl', description='A hamstring strength exercise that involves bending the knee to bring the heel towards the buttocks.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931910/FitCircle%20Seeders/1255_f59wbp.jpg'),
        Public_Exercises(name='Leg Extension', description='A quad strength exercise that targets the quadriceps by extending the leg to lift a weight.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931909/FitCircle%20Seeders/1636d_zss6qn.jpg'),
        Public_Exercises(name='Seated Row', description='A back strength exercise performed by pulling a weight towards the torso while seated to target the upper and middle back.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931909/FitCircle%20Seeders/Seated_Row_500x_xwl6bs.webp'),
        Public_Exercises(name='Hammer Curl', description='An arm strength exercise that targets the biceps and forearms by lifting a dumbbell with a neutral grip.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931909/FitCircle%20Seeders/shutterstock_419477203_480x480_xm6qb4.webp'),
        Public_Exercises(name='Front Raise', description='A shoulder strength exercise that involves lifting a weight in front of the body to work the anterior deltoids.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931907/FitCircle%20Seeders/dumbbell-front-raise_o7z796.jpg'),
        Public_Exercises(name='Side Plank', description='A core strength exercise that targets the obliques by holding the body in a straight line on one side.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931912/FitCircle%20Seeders/Woman-on-yoga-mat-doing-side-plank_cugs31.png'),
        Public_Exercises(name='Russian Twist', description='A core strength exercise that involves rotating the torso while sitting to target the oblique muscles.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931907/FitCircle%20Seeders/11f7997c94f34d8e_PS23_Fitness_Workout_08_Move_05_Russian_Twist_bq4zvm.webp'),
        Public_Exercises(name='Mountain Climber', description='A core and cardio exercise that involves running in place from a plank position to work the entire body.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931907/FitCircle%20Seeders/Fitness_mountain_climbers_1695909933565_1695909946377_rrz4lp.webp'),
        Public_Exercises(name='Burpee', description='A full-body cardio exercise that involves a squat, jump, and push-up to improve strength and endurance.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931907/FitCircle%20Seeders/fitness1_bmmeyc.jpg'),
        Public_Exercises(name='Crunch', description='A core strength exercise that targets the abdominal muscles by curling the shoulders towards the pelvis.', img='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718931907/FitCircle%20Seeders/Man-Doing-Crunches-At-Home_bhbp57.webp')
    ]
    db.session.add_all(public_exercises)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_public_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.public_exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM public_exercises"))

    db.session.commit()
