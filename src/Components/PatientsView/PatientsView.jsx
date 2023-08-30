import React, { useState, useEffect } from "react";
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
import accessDenied from "../../Assets/Access_Denied.svg"


const InputTaskOne = () => {
  const { id } = useParams();
  const [patientDetails, setPatientDetails] = useState([]);
  const [searchValue, setSearchValue] = useState("")
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
  const [searchBar, setSearchBar] = useState("");
  const [data, setData] = useState([
    {
      medicine: "",
      duration: "",
      interval: "",
      commends: "",
      searchResults: [],
    },
  ]);
  const [labTestFields, setLabTestFields] = useState([
    {
      id: uuidv4(),
      labTest: "",
      comments: "",
    },
  ]);
  const [medicineNames, setMedicineNames] = useState([]);
  const handleAddLabTestField = () => {
    setLabTestFields([
      ...labTestFields,
      {
        id: uuidv4(),
        labTest: "",
        comments: "",
      },
    ]);
  };

  const handleRemoveLabTestField = (fieldId) => {
    setLabTestFields(labTestFields.filter((field) => field.id !== fieldId));
  };
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const names = response.data.map((user) => user.name);
        setMedicineNames(names);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAdd = () => {
    setData([
      ...data,
      {
        medicine: "",
        duration: "",
        interval: "",
        commends: "",
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
    setSearchValue(e.target.value.toLowerCase())
    // const searchValue = e.target.value.toLowerCase();
    setSearchBar(searchValue);
    const filteredResults = medicineNames.filter((name) =>
      name.toLowerCase().includes(searchBar)
    );
    const newData = [...data];
    newData[dataIndex].searchResults = filteredResults;
    setData(newData);
  };

  const handleSearchResultClick = (result, dataIndex) => {
    const newData = [...data];
    newData[dataIndex].medicine = result;
    newData[dataIndex].searchResults = [];
    setData(newData);
    setSearchValue("")
  };

  const handleSubmit = () => {
    console.log("Medicine details:", data);
    console.log("Lab Test Fields", labTestFields);
    setData("");
    setLabTestFields("");
  };

  return (
    <Container className="container mt">
      <h3 className="text-center">Doctor Prescription</h3>

      <div className="patient__details text-center ">
        <Row>
          {patientDetails &&
            patientDetails.map((data) => (
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
      <hr />
      <div className="responsive-perscription">
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
                          required
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
                        value={dataItem.medicine}
                        onChange={(e) => handleChange(e, i)}
                        disabled
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm={3} className="mb-2 ">
                    <FloatingLabel label="Duration">
                      <Form.Control
                        type="text"
                        name="duration"
                        value={dataItem.duration}
                        onChange={(e) => handleChange(e, i)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm={3}>
                    <FloatingLabel label="Interval">
                      <Form.Control
                        type="text"
                        name="interval"
                        value={dataItem.interval}
                        onChange={(e) => handleChange(e, i)}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm={3} className="mb-2 ">
                    <FloatingLabel label="Commends">
                      <Form.Control
                        type="text"
                        name="commends"
                        value={dataItem.commends}
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
                          onClick={() => handleSearchResultClick(result, i)}
                          className="result-item"
                        >
                          {result}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}

          <Row>
            <Col md={6}>
              <button className="btn btn-success btn-sm" onClick={handleAdd}>
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

        <br />
        <input
          type="submit"
          value="Submit"
          className="btn btn-primary mt-2 mb-3"
          onClick={handleSubmit}
        />
      </div>
    </Container>
  );
};

export default InputTaskOne;

// import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import "./PatientsView.css";
// import "../../Utility/Utility.css";
// import { useParams } from "react-router-dom";
// import { Form, Row, Col, FloatingLabel, InputGroup, FormControl } from "react-bootstrap";
// import axios from "axios";
// import { FaMinus, FaPlus } from "react-icons/fa6";

// const PatientsView = () => {
//   const { id } = useParams();

//   const doctorId = 34;

//   const [search, setSearch] = useState("");
//   const [patientdetails, setPatientDetails] = useState([]);
//   const [MedicineNameList, setMedicineNameList] = useState("");
//   const [medineName, setMedicineName] = useState("");
//   const [medicineNameError, setMedicineNameError] = useState("");

//   const [medicineFields, setMedicineFields] = useState([
//     {
//       id: uuidv4(),
//       medicine: "",
//       duration: "",
//       interval: "",
//       comments: "",
//       patientId: id,
//       DoctorId: doctorId,
//       search: "",
//     },
//   ]);
//   const [labTestFields, setLabTestFields] = useState([
//     {
//       id: uuidv4(),
//       labTest: "",
//       comments: "",
//       patientId: id,
//       DoctorId: doctorId,
//     },
//   ]);

//   useEffect(() => {
//     filterItems();
//   }, []);

//   const filterItems = async () => {
//     const res = await axios.get(
//       `https://jsonplaceholder.typicode.com/photos?id=${id}`
//     );
//     const data = await res.data;
//     setPatientDetails(data);
//   };

//   const handleAddMedicationField = () => {
//     setMedicineFields([
//       ...medicineFields,
//       {
//         id: uuidv4(),
//         medicine: "",
//         duration: "",
//         interval: "",
//         comments: "",
//         patientId: id,
//         DoctorId: doctorId,
//       },
//     ]);
//   };

//   const handleRemoveMedicationField = (fieldId) => {
//     setMedicineFields(medicineFields.filter((field) => field.id !== fieldId));
//   };

//   const handleAddLabTestField = () => {
//     setLabTestFields([
//       ...labTestFields,
//       {
//         id: uuidv4(),
//         labTest: "",
//         comments: "",
//         patientId: id,
//         DoctorId: doctorId,
//       },
//     ]);
//   };

//   const handleRemoveLabTestField = (fieldId) => {
//     setLabTestFields(labTestFields.filter((field) => field.id !== fieldId));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (medineName === 0) {
//       setMedicineNameError("Please Enter the Medicine Name");
//     } else {
//       console.log("Medication Details:", medicineFields);
//       console.log("Lab Test Details:", labTestFields);
//       setMedicineNameError("");
//       setLabTestFields([{ id: uuidv4(), labTest: "", comments: "" }]);
//       setMedicineFields([
//         {
//           id: uuidv4(),
//           medicine: "",
//           duration: "",
//           interval: "",
//           comments: "",
//         },
//       ]);
//     }
//   };

//   // Filter the Doctor Name

//   useEffect(() => {
//     const fetchData = async () => {
//       if (search.length > 0) {
//         try {
//           const res = await axios.get(
//             "https://jsonplaceholder.typicode.com/users"
//           );
//           setMedicineNameList(res.data);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [search]);

//   const handleSearch = (e) => {
//     const searchData = e.target.value;
//     setSearch(searchData);
//   };

//   const filteredData =
//   MedicineNameList &&
//   MedicineNameList.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSelectMedicineName = (fieldId, selectedMedicine) => {
//     const updatedFields = medicineFields.map((item) =>
//       item.id === fieldId ? { ...item, medicine: selectedMedicine } : item
//     );
//     setMedicineFields(updatedFields);
//     setMedicineName(selectedMedicine);
//     setSearch(""); // Clear the search input
//   };

//   console.log(medineName);

//   return (
//     <section className="patientView mt w-100">
//       <form className="labTest__Box  p-3" onSubmit={handleSubmit}>
//         <h3 className="text-center">Doctor Prescription</h3>

//         <div className="patient__details text-center">
//           <Row>
//             {patientdetails.map((data) => (
//               <Col key={data.id}>
//                 <img
//                   src={data.url}
//                   alt=""
//                   width={130}
//                   style={{ borderRadius: "50%" }}
//                 />
//                 <p>
//                   <b>Patient ID: </b>
//                   {data.id}
//                 </p>
//                 <p>
//                   <b>Patient Name: </b>
//                   {data.title}
//                 </p>
//               </Col>
//             ))}
//           </Row>
//         </div>

//         <div className="perscription">
//           {medicineFields.map((field,i) => (
//             <div key={field.id}>
//               <Row className="mb-3">
//             <Col md={3}>
//               <InputGroup>
//                 <FloatingLabel label="Medicine Search">
//                   <FormControl
//                     type="search"
//                     name={`search-${i}`}
//                     placeholder="Search the Name"
//                     onChange={(e) => handleSearch(e, i)}
//                   />
//                 </FloatingLabel>
//               </InputGroup>
//             </Col>
//           </Row>
//               <Row>
//                 <Col md={3} className="mb-2">
//                   <FloatingLabel
//                     controlId={`medicine-${field.id}`}
//                     label="Medicine Name"
//                     className=""
//                   >
//                     <Form.Control
//                       type="text"
//                       placeholder="Medicine"
//                       required
//                       name="medicine"
//                       disabled
//                       value={field.medicine}
//                       onChange={(e) => {
//                         const updatedFields = medicineFields.map((item) =>
//                           item.id === field.id
//                             ? { ...item, medicine: e.target.value }
//                             : item
//                         );
//                         setMedicineFields(updatedFields);
//                       }}
//                     />
//                   </FloatingLabel>
//                 </Col>
//                 {search.length <= 0 ? (
//                   ""
//                 ) : (
//                   <div className="doctor-list">
//                     {search.length !== 0 &&
//                       filteredData &&
//                       filteredData.map((doctor ,index) => (
//                         <div
//                           key={index}
//                           onClick={() =>
//                             handleSelectMedicineName(field.id, doctor.name)
//                           }
//                         >
//                           <p>{doctor.name}</p>
//                         </div>
//                       ))}
//                   </div>
//                 )}
//                 <Col md={3} className="mb-2">
//                   <FloatingLabel
//                     controlId={`duration-${field.id}`}
//                     label="Duration"
//                     className=""
//                   >
//                     <Form.Control
//                       type="text"
//                       placeholder="Duration"
//                       required
//                       value={field.duration}
//                       onChange={(e) => {
//                         const updatedFields = medicineFields.map((item) =>
//                           item.id === field.id
//                             ? { ...item, duration: e.target.value }
//                             : item
//                         );
//                         setMedicineFields(updatedFields);
//                       }}
//                     />
//                   </FloatingLabel>
//                 </Col>
//                 <Col md={3} className="mb-2">
//                   <FloatingLabel
//                     controlId={`interval-${field.id}`}
//                     label="Interval"
//                     className=""
//                     required
//                   >
//                     <Form.Control
//                       type="text"
//                       placeholder="Interval"
//                       required
//                       value={field.interval}
//                       onChange={(e) => {
//                         const updatedFields = medicineFields.map((item) =>
//                           item.id === field.id
//                             ? { ...item, interval: e.target.value }
//                             : item
//                         );
//                         setMedicineFields(updatedFields);
//                       }}
//                     />
//                   </FloatingLabel>
//                 </Col>
//                 <Col md={3} className="mb-2">
//                   <FloatingLabel
//                     controlId={`Comments-${field.id}`}
//                     label="Comments"
//                     className=""
//                   >
//                     <Form.Control
//                       type="text"
//                       placeholder="Comments"
//                       required
//                       value={field.comments}
//                       onChange={(e) => {
//                         const updatedFields = medicineFields.map((item) =>
//                           item.id === field.id
//                             ? { ...item, comments: e.target.value }
//                             : item
//                         );
//                         setMedicineFields(updatedFields);
//                       }}
//                     />
//                   </FloatingLabel>
//                   <button
//                     className="btn btn-danger btn-sm mt-2"
//                     onClick={() => handleRemoveMedicationField(field.id)}
//                   >
//                     <FaMinus />
//                   </button>
//                 </Col>
//               </Row>
//             </div>
//           ))}
//           <Row>
//             <Col md={6}>
//               <button
//                 className="btn btn-success btn-sm"
//                 onClick={handleAddMedicationField}
//               >
//                 <span>Add Prescription</span>
//                 <FaPlus />
//               </button>
//             </Col>
//           </Row>
//         </div>

//         <div className="labtest mt-3">
//           {labTestFields.map((field) => (
//             <Row key={field.id}>
//               <Col md={6} className="mb-2">
//                 <FloatingLabel
//                   controlId={`labTest-${field.id}`}
//                   label="Lab Test Name"
//                   className=""
//                 >
//                   <Form.Control
//                     type="text"
//                     placeholder="Lab Test"
//                     required
//                     value={field.labTest}
//                     onChange={(e) => {
//                       const updatedFields = labTestFields.map((item) =>
//                         item.id === field.id
//                           ? { ...item, labTest: e.target.value }
//                           : item
//                       );
//                       setLabTestFields(updatedFields);
//                     }}
//                   />
//                 </FloatingLabel>
//               </Col>
//               <Col md={6} className="mb-2">
//                 <FloatingLabel
//                   controlId={`Comments-${field.id}`}
//                   label="Comments"
//                   className=""
//                 >
//                   <Form.Control
//                     type="text"
//                     placeholder="Comments"
//                     required
//                     value={field.comments}
//                     onChange={(e) => {
//                       const updatedFields = labTestFields.map((item) =>
//                         item.id === field.id
//                           ? { ...item, comments: e.target.value }
//                           : item
//                       );
//                       setLabTestFields(updatedFields);
//                     }}
//                   />
//                 </FloatingLabel>
//                 <button
//                   className="btn btn-danger btn-sm mt-2"
//                   onClick={() => handleRemoveLabTestField(field.id)}
//                 >
//                   <FaMinus />
//                 </button>
//               </Col>
//             </Row>
//           ))}
//           <Row>
//             <Col md={6}>
//               <button
//                 className="btn btn-success btn-sm"
//                 onClick={handleAddLabTestField}
//               >
//                 <span>Add Lab Test</span>
//                 <FaPlus />
//               </button>
//             </Col>
//           </Row>
//         </div>

//         {medicineNameError && (
//           <p className="text-danger">{medicineNameError}</p>
//         )}

//         <Row>
//           <Col className="w-100 d-flex justify-content-center align-item-center">
//             <input
//               type="submit"
//               value="Submit"
//               className="btn btn-primary mt-2 px-4"
//             />
//           </Col>
//         </Row>
//       </form>
//     </section>
//   );
// };

// export default PatientsView;
