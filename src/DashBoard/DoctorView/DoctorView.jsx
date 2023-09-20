import React, { useContext, useEffect, useState } from "react";
import "../../Utility/Utility.css";
import "./DoctorView.css";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { FaXmark } from "react-icons/fa6";
import accessDenied from "../../Assets/Access_Denied.svg";
import { get } from "../../ApiCalls/ApiCalls";
import { AuthContext } from "../../Context/authContext";

const EventModal = ({ event, onClose }) => {
  return (
    <div className="event-modal">
      <button className="close-icon" onClick={onClose}>
        <span>
          <FaXmark />
        </span>
      </button>
      <div className="eventModel">
        <h5>{event.title}</h5>
        <p>Name: {event.name}</p>
        <p>Age: {event.age} </p>
        <p>Start: {event.start.toLocaleString()}</p>
      </div>
    </div>
  );
};

const DoctorView = (props) => {
  const { currentUser } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [appointmentData, setappointmentData] = useState([]);
  const [event1, setEvent1] = useState();
  const userId = currentUser.userId;

  const events = [
    {
      name: "Chandra",
      title: "Fever",
      age: "",
      start: new Date(2023, 7, 15, 6, 0),
      end: new Date(2023, 7, 15, 7, 0),
    },
  ];

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    get(`/appointmentsByDoctor?doctorId=${userId}`, config)
      .then((res) => {
        // Assuming res.data is an array of events fetched from the API
        const apiEvents = res.data;
  
        // Create a new array to store the updated events
        const updatedEvents = events.map((event) => {
          // Find a matching event in the API response based on some unique identifier
          const matchingApiEvent = apiEvents.find((apiEvent) => apiEvent.someUniqueIdentifier === event.someUniqueIdentifier); // Replace someUniqueIdentifier with the actual property that uniquely identifies events
          if (matchingApiEvent) {
            // Update the event with details from the API response
            return {
              ...event,
              name: matchingApiEvent.patient.firstName + ` ` + matchingApiEvent.patient.lastName,
              age: matchingApiEvent.patient.age,
              title: matchingApiEvent.comments,
              start: matchingApiEvent.startingTime,
              end: matchingApiEvent.endingTime,
              // Add more properties from the API response as needed
            };
          } else {
            // If no match is found, keep the original event
            return event;
          }
        });
  
        // Set the state with the updated events
        setEvent1(updatedEvents);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);
  
  

  console.log(event1);

  const handleEventClick = (info) => {
    const clickedEvent = events.find(
      (event) => event.start.getTime() === info.event.start.getTime()
    );
    setSelectedEvent(clickedEvent);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  // const isMobile = window.innerWidth < 768;

  const headerToolbar = {
    start: "today prev,next",
    center: "title",
    end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  };

  const height = "auto";

  return (
    <>
      {props.role.includes("Admin") || props.role.includes("Doctor") ? (
        <div className="container container2 mt-5 ">
          <Fullcalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="timeGridDay"
            headerToolbar={headerToolbar}
            events={event1}
            eventClick={handleEventClick}
            themeSystem="bootstrap"
            height={height}
          />

          {isModalOpen && selectedEvent && (
            <div className="modal-overlay">
              <EventModal event={selectedEvent} onClose={handleCloseModal} />
            </div>
          )}
        </div>
      ) : (
        <div className="accessDenied">
          <img src={accessDenied} alt="Access Denied" />
          {/* <p>Access Denied</p> */}
        </div>
      )}
    </>
  );
};

export default DoctorView;

// const events = [
//   {
//     name: "Chandra",
//     title: "Fever",
//     age: 4,
//     start: new Date(2023, 7, 15, 6, 0), // August 15, 2023 at 10:00 AM
//     end: new Date(2023, 7, 15, 7, 0),
//   },
//   {
//     name: "Balan",
//     title: "Stomach Pain",
//     age: 9,
//     start: new Date(2023, 7, 18, 14, 30), // August 18, 2023 at 2:30 PM
//     end: new Date(2023, 7, 18, 15, 30),
//   },
//   {
//     name: "Siva",
//     title: "Headache",
//     age: 37,
//     start: new Date(2023, 7, 22, 9, 0), // August 22, 2023 at 9:00 AM
//     end: new Date(2023, 7, 22, 10, 0),
//   },
//   {
//     name: "Kumar",
//     title: "Body Aches",
//     age: 27,
//     start: new Date(2023, 7, 27, 11, 30), // August 27, 2023 at 11:30 AM
//     end: new Date(2023, 7, 27, 12, 30),
//   },
//   {
//     name: "Mukesh",
//     title: "Bone Fractures",
//     age: 12,
//     start: new Date(2023, 8, 2, 16, 0), // September 2, 2023 at 4:00 PM
//     end: new Date(2023, 8, 2, 17, 0),
//   },
//   {
//     name: "Emmy Jacksun",
//     title: "Fever",
//     age: 32,
//     start: new Date(2023, 8, 7, 13, 0), // September 7, 2023 at 1:00 PM
//     end: new Date(2023, 8, 7, 14, 0),
//   },
//   {
//     name: "Andrea",
//     title: "Headache",
//     age: 78,
//     start: new Date(2023, 8, 12, 10, 0), // September 12, 2023 at 10:00 AM
//     end: new Date(2023, 8, 12, 11, 0),
//   },
//   {
//     name: "Samantha",
//     title: "Body Aches",
//     age: 68,
//     start: new Date(2023, 8, 18, 15, 30), // September 18, 2023 at 3:30 PM
//     end: new Date(2023, 8, 18, 16, 30),
//   },
//   {
//     name: "Sneha",
//     title: "Bone Fractures",
//     age: 45,
//     start: new Date(2023, 8, 22, 12, 0), // September 22, 2023 at 12:00 PM
//     end: new Date(2023, 8, 22, 13, 0),
//   },
//   {
//     name: "Priya",
//     title: "Stomach Pain",
//     age: 25,
//     start: new Date(2023, 8, 28, 17, 0), // September 28, 2023 at 5:00 PM
//     end: new Date(2023, 8, 28, 18, 0),
//   },
// ];
