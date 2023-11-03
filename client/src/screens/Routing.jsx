import { useRef, useState, React } from "react";
import "./Routing.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { current } from "@reduxjs/toolkit";

const center = {
  lat: 40.4237,
  lng: -86.9212,
};

const Routing = () => {
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedMode, setSelectedMode] = useState("DRIVING");
  const [buttonText, setButtonText] = useState('Route');
  const [buttonColor, setButtonColor] = useState('blue');
  const [thread, setThread] = useState(null);

  const handleClick = () => {
    if (middle == null || destiantionRef.current.value === "") {
      return;
    }
    if (buttonColor === 'blue') {
      setButtonText('Cancel');
      setButtonColor('red');
      const interval = setInterval(calculateRoute, 10000);
      console.log(interval);
      setThread(interval);
    } else {
      setButtonText('Route');
      setButtonColor('blue');
      endRoute();
    }
  };

  function endRoute() {
    if (thread == null) {
      return;
    }
    clearInterval(thread);
    setThread(null);
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJwrtGRidk0_vtNzqTdGS2SFC8fkV9MPg",
    libraries: ["places", "drawing"],
  });



  function calculateRoute() {
    console.log("route")
    if (navigator.geolocation) {
      const position = navigator.geolocation.getCurrentPosition(storePosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }



  const [middle, setMiddle] = useState(null);
  function storePosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log(lat + ": " + lng);
    let m = { "lat": lat, "lng": lng };
    setMiddle(m);
    setRoute();
  }

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const destiantionRef = useRef();


  async function setRoute() {
    if (middle == null || destiantionRef.current.value === "") {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: middle,
      destination: destiantionRef.current.value,
      travelMode: selectedMode,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    if (results.routes[0].legs[0].distance.value < 50) {
      endRoute();
    }
  }


  function clearRoute() {
    setMap(null);
    setDistance('')
    setDuration('')
    setDirectionsResponse(null)
    destiantionRef.current.value = "";
  }


  function changeMode(value) {
    setSelectedMode(value)
    if (middle == null || destiantionRef.current.value === "") {
      return;
    }
    setDirectionsResponse(null);
    setDistance('')
    setDuration('')
    setRoute();
    window.location.reload(false);
  }



  return isLoaded ? (
    <>
      <div className="searchbox">
        <div className="row">
          <div className="col-lg-4">
            <Autocomplete>
              <input
                type="text"
                name="Destination"
                className="form-control"
                placeholder="Destination"
                ref={destiantionRef}
              />
            </Autocomplete>
          </div>
          <div className="col-lg-2">
            <button
              type="submit"
              name="submit"
              className="btn btn-primary"
              onClick={calculateRoute}
            >
              Search
            </button>
          </div>
          <div className="col-lg-2">
            <button
              type="submit"
              name="clear"
              className="btn btn-danger"
              onClick={clearRoute}
            >
              Clear
            </button>
          </div>
          <div>
            <label>Select Mode of Transportation:</label>
            <select value={selectedMode} onChange={(e) => changeMode(e.target.value)}>
              <option value="DRIVING">Driving</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
              <option value="WALKING">Walking</option>
            </select>
          </div>
          <div>
            <label>Distance:</label>
            <span>{distance}</span>
          </div>
          <div>
            <label>Time:</label>
            <span>{duration}</span>
          </div>
          <button
            style={{ backgroundColor: buttonColor }}
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}

        onLoad={(map) => setMap(map)}
        onUnmount={() => setMap(null)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default Routing;