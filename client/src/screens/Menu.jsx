import Accordion from "react-bootstrap/Accordion";
import "./menu.css";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Data from "./Wiley";
import Data2 from "./Ford";
import Data3 from "./Earhart";
import Data5 from "./Windsor";
import Buttons from "./Buttons";
import axios from "axios";
import Fade from "react-reveal/Fade";
import TextContent from "../components/TextContent";
import ListGroup from "react-bootstrap/ListGroup";
import Review from "./Review";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector } from "react-redux";

const Menu = () => {
  function getMenu(Location) {
    var today = new Date();
    var meals = [];
    const request =
      "https://api.hfs.purdue.edu/menus/v2/locations/" +
      Location +
      "/" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "-" +
      today.getFullYear();
    let response = axios
      .get(request)
      .then((response) => {
        //console.log(response.data.Meals[0].Stations);
        var i = 0;
        response.data.Meals[i].Stations.forEach((station) => {
          if (station.Items != null) {
            station.Items.forEach((element) => {
              var item = new Object();
              item.Name = element.Name;
              item.IsVegetarian = element.IsVegetarian;
              item.MealTime = "Breakfast";
              if (element.Allergens == null) {
                item.Peanuts = false;
              } else {
                item.Peanuts = element.Allergens[5].Value;
              }
              meals.push(item);
            });
          }
        });
        i++;
        response.data.Meals[i].Stations.forEach((station) => {
          if (station.Items != null) {
            station.Items.forEach((element) => {
              var item = new Object();
              item.Name = element.Name;
              item.IsVegetarian = element.IsVegetarian;
              item.MealTime = "Lunch";
              if (element.Allergens == null) {
                item.Peanuts = false;
              } else {
                item.Peanuts = element.Allergens[5].Value;
              }
              meals.push(item);
            });
          }
        });
        i++;
        if (Location == "Ford") {
          i++;
        }
        response.data.Meals[i].Stations.forEach((station) => {
          if (station.Items != null) {
            station.Items.forEach((element) => {
              var item = new Object();
              item.Name = element.Name;
              item.IsVegetarian = element.IsVegetarian;
              item.MealTime = "Dinner";
              if (element.Allergens == null) {
                item.Peanuts = false;
              } else {
                item.Peanuts = element.Allergens[5].Value;
              }
              meals.push(item);
            });
          }
        });
        // console.log(meals);
      })
      .catch((error) => console.error(error));
    return meals;
  }

  // Reviews START

  const { userInfo } = useSelector((state) => state.auth);
  //console.log(userInfo.email);
  const [earhartReviews, setEarhartReviews] = useState([]);
  const [wileyReviews, setWileyReviews] = useState([]);
  const [windsorReviews, setWindsorReviews] = useState([]);
  const [fordReviews, setFordReviews] = useState([]);
  const [hillyReviews, setHillyReviews] = useState([]);

  const [earhartRating, setEarhartRating] = useState(0);
  const [wileyRating, setWileyRating] = useState(0);
  const [windsorRating, setWindsorRating] = useState(0);
  const [fordRating, setFordRating] = useState(0);
  const [hillyRating, setHillyRating] = useState(0);

  useEffect(() => {
    // Fetch reviews from the backend when the component is mounted
    fetchReviews();
  }, [earhartReviews, wileyReviews, windsorReviews, fordReviews, hillyReviews]);

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
    const response = await fetch("http://localhost:5000/reviews/", {
      method: "GET",
    });
    const data = await response.json();
    const earhartReview = data.filter((review) => review.dining === "earhart");
    const wileyReview = data.filter((review) => review.dining === "wiley");
    const windsorReview = data.filter((review) => review.dining === "windsor");
    const fordReview = data.filter((review) => review.dining === "ford");
    const hillyReview = data.filter((review) => review.dining === "hilly");

    setEarhartRating(calculateAverageRating(earhartReview));
    setWileyRating(calculateAverageRating(wileyReview));
    setWindsorRating(calculateAverageRating(windsorReview));
    setFordRating(calculateAverageRating(fordReview));
    setHillyRating(calculateAverageRating(hillyReview));

    setEarhartReviews(earhartReview);
    setWileyReviews(wileyReview);
    setWindsorReviews(windsorReview);
    setFordReviews(fordReview);
    setHillyReviews(hillyReview);

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
        `http://localhost:5000/reviews/${editId}/edit`,
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
        `http://localhost:5000/reviews/${item.id}/delete`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Review deleted successfully, you can update the UI to remove the deleted review
        // For example, filter the reviews array to exclude the deleted review

        if (item.name == "ford") {
          const updatedReviews = fordReviews.filter(
            (review) => review._id !== item.id
          );
          setFordRating(calculateAverageRating(updatedReviews));
          setFordReviews(updatedReviews);
        } else if (item.name == "wiley") {
          const updatedReviews = wileyReviews.filter(
            (review) => review._id !== item.id
          );
          setWileyRating(calculateAverageRating(updatedReviews));
          setWileyReviews(updatedReviews);
        } else if (item.name == "earhart") {
          const updatedReviews = earhartReviews.filter(
            (review) => review._id !== item.id
          );
          setEarhartRating(calculateAverageRating(updatedReviews));
          setEarhartReviews(updatedReviews);
        } else if (item.name == "windsor") {
          const updatedReviews = windsorReviews.filter(
            (review) => review._id !== item.id
          );
          setWindsorRating(calculateAverageRating(updatedReviews));
          setWindsorReviews(updatedReviews);
        } else if (item.name == "hilly") {
          const updatedReviews = hillyReviews.filter(
            (review) => review._id !== item.id
          );
          setHillyRating(calculateAverageRating(updatedReviews));
          setHillyReviews(updatedReviews);
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

  const handleReviewSubmit = async (dining) => {
    setShowReviewForm(false);

    const formData = {
      username: userInfo.email,
      content: newReview,
      rating: newRating,
      dining: dining.name,
    };
    const response = await fetch(`http://localhost:5000/reviews/post`, {
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

    if (diningName == "earhart") {
      const earhartReview = posts.filter(
        (review) => review.dining === "earhart"
      );
      setEarhartRating(calculateAverageRating(earhartReview));
      setEarhartReviews(earhartReview);
    } else if (diningName == "wiley") {
      const wileyReview = posts.filter((review) => review.dining === "wiley");
      setWileyRating(calculateAverageRating(wileyReview));
      setWileyReviews(wileyReview);
    } else if (diningName == "windsor") {
      const windsorReview = posts.filter(
        (review) => review.dining === "windsor"
      );
      setWindsorRating(calculateAverageRating(windsorReview));
      setWindsorReviews(windsorReview);
    } else if (diningName == "ford") {
      const fordReview = posts.filter((review) => review.dining === "ford");
      setFordRating(calculateAverageRating(fordReview));
      setFordReviews(fordReview);
    } else if (diningName == "hilly") {
      const hillyReview = posts.filter((review) => review.dining === "hilly");
      setHillyRating(calculateAverageRating(hillyReview));
      setHillyReviews(hillyReview);
    }
  };

  //Reviews END
  const [item, setItem] = useState(["wiley"]);
  const [item2, setItem2] = useState(["ford"]);
  const [item3, setItem3] = useState(["earhart"]);
  const [item4, setItem4] = useState(["hillenbrand"]);
  const [item5, setItem5] = useState(["windsor"]);

  const filterItem = (curcat, filters) => {
    const newItem = Data.filter((newVal) => {
      if (curcat === "All") {
        console.log(curcat === "All");
        if (filters.includes("Vegetarian") && filters.includes("Peanut-free")) {
          return newVal.IsVegetarian === true && newVal.Peanuts === false;
        }
        if (filters.includes("Vegetarian")) {
          return newVal.IsVegetarian === true;
        }
        if (filters.includes("Peanut-free")) {
          return newVal.Peanuts === false;
        }
        return true;
      }
      if (filters.includes("Vegetarian") && filters.includes("Peanut-free")) {
        return (
          newVal.MealTime === curcat &&
          newVal.IsVegetarian === true &&
          newVal.Peanuts === false
        );
      }
      if (filters.includes("Vegetarian")) {
        return newVal.MealTime === curcat && newVal.IsVegetarian === true;
      }
      if (filters.includes("Peanut-free")) {
        return newVal.MealTime === curcat && newVal.Peanuts === false;
      }
      return newVal.MealTime === curcat;
    });
    setItem(newItem);
  };

  const filterItem2 = (curcat, filters) => {
    const newItem2 = Data2.filter((newVal) => {
      if (curcat === "All") {
        console.log(curcat === "All");
        if (filters.includes("Vegetarian") && filters.includes("Peanut-free")) {
          return newVal.IsVegetarian === true && newVal.Peanuts === false;
        }
        if (filters.includes("Vegetarian")) {
          return newVal.IsVegetarian === true;
        }
        if (filters.includes("Peanut-free")) {
          return newVal.Peanuts === false;
        }
        return true;
      }
      if (filters.includes("Vegetarian") && filters.includes("Peanut-free")) {
        return (
          newVal.MealTime === curcat &&
          newVal.IsVegetarian === true &&
          newVal.Peanuts === false
        );
      }
      if (filters.includes("Vegetarian")) {
        return newVal.MealTime === curcat && newVal.IsVegetarian === true;
      }
      if (filters.includes("Peanut-free")) {
        return newVal.MealTime === curcat && newVal.Peanuts === false;
      }
      return newVal.MealTime === curcat;
    });
    setItem2(newItem2);
  };

  const filterItem3 = (curcat, filters) => {
    const newItem3 = Data3.filter((newVal) => {
      if (curcat === "All") {
        console.log(curcat === "All");
        if (filters.includes("Vegetarian") && filters.includes("Peanut-free")) {
          return newVal.IsVegetarian === true && newVal.Peanuts === false;
        }
        if (filters.includes("Vegetarian")) {
          return newVal.IsVegetarian === true;
        }
        if (filters.includes("Peanut-free")) {
          return newVal.Peanuts === false;
        }
        return true;
      }
      if (filters.includes("Vegetarian") && filters.includes("Peanut-free")) {
        return (
          newVal.MealTime === curcat &&
          newVal.IsVegetarian === true &&
          newVal.Peanuts === false
        );
      }
      if (filters.includes("Vegetarian")) {
        return newVal.MealTime === curcat && newVal.IsVegetarian === true;
      }
      if (filters.includes("Peanut-free")) {
        return newVal.MealTime === curcat && newVal.Peanuts === false;
      }
      return newVal.MealTime === curcat;
    });
    setItem3(newItem3);
  };

  const filterItem4 = (curcat, filters) => {
    const newItem4 = Data4.filter((newVal) => {
      if (curcat === "All") {
        console.log(curcat === "All");
        if (filters.includes("Vegetarian") && filters.includes("Peanut-free")) {
          return newVal.IsVegetarian === true && newVal.Peanuts === false;
        }
        if (filters.includes("Vegetarian")) {
          return newVal.IsVegetarian === true;
        }
        if (filters.includes("Peanut-free")) {
          return newVal.Peanuts === false;
        }
        return true;
      }
      if (filters.includes("Vegetarian") && filters.includes("Peanut-free")) {
        return (
          newVal.MealTime === curcat &&
          newVal.IsVegetarian === true &&
          newVal.Peanuts === false
        );
      }
      if (filters.includes("Vegetarian")) {
        return newVal.MealTime === curcat && newVal.IsVegetarian === true;
      }
      if (filters.includes("Peanut-free")) {
        return newVal.MealTime === curcat && newVal.Peanuts === false;
      }
      return newVal.MealTime === curcat;
    });
    setItem4(newItem4);
  };

  const filterItem5 = (curcat, filters) => {
    const newItem5 = Data5.filter((newVal) => {
      if (curcat === "All") {
        console.log(curcat === "All");
        if (filters.includes("Vegetarian") && filters.includes("Peanut-free")) {
          return newVal.IsVegetarian === true && newVal.Peanuts === false;
        }
        if (filters.includes("Vegetarian")) {
          return newVal.IsVegetarian === true;
        }
        if (filters.includes("Peanut-free")) {
          return newVal.Peanuts === false;
        }
        return true;
      }
      if (filters.includes("Vegetarian") && filters.includes("Peanut-free")) {
        return (
          newVal.MealTime === curcat &&
          newVal.IsVegetarian === true &&
          newVal.Peanuts === false
        );
      }
      if (filters.includes("Vegetarian")) {
        return newVal.MealTime === curcat && newVal.IsVegetarian === true;
      }
      if (filters.includes("Peanut-free")) {
        return newVal.MealTime === curcat && newVal.Peanuts === false;
      }
      return newVal.MealTime === curcat;
    });
    setItem5(newItem5);
  };

  console.log(getMenu("Ford"));

  return (
    <div class="container-menu">
      {console.log(getMenu("Earhart"))}
      <Fade left>
        <TextContent
          title="Feeling hungry?"
          desc=" Grab some food at these locations! (More locations to be added soon...)"
        />
        <br />
        <br />
        <Accordion class="accordion" alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h6>Wiley Dining Court</h6>
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Menu</Accordion.Header>
                  <Accordion.Body>
                    <div className="container-fluid">
                      <div className="row">
                        <Buttons
                          filterItem={filterItem}
                          setItem={setItem}
                          menuItems={[
                            ...new Set(Data.map((Val) => Val.MealTime)),
                          ]}
                        />
                        <Card item={item} />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Reviews</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <div>
                        <strong>Average Rating:</strong> {wileyRating} (out of
                        10)
                      </div>
                      <ProgressBar
                        animated
                        variant="info"
                        now={wileyRating * 10}
                      />
                    </div>
                    {wileyReviews.map((object) => {
                      const isUserReview = object.username === userInfo.email;
                      return (
                        <div>
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
                            <h6>
                              {object.createdAt
                                .replace("T", " ")
                                .substring(0, object.createdAt.length - 5)}
                            </h6>
                            {isUserReview && (
                              <div>
                                <Button
                                  variant="link"
                                  onClick={() => handleEditClick(object)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="link"
                                  onClick={() =>
                                    handleDelete({
                                      name: "wiley",
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
                            <div>
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
                                  />
                                </Form.Group>
                                <Button
                                  onClick={() => handleEdit({ name: "wiley" })}
                                >
                                  Edit!
                                </Button>
                              </Form>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <Button onClick={handleAddReview}>Add Review</Button>
                    {showReviewForm && (
                      <div>
                        <Form>
                          <Form.Group>
                            <Form.Label>Review:</Form.Label>
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
                            />
                          </Form.Group>
                          <Button
                            onClick={() =>
                              handleReviewSubmit({ name: "wiley" })
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
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h6>Ford Dining Court</h6>
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Menu</Accordion.Header>
                  <Accordion.Body>
                    <div className="container-fluid">
                      <div className="row">
                        <Buttons
                          filterItem={filterItem2}
                          setItem={setItem2}
                          menuItems={[
                            ...new Set(Data2.map((Val) => Val.MealTime)),
                          ]}
                        />
                        <Card item={item2} />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Reviews</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <div>
                        <strong>Average Rating:</strong> {fordRating} (out of
                        10)
                      </div>
                      <ProgressBar
                        animated
                        variant="info"
                        now={fordRating * 10}
                      />
                    </div>
                    {fordReviews.map((object) => {
                      const isUserReview = object.username === userInfo.email;
                      return (
                        <div>
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
                            <h6>
                              {object.createdAt
                                .replace("T", " ")
                                .substring(0, object.createdAt.length - 5)}
                            </h6>
                            {isUserReview && (
                              <div>
                                <Button
                                  variant="link"
                                  onClick={() => handleEditClick(object)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="link"
                                  onClick={() =>
                                    handleDelete({
                                      name: "ford",
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
                            <div>
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
                                  />
                                </Form.Group>
                                <Button
                                  onClick={() => handleEdit({ name: "ford" })}
                                >
                                  Edit!
                                </Button>
                              </Form>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <Button onClick={handleAddReview}>Add Review</Button>
                    {showReviewForm && (
                      <div>
                        <Form>
                          <Form.Group>
                            <Form.Label>Review:</Form.Label>
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
                            />
                          </Form.Group>
                          <Button
                            onClick={() => handleReviewSubmit({ name: "ford" })}
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
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h6>Earhart Dining Court</h6>
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Menu</Accordion.Header>
                  <Accordion.Body>
                    <div className="container-fluid">
                      <div className="row">
                        <Buttons
                          filterItem={filterItem3}
                          setItem={setItem3}
                          menuItems={[
                            ...new Set(Data3.map((Val) => Val.MealTime)),
                          ]}
                        />
                        <Card item={item3} />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Reviews</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <div>
                        <strong>Average Rating:</strong> {earhartRating} (out of
                        10)
                      </div>
                      <ProgressBar
                        animated
                        variant="info"
                        now={earhartRating * 10}
                      />
                    </div>
                    {earhartReviews.map((object) => {
                      const isUserReview = object.username === userInfo.email;
                      return (
                        <div>
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
                            <h6>
                              {object.createdAt
                                .replace("T", " ")
                                .substring(0, object.createdAt.length - 5)}
                            </h6>
                            {isUserReview && (
                              <div>
                                <Button
                                  variant="link"
                                  onClick={() => handleEditClick(object)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="link"
                                  onClick={() =>
                                    handleDelete({
                                      name: "earhart",
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
                            <div>
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
                                  />
                                </Form.Group>
                                <Button
                                  onClick={() =>
                                    handleEdit({ name: "earhart" })
                                  }
                                >
                                  Edit!
                                </Button>
                              </Form>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <Button onClick={handleAddReview}>Add Review</Button>
                    {showReviewForm && (
                      <div>
                        <Form>
                          <Form.Group>
                            <Form.Label>Review:</Form.Label>
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
                            />
                          </Form.Group>
                          <Button
                            onClick={() =>
                              handleReviewSubmit({ name: "earhart" })
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
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h6>Windsor Dining Court</h6>
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Menu</Accordion.Header>
                  <Accordion.Body>
                    <div className="container-fluid">
                      <div className="row">
                        <Buttons
                          filterItem={filterItem5}
                          setItem={setItem5}
                          menuItems={[
                            ...new Set(Data5.map((Val) => Val.MealTime)),
                          ]}
                        />
                        <Card item={item5} />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Reviews</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <div>
                        <strong>Average Rating:</strong> {windsorRating} (out of
                        10)
                      </div>
                      <ProgressBar
                        animated
                        variant="info"
                        now={windsorRating * 10}
                      />
                    </div>
                    {windsorReviews.map((object) => {
                      const isUserReview = object.username === userInfo.email;
                      return (
                        <div>
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
                            <h6>
                              {object.createdAt
                                .replace("T", " ")
                                .substring(0, object.createdAt.length - 5)}
                            </h6>
                            {isUserReview && (
                              <div>
                                <Button
                                  variant="link"
                                  onClick={() => handleEditClick(object)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="link"
                                  onClick={() =>
                                    handleDelete({
                                      name: "windsor",
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
                            <div>
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
                                  />
                                </Form.Group>
                                <Button
                                  onClick={() =>
                                    handleEdit({ name: "windsor" })
                                  }
                                >
                                  Edit!
                                </Button>
                              </Form>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <Button onClick={handleAddReview}>Add Review</Button>
                    {showReviewForm && (
                      <div>
                        <Form>
                          <Form.Group>
                            <Form.Label>Review:</Form.Label>
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
                            />
                          </Form.Group>
                          <Button
                            onClick={() =>
                              handleReviewSubmit({ name: "windsor" })
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
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h6>Hillenbrand Dining Court</h6>
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Menu</Accordion.Header>
                  <Accordion.Body>
                    <div className="container-fluid">
                      <div className="row">Closed for the Day!</div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Reviews</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <div>
                        <strong>Average Rating:</strong> {hillyRating} (out of
                        10)
                      </div>
                      <ProgressBar
                        animated
                        variant="info"
                        now={hillyRating * 10}
                      />
                    </div>
                    {hillyReviews.map((object) => {
                      const isUserReview = object.username === userInfo.email;
                      return (
                        <div>
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
                            <h6>
                              {object.createdAt
                                .replace("T", " ")
                                .substring(0, object.createdAt.length - 5)}
                            </h6>
                            {isUserReview && (
                              <div>
                                <Button
                                  variant="link"
                                  onClick={() => handleEditClick(object)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="link"
                                  onClick={() =>
                                    handleDelete({
                                      name: "hilly",
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
                            <div>
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
                                  />
                                </Form.Group>
                                <Button
                                  onClick={() => handleEdit({ name: "hilly" })}
                                >
                                  Edit!
                                </Button>
                              </Form>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <Button onClick={handleAddReview}>Add Review</Button>
                    {showReviewForm && (
                      <div>
                        <Form>
                          <Form.Group>
                            <Form.Label>Review:</Form.Label>
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
                            />
                          </Form.Group>
                          <Button
                            onClick={() =>
                              handleReviewSubmit({ name: "hilly" })
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
      </Fade>
    </div>
  );
};

export default Menu;
