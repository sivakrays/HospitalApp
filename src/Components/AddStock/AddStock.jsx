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
import "./AddStock.css";
import { FaMinus, FaPlus } from "react-icons/fa6";
import accessDenied from "../../Assets/Access_Denied.svg";
import { get, post } from "../../ApiCalls/ApiCalls";

const InputTaskOne = (props) => {
  const [searchBar, setSearchBar] = useState("");
  const [data, setData] = useState([
    { medicineName: "", expiryDate: "", stockQty: "", price: "", searchResults: [] ,userId: '20'},
  ]);
  const [medicineNames, setMedicineNames] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    {
      get(`/medicine`, config).then((res) => setMedicineNames(res.data));
    }

  }, []);

  const handleAdd = () => {
    setData([
      ...data,
      { medicineName: "", expiryDate: "", stockQty: "", price: "", searchResults: [],userId: '20' },
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
    const filteredResults = medicineNames.filter((name) =>
      name.toLowerCase().includes(searchBar)
    );
    const newData = [...data];
    newData[dataIndex].searchResults = filteredResults;
    setData(newData);
  };

  const handleSearchResultClick = (result, dataIndex) => {
    const newData = [...data];
    newData[dataIndex].medicineName = result;
    newData[dataIndex].searchResults = [];
    setData(newData);
    setSearchValue("");
  };



  // Api Call

  const handleRegister = () => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    post("/stock", data, config).then((res) => {
      console.log("message", res);
    });
  };

  const handleSubmit = () => {
    console.log("Submitted data:", data);
    handleRegister()
    setData("");
  };

  // Calculate form validity
  const formIsValid =
    data &&
    data.every(
      (item) => item.medicineName && item.expiryDate && item.stockQty && item.price
    );




  return (
    <>
      {props.role.includes("Admin") ? (
        <Container className="w-75 mt">
          <h2>Stock Control</h2>
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
                        name="medicineName"
                        value={dataItem.medicineName}
                        onChange={(e) => handleChange(e, i)}
                        disabled
                      />
                    </FloatingLabel>
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
                  </Col>
                  <Col sm={3}>
                    <FloatingLabel label="Expiry Date">
                      <Form.Control
                        type="date"
                        name="expiryDate"
                        value={dataItem.expiryDate}
                        onChange={(e) => handleChange(e, i)}
                        required
                        isInvalid={!dataItem.expiryDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid ExpiryDate.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col sm={3}>
                    <FloatingLabel label="Stock Qty">
                      <Form.Control
                        type="text"
                        name="stockQty"
                        value={dataItem.stockQty}
                        onChange={(e) => handleChange(e, i)}
                        required
                        isInvalid={!dataItem.stockQty}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a stock quantity.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col sm={2}>
                    <FloatingLabel label="Price">
                      <Form.Control
                        type="text"
                        name="price"
                        value={dataItem.price}
                        onChange={(e) => handleChange(e, i)}
                        pattern="\d+(\.\d{2})?"
                        required
                        isInvalid={
                          !dataItem.price ||
                          (dataItem.price &&
                            !/\d+(\.\d{2})?/.test(dataItem.price))
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid price (e.g., 10 or 10.50).
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col md={1}>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(i)}
                      className="mt-2"
                    >
                      <FaMinus />
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}

          <Button variant="primary" onClick={handleAdd} className="mt-3 mb-2">
            <FaPlus />
          </Button>
          <br />
          <input
            type="submit"
            value="Submit"
            className="btn btn-secondary mt-2"
            onClick={handleSubmit}
            disabled={!formIsValid}
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
