import React, { useEffect, useState } from "react";
import "../../Utility/Utility.css";
import "./UpdateComponent.css";
import SearchBox from "../SearchBox/SearchBox";
import { Button, Modal, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { get } from "../../ApiCalls/ApiCalls";
import DeleteModal from "../DeleteModal/DeleteModal";

const Lab = (props) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const recordPerPage = 10;
  const [sortOrder, setSortOrder] = useState("asc");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [patientFields, setPatientFields] = useState(false);
  const [patientData, setPatientData] = useState({});
  const [staffFields, setStaffFields] = useState(false);
  const [staffData, setStaffData] = useState({});

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (props.path === "StaffsUpdate") {
      setStaffFields(true);
    } else if (props.path === "PatientUpdate") {
      setPatientFields(true);
    }
  }, [props.path]);

  const handleShow = (id) => {
    setShow(true);
    console.log(id);

    if (staffFields === true) {
      get(`/userId?userId=${id}`, config).then((res) => {
        setStaffData(res.data);
      });
    } else if (patientFields === true) {
      get(`/mrnNo?mrnNo=${id}`, config).then((res) => {
        setPatientData(res.data);
      });
    }
  };

  useEffect(() => {
    if (props.path === "StaffsUpdate") {
      const fetchData1 = async () => {
        get(`/getUser`, config)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err));
      };
      fetchData1();
    } else if (props.path === "PatientUpdate") {
      const fetchData2 = async () => {
        get("/patients", config)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err));
      };
      fetchData2();
    } else if (props.path === "AppointmentUpdate") {
      const fetchData3 = async () => {
        get(`/appointmentById`, config)
          .then((res) => {
            setData(res.data);
          });
      };

      fetchData3();
    }
  }, []);

  // Search Based on the Search Box Input

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSearch = (e) => {
    const data = e.target.value;
    setSearch(data);
  };

  const filteredMedical = data.filter((item) =>
    props.path === "StaffsUpdate"
      ? (item && item.userId && item.userId.toString().includes(search)) ||
        (item.userName &&
          item.userName.toString().toLowerCase().includes(search.toLowerCase()))
      : (item && item.mrnNo && item.mrnNo.toString().includes(search)) ||
        (item.patientName &&
          item.patientName
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()))
  );

  const appointmentFilter = data.filter(
    (data) =>
      (props.path === "AppointmentUpdate" &&
        data &&
        data.appointmentId &&
        data.appointmentId.toString().includes(search)) ||
      (data &&
        data.patientName &&
        data.patientName
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()))
  );

  // Page Pagination

  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const currentRecords =
    props.path === "AppointmentUpdate"
      ? appointmentFilter.slice(firstIndex, lastIndex)
      : filteredMedical.slice(firstIndex, lastIndex);
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
        <div className="table-responsive">
          <center>
            <Table className="table w-75" striped bordered hover>
              <thead>
                <tr>
                  <th
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {props.path === "AppointmentUpdate"
                      ? "AppointmentId"
                      : "Mrn.No"}
                  </th>
                  <th>Name</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedRecords.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  sortedRecords.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.mrnNo} {item.userId} {item.appointmentId}
                      </td>
                      <td>
                        {item.patientName} {item.userName}
                      </td>
                      <td>
                        <div className="d-flex actionBtn">
                          <Link
                            to={`/${props.path}/${item.mrnNo || item.userId || item.appointmentId}`}
                            className="btn btn-primary"
                          >
                            <span className="small-screen">Update</span>
                            <FaEdit />
                          </Link>
                          <div
                            className="btn btn-danger mx-lg-3 "
                            onClick={() =>
                              handleShow(item.mrnNo || item.userId)
                            }
                          >
                            <span className="small-screen">Delete</span>
                            <FaTrashCan />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </center>
        </div>
      </div>
      <DeleteModal
        show={show}
        handleClose={handleClose}
        staffData={staffData}
        patientData={patientData}
        id={props.path == "StaffsUpdate" ? staffData.userId : patientData.mrnNo}
        patientFields={patientFields}
        staffFields={staffFields}
      />
    </section>
  );
};

export default Lab;
