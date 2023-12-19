import React, { useState, useEffect } from "react";
import Card from "../card/Card";
import "./cardLayout.css";

function CardLayout({ searchTerm, regionFilter }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAllData = () => {
    setLoading(true);
    setErrorMessage(""); // Clear error message before fetching data

    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch(function (error) {
        setErrorMessage("Error fetching countries");
        console.error(error);
        setLoading(false);
      });
  };

  const searchCountries = (term, regionFilter) => {
    setLoading(true);
    setErrorMessage(""); // Clear error message before searching

    const apiUrl = `https://restcountries.com/v3.1/name/${term}`
     

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);

        const filteredData = data.filter((country) => {
          if (!regionFilter || regionFilter === "allRegions") {
            return true;
          }
          return country.region === regionFilter;
        });

        setFilteredCountries(filteredData);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setFilteredCountries([]);
        setErrorMessage("Country not found");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      console.log(searchTerm)
      searchCountries(searchTerm, regionFilter);
    }
  }, [searchTerm, regionFilter]);

  useEffect(() => {
    if (Array.isArray(countries)) {
      if (regionFilter === "allRegions") {
        setFilteredCountries(countries);
      } else {
        const filtered = countries.filter((country) => country.region === regionFilter);
        setFilteredCountries(filtered);
      }
    }
  }, [regionFilter, countries]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {filteredCountries.length > 0 && (
        <div className="row row-cols-xxl-3 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 gx-5 gy-5 m-0 pt-0">
          {filteredCountries.map((country) => (
            <Card
              key={country.cca3}
              id={country.cca3}
              src={country.flags.svg}
              alt={country.flags.alt}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital && country.capital[0]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardLayout;
