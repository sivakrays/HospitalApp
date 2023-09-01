import React, { useEffect, useState } from "react";
import "../../Utility/Utility.css";
import SearchBox from "../../Components/SearchBox/SearchBox";
import axios from "axios";
import { Link } from "react-router-dom";
import accessDenied from "../../Assets/Access_Denied.svg";
import { get } from "../../ApiCalls/ApiCalls";
import Loader from '../../Components/Loader/Loader'

const Patients = (props) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      {
        get(`/patients`, config).then((res) => setData(res.data));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSearch = (e) => {
    const searchData = e.target.value;
    setSearch(searchData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter data based on search input ID and name

  const filteredData = data.filter(
    (item) =>
      item.mrnNo.toString().includes(search) ||
      item.PatientName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination for Patients view

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

  return (
    <>
      {props.role.includes("Admin") ? (
        <section className="patients">
          {data.length > 0 ? (
            <div className="patient__search">
              <SearchBox search={search} handleSearch={handleSearch} />

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

              {/* <div class="container mt-5">
              <div class="card" style={{ width: "18rem" }}>
                <img
                  src={data.photo}
                  class="card-img-top"
                  alt="Profile Picture"
                />
                <div class="card-body">
                  <h5 class="card-title">John Doe</h5>
                  <p class="card-text">ID: 1234567890</p>
                  <a href="#" class="btn btn-primary">
                    View Profile
                  </a>
                </div>
              </div>
            </div> */}

              <div className="patients__view g-3">
                {currentItems.map((item) => {
                  return (
                    <Link
                      to={`/PatientAppointment/${item.mrnNo}`}
                      className="text-dark"
                      key={item.mrnNo}
                    >
                      {/* <div className="container mt-5">
                      <div className="card" style={{ width: "18rem" }}>
                        <img
                          src={item.photo}
                          className="card-img-top"
                          alt="Profile Picture"
                        />
                        <div className="card-body">
                          <h5 className="card-title ">Name: <span className="text-uppercase">{item.PatientName}</span></h5>
                          <p className="card-text">Mrn.No: {item.mrnNo}</p>
                          <a href="#" className="btn btn-primary">
                            View Profile
                          </a>
                        </div>
                      </div>
                    </div> */}
                      {/* <div class="profile-card" key={item.mrnNo}>
                      <img
                        src={item.photo}
                        alt="Profile Picture"
                        class="profile-picture"
                      />
                      <p class="number">Mrn.No:{item.mrnNo}</p>
                      <h1 class="name">Name:{item.PatientName}</h1>
                      <button class="view-button">View Profile</button>
                    </div> */}

                      <div className="patients__box shadow" key={item.mrnNo}>
                        <img src={item.photo} alt="patient" />
                        <div className="patient__details">
                          <p>
                            <b>ID:</b>
                            {item.mrnNo}
                          </p>
                          <p>
                            <b>Name:</b>
                            {item.PatientName}
                          </p>
                          <div className="btn btn-primary">View Patient</div>
                        </div>
                      </div>
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

export default Patients;
