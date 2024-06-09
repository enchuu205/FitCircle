import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getWorkoutDetailsThunk } from '../../redux/workouts'

import './WorkoutDetails.css'

function WorkoutDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const workout_detail_state = useSelector((state) => state.workouts.workout_detail)
    // console.log(workout_detail_state)

    function monthAndYear(created_at) {
        // console.log(updated_at)
        let monthsOfYear = ["January", "February", 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
        let month = monthsOfYear[new Date(created_at).getMonth()]
        let year = new Date(created_at).getFullYear()
        return (<div>{`${month} ${year}`}</div>)
    }

    function exercisesMapper(exercises) {
        const mappedExercises = exercises.map((exercise, id) => {
            return (
                <div key={id}>
                    <img className='exercise-img' src={exercise.img ? 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg' : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} />
                    <div>{exercise.name}</div>
                    <hr />
                </div>

            )
        })
        return mappedExercises
    }

    useEffect(() => {
        dispatch(getWorkoutDetailsThunk(1))
        setIsLoaded(true)
    }, [dispatch])

    if (!isLoaded || !workout_detail_state) {
        return <div>Loading...</div>
    }

    return (
        isLoaded && (
            <div>
                <div>This is the workout detail for {id}</div>
                <img className='preview-image' src={workout_detail_state.preview_img ? 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg' : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} />
                <div>{workout_detail_state.title}</div>
                <div>Duration {workout_detail_state.duration}</div>
                <div>Created by {workout_detail_state.user.first_name} - {monthAndYear(workout_detail_state.created_at)}</div>
                <button>Complete Workout</button>
                <hr />
                <div className='all-exercises-container'>{exercisesMapper(workout_detail_state.public_exercises)}</div>
            </div>)
    )
}

export default WorkoutDetails
