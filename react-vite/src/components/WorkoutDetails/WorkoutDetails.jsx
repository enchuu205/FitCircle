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
                    <img className='exercise-img' src={exercise.img ? 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg' : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} />
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
            <div key={id} className='exercise-detail-container'>
                <img className='exercise-img-detail' src={exercise.img ? 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg' : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} />
                <div className='exercise-name-detail'>{exercise.name}</div>
                <div className='sub-heading'>{exercise.description}</div>
            </div>
        )
    }

    useEffect(() => {
        dispatch(getWorkoutDetailsThunk(id))
        setIsLoaded(true)
    }, [dispatch])

    if (!isLoaded || !workout_detail_state) {
        return <div>Loading...</div>
    }

    return (
        isLoaded && (
            <div className='workout-details-container'>
                <div className='workout-details-main-info'>
                    <img className='preview-image' src={workout_detail_state.preview_img ? 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg' : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} />
                    <div className='main-info-text'>
                        <div>
                            <h2>{workout_detail_state.title}</h2>
                            {/* <div className='sub-heading'>Approximately {workout_detail_state.duration} minutes</div> */}
                            <div className='sub-heading '>Created by {workout_detail_state.user.first_name} - {monthAndYear(workout_detail_state.created_at)}</div>
                        </div>
                        <button className='complete-workout button' onClick={() => navigate('/home')}>Complete Workout</button>
                    </div>
                </div>
                <hr />
                <div className='all-exercises-details-container'>
                    <div>
                        <div>Exercises:</div>
                        <div className='all-exercises-container'>{exercisesMapper(workout_detail_state.public_exercises)}</div>
                    </div>
                    {/* <hr /> */}
                    <div className='exercise-details-container'>{selecetedExerciseDetails(selectedExercise)}</div>
                </div>
            </div>)
    )
}

export default WorkoutDetails
