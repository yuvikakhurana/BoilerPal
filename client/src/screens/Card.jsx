import React from "react";

const Card = ({ item }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          {item.map((Val) => {
            return (
              <div className="col-md-4 col-sm-6 card my-3 py-3 border-0">
                <div className="card-body">
                  <div className="card-title fw-bold fs-4">{Val.Name}</div>
                  <div className="card-text">
                    <div>
                      {Val.IsVegetarian ? "Vegetarian" : "Non-Vegetarian"}
                    </div>
                    <div>{Val.Peanuts ? "Contains Nuts" : "No nuts"}</div>
                    <div>{Val.MealTime}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Card;
