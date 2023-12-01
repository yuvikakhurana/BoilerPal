import React, { useEffect } from "react";
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
  ListItemText
} from "@mui/material";
import { useState } from "react";

const fetchData = async (originAddress, destinationAddress) => {
    const apiKey = "AIzaSyDJePf8qo_W-SRVelBwe4fe1MqrSqMlwkM";
    // console.log(apiKey);

    // if (latitude === "none") {
    const requestBody = {
        origin: {
            address: originAddress
        },
        destination: {
            address: destinationAddress
        },
        travelMode: "TRANSIT",
        computeAlternativeRoutes: false,
        languageCode: "en-US",
        units: "IMPERIAL",
    };
    // } else {
    //     requestBody = {
    //         origin: {
    //             address: originAddress
    //         },
    //         destination: {
    //             address: destinationAddress
    //         },
    //         travelMode: "TRANSIT",
    //         computeAlternativeRoutes: false,
    //         languageCode: "en-US",
    //         units: "IMPERIAL",
    //     };
    // }

    try {
        const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "routes.*",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            return "404";
        }

        const responseData = await response.json();
        return responseData;

        // console.log(data);

    } catch(error) {
        console.error("Error: ", error.message);
    }
};

const fetchAddress = async (latitude, longitude) => {
    const apiKey = "AIzaSyCxH3KVB-Kp0x_0fFMpTQk8KWh09bvGXFw";
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch address");
        }

        const data = await response.json();
        return data;

        // console.log(data);
    } catch(error) {
        console.error("Error fetching address");
    }
};

const BusSchedules = () => {
    const [originAddress, setOriginAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [data, setData] = useState(null);
    const [showRoutingUI, setShowRoutingUI] = useState(false);
    const [isDataAvailable, setIsDataAvailable] = useState(true);
    const [travelSegments, setTravelSegments] = useState(null);
    const [steps, setSteps] = useState(null);
    const [initialWalk, setInitialWalk] = useState(false);
    const [finalWalk, setFinalWalk] = useState(false);
    const [finalWalkStartIndex, setFinalWalkStartIndex] = useState(-1);
    const [finalWalkEndIndex, setFinalWalkEndIndex] = useState(-1);
    const [checked, setChecked] = useState(false);
    const [isCurrentLocation, setIsCurrentLocation] = useState(true);
    const [latitude, setLatitude] = useState("none");
    const [longitude, setLongitude] = useState("none");
    const [formatOriginAddress, setFormatOriginAddress] = useState(null);
    const [isLocationLoaded, setIsLocationLoaded] = useState(true);

    //   let travelSegments = null;
    //   let steps = null;

    // console.log(`Initially: ${isCurrentLocation}`);

    useEffect(() => {
        if (checked === true) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    setLatitude(lat);
                    setLongitude(long);
                    // console.log(`latitude: ${latitude}`);
                    // console.log(`longitude: ${longitude}`);
                },
                error => {
                    console.error(error.message);
                }
            );
            // console.log("reached");
        } else {
            setLatitude("none");
            setLongitude("none");
            setFormatOriginAddress(null);
            // console.log(`latitude: ${latitude}`);
            // console.log(`longitude: ${longitude}`);
        }
    }, [checked]);

    // useEffect(() => {
    //     console.log(`latitude: ${latitude}`);
    //     console.log(`longitude: ${longitude}`);
    // }, [latitude, longitude]);

    const handleCurrentLocation = (event) => {
        setChecked(event.target.checked);
        setIsCurrentLocation(!isCurrentLocation);
        resetStates();
        // console.log(isCurrentLocation);
    }

    const handleSubmit = async () => {
        console.log(`checked: ${checked}`);

        let data;

        if (checked === true) {
            if (latitude !== "none" && longitude !== "none") {
                setIsLocationLoaded(true);
                resetStates();
                console.log(`latitude: ${latitude}`);
                console.log(`longitude: ${longitude}`);
                const address = await fetchAddress(latitude, longitude);
                console.log(address.results[0].formatted_address);
                setFormatOriginAddress(address.results[0].formatted_address);
                data = await fetchData(formatOriginAddress, destinationAddress);
            } else {
                data = "404";
                setIsLocationLoaded(false);
            }
        } else {
            data = await fetchData(originAddress, destinationAddress);
        }

        console.log("here:");
        console.log(data);

        if (data === "404") {
            setShowRoutingUI(true);
            setIsDataAvailable(false);
        } else {
            setData(data);
            console.log(data);
            setTravelSegments(data.routes[0].legs[0].stepsOverview.multiModalSegments);
            console.log(travelSegments);
            setSteps(data.routes[0].legs[0].steps);
            const res1 = (travelSegments && travelSegments[0].travelMode === "WALK") ? true : false;
            setInitialWalk(res1);
            const len = travelSegments && travelSegments.length;
            if (len !== 1) {
                setFinalWalk((travelSegments && travelSegments[travelSegments.length - 1].travelMode === "WALK") ? true : false);
            }
            if (finalWalk) {
                setFinalWalkStartIndex(travelSegments && travelSegments[travelSegments.length - 1].stepStartIndex);
                setFinalWalkEndIndex(travelSegments && travelSegments[travelSegments.length - 1].stepEndIndex);
            }
            setShowRoutingUI(true);
            //console.log(data);
        }
        console.log(isDataAvailable);
    };

    const resetStates = () => {
        setData(null);
        setIsDataAvailable(true);
        setTravelSegments(null);
        setSteps(null);
        setInitialWalk(false);
        setFinalWalk(false);
        setFinalWalkStartIndex(-1);
        setFinalWalkEndIndex(-1);
        setShowRoutingUI(false);
    }
    // Origin: Purdue Memorial Union
    // Destination: Hillenbrand Hall

    return (
        <section className="feature_section home_section2 bg_1" id="connect">
        <div className="custom_container" style={{ minHeight: "100vh", height: "auto" }}>
            <div className="row">
            <div className="col-md-7 my-auto">

                <Box>
                <Fade left>
                    <TextContent
                    title="Travel around campus without hassle!"
                    desc="Use our Bus Schedule feature to check City Bus times to your desired destination, and also get navigation instructions!"
                    />
                    <br/>
                    <h6>Please provide the address followed by the city to avoid erroneous output</h6>
                    <br/>
                    <FormControl variant="outlined" fullWidth>
                        {/* <InputLabel id="dropdown-label-origin">Select origin address</InputLabel> */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" checked={checked} onChange={handleCurrentLocation} />
                            <span style={{ marginLeft: "8px" }}>Use Current Location</span>
                        </div>
                        <br/>
                        <TextField
                            id="outlined-required"
                            variant="outlined"
                            label="Origin Address"
                            onChange={(e) => {
                                setOriginAddress(e.target.value);
                                resetStates();
                            }}
                        />
                        <br/>
                        <TextField
                            id="outlined-required"
                            variant="outlined"
                            label="Destination Address"
                            onChange={(e) => {
                                setDestinationAddress(e.target.value);
                                resetStates();
                            }}
                        />
                        <br/>
                        <Button 
                            variant="contained"
                            sx={{
                                width: "200px",
                                backgroundColor: "black"
                            }}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Get Bus Times!
                        </Button>
                    </FormControl>
                </Fade>
                </Box>
                
                {(showRoutingUI && isDataAvailable) && (
                    <Box>
                        <Fade down>
                            <Box>
                                <br/>
                                <br/>
                                <h5>{`Distance between the stops: ${data.routes[0].localizedValues.distance.text}`}</h5>
                                <h5>{`Estimated time to reach ${destinationAddress}: ${data.routes[0].localizedValues.duration.text}`}</h5>
                                <br/>
                                <br/>

                                {(initialWalk && finalWalk) && 
                                    <h5>{`${travelSegments[0].navigationInstruction.instructions}`}</h5>
                                }
                                {(initialWalk && !finalWalk) &&
                                    <h5>{`Walk to destination (No buses available!)`}</h5>
                                }
                                <br/>

                                {travelSegments.map((mode, index) => {
                                    if (mode.travelMode === "TRANSIT") {
                                        const stepIndex = mode.stepStartIndex;
                                        const busNumber = data.routes[0].legs[0].steps[stepIndex].transitDetails.transitLine.nameShort;
                                        const busName = data.routes[0].legs[0].steps[stepIndex].transitDetails.transitLine.name;
                                        const depStop = data.routes[0].legs[0].steps[stepIndex].transitDetails.stopDetails.departureStop.name;
                                        const depTime = data.routes[0].legs[0].steps[stepIndex].transitDetails.localizedValues.departureTime.time.text;
                                        const arrStop = data.routes[0].legs[0].steps[stepIndex].transitDetails.stopDetails.arrivalStop.name;
                                        const arrTime = data.routes[0].legs[0].steps[stepIndex].transitDetails.localizedValues.arrivalTime.time.text;
                                        return (
                                            <>
                                                <h5>{`${mode.navigationInstruction.instructions}`}</h5>
                                                <h6>{`- Bus number: ${busNumber}`}</h6>
                                                <h6>{`- Bus name: ${busName}`}</h6>
                                                <h6>{`- Departure stop: ${depStop}`}</h6>
                                                <h6>{`- Departure time: ${depTime}`}</h6>
                                                <h6>{`- Arrival stop: ${arrStop}`}</h6>
                                                <h6>{`- Arrival time: ${arrTime}`}</h6>
                                                <br/>
                                                <br/>
                                            </>
                                        );
                                    } else if (mode.travelMode === "WALK" && (index != 0 && index != travelSegments.length - 1)) {
                                        const startIndex = mode.stepStartIndex;
                                        const endIndex = mode.stepEndIndex;
                                        return (
                                            <>
                                                <h5>{"Walk: "}</h5>
                                                {steps.map((step, index) => {
                                                    if (index >= startIndex && index <= endIndex) {
                                                        if (step.navigationInstruction) {
                                                            const text = step.navigationInstruction.instructions;
                                                            return (
                                                                <h6>{`- ${text}`}</h6>
                                                            );
                                                        }
                                                    }
                                                })}
                                                <br/>
                                                <br/>
                                            </>
                                        );
                                    }
                                })}

                                {finalWalk &&
                                    <h5>{"Walk to destination"}</h5>
                                }

                                {finalWalk && steps.map((step, index) => {
                                        if (index >= finalWalkStartIndex && index <= finalWalkEndIndex) {
                                            if (step.navigationInstruction) {
                                                const text = step.navigationInstruction.instructions;
                                                return (
                                                    <>
                                                        <h6>{`- ${text}`}</h6>
                                                    </>
                                                );
                                            }
                                        }
                                })}
                            </Box>
                        </Fade>
                    </Box>
                )}

                {(showRoutingUI && !isDataAvailable) &&
                    <>
                        <br/>
                        {isLocationLoaded && (
                            <h5>{"Something went wrong, no buses found. Please try again by putting the correct addresses!"}</h5>
                        )}
                        {!isLocationLoaded && (
                            <h5>{"Application still loading, click the submit button again to fetch results..."}</h5>
                        )}
                    </>
                }

                {/* {(showRoutingUI && !isDataAvailable) &&
                    <>
                        <br/>
                        <h5>{"Something went wrong, no buses found. Please try again by putting the correct addresses!"}</h5>
                    </>
                } */}

            </div>
            </div>
        </div>
        <Triangle />
        </section>
    );
};

export default BusSchedules;