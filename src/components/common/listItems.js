import React from "react";
import { Table, Badge } from "react-bootstrap";

const CategoriesTable = ({
  list,
  params,
  order,
  setOrder,
  setSortBy,
  onClickRow,
}) => {
  const onClickHead = (type) => {
    setSortBy(type);
    setOrder(order > 0 ? -1 : 1);
  };
  const renderTableValue = (value, type) => {
    if (type === "active")
      return (
        <Badge bg={value ? "success" : "danger"}>
          {value ? "Включена" : "Выключена"}
        </Badge>
      );
    return value;
  };

  return (
    <Table className="mt-4" striped bordered hover>
      <thead>
        <tr>
          {params.map(({ name, type }) => (
            <th onClick={() => onClickHead(type)}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((item, key) => (
          <tr
            className="cursor-p"
            key={key}
            onClick={() => onClickRow(item._id)}
          >
            {params.map(({ type }) => (
              <td>{renderTableValue(item[type], type)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoriesTable;
