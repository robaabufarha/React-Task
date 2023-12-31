import React, { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import "./favouritRegion.css";
import { CustomStateContext, CustomDispatchContext } from "../../Provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../button/Button";
import { TfiClose } from "react-icons/tfi";
function FavouritReagion() {
  let [isDragOver, setIsDragOver] = useState(false);
  const { customFavorites } = useContext(CustomStateContext);
  const dispatch = useContext(CustomDispatchContext);
  function handelToastHelper(country) {
    const toastHelper = `${country} is already exist in favorites`;
    return toastHelper;
  }
  const [{ isOver }, drop] = useDrop({
    accept: "div",
    drop: (item) => handleDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleDrop = (country) => {
    const isCountryInFavorites = customFavorites.some(
      (favCountry) => favCountry.name.common === country.name.common
    );

    if (isCountryInFavorites) {
      toast.error(handelToastHelper(country.name.common));
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: country });
    }
  };

  const handleDelete = (country) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: country });
  };
  const handelAddBorderColor = () => {
    setIsDragOver(true);
  };
  const handelDeleteBorderColor = () => {
    setIsDragOver(false);
  };
  return (
    <div
      className="side-container"
      style={{ border: isDragOver ? "5px solid #27ae60" : "0px" }}
    >
      <div className="fav-text sticky-top pt-3 pl-5">Favourites</div>
      <div
        ref={drop}
        className={`sub-favourit-region pl-5 ${isOver ? "drag-over" : ""}`}
        onDragOver={handelAddBorderColor}
        onDragLeave={handelDeleteBorderColor}
        onDrop={handelDeleteBorderColor}
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
              <Button
                buttonClassName="delete-button ms-auto"
                icon={<TfiClose />}
                action={handleDelete}
                attribute={country}
              />
            </div>
          ))
        ) : (
          <h5></h5>
        )}
      </div>
    </div>
  );
}

export default FavouritReagion;
