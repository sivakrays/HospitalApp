import React, { useState } from 'react'
import './Pagination.css'

const Pagination = ({ recordPerPage}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [medical, setMedicalData] = useState([]);

  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const currentRecords = medical.slice(firstIndex, lastIndex);
  const nextPage = Math.ceil(medical.length / recordPerPage);

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

  const getTotalRecords = () => medical.length;

  const renderPageNumbersDropdown = () => {
    const pageNumbers = [];

    for (let i = 1; i <= nextPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="lab-pagination-nav">
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Pre
              </a>
            </li>
            <li className="page-item-number">
              <select className="form-select" value={currentPage} onChange={(e) => changeCurrentPage(parseInt(e.target.value))}>
                {renderPageNumbersDropdown().map((pageNum) => (
                  <option key={pageNum} value={pageNum}>{pageNum}</option>
                ))}
              </select>
            </li>
            <li className="page-item">
              <a href="#" className="page-link btn" onClick={AfterPage}>
                Next
              </a>
            </li>
          </ul>
          <p>Total Records: {getTotalRecords()}</p>
        </div>
  )
}

export default Pagination
