// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RRule, RRuleSet, rrulestr } from "rrule";
import { useCreateClassMutation, useCreateEventMutation, useGetAllItemsMutation } from "../slices/usersApiSlice.js";

const localizer = momentLocalizer(moment);

// Function to parse the user data into calendar events
const parseEvents = (user) => {
  const events = [];
  console.log(user);
  console.log(user.reservations);

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
  console.log(events)

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
  const rruleDate = new Date(`${startDate}T${startTime}:00`);
 
  const untilDate = new Date(rruleDate.getTime() + 4 * 30 * 24 * 60 * 60 * 1000); // Approximately 4 months
 
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
  const[createClass] = useCreateClassMutation();
  const[createEvent] = useCreateEventMutation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [classForm, setClassForm] = useState({
    date: "",
    startTime: "",
    durationHours: 1,
    durationMinutes: 0,
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

  // // Dummy events for the calendar
  // const events = [
  //   {
  //     title: "Sample Class",
  //     start: new Date(),
  //     end: new Date(moment().add(1, "hours")),
  //     allDay: false,
  //   },
  //   // More dummy events...
  // ];

  const handleClassModal = () => setShowClassModal(!showClassModal);
  const handleTaskModal = () => setShowTaskModal(!showTaskModal);

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

  const handleEditEvent = (event) => {
    if (event.type === "Class") {
      openEditClass(event);
      setShowDetailsModal(false);
    } else if (event.type === "Event") {
      //openEditEvent(event);
      setShowDetailsModal(false);
    }
  };

  const openEditClass = (event) => {
    setClassForm({
      // Assuming the event has the same structure as your class form state
      date: moment(event.start).format("YYYY-MM-DD"),
      startTime: moment(event.start).format("HH:mm"),
      durationHours: moment
        .duration(moment(event.end).diff(moment(event.start)))
        .hours(),
      durationMinutes: moment
        .duration(moment(event.end).diff(moment(event.start)))
        .minutes(),
      location: event.location,
      courseName: event.title,
      recurringDays: event.recurringDays || [], // This needs to be extracted from the event if available
    });
    setShowEditModal(true);
  };

  const handleUpdateEvent = () => {
    console.log("Updated class form data:", classForm);
    // Here you would put the API call to update the event
    // After a successful update, you may need to refresh your events in the calendar
    setShowEditModal(false);
  };

  const handleCancelEvent = (event) => {
    if (event.type === "Reservation") {
      // API call to cancel reservation
    } else if (event.type === "Class") {
      // API call to cancel class
    } else {
      // API call to cancel task/event
    }
    // ...
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
    let endTime = startTime + classForm.durationHours * 60 + classForm.durationMinutes;
    let days = classForm.recurringDays;
    let formattedDays = days.map(day => ({ day }));
    console.log(formattedDays);
    const newClass = {
      name: classForm.courseName,
      date: classForm.date,
      time_slot: `${startTime}-${endTime}`,
      by_weekday: JSON.stringify(formattedDays, null, 2),
      location: classForm.location
    }
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
    }
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

  return (
    <div className="container">
      <div className="d-flex justify-content-around my-3">
        <Button variant="primary" onClick={handleClassModal}>
          Add a Class
        </Button>
        <Button variant="secondary" onClick={handleTaskModal}>
          Add a Task/Event
        </Button>
        <Button variant="success">Reserve a Room</Button>
      </div>

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
            <Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  as="select"
                  name="durationHours"
                  onChange={handleClassFormChange}
                >
                  {/* Generate hours options */}
                  {[...Array(12).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Duration (Minutes)</Form.Label>
                <Form.Control
                  as="select"
                  name="durationMinutes"
                  onChange={handleClassFormChange}
                >
                  {[0, 30, 50].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
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

      <h2 className="text-center mt-4">Your Schedule all in one place</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
        onSelectEvent={handleEventClick}
      />

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
                <strong>Start:</strong> {selectedEvent.start.toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {selectedEvent.end.toLocaleString()}
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
          <Button variant="info" onClick={() => handleEditEvent(selectedEvent)}>
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleCancelEvent(selectedEvent)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Class/Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Add form fields pre-filled with classForm state */}
            <Form.Group>
              <Form.Label>Course/Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="courseName"
                value={classForm.courseName}
                onChange={handleClassFormChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={classForm.date}
                onChange={handleClassFormChange}
              />
            </Form.Group>
            {/* ... include other fields ... */}
            <Form.Label>Recurring Days</Form.Label>
            <div>
              {["M", "T", "W", "R", "F"].map((day) => (
                <Button
                  key={day}
                  variant={
                    classForm.recurringDays.includes(day)
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => handleRecurringDays(day)}
                  style={{ marginRight: "5px" }}
                >
                  {day}
                </Button>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdateEvent()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyCalendarComponent;