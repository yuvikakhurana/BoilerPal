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

const FloorMap = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");

  const handleBuildingClick = (event) => {
    const building = event.target.textContent;
    setSelectedBuilding(building);
    setSelectedFloor("");
    console.log(building);
  };

  const handleFloorClick = (event) => {
    const floor = event.target.textContent;
    setSelectedFloor(floor);
    console.log(floor);
  };

  return (
    <section className="feature_section home_section2 bg_1" id="connect">
      <div className="custom_container" style={{ minHeight: "100vh", height: "auto" }}>
        <div className="row">
          <div className="col-md-7 my-auto">

            <Box>
              <Fade left>
                <TextContent
                  title="Trouble finding your class? Use floor plans!"
                  desc="Use the drop down below to select the building and the floor you're looking for."
                />
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
                      <MenuItem value={"Purdue Memorial Union (PMU)"} onClick={handleBuildingClick}>Purdue Memorial Union (PMU)</MenuItem>
                      <MenuItem value={"Mechanical Engineering"} onClick={handleBuildingClick}>Mechanical Engineering</MenuItem>
                      <MenuItem value={"Felix HAAS Hall"} onClick={handleBuildingClick}>Felix HAAS Hall</MenuItem>
                      <MenuItem value={"Lawson Building"} onClick={handleBuildingClick}>Lawson Building</MenuItem>
                      <MenuItem value={"Dudley and Lambertus Hall"} onClick={handleBuildingClick}>Dudley and Lambertus Hall</MenuItem>
                  </Select>
                </FormControl>
              </Fade>
            </Box>

            {(selectedBuilding === "WALC") && (
              <Box>
                <Fade left>
                  <br/>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="dropdown-label-walcfloor">Select a floor</InputLabel>
                    <Select
                      style={{ textAlign: 'left' }}
                      labelId="dropdown-label-walcfloor"
                      id="dropdown-walcfloor"
                      value={selectedFloor}
                      label="Select a floor"
                    >
                        <MenuItem value={"WALC Basement"} onClick={handleFloorClick}>WALC Basement</MenuItem>
                        <MenuItem value={"WALC First floor"} onClick={handleFloorClick}>WALC First floor</MenuItem>
                        <MenuItem value={"WALC Second floor"} onClick={handleFloorClick}>WALC Second floor</MenuItem>
                        <MenuItem value={"WALC Third floor"} onClick={handleFloorClick}>WALC Third floor</MenuItem>
                    </Select>
                  </FormControl>
                </Fade>
              </Box>
            )}

            {(selectedBuilding === "Purdue Memorial Union (PMU)") && (
              <Box>
              <Fade left>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-pmufloor">Select a floor</InputLabel>
                  <Select
                    style={{ textAlign: 'left' }}
                    labelId="dropdown-label-pmufloor"
                    id="dropdown-pmufloor"
                    value={selectedFloor}
                    label="Select a floor"
                  >
                      <MenuItem value={"PMU Ground floor"} onClick={handleFloorClick}>PMU Ground floor</MenuItem>
                      <MenuItem value={"PMU First floor"} onClick={handleFloorClick}>PMU First floor</MenuItem>
                      <MenuItem value={"PMU Second floor"} onClick={handleFloorClick}>PMU Second floor</MenuItem>
                  </Select>
                </FormControl>
              </Fade>
            </Box>
            )}

            {(selectedBuilding === "Mechanical Engineering") && (
              <Box>
              <Fade left>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-mefloor">Select a floor</InputLabel>
                  <Select
                    style={{ textAlign: 'left' }}
                    labelId="dropdown-label-mefloor"
                    id="dropdown-mefloor"
                    value={selectedFloor}
                    label="Select a floor"
                  >
                      <MenuItem value={"ME Basement"} onClick={handleFloorClick}>ME Basement</MenuItem>
                      <MenuItem value={"ME Ground floor"} onClick={handleFloorClick}>ME Ground floor</MenuItem>
                      <MenuItem value={"ME First floor"} onClick={handleFloorClick}>ME First floor</MenuItem>
                      <MenuItem value={"ME Second floor"} onClick={handleFloorClick}>ME Second floor</MenuItem>
                      <MenuItem value={"ME Third floor"} onClick={handleFloorClick}>ME Third floor</MenuItem>
                  </Select>
                </FormControl>
              </Fade>
            </Box>
            )}

            {(selectedBuilding === "Felix HAAS Hall") && (
              <Box>
              <Fade left>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-haasfloor">Select a floor</InputLabel>
                  <Select
                    style={{ textAlign: 'left' }}
                    labelId="dropdown-label-haasfloor"
                    id="dropdown-haasfloor"
                    value={selectedFloor}
                    label="Select a floor"
                  >
                      <MenuItem value={"HAAS Ground floor"} onClick={handleFloorClick}>HAAS Ground floor</MenuItem>
                      <MenuItem value={"HAAS First floor"} onClick={handleFloorClick}>HAAS First floor</MenuItem>
                      <MenuItem value={"HAAS Second floor"} onClick={handleFloorClick}>HAAS Second floor</MenuItem>
                  </Select>
                </FormControl>
              </Fade>
            </Box>
            )}

            {(selectedBuilding === "Lawson Building") && (
              <Box>
              <Fade left>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-lawsonfloor">Select a floor</InputLabel>
                  <Select
                    style={{ textAlign: 'left' }}
                    labelId="dropdown-label-lawsonfloor"
                    id="dropdown-lawsonfloor"
                    value={selectedFloor}
                    label="Select a floor"
                  >
                      <MenuItem value={"Lawson Basement"} onClick={handleFloorClick}>Lawson Basement</MenuItem>
                      <MenuItem value={"Lawson First floor"} onClick={handleFloorClick}>Lawson First floor</MenuItem>
                      <MenuItem value={"Lawson Second floor"} onClick={handleFloorClick}>Lawson Second floor</MenuItem>
                      <MenuItem value={"Lawson Third floor"} onClick={handleFloorClick}>Lawson Third floor</MenuItem>
                  </Select>
                </FormControl>
              </Fade>
            </Box>
            )}

            {(selectedBuilding === "Dudley and Lambertus Hall") && (
              <Box>
              <Fade left>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-dlfloor">Select a floor</InputLabel>
                  <Select
                    style={{ textAlign: 'left' }}
                    labelId="dropdown-label-dlfloor"
                    id="dropdown-dlfloor"
                    value={selectedFloor}
                    label="Select a floor"
                  >
                      <MenuItem value={"DL Basement"} onClick={handleFloorClick}>DL Basement</MenuItem>
                      <MenuItem value={"DL First floor"} onClick={handleFloorClick}>DL First floor</MenuItem>
                      <MenuItem value={"DL Second floor"} onClick={handleFloorClick}>DL Second floor</MenuItem>
                      <MenuItem value={"DL Third floor"} onClick={handleFloorClick}>DL Third floor</MenuItem>
                      <MenuItem value={"DL Fourth floor"} onClick={handleFloorClick}>DL Fourth floor</MenuItem>
                      <MenuItem value={"DL Fifth floor"} onClick={handleFloorClick}>DL Fifth floor</MenuItem>
                  </Select>
                </FormControl>
              </Fade>
            </Box>
            )}

            {(selectedFloor === "WALC Basement") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/walc_basement.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "WALC First floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/walc_first_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "WALC Second floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/walc_second_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "WALC Third floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/walc_third_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "PMU Ground floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/pmu_ground_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "PMU First floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/pmu_first_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "PMU Second floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/pmu_second_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "ME Basement") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/me_basement.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "ME Ground floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/me_ground_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "ME First floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/me_first_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "ME Second floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/me_second_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "ME Third floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/me_third_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "HAAS Ground floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/haas_ground_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "HAAS First floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/haas_first_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "HAAS Second floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/haas_second_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "Lawson Basement") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/lawson_basement.jpeg"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "Lawson First floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/lawson_first_floor.jpeg"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "Lawson Second floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/lawson_second_floor.jpeg"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "Lawson Third floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/lawson_third_floor.jpeg"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "DL Basement") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/dl_b-3.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "DL First floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/dl_b-3.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "DL Second floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/dl_b-3.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "DL Third floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/dl_b-3.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "DL Fourth floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/dl_4-5.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "DL Fifth floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/dl_4-5.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

          </div>
        </div>
      </div>
      <Triangle />
    </section>
  );
};

export default FloorMap;
