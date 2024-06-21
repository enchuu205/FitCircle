import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import './Navigation.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  return (
    <>
      {!user &&
        <OpenModalMenuItem
          itemText="Log In"
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />}
      {user && <img onClick={toggleMenu} className='user-profile-picture button' src={user.profile_picture1 ? user.profile_picture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} />}
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user && (
            <>
              <div>Hey {user.username}!</div>
              <div onClick={() => alert('Function not yet implemented')} className="button">See profile</div>
              <div>
                <button onClick={logout} className="edit-delete-button button text-change">Log Out</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
