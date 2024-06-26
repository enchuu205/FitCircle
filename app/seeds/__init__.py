from flask.cli import AppGroup
from .users import seed_users, undo_users
from .public_exercises import seed_public_exercises, undo_public_exercises
from .workouts import seed_workouts, undo_workouts
from .friends import seed_friends, undo_friends
from app.seeds.workouts_exercises_join import seed_workouts_exercises_join, undo_workouts_exercises_join

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_workouts_exercises_join()
        undo_friends()
        undo_workouts()
        undo_public_exercises()
        undo_users()
    seed_users()
    seed_public_exercises()
    seed_workouts()
    seed_friends()
    seed_workouts_exercises_join()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_workouts_exercises_join()
    undo_friends()
    undo_workouts()
    undo_public_exercises()
    undo_users()
    # Add other undo functions here
