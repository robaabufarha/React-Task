import React, { useContext, useEffect } from "react";
import { useDrop } from "react-dnd";
import "./favouritRegion.css";
import { CustomStateContext, CustomDispatchContext } from "../../Provider";

function FavouritReagion() {
  const { customFavorites } = useContext(CustomStateContext);
  const dispatch = useContext(CustomDispatchContext);

  const [{ isOver }, drop] = useDrop({
    accept: "div",
    drop: (item) => addCountryToFavorite(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const addCountryToFavorite = (country) => {
    dispatch({ type: "ADD_FAVORITE", payload: country });
  };

  const handleDelete = (countryToDelete) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: countryToDelete });
  };

  useEffect(() => {
    console.log("Custom favorites have changed:", customFavorites);
  }, [customFavorites]);

  return (
    <div className="side-container">
      <div className="fav-text sticky-top pt-3 pl-5">Favourites</div>
      <div
        ref={drop}
        className={`sub-favourit-region pl-5 ${isOver ? "drag-over" : ""}`}
      >
        {customFavorites.length > 0 ? (
          customFavorites.map((country) => (
            <div key={country.name.common} className="favourite-country d-flex">
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="flag-image"
              />
              <span className="cloned-content-container text-truncate">
                {country.name.common}
              </span>
              <button
                className="delete-button ms-auto"
                onClick={() => handleDelete(country)}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <h5>No favorite countries yet</h5>
        )}
      </div>
    </div>
  );
}

export default FavouritReagion;
