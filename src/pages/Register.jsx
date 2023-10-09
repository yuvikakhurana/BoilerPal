import Google from "../google.png";
import Github from "../github.png";
import { useState } from 'react';

import "./login.css"

const Register = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handlePasswordChange = (e) => {
        setPassword(e.target.value); 
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
      }

    const passwordsMatch = () => {
        return password === confirmPassword;
      }
      

    const strictPasswordCheck = () => {
        // Add password validation logic here
        // For example:
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        return strongRegex.test(password);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!strictPasswordCheck()) {
        alert('Password is not strong enough!');
        return;
        }
        if(!passwordsMatch()) {
            alert('Passwords do not match!');
            return;
          }
        // Rest of submit logic
    }
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Log in via Google
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Log in via Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" />
          <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange} 
      />
      <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={handleConfirmPasswordChange}
  />
      <button className="submit" onClick={handleSubmit}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;