const GET_ALL_WORKOUTS = 'GET_ALL_WORKOUTS';
const GET_WORKOUT_DETAILS = 'GET_WORKOUT_DETAILS';
const CREATE_WORKOUT = 'CREATE_WORKOUT'
const UPDATE_WORKOUT = 'UPDATE_WORKOUT'
const DELETE_WORKOUT = 'DELETE_WORKOUT'

const getAllWorkouts = (workouts) => ({
    type: GET_ALL_WORKOUTS,
    payload: workouts
})

const getWorkoutDetails = (workout) => ({
    type: GET_WORKOUT_DETAILS,
    payload: workout
})

const createWorkout = (workout) => ({
    type: CREATE_WORKOUT,
    payload: workout
})

const updateWorkout = (updated_workout) => ({
    type: UPDATE_WORKOUT,
    payload: updated_workout
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

export const createWorkoutThunk = (new_workout) => async dispatch => {
    const response = await fetch(`/api/workouts/new`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_workout),
    })
    if (response.ok) {
        const workout = await response.json()
        dispatch(createWorkout(workout))
        return workout
    } else {
        const errors = await response.json()
        return errors
    }
}

export const updateWorkoutThunk = (existing_workout) => async dispatch => {
    const response = await fetch(`/api/workouts/${existing_workout.id}/update`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(existing_workout),
    })
    if (response.ok) {
        const updated_workout = await response.json()
        dispatch(updateWorkout(updated_workout))
        return updated_workout
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
        case CREATE_WORKOUT:
            return { ...state, new_user_workouts: action.payload }
        case UPDATE_WORKOUT:
            return { ...state, updated_user_workouts: action.payload }
        case DELETE_WORKOUT:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default workoutsReducer
