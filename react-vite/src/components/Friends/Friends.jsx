import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendsThunk, addFriendThunk } from '../../redux/friends'
import { useState } from 'react'
import './Friends.css'

function Friends() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const friends_state = useSelector((state) => state.friends)
    // console.log('this is the friends_state', friends_state)

    const [isLoaded, setIsLoaded] = useState(false)
    const [addFriendInput, setAddFriendInput] = useState('')

    function monthAndYear(updated_at) {
        // console.log(updated_at)
        let monthsOfYear = ["January", "February", 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
        let month = monthsOfYear[new Date(updated_at).getMonth()]
        let year = new Date(updated_at).getFullYear()
        return (<div>{`Friends since ${month} ${year}`}</div>)
    }

    function friendsMapper(friends, accepted) {
        // console.log(friends)
        if (friends && friends.length > 0) {
            // Currently your friends and your pending friends can’t tell which id is the user and which is the friend
            const mappedFriends = friends.map((friend, id) => {
                if (accepted)
                    return (
                        <div key={id}>
                            <div>{friend.sender.id != user.id ? friend.sender.first_name : friend.receiver.first_name}</div>
                            <div>{monthAndYear(friend.updated_at)}</div>
                            <div >Remove Friend</div>
                            <hr></hr>
                        </div>
                    )
                else
                    if (friend.sender.id != user.id) {
                        return (
                            <div key={id}>
                                <div>{friend.sender.id != user.id ? friend.sender.first_name : friend.receiver.first_name}</div>
                                <div>Accept Friend Request</div>
                                <div>Decline Friend Request</div>
                                <hr></hr>
                            </div>
                        )
                    } else return null
            })
            return mappedFriends
        } else {
            return <div>Let's add a new friend!</div>
        }
    }

    const handleFriendRequest = async (e) => {
        e.preventDefault();
        const serverResponse = dispatch(addFriendThunk(addFriendInput))
        setAddFriendInput('')
        setIsLoaded(false)
    }

    useEffect(() => {
        dispatch(getFriendsThunk())
        setIsLoaded(true)
    }, [dispatch, isLoaded])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        isLoaded && (
            <>
                <div>This is the Friends Page</div>
                <h1>Your Friends</h1>
                {/* friends mapper causes a crash because it runs before isloaded is set to true */}
                <div>{friendsMapper(friends_state.all_friends?.accepted_friends, true)}</div>
                <div>Add a new friend</div>
                <form onSubmit={handleFriendRequest} >
                    <input
                        placeholder='Find a new friend'
                        value={addFriendInput}
                        onChange={(e) => setAddFriendInput(e.target.value)}
                    ></input>
                    {friends_state.add_friend?.message && friends_state.add_friend?.message}
                </form >
                <h1>Your Requests</h1>
                <div>{friendsMapper(friends_state.all_friends?.pending_friends, false)}</div>

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
    )
}

export default Friends
