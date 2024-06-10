import { useDispatch, useSelector } from 'react-redux';
import { getFriendsThunk, deleteFriendThunk } from '../redux/friends';
import { useModal } from "../context/Modal";

import './DeleteFriendModal.css'

function DeleteFriendModal({ friend }) {
    // console.log(friend)
    const user = useSelector((state) => state.session.user)

    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const deleteFriend = async (e, friend_id) => {
        e.preventDefault();
        dispatch(deleteFriendThunk(friend_id))
        closeModal()
    }

    return (
        <div>
            <div>Are you sure you want remove {friend.sender.id != user.id ? friend.sender.first_name : friend.receiver.first_name}?</div>
            <button type='button' className='button' onClick={(e) => deleteFriend(e, friend.sender.id != user.id ? friend.sender.id : friend.receiver.id)} >Yes</button>
            <button type='button' className='button' onClick={() => closeModal()}>No</button>
        </div>
    )
}

export default DeleteFriendModal
