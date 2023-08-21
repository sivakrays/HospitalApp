import React from "react";
import "./DataSearch.css";
import { Col, Row } from "react-bootstrap";

const DataSearch = ({ search, handleSearch }) => {
  return (
    <>
      <form className="list__search__form" onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col>
            <input
              type="search"
              name="search"
              className="list__search form-control"
              placeholder="Search the  Name"
              value={search}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </form>
    </>
  );
};

export default DataSearch;
