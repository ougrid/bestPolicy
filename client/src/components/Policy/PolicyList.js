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

const UserCarList = (props) => {
  const url = config.url;
  const [row, setRow] = useState(0);
  const [hidecard, setHidecard] = useState([false,0]);
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

  //pagination
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(5);
  // Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [currentForm, setCurrentForm] = useState(formData.slice(0, 5))

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const changePage = (e) => {
    // e.preventDefault();
    const pageNumber = e.target.name
    const indexOfLastPost = pageNumber * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentPage(indexOfFirstPost)
    setCurrentForm(formData.slice(indexOfFirstPost, indexOfLastPost ))
    console.log(formData.slice(indexOfFirstPost, indexOfLastPost ));
    
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const name = e.target.name.split('_')[0]
    const index = parseInt(e.target.name.split('_')[1])
  const array =    { ...formData[index], [name]: e.target.value}
  formData[index] = array
  setFormData(formData)
    console.log(formData);
  };

  const handleChangeCard = async (e,index,data) => {
    e.preventDefault();
    setHidecard([false,0])
    if (e.target.name === 'saveChange') {
      const array =    data
      formData[index] = array
      
      setFormData(formData)
      // setCurrentForm(formData.slice(currentPage, currentPage + postsPerPage ))
      console.log(formData);
    }
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
    await axios.post(url + "/policies/policynew/batch", data).then((res) => {
      alert("policy batch Created");
      window.location.reload(false);
    });
  };


  const newRow = (e) => {
    e.preventDefault();
    setRow(row + 1);
    const array = formData
    array.push(formData[0])
    setFormData(array);
    setCurrentForm(formData.slice(0, 5))
    
  };
  const removeRow = (e) => {
    e.preventDefault();
    if (row > 0) {
      setRow(row - 1);
      setFormData(formData.slice(0,row));
      setCurrentForm(formData.slice(0, 5))
     
    }

  };
  const editCard =(e) =>{
    setHidecard([true,e.target.id])
   
  };
const handleClose = (e) =>{
  setHidecard([false,0])
}
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
          excelData[i].policyNo = excelData[i].policyNo.toString()
          if ('chassisNo' in excelData[i]) {excelData[i].chassisNo = excelData[i].chassisNo.toString()}
          if ('licenseNo' in excelData[i]) {excelData[i].licenseNo = excelData[i].licenseNo.toString()}
          element.push(excelData[i])
        }
        
        console.log(excelData.slice(2));
        if (excelData.length > 2) {
          setFormData(excelData.slice(2));
          setCurrentForm(excelData.slice(2, 7))
          setRow(excelData.length-3)
        }
      };
      reader.readAsBinaryString(file);
    }

  };

  return (
    <CenterPage>
      <div className="d-flex justify-content-center">

      <button type="button" class="btn btn-primary " onClick={newRow} >add</button>
      <button type="button" class="btn btn-danger " onClick={removeRow} >Remove</button>

      <input type="file" class="btn btn-secondary " id="fileInput" onChange={(e) => handleFileChange(e)} />
      </div>
     
      
      {/* <form className="container-fluid form-group text-left" */}
      <form
       method="POST"
        id="policyList">
       
        {/* loop new row */}
        {/* {Array.from({ length: row+1 }, (_, index) => ( */}
          {currentForm.map((_, index) => (
           
             
            
          (<>
          <Modal  size="xl" show={hidecard[0]} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >แก้ไขกรมธรรม์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {<PolicyCard index ={hidecard[1]} formData={formData[hidecard[1]]} setFormData ={handleChangeCard}/>}
        </Modal.Body>
       
      </Modal>
          <div className="d-flex align-items-center justify-content-center">
            
<div className="col-2">
            <h1 className="text-center">กรมธรรม์ฉบับที่ {index + currentPage + 1}</h1>

</div>
            <div className="col-2">
            

            <button type="button" class="btn btn-secondary " id={index + currentPage} onClick={(e)=>editCard(e)} >Edit</button>
            </div>
           </div>
            {/* policy table */}
            <div className="row form-group form-inline ">
            <div className="col-1"></div>
              <div className="col-2 form-group  ">
              <label class="form-label ">เลขที่กรมธรรม์<span class="text-danger"> *</span></label>
                <input
                disabled
                   className="form-control"
                  type="text"
                  value={formData[index + currentPage] !== undefined ?formData[index + currentPage].policyNo :null }
                  name={`policyNo_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
             
              <div class="col-2 form-group ">
              <label class="form-label">วันที่เริ่มคุ้มครอง<span class="text-danger"> *</span></label>
                <input
                disabled
                   className="form-control"
                  type="date"
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].actDate: null}
                  name={`actDate_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
              
              <div class="col-2 form-group ">
              <label class="form-label ">วันที่สิ้นสุด<span class="text-danger"> *</span></label>
                <input
                disabled
                 className="form-control"
                  type="date"
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].expDate :null}
                  name={`expDate_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
              <div class="col-3">
                {/* null */}
              </div>

            </div>

            <div class="row">
            <div className="col-1"></div>
              <div class="col-2 form-group " >
              <label class="form-label px-3">บริษัทรับประกัน<span class="text-danger"> *</span></label>
                <input
                disabled
                 className="form-control"
                  type="text"
                  value={formData[index + currentPage] !== undefined? formData[index + currentPage].insurerCode:null}
                  name={`insurerCode_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
             
              <div class="col-2 form-group ">
              <label class="form-label px-3">รหัสผู้แนะนำ<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].agentCode :null}
                  name={`agentCode_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>

            
              <div class="col-2 form-group ">
              <label class="form-label ">Class<span class="text-danger"> *</span></label>
                <select
                disabled
                  className="form-control"
                  name={`class_${index + currentPage}`}
                  onChange={handleChange}

                > 
                <option value={formData[index + currentPage] !== undefined ? formData[index + currentPage].class: null} selected disabled hidden>{formData[index + currentPage] !== undefined ? formData[index + currentPage].class: null}</option>
                  <option value="Motor">Motor</option>
                  <option value="PA">PA</option>
                  <option value="FR">FR</option>
                </select>
              </div>
              
              <div class="col-2">
              <label class="form-label ">Subclass<span class="text-danger"> *</span></label>
                <input
                disabled
                 className="form-control"
                  type="text"
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].subClass: null}
                  name={`subClass_${index + currentPage}`}
                  onChange={handleChange}

                />
              </div>
            </div>
            {/* policy table */}


            <div class="row">
            <div className="col-1"></div>
              <div class="col-2">
              <label class="form-label ">ค่าเบี้ย<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="number"
                  step={0.1}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].grossprem : null}
                  name={`grossprem_${index + currentPage}`}
                  onChange={e=>handleChange(e)}

                />
              </div>
              
              <div class="col-2">
              <label class="form-label ">ค่าแสตมอากรณ์<span class="text-danger"> *</span></label>
                <input
                disabled
                className="form-control"
                  type="number"
                  step={0.1}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].tax : null}
                  name={`tax_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
              
              <div class="col-2">
              <label class="form-label ">ภาษี<span class="text-danger"> *</span></label>
                <input
                disabled
                className="form-control"
                  type="number"
                  step={0.1}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].duty : null}
                  name={`duty_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
            
              <div class="col-2">
              <label class="form-label ">ค่าเบี้ยรวม<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="number"
                  step={0.1}
                  name={`totalprem_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].totalprem : null}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="row">
            <div className="col-1"></div>
              <div class="col-2">
                <label class="form-label ">comm_in%<span class="text-danger"> *</span></label>
                <input
                disabled
                   className="form-control"
                  type="number"
                  step={0.1}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`commIn%`] : null}
                  name={`commIn%_${index + currentPage}`}
                  onChange={e=>handleChange(e)}

                />
              </div>
              <div class="col-2">
                <label class="form-label ">จำนวนเงิน<span class="text-danger"> *</span></label>
                <input
                disabled
                   className="form-control"
                  type="number"
                  
                  step={0.1}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`commInamt`] : null}
                  // value={formData[index + currentPage][`commIn%`] * formData[index + currentPage][`grossprem`]/100 || ''}
                  name={`commInamt_${index + currentPage}`}
                  onChange={e=>handleChange(e)}
                />
              </div>
              
              <div class="col-2">
                <label class="form-label ">OV_in %<span class="text-danger"> *</span></label>
                <input
                disabled
                   className="form-control"
                  type="number"
                  step={0.1}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`ovIn%`]  : null}
                  name={`ovIn%_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
             
              <div class="col-2">
                <label class="form-label ">จำนวนเงิน<span class="text-danger"> *</span></label>
                <input
                disabled
                   className="form-control"
                  type="number"
                 
                  step={0.1}
                  name={`ovInamt_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`ovInamt`] : null}
                  // value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`ovIn%`] * formData[index + currentPage][`grossprem`]/100: null}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
            <div className="col-1"></div>
              <div class="col-2">
                <label class="form-label ">comm_out%<span class="text-danger"> *</span></label>
                <input
                disabled
                   className="form-control"
                  type="number"
                  step={0.1}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`commOut%`] : null}
                  name={`commOut%_${index + currentPage}`}
                  onChange={handleChange}

                />
              </div>
             
              <div class="col-2">
                <label class="form-label ">จำนวนเงิน</label>
                <input
                disabled
                   className="form-control"
                  type="number"
                  step={0.1}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`commOutamt`] : null}
                  // value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`commOut%`] * formData[index + currentPage][`grossprem`] /100: null}
                  name={`commOutamt_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">OV_out %<span class="text-danger"> *</span></label>
                <input
                disabled
                 className="form-control"
                  type="number"
                  step={0.1}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`ovOut%`] : null}
                  name={`ovOut%_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
              <label class="form-label ">จำนวนเงิน</label>
                <input
                disabled
                  className="form-control"
                  type="number"
                 
                  step={0.1}
                  name={`ovOutamt_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`ovOutamt`] : null}
                  // value={formData[index + currentPage] !== undefined ? formData[index + currentPage][`ovOut%`]* formData[index + currentPage][`grossprem`] /100: null}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* entity table */}
            <div class="row">
            <div className="col-1"></div>
              <div class="col-1">
              <label class="form-label ">type<span class="text-danger"> *</span></label>
                <select
                disabled
                  className="form-control"
                  name={`personType_${index + currentPage}`}
                  onChange={handleChange}
                >
                  <option value={formData[index + currentPage] !== undefined ? formData[index + currentPage].personType : null} disabled selected hidden>{formData[index + currentPage] !== undefined ? formData[index + currentPage].personType : null}</option>
                  <option value="P">บุคคล</option>
                  <option value="C">นิติบุคคล</option>
                </select>
              </div>
             
              <div class="col-1">
              <label class="form-label ">คำนำหน้า<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].title : null}
                  name={`title_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>

             
              <div class="col-2">
              <label class="form-label ">ชื่อ<span class="text-danger"> *</span></label>
                <input
                disabled
                className="form-control"
                  type="text"
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].t_fn : null}
                  name={`t_fn_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
             
              <div class="col-2">
              <label class="form-label ">นามสกุล<span class="text-danger"> *</span></label>
                <input
                disabled
                className="form-control"
                  type="text"
                  value={formData[index + currentPage] !== undefined? formData[index + currentPage].t_ln : null}
                  name={`t_ln_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
              <label class="form-label ">เลขประจำตัว<span class="text-danger"> *</span></label>
                <input
                disabled
                className="form-control"
                  type="text"
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].regisNo : null}
                  name={`regisNo_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* location table */}
            <div class="row">
            <div className="col-1"></div>
              <div class="col-2">
              <label class="form-label ">บ้านเลขที่<span class="text-danger"> *</span></label>
                <input
                disabled
                className="form-control"
                  type="text"
                  name={`t_location_1_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].t_location_1 : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">หมู่บ้าน/อาคาร<span class="text-danger"> *</span></label>
                <input
                disabled
                className="form-control"
                  type="text"
                  name={`t_location_2_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].t_location_2 : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">หมู่<span class="text-danger"> *</span></label>
                <input
                disabled
                  type="text"
                  className="form-control"
                  name={`t_location_3_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].t_location_3 : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">ซอย<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  name={`t_location_4_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].t_location_4 : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">ถนน<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  name={`t_location_5_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].t_location_5 : null}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="row">
            <div className="col-1"></div>
              <div class="col-2">
                <label class="form-label ">จังหวัด<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  name={`province_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].province : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">อำเภอ<span class="text-danger"> *</span></label>
                <input
                disabled
                   className="form-control"
                  type="text"
                  name={`distric_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined? formData[index + currentPage].distric : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
              <label class="form-label ">ตำบล<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  name={`subdistric_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].subdistric : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
              <label class="form-label ">รหัสไปรษณี<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  name={`zipcode_${index + currentPage}`}
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].zipcode : null}
                  onChange={handleChange}
                />
              </div>

            </div>
            {/* motor table */}
            {"Motor" === "Motor" ? (
              <>
                <div class="row">
                <div className="col-1"></div>
                  <div class="col-2">
              <label class="form-label ">เลขทะเบียนรถ<span class="text-danger"> *</span></label>
                    <input
                    disabled
                  className="form-control"
                      type="text"
                      name={`licenseNo_${index + currentPage}`}
                      value={formData[index + currentPage] !== undefined ? formData[index + currentPage].licenseNo : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-2">
              <label class="form-label ">ยี่ห้อรถยนต์<span class="text-danger"> *</span></label>
                    <input
                    disabled
                  className="form-control"
                      type="text"
                      name={`brandname_${index + currentPage}`}
                      value={formData[index + currentPage] !== undefined? formData[index + currentPage].brandname : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-2">
              <label class="form-label ">รุ่น<span class="text-danger"> *</span></label>
                    <input
                    disabled
                  className="form-control"
                      type="text"
                      name={`modelname_${index + currentPage}`}
                      value={formData[index + currentPage] !== undefined ? formData[index + currentPage].modelname : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-2">
              <label class="form-label ">เลขตัวถังรถ<span class="text-danger"> *</span></label>
                    <input
                    disabled
                  className="form-control"
                      type="text"
                      name={`chassisNo_${index + currentPage}`}
                      value={formData[index + currentPage] !== undefined ? formData[index + currentPage].chassisNo : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-2">
              <label class="form-label ">ปีที่จดทะเบียน<span class="text-danger"> *</span></label>
                    <input
                    disabled
                  className="form-control"
                      type="text"
                      name={`modelYear_${index + currentPage}`}
                      value={formData[index + currentPage] !== undefined ? formData[index + currentPage].modelYear : null}
                      onChange={handleChange}
                    
                    />
                  </div>
                </div>


              </>
            ) : null}
            <div class="row">
            <div className="col-1"></div>
              <div class="col-2">
              <label class="form-label ">เบอร์โทรศัพท์<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].telNum_1 : null}
                  name={`telNum_1_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
              <label class="form-label ">Email<span class="text-danger"> *</span></label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  value={formData[index + currentPage] !== undefined ? formData[index + currentPage].Email : null}
                  name={`Email_${index + currentPage}`}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>)
        
        ))}
       
       <Pagination
        postsPerPage={postsPerPage}
        totalPosts={formData.length}
        paginate={paginate}
        changePage={changePage}
      />
<div className="d-flex justify-content-center">

        <button type="button" class="btn btn-primary " onClick={(e)=>handleSubmit(e)} >Create</button>
</div>
      </form>
      
    </CenterPage>
  );
};

export default UserCarList;
