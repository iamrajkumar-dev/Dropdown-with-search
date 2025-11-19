import React from "react";

const CountriesList = ({ allCountries, selectOption }) => {
  return (
    <div className="country-list">
      {allCountries.length === 0 ? (
        <p>No countries exists</p>
      ) : (
        allCountries.map((country) => (
          <div
            className="list"
            key={country.code}
            onClick={() => selectOption(country)}
          >
            {country.name}
          </div>
        ))
      )}
    </div>
  );
};

export default CountriesList;
