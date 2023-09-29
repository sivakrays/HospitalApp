import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBox from "../../Components/SearchBox/SearchBox";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import "./FilterPatients.css";
import accessDenied from "../../Assets/Access_Denied.svg";
import { get } from "../../ApiCalls/ApiCalls";
import Loader from "../../Components/Loader/Loader";
import CardView from "../../Components/CardView/CardView";

const FilterPatients = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState("");
  const [ageError, setageError] = useState("");

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      {
        get(`/allPatient`, config).then((res) => setData(res.data));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page number when search changes
  }, [search]);

  const handleSearch = (e) => {
    const searchData = e.target.value;
    setSearch(searchData);
  };

  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter data based on search input for ID and name
  const filteredData = data.filter(
    (item) =>
      item.mrnNo.toString().includes(search) ||
      item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName.toLowerCase().includes(search.toLowerCase())
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const changeCurrentPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const afterPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbersDropdown = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const getTotalRecords = () => {
    return filteredData.length;
  };

  const handleageValidation = (e) => {
    setAge(e.target.value);
    if (age < 0) {
      setageError("Please Provide  proper Age");
    } else if (age === "") {
      setageError("");
    }
  };

  // Api Calls
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (age && age !== "") {
      get(`filter?age=${age}`, config)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    } else if (gender && gender !== "") {
      get(`filter?gender=${gender}`, config)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [age && age, gender && gender]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleFilter();
  };

  return (
    <>
      {props.role ? (
        <section className="patients">
          {data.length > 0 ? (
            <div className="patient__search">
              <SearchBox search={search} handleSearch={handleSearch} />

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="filter  mt-5">
                  <Container>
                    <Row>
                      <Col md={2}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Date"
                          className="mb-3"
                        >
                          <Form.Control
                            type="date"
                            placeholder="date"
                            name="date"
                            className="date__field"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={2}>
                        <FloatingLabel controlId="gender" label="Gender">
                          <Form.Select
                            aria-label="Floating label select example"
                            name="gender"
                            required
                            className="mb-2"
                            onChange={(e) => setGender(e.target.value)}
                          >
                            <option value="">Select The Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select a Gender.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col md={2}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Age"
                          className="mb-3"
                        >
                          <Form.Control
                            type="number"
                            placeholder="FirstName"
                            name="firstName"
                            required
                            onChange={(e) => handleageValidation(e)}
                            min="1"
                            max="120"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={2}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="State"
                          className="mb-3"
                        >
                          <Form.Control
                            type="search"
                            placeholder="FirstName"
                            name="firstName"
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={2}>
                        <Form.Check
                          type="checkbox"
                          label="Pregnancy"
                          name="pregnancy"
                          style={{ marginRight: "10px", marginTop: "1rem" }}
                        />
                      </Col>
                    </Row>
                  </Container>
                </div>
              </form>
              {ageError && (
                <p className="text-danger" style={{ marginLeft: "5rem" }}>
                  {ageError}
                </p>
              )}

              <div className="pagination-nav ">
                <ul className="pagination">
                  <li className="page-item">
                    <a href="#prePage" className="page-link" onClick={prePage}>
                      Pre
                    </a>
                  </li>
                  <li className="page-item-number">
                    <select
                      className="form-select"
                      value={currentPage}
                      onChange={(e) =>
                        changeCurrentPage(parseInt(e.target.value))
                      }
                    >
                      {renderPageNumbersDropdown().map((pageNum) => (
                        <option key={pageNum} value={pageNum}>
                          {pageNum}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="page-item">
                    <a
                      href="#nextPage"
                      className="page-link btn"
                      onClick={afterPage}
                    >
                      Next
                    </a>
                  </li>
                </ul>
                <p>Total Records: {getTotalRecords()}</p>
              </div>

              <div className="patients__view g-3">
                {currentItems.length === 0
                  ? "No records found."
                  : currentItems.map((item) => {
                      return (
                        <Link className="text-dark" key={item.mrnNo}>
                          <CardView
                            patientName={item.firstName + " " + item.lastName}
                            mrnNo={item.mrnNo}
                            photo={item.photo}
                          />
                        </Link>
                      );
                    })}
              </div>
            </div>
          ) : (
            <Loader />
          )}
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

export default FilterPatients;
