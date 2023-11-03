import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Toast from "react-bootstrap/Toast";
import ToastContainer from 'react-bootstrap/ToastContainer';
import StarIcon from '@mui/icons-material/Star';

import "./menu.css";

const Review = (props) => {

  return (
    
    <Toast className="full-width-toast">
      <Toast.Header closeButton={false}>
        <strong className="me-auto italic-blue">{props.username}</strong>
        <strong className="rating-highlight">{props.rating}</strong>
        <StarIcon style={{ color: '#FFBF00' }} />
      </Toast.Header>
      <Toast.Body>{props.content}</Toast.Body>
    </Toast>
  );
};

export default Review;
