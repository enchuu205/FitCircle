from flask import Blueprint, jsonify, request
from sqlalchemy import or_, and_
from sqlalchemy.orm import joinedload

from flask_login import login_required, current_user
from app.models import db, Friends, User

friends_routes=Blueprint('friends', __name__)

# GET ALL FRIENDS
@friends_routes.route('')
@login_required
def get_friends():
    accepted_friends = Friends.query.filter(or_(Friends.user_1_id == current_user.id, Friends.user_2_id == current_user.id), Friends.pending == False).all()

    # pending_friends =

    # .options(joinedload(User.friends))
    # accepted_friends = Friends.query.join(User, or_(Friends.user_1_id == User.id, Friends.user_2_id == User.id)).add_columns(User.first_name, User.last_name).filter(or_(Friends.user_1_id == current_user.id, Friends.user_2_id == current_user.id), Friends.pending == False).all()
    # pending_friends = Friends.query.add_columns(User.first_name, User.last_name).filter(or_(Friends.user_1_id == current_user.id, Friends.user_2_id == current_user.id), Friends.pending == True).all()
    # accepted_friends = Friends.query.join(User, or_(Friends.user_1_id == User.id, Friends.user_2_id == User.id)).filter(or_(Friends.user_1_id == current_user.id, Friends.user_2_id == current_user.id), Friends.pending == False).all()
    pending_friends = Friends.query.filter(or_(Friends.user_1_id == current_user.id, Friends.user_2_id == current_user.id), Friends.pending == True).all()
    # accepted_friends = (db.session.query(User)
    #                     .join(Friends, or_(Friends.user_1_id == User.id, Friends.user_2_id == User.id))
    #                     .filter(or_(Friends.user_1_id == current_user.id, Friends.user_2_id == current_user.id),
    #                             Friends.pending == False)).all()
    # pending_friends = (db.session.query(User)
    #                     .join(Friends, or_(Friends.user_1_id == User.id, Friends.user_2_id == User.id))
    #                     .filter(or_(Friends.user_1_id == current_user.id, Friends.user_2_id == current_user.id),
    #                             Friends.pending == True)).all()
    return  jsonify(
        {'accepted_friends':[accepted_friend.to_dict() for accepted_friend in accepted_friends],
         'pending_friends': [pending_friend.to_dict() for pending_friend in pending_friends]
         })

# ADD FRIEND
# SEND FRIEND REQUEST (CREATE)
@friends_routes.route('/add-friend/<string:username>', methods=['POST'])
@login_required
def add_friend(username):
    # does not currently check for if the searched user is already a friend/pending friend based on user_1_id or user_2_id
    print(username)
    searched_user = User.query.filter(User.username == username).all()
    if searched_user==False:
        return ({'error': 'This user does not exist'})
    else:
        create_pending_friend = Friends(
            user_1_id= current_user.id,
            user_2_id= searched_user[0].id,
            pending= True
        )
        db.session.add(create_pending_friend)
        db.session.commit()
        return {'message': 'Friend request sent!'}
