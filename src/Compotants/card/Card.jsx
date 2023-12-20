import React, { useContext } from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { useDrag } from "react-dnd";
import { MdStar } from "react-icons/md";
import { CustomDispatchContext } from "../../Provider";

function Card({ country, isFavorite }) {
  const dispatch = useContext(CustomDispatchContext);

  let starColor;
  if (isFavorite) {
    starColor = "rgb(252, 130, 5)";
  } else {
    starColor = "rgb(192, 187, 187)";
  }

  const [{ isDragging }, drag] = useDrag({
    type: "div",
    item: { id: country },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const addCountryToFavorite = (country) => {
    dispatch({ type: "ADD_FAVORITE", payload: country });
  };

  const handleDeleteFavorite = (countryToDelete) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: countryToDelete });
  };

  const handleDeleteOrAddFavorite = (country) => {
    if (isFavorite) {
      handleDeleteFavorite(country);
    } else {
      addCountryToFavorite(country);
    }
  };

  return (
    <div className="col col-12 m-0">
      <div className="card" ref={drag}>
        <Link to={`/details/${country.name.common}`}>
          <img
            src={country.flags.svg}
            className="card-img-top"
            alt={country.flags.alt}
          />
        </Link>

        <div className="card-body">
          <h4 className="card-title text-truncate" title={country.name.common}>
            {country.name.common}
          </h4>
          <div className="card-text">
            <div className="text-truncate" title={country.population}>
              <b>Population:</b> {country.population}
            </div>
            <div className="text-truncate" title={country.region}>
              <b>Region:</b> {country.region}
            </div>
            <div className="text-truncate" title={country.capital}>
              <b>Capital:</b> {country.capital}
            </div>
            <MdStar
              className="star-button"
              onClick={() => handleDeleteOrAddFavorite(country)}
              style={{ color: starColor }}
            ></MdStar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
