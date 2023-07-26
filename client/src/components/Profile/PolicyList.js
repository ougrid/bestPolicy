import axios from "axios";
import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";
import { CenterPage } from "../StylesPages/AdminStyles";
import { Container } from "../StylesPages/PagesLayout";
const config = require("../../config.json");

const UserCarList = (props) => {
  const url = config.url;
  const [row, setRow] = useState(1);
  //import excel
  const [formData, setFormData] = useState([{
    policyNo: null,
    actDate: null,
    expDate: null,
    insurerCode: null,
    agentCode: null,
    insureType: null,
    insureID: null,
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

  // const [cars, setCars] = useState([]);
  // const [carTypes, setCarType] = useState(config.carType);
  // const [carTypeList, setCarTypeList] =useState([])

  // useEffect(() => {
  //   axios.get(url + "/cars").then((res) => {
  //     setCars(res.data);
  //   });
  // }, []);

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


  const handleEdit = (e) => {
    e.preventDefault();

    const data = {
      id: e.target.elements.id.value,
      user_id: e.target.elements.user_id.value,
      plate_number: e.target.elements.plate_number.value,
      brand: e.target.elements.brand.value,
      model: e.target.elements.model.value,
      year: e.target.elements.year.value,
      type: e.target.elements.type.value,
    };
    axios.put(url + "/cars/" + data.id, data).then((res) => {
      alert("Car edited");
      window.location.reload(false);
    });
  };

  const handleDelete = (e) => {
    axios.delete(url + "/cars/" + e.target.id).then((res) => {
      alert("Car deleted");
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
  const handleCreate = (e) => {
    e.preventDefault();
    const array = []
    for (let i = 0; i <= row; i++) {
      let t_og = null
      let t_fn = null
      let t_ln = null
      let idCardNo = null
      let idCardType = null
      let taxNo = null
      if (e.target.elements[`personType_${i}`].value === 'C') {
        t_og = e.target.elements[`t_fn_${i}`].value
        taxNo = e.target.elements[`regisNo_${i}`].value
      } else {
        idCardType = 'idcard'
        idCardNo = e.target.elements[`regisNo_${i}`].value
        t_fn = e.target.elements[`t_fn_${i}`].value
        t_ln = e.target.elements[`t_ln_${i}`].value
      }

      const data = {
        policyNo: e.target.elements[`policyNo_${i}`].value,
        actDate: e.target.elements[`actDate_${i}`].value,
        expDate: e.target.elements[`expDate_${i}`].value,
        insurerName: e.target.elements[`insurerCode_${i}`].value,
        agentCode: e.target.elements[`agentCode_${i}`].value,
        insureType: e.target.elements[`insureType_${i}`].value,
        insureName: e.target.elements[`insureID_${i}`].value,
        prem: e.target.elements[`prem_${i}`].value,
        duty: e.target.elements[`duty_${i}`].value,
        stamp: e.target.elements[`stamp_${i}`].value,
        total: e.target.elements[`total_${i}`].value,
        personType: e.target.elements[`personType_${i}`].value,
        title: e.target.elements[`title_${i}`].value,
        t_ogName: t_og,
        t_firstName: t_fn,
        t_lastName: t_ln,
        idCardType: idCardType,
        idCardNo: idCardNo,
        taxNo: taxNo,
        t_location_1: e.target.elements[`t_location_1_${i}`].value,
        t_location_2: e.target.elements[`t_location_2_${i}`].value,
        t_location_3: e.target.elements[`t_location_3_${i}`].value,
        t_location_4: e.target.elements[`t_location_4_${i}`].value,
        t_location_5: e.target.elements[`t_location_5_${i}`].value,

        province: e.target.elements[`province_${i}`].value,
        distric: e.target.elements[`distric_${i}`].value,
        subdistric: e.target.elements[`subdistric_${i}`].value,
        zipcode: e.target.elements[`zipcode_${i}`].value,
        carRegisNo: e.target.elements[`carRegisNo_${i}`].value,
        brandID: e.target.elements[`brandID_${i}`].value,
        modelID: e.target.elements[`modelID_${i}`].value,
        chassisNo: e.target.elements[`chassisNo_${i}`].value,
        carRegisYear: e.target.elements[`carRegisYear_${i}`].value,
        telNum_1: e.target.elements[`telNum_1_${i}`].value,


      };
      array.push(data)
    }
    console.log(array);
    exportToJsonFile(array)
    // axios.post(url + "/cars/", data).then((res) => {
    //   alert("Car Created");
    //   window.location.reload(false);
    // });
  };

  const newRow = (e) => {
    e.preventDefault();
    setRow(row + 1);

  };
  const removeRow = (e) => {
    e.preventDefault();
    if (row > 0) {
      setRow(row - 1);

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
      {/* <input type="text" form={"policyadd"} name="brand" />
      <button onClick={removeRow} >import EXCEL</button> */}

      <input type="file" id="fileInput" onChange={(e) => handleFileChange(e)} />
      {/* <label htmlFor="fileInput">
        <button >Import Excel</button>

      </label> */}
      {/* <table>
        <thead>
          <tr>
            <th>class</th>
            <th>subclass</th>
            <th>เลขกรมธรรม์</th>
            <th>(P/C)</th>
            <th>คำนำหน้า</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>id/taxNo</th>
            <th>วันเริ่ม</th>
            <th>วันสิ้นสุด</th>
            <th>บ้านเลขที่</th>
            <th>หมู่บ้าน/อาคาร</th>
            <th>หมู่</th>
            <th>ซอย</th>
            <th>ถนน</th>
            <th>จังหวัด</th>
            <th>อำเภอ</th>
            <th>ตำบล</th>
            <th>รหัสไปรษณี</th>
            <th>เบอร์โทร</th>
            <th>ทะเบียน</th>
            <th>ยี่ห้อ</th>
            <th>รุ่น</th>
            <th>Model</th>
            <th>ปีจดทะเบียน</th>
            <th>เลขตัวถัง</th>
          
          </tr>
        </thead>
        <tbody>
          {carsElement}
          <>
            <form
              method="POST"
              id={"policyadd"}
              onSubmit={(e) => handleCreate(e)}
            ></form>

          {Array.from({ length: row }, (_, index) => (
            <tr>
              <td>
              <select form={"policyadd"} name="type">
                  {classList}
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  {subClassList}
                </select>
              </td>
              <td>
                <input type="text" form={"policyadd"} name="brand" />
              </td>
              <td>
                <select form={"policyadd"} name="type">
                  <option value="P">Person</option>
                  <option value="C">Company</option>
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">นาย</option>
                  <option value="M">ดช.</option>
                  <option value="M">ดญ.</option>
                  <option value="F">นาง</option>
                  <option value="F">นางสาว</option>
                </select>
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
              <input type="text" form={"policyadd"} name="year" />
             
              </td>
              <td>
              <input type="date" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="date" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>

              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">กรุงเทพ</option>
                  <option value="M">สมุทรปราการ</option>
                  <option value="M">นนทบุรี</option>
                  <option value="F">ปทุมธานี</option>
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">บางเขน</option>
                  <option value="M">อำเภอ</option>
                  
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">ตำบลนะจ๊ะ</option>
                  
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">zipcode</option>
                  
                </select>
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">toyota</option>
                  <option value="M">maxda</option>
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">city</option>
                  <option value="M">civic</option>
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">x</option>
                  <option value="M">2</option>
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">2023</option>
                  <option value="M">2022</option>
                  <option value="M">2021</option>
                  <option value="M">2020</option>
                </select>
              </td>
              <td>
              <input type="text" form={"policyadd"} name="year" />
              </td>
            </tr>
          ))}

          </>
        </tbody>
      </table> */}
      <form className="container-fluid" method="POST"
        id="policyList"
        onSubmit={(e) => handleCreate(e)}>
        <h1>กรมธรรม์ฉบับที่ 1</h1>
        {/* policy table */}
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
            {/* null */}
          </div>

        </div>

        <div class="row">

          <div class="col-1">
            <h6>บริษัทรับประกัน</h6>
          </div>
          <div class="col-2">
            <input
              type="text"
              defaultValue={formData[0].insurerCode}
              name="insurerCode_0"

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
              defaultValue={formData[0].insureID}
              name="insureID_0"

            />
          </div>
        </div>
        {/* policy table */}


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
        {/* entity table */}
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
        {/* location table */}
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
        {/* motor table */}
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
        </div>



        {/* loop new row */}
        {Array.from({ length: row }, (_, index) => (
          <>
            <h1>กรมธรรม์ฉบับที่ {index + 2}</h1>
            {/* policy table */}
            <div class="row justify-content-start">
              <div class="col-1 ">
                <h6>เลขที่กรมธรรม์</h6>
              </div>
              <div class="col-2">
                <input
                  className="col"
                  type="text"
                  defaultValue={formData[index + 1] !== undefined ?formData[index + 1].policyNo :null }
                  name={`policyNo_${index + 1}`}
                />
              </div>
              <div class="col-1">
                <h6>วันที่เริ่มคุ้มครอง</h6>
              </div>
              <div class="col-2">
                <input
                  className="col"
                  type="date"
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].actDate: null}
                  name={`actDate_${index + 1}`}
                />
              </div>
              <div class="col-1">
                <h6>วันที่สิ้นสุด</h6>
              </div>
              <div class="col-2">
                <input
                  type="date"
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].expDate :null}
                  name={`expDate_${index + 1}`}
                />
              </div>
              <div class="col-3">
                {/* null */}
              </div>

            </div>

            <div class="row">
              <div class="col-1">
                <h6>บริษัทรับประกัน</h6>
              </div>
              <div class="col-2">
                <input
                  type="text"
                  defaultValue={formData[index + 1] !== undefined? formData[index + 1].insurerCode:null}
                  name={`insurerCode_${index + 1}`}
                />
              </div>
              <div class="col-1">
                <h6>รหัสนายหน้า</h6>
              </div>
              <div class="col-2">
                <input
                  className="col-md-4"
                  type="text"
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].agentCode :null}
                  name={`agentCode_${index + 1}`}
                />
              </div>

              <div class="col-1">
                <h6>ประเภทประกัน</h6>
              </div>
              <div class="col-2">
                <select
                  className="col-md-8"
                  name={`insureType_${index + 1}`}

                > 
                <option value={formData[index + 1] !== undefined ? formData[index + 1].insureType: null} selected disabled hidden>{formData[index + 1] !== undefined ? formData[index + 1].insureType: null}</option>
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
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].insureID: null}
                  name={`insureID_${index + 1}`}

                />
              </div>
            </div>
            {/* policy table */}


            <div class="row">
              <div class="col-1">
                <h6>ค่าเบี้ย</h6>
              </div>
              <div class="col-2">
                <input
                  className="col"
                  type="number"
                  step={0.1}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].prem : null}
                  name={`prem_${index + 1}`}

                />
              </div>
              <div class="col-1">
                <h6>ภาษี</h6>
              </div>
              <div class="col-2">
                <input
                  type="number"
                  step={0.1}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].duty : null}
                  name={`duty_${index + 1}`}
                />
              </div>
              <div class="col-1">
                <h6>ค่าแสตมอากรณ์</h6>
              </div>
              <div class="col-2">
                <input
                  type="number"
                  step={0.1}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].stamp : null}
                  name={`stamp_${index + 1}`}
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
                  name={`total_${index + 1}`}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].total : null}
                />
              </div>
            </div>
            {/* entity table */}
            <div class="row">
              <div class="col-1">
                <select
                  className="col-md-8"
                  name={`personType_${index + 1}`}
                >
                  <option value={formData[index + 1] !== undefined ? formData[index + 1].personType : null} disabled selected hidden>{formData[index + 1] !== undefined ? formData[index + 1].personType : null}</option>
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
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].title : null}
                  name={`title_${index + 1}`}
                />
              </div>

              <div class="col-1">
                <h6>ชื่อ</h6>
              </div>
              <div class="col-2">
                <input
                  type="text"
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].t_fn : null}
                  name={`t_fn_${index + 1}`}
                />
              </div>
              <div class="col-1">
                <h6>นามสกุล</h6>
              </div>
              <div class="col-2">
                <input
                  type="text"
                  defaultValue={formData[index + 1] !== undefined? formData[index + 1].t_ln : null}
                  name={`t_ln_${index + 1}`}
                />
              </div>
              <div class="col-1">
                <h6>เลขประจำตัว</h6>
              </div>
              <div class="col-2">
                <input
                  type="text"
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].regisNo : null}
                  name={`regisNo_${index + 1}`}
                />
              </div>
            </div>
            {/* location table */}
            <div class="row">
              <div class="col-1">
                <h6>บ้านเลขที่</h6>
              </div>
              <div class="col-1">
                <input
                  className="col-md-10"
                  type="text"
                  name={`t_location_1_${index + 1}`}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].t_location_1 : null}
                />
              </div>
              <div class="col-1">
                <h6>หมู่บ้าน/อาคาร</h6>
              </div>
              <div class="col-1">
                <input
                  className="col-md-10"
                  type="text"
                  name={`t_location_2_${index + 1}`}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].t_location_2 : null}
                />
              </div>

              <div class="col-1">
                <h6>หมู่</h6>
              </div>
              <div class="col-1">
                <input
                  type="text"
                  className="col-md-10"
                  name={`t_location_3_${index + 1}`}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].t_location_3 : null}
                />
              </div>
              <div class="col-1">
                <h6>ซอย</h6>
              </div>
              <div class="col-2">
                <input
                  type="text"
                  name={`t_location_4_${index + 1}`}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].t_location_4 : null}
                />
              </div>
              <div class="col-1">
                <h6>ถนน</h6>
              </div>
              <div class="col-2">
                <input
                  type="text"
                  name={`t_location_5_${index + 1}`}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].t_location_5 : null}
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
                  name={`province_${index + 1}`}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].province : null}
                />
              </div>
              <div class="col-1">
                <h6>อำเภอ</h6>
              </div>
              <div class="col-2">
                <input
                  className="col"
                  type="text"
                  name={`distric_${index + 1}`}
                  defaultValue={formData[index + 1] !== undefined? formData[index + 1].distric : null}
                />
              </div>

              <div class="col-1">
                <h6>ตำบล</h6>
              </div>
              <div class="col-2">
                <input
                  type="text"
                  className="col"
                  name={`subdistric_${index + 1}`}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].subdistric : null}
                />
              </div>
              <div class="col-1">
                <h6>รหัสไปรษณี</h6>
              </div>
              <div class="col-2">
                <input
                  type="text"
                  name={`zipcode_${index + 1}`}
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].zipcode : null}
                />
              </div>

            </div>
            {/* motor table */}
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
                      name={`carRegisNo_${index + 1}`}
                      defaultValue={formData[index + 1] !== undefined ? formData[index + 1].carRegisNo : null}
                    />
                  </div>
                  <div class="col-1">
                    <h6>ยี่ห้อรถยนต์</h6>
                  </div>
                  <div class="col-1">
                    <input
                      className="col-md-10"
                      type="text"
                      name={`brandID_${index + 1}`}
                      defaultValue={formData[index + 1] !== undefined? formData[index + 1].brandID : null}
                    />
                  </div>
                  <div class="col-1">
                    <h6>รุ่น</h6>
                  </div>
                  <div class="col-1">
                    <input
                      type="text"
                      className="col-md-10"
                      name={`modelID_${index + 1}`}
                      defaultValue={formData[index + 1] !== undefined ? formData[index + 1].modelID : null}
                    />
                  </div>
                  <div class="col-1">
                    <h6>เลขตัวถังรถ</h6>
                  </div>
                  <div class="col-2">
                    <input
                      type="text"
                      className="col"
                      name={`chassisNo_${index + 1}`}
                      defaultValue={formData[index + 1] !== undefined ? formData[index + 1].chassisNo : null}
                    />
                  </div>
                  <div class="col-1">
                    <h6>ปีที่จดทะเบียน</h6>
                  </div>
                  <div class="col-2">
                    <input
                      type="text"
                      defaultValue={formData[index + 1] !== undefined ? formData[index + 1].carRegisYear : null}
                      name={`carRegisYear_${index + 1}`}
                    
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
                  defaultValue={formData[index + 1] !== undefined ? formData[index + 1].telNum_1 : null}
                  name={`telNum_1_${index + 1}`}
                />
              </div>
            </div>
          </>

        ))}


        {/* commov in */}
        {/* <h3>commision ov in</h3>
        <div class="row">
          <div class="col">
            <h6>ค่าคอมมิสชั่น</h6>
          </div>
          <div class="col">
            <input
              className="col-md-4"
              type="number"
              step={0.1}
              // placeholder="InsurerCode"
              name="amountComIn"
             
            />
          </div>
          <div class="col">
            <h6>ภาษี</h6>
          </div>
          <div class="col">
            <input
              type="number"
              step={0.1}
              // placeholder="Password"
              name="duty"
             
            />
          </div>
          <div class="col">
            <h6>ค่าแสตมอากรณ์</h6>
          </div>
          <div class="col">
            <input
              type="number"
              step={0.1}
              // placeholder="Password"
              name="stamp"
             
            />
          </div>
        </div> */}


        {/* commov out */}
        {/* <h3>commision ov in</h3>
        <div class="row">
          <div class="col">
            <h6>ค่าคอมมิสชั่น</h6>
          </div>
          <div class="col">
            <input
              className="col-md-4"
              type="number"
              step={0.1}
              // placeholder="InsurerCode"
              name="prem"
             
            />
          </div>
          <div class="col">
            <h6>ภาษี</h6>
          </div>
          <div class="col">
            <input
              type="number"
              step={0.1}
              // placeholder="Password"
              name="duty"
             
            />
          </div>
          <div class="col">
            <h6>ค่าแสตมอากรณ์</h6>
          </div>
          <div class="col">
            <input
              type="number"
              step={0.1}
              // placeholder="Password"
              name="stamp"
             
            />
          </div>
        </div> */}


        <input type="submit" value="create" />
      </form>
      <div></div>
    </CenterPage>
  );
};

export default UserCarList;
