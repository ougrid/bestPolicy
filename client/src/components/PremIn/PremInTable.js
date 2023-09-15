import React ,{  useEffect,useState }from "react";

export default function PremInTable({ cols, rows ,handlechange}) {
  const [colData, setColData] = useState([])
  //old
  // const colsElement = cols.map((item, index) => {
  //   return (
  //     <th key={index} scope="col">
  //       {item}
  //     </th>
  //   );
  // });
  // const getRecord = (item) => {
  //   // console.log(item);
  //   const _arr = [];
  //   for (const [key, value] of Object.entries(item)) {
  //     if (key ==='select') {
  //       _arr.push(<td><input type="checkbox" defaultChecked  /></td>);
  //     }
  //     _arr.push(<td>{value}</td>);
  //   }
  //   return _arr;
  // };
  
  // const rowsElement = rows.map((item, index) => {
  //   return (
  //     <tr key={index} scope="row">
  //       {getRecord(item)}
  //     </tr>
  //   );
  // });


  //new
  // useEffect(() => { 
    const getColname =  (cols) => {
  const _arr = [];
  // console.log(item);
  for (const [key, value] of Object.entries(cols)) {
    _arr.push(<th key={key} scope="col">
    {value}
  </th>);
  }
  return(_arr)
};
  // }, []);
 
  const getRecord2 = (item) => {
    // console.log(item);
    const _arr = [];
    for (const [keym, valuem] of Object.entries(cols)) {
      
      if (keym in item ) {
        if (keym ==='select') {
          _arr.push(<td><input type="checkbox" defaultChecked  onChange={handlechange}/></td>);
        }else{

          _arr.push(<td>{item[`${keym}`]}</td>)
        }
      }
    }
    
    return _arr;
  };

  const colsElement = getColname(cols)
  const rowsElement2 = rows.map((item, index) => {
    return (
      <tr key={index} scope="row">
        {getRecord2(item)}
      </tr>
    );
  });

  return (
    <table class="table " style={{ fontSize: "12px" }}>
      {/* <thead>
        <tr>{colsElement}</tr>
      </thead>
      <tbody>{rowsElement}</tbody> */}
      <thead>
        <tr>{colsElement}</tr>
      </thead>
      
      <tbody>{rowsElement2}</tbody>
    </table>
  );
}
