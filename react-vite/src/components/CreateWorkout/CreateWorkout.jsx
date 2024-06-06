import './CreateWorkout.css'

function CreateWorkout() {
    return (
        <>
            <div>Create Workout Page</div>
            <img alt='Workout Preview Image'></img>
            <div>Insert Title Here</div>
            <div>About how long does this workout last?</div>
            <div>__ minutes</div>
            <button>Create Workout</button>

            <hr></hr>
            <div>Exercises</div>
            <div>
                <div>Exercise mapper function</div>
            </div>

            <hr></hr>
            <div>Add an Exercise</div>
            <div>Scroll of adding an exercise</div>

            <hr></hr>
            <div>Exercise detail</div>
            <div>Exercise Name</div>
            <div>Exercise Detail</div>
            <label>
                Sets <input></input>
            </label>
            <label>
                Reps <input></input>
            </label>
            <label>
                Rest (seconds) <input></input>
            </label>
            <button>Add Exercise to Workout</button>
        </>
    )
}

export default CreateWorkout
