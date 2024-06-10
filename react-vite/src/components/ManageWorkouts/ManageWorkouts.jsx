import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { getAllWorkoutsThunk, deleteWorkoutThunk } from '../../redux/workouts'

import './ManageWorkouts.css'

function ManageWorkouts() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const workouts_state = useSelector((state) => state.workouts)
    console.log(workouts_state)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllWorkoutsThunk())
        setIsLoaded(true)
    }, [dispatch, isLoaded])

    function workoutsMapper(workoutsArray) {
        if (!workoutsArray) return null
        const mappedWorkouts = workoutsArray.map((workout, id) => {
            return (
                <div>
                    <div className='workout-container' key={id}>
                        <div onClick={() => navigate(`/workouts/${workout.id}`)}>
                            <img className='workout-preview-image' src={workout.preview_img ? 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg' : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} />
                            <div id='workout-text-container'>
                                <div className='title'>{workout.title}</div>
                                <div className='workout-time'>Approximately {workout.duration} minutes</div>
                                <div className='workout-time'>{workout.private ? 'Hidden from ' : 'Shared to '}everyone</div>
                            </div>
                        </div>
                    </div>
                    <button className='edit-delete-button text-change button' onClick={() => navigate(`/workouts/${workout.id}/edit`)}>Edit</button>
                    <button className='edit-delete-button text-change button' onClick={(e) => deleteWorkout(e, workout.id)}>Delete</button>
                </div>

            )
        })
        return mappedWorkouts
    }

    const deleteWorkout = async (e, workout_id) => {
        e.preventDefault();
        dispatch(deleteWorkoutThunk(workout_id))
        setIsLoaded(false)
    }

    return (
        isLoaded &&
        <>
            <h1>Your Workouts</h1>
            <div className='all-workouts-container'>{workoutsMapper(workouts_state.current_user_workouts)}</div>
            {workouts_state.current_user_workouts?.length == 0 && <div>You do not own any workouts </div>}
        </>
    )
}

export default ManageWorkouts
