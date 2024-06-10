import workoutsReducer from "./workouts";

const GET_ALL_PUBLIC_EXERCISES = 'GET_ALL_PUBLIC_EXERCISES'

const getAllPublicExercises = (public_exercises) => ({
    type: GET_ALL_PUBLIC_EXERCISES,
    payload: public_exercises
})

export const getAllPublicExercisesThunk = () => async dispatch => {
    const response = await fetch('/api/public_exercises')
    if (response.ok) {
        const public_exercises = await response.json();
        dispatch(getAllPublicExercises(public_exercises))
        return public_exercises
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = {}

function publicExercisesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PUBLIC_EXERCISES:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default publicExercisesReducer
