import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./PatientsView.css";
import "../../Utility/Utility.css";
import { useParams } from "react-router-dom";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { FaMinus, FaPlus } from "react-icons/fa6";
import DataSearch from "../DataSearch/DataSearch";

const PatientsView = () => {
  const { id } = useParams();

  const doctorId = 34;

  const [search, setSearch] = useState("");
  const [patientdetails, setPatientDetails] = useState([]);
  const [MedicineNameList, setMedicineNameList] = useState("");
  const [medineName, setMedicineName] = useState("");
  const [medicineNameError, setMedicineNameError] = useState("");

  const [medicineFields, setMedicineFields] = useState([
    {
      id: uuidv4(),
      medicine: medineName,
      duration: "",
      interval: "",
      comments: "",
      patientId: id,
      DoctorId: doctorId,
    },
  ]);
  const [labTestFields, setLabTestFields] = useState([
    {
      id: uuidv4(),
      labTest: "",
      comments: "",
      patientId: id,
      DoctorId: doctorId,
    },
  ]);

  useEffect(() => {
    filterItems();
  }, []);

  const filterItems = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?id=${id}`
    );
    const data = await res.data;
    setPatientDetails(data);
  };

  const handleAddMedicationField = () => {
    setMedicineFields([
      ...medicineFields,
      {
        id: uuidv4(),
        medicine: "",
        duration: "",
        interval: "",
        comments: "",
        patientId: id,
        DoctorId: doctorId,
      },
    ]);
  };

  const handleRemoveMedicationField = (fieldId) => {
    setMedicineFields(
      medicineFields.filter((field) => field.id !== fieldId)
    );
  };

  const handleAddLabTestField = () => {
    setLabTestFields([
      ...labTestFields,
      {
        id: uuidv4(),
        labTest: "",
        comments: "",
        patientId: id,
        DoctorId: doctorId,
      },
    ]);
  };

  const handleRemoveLabTestField = (fieldId) => {
    setLabTestFields(labTestFields.filter((field) => field.id !== fieldId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(medineName == 0){
      setMedicineNameError("Please Enter the Medicine Name");
    }
    else{
      console.log("Medication Details:", medicineFields);
      console.log("Lab Test Details:", labTestFields);
      setMedicineNameError("")
      setLabTestFields([{ id: uuidv4(), labTest: "", comments: "" }]);
      setMedicineFields([
        { id: uuidv4(), medicine: "", duration: "", interval: "", comments: "" },
      ]);
    }

  };

  // Filter the Doctor Name

  useEffect(() => {
    const fetchData = async () => {
      if (search.length > 0) {
        try {
          const res = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          setMedicineNameList(res.data);
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
    MedicineNameList &&
    MedicineNameList.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );


  const handleDoctorName = (e) => {
    const selectedDoctorName = e.target.innerText;
    setMedicineName(selectedDoctorName);
    setSearch("");
  };

  console.log(medineName)

  return (
    <section className="patientView mt w-100">
      <form className="labTest__Box  p-3" onSubmit={handleSubmit}>
        <h3 className="text-center">Patient Medicine/LabTest</h3>

        <div className="patient__details text-center">
          <Row>
            {patientdetails.map((data) => (
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

        <div className="perscription">
          
          {medicineFields.map((field) => (
            <>
            <Row>
            <Col className="mb-2" md={3}>
              <DataSearch search={search} handleSearch={handleSearch} />
            </Col>
          </Row>
            <Row key={field.id}>
              <Col md={3} className="mb-2">
                <FloatingLabel
                  controlId={`medicine-${field.id}`}
                  label="Medicine Name"
                  className=""
                >
                  <Form.Control
                    type="text"
                    placeholder="Medicine"
                    required
                    disabled
                    value={medineName}
                    // onChange={(e) => {
                    //   const updatedFields = medicineFields.map((item) =>
                    //     item.id === field.id
                    //       ? { ...item, medicine: e.target.value }
                    //       : item
                    //   );
                    //   setMedicineFields(updatedFields);
                    // }}
                  />
                </FloatingLabel>
              </Col>
              {search.length <= 0 ? (
                ""
              ) : (
                <div className="doctor-list">
                  {search.length !== 0 &&
                    filteredData &&
                    filteredData.map((doctor) => (
                      <div key={doctor.id}>
                        <p onClick={(e) => handleDoctorName(e)}>
                          {doctor.name}
                        </p>
                      </div>
                    ))}
                </div>
              )}
              <Col md={3} className="mb-2">
                <FloatingLabel
                  controlId={`duration-${field.id}`}
                  label="Duration"
                  className=""
                >
                  <Form.Control
                    type="text"
                    placeholder="Duration"
                    required
                    value={field.duration}
                    onChange={(e) => {
                      const updatedFields = medicineFields.map((item) =>
                        item.id === field.id
                          ? { ...item, duration: e.target.value }
                          : item
                      );
                      setMedicineFields(updatedFields);
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col md={3} className="mb-2">
                <FloatingLabel
                  controlId={`interval-${field.id}`}
                  label="Interval"
                  className=""
                  required
                >
                  <Form.Control
                    type="text"
                    placeholder="Interval"
                    required
                    value={field.interval}
                    onChange={(e) => {
                      const updatedFields = medicineFields.map((item) =>
                        item.id === field.id
                          ? { ...item, interval: e.target.value }
                          : item
                      );
                      setMedicineFields(updatedFields);
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col md={3} className="mb-2">
                <FloatingLabel
                  controlId={`Comments-${field.id}`}
                  label="Comments"
                  className=""
                >
                  <Form.Control
                    type="text"
                    placeholder="Comments"
                    required
                    value={field.comments}
                    onChange={(e) => {
                      const updatedFields = medicineFields.map((item) =>
                        item.id === field.id
                          ? { ...item, comments: e.target.value }
                          : item
                      );
                      setMedicineFields(updatedFields);
                    }}
                  />
                </FloatingLabel>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => handleRemoveMedicationField(field.id)}
                >
                  <FaMinus />
                </button>
              </Col>
            </Row>
            </>
          ))}
          <Row>
            <Col md={6}>
              <button
                className="btn btn-success btn-sm"
                onClick={handleAddMedicationField}
              >
                <span>Add Prescription</span>
                <FaPlus />
              </button>
            </Col>
          </Row>
        </div>

        <div className="labtest mt-3">
          {labTestFields.map((field) => (
            <Row key={field.id}>
              <Col md={6} className="mb-2">
                <FloatingLabel
                  controlId={`labTest-${field.id}`}
                  label="Lab Test Name"
                  className=""
                >
                  <Form.Control
                    type="text"
                    placeholder="Lab Test"
                    required
                    value={field.labTest}
                    onChange={(e) => {
                      const updatedFields = labTestFields.map((item) =>
                        item.id === field.id
                          ? { ...item, labTest: e.target.value }
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
                    value={field.comments}
                    onChange={(e) => {
                      const updatedFields = labTestFields.map((item) =>
                        item.id === field.id
                          ? { ...item, comments: e.target.value }
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

        {medicineNameError && (
          <p className="text-danger">{medicineNameError}</p>
        )}

        <Row>
          <Col className="w-100 d-flex justify-content-center align-item-center">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary mt-2 px-4"
            />
          </Col>
        </Row>
      </form>
    </section>
  );
};

export default PatientsView;
