import React, { useEffect, useState}  from "react";

import { useParams} from "react-router-dom";
import PremInTable from "./PremInTable";
import axios from "axios";

const config = require("../../config.json");

export default function PremInPaid() {
  const url = config.url;
  const [filterData, setFilterData] = useState(
    {
        "billadvisorno": null,
        "insurerCode": null,
        "agentCode": null,
        "cashierreceiveno": null,
        "arno" : null 

    })
    const [policiesData, setPoliciesData] = useState([])
  const colData = [
    "InsurerCode",
    "AdvisorCode",
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
    "comm-in%",
    "comm-in-amt",
    "vat-comm-in",
    "comm-in + vat-comm_in",
    "ov-in%",
    "ov-in amt",
    "vat-comm-in",
    "ov-in  + vat-ov_in",
  ];
  const rowData = [
    {
      AdvisorCode: "ADV" + Math.floor(Math.random() * 1000),
      InsurerCode: "INS" + Math.floor(Math.random() * 1000),
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
      grossprem: Math.random() * 1000,
      duty: Math.random() * 100,
      tax: Math.random() * 50,
      totalamt: Math.random() * 1500,
      "comm-out%": Math.random() * 10,
      "comm-out-amt": Math.random() * 100,
    },
    {
      InsurerCode: "INS" + Math.floor(Math.random() * 1000),
      AdvisorCode: "ADV" + Math.floor(Math.random() * 1000),
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
      grossprem: Math.random() * 1000,
      duty: Math.random() * 100,
      tax: Math.random() * 50,
      totalamt: Math.random() * 1500,
      "comm-out%": Math.random() * 10,
      "comm-out-amt": Math.random() * 100,
    },
    {
      InsurerCode: "INS" + Math.floor(Math.random() * 1000),
      AdvisorCode: "ADV" + Math.floor(Math.random() * 1000),
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
      grossprem: Math.random() * 1000,
      duty: Math.random() * 100,
      tax: Math.random() * 50,
      totalamt: Math.random() * 1500,
      "comm-out%": Math.random() * 10,
      "comm-out-amt": Math.random() * 100,
    },
    {
      InsurerCode: "INS" + Math.floor(Math.random() * 1000),
      AdvisorCode: "ADV" + Math.floor(Math.random() * 1000),
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
      grossprem: Math.random() * 1000,
      duty: Math.random() * 100,
      tax: Math.random() * 50,
      totalamt: Math.random() * 1500,
      "comm-out%": Math.random() * 10,
      "comm-out-amt": Math.random() * 100,
    },
    // Add more objects as needed
  ];
  const { type } = useParams();
  //apis 
  const searchHandler=(e)=>{
    
  e.preventDefault();
    if (type === 'premout') {
      let data = filterData
      data.type = 'prem_out'
      setFilterData(data)
    }else if (type === 'commovout' ) {
      let data = filterData
      data.type = 'comm/ov_out'
      setFilterData(data)
    }else if (type === 'wht3') {
      let data = filterData
      data.type = 'wht_out'
      setFilterData(data)
    }
    axios
    .post(url + "/araps/getartrans", filterData)
    .then((res) => {
        if (res.status === 201) {
            console.log(res.data);
            alert("dont find billadvisorNo : " + filterData.billadvisorno);

        } else {

            const data = {...filterData , agentCode : res.data.billdata[0].agentCode, insurerCode : res.data.billdata[0].insurerCode,  actualvalue  : res.data.billdata[0].amt}
            setFilterData(data)
            setPoliciesData(res.data.trans)
            
            
        }
    })
    .catch((err) => {

         alert("dont find billadvisorNo : " + filterData.billadvisorno);

    });
  }
  return (
    <div className="container d-fle justify-content-center my-5">
      <form onSubmit={(e)=>searchHandler(e)}>
        <h1>แสดงรายการที่รับชำระหนี้</h1>
        {/* BillAdvisorNo */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="billAdvisorNo">
            BillAdvisorNo
          </label>
          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="billAdvisorNo"
              id="billAdvisorNo"
            />
          </div>
        </div>
        {/* Insurercode  */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="Insurercode">
            Insurercode
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="Insurercode"
              id="Insurercode"
            />
          </div>
          <div class="col-4 form-check d-flex align-items-center text-center  ">
            <div>
              <input
                class="form-check-input "
                type="checkbox"
                value=""
                id="Insurercode"
                name="Insurercode"
                checked
              />
              <label class="form-check-label" for="Insurercode">
                All
              </label>
            </div>
          </div>
        </div>
        {/* Advisorcode  */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="Advisorcode">
            Advisorcode
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="Advisorcode"
              id="Advisorcode"
            />
          </div>
          <div class="col-4 form-check d-flex align-items-center text-center  ">
            <div>
              <input
                class="form-check-input "
                type="checkbox"
                value=""
                id="Advisorcode"
                checked
                name="Advisorcode"
              />
              <label class="form-check-label" for="Advisorcode">
                All
              </label>
            </div>
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
            />
          </div>
          <div class="col-4 form-check d-flex align-items-center text-center  ">
            <div>
              <input
                class="form-check-input "
                type="checkbox"
                value=""
                id="flexCheckChecked"
                name="CashierReceiveNo"
                checked
              />
              <label class="form-check-label" for="CashierReceiveNo">
                All
              </label>
            </div>
          </div>
        </div>
        {/* ARNO */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="ARNO">
            ARNO
          </label>
          <div className="col-4 ">
            <input className="form-control" type="text" name="ARNO" id="ARNO" />
          </div>
          <div class="col-4 form-check d-flex align-items-center text-center  ">
            <div>
              <input
                class="form-check-input "
                type="checkbox"
                value=""
                id="ARNO"
                checked
                name="ARNO"
              />
              <label class="form-label" for="ARNO">
                All
              </label>
            </div>
          </div>
        </div>

        <div className="row my-3">
          <button className="btn btn-success">Search</button>
        </div>
      </form>
      <div>
        <PremInTable cols={colData} rows={rowData} />
        <button className="btn btn-primary">Export To Excel</button>
      </div>
    </div>
  );
}
