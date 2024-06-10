import { useDispatch, useSelector } from 'react-redux';
import { deleteFriendThunk, getFriendsThunk } from '../../redux/friends';
import { useModal } from "../../context/Modal";

import './DeleteFriendModal.css'

function DeleteFriendModal({ friend }) {
    // console.log(friend)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const deleteFriend = async (e, friend_id) => {
        e.preventDefault();
        dispatch(deleteFriendThunk(friend_id))
        dispatch(getFriendsThunk())
        closeModal()
        location.reload()
    }

    return (
        <div className='modal-container'>
            <div className='confirmation-text'>Are you sure you want remove {friend.sender.id != user.id ? friend.sender.first_name : friend.receiver.first_name}?</div>
            <div className='buttons-container'>
                <button type='button' id='red' className='edit-delete-button button text-change' onClick={(e) => deleteFriend(e, friend.sender.id != user.id ? friend.sender.id : friend.receiver.id)} >Delete</button>
                <button type='button' className='edit-delete-button button text-change' onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteFriendModal
