from flask import Blueprint, jsonify

from flask_login import login_required, current_user
from app.models import db, Workouts

workouts_routes = Blueprint('workouts', __name__)

# GET ALL WORKOUTS FROM CURRENT USER AND PUBLIC WORKOUTS AND FRIEND'S WORKOUTS
@workouts_routes.route('')
@login_required
def get_all_workouts():
    current_user_workouts = Workouts.query.filter(Workouts.user_id == current_user.id).all()

    return jsonify(
        {
            "current_user_workouts": [user_workout.to_dict() for user_workout in current_user_workouts]
        })
