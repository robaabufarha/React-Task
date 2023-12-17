import React from "react";
import "./countryBorders.css";
function CountryBorders() {
  return (
    <div className="border-countries py-5">
      <div className="border-countries-div">Border Countries: </div>

      <span className="px-2 px-md-3 m-1 d-inline-block rounded-1 border-secondary">
        France
      </span>
      <span className="px-2 px-md-3 m-1 d-inline-block rounded-1 border-secondary">
        Germany
      </span>
      <span className="px-2 px-md-3 m-1 d-inline-block rounded-1 border-secondary">
        Netherlands
      </span>
    </div>
  );
}

export default CountryBorders;
