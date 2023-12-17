import React from "react";
import "./home.css";
import { CountryRegions } from "../../data/CountryRegions";
import DropdownList from "../../Compotants/dropdown/Dropdown";
import Search from "../../Compotants/search/Search";
import FavouritReagion from "../../Compotants/favouritRegion/FavouritRegion";
import CardLayout from "../../Compotants/cardLayout/CardLayout";
function Home() {
  return (
    <div className="home-page">
      <section className="search-container d-flex justify-content-between py-5">
        <Search placeholder="Search for a country ..." />
        <DropdownList items={CountryRegions} defaultLabel="Filter by" />
      </section>

      <div className="grid-container">
        <div className="vertical-menu-container">
          <FavouritReagion />
        </div>
        <div className="country-info-container">
          <div className="container-fluid">
            <CardLayout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;