import React, { useEffect, useState, useRef } from "react";
import CountriesList from "./CountriesList";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const SearchDropdown = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState([]);

  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/independent?status=true"
        );
        if (!response.ok) throw new Error("Fetching failed");

        const data = await response.json();
        const countryData = data
          .map((d) => ({
            name: d.name.common,
            code: d.cca2,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setAllCountries(countryData);
        setVisibleCountries(countryData);
        setError(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    isOpen && searchRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setVisibleCountries(allCountries);
        setInput(selected);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen, allCountries, selected]);

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);

    if (!isOpen) {
      setInput(selected);
      setVisibleCountries(allCountries);
    }
  };

  const searchFilter = (e) => {
    const searchCountry = e.target.value.toLowerCase();
    setInput(searchCountry);

    const filteredList = allCountries.filter((country) =>
      country.name.toLowerCase().includes(searchCountry)
    );
    setVisibleCountries(filteredList);
  };
  const handleInput = (e) => {
    setInput(e.target.value);
    searchFilter(e);
  };

  const selectOption = (name) => {
    setInput(name.name);
    setSelected(name.name);
    setIsOpen(false);
  };

  return (
    <div>
      <h2>Dropdown with search</h2>

      <div className="dropdown-wrapper" ref={dropdownRef}>
        <div className="title" onClick={handleDropdownToggle}>
          <span>{selected || "Select Your Country"}</span>
          <FiChevronDown className="dropdown-icon" />
        </div>
        <div className="hidden-content">
          {isOpen && (
            <div className="search">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                ref={searchRef}
                value={input}
                onChange={handleInput}
              />
            </div>
          )}
          {isOpen && (
            <CountriesList
              allCountries={visibleCountries}
              selectOption={selectOption}
            />
          )}
        </div>
      </div>
      {isLoading && <p>Loading....</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default SearchDropdown;
