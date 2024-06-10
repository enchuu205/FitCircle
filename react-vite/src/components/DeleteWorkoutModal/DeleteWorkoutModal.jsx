import { useDispatch } from 'react-redux';
import { getAllWorkoutsThunk, deleteWorkoutThunk } from '../../redux/workouts'
import { useModal } from "../../context/Modal";

import './DeleteWorkoutModal.css'

function DeleteWorkoutModal({ workout }) {
    // const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const deleteWorkout = async (e, workout_id) => {
        e.preventDefault();
        dispatch(deleteWorkoutThunk(workout_id))
        dispatch(getAllWorkoutsThunk())
        closeModal()
        location.reload()
    }

    return (
        <div className='modal-container'>
            <div className='confirmation-text'>Are you sure you want remove {workout.title}?</div>
            <div className='buttons-container'>
                <button type='button' id='red' className='edit-delete-button button text-change' onClick={(e) => deleteWorkout(e, workout.id)} >Delete</button>
                <button type='button' className='edit-delete-button button text-change' onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteWorkoutModal
