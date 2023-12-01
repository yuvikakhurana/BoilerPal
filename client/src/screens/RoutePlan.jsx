import React, { useEffect, useState } from "react";
import Triangle from "../components/Triangle";
import TextContent from "../components/TextContent";
import Fade from "react-reveal/Fade";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TextField,
  Button,
  ListItemText,
} from "@mui/material";
import TempData from "./TempData";
import Building from "./Buildings";
import { useGetAllItemsMutation } from "../slices/usersApiSlice";

const sortByEndTime = (data) => {
  return data.sort((a, b) => {
    // Function to convert time string to minutes
    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    // Extracting the end times
    const endTimeA = a.time.split('-')[1].trim();
    const endTimeB = b.time.split('-')[1].trim();

    // Converting end times to minutes
    const minutesA = timeToMinutes(endTimeA);
    const minutesB = timeToMinutes(endTimeB);

    // Sorting based on the end times
    return minutesA - minutesB;
  });
};


const reformatData = (data) => {
  const formattedData = [];

  // Process classes
  if (data.classes && data.classes.length > 0) {
    data.classes.forEach((cls) => {
      if (cls.date === "2023-12-01") {
        formattedData.push({
          building: cls.location,
          time: cls.time_slot,
        });
      }
    });
  }

  // Process reservations
  if (data.reservations && data.reservations.length > 0) {
    data.reservations.forEach((reservation) => {
      if (reservation.date === "2023-12-01") {
        formattedData.push({
          building: reservation.building,
          time: reservation.time_slot,
        });
      }
    });
  }

  return formattedData;
};


const convertToRFC3339 = (dateStr, timeStr) => {
  // Create a JavaScript Date object in the Eastern Time zone
  const etDate = new Date(`${dateStr}T${timeStr}Z`);

  // Check if daylight saving time is in effect
  // const isDST = etDate.getTimezoneOffset() < 0;

  // Calculate the UTC offset (hours) based on daylight saving time
  const utcOffset = 4;

  // Calculate the UTC time by adding the offset to the ET time
  etDate.setHours(etDate.getHours() + utcOffset);

  // Format the UTC time as an RFC3339 string
  const year = etDate.getUTCFullYear();
  const month = (etDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = etDate.getUTCDate().toString().padStart(2, "0");
  const hours = etDate.getUTCHours().toString().padStart(2, "0");
  const minutes = etDate.getUTCMinutes().toString().padStart(2, "0");
  const seconds = etDate.getUTCSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

const fetchData = async (originAddress, destinationAddress, time) => {
  const apiKey = "AIzaSyDJePf8qo_W-SRVelBwe4fe1MqrSqMlwkM";
  // console.log(apiKey);

  const requestBody = {
    origin: {
      address: originAddress,
    },
    destination: {
      address: destinationAddress,
    },
    travelMode: "TRANSIT",
    computeAlternativeRoutes: false,
    languageCode: "en-US",
    units: "IMPERIAL",
    arrivalTime: time,
  };

  try {
    const response = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "routes.*",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      return "404";
    }

    const responseData = await response.json();
    return responseData;

    // console.log(data);
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

const RoutePlanner = () => {
  // const [originAddress, setOriginAddress] = useState("");
  // const [destinationAddress, setDestinationAddress] = useState("");
  const [home, setHome] = useState("");
  // const [data, setData] = useState(null);
  const [showRoutingUI, setShowRoutingUI] = useState(false);
  // const [isDataAvailable, setIsDataAvailable] = useState(true);
  // const [travelSegments, setTravelSegments] = useState(null);
  // const [steps, setSteps] = useState(null);
  // const [initialWalk, setInitialWalk] = useState(false);
  // const [finalWalk, setFinalWalk] = useState(false);
  // const [finalWalkStartIndex, setFinalWalkStartIndex] = useState(-1);
  // const [finalWalkEndIndex, setFinalWalkEndIndex] = useState(-1);
  const [schedule, setSchedule] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [getItems, { data }] = useGetAllItemsMutation();

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (data) {
      //console.log(data);
    }
  }, [data]);

  //   let travelSegments = null;
  //   let steps = null;

  const handleSubmit = () => {
    const newSchedule = sortByEndTime(reformatData(data));
    console.log(newSchedule);
    setSchedule(newSchedule);
  };

  useEffect(() => {
    const helper = async () => {
      if (schedule !== null) {
        // console.log(schedule);
        let arr = [];
        for (let i = 0; i < schedule.length; i++) {
          let originAdr = "";
          if (i === 0) {
            originAdr = home;
          } else {
            originAdr = Building[schedule[i - 1].building];
          }
          let destAdr = Building[schedule[i].building];
          let time = schedule[i].time;
          const timeParts = time.split("-");
          const secondHalf = timeParts[1] + ":00";

          const today = new Date();

          const year = today.getFullYear();
          const month = today.getMonth() + 1;
          const day = today.getDate();

          const formattedDate = `${year}-${month
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

          const dateStr = formattedDate;
          const timeStr = secondHalf;

          const rfc3339Timestamp = convertToRFC3339("2023-12-08", timeStr);

          const data = await fetchData(originAdr, destAdr, rfc3339Timestamp);
          arr.push(data);
        }
        setDataArray(arr);
      }
    };

    helper();
    // console.log(Building[schedule[0].building]);
    // console.log(schedule[0]);
  }, [schedule]);

  useEffect(() => {
    if (dataArray !== null) {
      console.log(dataArray);
      setShowRoutingUI(true);
    }
  }, [dataArray]);

  const resetStates = () => {
    setSchedule(null);
    setDataArray([]);
    setShowRoutingUI(false);
  };
  // Origin: Purdue Memorial Union
  // Destination: Hillenbrand Hall

  return (
    <section className="feature_section home_section2 bg_1" id="connect">
      <div
        className="custom_container"
        style={{ minHeight: "100vh", height: "auto" }}
      >
        <div className="row">
          <div className="col-md-7 my-auto">
            <Box>
              <Fade left>
                <TextContent
                  title="Generate a route plan for the day!"
                  desc="Go ahead and generate a planner for today to know exactly which bus to catch and when!"
                />
                <br />
                <h6>Enter your dorm/apartment address and hit generate!</h6>
                <br />
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    id="outlined-required"
                    variant="outlined"
                    label="Dorm or Apartment address"
                    onChange={(e) => {
                      setHome(e.target.value);
                      resetStates();
                    }}
                  />
                  <br />
                  <Button
                    variant="contained"
                    sx={{
                      width: "200px",
                      backgroundColor: "black",
                    }}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Generate my route plan!
                  </Button>
                  <br />
                  <br />
                </FormControl>
              </Fade>
            </Box>

            {showRoutingUI && (
              <Box>
                <Fade down>
                  <Box>
                    {dataArray.map((data, index) => {
                      const travelSegments =
                        data.routes[0].legs[0].stepsOverview.multiModalSegments;
                      const steps = data.routes[0].legs[0].steps;
                      const initialWalk =
                        travelSegments &&
                        travelSegments[0].travelMode === "WALK"
                          ? true
                          : false;
                      const len = travelSegments && travelSegments.length;
                      let finalWalk = false;
                      if (len !== 1) {
                        finalWalk =
                          travelSegments &&
                          travelSegments[len - 1].travelMode === "WALK"
                            ? true
                            : false;
                      }
                      let finalWalkStartIndex = -1;
                      let finalWalkEndIndex = -1;
                      if (finalWalk) {
                        finalWalkStartIndex =
                          travelSegments &&
                          travelSegments[len - 1].stepStartIndex;
                        finalWalkEndIndex =
                          travelSegments &&
                          travelSegments[len - 1].stepEndIndex;
                      }
                      const dest = Building[schedule[index].building];

                      return (
                        <>
                          <h4>{`Head to ${dest}`}</h4>
                          <Box>
                            <br />
                            <br />
                            <h5>{`Distance between the stops: ${data.routes[0].localizedValues.distance.text}`}</h5>
                            <h5>{`Estimated time to reach ${dest}: ${data.routes[0].localizedValues.duration.text}`}</h5>
                            <br />
                            <br />

                            {initialWalk && finalWalk && (
                              <h5>{`${travelSegments[0].navigationInstruction.instructions}`}</h5>
                            )}
                            {initialWalk && !finalWalk && (
                              <h5>{`Walk to destination (No buses available!)`}</h5>
                            )}
                            <br />

                            {travelSegments.map((mode, index) => {
                              if (mode.travelMode === "TRANSIT") {
                                const stepIndex = mode.stepStartIndex;
                                const busNumber =
                                  data.routes[0].legs[0].steps[stepIndex]
                                    .transitDetails.transitLine.nameShort;
                                const busName =
                                  data.routes[0].legs[0].steps[stepIndex]
                                    .transitDetails.transitLine.name;
                                const depStop =
                                  data.routes[0].legs[0].steps[stepIndex]
                                    .transitDetails.stopDetails.departureStop
                                    .name;
                                const depTime =
                                  data.routes[0].legs[0].steps[stepIndex]
                                    .transitDetails.localizedValues
                                    .departureTime.time.text;
                                const arrStop =
                                  data.routes[0].legs[0].steps[stepIndex]
                                    .transitDetails.stopDetails.arrivalStop
                                    .name;
                                const arrTime =
                                  data.routes[0].legs[0].steps[stepIndex]
                                    .transitDetails.localizedValues.arrivalTime
                                    .time.text;
                                return (
                                  <>
                                    <h5>{`${mode.navigationInstruction.instructions}`}</h5>
                                    <h6>{`- Bus number: ${busNumber}`}</h6>
                                    <h6>{`- Bus name: ${busName}`}</h6>
                                    <h6>{`- Departure stop: ${depStop}`}</h6>
                                    <h6>{`- Departure time: ${depTime}`}</h6>
                                    <h6>{`- Arrival stop: ${arrStop}`}</h6>
                                    <h6>{`- Arrival time: ${arrTime}`}</h6>
                                    <br />
                                    <br />
                                  </>
                                );
                              } else if (
                                mode.travelMode === "WALK" &&
                                index != 0 &&
                                index != travelSegments.length - 1
                              ) {
                                const startIndex = mode.stepStartIndex;
                                const endIndex = mode.stepEndIndex;
                                return (
                                  <>
                                    <h5>{"Walk: "}</h5>
                                    {steps.map((step, index) => {
                                      if (
                                        index >= startIndex &&
                                        index <= endIndex
                                      ) {
                                        if (step.navigationInstruction) {
                                          const text =
                                            step.navigationInstruction
                                              .instructions;
                                          return <h6>{`- ${text}`}</h6>;
                                        }
                                      }
                                    })}
                                    <br />
                                    <br />
                                  </>
                                );
                              }
                            })}

                            {finalWalk && <h5>{"Walk to destination"}</h5>}

                            {finalWalk &&
                              steps.map((step, index) => {
                                if (
                                  index >= finalWalkStartIndex &&
                                  index <= finalWalkEndIndex
                                ) {
                                  if (step.navigationInstruction) {
                                    const text =
                                      step.navigationInstruction.instructions;
                                    return (
                                      <>
                                        <h6>{`- ${text}`}</h6>
                                      </>
                                    );
                                  }
                                }
                              })}

                            <br />
                            <br />
                          </Box>
                        </>
                      );
                    })}
                  </Box>
                </Fade>
              </Box>
            )}
          </div>
        </div>
      </div>
      <Triangle />
    </section>
  );
};

export default RoutePlanner;
