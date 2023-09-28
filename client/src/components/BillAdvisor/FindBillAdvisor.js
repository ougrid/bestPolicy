import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import EditBillAdvisor from "./EditBillAdvisor";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigation
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

const FindBillAdvisor = () => {
    const url = window.globalConfig.BEST_POLICY_V1_BASE_URL;
    const navigate = useNavigate();
    const [insureeData, setinsureeData] = useState({ entityID: null });
    const [entityData, setEntityData] = useState({ personType: 'P' });
    const [locationData, setLocationData] = useState({ entityID: null, locationType: 'A' });
    // dropdown
    const [provinceDD, setProvinceDD] = useState([])
    const [stamenttypeData, setStamenttypeData] = useState([]);

    const [filterData, setFilterData] = useState(
        {
            "insurerid": null,
            "agentid":null,
            "billadvisorno": null,
            "billdate": null

        })
    const [policiesData, setPoliciesData] = useState([])
    const [insurerDD, setInsurerDD] = useState([]);
    const [agentDD, setAgentDD] = useState([]);

    useEffect(() => {
        //get province
        axios
            .get(url + "/static/provinces/all")
            .then((province) => {
                const array = []
                province.data.forEach(ele => {
                    array.push(<option key={ele.provinceid} value={ele.provinceid}>{ele.t_provincename}</option>)
                });
                setProvinceDD(array)
            })
            .catch((err) => {
                // alert("cant get province");
            });

        // get agent all
        axios
            .get(url + "/persons/agentall")
            .then((agent) => {
                const array = [];
                agent.data.forEach((ele) => {
                    array.push(
                        <option key={ele.id} value={ele.id}>
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
                        <option key={ele.id} value={ele.id}>
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

    const changeStamenttype = (e) => {
        // e.preventDefault();
        const array = policiesData
        console.log(e.target.id);

        array[e.target.id] = { ...policiesData[e.target.id], [e.target.name]: e.target.checked }


        setPoliciesData(array)
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
            .post(url + "/payments/findbill", filterData)
            .then((res) => {
                // let token = res.data.jwt;
                // let decode = jwt_decode(token);
                // navigate("/");
                // window.location.reload();
                // localStorage.setItem("jwt", token);
                console.log(res.data);
                // alert("create new insuree success")
                const array = []
              
                console.log(array);
                setPoliciesData(res.data)
                // setPoliciesData(array)
                // alert("create new insuree success")
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
                <h1 className="text-center">ค้นหา billadvisor</h1>
                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-2">
                        <label class="col-form-label">รหัส Insurer</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" placeholder="รหัสบริษัทประกัน" name="insurerCode" onChange={handleChange} /> */}
                            <select  name="insurerID" class="form-control" onChange={handleChange} >
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
                            <select  name="agentID" class="form-control" onChange={handleChange} >
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
                        <label class="col-form-label">เลขที่วางบิล</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input
                                className="form-control"
                                type="text"

                                name="billadvisorno"
                                onChange={handleChange}
                            />



                        </div>


                    </div>

                </div>

                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-2">
                        <label class="col-form-label">billdate</label>

                    </div>
                    <div class="col-2 ">

                        <div class="input-group mb-3">
                            <input  type="date" class="form-control " name="billdate" onChange={handleChange} />

                        </div>

                    </div>



                </div>


            </form>
            <form className="container-fluid " onSubmit={submitFilter}>

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">InsurerCode</th>
                            <th scope="col">AdvisorCode</th>
                            <th scope="col">BillAdvisorNo</th>
                            <th scope="col">BillDate</th>
                            <th scope="col">Amt</th>
                            <th scope="col">createusercode</th>
                            <th scope="col">EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policiesData.map((ele, i) => {
                            // console.log(stamenttypeData[i].stamenttype == null? ele.totalprem -ele.commout_amt-ele.ovout_amt: ele.totalprem);
                            return (<tr>
                                <td>{ele.insurerCode}</td>
                                <td>{ele.agentCode}</td>
                                <td>{ele.billadvisorno}</td>
                                <td>{ele.billdate}</td>
                                <td>{ele.amt}</td>
                                <td>{ele.createusercode}</td>
                                <td><button onClick={() =>navigate('/bill/editbill/' + ele.billadvisorno)}>EDIT</button></td>
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

export default FindBillAdvisor;
