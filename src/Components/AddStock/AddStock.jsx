import React, { useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddStock = () => {
  const [fields, setFields] = useState([
    {
      userId:"",
      medicineName: "",
      expiryDate: "",
      stockQty: "",
      price:""
    },
  ]);

  const addField = () => {
    setFields([...fields, { userId:"", medicineName: "", expiryDate: "", stockQty: "",price:"" }]);
  };

  const handleFieldChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    if (fields.length === 1) {
      return; 
    }
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Stock Details:", fields);
    setFields([{ medicineName: "", expiryDate: "", stockQty: "",price:"" }]);
  };

  return (
    <section className="addStock mt container w-75">
      <h2>Stock Control</h2>
      <hr />
      <form onSubmit={(e) => handleSubmit(e)}>
      {fields.map((field, index) => (
        <Row key={index}>
          <Col md={3} className="mb-2">
            <FloatingLabel
              controlId={`medicineName_${index}`}
              label="Medicine Name"
              className=""
              
            >
              <Form.Control
                type="text"
                name="medicineName"
                value={field.medicineName}
                onChange={(e) => handleFieldChange(index, e)}
                required
              />
            </FloatingLabel>
          </Col>
          <Col md={3} className="mb-2">
            <FloatingLabel
              controlId={`expiryDate_${index}`}
              label="Expiry Date"
              className=""
              
            >
              <Form.Control
                type="date"
                name="expiryDate"
                value={field.expiryDate}
                onChange={(e) => handleFieldChange(index, e)}
                required
              />
            </FloatingLabel>
          </Col>
          <Col md={3} className="mb-2">
            <FloatingLabel
              controlId={`stockQty_${index}`}
              label="Stock Qty"
              className=""             
            >
              <Form.Control
                type="text"
                name="stockQty"
                value={field.stockQty}
                onChange={(e) => handleFieldChange(index, e)}
                required
              />
            </FloatingLabel>
          </Col>
          <Col md={2} className="mb-2">
            <FloatingLabel
              controlId={`price_${index}`}
              label="Price"
              className=""
              
            >
              <Form.Control
                type="text"
                name="price"
                value={field.price}
                onChange={(e) => handleFieldChange(index, e)}
                required
              />
            </FloatingLabel>
          </Col>
          <Col md={1} className="mb-2">
            {index > 0 && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeField(index)}
              >
                <FaMinus />
              </button>
            )}
          </Col>
        </Row>
      ))}
      <Row>
        <Col>
          <button className="btn btn-danger btn-sm mt-2" onClick={addField}>
            <FaPlus />
          </button>
          
        </Col>
      </Row>
      <input type="submit" value="Submit" className="btn btn-secondary mt-2" />
      </form>
    </section>
  );
};

export default AddStock;
