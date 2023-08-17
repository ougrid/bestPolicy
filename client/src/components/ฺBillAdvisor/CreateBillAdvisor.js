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

const CreateBillAdvisor = () => {
    const url = config.url;
    const navigate = useNavigate();
    const [insureeData, setinsureeData] = useState({ entityID: null });
    const [entityData, setEntityData] = useState({ personType: 'P' });
    const [locationData, setLocationData] = useState({ entityID: null, locationType: 'A' });

    const [billpremiumData, setBillpremiumData] = useState([]);

    const [filterData, setFilterData] = useState(
        {
            "insurerCode": null,
            "policyNoAll": true,
            "policyNoStart": '000000',
            "policyNoEnd": '0000000',
            "agentCode": null,

        })
    const [policiesData, setPoliciesData] = useState([])
    const [policiesRender, setPoliciesRender] = useState([])
    const [insurerDD, setInsurerDD] = useState([]);
    const [agentDD, setAgentDD] = useState([]);

    useEffect(() => {

        // get agent all
        axios
            .get(url + "/persons/agentall")
            .then((agent) => {
                const array = [];
                agent.data.forEach((ele) => {
                    array.push(
                        <option key={ele.id} value={ele.agentCode}>
                            {ele.agentCode}
                        </option>
                    );
                });
                setAgentDD(array);
            })
            .catch((err) => { });

        // get insurer all
        axios
            .get(url + "/persons/insurerall")
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



    const handleChange = (e) => {
        setFilterData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const changestatementtype = (e) => {
        // e.preventDefault();
        const array = policiesData
        array[e.target.id] = { ...policiesData[e.target.id], [e.target.name]: e.target.checked }
        setPoliciesData(array)
        const array2 = billpremiumData
        if (e.target.checked) {
            array2[e.target.id] =  array[e.target.id].totalprem - array[e.target.id].commout_amt - array[e.target.id].ovout_amt
            
        }else{
            array2[e.target.id] =  array[e.target.id].totalprem
        }
        setBillpremiumData(array2)
        console.log(array2);
        
    };




    const selectAll = (e) => {

        const array = []
        console.log(e.target.name);
        policiesData.forEach(ele => array.push({ ...ele, [e.target.name]: e.target.checked }))

        setPoliciesData(array)
        console.log(array);
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
                    setPoliciesData(res.data)
                    setBillpremiumData(array)
                    alert("create new insuree success")
                }
            })
            .catch((err) => {

                // alert("create snew insuree fail");

            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const array = policiesData.filter((ele) => ele.select)
        console.log(array);
        // axios
        //     .post(url + "/persons/insureenew", { policy:policiesData })
        //     .then((res) => {
        //         // let token = res.data.jwt;
        //         // let decode = jwt_decode(token);
        //         // navigate("/");
        //         // window.location.reload();
        //         // localStorage.setItem("jwt", token);
        //         console.log(res.data);
        //         alert("create new insuree success")
        //     })
        //     .catch((err) => {

        //         alert("create new insuree fail");

        //     });
    };

    return (
        <>

            {/* <BackdropBox1> */}
            <form className="container-fluid " onSubmit={submitFilter}>
                {/* insurer table */}
                <h1 className="text-center">ค้นหารายการเบี้ยค้างที่กำหนดชำระแล้ว</h1>
                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-2">
                        <label class="col-form-label">รหัส Insurer</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" placeholder="รหัสบริษัทประกัน" name="insurerCode" onChange={handleChange} /> */}
                            <select required name="insurerCode" class="form-control" onChange={handleChange} >
                                <option value="" disabled selected hidden>รหัสบริษัทประกัน</option>
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
                            <button type="submit" class="btn btn-primary btn-lg" >Search</button>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-2">
                        <label class="col-form-label">รหัส Advisor</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <select required name="agentCode" class="form-control" onChange={handleChange} >
                                <option value="" disabled selected hidden>รหัสผู้แนะนำ</option>
                                {agentDD}
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
                    <div class="col-2">
                        <label class="col-form-label">Duedate</label>

                    </div>
                    <div class="col-2 ">

                        <div class="input-group mb-3">
                            <input required type="date" class="form-control " name="dueDate" onChange={handleChange} />

                        </div>

                    </div>



                </div>

                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">Policy No.</label>

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">form</label>
                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control " name="policyNoStart" onChange={handleChange} />

                        </div>
                    </div>
                    <div class="col-1">
                        <label class="col-form-label">to</label>
                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="policyNoEnd" onChange={handleChange} />
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" name="policyNoAll" onClick={(e) => {
                                            setFilterData((prevState) => ({
                                                ...prevState,
                                                policyNoAll: e.target.checked,
                                            }))
                                        }} />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </form>
            <form className="container-fluid " onSubmit={handleSubmit}>

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" name="select" onClick={selectAll} />select</th>
                            <th scope="col">InsurerCode</th>
                            <th scope="col">AdvisorCode</th>
                            <th scope="col">Duedate</th>
                            <th scope="col">Policyno</th>
                            <th scope="col">Endorseno</th>
                            <th scope="col">Invoiceno</th>
                            <th scope="col">seqno</th>
                            <th scope="col">customerid</th>
                            <th scope="col">insuredname</th>
                            <th scope="col">licenseno</th>
                            <th scope="col">province</th>
                            <th scope="col">chassino</th>
                            <th scope="col">grossprem</th>
                            <th scope="col">duty</th>
                            <th scope="col">tax</th>
                            <th scope="col">totalamt</th>
                            <th scope="col">comm-out%</th>
                            <th scope="col">comm-out-amt</th>
                            <th scope="col">ov-out%</th>
                            <th scope="col">ov-out-amt</th>
                            <th scope="col"><input type="checkbox" name="statementtype" onClick={selectAll} />net</th>
                            <th scope="col">billpremium</th>

                        </tr>
                    </thead>
                    <tbody>
                        {policiesData.map((ele, i) => {
                            return (<tr>
                                <th scope="row"><input type="checkbox" name="select" id={i} onClick={changestatementtype} />{i + 1}</th>
                                <td>{ele.insurerCode}</td>
                                <td>{ele.agentCode}</td>
                                <td>{ele.dueDate}</td>
                                <td>{ele.policyNo}</td>
                                <td>{ele.endorseNo}</td>
                                <td>{ele.invoiceNo}</td>
                                <td>{ele.seqno}</td>
                                <td>{ele.insureeCode}</td>
                                <td>{ele.insureeName}</td>
                                <td>{ele.licenseNo}</td>
                                <td>{ele.motorprovinceID}</td>
                                <td>{ele.chassisNo}</td>
                                <td>{ele.grossprem}</td>
                                <td>{ele.duty}</td>
                                <td>{ele.tax}</td>
                                <td>{ele.totalprem}</td>
                                <td>{ele.commout_rate}</td>
                                <td>{ele.commout_amt}</td>
                                <td>{ele.ovout_rate}</td>
                                <td>{ele.ovout_amt}</td>
                                <td><input type="checkbox" name="statementtype" id={i} onClick={changestatementtype} /></td>
                                <td><input type="number" disabled   value={billpremiumData[i]} /></td>
                            </tr>)

                        })}


                    </tbody>
                </table>


                <div className="d-flex justify-content-center">
                    <LoginBtn type="submit">confirm</LoginBtn>
                </div>
            </form>


            {/* <Link to="/signup" style={NormalText}>
          First time here ? Let's sign up
        </Link> */}
            {/* </BackdropBox1> */}
        </>
    );
};

export default CreateBillAdvisor;
