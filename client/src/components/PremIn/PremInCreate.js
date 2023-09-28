import React, { useEffect, useState }  from "react";
import PremInTable from "./PremInTable";
import axios from "axios";
const config = require("../../config.json");

export default function PremInCreate() {
  const url = window.globalConfig.BEST_POLICY_V1_BASE_URL;
  const wht = config.wht;
  const [filterData, setFilterData] = useState(
    {
        "billadvisorno": null,
        "insurerCode": null,
        "agentCode": null,
        "cashierreceiveno": null,
        "dueDate" : null,
        "policyNoAll" : true

    })
    const [policiesData, setPoliciesData] = useState([])
  const colsData = {
    insurerCode: "insurerCode",
    agentCode: "advisorCode",
    dueDate:"Duedate",
    policyNo:"Policyno",
    endorseNo:"Endorseno",
    invoiceNo:"Invoiceno",
    seqNo: "seqno",
    customerid:"customerid",
    insureename:"insuredname",
    licenseNo:"licenseno",
    // "province",
    chassisNo:"chassisno",
    netgrossprem:"grossprem",
    duty:"duty",
    tax:"tax",
    totalprem:"totalamt",
    commout_rate:"comm-out%",
    commout_amt:"comm-out-amt",
    ovout_rate:"ov-out%",
    ovout_amt:"ov-out-amt",
    netflag:"[] net",
    remainamt:"billpremium",

};
  
  
  const handleChange = (e) => {
    
    setFilterData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
};
  const submitFilter = (e) => {
    e.preventDefault();
    console.log(filterData);
    axios
        .post(url + "/payments/findpolicyinDue", filterData)
        .then((res) => {
            if (res.status === 201) {
                console.log(res.data);
                alert("not found policy")

            } else {


                // const array = []
                // for (let i = 0; i < res.data.length; i++) {
                //     // console.log(statementtypeData[i].statementtype == null? res.data[i].totalprem -res.data[i].commout_amt-res.data[i].ovout_amt: res.data[i].totalprem);
                //     array.push(res.data[i].totalprem)

                // }
                // console.log(array);
                console.log(res.data);
                setPoliciesData(res.data)
                
                alert("create new insuree success")
            }
        })
        .catch((err) => {

            // alert("create snew insuree fail");

        });
};
const getData = (e) => {
  e.preventDefault();
  if (e.target.name === 'cashier-btn') {
    axios
    .post(url + "/araps/getcashierdata", filterData)
    .then((res) => {
        if (res.status === 201) {
            console.log(res.data);
            alert("dont find cashierreceiveno : " + filterData.cashierreceiveno);

        } else {


          console.log(res.data);
            const data = {...filterData ,amt: res.data[0].amt}
            setFilterData(data)
        }
    })
    .catch((err) => {

         alert("dont find cashierreceiveno : " + filterData.cashierreceiveno);

    });
  }else if (e.target.name === 'bill-btn'){
    axios
    .post(url + "/araps/getbilldata", filterData)
    .then((res) => {
        if (res.status === 201) {
            console.log(res.data);
            alert("dont find billadvisorNo : " + filterData.billadvisorno);

        } else {

            const data = {...filterData , agentCode : res.data.billdata[0].agentCode, insurerCode : res.data.billdata[0].insurerCode,  actualvalue  : res.data.billdata[0].amt}
            setFilterData(data)
            console.log(res.data.trans);
            setPoliciesData(res.data.trans)
            
            
        }
    })
    .catch((err) => {

         alert("dont find billadvisorNo : " + filterData.billadvisorno);

    });

  }
 
};
    //apis
    const createHandler=(e)=>{
      e.preventDefault();
      axios.get().then(res=>{
        alert("search")
        //do search api logic
      }).catch(()=>{
        alert('error but created in test')
      })
    }

const savearpremin = async (e) => {
  let commout = 0
  let ovout = 0 
  let netflag = 'G'
  for (let i = 0; i < policiesData.length; i++) {
    if (policiesData[i].netflag === 'N') {
      netflag = 'N'
      commout = commout + policiesData[i].commout_amt
      ovout = ovout + policiesData[i].ovout_amt
    }
    
  }
  const whtcommout = commout * wht
  const whtovout = ovout * wht
  const data = filterData 
  data.diffamt = document.getElementsByName('DiffAmt')[0].value
  data.commout = commout
  data.ovout = ovout
  data.whtcommout = whtcommout
  data.whtovout = whtovout

  console.log({master :  data, trans : policiesData});
  await axios.post(url + "/araps/savearpremin",
   {master : data, 
   trans : policiesData}).then((res) => {
    alert("save account recive successed!!!");
    // window.location.reload(false);
  });
};

const submitarpremin = async (e) => {
  let commout = 0
  let ovout = 0 
  let netflag = 'G'
  for (let i = 0; i < policiesData.length; i++) {
    if (policiesData[i].netflag === 'N') {
      netflag = 'N'
      commout = commout + policiesData[i].commout_amt
      ovout = ovout + policiesData[i].ovout_amt
    }
    
  }
  const whtcommout = commout * wht
  const whtovout = ovout * wht
  const data = filterData 
  data.diffamt = document.getElementsByName('DiffAmt')[0].value
  data.commout = commout
  data.ovout = ovout
  data.whtcommout = whtcommout
  data.whtovout = whtovout

  console.log({master :  data, trans : policiesData});
  await axios.post(url + "/araps/submitarpremin", {master : data, trans : policiesData}).then((res) => {
    alert("save account recive successed!!!");
    // window.location.reload(false);
  });
};

  return (
    <div className="container d-fle justify-content-center my-5">
      <form onSubmit={(e)=>createHandler(e)}>
        <h1>สร้างรายการตัดหนี้</h1>
        {/* billadvisorno */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="billadvisorno">
            billadvisorno
          </label>
          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="billadvisorno"
              id="billadvisorno"
              onChange={handleChange}
            />
          </div>
          <div className="col-2">
            <button
            name="bill-btn"
              onClick={getData}
            >bill data</button>
          </div>
          <div className="col-2">
            <button
              onClick={submitFilter}
            >FILTER</button>
          </div>
        </div>
        {/* insurerCode  */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="insurerCode">
            insurerCode
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="insurerCode"
              id="insurerCode"
              value={filterData.insurerCode}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* advisorCode  */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="agentCode">
            advisorCode
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="agentCode"
              id="agentCode"
              value={filterData.agentCode}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="cashierreceiveno">
            dueDate
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="date"
              name="dueDate"
              id="dueDate"
              onChange={handleChange}
              />
          </div>
        </div>
              {/* cashierreceiveno */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="cashierreceiveno">
            cashierreceiveno
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="cashierreceiveno"
              id="cashierreceiveno"
              onChange={handleChange}
            />
          </div>
          <div className="col-2">
            <button
            name="cashier-btn"
              onClick={getData}
            >Cashier data</button>
          </div>
        </div>
        {/* Amt */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="amt">
            Amt
          </label>
          <div className="col-4 ">
            <input className="form-control" type="number" name="amt" id="amt" value={filterData.amt} disabled/>
          </div>
        </div>
        {/* actualvalue */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="actualvalue">
            ActualValue
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="number"
              name="actualvalue"
              value={filterData.actualvalue}
              id="actualvalue"
              disabled
            />
          </div>
          <label class="col-sm-2 col-form-label" htmlFor="actualvalue">
            DiffAmt
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="number"
              name="DiffAmt"
              id="DiffAmt"
              value={filterData.actualvalue - filterData.amt}
              readOnly
            />
          </div>
        </div>
        <div className="row my-3">
          <button className="btn btn-success">Create</button>
        </div>
      </form>
      <div>
        <PremInTable cols={colsData} rows={policiesData} />
        <button className="btn btn-primary">Export To Excel</button>
        <button className="btn btn-warning" onClick={(e)=>savearpremin(e)}>save</button>
        <button className="btn btn-success" onClick={(e)=>submitarpremin(e)}>submit</button>
      </div>
    </div>
  );
}
