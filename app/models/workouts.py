from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime

from .workouts_exercises_join_table import workouts_exercises_join_table

class Workouts(db.Model):
    __tablename__='workouts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,
                   primary_key=True)
    user_id=db.Column(db.Integer,
                        db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'),
                        nullable=False)
    title=db.Column(db.String(255),
                    nullable=False)
    duration=db.Column(db.Integer,
                       nullable=False)
    preview_img=db.Column(db.String(255),
                          nullable=True)
    private=db.Column(db.Boolean,
                      nullable=False)
    created_at = db.Column(db.DateTime,
                           default=datetime.now)
    updated_at = db.Column(db.DateTime,
                           default=datetime.now, onupdate=datetime.now)
    # relationships
    user = relationship('User', back_populates='workouts')
    public_exercises = relationship('Public_Exercises',
                            secondary=workouts_exercises_join_table,
                            back_populates='workouts')
    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'duration': self.duration,
            'preview_img': self.preview_img,
            'private': self.private,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
