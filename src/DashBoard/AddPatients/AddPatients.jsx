import React, { useEffect, useState } from "react";
import "./AddPatients.css";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import Webcam from "react-webcam";
import { post } from "../../ApiCalls/ApiCalls";
import accessDenied from "../../Assets/Access_Denied.svg";

const AddPatients = (props) => {
  const [allergy, setAllergy] = useState("");
  const [medicine, setMedicine] = useState("");
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);
  const [pregnancy, setPregancy] = useState();

  const [age, setAge] = useState(0);
  const [imageError, setImageError] = useState("");
  const [pregancyError, setPregnancyError] = useState("");
  const [error, setError] = useState();

  const [phoneError, setPhoneError] = useState("");

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, []);

  const [patients, setPatient] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    contact: "",
    email: "",
    weight: "",
    height: "",
    pincode: "",
    state: "",
    city: "",
    street: "",
    gurdianName: "",
    gurdianRelation: "",
    gurdianContact: "",
    emergencyName: "",
    emergencyrelation: "",
    emergencyContact: "",
    allergyName: "",
    medicineName: "",
  });

  // Age Calculation
  useEffect(() => {
    const date = new Date().getFullYear();
    const birthYear = parseInt(patients.dob.slice(0, 4));
    const ageCalculation = date - birthYear;
    setAge(ageCalculation);
  }, [patients.dob]);
  // console.log(new Date().getFullYear() - birthYear);

  function handle(e) {
    const newPatient = { ...patients };
    newPatient[e.target.name] = e.target.value;
    setPatient(newPatient);
  }

  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user",
  };

  const handlePregnancy = (e) => {
    setPregancy(e.target.value);
  };

  const handleAllergy = (e) => {
    setAllergy(e.target.value);
  };

  const handleMedicine = (e) => {
    setMedicine(e.target.value);
  };

  // Api Call

  const handleRegister = () => {
    const data = {
      photo: image,
      age: age,
      pregnancyDetail: pregnancy,
      firstName: patients.firstName,
      lastName: patients.lastName,
      dob: patients.dob,
      gender: patients.gender,
      contact: patients.contact,
      email: patients.email,
      weight: patients.weight,
      height: patients.height,
      pincode: patients.pincode,
      state: patients.state,
      city: patients.city,
      houseNo: patients.street,
      guardianName: patients.gurdianName,
      guardianRelation: patients.gurdianRelation,
      guardianContact: patients.gurdianContact,
      emergencyName: patients.emergencyName,
      emergencyRelation: patients.emergencyrelation,
      emergencyContact: patients.emergencyContact,
      allergies: allergy,
      medicines: medicine,
      allergyName: patients.allergyName,
      allergyMedicine: patients.medicineName,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    post("/patient", data, config).then((res) => {
      console.log("message", res);
    });
  };

  // Submit Function

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image === "") {
      setImageError(`please capture the Image`);
      console.log(image);
    } else if (pregnancy === " ") {
      setPregnancyError(`please Select the Pregnancy details`);
    } else if (medicine === "" || medicine === null) {
      setError(`Please Select the Allergy Details`);
    } else if (patients.contact && patients.contact.length !== 10) {
      setPhoneError("Phone Number Must be 10 Numbers only");
    } else {
      handleRegister();
      setError("");
      setImageError("");
      setImage("")
      setPregancy("")
      setAllergy("")
      setMedicine("")
      console.log("image", image);
      console.log("patient", patients);
      setPatient({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        contact: "",
        email: "",
        weight: "",
        height: "",
        pincode: "",
        state: "",
        city: "",
        street: "",
        gurdianName: "",
        gurdianRelation: "",
        gurdianContact: "",
        emergencyName: "",
        emergencyrelation: "",
        emergencyContact: "",
        allergyName: "",
        medicineName: "",
      });
    }
  };



  return (
    <>
      {props.role.includes("Admin") ? (
        <section className="addPatients mt">
          <form
            className="add__patient__form shadow "
            id="container"
            onSubmit={(e) => handleSubmit(e)}
          >
            <h2
              className="text-center text-uppercase text-center mb-3  text-white  rounded py-3 text-uppercase shadow"
              style={{ backgroundColor: "var(--color-sidebar)" }}
            >
              Add Patients
            </h2>

            <div className="camera">
              {image === "" ? (
                <Webcam
                  className="camera__img"
                  audio={false}
                  height={200}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={220}
                  videoConstraints={videoConstraints}
                  name="photo"
                  onChange={(e) => handle(e)}
                  value={patients.photo}
                  required
                />
              ) : (
                <img src={image} alt="patient" />
              )}
            </div>
            <div className="camera__btn">
              {image !== "" ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setImage("");
                  }}
                  className="btn btn-outline-primary mx-5 mt-3"
                >
                  Recapture
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    capture();
                  }}
                  className="btn btn-outline-primary mx-5 mt-2"
                >
                  Capture
                </button>
              )}
            </div>

            <div className="personal__details__inputs mt-3">
              <p>Personal Details</p>
              <hr />
              <Container>
                <Row>
                  <Col md={6}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="First Name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="FirstName"
                        name="firstName"
                        onChange={(e) => handle(e)}
                        value={patients.firstName}
                        required
                        pattern="[a-zA-Z]+"
                        title="Name Must contain text Only"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel controlId="floatingInput" label="Last Name">
                      <Form.Control
                        type="text"
                        placeholder="LastName"
                        name="lastName"
                        onChange={(e) => handle(e)}
                        value={patients.lastName}
                        required
                        pattern="[a-zA-Z]+"
                        title="Name Must contain text Only"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={6}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Date Of Birth"
                      className="mb-3"
                    >
                      <Form.Control
                        type="date"
                        placeholder="Date Of Birth"
                        name="dob"
                        onChange={(e) => handle(e)}
                        value={patients.dob}
                        max={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel controlId="gender" label="Gender">
                      <Form.Select
                        aria-label="Floating label select example"
                        name="gender"
                        onChange={(e) => handle(e)}
                        value={patients.gender}
                        required
                      >
                        <option value="">Select The Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="TransGender">TransGender</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a Gender.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                </Row>
                {phoneError && <p className="text-danger">{phoneError}</p>}
                <Row className="mt-3">
                  <Col md={6}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Contact"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Contact"
                        name="contact"
                        onChange={(e) => handle(e)}
                        value={patients.contact}
                        required
                        pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$"
                        title="Phone Number Must Contain 10 numbers Only"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel controlId="floatingInput" label="Email">
                      <Form.Control
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={(e) => handle(e)}
                        value={patients.email}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={6}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Weight"
                      className="mb-3"
                      required
                    >
                      <Form.Control
                        type="text"
                        placeholder="Weight"
                        name="weight"
                        onChange={(e) => handle(e)}
                        value={patients.weight}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel controlId="floatingInput" label="Height">
                      <Form.Control
                        type="text"
                        placeholder="Height"
                        name="height"
                        onChange={(e) => handle(e)}
                        value={patients.height}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={6}>
                    <FloatingLabel
                      controlId="pincode"
                      label="Pincode"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Pincode"
                        name="pincode"
                        onChange={(e) => handle(e)}
                        value={patients.pincode}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel controlId="state" label="state">
                      <Form.Control
                        type="text"
                        placeholder="State"
                        name="state"
                        onChange={(e) => handle(e)}
                        value={patients.state}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={6}>
                    <FloatingLabel
                      controlId="City"
                      label="City"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={(e) => handle(e)}
                        value={patients.city}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel
                      controlId="street"
                      label="House no and Street"
                    >
                      <Form.Control
                        type="text"
                        placeholder="House no and Street"
                        name="street"
                        onChange={(e) => handle(e)}
                        value={patients.street}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Container>
            </div>
            {pregancyError && <p className="text-danger">{pregancyError}</p>}
            {patients.gender && patients.gender.includes("Female") && (
              <div className="emergency__details__inputs ">
                <p className="mt-3">Pregnancy Details</p>
                <hr />
                <Row>
                  <Col md={6}>
                    <FloatingLabel
                      controlId="floatingSelectGrid"
                      label="Pregnancy"
                      className="mb-3"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        name="pregnancy"
                        required
                        onChange={(e) => handlePregnancy(e)}
                      >
                        <option value="">Choose</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
              </div>
            )}

            {age < 18 && (
              <div className="Gurdian__details__inputs ">
                <p className="mt-3">Gurdian Details</p>
                <hr />

                <Row>
                  <Col md={4}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Relation Name"
                        name="gurdianName"
                        onChange={(e) => handle(e)}
                        value={patients.gurdianName}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={4}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Relation"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Relationship"
                        name="gurdianRelation"
                        onChange={(e) => handle(e)}
                        value={patients.gurdianRelation}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={4}>
                    <FloatingLabel controlId="floatingInput" label="Contact">
                      <Form.Control
                        type="text"
                        placeholder="Contact"
                        name="gurdianContact"
                        onChange={(e) => handle(e)}
                        value={patients.gurdianContact}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              </div>
            )}

            <div className="emergency__details__inputs ">
              <p className="mt-3">Emerncy Details</p>
              <hr />

              <Row>
                <Col md={4}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Relation Name"
                      name="emergencyName"
                      onChange={(e) => handle(e)}
                      value={patients.emergencyName}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col md={4}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Relation"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Relationship"
                      name="emergencyrelation"
                      onChange={(e) => handle(e)}
                      value={patients.emergencyrelation}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col md={4}>
                  <FloatingLabel controlId="floatingInput" label="Contact">
                    <Form.Control
                      type="text"
                      placeholder="Contact"
                      name="emergencyContact"
                      onChange={(e) => handle(e)}
                      value={patients.emergencyContact}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            <div className="allergies">
              <p className="mt-3">Allergies any have?</p>
              <hr />

              <Row className="mb-3">
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Allergies?"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => handleAllergy(e)}
                      name="allergy"
                      required
                    >
                      <option>Do You Have?</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Taking Medicine Currently?"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => handleMedicine(e)}
                      name="medicine"
                      required
                    >
                      <option>Select One</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              {error && <p className="text-danger">{error}</p>}

              <Row>
                {allergy === "Yes" && (
                  <Col md={6}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Allergies"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Allergies"
                        required
                        name="allergyName"
                        value={patients.allergyName}
                        onChange={(e) => handle(e)}
                      />
                    </FloatingLabel>
                  </Col>
                )}
                {medicine === "Yes" && (
                  <Col md={6}>
                    <FloatingLabel controlId="floatingInput" label="Medicine">
                      <Form.Control
                        type="text"
                        placeholder="medicineName"
                        name="medicineName"
                        required
                        value={patients.medicineName}
                        onChange={(e) => handle(e)}
                      />
                    </FloatingLabel>
                  </Col>
                )}
              </Row>
            </div>
            {imageError && <p className="text-danger">{imageError}</p>}
            <div className="button1">
              <hr />
              <div className="add__user__btn mt-md">
                <input
                  type="submit"
                  value="Add Patient"
                  className="btn button"
                  style={{
                    backgroundColor: "var(--color-sidebar)",
                    color: "var(--color-slate50)",
                  }}
                />
              </div>
            </div>
          </form>
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

export default AddPatients;
