import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllWorkoutsThunk } from '../../redux/workouts'

import './Homepage.css'

function HomePage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllWorkoutsThunk())
    }, [dispatch])

    return (
        <>
            <h1>Hey User,</h1>
            <div>Ready to start your next workout?</div>
            <h2>Your workouts</h2>
            <div>Your Workouts mapper</div>
            <h2>Find a workout</h2>
            <div>Public Workouts mapper</div>
        </>
    )
}

export default HomePage
