import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  FloatingLabel,
} from "react-bootstrap";
import "../AddStock/AddStock.css";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import "./PatientsView.css";
import accessDenied from "../../Assets/Access_Denied.svg";
import { get, post } from "../../ApiCalls/ApiCalls";
import { AuthContext } from "../../Context/authContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const InputTaskOne = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const cuttentDate = `${year}-${month}-${day}`;

  console.log(cuttentDate);

  const [patientDetails, setPatientDetails] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    filterItems();
  }, []);

  const filterItems = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    {
      get(`/mrnNo?mrnNo=${id}`, config).then((res) =>
        setPatientDetails(res.data)
      );
    }
  };

  const [searchBar, setSearchBar] = useState("");
  const [data, setData] = useState([
    {
      prescribedDate: cuttentDate,
      userId: currentUser.userId,
      doctorId: currentUser.userId,
      mrnNo: id,
      medicineName: "",
      duration: "",
      intervals: "",
      comments: "",
      searchResults: [],
    },
  ]);
  const [labTestFields, setLabTestFields] = useState([
    {
      prescribedDate: cuttentDate,
      id: uuidv4(),
      userId: currentUser.userId,
      doctorId: currentUser.userId,
      mrnNo: id,
      labTestName: "",
      labTestComments: "",
    },
  ]);
  const [medicineNames, setMedicineNames] = useState([]);
  const [mName, setMName] = useState("");

  const handleAddLabTestField = () => {
    setLabTestFields([
      ...labTestFields,
      {
        prescribedDate: cuttentDate,
        id: uuidv4(),
        doctorId: currentUser.userId,
        userID: currentUser.userId,
        mrnNo: id,
        labTestName: "",
        labTestComments: "",
      },
    ]);
  };

  const handleRemoveLabTestField = (fieldId) => {
    setLabTestFields(labTestFields.filter((field) => field.id !== fieldId));
  };
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    {
      get(`/medicine?medicineName=${searchBar}`, config)
        .then((res) => setMedicineNames(res.data))
        .catch((err) => console.log(err));
    }
  }, [searchBar]);

  const handleAdd = () => {
    setData([
      ...data,
      {
        prescribedDate: cuttentDate,
        userId: currentUser.userId,
        mrnNo: id,
        doctorId: currentUser.userId,
        medicineName: "",
        duration: "",
        intervals: "",
        comments: "",
        searchResults: [],
      },
    ]);
  };

  const handleChange = (e, dataIndex) => {
    const { name, value } = e.target;
    const newData = [...data];
    newData[dataIndex][name] = value;
    setData(newData);
  };

  const handleDelete = (i) => {
    const newData = [...data];
    newData[i].searchResults = [];
    newData.splice(i, 1);
    setData(newData);
  };

  const handleSearch = (e, dataIndex) => {
    setSearchValue(e.target.value.toLowerCase());
    // const searchValue = e.target.value.toLowerCase();
    setSearchBar(searchValue);
    const filteredResults =
      medicineNames &&
      medicineNames.filter((name) =>
        name.toString().toLowerCase().includes(searchBar)
      );

    const newData = [...data];
    newData[dataIndex].searchResults = medicineNames;
    setData(newData);
    console.log("filteredResults", data);
  };

  const handleSearchResultClick = (result, dataIndex) => {
    const newData = [...data];
    newData[dataIndex].medicineName = result.medicineName;
    newData[dataIndex].searchResults = [];
    setData(newData);
    setSearchValue("");
    console.log("searchClickData", data[0].medicineName.medicineName);
    setMName(result.medicineName);
    console.log(mName);
  };

  // Api Call

  const handleAppointment = () => {
    const datas = {
      medicals: data,
      labTests: labTestFields,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    post("/medicalAndLabTest", datas, config).then((res) => {
      console.log("message", res);
    });
  };

  const notify = () => {
    toast.success("Perscription Added Successfully", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Medicine details:", data);
    console.log("Lab Test Fields", labTestFields);
    setData("");
    setLabTestFields("");
    handleAppointment();
    notify();
  };

  console.log(data);
  return (
    <>
      {props.role.includes("Admin") ? (
        <Container className="container mt">
          <h3 className="text-center">Doctor Prescription</h3>

          <div className="patient__details text-center ">
            <Row>
              {patientDetails && (
                <Col key={patientDetails.mrnNo}>
                  <img
                    src={patientDetails.photo}
                    alt=""
                    width={130}
                    style={{ borderRadius: "50%" }}
                  />
                  <p>
                    <b>Patient MrnNo: </b>
                    {patientDetails.mrnNo}
                  </p>
                  <p>
                    <b>Patient Name: </b>
                    {patientDetails.firstName} {patientDetails.lastName}
                  </p>
                </Col>
              )}
            </Row>
          </div>
          <hr />
          <div className="responsive-perscription">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="medicine-perscription">
                {data &&
                  data.map((dataItem, i) => (
                    <div key={i}>
                      <br />
                      <Row className="mb-3 ">
                        <Col md={3}>
                          <InputGroup>
                            <FloatingLabel label="Medicine Search">
                              <FormControl
                                type="search"
                                name={`search-${i}`}
                                placeholder="Search the Name"
                                onChange={(e) => handleSearch(e, i)}
                                value={searchValue}
                              />
                            </FloatingLabel>
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3} className="mb-2 ">
                          <FloatingLabel label="Medicine">
                            <Form.Control
                              type="text"
                              name="medicine"
                              value={dataItem && dataItem.medicineName}
                              onChange={(e) => handleChange(e, i)}
                              disabled
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col sm={3} className="mb-2 ">
                          <FloatingLabel label="Duration">
                            <Form.Control
                              type="text"
                              name="duration"
                              value={dataItem.duration}
                              required
                              onChange={(e) => handleChange(e, i)}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col sm={3}>
                          <FloatingLabel controlId="Interval" label="Interval">
                            <Form.Select
                              aria-label="Floating label select example"
                              name="intervals"
                              onChange={(e) => handleChange(e, i)}
                              value={dataItem.intervals}
                              required
                            >
                              <option> Select the Interval</option>
                              <option value="1-1-1">1-1-1</option>
                              <option value="1-0-1">1-0-1</option>
                              <option value="1-0-0">1-0-0</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Please select a Gender.
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </Col>
                        <Col sm={3} className="mb-2 ">
                          <FloatingLabel label="Commends">
                            <Form.Control
                              type="text"
                              name="comments"
                              value={dataItem.comments}
                              onChange={(e) => handleChange(e, i)}
                              required
                            />
                          </FloatingLabel>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(i)}
                            className="mt-2 "
                          >
                            <FaMinus />
                          </Button>
                        </Col>
                      </Row>
                      {dataItem.searchResults.length !== 0 && (
                        <div className="search-results">
                          {dataItem.searchResults &&
                            dataItem.searchResults.map((result, index) => (
                              <div
                                key={index}
                                onClick={() =>
                                  handleSearchResultClick(result, i)
                                }
                                className="result-item"
                              >
                                <p>{result.medicineName}</p>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}

                <Row>
                  <Col md={6}>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleAdd}
                    >
                      <span>Add Prescription</span>
                      <FaPlus />
                    </button>
                  </Col>
                </Row>
              </div>

              <div className="labtest mt-3">
                {labTestFields &&
                  labTestFields.map((field) => (
                    <Row key={field.id}>
                      <Col md={6} className="mb-2 ">
                        <FloatingLabel
                          controlId={`labTest-${field.id}`}
                          label="Lab Test Name"
                          className=""
                        >
                          <Form.Control
                            type="text"
                            placeholder="Lab Test"
                            required
                            value={field.labTestName}
                            onChange={(e) => {
                              const updatedFields = labTestFields.map((item) =>
                                item.id === field.id
                                  ? { ...item, labTestName: e.target.value }
                                  : item
                              );
                              setLabTestFields(updatedFields);
                            }}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={6} className="mb-2">
                        <FloatingLabel
                          controlId={`Comments-${field.id}`}
                          label="Comments"
                          className=""
                        >
                          <Form.Control
                            type="text"
                            placeholder="Comments"
                            required
                            name="labTestComments"
                            value={field.labTestComments}
                            onChange={(e) => {
                              const updatedFields = labTestFields.map((item) =>
                                item.id === field.id
                                  ? { ...item, labTestComments: e.target.value }
                                  : item
                              );
                              setLabTestFields(updatedFields);
                            }}
                          />
                        </FloatingLabel>
                        <button
                          className="btn btn-danger btn-sm mt-2"
                          onClick={() => handleRemoveLabTestField(field.id)}
                        >
                          <FaMinus />
                        </button>
                      </Col>
                    </Row>
                  ))}
                <Row>
                  <Col md={6}>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleAddLabTestField}
                    >
                      <span>Add Lab Test</span>
                      <FaPlus />
                    </button>
                  </Col>
                </Row>
              </div>
              {/* {errors.data.length > 0 ||
                (errors.labTestFields.length > 0 && (
                  <div className="validation-errors">
                    <ul>
                      {errors.data.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                      {errors.labTestFields.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                ))} */}
              <br />
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary mt-2 mb-3"
                // onClick={handleSubmit}
              />
            </form>
          </div>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Container>
      ) : (
        <div className="accessDenied">
          <img src={accessDenied} alt="Access Denied" />
          {/* <p>Access Denied</p> */}
        </div>
      )}
    </>
  );
};

export default InputTaskOne;
