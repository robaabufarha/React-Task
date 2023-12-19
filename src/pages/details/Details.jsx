import React from "react";
import "./details.css";
import de from "../../assets/images/de.svg";
import CountryDetails from "../../Compotants/countryDetails/CountryDetails";
import CountryBorders from "../../Compotants/countryBorders/CountryBorders";
import Button from "../../Compotants/button/Button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";
function Details() {
  const { id } = useParams();
  return (
    <div className="details-page">
      <div className="back-button-container">
        <Button
          buttonClassName={
            "back-button d-flex justify-content-center align-items-center border-0"
          }
          icon={<IoIosArrowRoundBack size={"1.5em"} />}
          text="Back"
          linkTo={"/"}
        />
      </div>
      <div className="main-container py-5">
        <img src={de} alt="Germany flag" />

        <div>
          <div className="header-country">Belgium</div>
          <CountryDetails />
          <CountryBorders />
        </div>
      </div>
    </div>
  );
}

export default Details;
