import React ,{  useEffect,useState }from "react";

export default function PremInTable({ cols, rows ,setPoliciesData}) {
  const [colData, setColData] = useState([])

  const changestatementtype = (e) => {
    // e.preventDefault();
    console.log(e.target.name);
    const array = rows
    array[e.target.id] = { ...rows[e.target.id], [e.target.name]: e.target.checked }
    setPoliciesData(array)

};


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
 
  const getRecord2 = (item,index) => {
    // console.log(item);
    const _arr = [];
    for (const [keym, valuem] of Object.entries(cols)) {
      
      if (keym in item ) {
        if (keym ==='select') {
          _arr.push(<td><input type="checkbox" defaultChecked  name="select" id={index} onChange={changestatementtype}/></td>);
        }else if(keym ==='select'){

          _arr.push(<td>{item[`${keym}`]}</td>)
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
        {getRecord2(item,index)}
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
