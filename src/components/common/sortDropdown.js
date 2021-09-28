import { SORT_NAMES } from "consts";
import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const SortDropdown = ({ types, sortBy, order, setSortBy, setOrder }) => {
  const activeSortName = SORT_NAMES[`${sortBy}${order > 0 ? "Asc" : "Desc"}`];

  const setSort = (sort, order) => {
    setSortBy(sort);
    setOrder(order);
  };

  return (
    <DropdownButton title="Сортировка" variant="danger">
      {types.map((sort) => {
        const nameAsc = SORT_NAMES[`${sort}Asc`];
        const nameDesc = SORT_NAMES[`${sort}Desc`];
        return (
          <>
            <Dropdown.Item
              eventKey={nameAsc}
              active={activeSortName === nameAsc}
              onClick={() => setSort(sort, 1)}
            >
              {nameAsc}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey={nameDesc}
              active={activeSortName === nameDesc}
              onClick={() => setSort(sort, -1)}
            >
              {nameDesc}
            </Dropdown.Item>
          </>
        );
      })}
    </DropdownButton>
  );
};

export default SortDropdown;
