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
        <img src='fit-circle.img' alt="FitCircle Logo" />
      </NavLink>
      <div id='nav-text-container'>
        {user && <div className="nav-text" onClick={() => navigate('/manage-workouts')}>Manage Workouts</div>}
        {user && <div className="nav-text" onClick={() => alert('Function not yet implemented')}>Exercises</div>}
        {user && <div className="nav-text" onClick={() => navigate('/friends')}>Friends</div>}
        <ProfileButton user={user} />
      </div>
    </div>
  );
}

export default Navigation;
