import React, { useState } from "react";
import "./dropdown.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";

const DropdownList = ({ items, defaultLabel = "Filter by", onRegionSelect }) => {
  const [selectedValue, setSelectedValue] = useState("allRegions"); // Add this line

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
    onRegionSelect(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="success"
        className="pl-2 pr-2 text-start border-0"
      >
        {selectedValue === "allRegions" ? defaultLabel : selectedValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="allRegions">{defaultLabel}</Dropdown.Item>
        {items.map((item) => (
          <Dropdown.Item
            key={item.value}
            eventKey={item.value}
            className=" text-truncate"
          >
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownList;
