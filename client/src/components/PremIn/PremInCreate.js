import React, { useEffect, useState }  from "react";
import PremInTable from "./PremInTable";
import axios from "axios";
const config = require("../../config.json");

export default function PremInCreate() {
  const url = config.url;
  const [filterData, setFilterData] = useState(
    {
        "billadvisorno": null,
        "insurerCode": null,
        "agentCode": null,
        "CashierReceiveNo": null,
        "dueDate" : null,
        "policyNoAll" : true

    })
    const [policiesData, setPoliciesData] = useState([])
  const colsData = [
    "insurerCode",
    "advisorCode",
    "Duedate",
    "Policyno",
    "Endorseno",
    "Invoiceno",
    "seqno",
    "customerid",
    "insuredname",
    "licenseno",
    "province",
    "chassisno",
    "grossprem",
    "duty",
    "tax",
    "totalamt",
    "comm-out%",
    "comm-out-amt",
    "ov-out%",
    "ov-out-amt",
    "[] net",
    "billpremium",
  ];
  
  const rowData = [
    {
      advisorCode: "ADV" + Math.floor(Math.random() * 1000),
      insurerCode: "INS" + Math.floor(Math.random() * 1000),
      Duedate: "2023-09-15",
      Policyno: "POL" + Math.floor(Math.random() * 10000),
      Endorseno: "END" + Math.floor(Math.random() * 100),
      Invoiceno: "INV" + Math.floor(Math.random() * 1000),
      seqno: Math.floor(Math.random() * 100),
      customerid: "CUST" + Math.floor(Math.random() * 1000),
      insuredname: "John Doe",
      licenseno: "ABC123",
      province: "California",
      chassisno: "CHS" + Math.floor(Math.random() * 1000),
      grossprem: Math.floor(Math.random() * 1000),
      duty: Math.floor(Math.random() * 1000),
      tax: Math.floor(Math.random() * 1000),
      totalamt: Math.floor(Math.random() * 1000),
      "comm-out%": Math.floor(Math.random() * 1000),
      "comm-out-amt": Math.floor(Math.random() * 1000),
    },
    {
      insurerCode: "INS" + Math.floor(Math.random() * 1000),
      advisorCode: "ADV" + Math.floor(Math.random() * 1000),
      Duedate: "2023-09-15",
      Policyno: "POL" + Math.floor(Math.random() * 10000),
      Endorseno: "END" + Math.floor(Math.random() * 100),
      Invoiceno: "INV" + Math.floor(Math.random() * 1000),
      seqno: Math.floor(Math.random() * 100),
      customerid: "CUST" + Math.floor(Math.random() * 1000),
      insuredname: "John Doe",
      licenseno: "ABC123",
      province: "California",
      chassisno: "CHS" + Math.floor(Math.random() * 1000),
      grossprem: Math.floor(Math.random() * 1000),
      duty: Math.floor(Math.random() * 1000),
      tax: Math.floor(Math.random() * 1000),
      totalamt: Math.floor(Math.random() * 1000),
      "comm-out%": Math.floor(Math.random() * 1000),
      "comm-out-amt": Math.floor(Math.random() * 1000),
    },
    {
      insurerCode: "INS" + Math.floor(Math.random() * 1000),
      advisorCode: "ADV" + Math.floor(Math.random() * 1000),
      Duedate: "2023-09-15",
      Policyno: "POL" + Math.floor(Math.random() * 10000),
      Endorseno: "END" + Math.floor(Math.random() * 100),
      Invoiceno: "INV" + Math.floor(Math.random() * 1000),
      seqno: Math.floor(Math.random() * 100),
      customerid: "CUST" + Math.floor(Math.random() * 1000),
      insuredname: "John Doe",
      licenseno: "ABC123",
      province: "California",
      chassisno: "CHS" + Math.floor(Math.random() * 1000),
      grossprem: Math.floor(Math.random() * 1000),
      duty: Math.floor(Math.random() * 1000),
      tax: Math.floor(Math.random() * 1000),
      totalamt: Math.floor(Math.random() * 1000),
      "comm-out%": Math.floor(Math.random() * 1000),
      "comm-out-amt": Math.floor(Math.random() * 1000),
    },
    {
      insurerCode: "INS" + Math.floor(Math.random() * 1000),
      advisorCode: "ADV" + Math.floor(Math.random() * 1000),
      Duedate: "2023-09-15",
      Policyno: "POL" + Math.floor(Math.random() * 10000),
      Endorseno: "END" + Math.floor(Math.random() * 100),
      Invoiceno: "INV" + Math.floor(Math.random() * 1000),
      seqno: Math.floor(Math.random() * 100),
      customerid: "CUST" + Math.floor(Math.random() * 1000),
      insuredname: "John Doe",
      licenseno: "ABC123",
      province: "California",
      chassisno: "CHS" + Math.floor(Math.random() * 1000),
      grossprem: Math.floor(Math.random() * 1000),
      duty: Math.floor(Math.random() * 1000),
      tax: Math.floor(Math.random() * 1000),
      totalamt: Math.floor(Math.random() * 1000),
      "comm-out%": Math.floor(Math.random() * 1000),
      "comm-out-amt": Math.floor(Math.random() * 1000),
    },
    {
      insurerCode: "INS" + Math.floor(Math.random() * 1000),
      advisorCode: "ADV" + Math.floor(Math.random() * 1000),
      Duedate: "2023-09-15",
      Policyno: "POL" + Math.floor(Math.random() * 10000),
      Endorseno: "END" + Math.floor(Math.random() * 100),
      Invoiceno: "INV" + Math.floor(Math.random() * 1000),
      seqno: Math.floor(Math.random() * 100),
      customerid: "CUST" + Math.floor(Math.random() * 1000),
      insuredname: "John Doe",
      licenseno: "ABC123",
      province: "California",
      chassisno: "CHS" + Math.floor(Math.random() * 1000),
      grossprem: Math.floor(Math.random() * 1000),
      duty: Math.floor(Math.random() * 1000),
      tax: Math.floor(Math.random() * 1000),
      totalamt: Math.floor(Math.random() * 1000),
      "comm-out%": Math.floor(Math.random() * 1000),
      "comm-out-amt": Math.floor(Math.random() * 1000),
    },
    {
      insurerCode: "INS" + Math.floor(Math.random() * 1000),
      advisorCode: "ADV" + Math.floor(Math.random() * 1000),
      Duedate: "2023-09-15",
      Policyno: "POL" + Math.floor(Math.random() * 10000),
      Endorseno: "END" + Math.floor(Math.random() * 100),
      Invoiceno: "INV" + Math.floor(Math.random() * 1000),
      seqno: Math.floor(Math.random() * 100),
      customerid: "CUST" + Math.floor(Math.random() * 1000),
      insuredname: "John Doe",
      licenseno: "ABC123",
      province: "California",
      chassisno: "CHS" + Math.floor(Math.random() * 1000),
      grossprem: Math.floor(Math.random() * 1000),
      duty: Math.floor(Math.random() * 1000),
      tax: Math.floor(Math.random() * 1000),
      totalamt: Math.floor(Math.random() * 1000),
      "comm-out%": Math.floor(Math.random() * 1000),
      "comm-out-amt": Math.floor(Math.random() * 1000),
    },
    {
      insurerCode: "INS" + Math.floor(Math.random() * 1000),
      advisorCode: "ADV" + Math.floor(Math.random() * 1000),
      Duedate: "2023-09-15",
      Policyno: "POL" + Math.floor(Math.random() * 10000),
      Endorseno: "END" + Math.floor(Math.random() * 100),
      Invoiceno: "INV" + Math.floor(Math.random() * 1000),
      seqno: Math.floor(Math.random() * 100),
      customerid: "CUST" + Math.floor(Math.random() * 1000),
      insuredname: "John Doe",
      licenseno: "ABC123",
      province: "California",
      chassisno: "CHS" + Math.floor(Math.random() * 1000),
      grossprem: Math.floor(Math.random() * 1000),
      duty: Math.floor(Math.random() * 1000),
      tax: Math.floor(Math.random() * 1000),
      totalamt: Math.floor(Math.random() * 1000),
      "comm-out%": Math.floor(Math.random() * 1000),
      "comm-out-amt": Math.floor(Math.random() * 1000),
    },
    {
      insurerCode: "INS" + Math.floor(Math.random() * 1000),
      advisorCode: "ADV" + Math.floor(Math.random() * 1000),
      Duedate: "2023-09-15",
      Policyno: "POL" + Math.floor(Math.random() * 10000),
      Endorseno: "END" + Math.floor(Math.random() * 100),
      Invoiceno: "INV" + Math.floor(Math.random() * 1000),
      seqno: Math.floor(Math.random() * 100),
      customerid: "CUST" + Math.floor(Math.random() * 1000),
      insuredname: "John Doe",
      licenseno: "ABC123",
      province: "California",
      chassisno: "CHS" + Math.floor(Math.random() * 1000),
      grossprem: Math.floor(Math.random() * 1000),
      duty: Math.floor(Math.random() * 1000),
      tax: Math.floor(Math.random() * 1000),
      totalamt: Math.floor(Math.random() * 1000),
      "comm-out%": Math.floor(Math.random() * 1000),
      "comm-out-amt": Math.floor(Math.random() * 1000),
    },
    {
      insurerCode: "INS" + Math.floor(Math.random() * 1000),
      advisorCode: "ADV" + Math.floor(Math.random() * 1000),
      Duedate: "2023-09-15",
      Policyno: "POL" + Math.floor(Math.random() * 10000),
      Endorseno: "END" + Math.floor(Math.random() * 100),
      Invoiceno: "INV" + Math.floor(Math.random() * 1000),
      seqno: Math.floor(Math.random() * 100),
      customerid: "CUST" + Math.floor(Math.random() * 1000),
      insuredname: "John Doe",
      licenseno: "ABC123",
      province: "California",
      chassisno: "CHS" + Math.floor(Math.random() * 1000),
      grossprem: Math.floor(Math.random() * 1000),
      duty: Math.floor(Math.random() * 1000),
      tax: Math.floor(Math.random() * 1000),
      totalamt: Math.floor(Math.random() * 1000),
      "comm-out%": Math.floor(Math.random() * 1000),
      "comm-out-amt": Math.floor(Math.random() * 1000),
    },
  ];
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


                const array = []
                for (let i = 0; i < res.data.length; i++) {
                    // console.log(statementtypeData[i].statementtype == null? res.data[i].totalprem -res.data[i].commout_amt-res.data[i].ovout_amt: res.data[i].totalprem);
                    array.push(res.data[i].totalprem)

                }
                console.log(array);
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
            alert("dont find CashierReceiveNo : " + filterData.CashierReceiveNo);

        } else {


          console.log(res.data);
            const data = {...filterData , ActualValue : res.data[0].amt}
            setFilterData(data)
        }
    })
    .catch((err) => {

         alert("dont find CashierReceiveNo : " + filterData.CashierReceiveNo);

    });
  }else if (e.target.name === 'bill-btn'){
    axios
    .post(url + "/araps/getbilldata", filterData)
    .then((res) => {
        if (res.status === 201) {
            console.log(res.data);
            alert("dont find billadvisorNo : " + filterData.billadvisorno);

        } else {

            const data = {...filterData , agentCode : res.data.billdata[0].agentCode, insurerCode : res.data.billdata[0].insurerCode, amt : res.data.billdata[0].amt}
            setFilterData(data)
            setPoliciesData(res.data.trans)
            // const arrTr = []
            // res.data.trans.map((ele,i) =>{
            //   arrTr.push(
            //     {advisorCode: ele.agentCode,
            //     insurerCode: ele.insurerCode,
            //     Duedate: ele.dueDate,
            //     Policyno: ele.policyNo,
            //     Endorseno: ele.endorseNo,
            //     Invoiceno: '-',
            //     seqno: ele.seqNo,
            //     customerid: 5,
            //     insuredname: "John Doe",
            //     licenseno: "ABC123",
            //     province: "California",
            //     chassisno: "CHS" + Math.floor(Math.random() * 1000),
            //     grossprem: Math.floor(Math.random() * 1000),
            //     duty: Math.floor(Math.random() * 1000),
            //     tax: Math.floor(Math.random() * 1000),
            //     totalamt: Math.floor(Math.random() * 1000),
            //     "comm-out%": Math.floor(Math.random() * 1000),
            //     "comm-out-amt": Math.floor(Math.random() * 1000),
            //     "ov-out%": Math.floor(Math.random() * 1000),
            //     "ov-out-amt": Math.floor(Math.random() * 1000),
            //     "net []": true,
            //     "billpremium" : 54584215}
            //   )
            // }) 
            
            
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
          <label class="col-sm-2 col-form-label" htmlFor="CashierReceiveNo">
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
              {/* CashierReceiveNo */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="CashierReceiveNo">
            CashierReceiveNo
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="CashierReceiveNo"
              id="CashierReceiveNo"
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
          <label class="col-sm-2 col-form-label" htmlFor="Amt">
            Amt
          </label>
          <div className="col-4 ">
            <input className="form-control" type="number" name="Amt" id="Amt" value={filterData.amt} disabled/>
          </div>
        </div>
        {/* ActualValue */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="ActualValue">
            ActualValue
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="number"
              name="ActualValue"
              value={filterData.ActualValue}
              id="ActualValue"
              disabled
            />
          </div>
          <label class="col-sm-2 col-form-label" htmlFor="ActualValue">
            DiffAmt
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="number"
              name="DiffAmt"
              id="DiffAmt"
              value={filterData.ActualValue - filterData.amt}
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
      </div>
    </div>
  );
}
