from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime

from .workouts_exercises_join_table import workouts_exercises_join_table

class Public_Exercises(db.Model):
    __tablename__='public_exercises'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,
                   primary_key=True)
    name=db.Column(db.String(255),
                   unique=True,
                   nullable=False)
    description=db.Column(db.String(255),
                    nullable=False)
    img=db.Column(db.String(255),
                    nullable=False)
    created_at = db.Column(db.DateTime,
                           default=datetime.now)
    updated_at = db.Column(db.DateTime,
                           default=datetime.now, onupdate=datetime.now)
    # many to many relationship with workouts
    workouts = relationship('Workouts',
                            secondary=workouts_exercises_join_table,
                            back_populates='public_exercises')
