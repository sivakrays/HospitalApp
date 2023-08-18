import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";
import "./Stock.css";
import axios from "axios";

const Stock = () => {
  const [stockData, setStockData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setStockData(res.data);
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
    const data = e.target.value;
    setSearch(data);
  };

  const filteredStock = stockData.filter(
    (item) =>
      item.id.toString().includes(search) ||
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination

  const recordPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const currentRecords = filteredStock.slice(firstIndex, lastIndex);
  const nextPage = Math.ceil(filteredStock.length / recordPerPage);

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

  const getTotalRecords = () => filteredStock.length;

  const renderPageNumbersDropdown = () => {
    const pageNumbers = [];

    for (let i = 1; i <= nextPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <section className="stock container">
      <SearchBox search={search} handleSearch={handleSearch} />

      <div className="addStockBtn d-flex flex-row justify-content-between">
        <div className="stock-pagination-nav mt-3">
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
        <div className="AddBtn">
          <Link
            className="addStockBtn d-flex justify-content-end"
            to="/addStock"
          >
            <button className="btn btn-danger">Add Stock</button>
          </Link>
        </div>
      </div>

        <hr />
      <div className="container mt-4">
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Medicine Name</th>
              <th>Expiry Date</th>
              <th>Stock Qty</th>
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
                  <td>90</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default Stock;
