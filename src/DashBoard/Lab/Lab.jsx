import React, { useEffect, useState } from "react";
import "../../Utility/Utility.css";
// import "./Medical.css";
import SearchBox from "../../Components/SearchBox/SearchBox";
import { Tab, Tabs, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import accessDenied from "../../Assets/Access_Denied.svg";
import Loader from "../../Components/Loader/Loader";
import { get } from "../../ApiCalls/ApiCalls";

const Lab = (props) => {
  const [medical, setMedicalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const recordPerPage = 10;
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      {
        get(`/allAppointments`, config).then((res) => setMedicalData(res.data));
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
      item.patient.mrnNo.toString().includes(search) ||
      item.patient.firstName
        .toLowerCase()
        .includes(
          search.toLowerCase() ||
            item.patient.lastName.toLowerCase().includes(search.toLowerCase())
        )
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
    <>
      {props.role.includes("Admin") || props.role.includes("Laboratory") ? (
        <section className="Lab">
          {medical.length > 0 ? (
            <>
              <SearchBox search={search} handleSearch={handleSearch} />
              <div className="medical">
                <div className="lab-pagination-nav mt-3">
                  <ul className="pagination">
                    <li className="page-item">
                      <a
                        href="#prePage"
                        className="page-link"
                        onClick={prePage}
                      >
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
                        onClick={AfterPage}
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                  <p>Total Records: {getTotalRecords()}</p>
                </div>
                <hr />
                <Tabs defaultActiveKey="pending" id="myTab">
                  <Tab eventKey="pending" title="Pending">
                    <div className="table-responsive">
                      <Table className="table">
                        <thead>
                          <tr>
                            <th
                              onClick={() =>
                                setSortOrder(
                                  sortOrder === "asc" ? "desc" : "asc"
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Mrn.No
                            </th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
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
                              <tr key={item.patient.mrnNo}>
                                <td>{item.patient.mrnNo}</td>
                                <td>
                                  {item.patient.firstName +
                                    " " +
                                    item.patient.lastName}
                                </td>
                                <td>{item.appointmentDate}</td>
                                <td>Pending</td>
                                <td>
                                  <Link to={`/LabTest/${item.id}`}>
                                    <input
                                      type="button"
                                      value="Open"
                                      className="btn btn-secondary"
                                    />
                                  </Link>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Tab>
                  <Tab eventKey="dispatched" title="Dispatched">
                    <div className="table-responsive">
                      <Table className="table">
                        <thead>
                          <tr>
                            <th
                              onClick={() =>
                                setSortOrder(
                                  sortOrder === "asc" ? "desc" : "asc"
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Mrn.No
                            </th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Status</th>
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
                              <tr key={item.patient.mrnNo}>
                                <td>{item.patient.mrnNo}</td>
                                <td>
                                  {item.patient.firstName +
                                    " " +
                                    item.patient.lastName}
                                </td>
                                <td>{item.appointmentDate}</td>
                                <td>Dispatched</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </>
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

export default Lab;
