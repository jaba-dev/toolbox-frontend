import React, { useState, useEffect, useRef, useContext } from "react";
import { ReactComponent as FaSearch } from "../../assets/icons/search.svg";
import { ReactComponent as XMark } from "../../assets/icons/xmark.svg";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

function SearchBar({ data }) {
  const { setPrevSearchValue } = useContext(AppContext);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (searchTerm === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  useEffect(() => {
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (searchTerm === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  }, [searchTerm]);

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.length > 0) {
        navigate(`/search-page?query=${searchTerm.toLowerCase()}`);
        setPrevSearchValue(searchTerm);
        setSearchTerm("");
        setFilterData([]);
        inputRef.current.blur();
      }
    }
  };

  const clearInput = () => {
    setSearchTerm("");
    setFilterData([]);
    inputRef.current.blur();
  };

  return (
    <div className="search">
      <div className="search-input">
        <input
          ref={inputRef}
          value={searchTerm}
          type="text"
          placeholder="what are you looking for?"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <button>
          {/* <FaSearch /> */}
          {searchTerm.length > 0 ? (
            <XMark onClick={clearInput} />
          ) : (
            <FaSearch />
          )}
        </button>
      </div>
      {filterData.length > 0 && (
        <div className="data-result">
          {filterData.map((value, index) => {
            return (
              <div key={index}>
                <Link to={`search-page?query=${searchTerm.toLowerCase()}`}>
                  {value.name}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
