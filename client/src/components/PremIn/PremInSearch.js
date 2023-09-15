import React, { useEffect, useState } from "react";
import PremInTable from "./PremInTable";
import axios from 'axios'
const config = require("../../config.json");
export default function PremInSearch() {
  const url = config.url;
  const [filterData, setFilterData] = useState(
    {
      billadvisorno : null,
      insurercode : null,
      advisorcode : null,
      cashierreceiveno : null,
      refno : null,
      arno : null,
      ardatestart : null,
      ardateend : null,
      arcreateusercode : null,
    })
    const [policiesData, setPoliciesData] = useState([])
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
    billadvisorno: "Billadvisorno",
    insurercode :"insurercode",
    advisorcode:  "advisorcode",
    cashierreceiveno:  "CashierReceiptNo",
    cashierdate:  "CashierDate",
    cashieramt: "CashierAmt",
    ARNO : "ARNO",
    ARDate : "ARDate",
    ARcreateusercode: "ARcreateusercode",
    actualvalue: "ActualValue",
    diffamt:  "DiffAmt",
    status : "status",
  };
  
  const handleChange = (e) => {
    
    setFilterData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
};
  //apis
  const searchHandler=(e)=>{
    e.preventDefault();
    axios.get().then(res=>{
      
      //do search api logic
    }).catch(()=>{
      alert('error')
    })
  }
  const submitFilter = (e) => {
    e.preventDefault();
    // console.log(filterData);
    axios
        .post(url + "/araps/getarpremindata", filterData)
        .then((res) => {
            if (res.status === 201) {
                console.log(res.data);
                alert("not found policy")

            } else {


                // const array = []
               console.log(res.data);
                setPoliciesData(res.data)
                
                alert("find arno success")
            }
        })
        .catch((err) => {

            // alert("create snew insuree fail");

        });
};
  return (
    <div className="container d-fle justify-content-center my-5">
      <form onSubmit={(e)=>searchHandler(e)}>
        <h1>ค้นหารายการ</h1>
        {/* BillAdvisorNo */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="billadvisorno">
            BillAdvisorNo
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
        </div>
        {/* Insurercode  */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="insurercode">
            Insurercode
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="insurercode"
              id="insurercode"
              onChange={handleChange}
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
          <label class="col-sm-2 col-form-label" htmlFor="advisorcode">
            Advisorcode
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="advisorcode"
              id="advisorcode"
              onChange={handleChange}
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
          <label class="col-sm-2 col-form-label" htmlFor="cashierreceiveno">
            CashierReceiveNo
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
          <label class="col-sm-2 col-form-label" htmlFor="refno">
            Refno
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="refno"
              id="refno"
              onChange={handleChange}
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
       {/* ARNO  */}
       <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="arno">
            ARNO
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="arno"
              id="arno"
              onChange={handleChange}
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
        {/* ARDATE*/}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="ardate">
            ARDATE
          </label>
          <div className="col-5 " id="ardate">
            <label class="col-sm-2 col-form-label" htmlFor="ardatestart">
              From
            </label>
            <input
              className="form-control"
              type="date"
              name="ardatestart"
              id="ardatestart"
              onChange={handleChange}
            />
          </div>

          <div className="col-5 ">
            <label class="col-sm-2 col-form-label" htmlFor="ardateend">
              To
            </label>
            <input
              className="form-control"
              type="date"
              name="ardateend"
              id="ardateend"
              onChange={handleChange}
            />
          </div>
        </div>
        
         {/* ARcreateusercode */}
         <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="arcreateusercode">
            ARcreateusercode
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="arcreateusercode"
              id="arcreateusercode"
              onChange={handleChange}
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
        <div className="row my-3">
          <button className="btn btn-success" onClick={submitFilter}>Search</button>
        </div>
      </form>
      <div>
        <PremInTable cols={colData2} rows={policiesData} />
      </div>
    </div>
  );
}
