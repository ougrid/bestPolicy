import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { CenterPage } from "../StylesPages/AdminStyles";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigation,
} from "react-router-dom";
import {
  Header,
  input,
  LoginBtn,
  BackdropBox1,
} from "../StylesPages/LoginStyles";
import { useCookies } from "react-cookie";

const config = require("../../config.json");

const NormalText = {
  color: "white",
  paddingBottom: "10px",
};
/* eslint-disable react-hooks/exhaustive-deps */

const Agent = () => {
  const [cookies] = useCookies(["jwt"]);
  const headers = {
    headers: { Authorization: `Bearer ${cookies["jwt"]}` }
};
  const url = window.globalConfig.BEST_POLICY_V1_BASE_URL;
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState({ entityID: null });
  const [entityData, setEntityData] = useState({ personType: "P" });
  const [locationData, setLocationData] = useState({ entityID: null, locationType: 'A' });
  const [row, setRow] = useState(0);
  const [comOvOutData, setComOvOutData] = useState([]);
  // dropdown
  const [provinceDD, setProvinceDD] = useState([])
  const [districDD, setDistricDD] = useState([])
  const [subDistricDD, setSubDistricDD] = useState([])
  const [zipcodeDD, setZipCodeDD] = useState([])
  const [titleDD, setTitleDD] = useState([])
  const [insureTypeDD, setInsureTypeDD] = useState([])
  const [insurerDD, setInsurerDD] = useState([]);

  useEffect(() => {
    //get province
    axios
      .get(url + "/static/provinces/all", headers)
      .then((province) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);

        const array = []
        province.data.forEach(ele => {
          array.push(<option key={ele.provinceid} value={ele.provinceid}>{ele.t_provincename}</option>)
        });
        setProvinceDD(array)

        axios
          .get(url + "/static/titles/person/all", headers)
          .then((title) => {
            const array2 = []
            title.data.forEach(ele => {
              array2.push(
              // <option key={ele.TITLEID} value={ele.TITLEID}>{ele.TITLETHAIBEGIN}</option>
              {label: ele.TITLETHAIBEGIN, value: ele.TITLEID})
            });
            setTitleDD(array2)
          })
          .catch((err) => {

            // alert("cant get company");

          });
      })
      .catch((err) => {

        // alert("cant get province");

      });
    // get title all of company type

    // get all insuretype
    axios
            .get(url + "/insures/insuretypeall", headers)
            .then((province) => {
                // let token = res.data.jwt;
                // let decode = jwt_decode(token);
                // navigate("/");
                // window.location.reload();
                // localStorage.setItem("jwt", token);

                const array = []
                province.data.forEach(ele => {
                    array.push(<option key={ele.id} value={ele.id}>{ele.class} : {ele.subClass}</option>)
                });
                setInsureTypeDD(array)

            })
            .catch((err) => {

                // alert("cant get province");

            });

    // get all insurer
    axios
    .get(url + "/persons/insurerall", headers)
    .then((insurer) => {
        

        const array = []
        insurer.data.forEach(ele => {
            array.push(<option key={ele.id} value={ele.insurerCode}>{ele.t_ogName}</option>)
        });
        setInsurerDD(array)

    })
    .catch((err) => {

        // alert("cant get province");

    });

  }, []);

  const changeComOv = (e) => {
    // console.log(entityData);
    const index = e.target.name.split('-')[1];
    const name = e.target.name.split('-')[0];
    const data = {...comOvOutData[index], [name] : e.target.value }
    comOvOutData[index]= data
    setComOvOutData (comOvOutData);
};

  const changeAgent = (e) => {
    setAgentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeEntity = (e) => {
    e.preventDefault()
    setEntityData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === 'personType') {
      if (e.target.value === 'P') {
       
          axios
          .get(url + "/static/titles/person/all", headers)
          .then((title) => {
            const array2 = []
            title.data.forEach(ele => {
              array2.push(
              // <option key={ele.TITLEID} value={ele.TITLEID}>{ele.TITLETHAIBEGIN}</option>
              {label: ele.TITLETHAIBEGIN, value: ele.TITLEID})
            });
            setTitleDD(array2)
          })
          .catch((err) => {

            // alert("cant get company");

          });
      }else{
        axios
          .get(url + "/static/titles/company/all", headers)
          .then((title) => {
            const array2 = []
            title.data.forEach(ele => {
              array2.push(
              {label: ele.TITLETHAIBEGIN, value: ele.TITLEID}
              )
            });
            setTitleDD(array2)
          })
          .catch((err) => {

            // alert("cant get company");

          });
      }
     
    }
    
  };

  const changeLocation = (e) => {
    setLocationData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === 'provinceID') {
      getDistrict(e.target.value)
    } else if ((e.target.name === 'districtID')) {
      getSubDistrict(e.target.value)
    };
  }

  const getDistrict = (provinceID) => {
    //get distric in province selected
    axios
      .get(url + "/static/amphurs/" + provinceID, headers)
      .then((distric) => {
        const array = []
        distric.data.forEach(ele => {
          array.push(<option key={ele.amphurid} value={ele.amphurid}>{ele.t_amphurname}</option>)
        });
        setDistricDD(array)
      })
      .catch((err) => {

        // alert("cant get aumphur");

      });
  }


  const getSubDistrict = (districID) => {
    //get tambons in distric selected
    axios
      .get(url + "/static/tambons/" + districID, headers)
      .then((subdistric) => {
        const arraySub = []
        const arrayZip = []
        const zip = []
        subdistric.data.forEach(ele => {
          arraySub.push(<option key={ele.tambonid} value={ele.tambonid}>{ele.t_tambonname}</option>)
          zip.push(ele.postcodeall.split("/"))
        });
        const uniqueZip = [...new Set(...zip)];
        console.log(uniqueZip);
        uniqueZip.forEach(zip => { arrayZip.push(<option value={zip}>{zip}</option>) })
        setSubDistricDD(arraySub)
        setZipCodeDD(arrayZip)
      })
      .catch((err) => {

        // alert("cant get tambons");

      });
  }

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

  const handleSubmit = (e) => {
    e.preventDefault({
      agent: agentData,
      entity: entityData,
      location: locationData,
      commOVOut:comOvOutData
    });
    console.log({
      agent: agentData,
      entity: entityData,
      location: locationData,
      commOVOut:comOvOutData
    });
    axios
      .post(url + "/persons/agentnew", {
        agent: agentData,
        entity: entityData,
        location: locationData,
        commOVOut:comOvOutData
      }, headers)
      .then((res) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);
        console.log(res.data);
        alert("create new insuree success")
      })
      .catch((err) => {

        alert("create new insuree fail");

      });
  };

  return (
    <CenterPage>
      {/* <BackdropBox1> */}
      <form  onSubmit={handleSubmit}>
        {/* insurer table */}
        <h1 className="text-center" >ผู้แนะนำ</h1>
        <div class="row form-group form-inline">
        <div class="col-1 "></div>
          <div class="col-2">
                <label class="form-label ">รหัสผู้แนะนำ<span class="text-danger"> *</span></label>
            <input
                className="form-control"
              type="text"
              required
              // placeholder="InsurerCode"
              name="agentCode"
              onChange={changeAgent}
            />
          </div>
          <div class="col-2">
                <label class="form-label ">Statement Type<span class="text-danger"> *</span></label>
                <select
                  className="form-control"
                  name={`stamentType`}
                  onChange={changeAgent}
                >
                  <option selected value="Net">Net</option>
                  <option value="Gross">Gross</option>
                </select>
              </div>
              <div class="col-2">
                <label class="form-label ">เครดิตเทอมค่าเบี้ย <span class="text-danger"> *</span></label>
            <input
                className="form-control"
              type="number"
              required
              // placeholder="InsurerCode"
              name="premCreditT"
              onChange={changeAgent}
            />
          </div>
          <div class="col-2">
                <label class="form-label ">เครดิตเทอมค่าcomm/ov <span class="text-danger"> *</span></label>
            <input
                className="form-control"
              type="number"
              required
              // placeholder="InsurerCode"
              name="commovCreditT"
              onChange={changeAgent}
            />
          </div>
          <div class="col-2">
                <label class="form-label ">เลขที่ใบอนุญาต Sub-Broker <span class="text-danger"> *</span></label>
            <input
                className="form-control"
              type="text"
              required
              // placeholder="InsurerCode"
              name="licentNo"
              onChange={changeAgent}
            />
          </div>
         
        </div>

        {/* entity table */}
        <div class="row">
        <div class="col-1 "></div>
        <div class="col-1">
              <label class="form-label ">type<span class="text-danger"> *</span></label>
                <select
                  className="form-control "
                  name={`personType`}
                  onChange={changeEntity}
                >
                  <option selected value="P">บุคคล</option>
                  <option value="O">นิติบุคคล</option>
                </select>
              </div>
              <div class="col-1"></div>
              {entityData.personType === 'P'?
               <>
               <div class="col-2">
                     <label class="form-label ">คำนำหน้า<span class="text-danger"> *</span></label>
                     <Select
          // className="form-control"
          name={`title`}
          onChange={ (e) =>setEntityData((prevState) => ({
            ...prevState,
            titleID: e.value,
          }))}
          options={titleDD}
          />
        
                 
               </div>
               <div class="col-2">
                     <label class="form-label ">ชื่อ<span class="text-danger"> *</span></label>
                 <input
                     className="form-control"
                   type="text"
                   name="t_firstName"
                   onChange={changeEntity}
                 />
               </div>
               <div class="col-2">
                     <label class="form-label ">นามสกุล<span class="text-danger"> *</span></label>
                 <input
                     className="form-control"
                   type="text"
                   name="t_lastName"
                   onChange={changeEntity}
                 />
               </div>
               </> 
               :<>
               <div class="col-2">
                     <label class="form-label ">คำนำหน้า<span class="text-danger"> *</span></label>
                     <Select
          // className="form-control"
          name={`title`}
          onChange={ (e) =>setEntityData((prevState) => ({
            ...prevState,
            titleID: e.value,
          }))}
          options={titleDD}
          />
               </div>
               <div class="col-2">
                     <label class="form-label ">ชื่อ<span class="text-danger"> *</span></label>
                 <input
                     className="form-control"
                   type="text"
                   name="t_ogName"
                   onChange={changeEntity}
                 />
               </div>
               
               </> }
         
          
        </div>

        <div class="row">
          <div class="col-1 "></div>
          <div class="col-2">
            <label class="form-label ">
              ประเภทภาษีหัก ณ ที่จ่าย
            </label>
            <select 
                className="form-control" name="provinceID" onChange={changeAgent}>
              <option value="" selected disabled hidden></option>
              <option value="" >ภาษีเงินได้หัก ณ ที่จ่าย (เงินเดือน/เบี้ยประชุม/ค่านายหน้า)</option>
              <option value="" >ภาษีหัก ณ ที่จ่่าย นิติบุคคล (ปันผล)</option>
              <option value="" >ภาษีหัก ณ ที่จ่าย บุคคลธรรมดา</option>
              <option value="" >ภาษีหัก ณ ที่จ่าย นิติบุคคล</option>
              <option value="" >ภาษีหัก ณ ที่จ่าย มาตรา70</option>
              
            </select>
          </div>
          
          <div class="col-2">
            <label class="form-label ">
              อัตราภาษีหัก ณ ที่จ่าย
            </label>
            <input
              className="form-control"
              type='number'
              name="deducttaxrate"
              onChange={changeAgent}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              เลขที่จดทะเบียน
            </label>
            <input
              className="form-control"
              type="text"
              name="taxno"
              onChange={changeAgent}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              อยู่ในระบบ VAT หรือไม่
            </label>
            <select 
                className="form-control" name="vatflag" onChange={changeAgent}>
              <option value="" selected disabled hidden></option>
              <option value={true} >อยู่</option>
              <option value={false} >ไม่อยู่</option>
              
              
            </select>
            {/* <input
              type="checkbox"
              name="vatflag"
              onChange={(e) =>
                setAgentData({ ...agentData, vatflag: e.target.checked })
              }
            /> */}
          </div>
        </div>

        {/* location table */}
        <div class="row">
          <h5 className="text-center" >Location</h5>
        </div>

        <div class="row">
        <div class="col-1 "></div>
          <div class="col-2">
                <label class="form-label ">บ้านเลขที่<span class="text-danger"> *</span></label>
            <input
                className="form-control"
              type="text"
              name="t_location_1"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
                <label class="form-label ">หมู่บ้านอาคาร<span class="text-danger"> *</span></label>
            <input
                className="form-control"
              type="text"
              name="t_location_2"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
                <label class="form-label ">หมู่<span class="text-danger"> *</span></label>
            <input
                className="form-control"
              type="text"
              name="t_location_3"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
                <label class="form-label ">ซอย<span class="text-danger"> *</span></label>
            <input
                className="form-control"
              type="text"
              name="t_location_4"
              onChange={changeLocation}
            />
          </div>
        </div>

        <div class="row">
        <div class="col-1 "></div>
          <div class="col-2">
                <label class="form-label ">ถนน<span class="text-danger"> *</span></label>
            <input
                className="form-control"
              type="text"
              name="t_location_5"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
                <label class="form-label ">จังหวัด<span class="text-danger"> *</span></label>
            <select 
                className="form-control" name="provinceID" onChange={changeLocation}>
              <option value="" selected disabled hidden>เลือกจังหวัด</option>
              {provinceDD}
            </select>
          </div>
          <div class="col-2">
                <label class="form-label ">อำเภอ<span class="text-danger"> *</span></label>
            <select className="form-control" name="districtID" onChange={changeLocation}>
              <option value="" selected disabled hidden>เลือกอำเภอ</option>
              {districDD}
            </select>
          </div>
          <div class="col-2">
                <label class="form-label ">ตำบล<span class="text-danger"> *</span></label>
            <select className="form-control" name="subDistrictID" onChange={changeLocation}>
              <option value="" selected disabled hidden>เลือกตำบล</option>
              {subDistricDD}
            </select>
          </div>
        </div>

        <div class="row">
        <div class="col-1 "></div>
          <div class="col-2">
                <label class="form-label ">รหัสไปรษณีย์<span class="text-danger"> *</span></label>
            <select className="form-control" name="zipcode" onChange={changeLocation}>
              <option value="" selected disabled hidden>เลือกรหัสไปรษณีย์</option>
              {zipcodeDD}
            </select>
          </div>
          <div class="col-2">
                <label class="form-label ">Email<span class="text-danger"> *</span></label>
            <input
            className="form-control"
              type="text"
              name="email"
              onChange={changeEntity}
            />
          </div>
          <div class="col-2">
                <label class="form-label ">เบอร์มือถือ<span class="text-danger"> *</span></label>
            <input
            className="form-control"
              type="text"
              name="telNum_2"
              onChange={changeLocation}
            />
          </div>
         
          <div class="col-2">
                <label class="form-label ">เบอร์โทรศัพท์<span class="text-danger"> *</span></label>
            <input
            className="form-control"
              type="text"
              name="telNum_1"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
                <label class="form-label ">เบอร์โทรสาร<span class="text-danger"> *</span></label>
            <input
            className="form-control"
              type="text"
              name="telNum_3"
              onChange={changeLocation}
            />
          </div>
        </div>

         {/* commission-ov-in table */}
         <div class="d-flex  justify-content-center">
          <div class="col-3">
            <h3>commission OV OUT</h3>
          </div>
          <div class="col-2">
            <button onClick={newRow}>add</button>

            <button onClick={removeRow}>Remove</button>
          </div>
        </div>

        <div class="row">
        <div class="col-2"></div> 
          <div class="col-2">
            <label class="col-form-label">InsureType</label>
          </div>
          <div class="col-2">
            <label class="col-form-label">บริษัทรับประกัน</label>
          </div>
          <div class="col-2">
            <label class="col-form-label">Comm-out %</label>
          </div>
          <div class="col-2">
            <label class="col-form-label">OV-out %</label>
          </div>
        </div>
                
                            {/* <form
                                method="POST"
                                id={"policyadd"}
                            //   onSubmit={(e) => handleCreate(e)}
                            ></form> */}

                            {Array.from({ length: row+1 }, (_, index) => (
                                <div class="row">
                                <div class="col-2"></div> 
                                <div class="col-2">
                                        <select   class="form-control" name={`insureID-${index}`} onChange={changeComOv } key = {index}>
                                        <option disabled selected hidden>class:subclass</option>
                                            {insureTypeDD}
                                        </select>
                                        </div>
                                        <div class="col-2">
                                        <select  class="form-control" name={`insurerCode-${index}`}onChange={changeComOv } key = {index}>
                                        <option disabled selected hidden>บริษัทรับประกัน</option>
                                            {insurerDD}
                                        </select>
                                        </div>
                                    <div class="col-2">
                                        <input  class="form-control" type="text"  name={`rateComOut-${index}`} onChange={changeComOv } key = {index} />
                                        </div>
                                    <div class="col-2">
                                    <input  class="form-control" type="text"  name={`rateOVOut_1-${index}`} onChange={changeComOv } key = {index}/>
                                    </div>


                                </div>
                            ))}

<div className="d-flex justify-content-center">
        <LoginBtn className="text-center" type="submit">Submit</LoginBtn>
  </div>       

      </form>

      {/* <Link to="/signup" style={NormalText}>
          First time here ? Let's sign up
        </Link> */}
      {/* </BackdropBox1> */}
    </CenterPage>
  );
};

export default Agent;
