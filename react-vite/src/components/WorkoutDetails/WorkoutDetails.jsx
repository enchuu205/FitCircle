import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getWorkoutDetailsThunk } from '../../redux/workouts'

import './WorkoutDetails.css'

function WorkoutDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState({})
    const [countdown, setCountdown] = useState(0)

    const workout_detail_state = useSelector((state) => state.workouts.workout_detail)
    // console.log(workout_detail_state)

    function monthAndYear(created_at) {
        // console.log(updated_at)
        let monthsOfYear = ["January", "February", 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
        let month = monthsOfYear[new Date(created_at).getMonth()]
        let year = new Date(created_at).getFullYear()
        return (<>{`${month} ${year}`}</>)
    }

    function exercisesMapper(exercises) {
        const mappedExercises = exercises.map((exercise, id) => {
            return (
                <div key={id} className='exercise-container' onClick={() => setSelectedExercise(exercise)}>
                    <img className='exercise-img' src={exercise.img ? exercise.img : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} />
                    <div className='exercise-name'>{exercise.name}</div>
                    {/* <hr /> */}
                </div>

            )
        })
        return mappedExercises
    }

    function selecetedExerciseDetails(exercise) {
        if (Object.keys(exercise).length == 0) return <div></div>
        return (
            <div key={id} className='selected-exercise-container'>
                <img className='exercise-img-detail' src={exercise.img ? exercise.img : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} />
                <div>
                    <div className='name detail-name'>{exercise.name}</div>
                    <div className='sub-heading detail-description'>{exercise.description}</div>
                </div>
            </div>
        )
    }

    // while (countdown != 0) {
    //     setCountdown(countdown - 1)
    // }

    useEffect(() => {
        dispatch(getWorkoutDetailsThunk(id))
        setIsLoaded(true)
    }, [dispatch, id])

    if (!isLoaded || !workout_detail_state) {
        return <div>Loading...</div>
    }

    return (
        isLoaded && (
            <div className='workout-details-container'>
                <div className='workout-details-main-info'>
                    <img className='preview-image' src={workout_detail_state.preview_img ? workout_detail_state.preview_img : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} />
                    <div className='main-info-text'>
                        <div>
                            <h2>{workout_detail_state.title}</h2>
                            <div className='sub-heading'>Approximately {workout_detail_state.duration} minutes</div>
                            <div className='sub-heading '>Created by {workout_detail_state.user.first_name} - {monthAndYear(workout_detail_state.created_at)}</div>
                        </div>
                        <button className='complete-workout button text-change' onClick={() => navigate('/home')}>Complete Workout</button>
                    </div>
                </div>
                <hr />
                {workout_detail_state.public_exercises.length != 0 ?
                    <div className='all-exercises-details-container'>
                        <div>
                            <div className='heading'>Exercises:</div>
                            <div className='all-exercises-container'>{exercisesMapper(workout_detail_state.public_exercises)}</div>
                        </div>
                        {/* <hr /> */}
                        <div className='exercise-details-container'>{selecetedExerciseDetails(selectedExercise)}</div>
                    </div>
                    :
                    <div>There are no exercises in this workout</div>
                }
                <div>
                    {countdown}
                    <button className='button edit-delete-button text-change' type='button' value='30' onClick={() => setCountdown(countdown + 30)}>30</button>
                    <button className='button edit-delete-button text-change' type='button' value='60' onClick={() => setCountdown(countdown + 60)}>60</button>
                    <button className='button edit-delete-button text-change' type='button' value='90' onClick={() => setCountdown(countdown + 90)}>90</button>
                    <button className='button edit-delete-button text-change' type='button' value='120' onClick={() => setCountdown(countdown + 120)}>120</button>
                </div>
            </div>)
    )
}

export default WorkoutDetails
