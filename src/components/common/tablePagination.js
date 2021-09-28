import React from "react";
import { Pagination } from "react-bootstrap";

const TablePagination = ({ count, page, allCount, setPage }) => {
  const isPagination = count < allCount;
  const paginationCount = Math.ceil(allCount / count);
  let items = [];
  for (let item = 1; item <= paginationCount; item++) {
    items.push(
      <Pagination.Item
        key={item}
        active={item === page}
        onClick={() => setPage(item)}
      >
        {item}
      </Pagination.Item>
    );
  }

  return isPagination ? <Pagination>{items}</Pagination> : null;
};

export default TablePagination;
