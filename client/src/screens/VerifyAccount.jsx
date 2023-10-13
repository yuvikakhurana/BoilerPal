import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import axios from 'axios';
import { toast } from "react-toastify";
import Success from '../../public/success.png';

const VerifyScreen = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:5000/api/users/verify/${param.id}/${param.token}`;
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


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        navigate('/login');
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
  };

  return (
    validUrl ? (<>
        <FormContainer>
        <div className="head">
            <h1>You are Verified!</h1>
            <img src={Success} alt="" className="logo" width="30%" />
        </div>

        <Form onSubmit={submitHandler}>

            <div className="sign-in">
            <Button type="submit" variant="primary" className="mt-3">
                Sign In
            </Button>
            </div>
        </Form>
        </FormContainer>
    </>) : (<>
      <h1>You are in the wrong place, please leave!</h1>
    </>)
  );
};

export default VerifyScreen;
