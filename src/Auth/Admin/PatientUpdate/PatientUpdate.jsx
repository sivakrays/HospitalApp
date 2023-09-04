import React, { useEffect, useState } from "react";
import "../../../DashBoard/AddPatients/AddPatients.css";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import Webcam from "react-webcam";
import { get, post, put } from "../../../ApiCalls/ApiCalls";
import accessDenied from "../../../Assets/Access_Denied.svg";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const AddPatients = (props) => {
  const navigate = useNavigate()
  const { id } = useParams();
  const webcamRef = React.useRef(null);
  const [imageError, setImageError] = useState("");
  const [pregancyError, setPregnancyError] = useState("");
  const [error, setError] = useState();
  const [phoneError, setPhoneError] = useState("");
  // const [patientData, setPatientData] = useState();

  const [patientData, setPatientData] = useState({
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
    houseNo: "",
    guardianName: "",
    guardianRelation: "",
    guardianContact: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyContact: "",
    allergyName: "",
    allergyMedicine: "",
  });

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    get(`/mrnNo?mrnNo=${id}`, config).then((res) => {
      setPatientData(res.data);
      setImage(res.data.photo);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setPregancy(res.data.pregnancyDetail);
      setdob(res.data.dob);
      setGender(res.data.gender);
      setContact(res.data.contact);
      setEmail(res.data.email);
      setWeight(res.data.weight);
      setHeight(res.data.height);
      setPincode(res.data.pincode);
      setState(res.data.state);
      setCity(res.data.city);
      setHouseNo(res.data.houseNo);
      setGuardianName(res.data.guardianName);
      setGuardianRelation(res.data.guardianRelation);
      setGuardianContact(res.data.guardianContact);
      setEmergencyName(res.data.emergencyName);
      setEmergencyRelation(res.data.emergencyRelation);
      setEmergencyContact(res.data.emergencyContact);
      setAllergyName(res.data.allergyName);
      setAllergyMedicine(res.data.allergyMedicine);
      setAllergy(res.data.allergies);
      setMedicine(res.data.medicines);
      setPregancy(res.data.pregnancyDetail);
    });
  }, []);

  const [image, setImage] = useState("");
  const [age, setAge] = useState(0);
  const [pregnancy, setPregancy] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianRelation, setGuardianRelation] = useState("");
  const [guardianContact, setGuardianContact] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [allergyName, setAllergyName] = useState("");
  const [allergyMedicine, setAllergyMedicine] = useState("");
  // const [allergies, setAllergies] = useState("");
  // const [medicines, setMedicines] = useState("");

  const [allergy, setAllergy] = useState();
  const [medicine, setMedicine] = useState();

  console.log(firstName);
  console.log("PatientData : ", patientData);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, []);

  // Age Calculation
  useEffect(() => {
    if (patientData && patientData.dob) {
      const date = new Date().getFullYear();
      const birthYear = parseInt(patientData.dob.slice(0, 4));
      const ageCalculation = date - birthYear;
      setAge(ageCalculation);
    }
  }, [patientData]);

  // function handle(e) {
  //   const newPatient = { ...patients };
  //   newPatient[e.target.name] = e.target.value;
  //   setPatient(newPatient);
  // }

  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user",
  };

  // Api Call

  const handleUpdatePatientDetails = () => {
    const data = {
      mrnNo: id,
      photo: image,
      age: age,
      pregnancyDetail: pregnancy,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      gender: gender,
      contact: contact,
      email: email,
      weight: weight,
      height: height,
      pincode: pincode,
      state: state,
      city: city,
      houseNo: houseNo,
      guardianName: guardianName,
      guardianRelation: guardianRelation,
      guardianContact: guardianContact,
      emergencyName: emergencyName,
      emergencyRelation: emergencyRelation,
      emergencyContact: emergencyContact,
      allergies: allergy,
      medicines: medicine,
      allergyName: allergyName,
      allergyMedicine: allergyMedicine,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    put("/updatePatient", data, config).then((res) => {
      console.log("Result", res);
      
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
    } else if (patientData.contact && patientData.contact.length !== 10) {
      setPhoneError("Phone Number Must be 10 Numbers only");
    } else {
      handleUpdatePatientDetails();
      // alert("res", navigate('/'))
      setError("");
      setImageError("");
    }
  };

  return (
    <>
      {props.role.includes("Admin") ? (
        <section className="addPatients mt">
          {patientData ? (
            <form
              className="add__patient__form shadow "
              id="container"
              onSubmit={(e) => handleSubmit(e)}
            >
              <h2
                className="text-center text-uppercase text-center mb-3  text-white  rounded py-3 text-uppercase shadow"
                style={{ backgroundColor: "var(--color-sidebar)" }}
              >
                Update Patients Details
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
                    onChange={(e) => setImage(e.target.value)}
                    value={patientData.photo}
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
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          required
                          pattern="[a-zA-Z]+"
                          title="Name Must contain text Only"
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Last Name"
                      >
                        <Form.Control
                          type="text"
                          placeholder="LastName"
                          name="lastName"
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
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
                          onChange={(e) => setdob(e.target.value)}
                          value={dob.slice(0, 10)}
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
                          onChange={(e) => setGender(e.target.value)}
                          value={gender}
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
                          onChange={(e) => setContact(e.target.value)}
                          value={contact}
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
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
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
                          onChange={(e) => setWeight(e.target.value)}
                          value={weight}
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
                          onChange={(e) => setHeight(e.target.value)}
                          value={height}
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
                          onChange={(e) => setPincode(e.target.value)}
                          value={pincode}
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
                          onChange={(e) => setState(e.target.value)}
                          value={state}
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
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
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
                          name="houseNo"
                          onChange={(e) => setHouseNo(e.target.value)}
                          value={houseNo}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </Container>
              </div>
              {pregancyError && <p className="text-danger">{pregancyError}</p>}
              {gender && gender.includes("Female") && (
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
                          onChange={(e) => setPregancy(e.target.value)}
                          value={pregnancy}
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
                          name="guardianName"
                          onChange={(e) => setGuardianName(e.target.value)}
                          value={guardianName}
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
                          name="guardianRelation"
                          onChange={(e) => setGuardianRelation(e.target.value)}
                          value={guardianRelation}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md={4}>
                      <FloatingLabel controlId="floatingInput" label="Contact">
                        <Form.Control
                          type="text"
                          placeholder="Contact"
                          name="guardianContact"
                          onChange={(e) => setGuardianContact(e.target.value)}
                          value={guardianContact}
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
                        onChange={(e) => setEmergencyName(e.target.value)}
                        value={emergencyName}
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
                        name="emergencyRelation"
                        onChange={(e) => setEmergencyRelation(e.target.value)}
                        value={emergencyRelation}
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
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        value={emergencyContact}
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
                        onChange={(e) => setAllergy(e.target.value)}
                        name="allergy"
                        required
                        value={allergy}
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
                        onChange={(e) => setMedicine(e.target.value)}
                        name="medicine"
                        value={medicine}
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
                  {allergy && allergy === "Yes" && (
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
                          value={allergyName}
                          onChange={(e) => setAllergyName(e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                  )}
                  {medicine && medicine === "Yes" && (
                    <Col md={6}>
                      <FloatingLabel controlId="floatingInput" label="Medicine">
                        <Form.Control
                          type="text"
                          placeholder="medicineName"
                          name="allergyMedicine"
                          required
                          value={allergyMedicine}
                          onChange={(e) => setAllergyMedicine(e.target.value)}
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
                    value="Update"
                    className="btn button"
                    style={{
                      backgroundColor: "var(--color-sidebar)",
                      color: "var(--color-slate50)",
                    }}
                  />
                </div>
              </div>
            </form>
          ) : (
            <Loader />
          )}
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
