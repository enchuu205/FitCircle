import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { getAllWorkoutsThunk } from '../../redux/workouts'

import './Homepage.css'

function HomePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.session.user)
    const workouts_state = useSelector((state) => state.workouts)
    // console.log(workouts_state)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllWorkoutsThunk())
        setIsLoaded(true)
    }, [dispatch])

    function workoutsMapper(workoutsArray, from_others) {
        // console.log(workoutsArray)
        if (!workoutsArray) return null
        const mappedWorkouts = workoutsArray.map((workout, id) => {
            return (
                <div className='workout-container' key={id} onClick={() => navigate(`/workouts/${workout.id}`)}>
                    <img className='workout-preview-image' src={workout.preview_img ? workout.preview_img : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} />
                    <div id='workout-text-container'>
                        <div className='title'>{workout.title}</div>
                        {from_others && <div className='sub-heading'>Created by {workout.user.first_name}</div>}
                        <div className='workout-time'>Approximately {workout.duration} minutes</div>
                    </div>
                </div>
            )
        })
        return mappedWorkouts
    }

    return (
        isLoaded && (
            <div className='homepage-container'>
                <h1>Hey {user.first_name},</h1>
                <div className='sub-heading'>Ready to start your next workout?</div>
                <h2>Your workouts</h2>
                <div className='all-workouts-container'>{workoutsMapper(workouts_state.current_user_workouts, false)}</div>
                {workouts_state.current_user_workouts?.length == 0 && <div>You do not own any workouts </div>}
                <h2>Find a workout</h2>
                <div className='all-workouts-container'>{workoutsMapper(workouts_state.public_workouts, true)}</div>
            </div>)
    )
}

export default HomePage
