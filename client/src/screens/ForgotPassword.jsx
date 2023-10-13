import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import { toast } from "react-toastify";
import Purdue from "../Purdue.jpg";
import "./login.css";
import { useSendForgotPasswordMutation } from "../slices/usersApiSlice.js";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const [sendLink] = useSendForgotPasswordMutation();

  useEffect(() => {
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await sendLink({email});
    if (res.error) {
        toast.error(res.error.data.message);
    } else {
        toast.success("Password reset link sent to your email account");
    }
  };

  return (
    <FormContainer>
      <div className="head">
        <h1>Forgot Password</h1>
        <img src={Purdue} alt="" className="logo" width="30%" />
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="sign-in">
          <Button type="submit" variant="primary" className="mt-3">
            Reset Password
          </Button>
        
        </div>

      </Form>
    </FormContainer>
  );
};

export default ForgotPassword;
