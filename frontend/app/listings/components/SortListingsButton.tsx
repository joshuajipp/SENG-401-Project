import { Dropdown, DropdownItem } from "flowbite-react";
import React from "react";

export default function SortListingsButton() {
  const dropDownOptions = ["Dashboard", "Settings", "Earnings", "Sign out"];
  return (
    <Dropdown label="Sort by" color="primary">
      {dropDownOptions.map((option) => (
        <DropdownItem key={option}>{option}</DropdownItem>
      ))}
    </Dropdown>
  );
}
