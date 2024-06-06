import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendsThunk } from '../../redux/friends'
import './Friends.css'

function Friends() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFriendsThunk())
    })

    return (
        <>
            <div>This is the Friends Page</div>
            <h1>Your Friends</h1>
            <div>Add a new friend</div>
            <input placeholder='Find a new friend'></input>
            <div>Friend Mapper</div>
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
