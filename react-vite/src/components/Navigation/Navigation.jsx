import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div id='navigation-container'>
      <NavLink to="/">
        <img src='fit-circle.img' alt="FitCircle Logo" />
      </NavLink>
      <div>
        <div>My Workouts</div>
        <div>Exercises</div>
        <div>Friends</div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
