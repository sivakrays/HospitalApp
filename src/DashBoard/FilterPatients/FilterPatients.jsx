import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBox from "../../Components/SearchBox/SearchBox";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import "./FilterPatients.css";
import accessDenied from "../../Assets/Access_Denied.svg";

const FilterPatients = (props) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [age, setAge] = useState("");
  const [ageError, setageError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      item.id.toString().includes(search) ||
      item.title.toLowerCase().includes(search.toLowerCase())
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

  return (
    <>
      {props.role.includes("Admin") ? (
    <section className="patients">
      <div className="patient__search">
        <SearchBox search={search} handleSearch={handleSearch} />

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
                onChange={(e) => changeCurrentPage(parseInt(e.target.value))}
              >
                {renderPageNumbersDropdown().map((pageNum) => (
                  <option key={pageNum} value={pageNum}>
                    {pageNum}
                  </option>
                ))}
              </select>
            </li>
            <li className="page-item">
              <a href="#nextPage" className="page-link btn" onClick={afterPage}>
                Next
              </a>
            </li>
          </ul>
          <p>Total Records: {getTotalRecords()}</p>
        </div>

        <div className="patients__view g-3">
          {currentItems.map((item) => {
            return (
              // to={`/PatientView/${item.id}`}
              <Link className="text-dark" key={item.id}>
                <div className="patients__box shadow" key={item.id}>
                  <img src={item.thumbnailUrl} alt="patient" />
                  <div className="patient__details">
                    <p>
                      <b>Mrn.No:</b>
                      {item.id}
                    </p>
                    <p>
                      <b>Name:</b>
                      {item.title}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
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
