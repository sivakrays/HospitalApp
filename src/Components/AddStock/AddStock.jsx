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

const InputTaskOne = (props) => {
  const [searchBar, setSearchBar] = useState("");
  const [data, setData] = useState([
    { medicine: "", date: "", stockQty: "", price: "", searchResults: [] },
  ]);
  const [medicineNames, setMedicineNames] = useState([]);

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
      { medicine: "", date: "", stockQty: "", price: "", searchResults: [] },
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

  // Calculate form validity
  const formIsValid =
    data &&
    data.every(
      (item) => item.medicine && item.date && item.stockQty && item.price
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
                        name="medicine"
                        value={dataItem.medicine}
                        onChange={(e) => handleChange(e, i)}
                        disabled
                      />
                    </FloatingLabel>
                    {searchBar.length !== 0 && (
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
                        name="date"
                        value={dataItem.date}
                        onChange={(e) => handleChange(e, i)}
                        required
                        isInvalid={!dataItem.date}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid date.
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

// import React, { useState } from "react";
// import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
// import { FaMinus, FaPlus } from "react-icons/fa6";

// const AddStock = () => {
//   const [fields, setFields] = useState([
//     {
//       userId: "",
//       medicineName: "",
//       expiryDate: "",
//       stockQty: "",
//       price: "",
//     },
//   ]);

//   const addField = () => {
//     setFields([
//       ...fields,
//       { userId: "", medicineName: "", expiryDate: "", stockQty: "", price: "" },
//     ]);
//   };

//   const handleFieldChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedFields = [...fields];
//     updatedFields[index][name] = value;
//     setFields(updatedFields);
//   };

//   const removeField = (index) => {
//     if (fields.length === 1) {
//       return;
//     }
//     const updatedFields = [...fields];
//     updatedFields.splice(index, 1);
//     setFields(updatedFields);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Stock Details:", fields);
//     setFields([{ medicineName: "", expiryDate: "", stockQty: "", price: "" }]);
//   };

//   return (
//     <section className="addStock mt container w-75">
//       <h2>Stock Control</h2>
//       <hr />
//       <form onSubmit={(e) => handleSubmit(e)}>
//         {fields.map((field, index) => (
//           <>
//             <Row>
//               <Col md={3} className="mb-2">
//                 {" "}
//                 <FloatingLabel
//                   controlId={`medicineName_${index}`}
//                   label="Medicine Name"
//                   className=""
//                 >
//                   <Form.Control type="Search" name="search" />
//                 </FloatingLabel>
//               </Col>
//             </Row>
//             <Row key={index}>
//               <Col md={3} className="mb-2">
//                 <FloatingLabel
//                   controlId={`medicineName_${index}`}
//                   label="Medicine Name"
//                   className=""
//                 >
//                   <Form.Control
//                     type="text"
//                     name="medicineName"
//                     value={field.medicineName}
//                     onChange={(e) => handleFieldChange(index, e)}
//                     required
//                   />
//                 </FloatingLabel>
//               </Col>
//               <Col md={3} className="mb-2">
//                 <FloatingLabel
//                   controlId={`expiryDate_${index}`}
//                   label="Expiry Date"
//                   className=""
//                 >
//                   <Form.Control
//                     type="date"
//                     name="expiryDate"
//                     value={field.expiryDate}
//                     onChange={(e) => handleFieldChange(index, e)}
//                     required
//                   />
//                 </FloatingLabel>
//               </Col>
//               <Col md={3} className="mb-2">
//                 <FloatingLabel
//                   controlId={`stockQty_${index}`}
//                   label="Stock Qty"
//                   className=""
//                 >
//                   <Form.Control
//                     type="text"
//                     name="stockQty"
//                     value={field.stockQty}
//                     onChange={(e) => handleFieldChange(index, e)}
//                     required
//                   />
//                 </FloatingLabel>
//               </Col>
//               <Col md={2} className="mb-2">
//                 <FloatingLabel
//                   controlId={`price_${index}`}
//                   label="Price"
//                   className=""
//                 >
//                   <Form.Control
//                     type="text"
//                     name="price"
//                     value={field.price}
//                     onChange={(e) => handleFieldChange(index, e)}
//                     required
//                   />
//                 </FloatingLabel>
//               </Col>
//               <Col md={1} className="mb-2">
//                 {index > 0 && (
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => removeField(index)}
//                   >
//                     <FaMinus />
//                   </button>
//                 )}
//               </Col>
//             </Row>
//           </>
//         ))}
//         <Row>
//           <Col>
//             <button className="btn btn-danger btn-sm mt-2" onClick={addField}>
//               <FaPlus />
//             </button>
//           </Col>
//         </Row>
//         <input
//           type="submit"
//           value="Submit"
//           className="btn btn-secondary mt-2"
//         />
//       </form>
//     </section>
//   );
// };

// export default AddStock;
