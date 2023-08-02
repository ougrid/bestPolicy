import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const Agent = () => {
  const url = config.url;
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState({ entityID: null });
  const [entityData, setEntityData] = useState({ personType: "P" });
  const [locationData, setLocationData] = useState({ entityID: null, locationType: 'A' });
  const [row, setRow] = useState(0);
  const [comOvInData, setComOvInData] = useState([]);
  // dropdown
  const [provinceDD, setProvinceDD] = useState([])
  const [districDD, setDistricDD] = useState([])
  const [subDistricDD, setSubDistricDD] = useState([])
  const [zipcodeDD, setZipCodeDD] = useState([])
  const [titleDD, setTitleDD] = useState([])
  const [insureTypeDD, setInsureTypeDD] = useState([])

  useEffect(() => {
    //get province
    axios
      .get(url + "/static/provinces/all")
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
          .get(url + "/static/titles/person/all")
          .then((title) => {
            const array2 = []
            title.data.forEach(ele => {
              array2.push(<option key={ele.TITLEID} value={ele.TITLEID}>{ele.TITLETHAIBEGIN}</option>)
            });
            setTitleDD(array2)
          })
          .catch((err) => {

            alert("cant get company");

          });
      })
      .catch((err) => {

        alert("cant get province");

      });
    // get title all of company type

    // get all insuretype
    axios
            .get(url + "/insures/insuretypeall")
            .then((province) => {
                // let token = res.data.jwt;
                // let decode = jwt_decode(token);
                // navigate("/");
                // window.location.reload();
                // localStorage.setItem("jwt", token);

                const array = []
                province.data.forEach(ele => {
                    array.push(<option key={ele.id} value={ele.id}>{ele.insureType} : {ele.class}</option>)
                });
                setInsureTypeDD(array)

            })
            .catch((err) => {

                alert("cant get province");

            });

             // get all insuretype
    axios
    .get(url + "/insures/insuretypeall")
    .then((province) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);

        const array = []
        province.data.forEach(ele => {
            array.push(<option key={ele.id} value={ele.id}>{ele.insureType} : {ele.class}</option>)
        });
        setInsureTypeDD(array)

    })
    .catch((err) => {

        alert("cant get province");

    });

  }, []);

  const changeComOv = (e) => {
    // console.log(entityData);
    const index = e.target.key
    const data = {...comOvInData[index], [e.target.name] : e.target.value }
    comOvInData[index]= data
    setComOvInData (comOvInData);
};

  const changeAgent = (e) => {
    setAgentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeEntity = (e) => {
    setEntityData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
      .get(url + "/static/amphurs/" + provinceID)
      .then((distric) => {
        const array = []
        distric.data.forEach(ele => {
          array.push(<option key={ele.amphurid} value={ele.amphurid}>{ele.t_amphurname}</option>)
        });
        setDistricDD(array)
      })
      .catch((err) => {

        alert("cant get aumphur");

      });
  }


  const getSubDistrict = (districID) => {
    //get tambons in distric selected
    axios
      .get(url + "/static/tambons/" + districID)
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

        alert("cant get tambons");

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
    e.preventDefault();
    axios
      .post(url + "/persons/agentnew", {
        agent: agentData,
        entity: entityData,
        location: locationData,
      })
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
    <>
      {/* <BackdropBox1> */}
      <form className="container text-center" onSubmit={handleSubmit}>
        {/* insurer table */}
        <h1>ตัวแทนนายหน้า</h1>
        <div class="row">
          <div class="col">
            <h6>AgentCode</h6>
          </div>
          <div class="col">
            <InputBtn
              className="col-md-4"
              type="text"
              required
              // placeholder="InsurerCode"
              name="agentCode"
              onChange={changeAgent}
            />
          </div>
          <div class="col">
            <h6>Master Agent Code</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="agentGroupCode"
              onChange={changeAgent}
            />
          </div>
          <div class="col">
            <h6>เลขที่ใบอนุญาติ</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              required
              // placeholder="Password"
              name="licentNo"
              onChange={changeAgent}
            />
          </div>
          <div class="col">
            <h6>วันหมดอายุ</h6>
          </div>
          <div class="col">
            <InputBtn
              type="date"
              required
              // placeholder="Password"
              name="licentExp"
              onChange={changeAgent}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>เลขที่ใบอนุญาติประกันชีวิต</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="licentLifeNo"
              onChange={changeAgent}
            />
          </div>
          <div class="col">
            <h6>วันหมดอายุ</h6>
          </div>
          <div class="col">
            <InputBtn
              type="date"
              // placeholder="Password"
              name="licentLifeExp"
              onChange={changeAgent}
            />
          </div>
          {/* <div class="col">
            <h6>สถานะ</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="status"
              onChange={changeAgent}
            />
          </div> */}
          <div class="col">
            <h6>note</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="note"
              onChange={changeAgent}
            />
          </div>
        </div>
        {/* entity table */}
        <div class="row">
          <div class="col">
            <h6>คำนำหน้า</h6>
          </div>
          <div class="col">
            {/* <InputBtn
              type="number"
              // placeholder="Password"
              name="titleID"
              onChange={changeEntity}
            /> */}

            <select className="col" name="titleID" onChange={changeEntity}>
              <option value="" selected disabled hidden>เลือกคำนำหน้า</option>
              {titleDD}
            </select>
          </div>
          <div class="col">
            <h6>ชื่อ</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="t_firstName"
              onChange={changeEntity}
            />
          </div>
          <div class="col">
            <h6>นามสกุล</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="t_lastName"
              onChange={changeEntity}
            />
          </div>
          <div class="col">
            <h6>Email</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="email"
              onChange={changeEntity}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>ประเภทบัตร</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="idCardType"
              onChange={changeEntity}
            />
          </div>
          <div class="col">
            <h6>เลขที่บัตร</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="idCardNo"
              onChange={changeEntity}
            />
          </div>
          <div class="col">
            <h6>วันเริ่มต้น</h6>
          </div>
          <div class="col">
            <InputBtn
              type="date"
              // placeholder="Password"
              name="idCardActDate"
              onChange={changeEntity}
            />
          </div>
          <div class="col">
            <h6>วันหมดอายุ</h6>
          </div>
          <div class="col">
            <InputBtn
              type="date"
              // placeholder="Password"
              name="idCardExpDate"
              onChange={changeEntity}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>วันเกิด</h6>
          </div>
          <div class="col">
            <InputBtn
              type="date"
              // placeholder="Password"
              name="dateOfBirth"
              onChange={changeEntity}
            />
          </div>
          <div class="col">
            <h6>เพศโดยกำเนิด</h6>
          </div>
          <div class="col">
            {/* <InputBtn
              type="text"
              // placeholder="Password"
              name="gender"
              onChange={changeEntity}
            /> */}
            <select
              className="col"
              name="gender"
              onChange={changeEntity}
            >
              <option value="" selected disabled hidden>XX or XY ?</option>
              <option value="M">ชาย</option>
              <option value="F">หญิง</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>note</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="note"
              onChange={changeEntity}
            />
          </div>
        </div>

        {/* location table */}
        <div class="row">
          <h5>Location</h5>
        </div>

        <div class="row">
          <div class="col">
            <h6>บ้านเลขที่</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="t_location_1"
              onChange={changeLocation}
            />
          </div>
          <div class="col">
            <h6>หมู่บ้านอาคาร</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="t_location_2"
              onChange={changeLocation}
            />
          </div>
          <div class="col">
            <h6>หมู่</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="t_location_3"
              onChange={changeLocation}
            />
          </div>
          <div class="col">
            <h6>ซอย</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="t_location_4"
              onChange={changeLocation}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>ถนน</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="t_location_5"
              onChange={changeLocation}
            />
          </div>
          <div class="col">
            <h6>จังหวัด</h6>
          </div>
          <div class="col">
            {/* <InputBtn
              type="number"
              // placeholder="Password"
              name="provinceID"
              onChange={changeLocation}
            /> */}
            <select className="col" name="provinceID" onChange={changeLocation}>
              <option value="" selected disabled hidden>เลือกจังหวัด</option>
              {provinceDD}
            </select>
          </div>
          <div class="col">
            <h6>อำเภอ</h6>
          </div>
          <div class="col">
            {/* <InputBtn
              type="number"
              // placeholder="Password"
              name="districtID"
              onChange={changeLocation}
            /> */}
            <select className="col" name="districtID" onChange={changeLocation}>
              <option value="" selected disabled hidden>เลือกอำเภอ</option>
              {districDD}
            </select>
          </div>
          <div class="col">
            <h6>ตำบล</h6>
          </div>
          <div class="col">
            {/* <InputBtn
              type="number"
              // placeholder="Password"
              name="subDistrictID"
              onChange={changeLocation}
            /> */}
            <select className="col" name="subDistrictID" onChange={changeLocation}>
              <option value="" selected disabled hidden>เลือกตำบล</option>
              {subDistricDD}
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>รหัสไปรษณีย์</h6>
          </div>
          <div class="col">
            {/* <InputBtn
              type="text"
              // placeholder="Password"
              name="zipcode"
              onChange={changeLocation}
            /> */}
            <select className="col" name="zipcode" onChange={changeLocation}>
              <option value="" selected disabled hidden>เลือกรหัสไปรษณีย์</option>
              {zipcodeDD}
            </select>
          </div>
          <div class="col">
            <h6>เบอร์โทรศัพท์</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              // placeholder="Password"
              name="telNum_1"
              onChange={changeLocation}
            />
          </div>
          <div class="col">
            <h6>เบอร์มือถือ</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              // placeholder="Password"
              name="telNum_2"
              onChange={changeLocation}
            />
          </div>
          <div class="col">
            <h6>เบอร์โทรสาร</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              // placeholder="Password"
              name="telNum_3"
              onChange={changeLocation}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>note</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="note"
              onChange={changeLocation}
            />
          </div>
        </div>
         {/* commission-ov-in table */}
         <div class="row">
                    <div class="col-10">
                        <h5>commission OV IN</h5>
                    </div>
                    <div class="col">
                        <button onClick={newRow} >add</button>
                    </div>
                    <div class="col">
                        <button onClick={removeRow} >Remove</button>
                    </div>

                </div>
                <table>
                    <thead>
                        <tr>
                            <th>InsureType</th>
                            <th>บริษัทรับประกัน</th>
                            {/* <th>class</th>
                            <th>subclass</th> */}
                            <th>% commmission</th>
                            <th>จำนวนเงิน</th>
                            <th>% OV</th>
                            <th>จำนวนเงิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {/* <form
                                method="POST"
                                id={"policyadd"}
                            //   onSubmit={(e) => handleCreate(e)}
                            ></form> */}

                            {Array.from({ length: row+1 }, (_, index) => (
                                <tr>
                                    <td>
                                        <select  name="insureID" onChange={changeComOv } key = {index}>
                                            {insureTypeDD}
                                        </select>
                                    </td>
                                    <td>
                                        <select name="insurerCode" onChange={changeComOv } key = {index}>
                                            {/* {insurerDD} */}
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text"  name="rateComIn" onChange={changeComOv } key = {index} />
                                    </td>
                                    <td>
                                    <input type="text"  name="amountComIn" onChange={changeComOv } key = {index}/>
                                    </td>
                                    <td>
                                    <input type="text"  name="rateOVIn_1" onChange={changeComOv } key = {index}/>
                                    </td>
                                    <td>
                                        <input type="text"  name="amountOVIn_1" onChange={changeComOv } key = {index}/>
                                    </td>


                                </tr>
                            ))}

                        </>
                    </tbody>
                </table>

        <LoginBtn type="submit">Submit</LoginBtn>
      </form>

      {/* <Link to="/signup" style={NormalText}>
          First time here ? Let's sign up
        </Link> */}
      {/* </BackdropBox1> */}
    </>
  );
};

export default Agent;
