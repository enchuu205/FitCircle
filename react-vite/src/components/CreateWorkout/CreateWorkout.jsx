import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getAllPublicExercisesThunk } from '../../redux/public_exercises'
import { createWorkoutThunk, getWorkoutDetailsThunk, updateWorkoutThunk } from '../../redux/workouts'
import { MdCancel } from "react-icons/md";

import '../WorkoutDetails/WorkoutDetails.css'
import './CreateWorkout.css'

function CreateWorkout({ edit }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState(false)
    const [title, setTitle] = useState('')
    const [duration, setDuration] = useState(0)
    const [previewImg, setPreviewImg] = useState('')
    const [privated, setPrivated] = useState(true)
    const [selectedExercise, setSelectedExercise] = useState('')
    const [exerciseArr, setExerciseArr] = useState([])

    const { id } = useParams()
    const user = useSelector((state) => state.session.user)
    const public_exercises = useSelector((state) => state.public_exercises.all_public_exercises)
    const workout_details = useSelector((state) => state.workouts.workout_detail)
    // console.log(workout_details)

    useEffect(() => {
        dispatch(getAllPublicExercisesThunk())
        setIsLoaded(true)
        if (edit) {
            dispatch(getWorkoutDetailsThunk(id))
        }
    }, [dispatch, id, edit])

    useEffect(() => {
        if (edit && workout_details) {
            setTitle(workout_details?.title)
            setDuration(workout_details?.duration)
            setPreviewImg(workout_details?.preview_img)
            setPrivated(workout_details?.private)
            setExerciseArr(workout_details?.public_exercises.map((exercise) => exercise.id))
        } else {
            setTitle('')
            setDuration(0)
            setPreviewImg('')
            setPrivated(true)
            setSelectedExercise('')
            setExerciseArr([])
        }
    }, [workout_details, edit])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit && workout_details) {
            const updated_workout = {
                id: workout_details.id,
                user_id: user.id,
                title: title ? title : 'New Workout',
                duration: duration,
                preview_img: previewImg,
                private: privated,
                public_exercise_arr: exerciseArr
            }
            const response = await dispatch(updateWorkoutThunk(updated_workout))
            navigate(`/workouts/${response.id}`)

        } else {
            const new_workout = {
                user_id: user.id,
                title: title ? title : 'New Workout',
                duration: duration,
                preview_img: previewImg,
                private: privated,
                public_exercise_arr: exerciseArr
            }
            // console.log(new_workout)
            const response = await dispatch(createWorkoutThunk(new_workout))
            navigate(`/workouts/${response.id}`)
        }

    }

    function allExercisesOptions(exercises) {
        const mappedExercisesOptions = exercises?.map((exercise, id) => {
            return (
                <option key={id} value={exercise.id}>
                    {/* <img src={exercise.img} /> */}
                    {exercise.name}
                </option>
            )
        })
        return mappedExercisesOptions
    }

    function addedExercises(exercises, exerciseArr) {
        // console.log(exercises, exerciseArr)
        const filteredExercises = exercises?.filter((exercise) => exerciseArr?.includes(exercise.id))
        // console.log(filteredExercises)
        const sortedFilteredExercises = filteredExercises?.sort((a, b) => exerciseArr.indexOf(a.id) - exerciseArr.indexOf(b.id))

        const mappedAddedExercises = sortedFilteredExercises?.map((exercise, id) => {
            return (
                <div key={id} className='exercise-container'>
                    <img className='exercise-img' src={exercise.img} />
                    <div>{exercise.name}</div>
                    {/* <div>{exercise.description}</div> */}
                    <MdCancel className='right remove-friend button' onClick={() => removeFromExerciseArr(exercise.id)} />
                    <hr />
                </div>
            )
        })
        return mappedAddedExercises
    }

    function selectedExerciseDetail(selectedExerciseId) {
        const selectedExercise = public_exercises.find((public_exercise) => public_exercise.id == selectedExerciseId)
        // console.log(selectedExerciseId, selectedExercise)
        return (
            <div className='selected-exercise-container'>
                <img className='exercise-img-detail' src={selectedExercise.img} />
                <div>
                    <div className='name detail-name'>{selectedExercise.name}</div>
                    <div className='sub-heading detail-description'>{selectedExercise.description}</div>
                </div>
                <button className='complete-workout button text-change' type='button' value={selectedExercise.id} onClick={(e) => addToExerciseArr(e)}>Add to workout</button>
            </div >
        )
    }

    function addToExerciseArr(e) {
        if (!exerciseArr.includes(parseInt(e.target.value))) {
            setExerciseArr([...exerciseArr, parseInt(e.target.value)])
        }
    }

    function removeFromExerciseArr(exercise_id) {
        let index = exerciseArr.indexOf(exercise_id)
        let newExerciseArr = exerciseArr.toSpliced(index, 1)
        setExerciseArr(newExerciseArr)
    }

    const handlePrivated = (e) => {
        setPrivated(e.target.value === 'true')
    }

    return (
        isLoaded &&
        <>
            <form>
                <div className='workout-details-main-info'>
                    <img className='workout-preview-img' src={workout_details?.preview_img ? workout_details.preview_img : 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg'} alt='Workout Preview Image'></img>
                    <div className='main-info'>
                        <div>
                            <div>Workout Name:</div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div >
                            About how long does this workout last?
                            <div>
                                <input
                                    type="number"
                                    className='duration'
                                    value={duration}
                                    onChange={(e) => setDuration(parseInt(e.target.value))}
                                    min={0}
                                    max={300}
                                    required
                                />
                                {` minutes`}</div>
                        </div>
                        <div>
                            <div>
                                Do you want to share this with others?
                            </div>
                            <input
                                type='radio'
                                name='private'
                                value={false}
                                className='button'
                                onChange={handlePrivated}
                                checked={privated === false} />
                            <label>Yes</label>
                            <input
                                type='radio'
                                name='private'
                                value={true}
                                className='button'
                                onChange={handlePrivated}
                                checked={privated === true} />
                            <label>No</label>
                        </div>
                        <button className='complete-workout button text-change' onClick={handleSubmit}>{edit ? 'Update ' : 'Create '} Workout</button>
                    </div>
                </div>

                <div className='grid-exercises'>
                    <div className='exercise-list-container'>
                        <div className='heading'>Exercises:</div>
                        {(exerciseArr?.length == 0) ? (<div>Add a workout!</div>) :
                            <div className='added-exercises-container'>
                                <div>{addedExercises(public_exercises, exerciseArr)}</div>
                            </div>
                        }

                    </div>
                    <div className='add-exercise-container'>
                        <div className=''>
                            <div className='heading'>Add an Exercise:</div>
                            <select
                                value={selectedExercise}
                                onChange={(e) => setSelectedExercise(e.target.value)}
                                className='button'
                            >
                                <option value="">Select an exercise</option>
                                {allExercisesOptions(public_exercises)}
                            </select>
                        </div>
                        <hr />
                        <div className=''>
                            <div>{selectedExercise && selectedExerciseDetail(selectedExercise)}</div>
                        </div>
                    </div>


                </div>
            </form >
        </>
    )
}

export default CreateWorkout
