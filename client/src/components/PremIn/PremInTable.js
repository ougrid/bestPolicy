import React from "react";

export default function PremInTable({ cols, rows }) {
  const colsElement = cols.map((item, index) => {
    return (
      <th key={index} scope="col">
        {item}
      </th>
    );
  });
  const getRecord = (item) => {
    console.log(item);
    const _arr = [];
    for (const [key, value] of Object.entries(item)) {
      _arr.push(<td>{value}</td>);
    }
    return _arr;
  };
  const rowsElement = rows.map((item, index) => {
    return (
      <tr key={index} scope="row">
        {getRecord(item)}
      </tr>
    );
  });
  return (
    <table class="table " style={{ fontSize: "12px" }}>
      <thead>
        <tr>{colsElement}</tr>
      </thead>
      <tbody>{rowsElement}</tbody>
    </table>
  );
}
