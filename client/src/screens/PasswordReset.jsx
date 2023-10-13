import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import axios from 'axios';
import { toast } from "react-toastify";

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
	const [password, setPassword] = useState("");

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:5000/api/users/password-reset/${param.id}/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

    const navigate = useNavigate();
    const url = `http://localhost:5000/api/users/password-reset/${param.id}/${param.token}`;

  const submitHandler = async (e) => {
    console.log("SUBMIT");
    e.preventDefault();
    const { data } = await axios.post(url, { password });
    if (data.error) {
        toast.error(data.error.data.message);
    } else {
        toast.success("Password reset!");
    }
    navigate('/login');
  };

  return (
    validUrl ? (<>
    <FormContainer>
      <div className="head">
        <h1>Forgot Password</h1>
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="String"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="sign-in">
          <Button type="submit" variant="primary" className="mt-3" onClick={submitHandler}>
            Reset Password
          </Button>
        </div>
      </Form>
    </FormContainer>
    </>) : (<>
      <h1>You are in the wrong place, please leave!</h1>
    </>)
  );
};

export default PasswordReset;
