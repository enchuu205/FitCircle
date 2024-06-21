const GET_FRIENDS = 'GET_FRIENDS';
const GET_SEARCH_USERS = 'GET_SEARCH_USERS'
const ADD_FRIEND = 'ADD_FRIEND'
const ACCEPT_FRIEND = 'ACCEPT_FRIEND'
const DELETE_FRIEND = 'DELETE_FRIEND'

const getFriends = (friends) => ({
    type: GET_FRIENDS,
    payload: friends
});

const getSearchUsers = (users) => ({
    type: GET_SEARCH_USERS,
    payload: users
})

const addFriend = (message) => ({
    type: ADD_FRIEND,
    payload: message
})

const acceptFriend = (message) => ({
    type: ACCEPT_FRIEND,
    payload: message
})


const deleteFriend = (message) => ({
    type: DELETE_FRIEND,
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

export const getSearchUsersThunk = (addFriendInput) => async dispatch => {
    const response = await fetch(`/api/friends/search/${addFriendInput}`)
    if (response.ok) {
        const search_users = await response.json();
        dispatch(getSearchUsers(search_users))
        return search_users
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

export const acceptFriendRequestThunk = (sender_id) => async dispatch => {
    const response = await fetch(`/api/friends/accept-friend/${sender_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    )
    if (response.ok) {
        const message = await response.json();
        dispatch(acceptFriend(message))
        return message
    } else {
        const errors = await response.json()
        return errors
    }
}

export const deleteFriendThunk = (friend_id) => async dispatch => {
    const response = await fetch(`/api/friends/${friend_id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) {
        const message = await response.json();
        dispatch(deleteFriend(message))
        return message
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = { all_friends: null, add_friend: null, accept_friend: null, delete_friend: null };

function friendsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FRIENDS:
            return { ...state, all_friends: action.payload }
        case GET_SEARCH_USERS:
            return { ...state, search_users: action.payload }
        case ADD_FRIEND:
            return { ...state, add_friend: action.payload }
        case ACCEPT_FRIEND:
            return { ...state, accept_friend: action.payload }
        case DELETE_FRIEND:
            return { ...state, delete_friend: action.payload }
        default:
            return state;
    }
}

export default friendsReducer
