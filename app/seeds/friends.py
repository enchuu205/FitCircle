from app.models import db, Friends, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_friends():
    friends = [
    Friends(sender_id=1, receiver_id=2, pending=False),
    Friends(sender_id=3, receiver_id=1, pending=True),
    Friends(sender_id=5, receiver_id=1, pending=False),
    Friends(sender_id=7, receiver_id=8, pending=True),
    Friends(sender_id=9, receiver_id=10, pending=False),
    Friends(sender_id=11, receiver_id=12, pending=True),
    Friends(sender_id=13, receiver_id=14, pending=False),
    Friends(sender_id=15, receiver_id=16, pending=True),
    Friends(sender_id=17, receiver_id=18, pending=False),
    Friends(sender_id=19, receiver_id=20, pending=True)
]

    db.session.add_all(friends)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
