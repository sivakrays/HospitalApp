import React, { useEffect, useState } from "react";
import "../../../Utility/Utility.css";
import SearchBox from "../../../Components/SearchBox/SearchBox";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Lab = () => {
  const [medical, setMedicalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const recordPerPage = 10;
  const [sortOrder, setSortOrder] = useState("asc");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setMedicalData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Search Based on the Search Box Input

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSearch = (e) => {
    const data = e.target.value;
    setSearch(data);
  };

  const filteredMedical = medical.filter(
    (item) =>
      item.id.toString().includes(search) ||
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Page Pagination

  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const currentRecords = filteredMedical.slice(firstIndex, lastIndex);
  const nextPage = Math.ceil(filteredMedical.length / recordPerPage);

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const AfterPage = () => {
    if (currentPage < nextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getTotalRecords = () => filteredMedical.length;

  const renderPageNumbersDropdown = () => {
    const pageNumbers = [];

    for (let i = 1; i <= nextPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Sort Based on the Mrn.Number

  const sortedRecords = [...currentRecords].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  return (
    <section className="Lab">
      <SearchBox search={search} handleSearch={handleSearch} />

      <div className="medical">
        <div className="lab-pagination-nav mt-3">
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
              <a href="#nextPage" className="page-link btn" onClick={AfterPage}>
                Next
              </a>
            </li>
          </ul>
          <p>Total Records: {getTotalRecords()}</p>
        </div>
        <hr />
        <div className="table-responsive">
          <Table className="table">
            <thead>
              <tr>
                <th
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  style={{ cursor: "pointer" }}
                >
                  Mrn.No
                </th>
                <th>Name</th>

                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No records found.
                  </td>
                </tr>
              ) : (
                sortedRecords.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>
                      <Link to={`/StaffsUpdate/${item.id}`}>
                        <input
                          type="button"
                          value="Update"
                          className="btn btn-primary"
                        />
                      </Link>
                      <input
                        type="button"
                        value="Delete"
                        className="btn btn-danger mx-3"
                        onClick={handleShow}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>You are trying to delete this user.</Modal.Body>
          <Modal.Body>ID: Name:</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Yes
            </Button>
            <Button variant="primary" onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
};

export default Lab;
