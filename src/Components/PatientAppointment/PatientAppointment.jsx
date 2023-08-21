import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import DataSearch from "../DataSearch/DataSearch";
import "./PatientAppointment.css";

const PatientAppointment = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState([]);
  const [doctorNameList, setDoctorNameList] = useState("");
  const [search, setSearch] = useState("");
  const [doctorName, setDoctorName] = useState("");

  // Fetch the data Based on the Id

  const filterItems = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?id=${id}`
    );
    const data = await res.data;
    setPatient(data);
  };

  useEffect(() => {
    filterItems();
  }, []);

  // Fetch the Data Based on the search input

  useEffect(() => {
    const fetchData = async () => {
      if (search.length > 0) {
        try {
          const res = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          setDoctorNameList(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [search]);

  const handleSearch = (e) => {
    const searchData = e.target.value;
    setSearch(searchData);
  };

  const filteredData =
    doctorNameList &&
    doctorNameList.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

  // Get the current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [appointmentData, setAppointmentData] = useState({
    doctor: doctorName,
    date: "",
    time: getCurrentTime(),
    comments: "",
    status: "",
  });


  const handle = (e) => {
    const newData = { ...appointmentData };
    newData[e.target.name] = e.target.value;
    setAppointmentData(newData);
  };

  const handleDoctorName = (e) => {
    const selectedDoctorName = e.target.innerText;
    setDoctorName(selectedDoctorName);
    setSearch("");

    setAppointmentData((prevData) => ({
      ...prevData,
      doctor: selectedDoctorName,
    }));
  };

  const [doctorError, setDoctorError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (doctorName.length === 0) {
      setDoctorError("Must Have the Doctor Name");
    } else {
      setDoctorError("");
      setDoctorName("");
      console.log("AppointMent Details", appointmentData);
      const data = { ...appointmentData };
      data.comments = "";
      data.status = "";
      setAppointmentData(data);
    }
  };

  return (
    <section className="LabTest mt w-100">
      <div className="labTest__Box  p-3">
        <h3 className="text-center text-uppercase">Appointment</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="patient__details text-center">
            <Row>
              {patient.map((data) => (
                <Col key={data.id}>
                  <img
                    src={data.url}
                    alt=""
                    width={130}
                    style={{ borderRadius: "50%" }}
                  />
                  <p>
                    <b>Patient ID: </b>
                    {data.id}
                  </p>
                  <p>
                    <b>Patient Name: </b>
                    {data.title}
                  </p>
                </Col>
              ))}
            </Row>
          </div>

          <Row>
            <Col className="mb-2" md={3}>
              <DataSearch search={search} handleSearch={handleSearch} />
            </Col>
          </Row>
          {search.length <= 0 ? (
            ""
          ) : (
            <div className="doctor-list">
              {search.length !== 0 &&
                filteredData &&
                filteredData.map((doctor) => (
                  <div key={doctor.id}>
                    <p onClick={(e) => handleDoctorName(e)}>{doctor.name}</p>
                  </div>
                ))}
            </div>
          )}

          <Row>
            <Col md={3} className="mb-2">
              <FloatingLabel
                controlId={`DoctorName`}
                label="DoctorName"
                className=""
              >
                <Form.Control
                  type="text"
                  placeholder="DoctorName"
                  name="DoctorName"
                  onChange={(e) => handle(e)}
                  value={doctorName}
                  required
                  disabled
                />
              </FloatingLabel>
            </Col>
            <Col md={3} className="mb-2">
              <FloatingLabel
                controlId={`appointmentDate`}
                label="Appointment Date"
                className=""
              >
                <Form.Control
                  type="date"
                  placeholder="date"
                  name="date"
                  onChange={(e) => handle(e)}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md={3} className="mb-2">
              <FloatingLabel
                controlId="appointmentTime"
                label="Appointment time"
              >
                <Form.Control
                  type="time"
                  placeholder="time"
                  name="time"
                  defaultValue={appointmentData.time}
                  onChange={(e) => handle(e)}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md={3} className="mb-2">
              <FloatingLabel
                controlId={`appointmentComment`}
                label="Appointment comment"
                className=""
              >
                <Form.Control
                  type="text"
                  placeholder="Comment"
                  name="comments"
                  value={appointmentData.comments}
                  onChange={(e) => handle(e)}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="d-flex check flex-wrap">
                <Form.Check
                  type="radio"
                  label="Critical"
                  name="status"
                  value="Critical"
                  style={{ marginRight: "10px" }}
                  onChange={(e) => handle(e)}
                />
                <Form.Check
                  type="radio"
                  label="Normal"
                  name="status"
                  value="Normal"
                  style={{ marginRight: "10px" }}
                  onChange={(e) => handle(e)}
                  required
                />
              </div>
            </Col>
          </Row>
          {doctorError && <p className="text-danger">{doctorError}</p>}
          <Row className="mt-4">
            <Col>
              <input
                type="submit"
                value="Book Appointment"
                className="btn btn-primary"
              />
            </Col>
          </Row>
        </form>
      </div>
    </section>
  );
};

export default PatientAppointment;
