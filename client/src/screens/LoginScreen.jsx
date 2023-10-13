import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.jsx";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";
import Google from "../google.png";
import Github from "../github.png";
import Purdue from "../Purdue.jpg";
import "./login.css";

const LoginScreen = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <div className="head">
        <h1>Sign In</h1>
        <img src={Purdue} alt="" className="logo" width="30%" />
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}

        <div className="sign-in">
          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
          <div className="OR">
          OR
          </div>
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
          </div>
        </div>

        <Row className="py-3">
          <Col>
            New User? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
