import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

function Card({ id, src, alt, name, population, region, capital }) {
  return (
    <div className="col col-12 m-0 ">
      <div className="card ">
      <Link to={`/details/${id}`}>
        <img src={src} className="card-img-top" alt={alt} />
      </Link>
        <div className="card-body">
          <h4 className="card-title text-truncate" title={name}>
            {name}
          </h4>
          <div className="card-text">
            <div className="text-truncate" title={population}>
              <b>Population:</b> {population}
            </div>
            <div className="text-truncate" title={region}>
              <b>Region:</b> {region}
            </div>
            <div className="text-truncate" title={capital}>
              <b>Capital:</b> {capital}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
