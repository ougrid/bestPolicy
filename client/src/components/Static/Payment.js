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

const Payment = () => {
  const url = config.url;
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({});
  const [filterData, setFilterData] = useState({});
  const [transactionData, setTransactionData] = useState([]);
  const [commOutData, setCommOutData] = useState({});

  const changePayment = (e) => {
    setPaymentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeFilterTransaction = (e) => {
    setFilterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const filterSubmit = (e) => {
    e.preventDefault();
    axios
      .post(url + "/insures/commovnew", filterData)
      .then((res) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);
        console.log(res.data);
        setTransactionData(res.data)
        
    })
    .catch((err) => {
      
            alert("fuck off filter");
        
    });
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
        payment: paymentData,  commOut: commOutData
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

        <h1>Payment</h1>

        <div class="row">
          <div class="col">
            <h6>Payment No</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              required
              // placeholder="Password"
              name="paymentNo"
              onChange={changePayment}
            />
          </div>
          {/* <div class="col">
            <h6>ประเภทการชำระเงิน</h6>
          </div> */}
          <div class="col">
          <select
                  className="col-md-8"
                  name={`type`}
                  onChange={changePayment}
                >
                  <option value={null} disabled selected hidden>ช่องทาง</option>
                  <option value="cash">เงินสด</option>
                  <option value="check">แคชเชียเช็ค</option>
                  <option value="creditcard">บัตรเครดิต</option>
                  <option value="banking">โอนเงินผ่านธนาคาร</option>
                </select>
          </div>
          {/* <div class="col">
            <h6>จำนวนเงิน</h6>
          </div> */}
          
          <div class="col">
            <h6>จำนวนเงิน</h6>
          </div>
          <div class="col">
            <InputBtn
              type="number"
              required
              step={0.1}
              // placeholder="Password"
              name="amount"
              onChange={changePayment}
            />
          </div>
          <div class="col">
            <h6>เลขอ้างอิงการชำระเงิน</h6>
          </div>
          <div class="col">
            <InputBtn
              type="text"
              required
              // placeholder="Password"
              name="refNo"
              onChange={changePayment}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h6>ผุ้จ่ายเงิน</h6>
          </div>
          <div class="col">
          <select
                  className="col-md-8"
                  name={`payType`}
                  onChange={changePayment}
                >
                  <option value={null} disabled selected hidden>เลือก</option>
                  <option value="insuerName">บริษัทรับประกัน</option>
                  <option value="AgentCode">ตัวแทนนายหน้า</option>
                  <option value="amity">อะมิตี้</option>
            
                </select>
          </div>
          <div class="col">
          <InputBtn
              type="text"
              required
              // placeholder="Password"
              name="payID"
              onChange={changePayment}
              />
              </div>
              <div class="col">
            <h6>ผุ้รับเงิน</h6>
          </div>
          <div class="col">
          <select
                  className="col-md-8"
                  name={`repType`}
                  onChange={changePayment}
                >
                  <option value={null} disabled selected hidden>เลือก</option>
                  <option value="insuerName">บริษัทรับประกัน</option>
                  <option value="agentCode">ตัวแทนนายหน้า</option>
                  <option value="amity">อะมิตี้</option>
            
                </select>
          </div>
          <div class="col">
          <InputBtn
              type="text"
              required
              // placeholder="Password"
              name="repID"
              onChange={changePayment}
              />
              </div>
        </div>
       
        {/* policy table */}
        <h1>ค้นหารายการ</h1>
        <div class="row">
          <div class="col">
            <h6>ประเภทการค้นหา</h6>
          </div>
          <div class="col">
          <select
                  className="col-md-8"
                  name="filterName"
                  onChange={changeFilterTransaction}
                >
                  <option value={null} disabled selected hidden>ตัวเลือก</option>
                  <option value="insurerName">บริษัทรับประกัน</option>
                  <option value="agentCode">AgentCode</option>
                  <option value="policyNo">เลขที่กรมธรรม์</option>
                  
                </select>
          </div>
          
          <div class="col">
            <InputBtn
              type="text"
              step={0.1}
              // placeholder="Password"
              name="value"
              onChange={changeFilterTransaction}
            />
          </div>
          <div class="col">
          <button onClick={filterSubmit} >ค้นหา</button>
          </div>
          
        </div>
        <table>
                    <thead>
                        <tr>
                            <th>เลขที่กรมธรรม์</th>
                            {/* <th>class</th>
                            <th>subclass</th> */}
                            <th>บริษัทรับประกัน</th>
                            <th>AgentCode</th>
                            <th>ประเภท</th>
                            <th>จำนวนเงิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {transactionData.forEach((ele,index)=>{
                                <tr>
                                <td>
                                    <input type="text"  name="policyNo"  disabled key = {index} value={ele.policyNo}/>
                                </td>
                                <td>
                                    <input type="text"  name="insurerName"  disabled key = {index} value={ele.insurerName} />
                                </td>
                                <td>
                                <input type="text"  name="agentCode" disabled  key = {index} value={ele.agentCode}/>
                                </td>
                                <td>
                                <input type="text"  name="transType"  disabled  key = {index} value={ele.transType}/>
                                </td>
                                <td>
                                    <input type="text"  name="amount" disabled  key = {index} value={ele.amount}/>
                                </td>


                            </tr>
                            })}
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

export default Payment;
