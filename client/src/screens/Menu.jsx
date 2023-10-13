import Accordion from "react-bootstrap/Accordion";
import "./menu.css";
import React, { useState } from "react";
import Card from "./Card";
import Data from "./Wiley";
import Data2 from "./Ford";
import Data3 from "./Earhart";
import Data5 from "./Windsor";
import Buttons from "./Buttons";
import axios from "axios";

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
      <Accordion class="accordion" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Wiley</Accordion.Header>
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
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Ford</Accordion.Header>
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
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Earhart</Accordion.Header>
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
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Windsor</Accordion.Header>
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
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Hillenbrand</Accordion.Header>
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
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Menu;
