from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Friends

friends_routes=Blueprint('friends', __name__)

@friends_routes.route('/')
# @login_required
def get_friends():
    friends = Friends.query.filter(Friends.user_1_id == 1).all()
    print('this is the friends query')
    return  jsonify({'friends': [friend.to_dict() for friend in friends]})
