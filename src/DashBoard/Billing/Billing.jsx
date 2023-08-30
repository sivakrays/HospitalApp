import React, { useEffect, useState } from "react";
import SearchBox from "../../Components/SearchBox/SearchBox";
import "./Billing.css";
import { Tab, Table, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import accessDenied from "../../Assets/Access_Denied.svg";

const Billing = (props) => {
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setBillingData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [search, setSearch] = useState("");

  const filteredBilling = billingData.filter(
    (item) =>
      (item.id && item.id.toString().includes(search)) ||
      (item.title && item.title.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination
  const recordPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const currentRecords = filteredBilling.slice(firstIndex, lastIndex);
  const nextPage = Math.ceil(filteredBilling.length / recordPerPage);

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

  const getTotalRecords = () => filteredBilling.length;

  const renderPageNumbersDropdown = () => {
    const pageNumbers = [];

    for (let i = 1; i <= nextPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleSearch = (e) => {
    const data = e.target.value;
    setSearch(data);
  };

  return (
    <>
      {props.role.includes("Admin") ? (
        <section className="billing ">
          <SearchBox search={search} handleSearch={handleSearch} />

          <div className="container billingDetails1">
            {/* <h2 className="text-uppercase">Billing Counter</h2> */}
            <div className="billing-pagination-nav mt-3">
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
                    onClick={AfterPage}
                  >
                    Next
                  </a>
                </li>
              </ul>
              <p>Total Records: {getTotalRecords()}</p>
            </div>
            <hr />

            <div className="billingDetails">
              <Tabs defaultActiveKey="pending" id="myTab">
                <Tab eventKey="pending" title="Pending">
                  <div className="table-responsive">
                    <Table className="table">
                      <thead>
                        <tr>
                          <th style={{ cursor: "pointer" }}>Mrn.No</th>
                          <th>Name</th>
                          <th>Billing Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRecords.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No records found.
                            </td>
                          </tr>
                        ) : (
                          currentRecords.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.title}</td>
                              <td>{new Date().toLocaleDateString("en-US")}</td>
                              <td>Pending</td>
                              <td>
                                <Link to={`/BillingView/${item.id}`}>
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
                          <th style={{ cursor: "pointer" }}>Mrn.No</th>
                          <th>Name</th>
                          <th>Billing Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRecords.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No records found.
                            </td>
                          </tr>
                        ) : (
                          currentRecords.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.title}</td>
                              <td>{new Date().toLocaleDateString("en-US")}</td>
                              <td>Completed</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Tab>
              </Tabs>
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

export default Billing;
