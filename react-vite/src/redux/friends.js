const GET_FRIENDS = 'GET_FRIENDS';

const getFriends = (friends) => ({
    type: GET_FRIENDS,
    payload: friends
});

export const getFriendsThunk = () => async dispatch => {
    const response = await fetch('/api/friends');
    if (response.ok) {
        // console.log(response)
        const friends = await response.json();
        dispatch(getFriends(friends))
        return friends
    } else {
        const errors = await response.json()
        return errors
    }

}

const initialState = {};

function friendsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FRIENDS:
            return { ...state, friends: action.payload }
        default:
            return state;
    }
}

export default friendsReducer
