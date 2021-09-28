import { SORT_NAMES } from "consts";
import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const CountDropdown = ({ counts, count, setCount }) => {
  return (
    <DropdownButton title="Количество" variant="danger">
      {counts.map((number) => (
        <Dropdown.Item
          eventKey={number}
          active={number === count}
          onClick={() => setCount(number)}
        >
          {number}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CountDropdown;
