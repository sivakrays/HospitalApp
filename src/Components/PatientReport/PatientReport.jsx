import React, { useEffect, useState } from "react";
import "./PatientReport.css";
import "../../Utility/Utility.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Accordion, Form } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import img from '../../Assets/f.png'

const PatientReport = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [loader, setLoader] = useState(false);
  // const [neededSection, setNeededSection] = useState([]);

  const patientDetails = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?id=${id}`
    );
    const data = await res.data;
    setDetails(data);
  };

  useEffect(() => {
    patientDetails();
  },[id]);

  // Handle the Pdf Needed Section

  const [neededSection, setNeededSection] = useState(['personal', 'visit', 'medical']);

  const handleSectionChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setNeededSection((prevSections) => [...prevSections, name]);
    } else {
      setNeededSection((prevSections) =>
        prevSections.filter((section) => section !== name)
      );
    }
  };

    // console.log(neededSection.includes('personal'))

  // Date and Time

  const currentDateTime = new Date().toLocaleString();

  // Download the Component like a Pdf

  const downloadReport = () => {
    const image = new Image();
    const capture = document.querySelector(".patient__report__view");
    setLoader(true);
    image.src = details[0].url;
    image.onload = () => {
      html2canvas(capture).then((canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const doc = new jsPDF("p", "mm", "a4");
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        setLoader(false);
        doc.save(`${details[0].title} Report`);
      });
      console.log(image)
    };
  };

  return (
    <section className="patient__report mt">
      <div
        className="report__download d-flex flex-column justify-centent-center align-items-end"
        style={{ position: "sticky", top: 50, padding: "20px", zIndex:'101' }}
      >
        <button
          className="btn btn-info"
          onClick={downloadReport}
          disabled={!(loader === false)}
        >
          {loader ? <span>Downloading</span> : <span>Download</span>}
        </button>
        <div className="check__box">
        <Form.Check
            type="checkbox"
            label="Personal"
            name="personal"
            style={{ marginRight: '10px' }}
            checked={neededSection.includes('personal')}
            onChange={handleSectionChange}
          />
          <Form.Check
            type="checkbox"
            label="Visit"
            name="visit"
            style={{ marginRight: '10px' }}
            checked={neededSection.includes('visit')}
            onChange={handleSectionChange}
          />
          <Form.Check
            type="checkbox"
            label="Medical"
            name="medical"
            style={{ marginRight: '10px' }}
            checked={neededSection.includes('medical')}
            onChange={handleSectionChange}
          />
        </div>
      </div>

      <div className="patient__report__view">

        {neededSection.includes('personal') === true ?
        <div className="patient__details">
          <div className="dateTime d-flex flex-column justify-centent-center align-items-end">
            {currentDateTime}
          </div>
          <div className="patient__details__box  container">
            <p className="mt-3">Personal Details</p>
            <hr />
            {details &&
              details.map((item) => {
                return (
                  <div
                    className="detail__box1 d-flex flex-column justify-centent-center p-4"
                    key={item.id}
                  >
                    <div className="profile__box">
                      <div className="profile  d-flex flex-column justify-centent-center align-items-center">
                        <img src={item.url} alt="patient" className=" mb-4" />
                        <p>
                          <b>Mrn.No</b>: {item.id}
                        </p>
                      </div>
                      <Row className="mt-3">
                        <Col md={4}>
                          <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Personal Details
                              </Accordion.Header>
                              <Accordion.Body>
                                <p>
                                  <b>Name</b>: {item.title}
                                </p>
                                <p>
                                  <b>Gender</b>: Male
                                </p>
                                <p>
                                  <b>Date Of Birth</b> : 01/01/1845
                                </p>
                                <p>
                                  <b>Email:</b> email@gmail.com
                                </p>
                                <p>
                                  <b>Weight</b>: 66
                                </p>
                                <p>
                                  <b>Height</b>: 160cm
                                </p>
                                <p>
                                  <b>Address</b>: 21,abc Street , tanilNadu
                                </p>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Col>
                        <Col md={4}>
                          <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Gurdian Details
                              </Accordion.Header>
                              <Accordion.Body>
                                <p>
                                  <b>Gurdian Name</b>: guardian
                                </p>
                                <p>
                                  <b>Gurdian Relation</b>: Uncle
                                </p>
                                <p>
                                  <b>Gurdian Contact</b>: 9897456321
                                </p>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Col>
                        <Col md={4}>
                          <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Emergency Details
                              </Accordion.Header>
                              <Accordion.Body>
                                <p>
                                  <b>Emergency Name</b>: Murugan
                                </p>
                                <p>
                                  <b>Emergency Relation</b>: Uncle
                                </p>
                                <p>
                                  <b>Emergency Contact</b>: 9897456321
                                </p>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Col>
                      </Row>
                    </div>
                  </div>
                );
              })}
          </div>
        </div> : null}

        {neededSection.includes('visit') === true ?
        <div className="visiting__details">
          <div className="patient__details__box  container">
            <p className="mt-3">Visiting Details</p>
            <hr />
            {details &&
              details.map((item) => {
                return (
                  <div
                    className="detail__box1 d-flex flex-column justify-centent-center p-4"
                    key={item.id}
                  >
                    <div className="profile__box ">
                      <Row>
                        <Col md={6}>
                          <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Medicine</Accordion.Header>
                              <Accordion.Body>
                                <p>
                                  <b>Name</b>: {item.title}
                                </p>
                                <p>
                                  <b>Gender</b>: Male
                                </p>
                                <p>
                                  <b>Date Of Birth</b> : 01/01/1845
                                </p>
                                <p>
                                  <b>Email:</b> email@gmail.com
                                </p>
                                <p>
                                  <b>Weight</b>: 66
                                </p>
                                <p>
                                  <b>Height</b>: 160cm
                                </p>
                                <p>
                                  <b>Address</b>: 21,abc Street , tanilNadu
                                </p>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Col>
                        <Col md={6}>
                          <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Lab Tests</Accordion.Header>
                              <Accordion.Body>
                                <p>
                                  <b>Name</b>: {item.title}
                                </p>
                                <p>
                                  <b>Gender</b>: Male
                                </p>
                                <p>
                                  <b>Date Of Birth</b> : 01/01/1845
                                </p>
                                <p>
                                  <b>Email:</b> email@gmail.com
                                </p>
                                <p>
                                  <b>Weight</b>: 66
                                </p>
                                <p>
                                  <b>Height</b>: 160cm
                                </p>
                                <p>
                                  <b>Address</b>: 21,abc Street , tanilNadu
                                </p>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Col>
                      </Row>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>: null}

        {neededSection.includes('medical') === true ?
        <div className="medical__details">
          <div className="patient__details__box  container">
            <p className="mt-3">Medical Details</p>
            <hr />
            {details &&
              details.map((item) => {
                return (
                  <div
                    className="detail__box1 d-flex flex-column justify-centent-center p-4"
                    key={item.id}
                  >
                    <div className="profile__box ">
                      <Row>
                        <Col md={6}>
                          <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Medicine</Accordion.Header>
                              <Accordion.Body>
                                <p>
                                  <b>Name</b>: {item.title}
                                </p>
                                <p>
                                  <b>Gender</b>: Male
                                </p>
                                <p>
                                  <b>Date Of Birth</b> : 01/01/1845
                                </p>
                                <p>
                                  <b>Email:</b> email@gmail.com
                                </p>
                                <p>
                                  <b>Weight</b>: 66
                                </p>
                                <p>
                                  <b>Height</b>: 160cm
                                </p>
                                <p>
                                  <b>Address</b>: 21,abc Street , tanilNadu
                                </p>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Col>
                        <Col md={6}>
                          <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Lab Tests</Accordion.Header>
                              <Accordion.Body>
                                <p>
                                  <b>Name</b>: {item.title}
                                </p>
                                <p>
                                  <b>Gender</b>: Male
                                </p>
                                <p>
                                  <b>Date Of Birth</b> : 01/01/1845
                                </p>
                                <p>
                                  <b>Email:</b> email@gmail.com
                                </p>
                                <p>
                                  <b>Weight</b>: 66
                                </p>
                                <p>
                                  <b>Height</b>: 160cm
                                </p>
                                <p>
                                  <b>Address</b>: 21,abc Street , tanilNadu
                                </p>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Col>
                      </Row>
                    </div>
                  </div>
                );
              })}
          </div>
          </div>: null}
      </div>
    </section>
  );
};

export default PatientReport;
