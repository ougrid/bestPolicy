import React from "react";

export default function PremInTable({ cols, rows ,cols2}) {
  const colsElement = cols.map((item, index) => {
    return (
      <th key={index} scope="col">
        {item}
      </th>
    );
  });
  const getRecord = (item) => {
    // console.log(item);
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

  // const getColname = (cols2) => {
  //   // console.log(item);
  //   const _arr = [];
  //   for (const [key, value] of Object.entries(cols2)) {
  //     _arr.push(<th key={key} scope="col">
  //     {value}
  //   </th>);
  //   }
  //   return <tr>{_arr}</tr>;
  // };


  // const getRecord2 = (item) => {
  //   // console.log(item);
  //   const _arr = [];
  //   for (const [keym, valuem] of Object.entries(cols2)) {
  //     console.log(keym in item);
  //     if (keym in item ) {
  //       _arr.push(<td>{item[`${keym}`]}</td>)
  //     }
  //   }
  //   console.log(_arr);
  //   return _arr;
  // };

  // const rowsElement2 = rows.map((item, index) => {
  //   return (
  //     <tr key={index} scope="row">
  //       {getRecord2(item)}
  //     </tr>
  //   );
  // });

  return (
    <table class="table " style={{ fontSize: "12px" }}>
      <thead>
        <tr>{colsElement}</tr>
      </thead>
      <tbody>{rowsElement}</tbody>
      {/* <thead>
        <tr>{getColname}</tr>
      </thead>
      
      <tbody>{rowsElement2}</tbody> */}
    </table>
  );
}
