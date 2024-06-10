import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ulRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // function setNewSignupUser() {
  //   setFirstName('Sample')
  //   setLastName('User')
  //   setEmail('sample_user@aa.io')
  //   setUsername('sample_user')
  //   setPhoneNumber('1234567890')
  //   setCity('SampleCity')
  //   setState('SampleState')
  //   setPassword('samplepassword')
  //   setConfirmPassword('samplepassword')
  //   handleSubmit
  // }

  const closeMenu = (e) => {
    if (ulRef.current && !ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {}

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (username.includes(" ")) {
      errors.username = "Username cannot contain spaces";
    }
    if (username.length < 8) {
      errors.username = "Username must be at least 8 characters long";
    } else if (username.length > 40) {
      errors.username = "Username cannot be longer than 40 characters";
    }
    if (firstName.length < 2) {
      errors.firstName = "First Name must be at least 2 characters long";
    } else if (firstName.length > 40) {
      errors.firstName = "First Name cannot be longer than 40 characters";
    }
    if (lastName.length < 2) {
      errors.lastName = "Last Name must be at least 2 characters long";
    } else if (lastName.length > 40) {
      errors.lastName = "Last Name cannot be longer than 40 characters";
    }
    setErrors(errors);

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    if (Object.keys(errors).length === 0) {
      const serverResponse = await dispatch(
        thunkSignup({
          'first_name': firstName,
          'last_name': lastName,
          email,
          username,
          'phone_number': phoneNumber,
          city,
          state,
          password,
        })
      );

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
        navigate('/home');
      }
    }
  };

  return (
    <div className="sign-up-modal-container">
      <h1 className='vertical-align'>Sign Up</h1>
      <hr />
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className='vertical-align sign-up-form'>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {errors.city && <p>{errors.city}</p>}
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        {errors.state && <p>{errors.state}</p>}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button className='sign-up-button button text-change' type="submit">Sign Up</button>
        {/* <button onClick={() => setNewSignupUser()}>Sample Sign Up User</button> */}
      </form>
    </div>
  );
}

export default SignupFormModal;
