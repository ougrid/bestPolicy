import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import PolicyCard from "./PolicyCard";
import Modal from 'react-bootstrap/Modal';
import * as XLSX from 'xlsx';
import Select from 'react-select';
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
import { useCookies } from "react-cookie";

const config = require("../../config.json");

const NormalText = {
    color: "white",
    paddingBottom: "10px",
};
/* eslint-disable react-hooks/exhaustive-deps */

const FindPolicy = () => {
    const [cookies] = useCookies(["jwt"]);
  const headers = {
    headers: { Authorization: `Bearer ${cookies["jwt"]}` }
};
    const url = window.globalConfig.BEST_POLICY_V1_BASE_URL;
    const navigate = useNavigate();
    const [insureeData, setinsureeData] = useState({ entityID: null });
    const [entityData, setEntityData] = useState({ personType: 'P' });
    const [locationData, setLocationData] = useState({ entityID: null, locationType: 'A' });
    // dropdown
    const [provinceDD, setProvinceDD] = useState([])
    const [filterData, setFilterData] = useState(
        {
            "insurerCode": null,
            "policyNo": null,
            "insureID": null,
            "createdate_start": null,
            "effdate_start": null,
            "createusercode": null,
            "agentCode": null,
            "carRegisNo" : null,
            "chassisNo" : null,
            "provinceID" : null,
            "status" : 'A',

        })
    const [policiesData, setPoliciesData] = useState([])
    const [insureTypeDD, setInsureTypeDD] = useState([]);
    const [exportPolicyData, setExportPolicyData] = useState([])
    const [insurerDD, setInsurerDD] = useState([]);
    const [hidecard, setHidecard] = useState([false,0]);

    const ExportData = () => {
        const filename = 'reports-policy.xlsx';

        var ws = XLSX.utils.json_to_sheet(exportPolicyData);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Policy");
        XLSX.writeFile(wb, filename);
    }

    useEffect(() => {
        //get province
        axios
            .get(url + "/static/provinces/all", headers)
            .then((province) => {
                const array = []
                province.data.forEach(ele => {
                    // array.push(<option key={ele.provinceid} value={ele.provinceid}>{ele.t_provincename}</option>)
                    array.push({label:ele.t_provincename, value:ele.provinceid})
                });
                setProvinceDD(array)
            })
            .catch((err) => {
                // alert("cant get province");
            });

        // get insuretype all
        axios
            .get(url + "/insures/insuretypeall", headers)
            .then((insuretype) => {
                const array = [];
                insuretype.data.forEach((ele) => {
                    array.push(
                        <option key={ele.id} value={ele.id}>
                            {ele.class} : {ele.subClass}
                        </option>
                    );
                });
                setInsureTypeDD(array);
            })
            .catch((err) => { });

        // get insurer all
        axios
            .get(url + "/persons/insurerall", headers)
            .then((insurer) => {
                const array = [];
                insurer.data.forEach((ele) => {
                    array.push(
                        <option key={ele.id} value={ele.insurerCode}>
                            {ele.insurerCode}
                        </option>
                    );
                });
                setInsurerDD(array);
            })
            .catch((err) => { });


    }, []);


    const changestatus = (e) => {
        // e.preventDefault();
        const array = policiesData
        array[e.target.id] = { ...policiesData[e.target.id], [e.target.name]: e.target.checked }
        setPoliciesData(array)

    };
    const handleChange = (e) => {
        setFilterData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleChangeCard = async (e,index,data) => {
        e.preventDefault();
        setHidecard([false,0])
        if (e.target.name === 'saveChange') {
          const array =    data
          policiesData[index] = array
          
          setPoliciesData(policiesData)
          // setCurrentForm(formData.slice(currentPage, currentPage + postsPerPage ))
          console.log(policiesData);
        }
      };
    

    const submitFilter = (e) => {
        // e.preventDefault();
        console.log(filterData);
        axios
            .post(url + "/policies/policygetlist", filterData, headers)
            .then((res) => {
                // let token = res.data.jwt;
                // let decode = jwt_decode(token);
                // navigate("/");
                // window.location.reload();
                // localStorage.setItem("jwt", token);
                console.log(res.data);
                alert("find data success")
                const array = []
                setExportPolicyData(res.data)
                // for (let i = 0; i < res.data.length; i++) {
                //     array.push(<tr>
                //         <th scope="row">{i + 1}</th>
                //         {res.data[i].status === 'I'?
                //         <>
                //         <td scope="row"><input type="checkbox" name="select" id={i} onClick={changestatus} /></td>
                //         <td scope="row"><button type="button" class="btn btn-secondary " id={i} onClick={(e)=>editCard(e)} >Edit</button></td>
                //         </>
                //         : <><td></td> <td></td></>}

                //         <td>{res.data[i].insurerCode}</td>
                //         <td>{res.data[i].applicationNo}</td>
                //         <td>{res.data[i].policyNo}</td>
                //         <td>{res.data[i].agentCode}</td>
                //         <td>{res.data[i].agentCode2}</td>
                //         <td>{res.data[i].class}</td>
                //         <td>{res.data[i].subclass}</td>
                //         <td>{res.data[i].createdAt}</td>
                //         <td>{res.data[i].actDate} - {res.data[i].expDate}</td>
                //         <td>{res.data[i].insureeCode}</td>
                //         <td>{res.data[i].licenseNo}</td>
                //         <td>{res.data[i].chassisNo}</td>
                //         <td>{res.data[i].endorseNo}</td>
                //         <td>{res.data[i].seqNo}</td>
                //         <td>{res.data[i].invoiceNo}</td>
                //         <td>{res.data[i].taxInvoiceNo}</td>
                //         <td>{res.data[i].netgrossprem}</td>
                //         <td>{res.data[i].duty}</td>
                //         <td>{res.data[i].stamp}</td>
                //         <td>{res.data[i].totalprem}</td>
                //         <td>{res.data[i].commin_amt}</td>
                //         <td>{res.data[i].ovin_amt}</td>
                //         <td>{res.data[i].commout_amt}</td>
                //         <td>{res.data[i].ovout_amt}</td>
                //     </tr>)

                // }
                //setPoliciesData(array)
                //console.log(array);
                setPoliciesData(res.data)
            })
            .catch((err) => {

                alert("Something went wrong, Try Again.");

            });
    };
    const handleSubmit = async (e) => {
        const data = policiesData.filter((ele) => ele.select)
       
        console.log(data);
        e.preventDefault();
        await axios.post(url + "/policies/policyedit/batch", data, headers).then((res) => {
          alert("policy batch updated");
          //window.location.reload(false);
        }).catch((err)=>{ alert("Something went wrong, Try Again.");});
      };
      const editCard =(e) =>{
        console.log(policiesData[e.target.id]);
        setHidecard([true,e.target.id])
       
      };
    const handleClose = (e) =>{
      setHidecard([false,0])
    }

    return (
        <div>
<Modal  size="xl" fullscreen='xxl-down' show={hidecard[0]} onHide={handleClose} dialogClassName="my-modal">
        <Modal.Header closeButton>
          <Modal.Title >แก้ไขกรมธรรม์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {<PolicyCard index ={hidecard[1]} formData={policiesData[hidecard[1]]} setFormData ={handleChangeCard}/>}
        </Modal.Body>
       
      </Modal>
            {/* <BackdropBox1> */}
            <form className="container-fluid text-left" >
                {/* insurer table */}
                <h1 className="text-center">ค้นหารายการ</h1>
                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">รหัสบริษัทประกัน</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" placeholder="รหัสบริษัทประกัน" name="insurerCode" onChange={handleChange} /> */}
                            <select name="insurerCode" class="form-control" onChange={handleChange} >
                                <option disabled selected hidden>รหัสบริษัทประกัน</option>
                                {insurerDD}
                            </select>

                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" value="" onChange={handleChange} />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>
                    <div class="col align-self-end ">
                        <div class="input-group mb-3">
                            <button type="button" class="btn btn-primary btn-lg" onClick={submitFilter}>ค้นหารายการ</button>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">เลขกรมธรรม์</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="เลขกรมธรรม์" name="policyNo" onChange={handleChange} />
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" value="" />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>
                    <div class="col-1">
                        <label class="col-form-label">สถานะกรมธรรม์</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <select  class="form-control"  name="status" onChange={handleChange} >
                            <option selected value='A'>Active</option>
                            <option value='I'>Inactive</option>
                            </select>
                            

                        </div>


                    </div>

                </div>
                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">Class/Subclass</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <select name={`insureID`} class="form-control" onChange={handleChange} >
                                <option disabled selected hidden>Class/Subclass</option>
                                {insureTypeDD}
                            </select>
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" value="" />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>



                </div>

                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">วันที่เอาเข้าระบบ </label>

                    </div>

                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="date" class="form-control " name="createdate_start" onChange={handleChange} value={filterData.createdate_start} 
                            onBlur={(e)=>{setFilterData((prevState) => ({
                                ...prevState,
                                createdate_end: e.target.value,
                            }));}}/>

                        </div>
                    </div>
                    <div class="col-1">
                        <label class="col-form-label">สิ้นสุด</label>
                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="date" class="form-control" name="createdate_end" onChange={handleChange} value={filterData.createdate_end}/>
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" name="createdate-check" onChange={handleChange} />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">วันคุ้มครอง</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="date" class="form-control " name="effdate_start" onChange={handleChange} value={filterData.effdate_start} 
                            onBlur={(e)=>{setFilterData((prevState) => ({
                                ...prevState,
                                effdate_end: e.target.value,
                            }));}}/>
                            <div class="input-group-append">
                                {/* <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" value="" />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div class="col-1">
                        <label class="col-form-label">สิ้นสุด</label>
                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="date" class="form-control " name="effdate_end" onChange={handleChange} value={filterData.effdate_end}/>
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" name="effdate-check" onChange={handleChange}  />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">รหัสผู้เอาเข้าระบบ</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="createusercode" onChange={handleChange} />
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" name="createusercode" onChange={handleChange} />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-1">
                        <label class="col-form-label">เลขทะเบียนรถ</label>
                    </div>
                    <div class="col-2 ">
                        <input type="text" class="form-control" placeholder="เลขทะเบียนรถ" name="carRegisNo" onChange={handleChange} />
                    </div>
                    <div class="col-2">
                        <label class="col-form-label">จังหวัดจดทะเบียนรถ</label>
                    </div>
                    <div class="col-2 ">
                    <Select
        //   className="form-control"
          name={`provinceID`}
          onChange={ (e) => setFilterData((prevState) => ({
            ...prevState,
            provinceID: e.value,
          }))}
          options={provinceDD}
          styles={{zIndex:2000}}
          // onChange={opt => console.log(opt)}
          />
                        {/* <div class="input-group mb-3 col-10">
                           
                
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" name="provinceID-check" onChange={handleChange} />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>


                        </div> */}


                    </div>
                </div>

                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">รหัสผู้แนะนำ</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="agentCode" onChange={handleChange} />
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" name="agentCode" onChange={handleChange} />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>
                    <div class="col-1">
                        <label class="col-form-label">เลขคัสซี</label>
                    </div>

                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Chassis Number" name="chassisNo" onChange={handleChange} />
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" name="chassisNo-check" />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


                <div className="table-responsive overflow-scroll"  >
                <table class="table  table-striped " >
                    <thead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">เลือก</th>
                            <th scope="col">แก้ไข</th>
                            <th scope="col">บริษัทรับประกัน</th>
                            <th scope="col">เลขที่ใบคำขอ</th>
                            <th scope="col">เลขที่กรมธรรม์</th>
                            <th scope="col">ผู้แนะนำ 1</th>
                            <th scope="col">ผู้แนะนำ 2</th>
                            <th scope="col">Class</th>
                            <th scope="col">Subclass</th>
                            <th scope="col">วันที่สร้าง</th>
                            <th scope="col">วันที่คุ้มครอง-สิ้นสุด</th>
                            <th scope="col">ชื่อผู้เอาประกัน</th>
                            <th scope="col">เลขทะเบียนรถ</th>
                            <th scope="col">เลขตัวถังรถ</th>
                            <th scope="col">เลขที่สลักหลัง</th>
                            <th scope="col">seqno</th>
                            <th scope="col">เลขที่ใบแจ้งหนี้</th>
                            <th scope="col">เลขที่ใบกำกับภาษี</th>
                            <th scope="col">เบี้ย</th>
                            <th scope="col">อากร</th>
                            <th scope="col">ภาษี</th>
                            <th scope="col">เบี้ยรวม</th>
                            <th scope="col">WHT 1%</th>
                            <th scope="col">ค่า Commin (บาท)</th>
                            <th scope="col">ค่า Ovin (บาท)</th>
                            <th scope="col">ค่า Commout (บาท)</th>
                            <th scope="col">ค่า Ovout (บาท)</th>

                        </tr>
                    </thead>
                    <tbody>
                    {policiesData.map((ele, i) => {
                            return (<tr>
                                <th scope="row">{i + 1}</th>
                                {ele.status === 'I'?
                                <>
                                <td scope="row"><input type="checkbox" name="select" id={i} onClick={changestatus} /></td>
                                <td scope="row"><button type="button" class="btn btn-secondary " id={i} onClick={(e)=>editCard(e)} >Edit</button></td>
                                </>
                                : <><td></td> <td></td></>}
        
                                <td>{ele.insurerCode}</td>
                                <td>{ele.applicationNo}</td>
                                <td>{ele.policyNo}</td>
                                <td>{ele.agentCode}</td>
                                <td>{ele.agentCode2}</td>
                                <td>{ele.class}</td>
                                <td>{ele.subClass}</td>
                                <td>{ele.createdAt.split('T')[0]}</td>
                                <td>{ele.actDate} - {ele.expDate}</td>
                                <td>{ele.insureeCode}</td>
                                <td>{ele.licenseNo}</td>
                                <td>{ele.chassisNo}</td>
                                <td>{ele.endorseNo}</td>
                                <td>{ele.seqNo}</td>
                                <td>{ele.invoiceNo}</td>
                                <td>{ele.taxInvoiceNo}</td>
                                <td>{ele.netgrossprem.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td>{ele.duty.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td>{ele.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td>{ele.totalprem.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td>{ele.withheld.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td>{ele.commin_amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td>{ele.ovin_amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td>{ele.commout_amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td>{ele.ovout_amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            </tr>)

                        })}

                    </tbody>
                </table>
                </div>


                <div className="d-flex justify-content-center">

                    <button type="button" class="btn btn-primary btn-lg" onClick={ExportData}>Export to Excel</button>
                    <button type="button" class="btn btn-primary btn-lg" onClick={handleSubmit}>บันทึกกรมธรรม์</button>


                </div>
            </form>


            {/* <Link to="/signup" style={NormalText}>
          First time here ? Let's sign up
        </Link> */}
            {/* </BackdropBox1> */}
        </div>
    );
};

export default FindPolicy;
