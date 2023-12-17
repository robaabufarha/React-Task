import React from "react";
import Card from "../card/Card";
import { CountryInfo } from "../../data/CountryInfo";
import "./cardLayout.css";
function CardLayout() {
  return (
    <div className="row row-cols-xxl-3 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 gx-5 gy-5 m-0 pt-0">
      {CountryInfo.map((CountryInfo) => (
        <Card
          key={CountryInfo.id}
          src={CountryInfo.src}
          alt={CountryInfo.alt}
          name={CountryInfo.name}
          population={CountryInfo.population}
          region={CountryInfo.region}
          capital={CountryInfo.capital}
        />
      ))}
    </div>
  );
}

export default CardLayout;
