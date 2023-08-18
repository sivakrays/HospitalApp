import React, { useEffect, useState } from "react";
// import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

const PatientAppointment = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState([]);

  const [appointmentData, setAppointmentData] = useState({
    doctor: "",
    date: "",
    time: "",
    comments: "",
    critical: "",
  });

  const handle = (e) => {
    const newData = { ...appointmentData };
    newData[e.target.name] = e.target.value;
    setAppointmentData(newData);
  };

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

  // Get the current time
  /* const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(appointmentData);
  };

  return (
    <section className="LabTest mt w-100">
      {/* <Nav /> */}
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
            <Col className="mb-2 " md={3}>
              <FloatingLabel controlId="Doctor" label="Doctor">
                <Form.Select
                  aria-label="Floating label select example"
                  name="doctor"
                  required
                >
                  <option>Select Doctor</option>
                  <option value="Manoj">Manoj</option>
                  <option value="Kumar">Kumar</option>
                  <option value="Mukesh">Mukesh</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-2">
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
            <Col md={4} className="mb-2">
              <FloatingLabel
                controlId="appointmentTime"
                label="Appointment time"
              >
                <Form.Control
                  type="time"
                  placeholder="time"
                  name="time"
                  // defaultValue={getCurrentTime()}
                  onChange={(e) => handle(e)}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md={4} className="mb-2">
              <FloatingLabel
                controlId={`appointmentComment`}
                label="Appointment comment"
                className=""
              >
                <Form.Control
                  type="text"
                  placeholder="Comment"
                  name="comments"
                  onChange={(e) => handle(e)}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="d-flex check flex-wrap ">
                <Form.Check
                  type="radio"
                  label="Critical"
                  name="Critical"
                  style={{ marginRight: "10px" }}
                  id="critical"
                />
                <Form.Check
                  type="radio"
                  label="Normal"
                  name="Normal"
                  id="critical"
                  style={{ marginRight: "10px" }}
                />
              </div>
            </Col>
          </Row>
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
