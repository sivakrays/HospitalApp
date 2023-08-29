import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Admin.css";

const AdminPanel = () => {
  const adminData = [
    {
      title: "Patient Management",
      text1: "Manage patient information and records.",
      text2: "Total Patients Records: 1200",
      path: "/UpdatePatient",
    },
    {
      title: "Appointment Scheduling",
      text1: "Schedule and manage appointments.",
      text2: "Todays Appointments: 150",
      path: "/changeAppointment",
    },
    {
      title: "Staff Management",
      text1: "Manage hospital staff and their roles.",
      text2: "Total Staffs Records: 34",
      path: "/UpdateStaffs",
    },

    {
      title: "Filter the Patient Details",
      text1: "Manage hospital staff and their roles.",
      text2: "Total Patients Records: 1200",
      path: "/UpdateStaffs",
    },
    {
      title: "Stock Management",
      text1: "Manage patient information and records.",
      text2: "Total Medicine Stock: 1200",
      path: "/UpdatePatient",
    },
    {
      title: "Doctor perscription Management",
      text1: "Manage patient information and records.",
      text2: "Total Patients Records: 1200",
      path: "/UpdatePatient",
    },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center">Admin Panel</h2>
      <div className="d-flex align-items-center justify-content-center card-grid flex-wrap">
        {adminData &&
          adminData.map((item, index) => {
            return (
              <div>
                <dic className="mb-4">
                  <Card className="card">
                    <Card.Body className="cardBody">
                      <Card.Title className="cardTxt">{item.title}</Card.Title>
                      <Card.Text className="cardTxt">{item.text1}</Card.Text>
                      <Card.Text className="cardTxt">{item.text2}</Card.Text>
                      <Link to={item.path}>
                        <Button variant="primary">Update</Button>
                      </Link>
                      <Link to={item.path}>
                        <Button variant="danger" className="mx-3">
                          Delete
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </dic>
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default AdminPanel;
