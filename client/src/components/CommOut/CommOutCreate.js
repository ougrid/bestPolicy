import React, { useEffect, useState }  from "react";
import PremInTable from "../PremIn/PremInTable";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
const config = require("../../config.json");

export default function CommOutCreate() {
  const url = window.globalConfig.BEST_POLICY_V1_BASE_URL;
  const wht = config.wht;
  const [filterData, setFilterData] = useState(
    {
       
        "effDatestart" : '1990-01-01',
        "effDateend" : '2100-01-01',
        "insurerCode": null,
        "agentCode": null,
        "policyNostart" : null,
        "policyNoend" : null,
        "dueDate" : null,

    })
    const [policiesData, setPoliciesData] = useState([])
    const [hidecard, setHidecard] = useState([false, 0]);
  const colsData = [
    "select",
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
  const cols2Data = {
    select : "select",
    insurerCode:"insurerCode",
    agentCode:"advisorCode",
    dueDate:"Duedate",
    policyNo:"Policyno",
    endorseNo: "Endorseno",
    invoiceNo: "Invoiceno",
    seqNo: "seqno",
    customerid: "customerid",
    insureename:  "insuredname",
    licenseNo: "licenseno",
    // province: "province", // nodata
    chassisNo: "chassisno",
    netgrossprem: "grossprem",
    duty: "duty",
    tax: "tax",
    totalprem: "totalamt",
    commin_rate: "comm-in%",
    commin_amt: "comm-in-amt",
    commin_taxamt: "vat-comm-in",
    commin_total: "comm-in-total",
    ovin_rate: "ov-in%",
    ovin_amt: "ov-in-amt",
    ovin_taxamt: "vat-ov-in",
    ovin_total: "ov-in-total",
    netflag: "[] net",
    paymentamt: "billpremium",

};
  const handleClose = (e) => {
      setHidecard([false, 0])
  }
   const editCard = (e) => {
    console.log(policiesData);
        setHidecard([true, 1])
        let totalprem = 0
        let commin_amt = 0
        let commin_taxamt = 0
        let ovin_amt = 0
        let ovin_taxamt = 0
        let paymentamt = 0
        for (let i = 0; i < policiesData.length; i++) {
            if (policiesData[i].select) {
              totalprem = totalprem + policiesData[i].totalprem
              commin_amt = commin_amt + policiesData[i].commin_amt
              commin_taxamt = commin_taxamt + policiesData[i].commin_taxamt
              ovin_amt = ovin_amt + policiesData[i].ovin_amt
              ovin_taxamt = ovin_taxamt + policiesData[i].ovin_taxamt
              paymentamt = paymentamt + policiesData[i].paymentamt
                }

            }
            filterData.netprem = totalprem
            filterData.commin = commin_amt
            filterData.vatcommin = commin_taxamt
            filterData.ovin = ovin_amt
            filterData.vatovin = ovin_taxamt
            filterData.whtovin = parseFloat((ovin_amt*wht).toFixed(2))
            filterData.whtcommin = parseFloat((commin_amt).toFixed(2))
            filterData.actualvalue = paymentamt
        

        // const total = {
        //     no: net.no + gross.no,
        //     prem: net.prem + gross.prem,
        //     comm_out: net.comm_out,
        //     whtcom: net.whtcom,
        //     ov_out: net.ov_out,
        //     whtov: net.whtov,
        //     billprem: net.prem + gross.prem - net.comm_out + net.whtcom - net.ov_out + net.whtov
        // }
        // setPoliciesRender({ net: net, gross: gross, total: total })
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
        .post(url + "/araps/getapcommout", filterData)
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
                
                alert("find trans premout success")
            }
        })
        .catch((err) => {

            // alert("create snew insuree fail");

        });
};


const saveapcommout = async (e) => {
  console.log({master :  filterData, trans : policiesData});
  await axios.post(url + "/araps/saveapcommout", {master : filterData, trans : policiesData}).then((res) => {
    alert("save account recive successed!!!");
    // window.location.reload(false);
  });
};

const submitapcommout = async (e) => {
  console.log({master :  filterData, trans : policiesData});
  await axios.post(url + "/araps/submitapcommout", {master :filterData, trans : policiesData}).then((res) => {
    alert("save account recive successed!!!");
    // window.location.reload(false);
  });
};

  return (
    <div className="container d-fle justify-content-center my-5">
      <form onSubmit={(e)=>submitFilter(e)}>
        <h1>จ่ายเงินค่า comm-out, ov-out ให้กับ advisor</h1>
       
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
          {/* PolicyNo*/}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="policyNo">
            PolicyNo
          </label>
          <div className="col-4 " id="policyNo">
            <label class="col-sm-2 col-form-label" htmlFor="policyNostart">
              From
            </label>
            <input
              className="form-control"
              type="text"
              name="policyNostart"
              id="policyNostart"
              onChange={handleChange}
            />
          </div>

          <div className="col-4 ">
            <label class="col-sm-2 col-form-label" htmlFor="policyNoend">
              To
            </label>
            <input
              className="form-control"
              type="text"
              name="policyNoend"
              id="policyNoend"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Effectivedate*/}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="effDate">
           Effective Date
          </label>
          <div className="col-4 " id="effDate">
            <label class="col-sm-2 col-form-label" htmlFor="effDatestart">
              From
            </label>
            <input
              className="form-control"
              type="date"
              name="effDatestart"
              id="policyNostart"
              onChange={handleChange}
            />
          </div>

          <div className="col-4 ">
            <label class="col-sm-2 col-form-label" htmlFor="effDateend">
              To
            </label>
            <input
              className="form-control"
              type="date"
              name="effDateend"
              id="effDateend"
              onChange={handleChange}
            />
          </div>
        </div>
         {/* duedate  */}
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
       
        
        <div className="row my-3">
          <input type="submit" className="btn btn-success"/>
        </div>
      </form>
      <Modal size='m' show={hidecard[0]} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <div class="row">
                        <div class="col-6">
                            <label class="col-form-label">เลขที่ใบวางบิล</label>
                        </div>
                        <div class="col-6"> {filterData.billadvisor}</div>
                    </div> */}
                    <div class="row">
                        <div class="col-6">
                            <label class="col-form-label">totalpremium</label>
                            </div>
                        <div class="col-6">
                           <label class="col-form-label">{filterData.netprem}</label></div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label class="col-form-label">comm-in</label>
                        </div>
                        <div class="col-6"> <label class="col-form-label">{filterData.commin}</label></div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label class="col-form-label">VAT comm-in</label>
                        </div>
                        <div class="col-6"> <label class="col-form-label">{filterData.vatcommin}</label></div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label class="col-form-label">ov-in</label>
                        </div>
                        <div class="col-6"> <label class="col-form-label">{filterData.ovin}</label></div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label class="col-form-label">VAT ov-in</label>
                        </div>
                        <div class="col-6"> <label class="col-form-label">{filterData.vatovin}</label></div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label class="col-form-label">paymentamt</label>
                        </div>
                        <div class="col-6"> <label class="col-form-label">{filterData.actualvalue}</label></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-warning" onClick={(e)=>saveapcommout(e)}>save</button>
        <button className="btn btn-success" onClick={(e)=>submitapcommout(e)}>submit</button>
                </Modal.Footer>
            </Modal>
      <div>
        <PremInTable cols={cols2Data} rows={policiesData} handleChange={handleChange}/>
        <button className="btn btn-primary">Export To Excel</button>
        <button type="button" class="btn btn-primary " onClick={(e) => editCard(e)} >confirm</button>
       
      </div>
    </div>
  );
}
