import React, { useEffect, useState } from "react";
import "./LabTest.css";
import "../../Utility/Utility.css";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa6";
import accessDenied from "../../Assets/Access_Denied.svg";
import { useParams } from "react-router-dom";
import axios from "axios";

const LabTest = (props) => {
  const { id } = useParams();
  const [patientDetails, setpatientDetails] = useState([]);
  const [LabTestData, setLabTestData] = useState([
    { id: 0, name: "", file: null, comments: "" },
  ]);

  const filterItems = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?id=${id}`
    );
    const data = await res.data;
    setpatientDetails(data);
  };

  useEffect(() => {
    filterItems();
  });

  const addField = () => {
    const newField = {
      id: LabTestData.length,
      name: "",
      file: null,
      comments: "",
    };
    setLabTestData([...LabTestData, newField]);
  };

  const removeField = (id) => {
    const updatedFields = LabTestData.filter((field) => field.id !== id);
    setLabTestData(updatedFields);
    console.log("Deleted Field ID:", id);
  };

  const handleFieldChange = (id, field, value) => {
    const updatedFields = LabTestData.map((f) => {
      if (f.id === id) {
        return { ...f, [field]: value };
      }
      return f;
    });
    setLabTestData(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Test Result", LabTestData);
    setLabTestData([{ id: 0, name: "", file: "", comments: "" }]);
  };

  return (
    <>
      {props.role.includes("Admin") ? (
        <section className="LabTest mt w-100">
          <div className="labTest__Box  p-3">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h3 className="text-center">Lab Report</h3>

              <Row>
                {patientDetails.map((data) => (
                  <ul key={data.id}>
                    <Col md={6}>
                      <li>
                        <img
                          src={data.url}
                          alt=""
                          className="w-25"
                          style={{ borderRadius: "50%" }}
                        />
                      </li>
                    </Col>
                    <Col md={6}>
                      <li>
                        <b>Patient ID: </b>
                        {data.id}
                      </li>
                      <li>
                        <b>Patient Name: </b>
                        {data.title}
                      </li>
                    </Col>
                  </ul>
                ))}
              </Row>

              {LabTestData.map((field, index) => (
                <Row className="mt-3" key={field.id}>
                  <Col md={4} className="mb-2">
                    <FloatingLabel
                      controlId={`name${field.id}`}
                      label="Name"
                      className=""
                    >
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        value={field.name}
                        onChange={(e) =>
                          handleFieldChange(field.id, "name", e.target.value)
                        }
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={4} className="mb-2">
                    <FloatingLabel
                      controlId={`file${field.id}`}
                      label="Choose File"
                    >
                      <Form.Control
                        type="file"
                        placeholder=""
                        onChange={(e) =>
                          handleFieldChange(field.id, "file", e.target.files[0])
                        }
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={4} className="mb-2">
                    <FloatingLabel
                      controlId={`comments${field.id}`}
                      label="Comments"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Comments"
                        value={field.comments}
                        onChange={(e) =>
                          handleFieldChange(
                            field.id,
                            "comments",
                            e.target.value
                          )
                        }
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={4} className="mb-2">
                    {index === LabTestData.length - 1 && (
                      <button className="btn btn-success" onClick={addField}>
                        <FaPlus />
                      </button>
                    )}
                    {LabTestData.length > 1 && (
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => removeField(field.id)}
                        style={{ marginLeft: "20px" }}
                      >
                        <FaMinus />
                      </button>
                    )}
                  </Col>
                </Row>
              ))}

              <Row>
                <Col className="d-flex justify-content-center align-item-center w-100 mt-3">
                  <input
                    type="submit"
                    value="Confirm"
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

export default LabTest;
