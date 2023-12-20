import React, { useEffect, useState } from "react";
import "./countryDetails.css";
import "../../pages/details/details.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function CountryDetails() {
  const { countryName } = useParams();
  const [countrySelectedInfo, setCountrySelectedInfo] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(function (response) {
        let result = response.data;
        setCountrySelectedInfo(result[0]);
        setErrorMessage("");
      })
      .catch(function (error) {
        setErrorMessage("Error fetching country");
        console.log(error);
      });
  }, [countryName]);

  return (
    <div className="main-container py-5">
      {countrySelectedInfo ? (
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
              <div className="border-countries-container">
                Border Countries:{" "}
              </div>

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
      ) : (
        <div>{errorMessage || "Loading..."}</div>
      )}
    </div>
  );
}

export default CountryDetails;
