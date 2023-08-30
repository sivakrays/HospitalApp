import React, { useEffect, useState } from "react";
import "./BillingView.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row, Card, Table } from "react-bootstrap";
import accessDenied from "../../Assets/Access_Denied.svg";

const BillingView = (props) => {
  const { id } = useParams();
  const [billingDetails, setBillingDetails] = useState([]);

  const fetchBillingDetails = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?id=${id}`
      );
      setBillingDetails(res.data);
    } catch (error) {
      console.error("Error fetching billing details:", error);
    }
  };

  useEffect(() => {
    fetchBillingDetails();
  }, []);

  const currentDateTime = new Date().toLocaleString();

  return (
    <>
      {props.role.includes("Admin") ? (
        <section className="container billingView mt">
          <Row className="billing__container">
            {billingDetails.map((data) => (
              <Col key={data.id} lg={6} className="mb-4">
                <Card className="billing-card shadow">
                  <Card.Img
                    variant="top"
                    src={data.url}
                    alt=""
                    className="rounded-circle mt-3 mx-auto"
                    style={{
                      width: "130px",
                      height: "130px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold">
                      Patient Information
                    </Card.Title>
                    <Card.Text>
                      <b>Mrn.No:</b> {data.id}
                      <br />
                      <b>Name:</b> {data.title}
                    </Card.Text>
                    <hr />
                    <Card.Title className="fw-bold">Billing Details</Card.Title>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Description</th>
                          <th>Amount (Rs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Medicines</td>
                          <td>
                            Paracetamol
                            <br />
                            Metformin
                            <br />
                            Cetirizine
                          </td>
                          <td>
                            80.00
                            <br />
                            30.00
                            <br />
                            50.00
                          </td>
                        </tr>
                        <tr>
                          <td>Lab Tests</td>
                          <td>
                            CT Scan
                            <br />
                            X-ray
                            <br />
                            ECG
                            <br />
                            Ultrasound
                          </td>
                          <td>
                            180.00
                            <br />
                            130.00
                            <br />
                            250.00
                            <br />
                            375.00
                          </td>
                        </tr>
                        <tr>
                          <td>Doctor Fee</td>
                          <td>Doctor Name</td>
                          <td>150.00</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Total Amount</b>
                          </td>
                          <td></td>
                          <td>
                            <b>1245.00 Rs</b>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    {/* <hr /> */}
                    {/* <Card.Text className="fw-bold">
                  Total Amount: 1245 Rs{" "}
                </Card.Text> */}
                  </Card.Body>
                  <button className="btn btn-secondary w-50 mx-auto mb-4">
                    Pay
                  </button>
                </Card>
              </Col>
            ))}
          </Row>
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

export default BillingView;
