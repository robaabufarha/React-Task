import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import "./cardLayout.css";
import { useCustomState } from "../../Provider";
import { fetchAllCountries, searchCountriesByName } from "../../services/api";

function CardLayout({ searchTerm, regionFilter }) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { customFavorites } = useCustomState();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const Countries = (term, regionFilter) => {
    setLoading(true);
    setErrorMessage("");
    const searchPromise = term.trim() === "" ? fetchAllCountries() : searchCountriesByName(term);
    console.log(term,"card")
    
    searchPromise
      .then((data) => {
        setCountries(data);
       console.log(data);
        const filteredData = data.filter((country) => {
          if (regionFilter === "allRegions") {
            return true;
          } else if (regionFilter === "favourites") {
            setCountries(customFavorites);
          } else {
            return country.region === regionFilter;
          }
        });
  
        setFilteredCountries(filteredData);
        setLoading(false);
      })
      .catch(() => {
        setFilteredCountries([]);
        setErrorMessage(term.trim() === "" ? "Error fetching countries" : "Country not found");
        setLoading(false);
      });
  };
  

  useEffect(() => {
    let isMounted = true;
     const debounceTimeout = setTimeout(() => {
      Countries(searchTerm, regionFilter);
     }, 500);

    return () => {
      isMounted = false;
      clearTimeout(debounceTimeout);
    };
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
