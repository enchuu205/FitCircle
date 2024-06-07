import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendsThunk, addFriendThunk } from '../../redux/friends'
import { useState } from 'react'
import './Friends.css'

function Friends() {
    const dispatch = useDispatch()
    const friends_state = useSelector((state) => state.friends)
    console.log('this is the friends_state', friends_state)

    const [isLoaded, setIsLoaded] = useState(false)
    const [addFriendInput, setAddFriendInput] = useState('')

    function friendsMapper(all_friends) {
        // console.log('all', all_friends)
        // const mappedFriends = all_friends.map((friend, id) => {
        //     return (
        //         <div key={id}>{friend.user_1_id}</div>
        //     )
        // })
        // return mappedFriends
    }

    const handleFriendRequest = async (e) => {
        e.preventDefault();
        const serverResponse = dispatch(addFriendThunk(addFriendInput))
        setAddFriendInput('')
        dispatch(getFriendsThunk())
    }

    useEffect(() => {
        dispatch(getFriendsThunk())
        setIsLoaded(true)
    }, [dispatch])

    return (
        isLoaded &&
        <>
            <div>This is the Friends Page</div>
            <h1>Your Friends</h1>
            <div>Add a new friend</div>
            <form onSubmit={handleFriendRequest} >
                <input
                    placeholder='Find a new friend'
                    value={addFriendInput}
                    onChange={(e) => setAddFriendInput(e.target.value)}
                ></input>
                {friends_state?.add_friend?.message && friends_state.add_friend.message}
            </form >
            <div>{friendsMapper(friends_state.all_friends)}</div>
            <h1>Your Requests</h1>
            <div>Friend Request Mapper</div>

            {/* Friend detail */}
            <div>
                <hr></hr>
                <div>Friend PFP</div>
                <div>Friend City and State</div>
                <div># Workouts, # Exercises</div>
                <button>Remove Friend</button>
            </div>
        </>
    )
}

export default Friends
