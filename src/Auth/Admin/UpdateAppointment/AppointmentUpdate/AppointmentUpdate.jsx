import React, { useContext, useEffect, useState } from "react";
import PatientAppointment from "../../../../Components/PatientAppointment/PatientAppointment";
import accessDenied from "../../../../Assets/Access_Denied.svg";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import DataSearch from "../../../../Components/DataSearch/DataSearch";
import { useParams } from "react-router-dom";
import { get, put } from "../../../../ApiCalls/ApiCalls";
import { AuthContext } from "../../../../Context/authContext";

const AppointmentUpdate = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [appointmentData, setAppointmentData] = useState();

  const [search, setSearch] = useState("");
  const [doctorId, setDoctorId] = useState();
  const [doctorNameList, setDoctorNameList] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [doctorError, setDoctorError] = useState("");

  const [appointmentId, setAppointmentId] = useState("");
  const [patientMrno, setPatientMrno] = useState();

  const [appointmentDate, setAppointmentDate] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [comments, setComments] = useState("");
  const [criticalStatus, setCriticalStatus] = useState("");

  const filterItems = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    {
      get(`/getAppointmentId?appointmentId=${id}`, config).then((res) => {
        setAppointmentData(res.data);

        setAppointmentDate(res.data[0].appointmentDate);
        setStartingTime(res.data[0].startingTime);
        setEndingTime(res.data[0].endingTime);
        setComments(res.data[0].comments);
        setCriticalStatus(res.data[0].criticalStatus);
        setDoctorName(res.data[0].doctor.doctorName);

        setDoctorId(res.data[0].doctor.doctorId);
        setAppointmentId(res.data[0].appointmentId);
        setPatientMrno(res.data[0].patient.mrnNo);
      });
    }
  };

  useEffect(() => {
    filterItems();
  }, [id]);

  // get the Doctor Name List
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

  const handleDoctorName = (e, index) => {
    const selectedDoctorName = e.target.innerText;
    setDoctorName(selectedDoctorName);
    setSearch("");
    console.log(index);
    setDoctorId(doctorNameList[index].doctorId);
    // console.log('indexx',index)
    // console.log('dociddd',doctorNameList[index].doctorId)
  };

  console.log("doctor", doctorId);
  console.log("appointmentId", appointmentId);
  console.log("mrnNo", patientMrno);
  console.log("userId", currentUser.userId);

  const handleUpdateAppointment = () => {
    const data = {
      appointmentId: appointmentId,
      patient: {mrnNo :patientMrno},
      doctor: { doctorId: doctorId },
      userId: currentUser.userId,
      appointmentDate: appointmentDate,
      startingTime: startingTime,
      endingTime: endingTime,
      comments: comments,
      criticalStatus: criticalStatus,
    };
    console.log(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    put("/updateAppointment", data, config).then((res) => {
      console.log("Result", res);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (doctorName.length === 0) {
      setDoctorError("Must Have the Doctor Name");
    } else {
      handleUpdateAppointment();
      console.log("AppointMent Details", appointmentData);
    }
  };

  return (
    <>
      {props.role.includes("Admin") ? (
        <div>
          <section className="LabTest mt w-100">
            <div className="labTest__Box  p-3">
              <h3 className="text-center text-uppercase">Appointment</h3>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="patient__details text-center">
                  <Row>
                    {appointmentData && (
                      <Col key={appointmentData[0].patient.mrnNo}>
                        <img
                          src={appointmentData[0].patient.photo}
                          alt=""
                          width={130}
                          style={{ borderRadius: "50%" }}
                        />
                        <p>
                          <b>Patient ID: </b>
                          {appointmentData[0].patient.mrnNo}
                        </p>
                        <p>
                          <b>Patient Name: </b>
                          {appointmentData[0].patient.firstName}{" "}
                          {appointmentData[0].patient.lastName}
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
                        value={appointmentDate}
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
                        value={startingTime}
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
                        value={endingTime}
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
                        checked={criticalStatus === "Critical" && "true"}
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
                        checked={criticalStatus === "Normal" && "true"}
                        required
                      />
                    </div>
                  </Col>
                </Row>{" "}
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

export default AppointmentUpdate;
