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

  

  // const carList = carTypes.map((item) => {
  //   return <option value={item}>{item}</option>;
  // });

  // // dropdown Class
  // const classList = config.class.map((item) => {
  //   return <option value={item}>{item}</option>;
  // });

  // // dropdown SubClass
  // const subClassList = config.subClass.map((item) => {
  //   return <option value={item}>{item}</option>;
  // });

  // //  setCarTypeList(List)
  // const carsElement = cars
  //   .filter((item) => {
  //     return props.userId === item.user_id;
  //   })
  //   .map((car, id) => {
  //     return (
  //       <>
  //         <form
  //           method="POST"
  //           id={"car" + car.id}
  //           onSubmit={(e) => handleEdit(e)}
  //         ></form>
  //         <tr key={id}>
  //           <td>
  //             <input
  //               type="text"
  //               form={"car" + car.id}
  //               name="id"
  //               defaultValue={car.id}
  //               disabled
  //             />
  //           </td>
  //           <td>
  //             <input
  //               type="text"
  //               form={"car" + car.id}
  //               name="user_id"
  //               defaultValue={car.user_id}
  //               disabled
  //             />
  //           </td>
  //           <td>
  //             <input
  //               type="text"
  //               form={"car" + car.id}
  //               name="plate_number"
  //               defaultValue={car.plate_number}
  //             />
  //           </td>
  //           <td>
  //             <input
  //               type="text"
  //               form={"car" + car.id}
  //               name="brand"
  //               defaultValue={car.brand}
  //             />
  //           </td>
  //           <td>
  //             <input
  //               type="text"
  //               form={"car" + car.id}
  //               name="model"
  //               defaultValue={car.model}
  //             />
  //           </td>
  //           <td>
  //             <input
  //               type="text"
  //               form={"car" + car.id}
  //               name="year"
  //               defaultValue={car.year}
  //             />
  //           </td>
  //           <td>
  //             <input
  //               type="text"
  //               form={"car" + car.id}
  //               name="insurance_id"
  //               defaultValue={car.insurance_id}
  //             />
  //           </td>
  //           <td>
  //             <select form={"car" + car.id} name="type" defaultValue={car.type}>
  //               {carList}
  //             </select>
  //             {/* <input
  //               type="text"
  //               form={"car" + car.id}
  //               name="type"
  //               defaultValue={car.type}
  //             /> */}
  //           </td>
  //           <td>
  //             <input
  //               type="submit"
  //               form={"car" + car.id}
  //               name="edit"
  //               value="edit"
  //             />
  //           </td>
  //           <td>
  //             <input
  //               type="button"
  //               id={car.id}
  //               value="delete"
  //               onClick={(e) => handleDelete(e)}
  //             />
  //           </td>
  //         </tr>
  //       </>
  //     );
  //   });


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
  // const handleCreate = (e) => {
  //   e.preventDefault();
  //   const array = []
  //   for (let i = 0; i <= row; i++) {
  //     let t_og = null
  //     let t_fn = null
  //     let t_ln = null
  //     let idCardNo = null
  //     let idCardType = null
  //     let taxNo = null
  //     if (e.target.elements[`personType_${i}`].value === 'C') {
  //       t_og = e.target.elements[`t_fn_${i}`].value
  //       taxNo = e.target.elements[`regisNo_${i}`].value.toString()
  //     } else {
  //       idCardType = 'idcard'
  //       idCardNo = e.target.elements[`regisNo_${i}`].value.toString()
  //       t_fn = e.target.elements[`t_fn_${i}`].value
  //       t_ln = e.target.elements[`t_ln_${i}`].value
  //     }

  //     const data = {
  //       policyNo: e.target.elements[`policyNo_${i}`].value.toString(),
  //       actDate: e.target.elements[`actDate_${i}`].value,
  //       expDate: e.target.elements[`expDate_${i}`].value,
  //       insurerName: e.target.elements[`insurerName_${i}`].value,
  //       agentCode: e.target.elements[`agentCode_${i}`].value,
  //       insureType: e.target.elements[`insureType_${i}`].value,
  //       insureName: e.target.elements[`insureName_${i}`].value,
  //       prem: e.target.elements[`prem_${i}`].value,
  //       duty: e.target.elements[`duty_${i}`].value,
  //       stamp: e.target.elements[`stamp_${i}`].value,
  //       total: e.target.elements[`total_${i}`].value,
  //       personType: e.target.elements[`personType_${i}`].value,
  //       title: e.target.elements[`title_${i}`].value,
  //       t_ogName: t_og,
  //       t_firstName: t_fn,
  //       t_lastName: t_ln,
  //       idCardType: idCardType,
  //       idCardNo: idCardNo,
  //       taxNo: taxNo,
  //       t_location_1: e.target.elements[`t_location_1_${i}`].value,
  //       t_location_2: e.target.elements[`t_location_2_${i}`].value,
  //       t_location_3: e.target.elements[`t_location_3_${i}`].value,
  //       t_location_4: e.target.elements[`t_location_4_${i}`].value,
  //       t_location_5: e.target.elements[`t_location_5_${i}`].value,

  //       province: e.target.elements[`province_${i}`].value,
  //       distric: e.target.elements[`distric_${i}`].value,
  //       subdistric: e.target.elements[`subdistric_${i}`].value,
  //       zipcode: e.target.elements[`zipcode_${i}`].value.toString(),
  //       carRegisNo: e.target.elements[`carRegisNo_${i}`].value,
  //       brandID: e.target.elements[`brandID_${i}`].value,
  //       modelID: e.target.elements[`modelID_${i}`].value,
  //       chassisNo: e.target.elements[`chassisNo_${i}`].value,
  //       carRegisYear: e.target.elements[`carRegisYear_${i}`].value,
  //       telNum_1: e.target.elements[`telNum_1_${i}`].value,


  //     };
  //     array.push(data)
  //   }
  //   console.log(array);

  //   // exportToJsonFile(array)
  //   setFormData(array)
  // };

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
       
        <>
        {/* policy table 
        <div class="row ">
          <div class="col-1 ">
            <h6>เลขที่กรมธรรม์</h6>
          </div>
          <div class="col-2">
            <input
              className="col"
              type="text"
              name="policyNo_0"
              defaultValue={formData[0].policyNo}
            />
          </div>
          <div class="col-1">
            <h6>วันที่เริ่มคุ้มครอง</h6>
          </div>
          <div class="col-2">
            <input
              className="col"
              type="date"
              name="actDate_0"
              defaultValue={formData[0].actDate}

            />
          </div>
          <div class="col-1">
            <h6>วันที่สิ้นสุด</h6>
          </div>
          <div class="col-2">
            <input
              type="date"
              defaultValue={formData[0].expDate}
              name="expDate_0"

            />
          </div>
          <div class="col-3">
      
          </div>

        </div>

        <div class="row">

          <div class="col-1">
            <h6>บริษัทรับประกัน</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              defaultValue={formData[0].insurerName}
              name="insurerName_0"

            />
          </div>
          <div class="col-1">
            <h6>รหัสนายหน้า</h6>
          </div>
          <div class="col-2">
            <input
              className="col-md-4"
              type="text"
              name="agentCode_0"
              defaultValue={formData[0].agentCode}
            />
          </div>

          <div class="col-1">
            <h6>ประเภทประกัน</h6>
          </div>
          <div class="col-2">
            <select
              className="col-md-8"
              name="insureType_0"
            >
              <option value={formData[0].insureType} selected disabled hidden>{formData[0].insureType}</option>
              <option value="Motor">Motor</option>
              <option value="PA">PA</option>
              <option value="FR">FR</option>
            </select>
          </div>
          <div class="col-1">
            <h6>แผนประกัน</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              defaultValue={formData[0].insureName}
              name="insureName_0"

            />
          </div>
        </div>
        // policy table 


        <div class="row">
          <div class="col-1">
            <h6>ค่าเบี้ย</h6>
          </div>
          <div class="col-2">
            <input
              className="col"
              type="number"
              step={0.1}
              name="prem_0"
              defaultValue={formData[0].prem}
            />
          </div>
          <div class="col-1">
            <h6>ภาษี</h6>
          </div>
          <div class="col-2">
            <input
              type="number"
              step={0.1}
              name="duty_0"
              defaultValue={formData[0].duty}
            />
          </div>
          <div class="col-1">
            <h6>ค่าแสตมอากรณ์</h6>
          </div>
          <div class="col-2">
            <input
              type="number"
              step={0.1}
              name="stamp_0"
              defaultValue={formData[0].stamp}
            />
          </div>
          <div class="col-1">
            <h6>ค่าเบี้ยรวม</h6>
          </div>
          <div class="col-2">
            <input
              className="col"
              type="number"
              step={0.1}
              name="total_0"
              defaultValue={formData[0].total}

            />
          </div>
        </div>
        // entity table 
        <div class="row">
          <div class="col-1">
            <select
              className="col-md-8"
              name="personType_0"
            >
              <option value={formData[0].personType} selected disabled hidden>{formData[0].personType}</option>
              <option value="P">บุคคล</option>
              <option value="C">นิติบุคคล</option>
            </select>
          </div>
          <div class="col-1">
            <h6>คำนำหน้า</h6>
          </div>
          <div class="col-1">
            <input
              className="col-md-8"
              type="text"
              name="title_0"
              defaultValue={formData[0].title}
            />
          </div>

          <div class="col-1">
            <h6>ชื่อ</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              name="t_fn_0"
              defaultValue={formData[0].t_fn}
            />
          </div>
          <div class="col-1">
            <h6>นามสกุล</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              name="t_ln_0"
              defaultValue={formData[0].t_ln}

            />
          </div>
          <div class="col-1">
            <h6>เลขประจำตัว</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              name="regisNo_0"
              defaultValue={formData[0].regisNo}

            />
          </div>
        </div>
        // location table 
        <div class="row">
          <div class="col-1">
            <h6>บ้านเลขที่</h6>
          </div>
          <div class="col-1">
            <input
              className="col-md-10"
              type="text"
              name="t_location_1_0"
              defaultValue={formData[0].t_location_1}

            />
          </div>
          <div class="col-1">
            <h6>หมู่บ้าน/อาคาร</h6>
          </div>
          <div class="col-1">
            <input
              className="col-md-10"
              type="text"
              name="t_location_2_0"
              defaultValue={formData[0].t_location_2}
            />
          </div>

          <div class="col-1">
            <h6>หมู่</h6>
          </div>
          <div class="col-1">
            <input
              type="text"
              className="col-md-10"
              name="t_location_3_0"
              defaultValue={formData[0].t_location_3}

            />
          </div>
          <div class="col-1">
            <h6>ซอย</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              name="t_location_4_0"
              defaultValue={formData[0].t_location_4}

            />
          </div>
          <div class="col-1">
            <h6>ถนน</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              name="t_location_5_0"
              defaultValue={formData[0].t_location_5}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-1">
            <h6>จังหวัด</h6>
          </div>
          <div class="col-2">
            <input
              className="col"
              type="text"
              defaultValue={formData[0].province}
              name="province_0"

            />
          </div>
          <div class="col-1">
            <h6>อำเภอ</h6>
          </div>
          <div class="col-2">
            <input
              className="col"
              type="text"
              defaultValue={formData[0].distric}
              name="distric_0"

            />
          </div>

          <div class="col-1">
            <h6>ตำบล</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              className="col"
              defaultValue={formData[0].subdistric}
              name="subdistric_0"

            />
          </div>
          <div class="col-1">
            <h6>รหัสไปรษณี</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              defaultValue={formData[0].zipcode}
              name="zipcode_0"

            />
          </div>

        </div>
        //motor table 
        {"Motor" === "Motor" ? (
          <>
            <div class="row">
              <div class="col-1">
                <h6>เลขทะเบียนรถ</h6>
              </div>
              <div class="col-1">
                <input
                  type="text"
                  class="col-md-10"
                  defaultValue={formData[0].carRegisNo}
                  name="carRegisNo_0"
                />
              </div>
              <div class="col-1">
                <h6>ยี่ห้อรถยนต์</h6>
              </div>
              <div class="col-1">
                <input
                  className="col-md-10"
                  type="text"
                  defaultValue={formData[0].brandID}
                  name="brandID_0"
                />
              </div>
              <div class="col-1">
                <h6>รุ่น</h6>
              </div>
              <div class="col-1">
                <input
                  type="text"
                  className="col-md-10"
                  defaultValue={formData[0].modelID}
                  name="modelID_0"
                />
              </div>
              <div class="col-1">
                <h6>เลขตัวถังรถ</h6>
              </div>
              <div class="col-2">
                <input
                  type="text"
                  className="col"
                  defaultValue={formData[0].chassisNo}
                  name="chassisNo_0"
                />
              </div>
              <div class="col-1">
                <h6>ปีที่จดทะเบียน</h6>
              </div>
              <div class="col-2">
                <input
                  type="text"
                  defaultValue={formData[0].carRegisYear}
                  name="carRegisYear_0"
                />
              </div>
            </div>


          </>
        ) : null}
        <div class="row">
          <div class="col-1">
            <h6>เบอร์โทรศัพท์</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              class="col-md-10"
              defaultValue={formData[0].telNum_1}
              name="telNum_1_0"
            />
          </div>
        </div>*/}
        </>


        {/* loop new row */}
        {Array.from({ length: row+1 }, (_, index) => (
          <>
            <h1>กรมธรรม์ฉบับที่ {index + 1}</h1>
            {/* policy table */}
            <div className="row form-group form-inline ">
              
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
              
              <div class="col-2">
              <label class="form-label ">ค่าเบี้ย<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index].prem : null}
                  name={`prem_${index}`}
                  onChange={handleChange}

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
              
              <div class="col-2">
                <label class="form-label ">comm_in%<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index][`commIn%`] : null}
                  name={`commIn%_${index}`}
                  onChange={handleChange}

                />
              </div>
              <div class="col-2">
                <label class="form-label ">จำนวนเงิน<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index].commInamt : null}
                  name={`commInamt_${index}`}
                  onChange={handleChange}
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
                  step={0.1}
                  name={`ovInamt_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].ovInamt : null}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
           
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
                <label class="form-label ">จำนวนเงิน<span class="text-danger"> *</span></label>
                <input
                   className="form-control"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index] !== undefined ? formData[index].commOutamt : null}
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
              <label class="form-label ">จำนวนเงิน<span class="text-danger"> *</span></label>
                <input
                  className="form-control"
                  type="number"
                  step={0.1}
                  name={`ovOutamt_${index}`}
                  defaultValue={formData[index] !== undefined ? formData[index].ovOutamt : null}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* entity table */}
            <div class="row">
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
          </>

        ))}

        <input type="submit" value="create" onClick={(e)=>handleSubmit(e)} />
      </form>
      <div></div>
    </CenterPage>
  );
};

export default UserCarList;
