import React from "react";
import Button from "../button/Button";
import "../button/button.css";
import "./header.css";

function Header({ children }) {
  return (
    <header>
      <div className=" navbar align-items-center sticky-top container-fluid">
        {children}
      </div>
    </header>
  );
}

export default Header;
