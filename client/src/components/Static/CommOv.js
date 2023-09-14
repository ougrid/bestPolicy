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

const CommOv = () => {
  const url = config.url;
  const navigate = useNavigate();
  const [insureData, setInsureData] = useState({});
  const [commInData, setCommInData] = useState({});
  const [commOutData, setCommOutData] = useState({});

  const changeInsure = (e) => {
    setInsureData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeCommIn = (e) => {
    setCommInData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeCommOut = (e) => {
    setCommOutData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(url + "/insures/commovnew", {
        insure: insureData, commIn: commInData, commOut: commOutData
      })
      .then((res) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);
        console.log(res.data);
        alert("create new insurer success")
    })
    .catch((err) => {
      
            alert("create new insurer fail");
        
    });
  };

  return (
    <>
      {/* <BackdropBox1> */}
      <form className="container text-center" onSubmit={handleSubmit}>
        {/* insurer table */}

        <h1>ตั้งค่า commision OV IN-OUT</h1>

        <div class="row">
          <div class="col">
            <h6>บริษัทรับประกัน</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              required
              // placeholder="Password"
              name="insurerCode"
              onChange={changeInsure}
            />
          </div>
          <div class="col">
            <h6>แผนประกัน</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              required
              // placeholder="Password"
              name="insureID"
              onChange={changeInsure}
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
                setInsureData({ ...insureData, insureType: e.target.value })
              }
            >
              <option value="Motor">Motor</option>
              <option value="PA">PA</option>
              <option value="FR">FR</option>
            </select>
          </div>
          <div class="col">
            <h6>master agent code</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              required
              // placeholder="Password"
              name="AgentGroupCode"
              onChange={changeInsure}
            />
          </div>
        </div>
        {insureData.insureType === "MO" ? (
          <div class="row">
            <div class="col">
              <h6>voluntaryCode</h6>
            </div>
            <div class="col">
              <InputBtn
                type="number"
                // placeholder="Password"
                name="voluntaryCode"
                onChange={changeInsure}
              />
            </div>
            <div class="col">
              <h6>รุ่นรถ</h6>
            </div>
            <div class="col">
              <InputBtn
                type="number"
                // placeholder="Password"
                name="brandID"
                onChange={changeInsure}
              />
            </div>
            <div class="col">
              <h6>โมเดลรถ</h6>
            </div>
            <div class="col">
              <InputBtn
                type="number"
                // placeholder="Password"
                name="modelID"
                onChange={changeInsure}
              />
            </div>
          </div>
        ) : insureData.insureType === "PA" ? (
          <div class="row">
            <div class="col">
              <h6>ระดับความเสี่ยง</h6>
            </div>
            <div class="col">
              <InputBtn
                type="text"
                // placeholder="Password"
                name="riskGruop"
                onChange={changeInsure}
              />
            </div>
          </div>
        ) : insureData.insureType === "FR" ? (
          <div class="row">
            <div class="col">
              <h6>แผนประกันสุขภาพ</h6>
            </div>
            <div class="col">
              <InputBtn
                type="text"
                // placeholder="Password"
                name="planCode"
                onChange={changeInsure}
              />
            </div>
          </div>
        ) : null}

        {/* CommovIn table */}
        <h1>set Commision OV IN</h1>
        <div class="row">
          <div class="col">
            <h6>% commision </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateComIn"
              onChange={changeCommIn}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน commision</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountComIn"
              onChange={changeCommIn}
            />
          </div>
          <div class="col">
            <h6>% OV จัดทำกรมธรรม์ </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateOVIn_1"
              onChange={changeCommIn}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน OV จัดทำกรมธรรม์ </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountOVIn_1"
              onChange={changeCommIn}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>% OV ส่งเสริมการขาย </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateOVIn_2"
              onChange={changeCommIn}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน OV ส่งเสริมการขาย</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountOVIn_2"
              onChange={changeCommIn}
            />
          </div>
          <div class="col">
            <h6>% OV ค่าการสำรวจ </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateOVIn_3"
              onChange={changeCommIn}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน OV ค่าการสำรวจ </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountOVIn_3"
              onChange={changeCommIn}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>% OV ส่งเสริมการขายแบบพิเศษ </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateOVIn_4"
              onChange={changeCommIn}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน OV ส่งเสริมการขายแบบพิเศษ</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountOVIn_4"
              onChange={changeCommIn}
            />
          </div>
          <div class="col">
            <h6>% OV ค่าโฆษณา </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateOVIn_5"
              onChange={changeCommIn}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน OV ค่าโฆษณา </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountOVIn_5"
              onChange={changeCommIn}
            />
          </div>
        </div>

        {/* CommovOut table */}
        <h1>set Commision OV OUT</h1>
        <div class="row">
          <div class="col">
            <h6>% commision </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateComOut"
              onChange={changeCommOut}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน commision</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountComOut"
              onChange={changeCommOut}
            />
          </div>
          <div class="col">
            <h6>% OV จัดทำกรมธรรม์ </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateOVOut_1"
              onChange={changeCommOut}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน OV จัดทำกรมธรรม์ </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountOVOut_1"
              onChange={changeCommOut}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>% OV ส่งเสริมการขาย </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateOVOut_2"
              onChange={changeCommOut}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน OV ส่งเสริมการขาย</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountOVOut_2"
              onChange={changeCommOut}
            />
          </div>
          <div class="col">
            <h6>% OV ค่าการสำรวจ </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateOVOut_3"
              onChange={changeCommOut}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน OV ค่าการสำรวจ </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountOVOut_3"
              onChange={changeCommOut}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>% OV ส่งเสริมการขายแบบพิเศษ </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateOVOut_4"
              onChange={changeCommOut}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน OV ส่งเสริมการขายแบบพิเศษ</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountOVOut_4"
              onChange={changeCommOut}
            />
          </div>
          <div class="col">
            <h6>% OV ค่าโฆษณา </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="rateOVOut_5"
              onChange={changeCommOut}
            />
          </div>
          <div class="col">
            <h6>จำนวนเงิน OV ค่าโฆษณา </h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              step={0.1}
              // placeholder="Password"
              name="amountOVOut_5"
              onChange={changeCommOut}
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

export default CommOv;
