import Google from "../google.png";
import Github from "../github.png";
import Purdue from "../Purdue.jpg";
import { useState } from 'react';
import { Link } from "react-router-dom";

import "./login.css"

const Login = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handlePasswordChange = (e) => {
        setPassword(e.target.value); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Rest of submit logic
    }
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  return (
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
        <img src= {Purdue} alt="" className="logo" width="50%" />
          <input type="text" placeholder="Username" />
          <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange} 
      />
      <button className="submit" onClick={handleSubmit}>Login</button>
      <div className="register-link">
          Not registered? <Link to="/register">Click here</Link> to register
        </div>
        </div>
      </div>
  );
};

export default Login;