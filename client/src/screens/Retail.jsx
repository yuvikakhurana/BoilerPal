import React, { useEffect, useState } from "react";
import AccordionRetail from "../components/Accordion";
import "./menu.css";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Review from "./Review";
import "./retail.css"
const Retail = () => {
  // Reviews START

  const { userInfo } = useSelector((state) => state.auth);
  //console.log(userInfo.email);
  const [jerseyReviews, setjerseyReviews] = useState([]);
  const [cosiReviews, setcosiReviews] = useState([]);
  const [qdobaReviews, setqdobaReviews] = useState([]);
  const [paneraReviews, setpaneraReviews] = useState([]);
  const [freshensReviews, setfreshensReviews] = useState([]);

  const [jerseyRating, setjerseyRating] = useState(0);
  const [cosiRating, setcosiRating] = useState(0);
  const [qdobaRating, setqdobaRating] = useState(0);
  const [paneraRating, setpaneraRating] = useState(0);
  const [freshensRating, setfreshensRating] = useState(0);

  useEffect(() => {
    // Fetch reviews from the backend when the component is mounted
    fetchReviews();
  }, [
    jerseyReviews,
    cosiReviews,
    qdobaReviews,
    paneraReviews,
    freshensReviews,
  ]);

  // Calculate average ratings
  const calculateAverageRating = (reviews) => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (total, review) => total + review.rating,
        0
      );
      return (totalRating / reviews.length).toFixed(2);
    }
    return 0;
  };

  const fetchReviews = async () => {
    const response = await fetch("http://localhost:5000/retail/", {
      method: "GET",
    });
    const data = await response.json();
    const jerseyReview = data.filter((review) => review.location === "jersey");
    const cosiReview = data.filter((review) => review.location === "cosi");
    const qdobaReview = data.filter((review) => review.location === "qdoba");
    const paneraReview = data.filter((review) => review.location === "panera");
    const freshensReview = data.filter(
      (review) => review.location === "freshens"
    );

    setjerseyRating(calculateAverageRating(jerseyReview));
    setcosiRating(calculateAverageRating(cosiReview));
    setqdobaRating(calculateAverageRating(qdobaReview));
    setpaneraRating(calculateAverageRating(paneraReview));
    setfreshensRating(calculateAverageRating(freshensReview));

    setjerseyReviews(jerseyReview);
    setcosiReviews(cosiReview);
    setqdobaReviews(qdobaReview);
    setpaneraReviews(paneraReview);
    setfreshensReviews(freshensReview);

    //console.log(data);
  };

  const [showReviewForm, setShowReviewForm] = useState(false);

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  // Define a state variable to manage the edit form visibility
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  // Define state variables to manage the edited content and rating
  const [editedContent, setEditedContent] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  const handleAddReview = async () => {
    setShowReviewForm(true);
  };

  const handleEditClick = async (object) => {
    setEditId(object._id);
    setIsEditing(true);
    setEditedContent(object.content);
    setEditedRating(object.rating);
  };

  const handleEdit = async (item) => {
    setIsEditing(false);

    const editedData = {
      content: editedContent,
      rating: editedRating,
    };
    //Add functionality
    try {
      // Make an API request to update the review
      const response = await fetch(
        `http://localhost:5000/retail/${editId}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData), // Send updated content, rating, and ID
        }
      );

      if (response.ok) {
        const updatedReview = await response.json();
        console.log("Review edited successfully:", updatedReview);
        // Update the UI with the edited review if needed
      } else {
        console.error("Failed to edit the review.");
        // Handle the error or display an error message
      }
    } catch (error) {
      console.error("Error editing the review:", error);
      // Handle any errors that occur during the edit process
    }

    setEditId(null);
    setEditedContent("");
    setEditedRating(0);
  };

  const handleDelete = async (item) => {
    console.log(item.name);
    console.log(item.id);
    try {
      // Make a DELETE request to your backend API to delete the review
      const response = await fetch(
        `http://localhost:5000/retail/${item.id}/delete`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Review deleted successfully, you can update the UI to remove the deleted review
        // For example, filter the reviews array to exclude the deleted review

        if (item.name == "panera") {
          const updatedReviews = paneraReviews.filter(
            (review) => review._id !== item.id
          );
          setpaneraRating(calculateAverageRating(updatedReviews));
          setpaneraReviews(updatedReviews);
        } else if (item.name == "cosi") {
          const updatedReviews = cosiReviews.filter(
            (review) => review._id !== item.id
          );
          setcosiRating(calculateAverageRating(updatedReviews));
          setcosiReviews(updatedReviews);
        } else if (item.name == "jersey") {
          const updatedReviews = jerseyReviews.filter(
            (review) => review._id !== item.id
          );
          setjerseyRating(calculateAverageRating(updatedReviews));
          setjerseyReviews(updatedReviews);
        } else if (item.name == "qdoba") {
          const updatedReviews = qdobaReviews.filter(
            (review) => review._id !== item.id
          );
          setqdobaRating(calculateAverageRating(updatedReviews));
          setqdobaReviews(updatedReviews);
        } else if (item.name == "freshens") {
          const updatedReviews = freshensReviews.filter(
            (review) => review._id !== item.id
          );
          setfreshensRating(calculateAverageRating(updatedReviews));
          setfreshensReviews(updatedReviews);
        }

        // Optionally, you can display a success message or perform other actions
        console.log("Review deleted successfully.");
      } else {
        console.error("Failed to delete the review.");
        // Handle the error or display an error message
      }
    } catch (error) {
      console.error("Error deleting the review:", error);
      // Handle any errors that occur during the deletion process
    }
  };

  const handleReviewSubmit = async (location) => {
    setShowReviewForm(false);

    const formData = {
      username: userInfo.email,
      content: newReview,
      rating: newRating,
      location: location.name,
    };
    const response = await fetch(`http://localhost:5000/retail/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(formData),
    });

    // backend will return the updated list of (all) posts
    const posts = await response.json();
    //console.log("posts:")
    //console.log(posts);

    setNewReview("");
    setNewRating(0);

    if (diningName == "jersey") {
      const jerseyReview = posts.filter(
        (review) => review.location === "jersey"
      );
      setjerseyRating(calculateAverageRating(jerseyReview));
      setjerseyReviews(jerseyReview);
    } else if (diningName == "cosi") {
      const cosiReview = posts.filter((review) => review.location === "cosi");
      setcosiRating(calculateAverageRating(cosiReview));
      setcosiReviews(cosiReview);
    } else if (diningName == "qdoba") {
      const qdobaReview = posts.filter((review) => review.location === "qdoba");
      setqdobaRating(calculateAverageRating(qdobaReview));
      setqdobaReviews(qdobaReview);
    } else if (diningName == "panera") {
      const paneraReview = posts.filter(
        (review) => review.location === "panera"
      );
      setpaneraRating(calculateAverageRating(paneraReview));
      setpaneraReviews(paneraReview);
    } else if (diningName == "freshens") {
      const freshensReview = posts.filter(
        (review) => review.location === "freshens"
      );
      setfreshensRating(calculateAverageRating(freshensReview));
      setfreshensReviews(freshensReview);
    }
  };

  //Reviews END

  const accordionData = [
    {
      title: "Jersey Mike's",
      content: `At Jersey Mike’s, we offer a sub above – one that’s measured in more than inches or seconds ‘til served. We carefully consider every aspect of what we do – every slice, every sandwich, every order. Slicing meats and cheeses right in front of you is not only the tastiest way to make a sub sandwich – it’s the only authentic way. Same goes with fresh grilling cheese steaks. At Jersey Mike’s, we would have it no other way. Located on the first floor of Griffin Hall North.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 5 PM - 8 PM on Monday - Thursday.

  A swipe includes your choice of Sub (from list below) + chips OR small cookie + fountain drink.

  Sub options for a swipe

                  Grilled Portabella Mushroom & Swiss
                  Chipotle Cheesesteak
                  Chipotle Chicken
                  Mike's Famous Philly
                  Mike's Chicken Philly
                  The Veggie
                  Tuna Fish
                  Turkey & Provolone
                  Ham & Provolone
                  Jersey Shore's Favorite`,
    },
    {
      title: "Cosi",
      content: `Cosi is a fast-casual restaurant that is known for its homemade flatbread. Incredibly delicious breakfast, lunch, and dinner favorites like soup, salad, bowls, melts, sandwiches and flatbread pizzas are made to order daily. Visit us on the first floor of the Honors College and Residence Hall.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 11 AM - 2 PM on Monday - Friday, and 5 PM - 8 PM on Monday - Thursday. `,
    },
    {
      title: "Qdoba",
      content: `Serving up flame-grilled, hand-crafted, made in-house Mexican eats. Enjoy our hot and tasty burritos, bowls, tacos, and quesadillas. Located on the first floor of Meredith South residence hall.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 11 AM - 2 PM on Monday - Saturday and from 5 PM - 8 PM on Sunday - Thursday.

  `,
    },
    {
      title: "Panera",
      content: `There's nothing better than freshly baked bread. Our sandwiches and baked goods are made on-location every day. Enjoy our salads, soups, and bowls too! Located on the first floor of Meredith South residence hall.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 11 AM - 2 PM on Monday - Saturday, and from 5 PM - 8 PM on Monday - Thursday.`,
    },
    {
      title: "Freshens",
      content: `A healthy “fresh casual” concept, which offers prepared to order food inspired by fresh ingredients. Stop by for our rice bowls, wraps, flatbreads, and salads, as well as our signature fresh blended smoothies. Located in the Cordova Recreation Center.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 5 PM - 8 PM on Monday - Thursday.

  `,
    },
    {
      title: "Famous Frank's @ Cary Knight Spot",
      content: `Open late to satisfy all your pub grub cravings- stop by for hot dogs, sandwiches, fries, shakes and more. Located in the basement of Cary Quad South.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 5 PM - 8 PM on Sunday - Thursday. Meal swipe options include choice of any sandwich, quesadilla, salad, 2 chili cheese dogs, or 2 Chicago dogs. Swipe also includes a fountain drink and choice of fries, chips, or chips and salsa.    `,
    },
  ];

  return (
    // <div>
    //   <h1>Retail Dining Locations</h1>
    //   <div className="accordion">
    //     {accordionData.map(({ title, content }) => (
    //       <AccordionRetail title={title} content={content} />
    //     ))}
    //   </div>
    // </div>
    <div>
      <h1>Retail Dining Locations</h1>
      <div className="accordion">
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{accordionData[0].title}</Accordion.Header>
            <Accordion.Body>
              <div class = "disc">
              {accordionData[0].content}
              </div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="18">
                  <Accordion.Header>Reviews</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <div>
                        <strong className="title-rating">
                          Average Rating:{" "}
                        </strong>
                        <strong className="average-rating">
                          {jerseyRating}/10{" "}
                        </strong>
                      </div>
                      <ProgressBar
                        animated
                        variant="info"
                        now={jerseyRating * 10}
                      />
                    </div>
                    {jerseyReviews.map((object) => {
                      const isUserReview = object.username === userInfo.email;
                      return (
                        <div
                          className="modal"
                          style={{ display: "block", position: "initial" }}
                        >
                          <Modal.Dialog className="full-width-toast mb-0">
                            <Review
                              username={object.username}
                              content={object.content}
                              rating={object.rating}
                            ></Review>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <h6 className="time-stamp m-2">
                                {object.createdAt
                                  .replace("T", " ")
                                  .substring(0, object.createdAt.length - 5)}
                              </h6>
                              {isUserReview && (
                                <div>
                                  <Button
                                    className="m-2"
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEditClick(object)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    className="m-2"
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() =>
                                      handleDelete({
                                        name: "jersey",
                                        id: object._id,
                                      })
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                            {isEditing && object._id == editId && (
                              <div className="m-2">
                                <Form>
                                  <Form.Group>
                                    <Form.Label>Review:</Form.Label>
                                    <Form.Control
                                      as="textarea"
                                      rows={3}
                                      value={editedContent}
                                      onChange={(e) =>
                                        setEditedContent(e.target.value)
                                      }
                                    />
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>Rating:</Form.Label>
                                    <Form.Control
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={editedRating}
                                      onChange={(e) => {
                                        const value = parseInt(
                                          e.target.value,
                                          10
                                        );
                                        if (value >= 0 && value <= 10) {
                                          setEditedRating(value);
                                        }
                                      }}
                                      className="rating-width mb-2"
                                    />
                                  </Form.Group>
                                  <Button
                                    onClick={() =>
                                      handleEdit({ name: "jersey" })
                                    }
                                    className="m-2"
                                  >
                                    Edit!
                                  </Button>
                                </Form>
                              </div>
                            )}
                          </Modal.Dialog>
                        </div>
                      );
                    })}
                    <Button onClick={handleAddReview} className="mt-3">
                      Add Review
                    </Button>
                    {showReviewForm && (
                      <div>
                        <Form>
                          <Form.Group>
                            <Form.Label className="mt-2">Review:</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Add your Review here"
                              value={newReview}
                              onChange={(e) => setNewReview(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Rating:</Form.Label>
                            <Form.Control
                              type="number"
                              min="0"
                              max="10"
                              value={newRating}
                              onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (value >= 0 && value <= 10) {
                                  setNewRating(value);
                                }
                              }}
                              className="mb-4 rating-width"
                            />
                          </Form.Group>
                          <Button
                            onClick={() =>
                              handleReviewSubmit({ name: "jersey" })
                            }
                          >
                            Submit
                          </Button>
                        </Form>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{accordionData[1].title}</Accordion.Header>
            <Accordion.Body>
                <div class = "disc">
              {accordionData[1].content}
              </div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Reviews</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <div>
                        <strong className="title-rating">
                          Average Rating:
                        </strong>{" "}
                        <strong className="average-rating">
                          {cosiRating}/10
                        </strong>
                      </div>
                      <ProgressBar
                        animated
                        variant="info"
                        now={cosiRating * 10}
                      />
                    </div>
                    {cosiReviews.map((object) => {
                      const isUserReview = object.username === userInfo.email;
                      return (
                        <div
                          className="modal"
                          style={{ display: "block", position: "initial" }}
                        >
                          <Modal.Dialog className="full-width-toast mb-0">
                            <Review
                              username={object.username}
                              content={object.content}
                              rating={object.rating}
                            ></Review>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <h6 className="time-stamp m-2">
                                {object.createdAt
                                  .replace("T", " ")
                                  .substring(0, object.createdAt.length - 5)}
                              </h6>
                              {isUserReview && (
                                <div>
                                  <Button
                                    className="m-2"
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEditClick(object)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    className="m-2"
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() =>
                                      handleDelete({
                                        name: "cosi",
                                        id: object._id,
                                      })
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                            {isEditing && object._id == editId && (
                              <div className="m-2">
                                <Form>
                                  <Form.Group>
                                    <Form.Label>Review:</Form.Label>
                                    <Form.Control
                                      as="textarea"
                                      rows={3}
                                      value={editedContent}
                                      onChange={(e) =>
                                        setEditedContent(e.target.value)
                                      }
                                    />
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>Rating:</Form.Label>
                                    <Form.Control
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={editedRating}
                                      onChange={(e) => {
                                        const value = parseInt(
                                          e.target.value,
                                          10
                                        );
                                        if (value >= 0 && value <= 10) {
                                          setEditedRating(value);
                                        }
                                      }}
                                      className="rating-width mb-2"
                                    />
                                  </Form.Group>
                                  <Button
                                    onClick={() => handleEdit({ name: "cosi" })}
                                    className="m-2"
                                  >
                                    Edit!
                                  </Button>
                                </Form>
                              </div>
                            )}
                          </Modal.Dialog>
                        </div>
                      );
                    })}
                    <Button onClick={handleAddReview} className="mt-3">
                      Add Review
                    </Button>
                    {showReviewForm && (
                      <div>
                        <Form>
                          <Form.Group>
                            <Form.Label className="mt-2">Review:</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Add your Review here"
                              value={newReview}
                              onChange={(e) => setNewReview(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Rating:</Form.Label>
                            <Form.Control
                              type="number"
                              min="0"
                              max="10"
                              value={newRating}
                              onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (value >= 0 && value <= 10) {
                                  setNewRating(value);
                                }
                              }}
                              className="mb-4 rating-width"
                            />
                          </Form.Group>
                          <Button
                            onClick={() => handleReviewSubmit({ name: "cosi" })}
                          >
                            Submit
                          </Button>
                        </Form>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{accordionData[2].title}</Accordion.Header>
            <Accordion.Body>
            <div class = "disc">
              {accordionData[2].content}
              </div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Reviews</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <div>
                        <strong className="title-rating">
                          Average Rating:
                        </strong>{" "}
                        <strong className="average-rating">
                          {qdobaRating}/10
                        </strong>
                      </div>
                      <ProgressBar
                        animated
                        variant="info"
                        now={qdobaRating * 10}
                      />
                    </div>
                    {qdobaReviews.map((object) => {
                      const isUserReview = object.username === userInfo.email;
                      return (
                        <div
                          className="modal"
                          style={{ display: "block", position: "initial" }}
                        >
                          <Modal.Dialog className="full-width-toast mb-0">
                            <Review
                              username={object.username}
                              content={object.content}
                              rating={object.rating}
                            ></Review>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <h6 className="time-stamp m-2">
                                {object.createdAt
                                  .replace("T", " ")
                                  .substring(0, object.createdAt.length - 5)}
                              </h6>
                              {isUserReview && (
                                <div>
                                  <Button
                                    className="m-2"
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEditClick(object)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    className="m-2"
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() =>
                                      handleDelete({
                                        name: "qdoba",
                                        id: object._id,
                                      })
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                            {isEditing && object._id == editId && (
                              <div className="m-2">
                                <Form>
                                  <Form.Group>
                                    <Form.Label>Review:</Form.Label>
                                    <Form.Control
                                      as="textarea"
                                      rows={3}
                                      value={editedContent}
                                      onChange={(e) =>
                                        setEditedContent(e.target.value)
                                      }
                                    />
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>Rating:</Form.Label>
                                    <Form.Control
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={editedRating}
                                      onChange={(e) => {
                                        const value = parseInt(
                                          e.target.value,
                                          10
                                        );
                                        if (value >= 0 && value <= 10) {
                                          setEditedRating(value);
                                        }
                                      }}
                                      className="rating-width mb-2"
                                    />
                                  </Form.Group>
                                  <Button
                                    onClick={() =>
                                      handleEdit({ name: "qdoba" })
                                    }
                                    className="m-2"
                                  >
                                    Edit!
                                  </Button>
                                </Form>
                              </div>
                            )}
                          </Modal.Dialog>
                        </div>
                      );
                    })}
                    <Button onClick={handleAddReview} className="mt-3">
                      Add Review
                    </Button>
                    {showReviewForm && (
                      <div>
                        <Form>
                          <Form.Group>
                            <Form.Label className="mt-2">Review:</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Add your Review here"
                              value={newReview}
                              onChange={(e) => setNewReview(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Rating:</Form.Label>
                            <Form.Control
                              type="number"
                              min="0"
                              max="10"
                              value={newRating}
                              onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (value >= 0 && value <= 10) {
                                  setNewRating(value);
                                }
                              }}
                              className="mb-4 rating-width"
                            />
                          </Form.Group>
                          <Button
                            onClick={() =>
                              handleReviewSubmit({ name: "qdoba" })
                            }
                          >
                            Submit
                          </Button>
                        </Form>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{accordionData[3].title}</Accordion.Header>
            <Accordion.Body>
            <div class = "disc">
              {accordionData[3].content}
              </div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Reviews</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <div>
                        <strong className="title-rating">
                          Average Rating:
                        </strong>{" "}
                        <strong className="average-rating">
                          {paneraRating}/10
                        </strong>
                      </div>
                      <ProgressBar
                        animated
                        variant="info"
                        now={paneraRating * 10}
                      />
                    </div>
                    {paneraReviews.map((object) => {
                      const isUserReview = object.username === userInfo.email;
                      return (
                        <div
                          className="modal"
                          style={{ display: "block", position: "initial" }}
                        >
                          <Modal.Dialog className="full-width-toast mb-0">
                            <Review
                              username={object.username}
                              content={object.content}
                              rating={object.rating}
                            ></Review>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <h6 className="time-stamp m-2">
                                {object.createdAt
                                  .replace("T", " ")
                                  .substring(0, object.createdAt.length - 5)}
                              </h6>
                              {isUserReview && (
                                <div>
                                  <Button
                                    className="m-2"
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEditClick(object)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    className="m-2"
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() =>
                                      handleDelete({
                                        name: "panera",
                                        id: object._id,
                                      })
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                            {isEditing && object._id == editId && (
                              <div className="m-2">
                                <Form>
                                  <Form.Group>
                                    <Form.Label>Review:</Form.Label>
                                    <Form.Control
                                      as="textarea"
                                      rows={3}
                                      value={editedContent}
                                      onChange={(e) =>
                                        setEditedContent(e.target.value)
                                      }
                                    />
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>Rating:</Form.Label>
                                    <Form.Control
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={editedRating}
                                      onChange={(e) => {
                                        const value = parseInt(
                                          e.target.value,
                                          10
                                        );
                                        if (value >= 0 && value <= 10) {
                                          setEditedRating(value);
                                        }
                                      }}
                                      className="rating-width mb-2"
                                    />
                                  </Form.Group>
                                  <Button
                                    onClick={() =>
                                      handleEdit({ name: "panera" })
                                    }
                                    className="m-2"
                                  >
                                    Edit!
                                  </Button>
                                </Form>
                              </div>
                            )}
                          </Modal.Dialog>
                        </div>
                      );
                    })}
                    <Button onClick={handleAddReview} className="mt-3">
                      Add Review
                    </Button>
                    {showReviewForm && (
                      <div>
                        <Form>
                          <Form.Group>
                            <Form.Label className="mt-2">Review:</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Add your Review here"
                              value={newReview}
                              onChange={(e) => setNewReview(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Rating:</Form.Label>
                            <Form.Control
                              type="number"
                              min="0"
                              max="10"
                              value={newRating}
                              onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (value >= 0 && value <= 10) {
                                  setNewRating(value);
                                }
                              }}
                              className="mb-4 rating-width"
                            />
                          </Form.Group>
                          <Button
                            onClick={() =>
                              handleReviewSubmit({ name: "panera" })
                            }
                          >
                            Submit
                          </Button>
                        </Form>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{accordionData[4].title}</Accordion.Header>
            <Accordion.Body>
            <div class = "disc">
              {accordionData[4].content}
              </div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Reviews</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <div>
                        <strong className="title-rating">
                          Average Rating:
                        </strong>{" "}
                        <strong className="average-rating">
                          {freshensRating}/10
                        </strong>
                      </div>
                      <ProgressBar
                        animated
                        variant="info"
                        now={freshensRating * 10}
                      />
                    </div>
                    {freshensReviews.map((object) => {
                      const isUserReview = object.username === userInfo.email;
                      return (
                        <div
                          className="modal"
                          style={{ display: "block", position: "initial" }}
                        >
                          <Modal.Dialog className="full-width-toast mb-0">
                            <Review
                              username={object.username}
                              content={object.content}
                              rating={object.rating}
                            ></Review>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <h6 className="time-stamp m-2">
                                {object.createdAt
                                  .replace("T", " ")
                                  .substring(0, object.createdAt.length - 5)}
                              </h6>
                              {isUserReview && (
                                <div>
                                  <Button
                                    className="m-2"
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEditClick(object)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    className="m-2"
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() =>
                                      handleDelete({
                                        name: "freshens",
                                        id: object._id,
                                      })
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                            {isEditing && object._id == editId && (
                              <div className="m-2">
                                <Form>
                                  <Form.Group>
                                    <Form.Label>Review:</Form.Label>
                                    <Form.Control
                                      as="textarea"
                                      rows={3}
                                      value={editedContent}
                                      onChange={(e) =>
                                        setEditedContent(e.target.value)
                                      }
                                    />
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>Rating:</Form.Label>
                                    <Form.Control
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={editedRating}
                                      onChange={(e) => {
                                        const value = parseInt(
                                          e.target.value,
                                          10
                                        );
                                        if (value >= 0 && value <= 10) {
                                          setEditedRating(value);
                                        }
                                      }}
                                      className="rating-width mb-2"
                                    />
                                  </Form.Group>
                                  <Button
                                    onClick={() =>
                                      handleEdit({ name: "freshens" })
                                    }
                                    className="m-2"
                                  >
                                    Edit!
                                  </Button>
                                </Form>
                              </div>
                            )}
                          </Modal.Dialog>
                        </div>
                      );
                    })}
                    <Button onClick={handleAddReview} className="mt-3">
                      Add Review
                    </Button>
                    {showReviewForm && (
                      <div>
                        <Form>
                          <Form.Group>
                            <Form.Label className="mt-2">Review:</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Add your Review here"
                              value={newReview}
                              onChange={(e) => setNewReview(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Rating:</Form.Label>
                            <Form.Control
                              type="number"
                              min="0"
                              max="10"
                              value={newRating}
                              onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (value >= 0 && value <= 10) {
                                  setNewRating(value);
                                }
                              }}
                              className="mb-4 rating-width"
                            />
                          </Form.Group>
                          <Button
                            onClick={() =>
                              handleReviewSubmit({ name: "freshens" })
                            }
                          >
                            Submit
                          </Button>
                        </Form>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Retail;
