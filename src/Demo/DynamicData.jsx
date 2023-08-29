import React, { useState, useEffect } from "react";
import axios from "axios";
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
import "../Components/AddStock/AddStock.css";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";


const InputTaskOne = () => {
  const [searchBar, setSearchBar] = useState("");
  const [data, setData] = useState([
    { medicine: "", duration: "", interval: "", commends: "", searchResults: [] },
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
      { medicine: "", duration: "", interval: "", commends: "", searchResults: [] },
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
    const searchValue = e.target.value.toLowerCase();
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
    setSearchBar("");
  };

  const handleSubmit = () => {
    console.log("Submitted data:", data);
    setData("");
  };

  return (
    <Container className="w-100 container mt">
      <h2>Prescription</h2>
      <hr />
      {data &&
        data.map((dataItem, i) => (
          <div key={i}>
            <br />
            <Row className="mb-3">
              <Col md={3}>
                <InputGroup>
                  <FloatingLabel label="Medicine Search">
                    <FormControl
                      type="search"
                      name={`search-${i}`}
                      placeholder="Search the Name"
                      onChange={(e) => handleSearch(e, i)}
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
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
              <Col sm={3}>
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
                  />
                </FloatingLabel>
              </Col>
              <Col sm={3}>
                <FloatingLabel label="Commends">
                  <Form.Control
                    type="text"
                    name="commends"
                    value={dataItem.commends}
                    onChange={(e) => handleChange(e, i)}
                  />
                </FloatingLabel>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(i)}
                  className="mt-2"
                >
                  <FaMinus />
                </Button>
              </Col>
            </Row>

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
      <br />
      <input
        type="submit"
        value="Submit"
        className="btn btn-secondary mt-2"
        onClick={handleSubmit}
      />
    </Container>
  );
};

export default InputTaskOne;
