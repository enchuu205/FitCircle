import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getAllPublicExercisesThunk } from '../../redux/public_exercises'
import { createWorkoutThunk } from '../../redux/workouts'
import './CreateWorkout.css'

function CreateWorkout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState(false)
    const [title, setTitle] = useState('')
    const [duration, setDuration] = useState(0)
    const [previewImg, setPreviewImg] = useState('')
    const [privated, setPrivated] = useState(true)
    const [selectedExercise, setSelectedExercise] = useState('')
    const [exerciseArr, setExerciseArr] = useState([])

    const user = useSelector((state) => state.session.user)
    const public_exercises = useSelector((state) => state.public_exercises.all_public_exercises)
    // console.log(public_exercises)

    useEffect(() => {
        dispatch(getAllPublicExercisesThunk())
        setIsLoaded(true)
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const new_workout = {
            user_id: user.id,
            title: title,
            duration: duration,
            preview_img: previewImg,
            private: privated
        }
        const response = await dispatch(createWorkoutThunk(new_workout))
        navigate(`/workouts/${response.id}`)

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
        console.log(exercises, exerciseArr)
        const filteredExercises = exercises?.filter((exercise) => exerciseArr.includes(exercise.id))
        // console.log(filteredExercises)
        const mappedAddedExercises = filteredExercises?.map((exercise, id) => {
            return (
                <div key={id}>
                    {/* <img src={exercise.img} /> */}
                    <div>{exercise.name}</div>
                    <div>{exercise.description}</div>
                </div>
            )
        })
        return mappedAddedExercises
    }

    function selectedExerciseDetail(selectedExerciseId) {
        const selectedExercise = public_exercises.find((public_exercise) => public_exercise.id == selectedExerciseId)
        // console.log(selectedExerciseId, selectedExercise)
        return (
            <>
                <div>{selectedExercise.name}</div>
                <div>{selectedExercise.description}</div>
                <button type='button' value={selectedExercise.id} onClick={(e) => setExerciseArr([...exerciseArr, parseInt(e.target.value)])}>Add to workout</button>
            </>
        )
    }

    return (
        isLoaded &&
        <>
            <div>Create Workout Page</div>
            <form>
                <img className='workout-preview-img' src='https://res.cloudinary.com/dztk9g8ji/image/upload/v1717899260/5-chest-workouts-for-mass-header-v2-830x467_yxfvwf.jpg' alt='Workout Preview Image'></img>
                <div>
                    Insert Title Here
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    About how long does this workout last?
                    <div>__ minutes</div>
                    <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
                <div>
                    Do you want to share this with others?
                    <button type='button' onClick={() => setPrivated(false)}>Yes</button>
                    <button type='button' onClick={() => setPrivated(true)}>No</button>
                </div>
                <button onClick={handleSubmit}>Create Workout</button>

                <hr></hr>
                <div>Exercises</div>
                <div>
                    <div>{addedExercises(public_exercises, exerciseArr)}</div>
                </div>

                <hr></hr>
                <div>Add an Exercise</div>
                <select
                    value={selectedExercise}
                    onChange={(e) => setSelectedExercise(e.target.value)}
                >
                    {allExercisesOptions(public_exercises)}
                </select>

                <hr></hr>
                <div>Exercise detail</div>
                <div>{selectedExercise && selectedExerciseDetail(selectedExercise)}</div>
            </form>
        </>
    )
}

export default CreateWorkout
