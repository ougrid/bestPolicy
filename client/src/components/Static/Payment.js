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
  const [transacList, setTransacList] = useState([]);
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
  const filterSubmit = async (e) => {
    e.preventDefault();
    console.log({...filterData, ...paymentData});
    await axios
      .post(url + "/payments/findtransac", {...filterData, ...paymentData})
      .then((res) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);
        console.log(res.data);
        setTransactionData(res.data)
        const array = []
        res.data.forEach((ele,index)=>{
          array.push(<tr>
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
                <input type="text"  name="amount" disabled  key = {index} value={ele.transType === 'Prem'? ele.amount :ele.transType === 'OV'?ele.ovamt:ele.commamt}/>
            </td>
            <td>
                <input type="text"  name="transStatus" disabled  key = {index} value={ele.transStatus}/>
            </td>
            <td>
                <input type="checkbox"  name="selected" key = {index} />
            </td>
        </tr>)
          
      })
        setTransacList(array)
        
    })
    .catch((err) => {
      
            alert("fail filter");
        
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
          <div class="col-2">
                        <label class="col-form-label">Payment No</label>

                    </div>
          <div class="col-2">
          <div class="input-group mb-3">
            <input
              type="text"
              required
              class="form-control"
              name="paymentNo"
              onChange={changePayment}
            />
            </div>
          </div>
        
          <div class="col-2">
          <select
                 class="form-control"
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
        
          
          <div class="col-1">
          <label class="col-form-label">จำนวนเงิน</label>
          </div>
          <div class="col-2">
            <input
              type="number"
              required
              step={0.1}
              class="form-control"
              name="amount"
              onChange={changePayment}
            />
          </div>
        </div>
        <div className="row">
        <div class="col-2">
        <label class="col-form-label">เลขอ้างอิงการชำระเงิน</label>
          </div>
          <div class="col-2">
          <div class="input-group mb-3">
            <input
              type="text"
              required
              class="form-control"
              name="refNo"
              onChange={changePayment}
            />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-2">
          <label class="col-form-label">ผุ้จ่ายเงิน</label>
          </div>
          <div class="col-2 ">
          <div class="input-group mb-3">
          <select
                  className="form-control"
                  name={`payType`}
                  onChange={changePayment}
                >
                  <option value={null} disabled selected hidden>เลือก</option>
                  <option value="insuerName">บริษัทรับประกัน</option>
                  <option value="agentCode">ตัวแทนนายหน้า</option>
                  <option value="amity">อะมิตี้</option>
            
                </select>
                            


                        </div>
          
          </div>
          <div class="col-2">
          <input
              type="text"
              required
              className="form-control"
              name="payID"
              onChange={changePayment}
              />
              </div>
              <div class="col-1">
              <label class="col-form-label">ผุ้รับเงิน</label>
          
          </div>
          <div class="col-2">
          <select
                 className="form-control"
                  name={`repType`}
                  onChange={changePayment}
                >
                  <option value={null} disabled selected hidden>เลือก</option>
                  <option value="insuerName">บริษัทรับประกัน</option>
                  <option value="agentCode">ตัวแทนนายหน้า</option>
                  <option value="amity">อะมิตี้</option>
            
                </select>
          </div>
          <div class="col-2">
          <input
              type="text"
              required
              className="form-control"
              name="repID"
              onChange={changePayment}
              />
              </div>
        </div>
       
        {/* policy table */}
        <h1>ค้นหารายการ</h1>
        <div class="row">
        <div class="col-2"></div>
          <div class="col-2">
          <label class="col-form-label">ประเภทการค้นหา</label>
          </div>
          <div class="col-2">
          <select
                   className="form-control"
                  name="filterName"
                  onChange={changeFilterTransaction}
                >
                  <option value={null} disabled selected hidden>ตัวเลือก</option>
                  <option value="insurerName">บริษัทรับประกัน</option>
                  <option value="agentCode">AgentCode</option>
                  <option value="policyNo">เลขที่กรมธรรม์</option>
                  
                </select>
          </div>
          
          <div class="col-2">
            <input
              type="text"
              step={0.1}
              className="form-control"
              name="value"
              onChange={changeFilterTransaction}
            />
          </div>
          <div class="col-2">
          <div class="input-group mb-3">
          <button type="button" class="btn btn-primary" onClick={filterSubmit} >ค้นหา</button>
          </div>
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
                            <th>status</th>
                            <th>selected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transacList}
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
