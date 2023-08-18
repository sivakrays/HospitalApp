import React from 'react';
import './SearchBox.css';
import '../../Utility/Utility.css';

const SearchBox = ({ search, handleSearch }) => {
  return (
    <form className="form-search" onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        name="search"
        className='search'
        value={search}
        onChange={handleSearch}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBox;
