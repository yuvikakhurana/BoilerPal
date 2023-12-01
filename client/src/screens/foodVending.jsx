import React, { useState } from "react";
import {
  Dropdown,
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import buildings from "./vends";

const VendingInfo = () => {

  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);
  const [showIce, setShowIce] = useState(false);
  const [showVending, setShowVending] = useState(false);

  const handleSelect = (eventKey) => {
    const building = buildings.find((b) => b.name === eventKey);
    setSelectedBuilding(building);
  };

  const purdueBlack = "#333333"; // Purdue Black
  const purdueGold = "#C28E0E"; // Purdue Gold

  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  const customStyles = {
    heading: {
      textAlign: "center",
      fontSize: "2.5rem",
      marginBottom: "2rem",
      color: purdueBlack,
      fontBorder: "5px solid",
      "-webkit-text-stroke": "0.25px #C28E0E" /* Text stroke with Purdue Gold */
    },
    button: {
      backgroundColor: purdueGold,
      borderColor: purdueBlack,
      color: purdueBlack,
    },
    buttonActive: {
      backgroundColor: purdueBlack,
      borderColor: purdueGold,
      color: purdueGold,
    },
    dropdownToggle: {
      backgroundColor: purdueGold,
      borderColor: purdueBlack,
      color: purdueBlack,
      width: "100%",
    },
    card: {
      borderColor: purdueBlack,
    },
  };
  const dropdownMenuStyle = {
    maxHeight: '300px', // Set a maximum height
    overflowY: 'scroll', // Enable vertical scrolling
    width: '100%', // Maintain full width
  };

  return (
    <Container>
      <Row className="my-4 justify-content-center">
        <Col md={8}>
          <animated.h1 style={{ ...fade, ...customStyles.heading }}>
            Vending Machines @ Purdue
          </animated.h1>
          <Dropdown onSelect={handleSelect} className="mb-3">
            <Dropdown.Toggle
              style={{ ...customStyles.dropdownToggle }}
              id="dropdown-basic"
            >
              Select a Building: {selectedBuilding.name}
            </Dropdown.Toggle>
            <Dropdown.Menu style={dropdownMenuStyle}>
              {buildings.map((building) => (
                <Dropdown.Item key={building.name} eventKey={building.name}>
                  {building.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <ButtonGroup
            className="mb-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              style={showIce ? customStyles.buttonActive : customStyles.button}
              onClick={() => setShowIce(!showIce)}
            >
              Ice Machines
            </Button>
            <Button
              style={
                showVending ? customStyles.buttonActive : customStyles.button
              }
              onClick={() => setShowVending(!showVending)}
            >
              Vending Machines
            </Button>
          </ButtonGroup>
          { (showIce || showVending) && (
          <Card style={customStyles.card}>
            <Card.Body>
              {showIce && (
                <Card.Text>
                  <b>Ice Machine Info:</b> {selectedBuilding.iceInfo}
                </Card.Text>
              )}
              {showVending && (
                <Card.Text>
                  <b>Vending Machine Info:</b> {selectedBuilding.vendingInfo}
                </Card.Text>
              )}
            </Card.Body>
          </Card>)
          }
        </Col>
      </Row>
    </Container>
  );
};

export default VendingInfo;
