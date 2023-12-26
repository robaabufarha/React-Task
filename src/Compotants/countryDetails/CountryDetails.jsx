import React, { useEffect, useState } from "react";
import "./countryDetails.css";
import "../../pages/details/details.css";
import { useParams } from "react-router-dom";
import { getCountryByName } from "../../services/api";

const loadingMessage = "Loading...";

function CountryDetails() {
  const { countryName } = useParams();
  const [countrySelectedInfo, setCountrySelectedInfo] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const errorFetchingMessage = "Error fetching country";
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setLoading(true);
      getCountryByName(countryName)
        .then((countryData) => {
          setCountrySelectedInfo(countryData);
          setErrorMessage("");
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(errorFetchingMessage);
          setLoading(false);
        });
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [countryName]);

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
    <div className="main-container py-5">
      <>
        <img
          src={countrySelectedInfo.flags.svg}
          alt={countrySelectedInfo.name.official}
        />
        <div>
          <div className="header-country">
            {countrySelectedInfo.name.official}
          </div>
          <article className="details-container">
            <div className="left-side">
              <div className="details-info">Native Name:</div>
              {countrySelectedInfo.name.common}
              <br />
              <div className="details-info">Population: </div>
              {countrySelectedInfo.population?.toLocaleString()}
              <br />
              <div className="details-info">Region: </div>
              {countrySelectedInfo.region}
              <br />
              <div className="details-info">Sub Region: </div>
              {countrySelectedInfo.subregion}
              <br />
              <div className="details-info">Capital: </div>
              {countrySelectedInfo.capital}
            </div>
            <div className="right-side">
              <div className="details-info">Top Level Domain:</div>
              {countrySelectedInfo.cca2}
              <br />
              <div className="details-info">Currencies: </div>
              {Object.keys(countrySelectedInfo.currencies || {}).join(" ,")}
              <br />
              <div className="details-info">Languages: </div>
              {Object.values(countrySelectedInfo.languages || {}).join(" ,")}
            </div>
          </article>
          <div className="border-countries py-5">
            <div className="border-countries-container">Border Countries: </div>

            {countrySelectedInfo.borders &&
              countrySelectedInfo.borders.length > 0 && (
                <div className="sub-border-countries-container">
                  {countrySelectedInfo.borders.map((borderCountry) => (
                    <span
                      key={borderCountry}
                      className="px-2 px-md-3 m-1 d-inline-block rounded-1 border-secondary"
                    >
                      {borderCountry}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </div>
      </>
    </div>
  );
}

export default CountryDetails;
