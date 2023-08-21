import React, { useEffect, useState } from "react";
import "./MedicinePrescription.css";
import "../../Utility/Utility.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";

const MedicinePrescription = () => {
  const { id } = useParams();
  const [userdata, setUserData] = useState([]);

  const fetchUserData = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?id=${id}`
    );
    const data = res.data;
    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  // Handle the Form Submition

  const handleSubmit  = (e) =>{
    e.preventDefault()
  }

  return (
    <section className="medicinePrescription mt">
      <form className="labTest__Box  p-3" onSubmit={(e) => handleSubmit(e)}>
        <h3 className="text-center">Medicine Precription</h3>

        <div className="patient__details text-center">
          <Row>
            {userdata.map((data) => (
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
        <Row>
          <Col md={3} className="mb-2">
            <FloatingLabel
              controlId={`medicine`}
              label="Medicine Name"
              className=""
              
            >
              <Form.Control type="text" placeholder="Medicine" required disabled/>
            </FloatingLabel>
          </Col>
          <Col md={3} className="mb-2">
            <FloatingLabel
              controlId={`duration`}
              label="Duration"
              className=""
              
            >
              <Form.Control type="text" placeholder="Duration" required/>
            </FloatingLabel>
          </Col>
          <Col md={3} className="mb-2">
            <FloatingLabel
              controlId={`interval`}
              label="Interval"
              className=""
              
            >
              <Form.Control type="text" placeholder="Interval" required disabled/>
            </FloatingLabel>
          </Col>
          <Col md={3} className="mb-2">
            <FloatingLabel
              controlId={`Comments`}
              label="Comments"
              className=""
              
            >
              <Form.Control type="text" placeholder="Comments" required disabled/>
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col className="w-100 d-flex justify-content-center align-item-center">
            <input
              type="submit"
              value="update"
              className="btn btn-danger mt-2 px-4"
            />
            <Link to={`/billing`}>
            <input
              type="submit"
              value="Submit"
              className="btn btn-success mt-2 px-4"
              style={{marginLeft:'20px'}}
            />
            </Link>
          </Col>
         
        </Row>
      </form>
    </section>
  );
};

export default MedicinePrescription;
