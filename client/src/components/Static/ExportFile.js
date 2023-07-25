import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from 'xlsx';
import jwt_decode from "jwt-decode";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigation,
} from "react-router-dom";
import {
  Header,
  InputBtn,
  LoginBtn,
  BackdropBox1,
} from "../StylesPages/LoginStyles";

const config = require("../../config.json");

const NormalText = {
  color: "white",
  paddingBottom: "10px",
};
/* eslint-disable react-hooks/exhaustive-deps */

const fillExcelTemplateAndExport = (data) => {
    // Load the template file
    const workbook = XLSX.readFile('temp.xlsx');

    // Get the first sheet from the template (assuming it's the only sheet)
    // const sheetName = workbook.SheetNames[0];
    // const worksheet = workbook.Sheets[sheetName];
  
    // // Replace placeholders in the worksheet with actual data
    // data.forEach((item, index) => {
    //   const cellAddress = `A${index + 2}`; // Assuming the data starts from row 2 (skip header row)
    //   worksheet[cellAddress].v = item.name; // Replace "{name}" with the actual name
    //   // Similarly, update other cells with the corresponding data
    // });
  
    // // Export the updated workbook
    // XLSX.writeFile(workbook, 'filled_template.xlsx');
  };

const ExportFile = () => {
  const url = config.url;
  const navigate = useNavigate();
  const [insureData, setInsureData] = useState({});
  // const [locationData, setLocationData] = useState({entityID : null});

  const changeInsurer = (e) => {
      setInsureData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        console.log(insureData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(url + "/insures/insuretypenew", { insure: insureData })
      .then((res) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);
        console.log(res.data);
        alert("create new insure success")
    })
    .catch((err) => {
      
            alert("create new insure fail");
        
    });
  };

 

  const handleExport = (e) => {
    e.preventDefault();
    const data = [
        { name: 'John Doe', age: 30, email: 'john@example.com' },
        { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
        // Add more data objects as needed
      ];

      fillExcelTemplateAndExport(data);
  };

  return (
    <>
      {/* <BackdropBox1> */}
      <div class="row">
          <div class="col">
            <h11>ดาวโหลดเอกสาร ทบ. 1 </h11>
          </div>
          <div class="col">
            <input
              type="submit"
              required
              // placeholder="Password"
              name="subClass"
              onClick={handleExport}
            />
          </div>
        </div>

      {/* <Link to="/signup" style={NormalText}>
          First time here ? Let's sign up
        </Link> */}
      {/* </BackdropBox1> */}
    </>
  );
};

export default ExportFile;
