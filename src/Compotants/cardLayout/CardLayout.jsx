import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import "./cardLayout.css";
import { useCustomState } from "../../Provider";
import { fetchAllCountries, searchCountriesByName } from "../../services/api";

function CardLayout({ searchTerm, regionFilter }) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { customFavorites } = useCustomState();
  const [filteredCountries, setFilteredCountries] = useState([]);
  const allRegions = "all";
  const favourites = "favourites";
  const loadingMessage = "Loading...";
  const errorFetchingMessage = "Error fetching countries";
  const notFoundMessage = "Country not found";

  const filterCountries = (data, regionFilter, customFavorites) => {
    return data.filter((country) => {
      if (regionFilter === allRegions) {
        return true;
      } else if (regionFilter === favourites) {
        return customFavorites.some(
          (favCountry) => favCountry.name.common === country.name.common
        );
      } else {
        return country.region === regionFilter;
      }
    });
  };

  const getCountries = (term, regionFilter) => {
    setLoading(true);
    setErrorMessage("");
    

    const searchPromise =
      term.trim() === "" ? fetchAllCountries() : searchCountriesByName(term);
    searchPromise
      .then((data) => {
        
        setFilteredCountries(data);
        const filteredData = filterCountries(
          data,
          regionFilter,
          customFavorites
        );

        setFilteredCountries(filteredData);
        setLoading(false);
      })
      .catch(() => {
        

        setFilteredCountries([]);
        setErrorMessage(term.trim() === "" ? errorFetchingMessage : notFoundMessage);
        setLoading(false);
      });

   
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getCountries(searchTerm, regionFilter);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm, regionFilter]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{loadingMessage}</span>
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
