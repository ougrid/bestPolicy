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

const Policy = () => {
  const url = config.url;
  const navigate = useNavigate();

  const [policyData, setPolicyData] = useState({ itemList: null });
  const [motorData, setMotorData] = useState({});
  const [commInData, setCommInData] = useState({});
  const [commOutData, setCommOutData] = useState({});

  const changePolicy = (e) => {
    setPolicyData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

//   function exportToJsonFile(jsonData) {
//     let dataStr = JSON.stringify(jsonData);
//     let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

//     let exportFileDefaultName = 'data.json';

//     let linkElement = document.createElement('a');
//     linkElement.setAttribute('href', dataUri);
//     linkElement.setAttribute('download', exportFileDefaultName);
//     linkElement.click();
// }

  const changeMotor = (e) => {
    setMotorData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // exportToJsonFile({ policy: policyData, motor: motorData })
    axios
      .post(url + "/policies/policynew", { policy: policyData, motor: motorData })
      .then((res) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);
        console.log(res.data);
        alert("create new policy success")
      })
      .catch((err) => {

        alert("create new policy fail");

      });
  };

  return (
    <>
      {/* <BackdropBox1> */}
      <form className="container text-center" onSubmit={handleSubmit}>
        {/* policy table */}
        <h1>สร้างกรมธรรม์</h1>
        <div class="row">
          <div class="col">
            <h6>เลขที่กรมธรรม์</h6>
          </div>
          <div class="col">
            <InputBtn
              className="col-md-4"
              type="text"
              // placeholder="InsurerCode"
              name="policyNo"
              onChange={changePolicy}
            />
          </div>
          <div class="col">
            <h6>รหัสผู้เอาประกัน</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="insureeCode"
              onChange={changePolicy}
            />
          </div>
          <div class="col">
            <h6>รหัสบริษัทรับประกัน</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="insurerCode"
              onChange={changePolicy}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>รหัสตัวแทนขาย</h6>
          </div>
          <div class="col">
            <InputBtn
              className="col-md-4"
              type="text"
              // placeholder="InsurerCode"
              name="agentCode"
              onChange={changePolicy}
            />
          </div>

          <div class="col">
            <h6>ประเภทประกัน</h6>
          </div>
          <div class="col">
            <select
              className="col-md-8"
              name="insureType"
              onChange={(e) =>
                setPolicyData({ ...policyData, insureType: e.target.value })
              }
            >
              <option value="Motor">Motor</option>
              <option value="PA">PA</option>
              <option value="FR">FR</option>
            </select>
          </div>
          <div class="col">
            <h6>แผนประกัน</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              // placeholder="Password"
              name="insureID"
              onChange={changePolicy}
            />
          </div>
        </div>

        {/* motor table */}
        {policyData.insureType === "Motor" ? (
          <>
            <div class="row">
              <div class="col">
                <h6>ยี่ห้อรถยนต์</h6>
              </div>
              <div class="col">
                <InputBtn
                  className="col-md-4"
                  type="number"
                  // placeholder="InsurerCode"
                  name="brandID"
                  onChange={changeMotor}
                />
              </div>
              <div class="col">
                <h6>รุ่น</h6>
              </div>
              <div class="col">
                <InputBtn
                  type="number"
                  // placeholder="Password"
                  name="modelID"
                  onChange={changeMotor}
                />
              </div>
              <div class="col">
                <h6>เลขตัวถังรถ</h6>
              </div>
              <div class="col">
                <InputBtn
                  type="text"
                  // placeholder="Password"
                  name="chassisNo"
                  onChange={changeMotor}
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <InputBtn
                  className="col-md-4"
                  type="checkbox"
                  // placeholder="InsurerCode"
                  name="forredflag"
                  id="forredflag"
                  onChange={changeMotor}
                />
              </div>
              <div class="col">
                <label class="form-check-label" for="forredflag">
                  ป้ายแดง
                </label>
              </div>
              <div class="col">
                <h6>เลขทะเบียนรถ</h6>
              </div>
              <div class="col">
                <InputBtn
                  type="text"
                  // placeholder="Password"
                  name="carRegisNo"
                  onChange={changeMotor}
                />
              </div>
              <div class="col">
                <h6>ปีที่จดทะเบียน</h6>
              </div>
              <div class="col">
                <InputBtn
                  type="text"
                  // placeholder="Password"
                  name="carRegisYear"
                  onChange={changeMotor}
                />
              </div>
            </div>
          </>
        ) : null}

        {/* policy table */}
        <div class="row">
          <div class="col">
            <h6>วันที่เริ่มคุ้มครอง</h6>
          </div>
          <div class="col">
            <InputBtn
              className="col-md-4"
              type="date"
              // placeholder="InsurerCode"
              name="actDate"
              onChange={changePolicy}
            />
          </div>
          <div class="col">
            <h6>วันที่สิ้นสุด</h6>
          </div>
          <div class="col">
            <InputBtn
              type="date"
              // placeholder="Password"
              name="expDate"
              onChange={changePolicy}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>ค่าเบี้ย</h6>
          </div>
          <div class="col">
            <InputBtn
              className="col-md-4"
              type="number"
              step={0.1}
              // placeholder="InsurerCode"
              name="prem"
              onChange={changePolicy}
            />
          </div>
          <div class="col">
            <h6>ภาษี</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="duty"
              onChange={changePolicy}
            />
          </div>
          <div class="col">
            <h6>ค่าแสตมอากรณ์</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="stamp"
              onChange={changePolicy}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>ค่าเบี้ยรวม</h6>
          </div>
          <div class="col">
            <InputBtn
              className="col-md-4"
              type="number"
              step={0.1}
              // disabled
              // defaultValue={policyData.total}
              // placeholder="InsurerCode"
              name="total"
              onChange={changePolicy}
            />
          </div>
          <div class="col">
            <h6>รายละเอียดเพิ่มเติม</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              // placeholder="Password"
              name="detail"
              onChange={changePolicy}
            />
          </div>
        </div>

        {/* commov in */}
        <h3>commision ov in</h3>
        <div class="row">
          <div class="col">
            <h6>ค่าคอมมิสชั่น</h6>
          </div>
          <div class="col">
            <InputBtn
              className="col-md-4"
              type="number"
              step={0.1}
              // placeholder="InsurerCode"
              name="amountComIn"
              onChange={changePolicy}
            />
          </div>
          <div class="col">
            <h6>ภาษี</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="duty"
              onChange={changePolicy}
            />
          </div>
          <div class="col">
            <h6>ค่าแสตมอากรณ์</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="stamp"
              onChange={changePolicy}
            />
          </div>
        </div>


        {/* commov out */}
        <h3>commision ov in</h3>
        <div class="row">
          <div class="col">
            <h6>ค่าคอมมิสชั่น</h6>
          </div>
          <div class="col">
            <InputBtn
              className="col-md-4"
              type="number"
              step={0.1}
              // placeholder="InsurerCode"
              name="prem"
              onChange={changePolicy}
            />
          </div>
          <div class="col">
            <h6>ภาษี</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="duty"
              onChange={changePolicy}
            />
          </div>
          <div class="col">
            <h6>ค่าแสตมอากรณ์</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="stamp"
              onChange={changePolicy}
            />
          </div>
        </div>


        <LoginBtn type="submit">Submit</LoginBtn>
      </form>

      {/* <Link to="/signup" style={NormalText}>
          First time here ? Let's sign up
        </Link> */}
      {/* </BackdropBox1> */}
    </>
  );
};

export default Policy;
