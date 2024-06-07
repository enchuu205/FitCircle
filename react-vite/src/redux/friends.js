const GET_FRIENDS = 'GET_FRIENDS';
const ADD_FRIEND = 'ADD_FRIEND'

const getFriends = (friends) => ({
    type: GET_FRIENDS,
    payload: friends
});

const addFriend = (message) => ({
    type: ADD_FRIEND,
    payload: message
})

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

export const addFriendThunk = (username) => async dispatch => {
    const response = await fetch(`/api/friends/add-friend/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    )
    if (response.ok) {
        const message = await response.json();
        dispatch(addFriend(message))
        return message
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = {};

function friendsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FRIENDS:
            return { ...state, all_friends: action.payload }
        case ADD_FRIEND:
            return { ...state, add_friend: action.payload }
        default:
            return state;
    }
}

export default friendsReducer
