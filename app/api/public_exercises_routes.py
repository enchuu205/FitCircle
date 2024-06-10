from flask import Blueprint, jsonify
from flask_login import login_required, current_user

from sqlalchemy import and_

from app.models import db, Public_Exercises

public_exercises_routes = Blueprint('public_exercises', __name__)

# GET ALL PUBLIC EXERCISES
@public_exercises_routes.route('')
@login_required
def get_all_public_exercises():
    public_exercises = Public_Exercises.query.all()
    return jsonify(
        {
            "all_public_exercises": [public_exercise.to_dict() for public_exercise in public_exercises]
        }
    )
