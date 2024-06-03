from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
    User(first_name='Demo', last_name='User', email='demo@aa.io', username='demo_user',
         phone_number='123-456-7890', city='New York', state='NY',
         password='password0', profile_picture='profile1.jpg'),
    User(
        first_name='John', last_name='Doe', email='john.doe@example.com', username='johndoe',
        phone_number='123-456-7890', city='New York', state='NY',
        password='password1', profile_picture='profile1.jpg'
    ),
    User(
        first_name='Jane', last_name='Smith', email='jane.smith@example.com', username='janesmith',
        phone_number='234-567-8901', city='Los Angeles', state='CA',
        password='password2', profile_picture='profile2.jpg'
    ),
    User(
        first_name='Alice', last_name='Johnson', email='alice.johnson@example.com', username='alicej',
        phone_number='345-678-9012', city='Chicago', state='IL',
        password='password3', profile_picture='profile3.jpg'
    ),
    User(
        first_name='Bob', last_name='Brown', email='bob.brown@example.com', username='bobb',
        phone_number='456-789-0123', city='Houston', state='TX',
        password='password4', profile_picture='profile4.jpg'
    ),
    User(
        first_name='Charlie', last_name='Davis', email='charlie.davis@example.com', username='charlied',
        phone_number='567-890-1234', city='Phoenix', state='AZ',
        password='password5', profile_picture='profile5.jpg'
    ),
    User(
        first_name='David', last_name='Miller', email='david.miller@example.com', username='davidm',
        phone_number='678-901-2345', city='Philadelphia', state='PA',
        password='password6', profile_picture='profile6.jpg'
    ),
    User(
        first_name='Eve', last_name='Wilson', email='eve.wilson@example.com', username='evew',
        phone_number='789-012-3456', city='San Antonio', state='TX',
        password='password7', profile_picture='profile7.jpg'
    ),
    User(
        first_name='Frank', last_name='Moore', email='frank.moore@example.com', username='frankm',
        phone_number='890-123-4567', city='San Diego', state='CA',
        password='password8', profile_picture='profile8.jpg'
    ),
    User(
        first_name='Grace', last_name='Taylor', email='grace.taylor@example.com', username='gracet',
        phone_number='901-234-5678', city='Dallas', state='TX',
        password='password9', profile_picture='profile9.jpg'
    ),
    User(
        first_name='Henry', last_name='Anderson', email='henry.anderson@example.com', username='henrya',
        phone_number='012-345-6789', city='San Jose', state='CA',
        password='password10', profile_picture='profile10.jpg'
    ),
    User(
        first_name='Ivy', last_name='Thomas', email='ivy.thomas@example.com', username='ivyt',
        phone_number='123-456-7891', city='Austin', state='TX',
        password='password11', profile_picture='profile11.jpg'
    ),
    User(
        first_name='Jack', last_name='Jackson', email='jack.jackson@example.com', username='jackj',
        phone_number='234-567-8902', city='Jacksonville', state='FL',
        password='password12', profile_picture='profile12.jpg'
    ),
    User(
        first_name='Karen', last_name='White', email='karen.white@example.com', username='karenw',
        phone_number='345-678-9013', city='Fort Worth', state='TX',
        password='password13', profile_picture='profile13.jpg'
    ),
    User(
        first_name='Leo', last_name='Harris', email='leo.harris@example.com', username='leoh',
        phone_number='456-789-0124', city='Columbus', state='OH',
        password='password14', profile_picture='profile14.jpg'
    ),
    User(
        first_name='Mia', last_name='Martin', email='mia.martin@example.com', username='miam',
        phone_number='567-890-1235', city='Charlotte', state='NC',
        password='password15', profile_picture='profile15.jpg'
    ),
    User(
        first_name='Noah', last_name='Lee', email='noah.lee@example.com', username='noahl',
        phone_number='678-901-2346', city='San Francisco', state='CA',
        password='password16', profile_picture='profile16.jpg'
    ),
    User(
        first_name='Olivia', last_name='Clark', email='olivia.clark@example.com', username='oliviac',
        phone_number='789-012-3457', city='Indianapolis', state='IN',
        password='password17', profile_picture='profile17.jpg'
    ),
    User(
        first_name='Paul', last_name='Lewis', email='paul.lewis@example.com', username='paull',
        phone_number='890-123-4568', city='Seattle', state='WA',
        password='password18', profile_picture='profile18.jpg'
    ),
    User(
        first_name='Quinn', last_name='Walker', email='quinn.walker@example.com', username='quinnw',
        phone_number='901-234-5679', city='Denver', state='CO',
        password='password19', profile_picture='profile19.jpg'
    ),
    User(
        first_name='Ryan', last_name='Hall', email='ryan.hall@example.com', username='ryanh',
        phone_number='012-345-6780', city='Washington', state='DC',
        password='password20', profile_picture='profile20.jpg'
    ),
    User(
        first_name='Sophia', last_name='Allen', email='sophia.allen@example.com', username='sophiaa',
        phone_number='123-456-7892', city='Boston', state='MA',
        password='password21', profile_picture='profile21.jpg'
    ),
    User(
        first_name='Tom', last_name='Young', email='tom.young@example.com', username='tomy',
        phone_number='234-567-8903', city='El Paso', state='TX',
        password='password22', profile_picture='profile22.jpg'
    ),
    User(
        first_name='Uma', last_name='King', email='uma.king@example.com', username='umak',
        phone_number='345-678-9014', city='Detroit', state='MI',
        password='password23', profile_picture='profile23.jpg'
    ),
    User(
        first_name='Victor', last_name='Wright', email='victor.wright@example.com', username='victorw',
        phone_number='456-789-0125', city='Nashville', state='TN',
        password='password24', profile_picture='profile24.jpg'
    ),
    User(
        first_name='Wendy', last_name='Lopez', email='wendy.lopez@example.com', username='wendyl',
        phone_number='567-890-1236', city='Oklahoma City', state='OK',
        password='password25', profile_picture='profile25.jpg'
    )
]

    db.session.add_all(users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
