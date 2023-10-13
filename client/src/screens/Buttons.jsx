import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Multiselect } from "multiselect-react-dropdown";

const Buttons = ({ filterItem, setItem, menuItems }) => {
  // const [filter, setFilter] = useState(null);

  const [filters, setFilters] = useState([]);

  const handleSelect = (selectedList) => {
    setFilters(selectedList.map((x) => x.name));
  };

  // const handleSelect = (eventKey) => {
  //   setFilter(eventKey);
  //   filterItem(eventKey);
  // }

  const options = [
    { name: "Peanut-free", id: 1 },
    { name: "Vegetarian", id: 2 },
  ];

  return (
    <>
      {/* <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle>
          Filter by:
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="Peanut-free">Peanut-free</Dropdown.Item>
          <Dropdown.Item eventKey="Vegetarian">Vegetarian</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      1. Select a Filter
      <Multiselect
        options={options}
        onSelect={handleSelect}
        onRemove={handleSelect}
        displayValue="name"
      />
      <p></p>
      <p></p>
      2. Select a Time
      <div className="buttons">
        {menuItems.map((Val) => {
          return (
            <button
              className="btn-dark text-white p-1 px-2 mx-2 btn fw-bold"
              onClick={() => filterItem(Val, filters)}
            >
              {Val}
            </button>
          );
        })}
        <button
          className="btn-dark text-white p-1 px-2 mx-2 btn fw-bold"
          onClick={() => filterItem("All", filters)}
        >
          All Times
        </button>

        {/* <button
          className="btn-warning text-white p-1 mx-5"
          onClick={() => filterItem("Breakfast")}
        >
          Breakfast
        </button>
        <button
          className="btn-warning text-white p-1 px-2 mx-5"
          onClick={() => filterItem("Lunch")}
        >
          Lunch
        </button>
        <button
          className="btn-warning text-white p-1 mx-5"
          onClick={() => filterItem("Dinner")}
        >
          Dinner
        </button> */}
      </div>
    </>
  );
};

export default Buttons;
