from app.models import db, Public_Exercises, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_public_exercises():
    public_exercises = [
        Public_Exercises(name='Push Up', description='A basic upper body exercise that targets the chest, shoulders, and triceps by lifting and lowering the body using the arms.', img='pushup.jpg'),
        Public_Exercises(name='Pull Up', description='An advanced upper body exercise that strengthens the back, shoulders, and arms by pulling the body up to a bar.', img='pullup.jpg'),
        Public_Exercises(name='Squat', description='A fundamental lower body exercise that targets the thighs, hips, and buttocks by bending and straightening the legs.', img='squat.jpg'),
        Public_Exercises(name='Lunge', description='A versatile lower body exercise that targets the thighs and glutes, performed by stepping forward and lowering the body.', img='lunge.jpg'),
        Public_Exercises(name='Plank', description='A core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.', img='plank.jpg'),
        Public_Exercises(name='Deadlift', description='A full-body strength exercise that targets the lower back, hamstrings, and glutes by lifting a loaded barbell from the ground.', img='deadlift.jpg'),
        Public_Exercises(name='Bench Press', description='A chest strength exercise performed by pressing a barbell or dumbbells upwards from a lying position.', img='benchpress.jpg'),
        Public_Exercises(name='Bicep Curl', description='An arm strength exercise that targets the biceps by lifting a dumbbell or barbell in a curling motion.', img='bicepcurl.jpg'),
        Public_Exercises(name='Tricep Dip', description='An arm strength exercise that targets the triceps by lowering and raising the body using parallel bars.', img='tricepdip.jpg'),
        Public_Exercises(name='Leg Press', description='A leg strength exercise that targets the quadriceps, hamstrings, and glutes by pressing a weight away from the body using the legs.', img='legpress.jpg'),
        Public_Exercises(name='Calf Raise', description='A calf strength exercise that involves raising the heels off the ground to work the calf muscles.', img='calfraise.jpg'),
        Public_Exercises(name='Shoulder Press', description='A shoulder strength exercise performed by pressing a weight overhead to work the deltoid muscles.', img='shoulderpress.jpg'),
        Public_Exercises(name='Lat Pulldown', description='A back strength exercise that targets the latissimus dorsi by pulling a bar down to the chest.', img='latpulldown.jpg'),
        Public_Exercises(name='Row', description='A back strength exercise that involves pulling a weight towards the torso to target the upper and middle back.', img='row.jpg'),
        Public_Exercises(name='Chest Fly', description='A chest strength exercise performed by extending the arms in a wide arc to target the pectoral muscles.', img='chestfly.jpg'),
        Public_Exercises(name='Leg Curl', description='A hamstring strength exercise that involves bending the knee to bring the heel towards the buttocks.', img='legcurl.jpg'),
        Public_Exercises(name='Leg Extension', description='A quad strength exercise that targets the quadriceps by extending the leg to lift a weight.', img='legextension.jpg'),
        Public_Exercises(name='Seated Row', description='A back strength exercise performed by pulling a weight towards the torso while seated to target the upper and middle back.', img='seatedrow.jpg'),
        Public_Exercises(name='Hammer Curl', description='An arm strength exercise that targets the biceps and forearms by lifting a dumbbell with a neutral grip.', img='hammercurl.jpg'),
        Public_Exercises(name='Front Raise', description='A shoulder strength exercise that involves lifting a weight in front of the body to work the anterior deltoids.', img='frontraise.jpg'),
        Public_Exercises(name='Side Plank', description='A core strength exercise that targets the obliques by holding the body in a straight line on one side.', img='sideplank.jpg'),
        Public_Exercises(name='Russian Twist', description='A core strength exercise that involves rotating the torso while sitting to target the oblique muscles.', img='russiantwist.jpg'),
        Public_Exercises(name='Mountain Climber', description='A core and cardio exercise that involves running in place from a plank position to work the entire body.', img='mountainclimber.jpg'),
        Public_Exercises(name='Burpee', description='A full-body cardio exercise that involves a squat, jump, and push-up to improve strength and endurance.', img='burpee.jpg'),
        Public_Exercises(name='Crunch', description='A core strength exercise that targets the abdominal muscles by curling the shoulders towards the pelvis.', img='crunch.jpg')
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
