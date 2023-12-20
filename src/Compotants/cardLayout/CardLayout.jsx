import React, { useEffect, useState, useContext } from "react";
import Card from "../card/Card";
import "./cardLayout.css";
import { useCustomState, useCustomDispatch } from "../../Provider";

function CardLayout({ searchTerm, regionFilter }) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { customFavorites } = useCustomState();
  const dispatch = useCustomDispatch();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const fetchAllData = () => {
    setLoading(true);
    setErrorMessage("");

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
    setErrorMessage("");

    const apiUrl = `https://restcountries.com/v3.1/name/${term}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);

        const filteredData = data.filter((country) => {
          if (!regionFilter || regionFilter === "allRegions") {
            return true;
          } else if (regionFilter === "favourites") {
            setFilteredCountries(customFavorites);
          } else {
            return country.region === regionFilter;
          }
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
      searchCountries(searchTerm, regionFilter);
    }
  }, [searchTerm, regionFilter]);

  useEffect(() => {
    if (Array.isArray(countries)) {
      if (regionFilter === "allRegions") {
        setFilteredCountries(countries);
      } else if (regionFilter === "favourites") {
        setFilteredCountries(customFavorites);
      } else {
        const filtered = countries.filter(
          (country) => country.region === regionFilter
        );
        setFilteredCountries(filtered);
      }
    }
  }, [regionFilter, countries, customFavorites]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row row-cols-xxl-3 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 gx-5 gy-5 m-0 pt-0">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {filteredCountries.length > 0 &&
        filteredCountries.map((country) => {
          const isFavorite = customFavorites.some(
            (favCountry) => favCountry.name.common === country.name.common
          );
          return (
            <Card
              key={country.name.common}
              country={country}
              isFavorite={isFavorite}
            />
          );
        })}
    </div>
  );
}

export default CardLayout;
