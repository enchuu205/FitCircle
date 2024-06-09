const GET_ALL_WORKOUTS = 'GET_ALL_WORKOUTS';

const getAllWorkouts = (workouts) => ({
    type: GET_ALL_WORKOUTS,
    payload: workouts
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

const initialState = {}

function workoutsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_WORKOUTS:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default workoutsReducer
