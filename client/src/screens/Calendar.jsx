// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RRule, RRuleSet, rrulestr } from "rrule";
import {
  useCreateClassMutation,
  useCreateEventMutation,
  useGetAllItemsMutation,
  useDeleteClassMutation,
  useDeleteReservationMutation,
  useDeleteEventMutation,
  useEditClassMutation,
  useEditEventMutation,
} from "../slices/usersApiSlice.js";
import { useNavigate } from "react-router-dom";
import Todo from "./Todo/index.jsx";

const localizer = momentLocalizer(moment);

// Function to parse the user data into calendar events
const parseEvents = (user) => {
  const events = [];
  //console.log(user);
  //console.log(user.reservations);

  // Parse reservations
  user.reservations.forEach((reservation) => {
    let [startTime, endTime] = reservation.time_slot.split("-");
    startTime = startTime.trimEnd();
    endTime = endTime.trimStart();
    events.push({
      title: `Reservation - ${reservation.building} Room ${reservation.room_num}`,
      start: new Date(`${reservation.date}T${startTime}:00`),
      end: new Date(`${reservation.date}T${endTime}:00`),
      type: "Reservation",
    });
  });

  parseClassesWithRecurrence(user.classes).forEach((event) => {
    events.push(event);
  });

  // Parse events
  user.events.forEach((eventItem) => {
    let [startTime, endTime] = eventItem.time_slot.split("-");
    startTime = startTime.trimEnd();
    endTime = endTime.trimStart();
    events.push({
      title: eventItem.name,
      start: new Date(`${eventItem.date}T${startTime}:00`),
      end: new Date(`${eventItem.date}T${endTime}:00`),
      type: "Event",
    });
  });
  //console.log(events);

  return events;
};

const mapWeekday = {
  M: RRule.MO,
  T: RRule.TU,
  W: RRule.WE,
  R: RRule.TH,
  F: RRule.FR,
};

const createRRuleString = (startDate, timeSlot, byWeekday) => {
  let [startTime] = timeSlot.split("-");
  let [hour, minute] = startTime.split(":");
  hour = hour.padStart(2, "0");
  startTime = `${hour}:${minute}`;
  startTime = startTime.trimEnd();
  //console.log(startTime);
  //console.log(startDate);
  const rruleDate = new Date(`${startDate}T${startTime}:00`);

  const untilDate = new Date(
    rruleDate.getTime() + 4 * 30 * 24 * 60 * 60 * 1000
  ); // Approximately 4 months

  const ruleSet = new RRuleSet();

  ruleSet.rrule(
    new RRule({
      freq: RRule.WEEKLY,
      interval: 1,
      byweekday: byWeekday.map((day) => mapWeekday[day]),
      dtstart: rruleDate,
      until: untilDate,
    })
  );

  return ruleSet.toString();
};

const parseClassesWithRecurrence = (classes) => {
  return classes.flatMap((classItem) => {
    const rruleString = createRRuleString(
      classItem.date,
      classItem.time_slot,
      classItem.by_weekday.map((wd) => wd.day)
    );

    const rruleSet = rrulestr(rruleString, { forceset: true });
    const dates = rruleSet.all();

    return dates.map((date) => {
      const [startTime, endTime] = classItem.time_slot.split("-");
      const startDate = new Date(date);
      const endDate = new Date(date);

      startDate.setHours(...startTime.split(":").map(Number));
      endDate.setHours(...endTime.split(":").map(Number));

      return {
        title: `Class - ${classItem.name}`,
        start: startDate,
        end: endDate,
        location: classItem.location,
        type: "Class",
      };
    });
  });
};

const MyCalendarComponent = () => {
  const navigate = useNavigate();
  const [createClass] = useCreateClassMutation();
  const [createEvent] = useCreateEventMutation();
  const [events, setEvents] = useState([]);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isTodoVisible, setIsTodoVisible] = useState(false);

  const toggleTodoVisibility = () => {
    setIsTodoVisible((prevState) => !prevState);
  };

  const todoStyle = {
    width: "40%"
  };

  const [classForm, setClassForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    courseName: "",
    recurringDays: [],
  });
  const [taskForm, setTaskForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    name: "",
  });
  const [showEditClassModal, setShowEditClassModal] = useState(false);
  const [editClassForm, setEditClassForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    courseName: "", // This will be fixed and not editable
  });

  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [editTaskForm, setEditTaskForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    name: "", // This will be fixed and not editable
  });

  const [getItems, { data }] = useGetAllItemsMutation();

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (data) {
      setEvents(parseEvents(data));
    }
  }, [data]);

  useEffect(() => {
    getItems();
  }, [events]);

  const handleClassModal = () => setShowClassModal(!showClassModal);
  const handleTaskModal = () => setShowTaskModal(!showTaskModal);
  const [deleteClass] = useDeleteClassMutation();
  const [deleteReservation] = useDeleteReservationMutation();
  const [deleteTask] = useDeleteEventMutation();
  const [editClass] = useEditClassMutation();
  const [editTask] = useEditEventMutation();

  // Handle form changes
  const handleClassFormChange = (e) => {
    const { name, value } = e.target;
    setClassForm({
      ...classForm,
      [name]: value,
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const extractLastNumber = (str) => {
    const matches = str.match(/\d+/g);
    return matches ? matches[matches.length - 1] : null;
  };

  const handleCancelEvent = async (event) => {
    if (event.type === "Reservation") {
      console.log("Canceling reservation:", extractLastNumber(event.title));
      await deleteReservation({ room_num: extractLastNumber(event.title) });
      setShowDetailsModal(false);
    } else if (event.type === "Class") {
      console.log("Canceling class:", event.title.slice(8));
      await deleteClass({ name: event.title.slice(8) });
      setShowDetailsModal(false);
    } else {
      console.log("Canceling task:", event.title);
      await deleteTask({ name: event.title });
      setShowDetailsModal(false);
    }
  };

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: value,
    });
  };

  // Handle recurring days for class
  const handleRecurringDays = (day) => {
    setClassForm({
      ...classForm,
      recurringDays: classForm.recurringDays.includes(day)
        ? classForm.recurringDays.filter((d) => d !== day)
        : [...classForm.recurringDays, day],
    });
  };

  // Submit class form
  const submitClassForm = async () => {
    console.log("Submitting class form:", classForm);
    // You would send this data to your backend API here.
    console.log(classForm);

    let startTime = classForm.startTime;
    let endTime = classForm.endTime;
    let days = classForm.recurringDays;
    console.log(startTime, endTime);
    let formattedDays = days.map((day) => ({ day }));
    //console.log(formattedDays);
    const newClass = {
      name: classForm.courseName,
      date: classForm.date,
      time_slot: `${startTime}-${endTime}`,
      by_weekday: JSON.stringify(formattedDays, null, 2),
      location: classForm.location,
    };
    await createClass(newClass);

    setShowClassModal(false);
  };

  // Submit task form
  const submitTaskForm = async () => {
    console.log("Submitting task form:", taskForm);
    // You would send this data to your backend API here.
    const newTask = {
      name: taskForm.name,
      date: taskForm.date,
      time_slot: `${taskForm.startTime}-${taskForm.endTime}`,
    };
    await createEvent(newTask);

    setShowTaskModal(false);
  };

  // Helper function to render day buttons
  const renderDayButton = (day) => (
    <Button
      variant={classForm.recurringDays.includes(day) ? "primary" : "secondary"}
      onClick={() => handleRecurringDays(day)}
      style={{ marginRight: "20px", width: "40px", height: "40px" }}
    >
      {day}
    </Button>
  );

  const handleReserveClick = () => {
    //navigate("/reserve", {target: "_blank"});
    window.open("/reserve", "_blank");
  };

  const handleEditClassFormChange = (e) => {
    const { name, value } = e.target;
    setEditClassForm({
      ...editClassForm,
      [name]: value,
    });
  };

  const handleEditTaskFormChange = (e) => {
    const { name, value } = e.target;
    setEditTaskForm({
      ...editTaskForm,
      [name]: value,
    });
  };

  const handleEditEvent = (event) => {
    if (event.type === "Class") {
      const [courseName, date, startTime, endTime, location] =
        extractClassDetails(event);
      setEditClassForm({
        courseName,
        date,
        startTime,
        endTime,
        location,
      });
      setShowEditClassModal(true);
    }
    if (event.type === "Event") {
      // Assuming tasks are of type "Event"
      const taskDetails = extractTaskDetails(event);
      setEditTaskForm({
        ...taskDetails,
        name: taskDetails.name, // Task name is fixed
      });
      setShowEditTaskModal(true);
    }
  };

  const submitEditClassForm = async () => {
    const updatedClassData = {
      name: editClassForm.courseName, // Assuming the backend requires 'new_name'
      date: editClassForm.date,
      time_slot: `${editClassForm.startTime}-${editClassForm.endTime}`,
      location: editClassForm.location,
    };
    console.log(updatedClassData);
    await editClass(updatedClassData);
    setShowEditClassModal(false);
    setShowDetailsModal(false);
    // You may need to refresh the events list here
  };
  const extractClassDetails = (event) => {
    const courseName = event.title.split(" - ")[1];
    const date = moment(event.start).format("YYYY-MM-DD");
    const startTime = moment(event.start).format("HH:mm");
    const endTime = moment(event.end).format("HH:mm");
    const location = event.location || ""; // Assuming location is a direct field in event
    return [courseName, date, startTime, endTime, location];
  };

  const submitEditTaskForm = async () => {
    const updatedTaskData = {
      name: editTaskForm.name,
      date: editTaskForm.date,
      time_slot: `${editTaskForm.startTime}-${editTaskForm.endTime}`,
    };
    // Call the appropriate mutation or function to update the task
    console.log(updatedTaskData);
    await editTask(updatedTaskData); // Update this with your actual function/mutation
    setShowEditTaskModal(false);
    setShowDetailsModal(false);
    // Refresh the events list
  };
  const extractTaskDetails = (event) => {
    const name = event.title;
    const date = moment(event.start).format("YYYY-MM-DD");
    const startTime = moment(event.start).format("HH:mm");
    const endTime = moment(event.end).format("HH:mm");
    return { name, date, startTime, endTime };
  };

  return (
    <div className="container">
      <Modal show={showClassModal} onHide={handleClassModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                name="courseName"
                onChange={handleClassFormChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                onChange={handleClassFormChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                onChange={handleClassFormChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                onChange={handleClassFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                onChange={handleClassFormChange}
              />
            </Form.Group>
            <Form.Label>Recurring Days</Form.Label>
            <div>
              {["M", "T", "W", "R", "F"].map((day) => renderDayButton(day))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClassModal}>
            Close
          </Button>
          <Button variant="primary" onClick={submitClassForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showTaskModal} onHide={handleTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Task/Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={handleTaskFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                onChange={handleTaskFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                onChange={handleTaskFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                onChange={handleTaskFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTaskModal}>
            Close
          </Button>
          <Button variant="primary" onClick={submitTaskForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <h2
        className="text-center mt-4 mb-20"
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        Your Schedule all in one place
      </h2>

      <div className="d-flex justify-content-around my-3">
        <Button variant="primary" onClick={handleClassModal}>
          Add a Class
        </Button>
        <Button variant="secondary" onClick={handleTaskModal}>
          Add a Task/Event
        </Button>
        <Button variant="success" onClick={handleReserveClick}>
          Reserve a Room
        </Button>
        <Button variant="info" style = {{color: "white"}} onClick={toggleTodoVisibility}>
        {isTodoVisible ? "Hide Todos" : "Todos"}
        </Button>
        <Form>
          <Form.Check
            type="switch"
            id="email-switch"
            label="Email Notifications"
          />
        </Form>
      </div>
      <div style={{ display: "flex" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100vh", flex: 1 }} // Calendar takes the full width when Todo is not visible
          onSelectEvent={handleEventClick}
        />
        {isTodoVisible && (
          <div style={todoStyle}>
            {" "}
            {/* Adjust the width as needed */}
            <Todo />
          </div>
        )}
      </div>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent && selectedEvent.type} Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <>
              <p>
                <strong>Title:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Start:</strong>{" "}
                {selectedEvent.type === "Class"
                  ? selectedEvent.start.toLocaleTimeString()
                  : selectedEvent.start.toLocaleString()}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {selectedEvent.type === "Class"
                  ? selectedEvent.end.toLocaleTimeString()
                  : selectedEvent.end.toLocaleString()}
              </p>
              {selectedEvent.location && (
                <p>
                  <strong>Location:</strong> {selectedEvent.location}
                </p>
              )}
              {/* ... include other details ... */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
          {selectedEvent && selectedEvent.type !== "Reservation" && (
            <Button
              variant="info"
              onClick={() => handleEditEvent(selectedEvent)}
            >
              Edit
            </Button>
          )}
          <Button
            variant="danger"
            onClick={() => handleCancelEvent(selectedEvent)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEditClassModal}
        onHide={() => setShowEditClassModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Class - {editClassForm.courseName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col}>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editClassForm.date}
                onChange={handleEditClassFormChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={editClassForm.startTime}
                onChange={handleEditClassFormChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={editClassForm.endTime}
                onChange={handleEditClassFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={editClassForm.location}
                onChange={handleEditClassFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditClassModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={submitEditClassForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEditTaskModal}
        onHide={() => setShowEditTaskModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task - {editTaskForm.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col}>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editTaskForm.date}
                onChange={handleEditTaskFormChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={editTaskForm.startTime}
                onChange={handleEditTaskFormChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={editTaskForm.endTime}
                onChange={handleEditTaskFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditTaskModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={submitEditTaskForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyCalendarComponent;
