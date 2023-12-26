import React from "react";
import "./details.css";
import CountryDetails from "../../Compotants/countryDetails/CountryDetails";
import Button from "../../Compotants/button/Button";
import { IoIosArrowRoundBack } from "react-icons/io";

function Details() {
  const backButtonText = "Back";
  return (
    <div className="details-page">
      <div className="back-button-container">
        <Button
          buttonClassName={
            "back-button d-flex justify-content-center align-items-center border-0"
          }
          icon={<IoIosArrowRoundBack size={"1.5em"} />}
          text={backButtonText}
          linkTo={"/"}
        />
      </div>
      <CountryDetails />
    </div>
  );
}

export default Details;
