import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal';
import DeleteFriendModal from '../DeleteFriendModal';
import { getFriendsThunk, addFriendThunk, acceptFriendRequestThunk, deleteFriendThunk } from '../../redux/friends'

import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

import './Friends.css'

function Friends() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const friends_state = useSelector((state) => state.friends)
    // console.log('this is the friends_state', friends_state)

    const { setModalContent, setOnModalClose } = useModal()

    const [isLoaded, setIsLoaded] = useState(false)
    const [addFriendInput, setAddFriendInput] = useState('')
    const [message, setMessage] = useState('')
    // const [showDeleteFriendModal, setShowDeleteFriendModal] = useState(false)
    // const [friendToDelete, setFriendToDelete] = useState('')

    const openDeleteModal = (friend) => {
        setModalContent(
            <DeleteFriendModal
                friend={friend}
            />
        )
    }

    function monthAndYear(updated_at) {
        // console.log(updated_at)
        let monthsOfYear = ["January", "February", 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
        let month = monthsOfYear[new Date(updated_at).getMonth()]
        let year = new Date(updated_at).getFullYear()
        return (`${month} ${year}`)
    }
    function friendProfilePicture(friend) {
        if (friend.sender.id != user.id) {
            return <img className='profile-picture' src={friend.sender.profile_picture ? friend.sender.profile_picture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} />
        } else return <img className='profile-picture' src={friend.receiver.profile_picture ? friend.receiver.profile_picture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} />
    }

    function friendsMapper(friends, accepted) {
        // console.log(friends)
        if (friends && friends.length > 0) {
            // Currently your friends and your pending friends can’t tell which id is the user and which is the friend
            const mappedFriends = friends.map((friend, id) => {
                if (accepted)
                    return (
                        <div key={id} className='friend-container'>
                            <div className='grid-profile-picture'>{friendProfilePicture(friend)}</div>
                            <h3 className='grid-friend-name'>{friend.sender.id != user.id ? friend.sender.first_name : friend.receiver.first_name}</h3>
                            <div className='grid-friends-since'>Friends since {monthAndYear(friend.updated_at)}</div>
                            {/* <MdCancel className='grid-remove-friend remove-friend button' onClick={(e) => deleteFriend(e, friend.sender.id != user.id ? friend.sender.id : friend.receiver.id)} /> */}
                            <MdCancel className='grid-remove-friend remove-friend button' onClick={() => openDeleteModal(friend)} />
                        </div>
                    )
                else
                    if (friend.sender.id != user.id) {
                        return (
                            <div key={id} className='friend-container'>
                                <div className='grid-profile-picture'>{friendProfilePicture(friend)}</div>
                                <h3 className='grid-friend-name'>{friend.sender.id != user.id ? friend.sender.first_name : friend.receiver.first_name}</h3>
                                <div className='grid-friends-since'>wants to be your friend!</div>
                                <IoIosCheckmarkCircle className='grid-accept-friend accept-friend button' onClick={(e) => acceptFriendRequest(e, friend.sender.id)} />
                                {/* <MdCancel className='grid-remove-friend remove-friend button' onClick={(e) => deleteFriend(e, friend.sender.id)} /> */}
                                <MdCancel className='grid-remove-friend remove-friend button' onClick={() => openDeleteModal(friend)} />
                            </div>
                        )
                    } else {
                        return (
                            <div key={id} className='friend-container'>
                                <div className='grid-profile-picture'>{friendProfilePicture(friend)}</div>
                                <h3 className='grid-friend-name'>{friend.receiver.first_name}</h3>
                                <div className='grid-friends-since'>sent from you in {monthAndYear(friend.created_at)} </div>
                                <MdCancel className='grid-remove-friend remove-friend button' onClick={() => openDeleteModal(friend)} />
                            </div>
                        )
                    }
            })
            return mappedFriends
        } else {
            if (accepted) return <div >Let&apos;s add a new friend!</div>
            if (!accepted) return <div>No incoming friend requests.</div>
        }
    }

    const handleFriendRequest = async (e) => {
        e.preventDefault();
        dispatch(addFriendThunk(addFriendInput))
        setAddFriendInput('')
        setIsLoaded(false)
    }

    const acceptFriendRequest = async (e, sender_id) => {
        e.preventDefault();
        dispatch(acceptFriendRequestThunk(sender_id))
        setIsLoaded(false)
    }

    // const deleteFriend = async (e, friend_id) => {
    //     e.preventDefault();
    //     dispatch(deleteFriendThunk(friend_id))
    //     setIsLoaded(false)
    // }

    useEffect(() => {
        dispatch(getFriendsThunk())
        setMessage(friends_state.add_friend?.message)
        setIsLoaded(true)
    }, [dispatch, friends_state.add_friend?.message, isLoaded])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        isLoaded && (
            <>
                <h1>Your Friends</h1>
                <div className='accepted-friends-list'>{friendsMapper(friends_state.all_friends?.accepted_friends, true)}</div>
                <h1>Your Requests</h1>
                <div>{friendsMapper(friends_state.all_friends?.pending_friends, false)}</div>
                <div className='add-friend-container'>
                    <div className='heading'>Add a new friend</div>
                    <form onSubmit={handleFriendRequest} >
                        <input
                            placeholder='Find a new friend'
                            value={addFriendInput}
                            onChange={(e) => setAddFriendInput(e.target.value)}
                        ></input>
                        <span className='right'>{message}</span>
                    </form >
                </div>

                {/* Friend detail */}
                {/* <div>
                    <hr></hr>
                    <div>Friend PFP</div>
                    <div>Friend City and State</div>
                    <div># Workouts, # Exercises</div>
                    <button>Remove Friend</button>
                </div> */}
            </>
        )
    )
}

export default Friends
