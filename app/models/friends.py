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

    user_1 = db.relationship("User", foreign_keys=[user_1_id], back_populates='friend_1')
    user_2 = db.relationship("User", foreign_keys=[user_2_id], back_populates='friend_2')
    def to_dict(self):
        return{
            'id': self.id,
            'user_1_id': self.user_1_id,
            'user_2_id': self.user_2_id,
            'pending': self.pending,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'sender': self.user_1.to_dict(),
            'receiver': self.user_2.to_dict()
        }
