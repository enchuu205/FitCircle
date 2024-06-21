import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal';
import DeleteFriendModal from '../DeleteFriendModal';
import { getFriendsThunk, addFriendThunk, acceptFriendRequestThunk, getSearchUsersThunk } from '../../redux/friends'

import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

import './Friends.css'

function Friends() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const friends_state = useSelector((state) => state.friends)
    const searched_users_state = useSelector((state) => state.friends?.search_users?.search_users)
    // console.log('this is the friends_state', friends_state)

    const { setModalContent } = useModal()

    const [isLoaded, setIsLoaded] = useState(false)
    const [addFriendInput, setAddFriendInput] = useState('')
    const [message, setMessage] = useState('')
    const [searchedUsers, setSearchedUsers] = useState([])
    const [addFriendUsername, setAddFriendUsername] = useState('')
    const [addFriendImage, setAddFriendImage] = useState('')
    const [visible, setVisible] = useState(false)
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
        if (addFriendUsername) {
            dispatch(addFriendThunk(addFriendUsername))
            setAddFriendInput('')
            setAddFriendUsername('')
            setAddFriendImage('')
            setVisible(false)
            setIsLoaded(false)
        }
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

    function handleClickUsername(username, image) {
        setAddFriendUsername(username)
        setAddFriendImage(image)
        setAddFriendInput('')
        setMessage('')
        setVisible(true)
    }

    useEffect(() => {
        dispatch(getFriendsThunk())
        setMessage(friends_state.add_friend?.message)
        setIsLoaded(true)
    }, [dispatch, friends_state.add_friend?.message, isLoaded])

    useEffect(() => {
        if (addFriendInput) {
            dispatch(getSearchUsersThunk(addFriendInput))
            setSearchedUsers(searched_users_state)
            // console.log(searchedUsers)
        }
    }, [dispatch, addFriendInput, searched_users_state])

    function searchedUsersListMapper() {
        if (!addFriendInput) {
            return (
                <></>
            )
        }
        const usersList = searchedUsers?.map((user, id) => {
            return (
                <div
                    className='button search-username selected-username'
                    key={id}
                    onClick={() => handleClickUsername(user.username, user.profile_picture)}
                >{user.username}</div>
            )
        })
        return usersList
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        isLoaded && (
            <div className='friends-page-container'>
                <div>
                    <h1>Your Friends</h1>
                    <div className='accepted-friends-list'>{friendsMapper(friends_state.all_friends?.accepted_friends, true)}</div>
                    <h1>Your Requests</h1>
                    <div>{friendsMapper(friends_state.all_friends?.pending_friends, false)}</div>
                </div>
                <div className='add-friend-container'>
                    <div className='heading'>Add a new friend</div>
                    <form onSubmit={handleFriendRequest} >
                        <input
                            placeholder='Find a new friend'
                            value={addFriendInput}
                            onChange={(e) => setAddFriendInput(e.target.value)}
                            style={{ marginTop: '5px' }}
                        ></input>
                        <span className='right'>{message}</span>
                        <div className='new-friends-list-container' style={{ marginTop: '20px' }}>
                            <div style={{ color: 'gray' }}>
                                Select a new user to add
                            </div>
                            <hr className='extend' />
                            {searchedUsersListMapper()}
                        </div>

                        <div
                            style={{ display: visible ? '' : 'none' }}
                        >
                            <div className='search-friend-confirmation' style={{ margin: '10px' }}>
                                <img className='profile-picture' src={addFriendImage} />
                                <div style={{ paddingLeft: '15px' }}>Add {addFriendUsername} as a friend?</div>
                            </div>
                            <button
                                className={`button edit-delete-button text-change`}
                            >
                                Add Friend
                            </button>
                        </div>

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
            </div>
        )
    )
}

export default Friends
