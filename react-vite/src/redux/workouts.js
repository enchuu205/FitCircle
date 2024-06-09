const GET_ALL_WORKOUTS = 'GET_ALL_WORKOUTS';
const GET_WORKOUT_DETAILS = 'GET_WORKOUT_DETAILS';
const DELETE_WORKOUT = 'DELETE_WORKOUT'

const getAllWorkouts = (workouts) => ({
    type: GET_ALL_WORKOUTS,
    payload: workouts
})

const getWorkoutDetails = (workout) => ({
    type: GET_WORKOUT_DETAILS,
    payload: workout
})

const deleteWorkout = (message) => ({
    type: DELETE_WORKOUT,
    payload: message
})

export const getAllWorkoutsThunk = () => async dispatch => {
    const response = await fetch('/api/workouts');
    if (response.ok) {
        const workouts = await response.json();
        dispatch(getAllWorkouts(workouts))
        return workouts
    } else {
        const errors = await response.json()
        return errors
    }
}

export const getWorkoutDetailsThunk = (workout_id) => async dispatch => {
    const response = await fetch(`/api/workouts/${workout_id}`);
    if (response.ok) {
        const workout_detail = await response.json();
        dispatch(getWorkoutDetails(workout_detail))
        return workout_detail
    } else {
        const errors = await response.json()
        return errors
    }
}

export const deleteWorkoutThunk = (workout_id) => async dispatch => {
    const response = await fetch(`/api/workouts/${workout_id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) {
        const message = await response.json();
        dispatch(deleteWorkout(message))
        return message
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = {}

function workoutsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_WORKOUTS:
            return { ...state, ...action.payload }
        case GET_WORKOUT_DETAILS:
            return { ...state, ...action.payload }
        case DELETE_WORKOUT:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default workoutsReducer
