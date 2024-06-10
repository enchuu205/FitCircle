import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import HomePage from '../components/HomePage';
import Friends from '../components/Friends';
import ManageWorkouts from '../components/ManageWorkouts';
import CreateWorkout from '../components/CreateWorkout/CreateWorkout';
import WorkoutDetails from '../components/WorkoutDetails';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/friends',
        element: <Friends />
      },
      {
        path: '/workouts/manage-workouts',
        element: <ManageWorkouts />
      },
      {
        path: '/workouts/create-workout',
        element: <CreateWorkout />
      },
      {
        path: '/workouts/:id/edit',
        element: <CreateWorkout edit={true} />
      },
      {
        path: '/workouts/:id',
        element: <WorkoutDetails />
      }
    ],
  },
]);
