import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user)
  // console.log(user)
  const navigate = useNavigate()
  return (
    <div id='navigation-container'>
      <NavLink to={user ? '/home' : '/'}>
        <img id='logo' src='https://res.cloudinary.com/dztk9g8ji/image/upload/v1717992085/Untitled_design_njfhcq.png' alt="FitCircle Logo" />
      </NavLink>
      <div id='nav-text-container'>
        {user && <div className="nav-text text-change" onClick={() => navigate('/workouts/manage-workouts')}>Manage Workouts</div>}
        {/* {user && <div className="nav-text text-change" onClick={() => alert('Function not yet implemented')}>Exercises</div>} */}
        {user && <div className="nav-text text-change" onClick={() => navigate('/friends')}>Friends</div>}
        {user && <button className="user-button button text-change" onClick={() => { navigate('/workouts/create-workout'); location.reload() }}>Create a Workout</button>}
        <ProfileButton user={user} />
      </div>
    </div>
  );
}

export default Navigation;
