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

const FindBillAdvisor = () => {
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

    const submitFilter = (e) => {
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
                        <th scope="row">{i + 1}</th>
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
            <form className="container-fluid " onSubmit={handleSubmit}>
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
                            <button type="button" class="btn btn-primary btn-lg" onClick={submitFilter}>Search</button>
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
                            <input type="text" class="form-control" placeholder="เลขกรมธรรม์" name="agentCode" onChange={handleChange} />
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
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                due
                            </label>
                        </div>
                        <div class="form-check ">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label class="form-check-label" for="flexRadioDefault2">
                                All outstanding
                            </label>
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
                            <input type="text" class="form-control " name="createdate_start" onChange={handleChange} />

                        </div>
                    </div>
                    <div class="col-1">
                        <label class="col-form-label">to</label>
                    </div>
                    <div class="col-2 ">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="createdate_end" onChange={handleChange} />
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



                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">select</th>
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
                            <th scope="col">"[]net"</th>
                            <th scope="col">billpremium</th>

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

export default FindBillAdvisor;
