// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { Modal, Button } from "react-bootstrap";
import Confetti from "react-confetti";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Assuming you have this already
import { useGetRoomsMutation } from "../slices/roomsApiSlice.js";
const localizer = momentLocalizer(moment);
import { useCreateReservationMutation } from "../slices/usersApiSlice.js";

function Reservation() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [viewingSlotsRoom, setViewingSlotsRoom] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [minCapacity, setMinCapacity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const[createReservation] = useCreateReservationMutation()

  const isOverlapping = (start1, end1, start2, end2, date) => {
    // console.log("date", date);
    // console.log("selectedDate", selectedDate);
    // console.log(date === selectedDate);
    return start1 < end2 && start2 < end1 && date === selectedDate;
  };

  // eslint-disable-next-line no-unused-vars
  const [getRooms, { data }] = useGetRoomsMutation();
  useEffect(() => {
    getRooms();
  }, []);
  //console.log(data)

  const filterRooms = ()=> {
    if (!data || !data) return [];

    return data.filter((room) => {
      //console.log(room);
      //console.log(room.reserved_time_slots);
      const conflicts = room.reserved_time_slots.some((slot, index) => {
        //console.log(slot.time);
        const [reservedStart, reservedEnd] = slot.time.split("-");
        // console.log("room", room);
        // console.log(
        //   isOverlapping(
        //     startTime,
        //     endTime,
        //     reservedStart,
        //     reservedEnd,
        //     room.reservedDates[index]
        //   )
        // );
        return isOverlapping(
          startTime,
          endTime,
          reservedStart,
          reservedEnd,
          room.reserved_dates[index].date
        );
      });

      return (
        (selectedBuilding ? room.building === selectedBuilding : true) &&
        (selectedType ? room.type === selectedType : true) &&
        room.capacity >= minCapacity &&
        !conflicts
      );
    });
  };
  const filteredRooms = filterRooms();
  const getRoomAvailabilityColor = (count) => {
    if (count < 5) return "text-danger"; // red for less
    if (count >= 5 && count <= 10) return "text-warning"; // orange for medium
    if (count > 10 && count <= 15) return "text-primary"; // blue for good (used blue instead of yellow for better readability)
    return "text-success"; // green for enough
  };

  const handleReserve = async (room) => {
    const confirmMessage = `
        Do you want to reserve Room ${room.room_num} in ${room.building}?
        Type: ${room.type}
        Capacity: ${room.capacity}
        Date: ${selectedDate}
        Time Slot: ${startTime} - ${endTime}
    `;
    const userConfirmed = window.confirm(confirmMessage);
  
    if (userConfirmed) {
      // Send request to backend to reserve the room
      console.log(`Reserving room ${room.room_num} in ${room.building}`);
  
      const reservationData = {
        room_num: room.room_num,
        date: selectedDate,
        time_slot: `${startTime}-${endTime}`,
        building: room.building
      }
      await createReservation(reservationData);
      // Simulate a delay or an asynchronous action like sending a request to the backend
      setTimeout(() => {
        // After successful reservation, show the modal
        setShowSuccessModal(true);
      }, 1000);
  
      // Fetch the updated data
      getRooms();
    } else {
      console.log("User canceled the reservation.");
      // Optional: Add any other logic for when the user cancels the reservation.
    }
  };
  

  const handleViewSlots = (room) => {
    if (viewingSlotsRoom === room.room_num) {
      setViewingSlotsRoom(null);
    } else {
      setViewingSlotsRoom(room.room_num);
    }
  };

  const timeToMinutes = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  };

  const renderTimeOptions = (excludeCondition) => {
    return Array(48)
      .fill()
      .map((_, i) => {
        const hour24 = Math.floor(i / 2);
        const minute = i % 2 === 0 ? "00" : "30";
        const currentValue = `${String(hour24).padStart(2, "0")}:${minute}`;

        // If excludeCondition is provided, and this time value satisfies it, skip this iteration
        if (excludeCondition && excludeCondition(currentValue)) {
          return null;
        }

        const period = hour24 >= 12 ? "PM" : "AM";
        const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;

        return (
          <option key={i} value={currentValue}>
            {`${hour12}:${minute} ${period}`}
          </option>
        );
      });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col">
            <select
              className="form-select"
              onChange={(e) => setSelectedBuilding(e.target.value)}
            >
              <option value="">All Buildings</option>
              <option value="Krach">Krach</option>
              <option value="Young Hall">Young Hall</option>
              <option value="WALC">WALC</option>
            </select>
          </div>
          <div className="col">
            <select
              className="form-select"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="classroom">Classroom</option>
              <option value="recreational">Recreational</option>
            </select>
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Minimum Capacity"
              value={minCapacity}
              onChange={(e) => setMinCapacity(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              onChange={(e) => setStartTime(e.target.value)}
            >
              <option value="">Start Time</option>
              {renderTimeOptions(false)}
            </select>
          </div>
          <div className="col">
            <select
              className="form-select"
              onChange={(e) => setEndTime(e.target.value)}
            >
              <option value="">End Time</option>
              {renderTimeOptions(
                startTime &&
                  ((time) => timeToMinutes(time) <= timeToMinutes(startTime))
              )}
            </select>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col d-flex justify-content-center align-items-center">
            <h5 className={getRoomAvailabilityColor(filteredRooms.length)}>
              {filteredRooms.length} room{filteredRooms.length !== 1 ? "s" : ""}{" "}
              available
            </h5>
          </div>
        </div>
        <div className="row">
          {filterRooms().map((room) => (
            <div key={room.room_num} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {room.building} - Room {room.room_num}
                  </h5>
                  <p className="card-text">Capacity: {room.capacity}</p>
                  <p className="card-text">Type: {room.type}</p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleReserve(room)}
                  >
                    Reserve
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleViewSlots(room)}
                  >
                    View Slots
                  </button>
                </div>
                {viewingSlotsRoom === room.room_num && (
                  <div className="card-footer">
                    <Calendar
                      localizer={localizer}
                      events={room.reserved_time_slots.map((slot, index) => {
                        const [start, end] = slot.time.split("-");
                        const startDateString =
                          room.reserved_dates[index].date + " " + start;
                        const endDateString =
                          room.reserved_dates[index].date + " " + end;
                        return {
                          title: "Reserved",
                          start: new Date(startDateString),
                          end: new Date(endDateString),
                        };
                      })}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: 500 }}
                      defaultView={Views.DAY}
                      defaultDate={selectedDate}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <div className="celebratory-animation">
            {/* Place for celebratory animation */}
            🎉
            <Confetti width={500} height={500} />
          </div>
          <p>Reserved Successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSuccessModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Reservation;
