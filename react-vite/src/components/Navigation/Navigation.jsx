import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <>
      <NavLink to="/">
        <img src='fit-circle.img' alt="FitCircle Logo" />
      </NavLink>
      <ProfileButton />
    </>
  );
}

export default Navigation;
