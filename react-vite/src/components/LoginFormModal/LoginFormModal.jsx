import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  // const [showMenu, setShowMenu] = useState(false);
  // const ulRef = useRef();

  // const closeMenu = (e) => {
  //   if (ulRef.current && !ulRef.current.contains(e.target)) {
  //     setShowMenu(false);
  //   }
  // };

  function logInDemoUser() {
    setEmail('demo@aa.io')
    setPassword('password0')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('/home')
    }
  };

  return (
    <div className="log-in-modal-container">
      <h1>Log In</h1>
      <form className='log-in-form-container' onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            className="login-signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password:
          <input
            type="password"
            className="login-signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button className="log-in-button button text-change" type="submit">Log In</button>
        <button className="log-in-button button text-change demo-user-button" onClick={() => logInDemoUser()}>Demo User</button>
        <OpenModalMenuItem
          itemText="Don't have an account? Sign Up!"
          // onItemClick={closeMenu}
          modalComponent={<SignupFormModal />}
        />
      </form>
    </div>
  );
}

export default LoginFormModal;
