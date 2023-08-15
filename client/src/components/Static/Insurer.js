import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CenterPage } from "../StylesPages/AdminStyles";
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

const Insurer = () => {
  const url = config.url;
  const navigate = useNavigate();
  const [insurerData, setInsurerData] = useState({
    entityID: null,
    deductTaxRate: 3,
  });
  const [entityData, setEntityData] = useState({
    personType: "C",
    ogType: "ประกันภัย",
  });
  const [locationData, setLocationData] = useState({
    entityID: null,
    locationType: "A",
  });
  const [comOvInData, setComOvInData] = useState([]);
  // dropdown
  const [provinceDD, setProvinceDD] = useState([]);
  const [districDD, setDistricDD] = useState([]);
  const [subDistricDD, setSubDistricDD] = useState([]);
  const [zipcodeDD, setZipCodeDD] = useState([]);
  const [titleDD, setTitleDD] = useState([]);
  const [insureTypeDD, setInsureTypeDD] = useState([]);
  const [row, setRow] = useState(0);

  const changeInsurer = (e) => {
    setInsurerData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeEntity = (e) => {
    // console.log(entityData);
    setEntityData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeComOv = (e) => {
    // console.log(entityData);
    // console.log(e.target.value);
    const index = e.target.name.split("-")[1];
    const name = e.target.name.split("-")[0];
    const data = { ...comOvInData[index], [name]: e.target.value };
    comOvInData[index] = data;
    setComOvInData(comOvInData);
  };

  const changeLocation = (e) => {
    setLocationData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "provinceID") {
      getDistrict(e.target.value);
    } else if (e.target.name === "districtID") {
      getSubDistrict(e.target.value);
    }
  };

  const getDistrict = (provinceID) => {
    //get distric in province selected
    axios
      .get(url + "/static/amphurs/" + provinceID)
      .then((distric) => {
        const array = [];
        distric.data.forEach((ele) => {
          array.push(
            <option key={ele.amphurid} value={ele.amphurid}>
              {ele.t_amphurname}
            </option>
          );
        });
        setDistricDD(array);
      })
      .catch((err) => {});
  };

  const getSubDistrict = (districID) => {
    //get tambons in distric selected
    axios
      .get(url + "/static/tambons/" + districID)
      .then((subdistric) => {
        const arraySub = [];
        const arrayZip = [];
        const zip = [];
        subdistric.data.forEach((ele) => {
          arraySub.push(
            <option key={ele.tambonid} value={ele.tambonid}>
              {ele.t_tambonname}
            </option>
          );
          zip.push(ele.postcodeall.split("/"));
        });
        const uniqueZip = [...new Set(...zip)];
        console.log(uniqueZip);
        uniqueZip.forEach((zip) => {
          arrayZip.push(<option value={zip}>{zip}</option>);
        });
        setSubDistricDD(arraySub);
        setZipCodeDD(arrayZip);
      })
      .catch((err) => {});
  };

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

        const array = [];
        province.data.forEach((ele) => {
          array.push(
            <option key={ele.provinceid} value={ele.provinceid}>
              {ele.t_provincename}
            </option>
          );
        });
        setProvinceDD(array);
        // get title
        axios
          .get(url + "/static/titles/company/all")
          .then((title) => {
            const array2 = [];
            title.data.forEach((ele) => {
              array2.push(
                <option key={ele.TITLEID} value={ele.TITLEID}>
                  {ele.TITLETHAIBEGIN}
                </option>
              );
            });
            setTitleDD(array2);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
    // get title all of company type

    //get insureType
    axios
      .get(url + "/insures/insuretypeall")
      .then((province) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);

        const array = [];
        province.data.forEach((ele) => {
          array.push(
            <option key={ele.id} value={ele.id}>
              {ele.class} : {ele.subClass}
            </option>
          );
        });
        setInsureTypeDD(array);
      })
      .catch((err) => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(url + "/persons/insurernew", {
        insurer: insurerData,
        entity: entityData,
        location: locationData,
        commOVIn: comOvInData,
      })
      .then((res) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);
        console.log(res.data);
        alert("create new insurer success");
        axios
          .post(url + "/insures/commovinnew", {
            insurer: insurerData,
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
            alert("setup new com ov in success");
          });
      })
      .catch((err) => {
        alert("create new insurer fail");
      });
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

  return (
    <CenterPage>
      {/* <BackdropBox1> */}
      <form className="container-fluid text-left" onSubmit={handleSubmit}>
        {/* insurer table */}
        <h1>บริษัทรับประกัน</h1>
        <div class="row ">
          <div class="col-2 "></div>
          <div class="col-2 ">
            <label class="form-label ">
              InsurerCode<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              required
              // placeholder="InsurerCode"
              name="insurerCode"
              onChange={changeInsurer}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              รหัส คปภ.<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              required
              name="KPPCode"
              onChange={changeInsurer}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              รูปแบบการหักภาษี<span class="text-danger"> *</span>
            </label>
            <select
              className="form-control"
              required
              name={`deductTaxType`}
              onChange={changeInsurer}
            >
              <option value="หักภาษี ณ ที่จ่าย">หักภาษี ณ ที่จ่าย</option>
              <option selected value="หักภาษี ณ ที่จ่ายค่านายหน้า">
              หักภาษี ณ ที่จ่ายค่านายหน้า
              </option>
            </select>
            
          </div>
          <div class="col-2">
            <label class="form-label ">
              อัตราภาษี<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              defaultValue={3}
              type="number"
              step={0.1}
              required
              name="deductTaxRate"
              onChange={changeInsurer}
            />
          </div>
        </div>

        <div class="row">
          <div class="col-2 "></div>
          <div class="col-2">
            <label class="form-label ">
              Stament type<span class="text-danger"> *</span>
            </label>
            <select
              className="form-control"
              name={`stamentType`}
              onChange={changeInsurer}
            >
              <option value="Net">Net</option>
              <option selected value="Gross">
                Gross
              </option>
            </select>
          </div>
          <div class="col-2">
            <label class="form-label ">
            เลขที่ทะเบียน<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              required
              name="taxNo"
              onChange={changeEntity}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
            วันที่จดทะเบียน<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="date"
              required
              name="taxActDate"
              onChange={changeEntity}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
            วันที่จดทะเบียนหมดอายุ<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="date"
              required
              name="taxExpDate"
              onChange={changeEntity}
            />
          </div>
          
        </div>

        {/* entity table */}
        <div class="row">
          <div class="col-2 "></div>
          <div class="col-2">
            <label class="form-label ">
              คำนำหน้า<span class="text-danger"> *</span>
            </label>
            <select
              className="form-control"
              name="titleID"
              onChange={changeEntity}
            >
              <option value="" selected disabled hidden>
                เลือกคำนำหน้า
              </option>
              {titleDD}
            </select>
          </div>
          <div class="col-2">
            <label class="form-label ">
              ชื่อ<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              required
              name="t_ogName"
              onChange={changeEntity}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              เครดิตเทอมค่าเบี้ย<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="number"
              name="premCreditT"
              onChange={changeInsurer}
            />
          </div>

          <div class="col-2">
            <label class="form-label ">
              เครดิตเทอมค่าcomm/ov<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="number"
              name="commovCreditT"
              onChange={changeInsurer}
            />
          </div>
         

        </div>

        <div class="row">
          <div class="col-2 "></div>
          <div class="col-2">
            <label class="form-label ">
              จดทะเบียน vat<span class="text-danger"> *</span>
            </label>
            <InputBtn
              type="checkbox"
              name="vatRegis"
              onChange={(e) =>
                setEntityData({ ...entityData, vatRegis: e.target.checked })
              }
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              เลขที่ ภพ.20<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              name="pk20"
              onChange={changeEntity}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              สาขา<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              name="branch"
              onChange={changeEntity}
            />
          </div>
        </div>

        {/* location table */}
        <div class="row">
          <h5>Location</h5>
        </div>
        <div class="row">
          <div class="col-2 "></div>
          <div class="col-2">
            <label class="form-label ">
              บ้านเลขที่<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              required
              name="t_location_1"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              หมู่บ้านอาคาร<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              name="t_location_2"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              หมู่<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              name="t_location_3"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              ซอย<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              name="t_location_4"
              onChange={changeLocation}
            />
          </div>
        </div>

        <div class="row">
          <div class="col-2 "></div>
          <div class="col-2">
            <label class="form-label ">
              ถนน<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              name="t_location_5"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              จังหวัด<span class="text-danger"> *</span>
            </label>
            <select
              className="form-control"
              name="provinceID"
              onChange={changeLocation}
            >
              <option value="" selected disabled hidden>
                เลือกจังหวัด
              </option>
              {provinceDD}
            </select>
          </div>
          <div class="col-2">
            <label class="form-label ">
              อำเภอ<span class="text-danger"> *</span>
            </label>
            <select
              className="form-control"
              name="districtID"
              onChange={changeLocation}
            >
              <option value="" selected disabled hidden>
                เลือกอำเภอ
              </option>
              {districDD}
            </select>
          </div>
          <div class="col-2">
            <label class="form-label ">
              ตำบล<span class="text-danger"> *</span>
            </label>
            <select
              className="form-control"
              name="subDistrictID"
              onChange={changeLocation}
            >
              <option value="" selected disabled hidden>
                เลือกตำบล
              </option>
              {subDistricDD}
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-2 "></div>
          <div class="col-2">
            <label class="form-label ">
              รหัสไปรษณีย์<span class="text-danger"> *</span>
            </label>
            <select
              className="form-control"
              name="zipcode"
              onChange={changeLocation}
            >
              <option value="" selected disabled hidden>
                เลือกรหัสไปรษณีย์
              </option>
              {zipcodeDD}
            </select>
          </div>

          <div class="col-2">
            <label class="form-label ">
              Email<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="text"
              name="email"
              onChange={changeEntity}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              เบอร์โทรศัพท์<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="number"
              name="telNum_1"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              เบอร์มือถือ<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="number"
              name="telNum_2"
              onChange={changeLocation}
            />
          </div>
          <div class="col-2">
            <label class="form-label ">
              เบอร์โทรสาร<span class="text-danger"> *</span>
            </label>
            <InputBtn
              className="form-control"
              type="number"
              name="telNum_3"
              onChange={changeLocation}
            />
          </div>
        </div>

        {/* commission-ov-in table */}

        <div class="d-flex  justify-content-center">
          <div class="col-2">
            <h3>commission OV IN</h3>
          </div>
          <div class="col-2">
            <button onClick={newRow}>add</button>

            <button onClick={removeRow}>Remove</button>
          </div>
        </div>

        <div class="row">
        <div class="col-3"></div> 
          <div class="col-2">
            <label class="col-form-label">InsureType</label>
          </div>
          <div class="col-2">
            <label class="col-form-label">Comm-in %</label>
          </div>
          <div class="col-2">
            <label class="col-form-label">OV-in %</label>
          </div>
        </div>
              {Array.from({ length: row + 1 }, (_, index) => (
                <div class="row">
                  <div class="col-3"></div>
                  <div class="col-2">
                    <select
                      name={`insureID-${index}`}
                      onChange={changeComOv}
                      class="form-control"
                      key={index}
                    >
                      <option disabled selected hidden>
                        class:subclass
                      </option>
                      {insureTypeDD}
                    </select>
                    </div>

                    <div class="col-2">
                    <input
                    class="form-control"
                      type="number"
                      step={0.1}
                      name={`rateComIn-${index}`}
                      onChange={changeComOv}
                      key={index}
                    />
                  </div>

                  <div class="col-2">
                    <input
                    class="form-control"
                      type="number"
                      step={0.1}
                      name={`rateOVIn_1-${index}`}
                      onChange={changeComOv}
                      key={index}
                    />
                  </div>
                </div>
              ))}
            
            
            <LoginBtn type="submit">Submit</LoginBtn>
      </form>

      {/* <Link to="/signup" style={NormalText}>
          First time here ? Let's sign up
        </Link> */}
      {/* </BackdropBox1> */}
    </CenterPage>
  );
};

export default Insurer;
