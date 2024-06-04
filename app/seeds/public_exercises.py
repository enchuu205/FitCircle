from app.models import db, Public_Exercises, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_public_exercises():
    public_exercises=[
        Public_Exercises(name='Push Up', description='A basic upper body exercise', img='pushup.jpg'),
        Public_Exercises(name='Pull Up', description='An advanced upper body exercise', img='pullup.jpg'),
        Public_Exercises(name='Squat', description='A fundamental lower body exercise', img='squat.jpg'),
        Public_Exercises(name='Lunge', description='A versatile lower body exercise', img='lunge.jpg'),
        Public_Exercises(name='Plank', description='A core strength exercise', img='plank.jpg'),
        Public_Exercises(name='Deadlift', description='A full-body strength exercise', img='deadlift.jpg'),
        Public_Exercises(name='Bench Press', description='A chest strength exercise', img='benchpress.jpg'),
        Public_Exercises(name='Bicep Curl', description='An arm strength exercise', img='bicepcurl.jpg'),
        Public_Exercises(name='Tricep Dip', description='An arm strength exercise', img='tricepdip.jpg'),
        Public_Exercises(name='Leg Press', description='A leg strength exercise', img='legpress.jpg'),
        Public_Exercises(name='Calf Raise', description='A calf strength exercise', img='calfraise.jpg'),
        Public_Exercises(name='Shoulder Press', description='A shoulder strength exercise', img='shoulderpress.jpg'),
        Public_Exercises(name='Lat Pulldown', description='A back strength exercise', img='latpulldown.jpg'),
        Public_Exercises(name='Row', description='A back strength exercise', img='row.jpg'),
        Public_Exercises(name='Chest Fly', description='A chest strength exercise', img='chestfly.jpg'),
        Public_Exercises(name='Leg Curl', description='A hamstring strength exercise', img='legcurl.jpg'),
        Public_Exercises(name='Leg Extension', description='A quad strength exercise', img='legextension.jpg'),
        Public_Exercises(name='Seated Row', description='A back strength exercise', img='seatedrow.jpg'),
        Public_Exercises(name='Hammer Curl', description='An arm strength exercise', img='hammercurl.jpg'),
        Public_Exercises(name='Front Raise', description='A shoulder strength exercise', img='frontraise.jpg'),
        Public_Exercises(name='Side Plank', description='A core strength exercise', img='sideplank.jpg'),
        Public_Exercises(name='Russian Twist', description='A core strength exercise', img='russiantwist.jpg'),
        Public_Exercises(name='Mountain Climber', description='A core and cardio exercise', img='mountainclimber.jpg'),
        Public_Exercises(name='Burpee', description='A full-body cardio exercise', img='burpee.jpg'),
        Public_Exercises(name='Crunch', description='A core strength exercise', img='crunch.jpg')
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
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM public_exercises"))

    db.session.commit()
