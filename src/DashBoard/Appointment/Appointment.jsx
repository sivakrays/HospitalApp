import React, { useEffect, useState } from "react";
import "../../Utility/Utility.css";
import SearchBox from "../../Components/SearchBox/SearchBox";
// import Nav from "../../Components/Nav/Nav";
import axios from "axios";
import { Link } from "react-router-dom";

const Patients = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 12;

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
      item.id.toString().includes(search) ||
      item.title.toLowerCase().includes(search.toLowerCase())
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
    <section className="patients">
      {/* <Nav /> */}
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
              <Link
                to={`/PatientAppointment/${item.id}`}
                className="text-dark"
                key={item.id}
              >
                <div className="patients__box shadow" key={item.id}>
                  <img src={item.thumbnailUrl} alt="patient" />
                  <div className="patient__details">
                    <p>
                      <b>ID:</b>
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
  );
};

export default Patients;
