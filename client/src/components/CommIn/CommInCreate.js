import React, { useEffect, useState }  from "react";
import PremInTable from "../PremIn/PremInTable";
import axios from "axios";
const config = require("../../config.json");

export default function CommInCreate() {
  const url = config.url;
  const [filterData, setFilterData] = useState(
    {
       
        "insurerCode": null,
        "agentCode": null,
        "dueDate" : null,
        "reconcile" : true,
        "cashieramt":null,
        "actualvalue": null,

    })
    const [policiesData, setPoliciesData] = useState([])
    const [artype, setArtype] = useState('N')
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


const savearpremout = async (e) => {
  console.log({master :  {...filterData, diffamt: document.getElementsByName('DiffAmt')[0].value}, trans : policiesData});
  await axios.post(url + "/araps/savearpremin", {master : filterData, trans : policiesData}).then((res) => {
    alert("save account recive successed!!!");
    // window.location.reload(false);
  });
};

const submitarpremout = async (e) => {
  console.log({master :  {...filterData, diffamt: document.getElementsByName('DiffAmt')[0].value}, trans : policiesData});
  await axios.post(url + "/araps/submitarpremin", {master :filterData, trans : policiesData}).then((res) => {
    alert("save account recive successed!!!");
    // window.location.reload(false);
  });
};

  return (
    <div className="container d-fle justify-content-center my-5">
      <form onSubmit={(e)=>submitFilter(e)}>
        <h1>ตัดหนี้ Comm/ov-in</h1>
       

       {/* type  */}
       <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="insurerCode">
            รูปแบบการตัดหนี้ 
          </label>
          
          <div class="form-check col-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e)=>setArtype('N')}/>
  <label class="form-check-label" for="flexRadioDefault1">
    จ่ายเงินที่ amity
  </label>
</div>
<div class="form-check col-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={(e)=>setArtype('D')}/>
  <label class="form-check-label" for="flexRadioDefault2">
    จ่ายเงินที่ บริษัทประกัน
  </label>
</div>
        </div>

        {/* change by premin type  */}
        
        <div className="row my-3">
        {artype === 'N'? 
        <label class="col-sm-2 col-form-label" htmlFor="dfrpreferno">
          เลขที่ตัดจ่าย PREM-OUT ให้ประกัน
        </label>
         :
         <label class="col-sm-2 col-form-label" htmlFor="dfrpreferno">
         เลขที่รายการที่ลูกค้าจ่ายเงินที่ประกัน
       </label>}
        <div className="col-4 ">
          <input
            className="form-control"
            type="text"
            name="dfrpreferno"
            id="dfrpreferno"
            value={filterData.dfrpreferno}
            onChange={handleChange}
          />
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
          {/* cashierReceiveNo */}
          <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="cashierreceiveno">
          cashierReceiveNo
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
          </div>
         {/* cashieramt  */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="cashieramt">
            amt
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="number"
              name="cashieramt"
              id="cashieramt"
              onChange={handleChange}
              />
          </div>
        </div>
        {/* actualvalue  */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="actualvalue">
          ActualValue
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="number"
              name="actualvalue"
              id="actualvalue"
              onChange={handleChange}
              />
          </div>
        </div>
        {/* diff-amt */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="diffamt">
          Diff-amt
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="number"
              name="diffamt"
              id="diffamt"
              disabled
              value={filterData.actualvalue - filterData.cashieramt}
              // onChange={handleChange}
              />
          </div>
        </div>
       
        
        <div className="row my-3">
          <input type="submit" className="btn btn-success"/>
        </div>
      </form>
      <div>
        <PremInTable cols={colsData} rows={policiesData} />
        <button className="btn btn-primary">Export To Excel</button>
        <button className="btn btn-warning" onClick={(e)=>savearpremout(e)}>save</button>
        <button className="btn btn-success" onClick={(e)=>submitarpremout(e)}>submit</button>
      </div>
    </div>
  );
}
