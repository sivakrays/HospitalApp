import React, { useEffect, useState } from "react";
import "../../../Utility/Utility.css";
import "../../../DashBoard/AddUser/AddUser.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import accessDenied from "../../../Assets/Access_Denied.svg";
import { get, put } from "../../../ApiCalls/ApiCalls";
import { useParams } from "react-router-dom";

const AddUser = (props) => {
  const { id } = useParams();

  const [staffData, setStaffData] = useState("");

  const [register, setRegister] = useState({});
  const [role, setRole] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [primaryRole, setPrimaryRole] = useState("");

  // console.log(register);

  const resetForm = () => {
    setRegister({
      firstName: "",
      lastName: "",
      userName: "",
      contact: "",
      pincode: "",
      state: "",
      city: "",
      street: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      gender: "",
      primaryRole: "",
    });
    setRole([]);
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    get(`/userId?userId=${id}`, config).then((res) => {
      setStaffData(res.data);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setUserName(res.data.userName);
      setdob(res.data.dob);
      setGender(res.data.gender);
      setContact(res.data.contact);
      setEmail(res.data.email);
      setPincode(res.data.pincode);
      setState(res.data.state);
      setCity(res.data.city);
      setHouseNo(res.data.houseNo);
      setPassword(res.data.password);
      setConfirmPassword(res.data.confirmPassword);
      setPrimaryRole(res.data.primaryRole);
      setRole(res.data.roles);
    });
  }, []);

  const [checkboxError, setCheckboxError] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);


  // Handle the Role

  const handleRoleChange = (e) => {
    const roleName = e.target.name;
    const isChecked = e.target.checked;

    if (isChecked) {
      setRole((prevRoles) => [...prevRoles, roleName]);
    } else {
      setRole((prevRoles) => prevRoles.filter((role) => role !== roleName));
    }
  };

  // Api Call

  const handleStaffsDetails = () => {
    const data = {
      userId: id,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      dob: dob,
      gender: gender,
      houseNo: houseNo,
      contact: contact,
      city: city,
      state: state,
      pincode: pincode,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      primaryRole: primaryRole,
      roles: role,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    put("/updateUser", data, config).then((res) => {
      console.log("Result", res);
    });
  };

  // Submit Function

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    } else if (role.length === 0) {
      setCheckboxError(true);
      return;
    } else {
      handleStaffsDetails()
      setCheckboxError(false);
      setPasswordMismatch(false);
      // resetForm();
      console.log("User register", register);
    }
  };

  return (
    <>
      {props.role.includes("Admin") ? (
        <section className="add__user" id="container">
          <form
            className="add__user__inputs rounded container shadow"
            onSubmit={(e) => handleSubmit(e)}
          >
            <h2
              className="text-center mb-3  text-white  rounded py-3 text-uppercase shadow"
              style={{ backgroundColor: "var(--color-sidebar)" }}
            >
              Update User Info
            </h2>

            {/* Name Field */}

            <Row>
              <Col md={6}>
                <FloatingLabel
                  controlId="firstName"
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
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="LastName" label="Last Name">
                  <Form.Control
                    type="text"
                    placeholder="LastName"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            {/* User Name Contact */}

            <Row className="mt-md">
              <Col md={6}>
                <FloatingLabel
                  controlId="UserName"
                  label="UserName"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="UserName"
                    name="userName"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="Contact" label="Contact">
                  <Form.Control
                    type="text"
                    placeholder="Contact"
                    name="contact"
                    onChange={(e) => setContact(e.target.value)}
                    value={contact}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            {/* pincode state */}

            <Row className="mt-md">
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

            {/* city Street */}

            <Row className="mt-md">
              <Col md={6}>
                <FloatingLabel controlId="City" label="City" className="mb-3">
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
                <FloatingLabel controlId="street" label="House no and Street">
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

            {/* Email Gender */}

            <Row className="mt-md">
              <Col md={6}>
                <FloatingLabel
                  controlId="Email"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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
                    <option value="Others">Others</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a Gender.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            {/* Password Confirm PAssword */}

            <Row className="mt-md">
              <Col md={6}>
                <FloatingLabel
                  controlId="Password"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="Confirm" label="Confirm Password">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            {/* DOB and Role field*/}
            <Row className="mt-md">
              <Col md={6}>
                <FloatingLabel
                  controlId="DOB"
                  label="Date of birth"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder="Date of Birth"
                    name="dob"
                    onChange={(e) => setdob(e.target.value)}
                    value={dob.slice(0, 10)}
                    max={new Date().toISOString().split("T")[0]}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <div className="d-flex check flex-wrap ">
                  <Form.Check
                    type="checkbox"
                    label="Doctor"
                    name="Doctor"
                    checked={role.includes("Doctor")}
                    onChange={handleRoleChange}
                    style={{ marginRight: "10px" }}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Receptionist"
                    name="Receptionist"
                    checked={role.includes("Receptionist")}
                    onChange={handleRoleChange}
                    style={{ marginRight: "10px" }}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Nurse"
                    name="Nurse"
                    checked={role.includes("Nurse")}
                    onChange={handleRoleChange}
                    style={{ marginRight: "10px" }}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Laboratory"
                    name="Laboratory"
                    checked={role.includes("Laboratory")}
                    onChange={handleRoleChange}
                    style={{ marginRight: "10px" }}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Medical"
                    name="Medical"
                    checked={role.includes("Medical")}
                    onChange={handleRoleChange}
                    style={{ marginRight: "10px" }}
                  />

                  <Form.Check
                    type="checkbox"
                    label="Admin"
                    name="Admin"
                    checked={role.includes("Admin")}
                    onChange={handleRoleChange}
                    style={{ marginRight: "10px" }}
                  />
                </div>
              </Col>
            </Row>

            {role.length >= 1 ? (
              <Row>
                <Col md={6}></Col>
                <Col md={6}>
                  <FloatingLabel controlId="primaryRole" label="Primary Role">
                    <Form.Select
                      aria-label="Floating label select example"
                      name="primaryRole"
                      onChange={(e) => setPrimaryRole(e.target.value)}
                      value={primaryRole}
                      required
                    >
                      <option value="">Select The Primary Role</option>
                      {role &&
                        role.map((i, index) => {
                          return (
                            <>
                              <option value={i} key={index}>
                                {i}
                              </option>
                            </>
                          );
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select a Gender.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
            ) : null}

            <div className="add__user__btn mt-md">
              <input
                type="submit"
                value="Update"
                className="btn button"
                style={{
                  backgroundColor: "var(--color-sidebarActive)",
                  color: "var(--color-slate50)",
                }}
              />

              {passwordMismatch && (
                <p className="text-danger text-center">
                  Passwords do not match.
                </p>
              )}
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

export default AddUser;
