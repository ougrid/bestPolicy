import React from "react";
import PremInTable from "./PremInTable";
import axios from 'axios'
export default function PremInSearch() {
  const colData = [
    "Billadvisorno",
    "insurercode",
    "advisorcode",
    "CashierReceiptNo",
    "CashierDate",
    "CashierAmt",
    "ARNO",
    "ARDate",
    "ARcreateusercode",
    "ActualValue",
    "DiffAmt",
    "status",
  ];
  const colData2 = {
    Billadvisorno:"Billadvisorno",
    insurercode :"insurercode",
    advisorcode: "advisorcode",
    CashierReceiptNo: "CashierReceiptNo",
    CashierDate: "CashierDate",
    CashierAmt: "CashierAmt",
    ARNO : "ARNO",
    ARDate : "ARDate",
    ARcreateusercode :"ARcreateusercode",
    ActualValue :"ActualValue",
    DiffAmt : "DiffAmt",
    status : "status",
  };
  const rowData = [
    {
      Billadvisorno: Math.floor(Math.random() * 9000) + 1000,
      insurercode: Math.floor(Math.random() * 900) + 100,
      advisorcode: Math.floor(Math.random() * 9000) + 1000,
      CashierReceiptNo: Math.floor(Math.random() * 90000) + 10000,
      CashierDate: "2023-08-28",
      CashierAmt: Math.floor(Math.random() * 901) + 100,
      ARNO: Math.floor(Math.random() * 9000) + 1000,
      ARDate: "2023-08-29",
      ARcreateusercode: Math.floor(Math.random() * 900) + 100,
      ActualValue: Math.floor(Math.random() * 1001) + 500,
      DiffAmt: Math.floor(Math.random() * 101),
      status: "Pending",
    },
    {
      Billadvisorno: Math.floor(Math.random() * 9000) + 1000,
      insurercode: Math.floor(Math.random() * 900) + 100,
      advisorcode: Math.floor(Math.random() * 9000) + 1000,
      CashierReceiptNo: Math.floor(Math.random() * 90000) + 10000,
      CashierDate: "2023-08-28",
      CashierAmt: Math.floor(Math.random() * 901) + 100,
      ARNO: Math.floor(Math.random() * 9000) + 1000,
      ARDate: "2023-08-29",
      ARcreateusercode: Math.floor(Math.random() * 900) + 100,
      ActualValue: Math.floor(Math.random() * 1001) + 500,
      DiffAmt: Math.floor(Math.random() * 101),
      status: "Pending",
    },
    {
      Billadvisorno: Math.floor(Math.random() * 9000) + 1000,
      insurercode: Math.floor(Math.random() * 900) + 100,
      advisorcode: Math.floor(Math.random() * 9000) + 1000,
      CashierReceiptNo: Math.floor(Math.random() * 90000) + 10000,
      CashierDate: "2023-08-28",
      CashierAmt: Math.floor(Math.random() * 901) + 100,
      ARNO: Math.floor(Math.random() * 9000) + 1000,
      ARDate: "2023-08-29",
      ARcreateusercode: Math.floor(Math.random() * 900) + 100,
      ActualValue: Math.floor(Math.random() * 1001) + 500,
      DiffAmt: Math.floor(Math.random() * 101),
      status: "Pending",
    },
    {
      Billadvisorno: Math.floor(Math.random() * 9000) + 1000,
      insurercode: Math.floor(Math.random() * 900) + 100,
      advisorcode: Math.floor(Math.random() * 9000) + 1000,
      CashierReceiptNo: Math.floor(Math.random() * 90000) + 10000,
      CashierDate: "2023-08-28",
      CashierAmt: Math.floor(Math.random() * 901) + 100,
      ARNO: Math.floor(Math.random() * 9000) + 1000,
      ARDate: "2023-08-29",
      ARcreateusercode: Math.floor(Math.random() * 900) + 100,
      ActualValue: Math.floor(Math.random() * 1001) + 500,
      DiffAmt: Math.floor(Math.random() * 101),
      status: "Pending",
    },
    // Add more objects as needed
  ];
  //apis
  const searchHandler=(e)=>{
    e.preventDefault();
    axios.get().then(res=>{
      
      //do search api logic
    }).catch(()=>{
      alert('error')
    })
  }
  return (
    <div className="container d-fle justify-content-center my-5">
      <form onSubmit={(e)=>searchHandler(e)}>
        <h1>ค้นหารายการ</h1>
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
        {/* Refno */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="Refno">
            Refno
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="Refno"
              id="Refno"
            />
          </div>
          <div class="col-4 form-check d-flex align-items-center text-center  ">
            <div>
              <input
                class="form-check-input "
                type="checkbox"
                value=""
                id="Refno"
                checked
                name="Refno"
              />
              <label class="form-label" for="Refno">
                All
              </label>
            </div>
          </div>
        </div>
        {/* AR createusercode */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="ARcreateusercode">
            AR createusercode
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="ARcreateusercode"
              id="ARcreateusercode"
            />
          </div>
          <div class="col-4 form-check d-flex align-items-center text-center  ">
            <div>
              <input
                class="form-check-input "
                type="checkbox"
                value=""
                id="ARcreateusercode"
                checked
                name="ARcreateusercode"
              />
              <label class="form-check-label" for="ARcreateusercode">
                All
              </label>
            </div>
          </div>
        </div>
        {/* ARDATE*/}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="ARcreateusercode">
            ARDATE
          </label>
          <div className="col-5 " id="ARcreateusercode">
            <label class="col-sm-2 col-form-label" htmlFor="ARcreateusercode">
              From
            </label>
            <input
              className="form-control"
              type="date"
              name="ARcreateusercode"
              id="ARcreateusercode"
            />
          </div>

          <div className="col-5 ">
            <label class="col-sm-2 col-form-label" htmlFor="ARcreateusercode">
              To
            </label>
            <input
              className="form-control"
              type="date"
              name="ARcreateusercode"
              id="ARcreateusercode"
            />
          </div>
        </div>
        {/* ARcreateusercode  */}
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
                id="flexCheckChecked"
                checked
              />
              <label class="form-check-label" for="flexCheckChecked">
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
        <PremInTable cols={colData} rows={rowData} cols2 ={colData2}/>
      </div>
    </div>
  );
}
