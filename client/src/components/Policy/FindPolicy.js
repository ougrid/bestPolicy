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

const FindPolicy = () => {
    const url = config.url;
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
            "createdAt": null,
            "actDate": null,
            "agentCode": null,
            "itemList": null

        })
    const [policiesData, setPoliciesData] = useState([])
    const [insureTypeDD, setInsureTypeDD] = useState([]);
    const [insurerDD, setInsurerDD] = useState([]);

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

        // get insuretype all
        axios
            .get(url + "/insures/insuretypeall")
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


    const changeInsuree = (e) => {
        setinsureeData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleChange = (e) => {
        setFilterData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const changeEntity = (e) => {
        setEntityData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitFilter =(e) => {
        // e.preventDefault();
        console.log(filterData);
        axios
            .post(url + "/policies/policygetlist", filterData)
            .then((res) => {
                // let token = res.data.jwt;
                // let decode = jwt_decode(token);
                // navigate("/");
                // window.location.reload();
                // localStorage.setItem("jwt", token);
                console.log(res.data);
                alert("create new insuree success")
                const array = []
                for (let i = 0; i < res.data.length; i++) {
                    array.push(<tr>
                        <th scope="row">{i+1}</th>
                        <td>{res.data[i].insurerCode}</td>
                        <td>{res.data[i].policyNo}</td>
                        <td>{res.data[i].createdAt}</td>
                        <td>{res.data[i].actDate} - {res.data[i].expDate}</td>
                        <td>{res.data[i].insureeCode}</td>
                        <td>{res.data[i].endorseNo}</td>
                        <td>{res.data[i].invioceNo}</td>
                        <td>{res.data[i].prem}</td>
                        <td>{res.data[i].duty}</td>
                        <td>{res.data[i].stamp}</td>
                        <td>{res.data[i].total}</td>
                        <td>{res.data[i].comminamt}</td>
                        <td>{res.data[i].ovinamt}</td>
                        <td>{res.data[i].commoutamt}</td>
                        <td>{res.data[i].ovoutamt}</td>
                    </tr>)

                }
                console.log(array);
                setPoliciesData(array)
            })
            .catch((err) => {

                alert("create new insuree fail");

            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(url + "/persons/insureenew", { insuree: insureeData, entity: entityData, location: locationData })
            .then((res) => {
                // let token = res.data.jwt;
                // let decode = jwt_decode(token);
                // navigate("/");
                // window.location.reload();
                // localStorage.setItem("jwt", token);
                console.log(res.data);
                alert("create new insuree success")
            })
            .catch((err) => {

                alert("create new insuree fail");

            });
    };

    return (
        <>

            {/* <BackdropBox1> */}
            <form className="container-fluid text-left" onSubmit={handleSubmit}>
                {/* insurer table */}
                <h1>ค้นหารายการ</h1>
                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">InsurerCode</label>

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
                        <label class="col-form-label">PolicyNo</label>

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

                </div>
                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">Class/subclass</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <select name={`insureID`} class="form-control" onChange={handleChange} >
                                <option disabled selected hidden>class/subclass</option>
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
                    <div class="col-1">
                        <label class="col-form-label">เลขทะเบียนรถ</label>
                    </div>
                    <div class="col-2 ">
                        <input type="text" class="form-control" placeholder="เลขทะเบียนรถ" name="carRegisNo" onChange={handleChange} />
                    </div>
                    <div class="col-1">
                        <label class="col-form-label">จังหวัดจดทะเบียนรถ</label>
                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <select class="form-control" name="provinceID" onChange={handleChange}>
                                <option value="" selected disabled hidden>เลือกจังหวัด</option>
                                {provinceDD}
                            </select>
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" name="provinceID-check" onChange={handleChange} />
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
                        <label class="col-form-label">Createdate</label>

                    </div>

                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="date" class="form-control " name="createdate_start" onChange={handleChange} />

                        </div>
                    </div>
                    <div class="col-1">
                        <label class="col-form-label">สิ้นสุด</label>
                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="date" class="form-control" name="createdate_end" onChange={handleChange} />
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

                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">Effectivedate</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="date" class="form-control " name="effdate_start" onChange={handleChange} />
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
                            <input type="date" class="form-control " name="effdate_end" onChange={handleChange} />
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" name="effdate-check" onChange={handleChange} />
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
                        <label class="col-form-label">createusercode</label>

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
                </div>

                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-1">
                        <label class="col-form-label">advisorcode</label>

                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="agentcode" onChange={handleChange} />
                            <div class="input-group-append">
                                <div class="input-group-text ">
                                    <div class="form-check checkbox-xl">
                                        <input class="form-check-input" type="checkbox" name="agentcode" onChange={handleChange} />
                                        <label class="form-check-label" >All</label>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>


                </div>

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">บริษัทรับประกัน</th>
                            <th scope="col">เลขที่กรมธรรม์</th>
                            <th scope="col">วันที่สร้าง</th>
                            <th scope="col">วันที่คุ้มครอง-สิ้นสุด</th>
                            <th scope="col">ชื่อผู้เอาประกัน</th>
                            <th scope="col">เลขที่สลักหลัง</th>
                            <th scope="col">เลขที่ใบแจ้งหนี้</th>
                            <th scope="col">เบี้ย</th>
                            <th scope="col">อากร</th>
                            <th scope="col">ภาษี</th>
                            <th scope="col">เบี้ยรวม</th>
                            <th scope="col">commin amt</th>
                            <th scope="col">ovin amt</th>
                            <th scope="col">commout amt</th>
                            <th scope="col">ovout amt</th>

                        </tr>
                    </thead>
                    <tbody>
                        {policiesData}
                       
                    </tbody>
                </table>



                <LoginBtn type="submit">Submit</LoginBtn>
            </form>


            {/* <Link to="/signup" style={NormalText}>
          First time here ? Let's sign up
        </Link> */}
            {/* </BackdropBox1> */}
        </>
    );
};

export default FindPolicy;
