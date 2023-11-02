import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Review = (props) => {
  return (
    <Card className="mb-2">
      <ListGroup>
      <ListGroup.Item>
      <Card.Subtitle className="mb-2 pl-4 text-muted">
        {props.username}
      </Card.Subtitle>
      </ListGroup.Item>
      <ListGroup.Item>
      <Card.Text className="mb-2 pl-4">{props.content}</Card.Text>
      </ListGroup.Item>
        <ListGroup.Item>Rating: {props.rating}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Review;
