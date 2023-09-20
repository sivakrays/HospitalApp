import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import DataSearch from "../DataSearch/DataSearch";
import "./PatientAppointment.css";
import { get, post } from "../../ApiCalls/ApiCalls";
import accessDenied from "../../Assets/Access_Denied.svg";
import { AuthContext } from "../../Context/authContext";

const PatientAppointment = (props) => {
  const { currentUser } = useContext(AuthContext);

  const { id } = useParams();
  const [patient, setPatient] = useState([]);
  const [doctorNameList, setDoctorNameList] = useState([]);
  const [search, setSearch] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorError, setDoctorError] = useState("");

  // Get the current time

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const currentTimePlus30Minutes = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [appointmentDate, setAppointmentDate] = useState();
  const [startingTime, setStartingTime] = useState(getCurrentTime());
  const [endingTime, setEndingTime] = useState(currentTimePlus30Minutes());
  const [comments, setComments] = useState();
  const [criticalStatus, setCriticalStatus] = useState();
  const [doctorId, setDoctorId] = useState("");

  console.log(doctorId);

  const appointmentData = {
    userId: currentUser.userId,
    mrnNo: id,
    doctor: doctorName,
    startingTime: startingTime,
    endingTime: endingTime,
    criticalStatus: criticalStatus,
    comments: comments,
    appointmentDate: appointmentDate,
  };

  // Fetch the data Based on the Id

  const filterItems = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    {
      get(`/mrnNo?mrnNo=${id}`, config).then((res) => setPatient(res.data));
    }
  };

  useEffect(() => {
    filterItems();
  }, []);

  // Fetch the Doctor Name Based on the search input

  useEffect(() => {
    const fetchData = async () => {
      if (search.length > 0) {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        {
          get(`/doctor`, config).then((res) => setDoctorNameList(res.data));
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
      item.doctorName.toLowerCase().includes(search.toLowerCase())
    );

  console.log(doctorNameList);

  const handleDoctorName = (e, index) => {
    const selectedDoctorName = e.target.innerText;
    setDoctorName(selectedDoctorName);
    setSearch("");
    console.log(index);
    setDoctorId(doctorNameList[index].doctorId);
    // console.log('indexx',index)
    // console.log('dociddd',doctorNameList[index].doctorId)
  };

  console.log(doctorId);
  // Api Call

  const handlePatientAppointment = () => {
    const data = {
      userId: currentUser.userId,
      mrnNo: id,
      doctorId: doctorId,
      appointmentDate: appointmentDate,
      startingTime: startingTime,
      endingTime: endingTime,
      comments: comments,
      criticalStatus: criticalStatus,
    };
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    post("/appointment", data, config).then((res) => {
      console.log("Appointment Successfully Added", res);
    });
  };

  // Submit Function

  const handleSubmit = (e) => {
    e.preventDefault();

    if (doctorName.length === 0) {
      setDoctorError("Must Have the Doctor Name");
    } else {
      handlePatientAppointment();
      setDoctorError("");
      setDoctorName("");
      // setEndingTime("");
      setComments("");
      // setCriticalStatus("");
      console.log("AppointMent Details", appointmentData);
    }
  };

  return (
    <>
      {props.role.includes("Admin") || props.role.includes("Receptionist") ? (
        <section className="LabTest mt w-100">
          <div className="labTest__Box  p-3">
            <h3 className="text-center text-uppercase">Appointment</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="patient__details text-center">
                <Row>
                  {patient && (
                    <Col key={patient.mrnNo}>
                      <img
                        src={patient.photo}
                        alt=""
                        width={130}
                        style={{ borderRadius: "50%" }}
                      />
                      <p>
                        <b>Patient ID: </b>
                        {patient.mrnNo}
                      </p>
                      <p>
                        <b>Patient Name: </b>
                        {patient.firstName} {patient.lastName}
                      </p>
                    </Col>
                  )}
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
                    filteredData.map((doctor, index) => (
                      <div key={index}>
                        <p onClick={(e) => handleDoctorName(e, index)}>
                          {doctor.doctorName}
                        </p>
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
                      onChange={(e) => setDoctorName(e.target.value)}
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
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col md={3} className="mb-2">
                  <FloatingLabel
                    controlId="appointmentTime"
                    label="Starting time"
                  >
                    <Form.Control
                      type="time"
                      placeholder="time"
                      name="time"
                      defaultValue={startingTime}
                      onChange={(e) => setStartingTime(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col md={3} className="mb-2">
                  <FloatingLabel
                    controlId="appointmentTime"
                    label="Ending time"
                  >
                    <Form.Control
                      type="time"
                      placeholder="time"
                      name="time"
                      defaultValue={endingTime}
                      onChange={(e) => setEndingTime(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mb-2">
                  <FloatingLabel
                    controlId={`appointmentComment`}
                    label="Purpose"
                    className=""
                  >
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Comment"
                      name="comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
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
                      name="criticalityStatus"
                      value="Critical"
                      style={{ marginRight: "10px" }}
                      onChange={(e) => setCriticalStatus(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="Normal"
                      name="criticalityStatus"
                      value="Normal"
                      style={{ marginRight: "10px" }}
                      onChange={(e) => setCriticalStatus(e.target.value)}
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
      ) : (
        <div className="accessDenied">
          <img src={accessDenied} alt="Access Denied" />
          {/* <p>Access Denied</p> */}
        </div>
      )}
    </>
  );
};

export default PatientAppointment;
