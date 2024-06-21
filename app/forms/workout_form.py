from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Optional

class WorkoutForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    duration = IntegerField('duration', validators=[Optional()])
    preview_img = StringField('preview_img')
    private = BooleanField('private', validators=[Optional()])
