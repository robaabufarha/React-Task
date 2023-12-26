import React, { useState } from "react";
import "./dropdown.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";

const DropdownList = ({
  items,
  defaultLabel = "Filter by",
  onItemSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState("all");

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
    onItemSelect(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="success"
        className="pl-2 pr-2 text-start border-0"
      >
        {selectedValue === "all" ? defaultLabel : selectedValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="all">{defaultLabel}</Dropdown.Item>
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
