from flask import Blueprint, jsonify
from flask_login import login_required, current_user

from sqlalchemy import and_

from app.models import db, Workouts

workouts_routes = Blueprint('workouts', __name__)

# GET ALL WORKOUTS FROM CURRENT USER AND PUBLIC WORKOUTS AND FRIEND'S WORKOUTS
@workouts_routes.route('')
@login_required
def get_all_workouts():
    current_user_workouts = Workouts.query.filter(Workouts.user_id == current_user.id).all()
    public_workouts = Workouts.query.filter(and_(Workouts.private == False, Workouts.user_id != current_user.id)).all()
    return jsonify(
        {
            "current_user_workouts": [user_workout.to_dict() for user_workout in current_user_workouts],
            "public_workouts": [public_workout.to_dict() for public_workout in public_workouts]
        })

@workouts_routes.route('/<int:id>')
@login_required
def get_workout_details(id):
    workout = Workouts.query.filter(Workouts.id == id).one()
    return jsonify(
        {
            'workout_detail': workout.to_dict()
        }
    )


@workouts_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_workout(id):
    workout = Workouts.query.filter(Workouts.id == id).one()
    db.session.delete(workout)
    db.session.commit()
    return {'message': 'Successfully removed workout'}
