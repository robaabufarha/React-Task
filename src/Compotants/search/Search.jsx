import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./search.css";

function Search({ placeholder, onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div className="search-wrapper py-3 d-flex align-items-center ">
      <div className="search-icon">
        <FaSearch />
      </div>
      <input
        type="search"
        className="search-input"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Search;
