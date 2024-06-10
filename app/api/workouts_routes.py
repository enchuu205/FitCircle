from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from sqlalchemy import and_
from app.models import db, Workouts, workouts_exercises_join_table

from ..forms.workout_form import WorkoutForm

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
# GET WORKOUT DETAILS (READ)
@workouts_routes.route('/<int:id>')
@login_required
def get_workout_details(id):
    workout = Workouts.query.filter(Workouts.id == id).one()
    return jsonify(
        {
            'workout_detail': workout.to_dict()
        }
    )


# CREATE A NEW WORKOUT
@workouts_routes.route('/new', methods=['POST'])
@login_required
def create_workout():
    body = request.get_json()
    # print('----------------->', body)
    workout_form = WorkoutForm()
    workout_form['csrf_token'].data = request.cookies['csrf_token']

    # if workout_form.validate_on_submit():
    new_workout = Workouts(
        user_id=workout_form.user_id.data,
        title=workout_form.title.data,
        duration=workout_form.duration.data,
        preview_img=workout_form.preview_img.data,
        private=workout_form.private.data
    )

    db.session.add(new_workout)
    db.session.commit()

    for public_exercise_id in body.get('public_exercise_arr', []):
        db.session.execute(workouts_exercises_join_table.insert().values(
            workout_id=new_workout.id,
            public_exercise_id=public_exercise_id
        ))
    db.session.commit()

    return jsonify(new_workout.to_dict())

# UPDATE A USER'S WORKOUT
@workouts_routes.route('<int:id>/update', methods=['PUT'])
@login_required
def update_workout(id):
    body = request.get_json()
    # print('----------------->', body)

    existing_workout = Workouts.query.filter(Workouts.id == id).one()

    existing_workout.title = body['title']
    existing_workout.duration = body['duration']
    existing_workout.preview_img = body['preview_img']
    existing_workout.private = body['private']

    db.session.add(existing_workout)
    db.session.commit()

    db.session.execute(workouts_exercises_join_table.delete().where(
        workouts_exercises_join_table.c.workout_id == existing_workout.id
    ))

    for public_exercise_id in body.get('public_exercise_arr', []):
        db.session.execute(workouts_exercises_join_table.insert().values(
            workout_id=existing_workout.id,
            public_exercise_id=public_exercise_id
        ))
    db.session.commit()

    return {'message': 'Updated workout'}


# DELETE A WORKOUT THAT THE CURRENT USER OWNS
@workouts_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_workout(id):
    workout = Workouts.query.filter(Workouts.id == id).one()
    db.session.delete(workout)
    db.session.commit()
    return jsonify({'message': 'Successfully removed workout'})
