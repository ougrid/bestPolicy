import axios from "axios";
import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";
import { CenterPage } from "../StylesPages/AdminStyles";
import { Container } from "../StylesPages/PagesLayout";
import PolicyCard from "./PolicyCard";
import Modal from 'react-bootstrap/Modal';
import { async } from "q";
import Pagination from "./Pagination";
const config = require("../../config.json");

const PolicyReconcile = (props) => {
  const url = window.globalConfig.BEST_POLICY_V1_BASE_URL;
  //import excel
  const [formData, setFormData] = useState([{
    policyNo: null,
    actDate: null,
    expDate: null,
    insurerName: null,
    agentCode: null,
    insureType: null,
    insureName: null,
    grossprem: null,
    duty: null,
    tax: null,
    totalprem: null,
    personType: null,
    title: null,
    t_ogName: null,
    t_firstName: null,
    t_lastName: null,
    idCardType: null,
    idCardNo: null,
    taxNo: null,
    t_location_1: null,
    t_location_2: null,
    t_location_3: null,
    t_location_4: null,
    t_location_5: null,
    province: null,
    distric: null,
    subdistric: null,
    zipcode: null,
    carRegisNo: null,
    brandname: null,
    modelname: null,
    chassisNo: null,
    carRegisYear: null,
    telNum_1: null,
  }]);


  const handleChange = async (e) => {
    e.preventDefault();
    const name = e.target.name.split('_')[0]
    const index = parseInt(e.target.name.split('_')[1])
  const array =    { ...formData[index], [name]: e.target.value}
  formData[index] = array
  setFormData(formData)
    console.log(formData);
  };

 

  const handleSubmit = async (e) => {
    const data = []
     for (let i = 0; i < formData.length; i++) {
      let t_ogName =null
      let t_firstName = null
      let t_lastName = null
      let idCardType = "idcard"
      let idCardNo =  null
      let taxNo = null
      if (formData[i].personType === 'P'){
        t_firstName = formData[i].t_fn
        t_lastName = formData[i].t_ln
        idCardNo = formData[i].regisNo.toString()
        data.push({...formData[i], t_firstName:t_firstName, t_lastName :t_lastName, idCardNo:idCardNo, idCardType:idCardType, t_ogName:t_ogName , taxNo:taxNo})
      }else{
        t_ogName = formData[i].t_fn
        
        taxNo = formData[i].regisNo.toString()
        data.push({...formData[i], t_ogName:t_ogName , taxNo:taxNo, t_firstName:t_firstName, t_lastName :t_lastName, idCardNo:idCardNo, idCardType:idCardType})
      }
    }
    console.log(data);
    e.preventDefault();
    await axios.post(url + "/policies/policydraft/batch", data).then((res) => {
      alert("policy batch Created");
      window.location.reload(false);
    });
  };


  
 
  //import excel
  const handleFileChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assuming the first sheet is the one containing data
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet data to JSON format
        const excelData = XLSX.utils.sheet_to_json(worksheet);

        // Assuming the first row in the Excel sheet contains the field names (header row)
        // Update the state to populate the form data with the Excel data
        const element = []
        for (let i = 2; i < excelData.length; i++) {
          //excelData[i].policyNo = excelData[i].policyNo.toString()
          if ('chassisNo' in excelData[i]) {excelData[i].chassisNo = excelData[i].chassisNo.toString()}
          if ('licenseNo' in excelData[i]) {excelData[i].licenseNo = excelData[i].licenseNo.toString()}
          element.push(excelData[i])
        }
        
        console.log(excelData.slice(2));
        if (excelData.length > 2) {
          setFormData(excelData.slice(2));
     
        }
      };
      reader.readAsBinaryString(file);
    }

  };

  return (
    <CenterPage>
      <div className="d-flex justify-content-center">


      <input type="file" class="btn btn-secondary " id="fileInput" onChange={(e) => handleFileChange(e)} />
      <button type="button" class="btn btn-primary " onClick={(e)=>handleSubmit(e)} >Batch process</button>
      </div>
     
      
   
      <div className="container justify-content-center" style={{marginTop:"30px",marginBottom:"30px"}}>
      <form
       method="POST"
        id="policyList" className="">

       
        <div className="row mb-3">
        <div className="col-4"></div>
          <div className="col-2">
            <label className="form-label">Reconcile No</label>
          </div>
          <div className="col-2">
            <input type="text" name="reconcileNo" className="form-control"/>
          </div>
        </div>
        <div className="row mb-3">
        <div className="col-4"></div>
          <div className="col-2">
            <label className="form-label">usercode</label>
          </div>
          <div className="col-2">
            <input type="text" name="userCode" className="form-control"/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4"></div>
          <div className="col-2">
            <label className="form-label">createdate - time </label>
          </div>
          <div className="col-2">
            <input type="datetime-local" name="createdatetime" className="form-control"/>
          </div>
         
        </div>
        <div className="row mb-3">
          <div className="col-4"></div>
          <div className="col-2">
            <label className="form-label">filename</label>
          </div>
          <div className="col-2">
            <input type="text" name="filename" className="form-control"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4"></div>
          <div className="col-2">
            <label className="form-label">transaction type</label>
          </div>
          <div className="col-4">
          <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
  <label class="form-check-label" for="inlineRadio1">Inhouse</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
  <label class="form-check-label" for="inlineRadio2">Direct</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
  <label class="form-check-label" for="inlineRadio3">All</label>
</div>
          </div>
        </div>
       
       
<div className="d-flex justify-content-center">

       
        <button type="button" class="btn btn-primary " onClick={(e)=>handleSubmit(e)} >Save Draft</button>
</div>
      </form>
        </div>
      
    </CenterPage>
  );
};

export default PolicyReconcile;
