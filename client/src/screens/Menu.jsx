import Accordion from "react-bootstrap/Accordion";
import "./menu.css";
import React, { useState } from "react";
import Card from "./Card";
import Data from "./Data";
import Buttons from "./Buttons";

const Menu = () => {
  const [item, setItem] = useState(Data);
  const menuItems = [...new Set(Data.map((Val) => Val.category))];

  const filterItem = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.category === curcat;
    });
    setItem(newItem);
  };

  const filterVeg = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.isvegetarian === true;
    });
    setItem(newItem);
  };

  return (
    <div class="container-menu">
      <Accordion defaultActiveKey="" class="accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Earhart</Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey="">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Menu</Accordion.Header>
                <Accordion.Body>
                  <div className="container-fluid">
                    <div className="row">
                      <Buttons
                        filterItem={filterItem}
                        setItem={setItem}
                        menuItems={menuItems}
                      />
                      <Card item={item} />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Reviews</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor s</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Ford</Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey="">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Menu</Accordion.Header>
                <Accordion.Body>
                  <div className="container-fluid">
                    <div className="row">
                      <Buttons
                        filterItem={filterItem}
                        setItem={setItem}
                        menuItems={menuItems}
                      />
                      <Card item={item} />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Reviews</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor s</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Wiley</Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey="">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Menu</Accordion.Header>
                <Accordion.Body>
                  <div className="container-fluid">
                    <div className="row">
                      <Buttons
                        filterItem={filterItem}
                        setItem={setItem}
                        menuItems={menuItems}
                      />
                      <Card item={item} />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Reviews</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor s</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Windsor</Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey="">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Menu</Accordion.Header>
                <Accordion.Body>
                  <div className="container-fluid">
                    <div className="row">
                      <Buttons
                        filterItem={filterItem}
                        setItem={setItem}
                        menuItems={menuItems}
                      />
                      <Card item={item} />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Reviews</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor s</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Hillenbrand</Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey="">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Menu</Accordion.Header>
                <Accordion.Body>
                  <div className="container-fluid">
                    <div className="row">
                      <Buttons
                        filterItem={filterItem}
                        setItem={setItem}
                        menuItems={menuItems}
                      />
                      <Card item={item} />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Reviews</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor s</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Menu;
