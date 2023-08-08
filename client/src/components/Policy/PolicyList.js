import axios from "axios";
import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";
import { CenterPage } from "../StylesPages/AdminStyles";
import { Container } from "../StylesPages/PagesLayout";
import { async } from "q";
const config = require("../../config.json");

const UserCarList = (props) => {
  const url = config.url;
  const [row, setRow] = useState(0);
  //import excel
  const [formData, setFormData] = useState([{
    policyNo: null,
    actDate: null,
    expDate: null,
    insurerName: null,
    agentCode: null,
    insureType: null,
    insureName: null,
    prem: null,
    duty: null,
    stamp: null,
    total: null,
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
    brandID: null,
    modelID: null,
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
    await axios.post(url + "/policies/policynew/batch", data).then((res) => {
      alert("policy batch Created");
      window.location.reload(false);
    });
  };

  function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

  const newRow = (e) => {
    e.preventDefault();
    setRow(row + 1);
    
  };
  const removeRow = (e) => {
    e.preventDefault();
    if (row > 0) {
      setRow(row - 1);
      setFormData(formData.slice(0,row));
     
    }

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
        for (let i = 2; i <= excelData.length; i++) {
          element.push(excelData[i])
        }
        
        console.log(excelData.slice(2));
        if (excelData.length > 2) {
          setFormData(excelData.slice(2));
          setRow(excelData.length-3)
        }
      };
      reader.readAsBinaryString(file);
    }

  };

  return (
    <CenterPage>
      <button onClick={newRow} >add</button>
      <button onClick={removeRow} >Remove</button>

      <input type="file" id="fileInput" onChange={(e) => handleFileChange(e)} />
     
      
      {/* <form className="container-fluid form-group text-left" */}
      <form
       method="POST"
        id="policyList">
       
        {/* loop new row */}
        {Array.from({ length: row+1 }, (_, index) => (
          
           
           (<>
            <h1>กรมธรรม์ฉบับที่ {index + 1}</h1>
            {/* policy table */}
            <div className="row form-group form-inline ">
            <div className="col-1"></div>
              <div className="col-2 form-group  ">
              <label class="form-label ">เลขที่กรมธรรม์<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="text"
                  defaultValue={formData[index] !== undefined ?formData[index].policyNo :null }
                  name={`policyNo_${index}`}
                  onChange={handleChange}
                />
              </div>
             
              <div class="col-2 form-group ">
              <label class="form-label">วันที่เริ่มคุ้มครอง<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="date"
                  defaultValue={formData[index] !== undefined ? formData[index].actDate: null}
                  name={`actDate_${index}`}
                  onChange={handleChange}
                />
              </div>
              
              <div class="col-2 form-group ">
              <label class="form-label ">วันที่สิ้นสุด<span class="text-danger"> *</span></label>
                <input
                 className="form-control"
                  type="date"
                  defaultValue={formData[index] !== undefined ? formData[index].expDate :null}
                  name={`expDate_${index}`}
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
                 className="form-control"
                  type="text"
                  defaultValue={formData[index] !== undefined? formData[index].insurerName:null}
                  name={`insurerName_${index}`}
                  onChange={handleChange}
                />
              </div>
             
              <div class="col-2 form-group ">
              <label class="form-label px-3">รหัสผู้แนะนำ<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={formData[index] !== undefined ? formData[index].agentCode :null}
                  name={`agentCode_${index}`}
                  onChange={handleChange}
                />
              </div>

            
              <div class="col-2 form-group ">
              <label class="form-label ">Class<span class="text-danger"> *</span></label>
                <select
                  className="form-control"
                  name={`class_${index}`}
                  onChange={handleChange}

                > 
                <option value={formData[index] !== undefined ? formData[index].class: null} selected disabled hidden>{formData[index] !== undefined ? formData[index].class: null}</option>
                  <option value="Motor">Motor</option>
                  <option value="PA">PA</option>
                  <option value="FR">FR</option>
                </select>
              </div>
              
              <div class="col-2">
              <label class="form-label ">Subclass<span class="text-danger"> *</span></label>
                <input
                 className="form-control"
                  type="text"
                  defaultValue={formData[index] !== undefined ? formData[index].subClass: null}
                  name={`subClass_${index}`}
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
                  className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index].prem : null}
                  name={`prem_${index}`}
                  onChange={e=>handleChange(e)}

                />
              </div>
              
              <div class="col-2">
              <label class="form-label ">ค่าแสตมอากรณ์<span class="text-danger"> *</span></label>
                <input
                className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index].stamp : null}
                  name={`stamp_${index}`}
                  onChange={handleChange}
                />
              </div>
              
              <div class="col-2">
              <label class="form-label ">ภาษี<span class="text-danger"> *</span></label>
                <input
                className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index].duty : null}
                  name={`duty_${index}`}
                  onChange={handleChange}
                />
              </div>
            
              <div class="col-2">
              <label class="form-label ">ค่าเบี้ยรวม<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="number"
                  step={0.1}
                  name={`total_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].total : null}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="row">
            <div className="col-1"></div>
              <div class="col-2">
                <label class="form-label ">comm_in%<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index][`commIn%`] : null}
                  name={`commIn%_${index}`}
                  onChange={e=>handleChange(e)}

                />
              </div>
              <div class="col-2">
                <label class="form-label ">จำนวนเงิน<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="number"
                  disabled
                  step={0.1}
                  value={formData[index][`commIn%`] * formData[index][`prem`]/100 || ''}
                  name={`commInamt_${index}`}
                  onChange={e=>handleChange(e)}
                />
              </div>
              
              <div class="col-2">
                <label class="form-label ">OV_in %<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index][`ovIn%`]  : null}
                  name={`ovIn%_${index}`}
                  onChange={handleChange}
                />
              </div>
             
              <div class="col-2">
                <label class="form-label ">จำนวนเงิน<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="number"
                  disabled
                  step={0.1}
                  name={`ovInamt_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index][`ovIn%`] * formData[index][`prem`]/100: null}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
            <div className="col-1"></div>
              <div class="col-2">
                <label class="form-label ">comm_out%<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index][`commOut%`] : null}
                  name={`commOut%_${index}`}
                  onChange={handleChange}

                />
              </div>
             
              <div class="col-2">
                <label class="form-label ">จำนวนเงิน</label>
                <input
                   className="form-control"
                  type="number"
                  disabled
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index][`commOut%`] * formData[index][`prem`] /100: null}
                  name={`commOutamt_${index}`}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">OV_out %<span class="text-danger"> *</span></label>
                <input
                 className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index][`ovOut%`] : null}
                  name={`ovOut%_${index}`}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
              <label class="form-label ">จำนวนเงิน</label>
                <input
                  className="form-control"
                  type="number"
                  disabled
                  step={0.1}
                  name={`ovOutamt_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index][`ovOut%`]* formData[index][`prem`] /100: null}
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
                  className="form-control"
                  name={`personType_${index}`}
                  onChange={handleChange}
                >
                  <option value={formData[index] !== undefined ? formData[index].personType : null} disabled selected hidden>{formData[index] !== undefined ? formData[index].personType : null}</option>
                  <option value="P">บุคคล</option>
                  <option value="C">นิติบุคคล</option>
                </select>
              </div>
             
              <div class="col-1">
              <label class="form-label ">คำนำหน้า<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={formData[index] !== undefined ? formData[index].title : null}
                  name={`title_${index}`}
                  onChange={handleChange}
                />
              </div>

             
              <div class="col-2">
              <label class="form-label ">ชื่อ<span class="text-danger"> *</span></label>
                <input
                className="form-control"
                  type="text"
                  defaultValue={formData[index] !== undefined ? formData[index].t_fn : null}
                  name={`t_fn_${index}`}
                  onChange={handleChange}
                />
              </div>
             
              <div class="col-2">
              <label class="form-label ">นามสกุล<span class="text-danger"> *</span></label>
                <input
                className="form-control"
                  type="text"
                  defaultValue={formData[index] !== undefined? formData[index].t_ln : null}
                  name={`t_ln_${index}`}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
              <label class="form-label ">เลขประจำตัว<span class="text-danger"> *</span></label>
                <input
                className="form-control"
                  type="text"
                  defaultValue={formData[index] !== undefined ? formData[index].regisNo : null}
                  name={`regisNo_${index}`}
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
                className="form-control"
                  type="text"
                  name={`t_location_1_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].t_location_1 : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">หมู่บ้าน/อาคาร<span class="text-danger"> *</span></label>
                <input
                className="form-control"
                  type="text"
                  name={`t_location_2_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].t_location_2 : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">หมู่<span class="text-danger"> *</span></label>
                <input
                  type="text"
                  className="form-control"
                  name={`t_location_3_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].t_location_3 : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">ซอย<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="text"
                  name={`t_location_4_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].t_location_4 : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">ถนน<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="text"
                  name={`t_location_5_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].t_location_5 : null}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="row">
            <div className="col-1"></div>
              <div class="col-2">
                <label class="form-label ">จังหวัด<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="text"
                  name={`province_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].province : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
                <label class="form-label ">อำเภอ<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="text"
                  name={`distric_${index}`}
                  defaultValue={formData[index] !== undefined? formData[index].distric : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
              <label class="form-label ">ตำบล<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="text"
                  name={`subdistric_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].subdistric : null}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
              <label class="form-label ">รหัสไปรษณี<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="text"
                  name={`zipcode_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].zipcode : null}
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
                  className="form-control"
                      type="text"
                      name={`carRegisNo_${index}`}
                      defaultValue={formData[index] !== undefined ? formData[index].carRegisNo : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-2">
              <label class="form-label ">ยี่ห้อรถยนต์<span class="text-danger"> *</span></label>
                    <input
                  className="form-control"
                      type="text"
                      name={`brandID_${index}`}
                      defaultValue={formData[index] !== undefined? formData[index].brandID : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-2">
              <label class="form-label ">รุ่น<span class="text-danger"> *</span></label>
                    <input
                  className="form-control"
                      type="text"
                      name={`modelID_${index}`}
                      defaultValue={formData[index] !== undefined ? formData[index].modelID : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-2">
              <label class="form-label ">เลขตัวถังรถ<span class="text-danger"> *</span></label>
                    <input
                  className="form-control"
                      type="text"
                      name={`chassisNo_${index}`}
                      defaultValue={formData[index] !== undefined ? formData[index].chassisNo : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-2">
              <label class="form-label ">ปีที่จดทะเบียน<span class="text-danger"> *</span></label>
                    <input
                  className="form-control"
                      type="text"
                      name={`carRegisYear_${index}`}
                      defaultValue={formData[index] !== undefined ? formData[index].carRegisYear : null}
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
                  className="form-control"
                  type="text"
                  defaultValue={formData[index] !== undefined ? formData[index].telNum_1 : null}
                  name={`telNum_1_${index}`}
                  onChange={handleChange}
                />
              </div>
              <div class="col-2">
              <label class="form-label ">Email<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={formData[index] !== undefined ? formData[index].Email : null}
                  name={`Email_${index}`}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>)

        ))}

        <button type="button" class="btn btn-primary" onClick={(e)=>handleSubmit(e)} >Create</button>
      </form>
      <div></div>
    </CenterPage>
  );
};

export default UserCarList;
