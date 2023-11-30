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
  const [selectedMap, setSelectedMap] = useState("normal")
  const [isEmergency, setIsEmergency] = useState(false);

    const handleEmergencyClick = (event) => {
      setIsEmergency((prevState) => !prevState);
    };

  const buttonStyle = {
      width: '400px',
      height: '53px',
      backgroundColor: isEmergency ? 'red' : 'white',
      color: isEmergency ? 'white' : 'black',
      border: isEmergency ? '2px solid black' : '1px solid black',
      padding: isEmergency ? '8px 16px' : '5px 10px',
      fontWeight: isEmergency ? 'bold' : 'normal',
      borderRadius: '5px', // Set a border radius for rounded edges
  };

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
                  title="Building information"
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
                    <InputLabel id="dropdown-label-walcfloor">Select a Floor Plan</InputLabel>
                    <Select
                      style={{ textAlign: 'left' }}
                      labelId="dropdown-label-walcfloor"
                      id="dropdown-walcfloor"
                      value={selectedFloor}
                      label="Select a Floor Plan"
                    >
                        <MenuItem value={"WALC Basement"} onClick={handleFloorClick}>WALC Basement</MenuItem>
                        <MenuItem value={"WALC First floor"} onClick={handleFloorClick}>WALC First floor</MenuItem>
                        <MenuItem value={"WALC Second floor"} onClick={handleFloorClick}>WALC Second floor</MenuItem>
                        <MenuItem value={"WALC Third floor"} onClick={handleFloorClick}>WALC Third floor</MenuItem>
                    </Select>
                    <div className="row"><table style={{margin: "20px"}}>
                     <tr>
                       <th>Sunday</th>
                       <td>All Day</td>
                     </tr>
                     <tr>
                       <th>Monday</th>
                       <td>All Day</td>
                     </tr>
                     <tr>
                       <th>Tuesday</th>
                       <td>All Day</td>
                     </tr>
                     <tr>
                       <th>Wednesday</th>
                       <td>All Day</td>
                     </tr>
                     <tr>
                       <th>Thursday</th>
                       <td>All Day</td>
                     </tr>
                     <tr>
                       <th>Friday</th>
                       <td>All Day</td>
                     </tr>
                     <tr>
                       <th>Saturday</th>
                       <td>All Day</td>
                     </tr>
                    </table>
                    </div>
                  </FormControl>
                </Fade>
              </Box>
            )}

            {(selectedBuilding === "Purdue Memorial Union (PMU)") && (
              <Box>
              <Fade left>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-pmufloor">Select a Floor Plan</InputLabel>
                  <Select
                    style={{ textAlign: 'left' }}
                    labelId="dropdown-label-pmufloor"
                    id="dropdown-pmufloor"
                    value={selectedFloor}
                    label="Select a Floor Plan"
                  >
                      <MenuItem value={"PMU Ground floor"} onClick={handleFloorClick}>PMU Ground floor</MenuItem>
                      <MenuItem value={"PMU First floor"} onClick={handleFloorClick}>PMU First floor</MenuItem>
                      <MenuItem value={"PMU Second floor"} onClick={handleFloorClick}>PMU Second floor</MenuItem>
                  </Select>
                  <div className="row"><table style={{margin: "20px"}}>
                     <tr>
                       <th>Sunday</th>
                       <td>6AM–12AM</td>
                     </tr>
                     <tr>
                       <th>Monday</th>
                       <td>6AM–12AM</td>
                     </tr>
                     <tr>
                       <th>Tuesday</th>
                       <td>6AM–12AM</td>
                     </tr>
                     <tr>
                       <th>Wednesday</th>
                       <td>6AM–12AM</td>
                     </tr>
                     <tr>
                       <th>Thursday</th>
                       <td>6AM–12AM</td>
                     </tr>
                     <tr>
                       <th>Friday</th>
                       <td>6AM–12AM</td>
                     </tr>
                     <tr>
                       <th>Saturday</th>
                       <td>6AM–12AM</td>
                     </tr>
                  </table>
                  </div>
                  <h2>
                     Description
                     </h2>
                     <body>
                     The PMU has 4 entrances: - 1 on the North end; 1 on the South end; 1 on the East end; 1 on the West end.<br></br><br></br>

                     Basement: Facilities/Operations Back of House; Student Activity spaces; Rack & Roll Bowling and Boiler Game Mine<br></br>

                     Ground Floor:  dining, kitchens, offices, ATMS<br></br>

                     First Floor: Retail, common areas, kitchens, offices<br></br>

                     Second Floor: Common areas, kitchens, offices
                     </body>
                     <br></br>
                     <h2>
                     Evacuation Areas
                     </h2>
                     <body>
                     <b>Primary location:</b><br></br> outside, in an area away from the building<br></br>
                     <b>Secondary location:</b><br></br> inside a nearby building in case of inclement weather
                  </body>
                </FormControl>
              </Fade>
            </Box>
            )}

            {(selectedBuilding === "Mechanical Engineering") && (
              <Box>
              <Fade left>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-mefloor">Select a Floor Plan</InputLabel>
                  <div display = "flex"
                  >
                  <Select
                    style={{ textAlign: 'left', width: '345px' }}
                    labelId="dropdown-label-mefloor"
                    id="dropdown-mefloor"
                    value={selectedFloor}
                    label="Select a Floor Plan"
                    inline="true"
                  >
                      <MenuItem value={"ME Basement"} onClick={handleFloorClick}>ME Basement</MenuItem>
                      <MenuItem value={"ME Ground floor"} onClick={handleFloorClick}>ME Ground floor</MenuItem>
                      <MenuItem value={"ME First floor"} onClick={handleFloorClick}>ME First floor</MenuItem>
                      <MenuItem value={"ME Second floor"} onClick={handleFloorClick}>ME Second floor</MenuItem>
                      <MenuItem value={"ME Third floor"} onClick={handleFloorClick}>ME Third floor</MenuItem>
                  </Select>
                  <button
                    style={buttonStyle}
                    onClick={handleEmergencyClick}
                  >
                    {isEmergency ? 'Emergency' : 'Normal'}
                  </button>
                  </div>
                  <div className="row"><table style={{margin: "20px"}}>
                     <tr>
                       <th>Sunday</th>
                       <td>Closed</td>
                     </tr>
                     <tr>
                       <th>Monday</th>
                       <td>7AM–11PM</td>
                     </tr>
                     <tr>
                       <th>Tuesday</th>
                       <td>7AM–11PM</td>
                     </tr>
                     <tr>
                       <th>Wednesday</th>
                       <td>7AM–11PM</td>
                     </tr>
                     <tr>
                       <th>Thursday</th>
                       <td>7AM–11PM</td>
                     </tr>
                     <tr>
                       <th>Friday</th>
                       <td>7AM–7PM</td>
                     </tr>
                     <tr>
                       <th>Saturday</th>
                       <td>Closed</td>
                     </tr>
                  </table>
                  </div>
                  <h2>
                     Description
                     </h2>
                     <body>
                     The Mechanical Engineering Building has 6 entrances: - 1 on the North end; 1 on the North West end; 1 on the South end; 1 on the South East end; 1 on the East end; 1 on the West end.<br></br><br></br>
                     The main part of the ME building has five levels (Basement, Ground, 1st, 2nd, and 3rd) plus an attic containing air handling equipment, data switch room and storage. The ME building is undergoing a 2 year renovation from Summer 2023 through Summer 2025 and many areas of the building are closed.<br></br>
                     The use of the building is multifunctional. There are university classrooms, instructional laboratories, research laboratories, and office space.<br></br>
                     </body>
                     <br></br>
                     <h2>
                     Evacuation Areas
                     </h2>
                     <body>
                     <b>Primary location:</b><br></br>The emergency assembly area for the ME occupants is the area of Purdue Mall outside MSEE.<br></br>
                     <b>Secondary location:</b><br></br>The emergency assembly area for ME building occupants is the atrium of the MSEE building, located in the center of the MSEE building on the first floor.
                  </body>
                </FormControl>
              </Fade>
            </Box>
            )}

            {(selectedBuilding === "Felix HAAS Hall") && (
              <Box>
              <Fade left>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-haasfloor">Select a Floor Plan</InputLabel>
                  <Select
                    style={{ textAlign: 'left' }}
                    labelId="dropdown-label-haasfloor"
                    id="dropdown-haasfloor"
                    value={selectedFloor}
                    label="Select a Floor Plan"
                  >
                      <MenuItem value={"HAAS Ground floor"} onClick={handleFloorClick}>HAAS Ground floor</MenuItem>
                      <MenuItem value={"HAAS First floor"} onClick={handleFloorClick}>HAAS First floor</MenuItem>
                      <MenuItem value={"HAAS Second floor"} onClick={handleFloorClick}>HAAS Second floor</MenuItem>
                  </Select>
                  <div className="row"><table style={{margin: "20px"}}>
                   <tr>
                     <th>Sunday</th>
                     <td>Closed</td>
                   </tr>
                   <tr>
                     <th>Monday</th>
                     <td>7AM–11PM</td>
                   </tr>
                   <tr>
                     <th>Tuesday</th>
                     <td>7AM–11PM</td>
                   </tr>
                   <tr>
                     <th>Wednesday</th>
                     <td>7AM–11PM</td>
                   </tr>
                   <tr>
                     <th>Thursday</th>
                     <td>7AM–11PM</td>
                   </tr>
                   <tr>
                     <th>Friday</th>
                     <td>7AM–7PM</td>
                   </tr>
                   <tr>
                     <th>Saturday</th>
                     <td>Closed</td>
                   </tr>
                  </table>
                  </div>
                  <h2>
                   Description
                   </h2>
                   <body>
                   HAAS Hall has 3 entrances (1 on the South end; 1 on the west side of the building; 1 on the east side of the building) and consists of 3 floors.  The ground floor has student offices, classrooms, and instructional labs.  The 1st floor has faculty, staff, and student offices, instructional lab, and conference rooms.  The 2nd floor has faculty, staff, and student offices/labs, machine rooms, conference rooms, instructional lab, and kitchenette.
                   </body>
                   <br></br>
                   <h2>
                   Evacuation Areas
                   </h2>
                   <body>
                   <b>Primary location:</b><br></br>The Emergency Assembly Area location outside will be the grass lot at the east side of HAAS when weather permits.  There will be HAAS/LWSN staff taking a roll call so please stay in the assembly area until dismissed by Purdue Police.<br></br>
                   <b>Secondary location:</b><br></br>The inside location will be in the Armory just inside the south door in inclement weather.  There will be HAAS/LWSN staff taking a roll call so please stay in the assembly area until dismissed by Purdue Police.
                </body>
                </FormControl>
              </Fade>
            </Box>
            )}

            {(selectedBuilding === "Lawson Building") && (
              <Box>
              <Fade left>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-lawsonfloor">Select a Floor Plan</InputLabel>
                  <Select
                    style={{ textAlign: 'left' }}
                    labelId="dropdown-label-lawsonfloor"
                    id="dropdown-lawsonfloor"
                    value={selectedFloor}
                    label="Select a Floor Plan"
                  >
                      <MenuItem value={"Lawson Basement"} onClick={handleFloorClick}>Lawson Basement</MenuItem>
                      <MenuItem value={"Lawson First floor"} onClick={handleFloorClick}>Lawson First floor</MenuItem>
                      <MenuItem value={"Lawson Second floor"} onClick={handleFloorClick}>Lawson Second floor</MenuItem>
                      <MenuItem value={"Lawson Third floor"} onClick={handleFloorClick}>Lawson Third floor</MenuItem>
                  </Select>
                  <div className="row"><table style={{margin: "20px"}}>
                     <tr>
                       <th>Sunday</th>
                       <td>7AM–10:30PM</td>
                     </tr>
                     <tr>
                       <th>Monday</th>
                       <td>7AM–10:30PM</td>
                     </tr>
                     <tr>
                       <th>Tuesday</th>
                       <td>7AM–10:30PM</td>
                     </tr>
                     <tr>
                       <th>Wednesday</th>
                       <td>7AM–10:30PM</td>
                     </tr>
                     <tr>
                       <th>Thursday</th>
                       <td>7AM–10:30PM</td>
                     </tr>
                     <tr>
                       <th>Friday</th>
                       <td>7AM–10:30PM</td>
                     </tr>
                     <tr>
                       <th>Saturday</th>
                       <td>7AM–10:30PM</td>
                     </tr>
                  </table>
                  </div>
                  <h2>
                  Description
                  </h2>
                  <body>
                  The Lawson Building has 4 entrances: - 1 on the North end; 1 on the South end; 1 on the Southwest end; 1 on Southeast

                  end The Lawson Building has 4 floors.
                  - The basement has student offices, classrooms, and instructional labs. - The 1st floor has faculty and staff offices, classrooms, conference rooms, an eatery,
                  </body>
                  <br></br>
                  <h2>
                  Evacuation Areas
                  </h2>
                  <body>
                  <b>Primary location:</b><br></br>
                  NORTHSIDE PARKING LOT - at the north end of Lawson when weather permits. There will be LWSN staff taking a roll call so, please stay in the assembly area until dismissed by Purdue Police.<br></br>

                  <b>Secondary location:</b><br></br>
                  ARMORY - just inside the south door in inclement weather. There will be LWSN staff taking a roll call so, please stay in the assembly area until dismissed by Purdue Police.
                  </body>
                </FormControl>
              </Fade>
            </Box>
            )}

            {(selectedBuilding === "Dudley and Lambertus Hall") && (
              <Box>
              <Fade left>
                <br/>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label-dlfloor">Select a Floor Plan</InputLabel>
                  <Select
                    style={{ textAlign: 'left' }}
                    labelId="dropdown-label-dlfloor"
                    id="dropdown-dlfloor"
                    value={selectedFloor}
                    label="Select a Floor Plan"
                  >
                      <MenuItem value={"DL Basement"} onClick={handleFloorClick}>DL Basement</MenuItem>
                      <MenuItem value={"DL First floor"} onClick={handleFloorClick}>DL First floor</MenuItem>
                      <MenuItem value={"DL Second floor"} onClick={handleFloorClick}>DL Second floor</MenuItem>
                      <MenuItem value={"DL Third floor"} onClick={handleFloorClick}>DL Third floor</MenuItem>
                      <MenuItem value={"DL Fourth floor"} onClick={handleFloorClick}>DL Fourth floor</MenuItem>
                      <MenuItem value={"DL Fifth floor"} onClick={handleFloorClick}>DL Fifth floor</MenuItem>
                  </Select>
                  <div className="row"><table style={{margin: "20px"}}>
                   <tr>
                     <th>Sunday</th>
                     <td>Closed</td>
                   </tr>
                   <tr>
                     <th>Monday</th>
                     <td>6AM–1AM</td>
                   </tr>
                   <tr>
                     <th>Tuesday</th>
                     <td>6AM–1AM</td>
                   </tr>
                   <tr>
                     <th>Wednesday</th>
                     <td>6AM–1AM</td>
                   </tr>
                   <tr>
                     <th>Thursday</th>
                     <td>6AM–1AM</td>
                   </tr>
                   <tr>
                     <th>Friday</th>
                     <td>6AM–1AM</td>
                   </tr>
                   <tr>
                     <th>Saturday</th>
                     <td>Closed</td>
                   </tr>
                 </table>
                 </div>
                 <h2>
                   Description
                   </h2>
                   <body>
                   The Dudley Building has 5 entrances: - 1 on the North end; 1 on the South end; 1 on the Southwest end; 1 on Southeast end; 1 on the West end
<br></br>
                   The Dudley Building has 5 floors.
                   </body>
                   <br></br>
                   <h2>
                   Evacuation Areas
                   </h2>
                   <body>
                   <b>Primary location:</b><br></br>Academy Park and Grant Street Parking Garage pedestrian entrance<br></br>
                   <b>Secondary location:</b><br></br> Stewart Center or Union Club Hotel
                </body>
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
                  src={"/Images/lawson_basement.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "Lawson First floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/lawson_first_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "Lawson Second floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/lawson_second_floor.png"}
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            {(selectedFloor === "Lawson Third floor") && (
              <Box>
                <br/>
                <img 
                  src={"/Images/lawson_third_floor.png"}
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
