import React from "react";
import Triangle from "../components/Triangle";
import TextContent from "../components/TextContent";
import Fade from "react-reveal/Fade";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from "@mui/material";
import { useState } from "react";

const VendingMachine = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("");

  const handleBuildingClick = (event) => {
    const building = event.target.textContent;
    setSelectedBuilding(building);
    console.log(building);
  };

  return (
    <section className="feature_section home_section2 bg_1" id="connect">
      <div className="custom_container" style={{ minHeight: "100vh", height: "auto" }}>
        <div className="row">
          <div className="col-md-7 my-auto">

            <Box>
              <Fade left>
                <TextContent
                  title="Need some quick and cheap medicines? We got you!"
                  desc=""
                />
                <br/>
                <br/>
                <br/>
                <Box
                  sx={{ textAlign: "left" }}
                >
                  <h3>Q: What is the purpose of the pharmacy vending machines?</h3>
                  <br/>
                  <p>
                    A: The pharmacy vending machines were implemented by the Purdue University Pharmacy as an initiative to provide students with 24/7 access to affordable over-the-counter (OTC) medications, contraceptives, and personal care products.
                  </p>
                  <p>
                    An example of this commitment to affordability is with the generic Plan B product. The OTC item for emergency contraception is approximately $12 in the pharmacy vending machines, while other retail establishments have this priced around $50.
                  </p>
                </Box>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-building">Select a Building</InputLabel>
                  <Select
                    style={{ textAlign: 'left' }}
                    labelId="dropdown-label-building"
                    id="dropdown-building"
                    value={selectedBuilding}
                    label="Select a building"
                  >
                      <MenuItem value={"WALC"} onClick={handleBuildingClick}>WALC</MenuItem>
                      <MenuItem value={"COREC"} onClick={handleBuildingClick}>COREC</MenuItem>
                      <MenuItem value={"Ford Dining Court"} onClick={handleBuildingClick}>Ford Dining Court</MenuItem>
                      <MenuItem value={"Stewart Building"} onClick={handleBuildingClick}>Stewart Building</MenuItem>
                      <MenuItem value={"MSEE"} onClick={handleBuildingClick}>MSEE</MenuItem>
                      <MenuItem value={"RAWLS Hall"} onClick={handleBuildingClick}>RAWLS Hall</MenuItem>
                      <MenuItem value={"Earhart Residence Hall"} onClick={handleBuildingClick}>Earhart Residence Hall</MenuItem>
                      <MenuItem value={"Hillenbrand Residence Hall"} onClick={handleBuildingClick}>Hillenbrand Residence Hall</MenuItem>
                  </Select>
                </FormControl>
              </Fade>

              {(selectedBuilding === "WALC") && (
                <Fade left>
                  <Box>
                    <TextContent
                      title=""
                      desc="The pharmacy vending machine at WALC can be found on the first floor."
                    />
                  </Box>
                </Fade>
              )}

              {(selectedBuilding === "COREC") && (
                <Fade left>
                  <Box>
                    <TextContent
                      title=""
                      desc="The pharmacy vending machine at COREC can be found next to the Boilermaker Market near Freshens."
                    />
                  </Box>
                </Fade>
              )}

              {(selectedBuilding === "Ford Dining Court") && (
                <Fade left>
                  <Box>
                    <TextContent
                      title=""
                      desc="The pharmacy vending machine at Ford can be found right next to the restrooms inside the building."
                    />
                  </Box>
                </Fade>
              )}

              {(selectedBuilding === "Stewart Building") && (
                <Fade left>
                  <Box>
                    <TextContent
                      title=""
                      desc="The pharmacy vending machine at Stewart can be found in the basement near G018."
                    />
                  </Box>
                </Fade>
              )}

              {(selectedBuilding === "MSEE") && (
                <Fade left>
                  <Box>
                    <TextContent
                      title=""
                      desc="The pharmacy vending machine at MSEE can be found on the lower level close to the tunnel to the parking garage."
                    />
                  </Box>
                </Fade>
              )}

              {(selectedBuilding === "RAWLS Hall") && (
                <Fade left>
                  <Box>
                    <TextContent
                      title=""
                      desc="The pharmacy vending machine at RAWLS can be found at the dock area of the hall."
                    />
                  </Box>
                </Fade>
              )}

              {(selectedBuilding === "Earhart Residence Hall") && (
                <Fade left>
                  <Box>
                    <TextContent
                      title=""
                      desc="The pharmacy vending machine at Earhart can be found on the second floor near the lounges."
                    />
                  </Box>
                </Fade>
              )}

              {(selectedBuilding === "Hillenbrand Residence Hall") && (
                <Fade left>
                  <Box>
                    <TextContent
                      title=""
                      desc="The pharmacy vending machine at Hillenbrand can be found outside of the Hillenbrand dining court."
                    />
                  </Box>
                </Fade>
              )}

            </Box>

            

          </div>
        </div>
      </div>
      <Triangle />
    </section>
  );
};

export default VendingMachine;
