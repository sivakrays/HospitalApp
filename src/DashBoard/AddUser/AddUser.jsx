import React, { useState } from "react";
import "../../Utility/Utility.css";
import "./AddUser.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { post } from "../../ApiCalls/ApiCalls";
import accessDenied from "../../Assets/Access_Denied.svg";

const AddUser = (props) => {
  const [role, setRole] = useState([]);
  const [register, setRegister] = useState({
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

  const [checkboxError, setCheckboxError] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  function handle(e) {
    const newdata = { ...register };
    newdata[e.target.name] = e.target.value;
    setRegister(newdata);
  }

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

  const handleAddUser = () => {
    const data = {
      firstName: register.firstName,
      lastName: register.lastName,
      userName: register.userName,
      contact: register.contact,
      pincode: register.pincode,
      state: register.state,
      city: register.city,
      street: register.street,
      email: register.email,
      gender: register.gender,
      password: register.password,
      confirmPassword: register.confirmPassword,
      dob: register.dob,
      role: role,
      primaryRole: register.primaryRole,
    };
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    post("", data, config).then((res) => {
      console.log("User Register Success", res);
    });
  };

  // Submit Function

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register.password !== register.confirmPassword) {
      setPasswordMismatch(true);
      return;
    } else if (role.length === 0) {
      setCheckboxError(true);
      return;
    } else {
      handleAddUser();
      setCheckboxError(false);
      setPasswordMismatch(false);
      resetForm();
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
              Add User
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
                    onChange={(e) => handle(e)}
                    value={register.firstName}
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
                    onChange={(e) => handle(e)}
                    value={register.lastName}
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
                    onChange={(e) => handle(e)}
                    value={register.userName}
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
                    onChange={(e) => handle(e)}
                    value={register.contact}
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
                    onChange={(e) => handle(e)}
                    value={register.pincode}
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
                    value={register.state}
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
                    onChange={(e) => handle(e)}
                    value={register.city}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="street" label="House no and Street">
                  <Form.Control
                    type="text"
                    placeholder="House no and Street"
                    name="street"
                    onChange={(e) => handle(e)}
                    value={register.street}
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
                    onChange={(e) => handle(e)}
                    value={register.email}
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
                    value={register.gender}
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
                    onChange={(e) => handle(e)}
                    value={register.password}
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
                    onChange={(e) => handle(e)}
                    value={register.confirmPassword}
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
                    onChange={(e) => handle(e)}
                    value={register.dob}
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
                      onChange={(e) => handle(e)}
                      value={register.primaryRole}
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
                value="Add User"
                className="btn button"
                style={{
                  backgroundColor: "var(--color-sidebar)",
                  color: "var(--color-slate50)",
                }}
              />
              {checkboxError && (
                <p className="text-danger text-center">
                  Please select at least one role.
                </p>
              )}
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
