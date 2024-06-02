from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Friends(db.Model):
    __tablename__='friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,
                   primary_key=True)
    user_1_id=db.Column(db.Integer,
                        db.ForeignKey(add_prefix_for_prod('users.id'),
                        ondelete='CASCADE'),
                        nullable=False)
    user_2_id=db.Column(db.Integer,
                        db.ForeignKey(add_prefix_for_prod('users.id'),
                        ondelete='CASCADE'),
                        nullable=False)
    pending=db.Column(db.Boolean,
                      nullable=False)
    created_at = db.Column(db.DateTime,
                           default=datetime.now)
    updated_at = db.Column(db.DateTime,
                           default=datetime.now, onupdate=datetime.now)
