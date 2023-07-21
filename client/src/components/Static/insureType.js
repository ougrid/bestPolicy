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

const InsureType = () => {
    const url = config.url;
    const navigate = useNavigate();
    const [insureData, setInsureData] = useState({ });
    const [commData, setCommData] = useState({ insureID: 'C' });
    // const [locationData, setLocationData] = useState({entityID : null});

    const changeInsurer = (e) => {
        setInsureData((prevState) => ({
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




    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(url + "/auth/login", { insurer: insureData, entity: entityData })
            .then((res) => {
                let token = res.data.jwt;
                let decode = jwt_decode(token);
                navigate("/");
                window.location.reload();
                localStorage.setItem("jwt", token);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    alert("Wrong Password");
                } else if (err.response.status === 404) {
                    alert("Wrong Username");
                }
            });
    };

    return (
        <>

            {/* <BackdropBox1> */}
            <form className="container text-center" onSubmit={handleSubmit}>
                {/* insurer table */}
                <h1>แผนประกัน</h1>
                <div class="row">
                    <div class="col">
                        <h11>ประเภทประกัน</h11>
                    </div>
                    <div class="col">
                        <InputBtn
                            className="col-md-4"
                            type="text"
                            // placeholder="InsurerCode"
                            name="insureType"
                            onChange={changeInsurer}
                        />
                    </div>
                    <div class="col">
                        <h6>class</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="password"
                            // placeholder="Password"
                            name="class"
                            onChange={changeInsurer}
                        />
                    </div>
                    <div class="col">
                        <h6>subclass</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="subClass"
                            onChange={changeInsurer}
                        />
                    </div>

                </div>

                <div class="row">
                    <div class="col">
                        <h6>plancode</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="planCode"
                            onChange={changeInsurer}
                        />
                    </div>
                    <div class="col">
                        <h6>ชื่อประกัน</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="insureName"
                            onChange={changeInsurer}
                        />
                    </div>
                </div>

                {/* CommovIn table */}
                <h1>set Commision OV</h1>
                <div class="row">
                    <div class="col">
                        <h6>คำนำหน้า</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="titleID"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>ชื่อ</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="t_ogName"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>ประเภทธุรกิจ</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="ogType"
                            onChange={changeEntity}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <h6>เลขเสียภาษี</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="string"
                            // placeholder="Password"
                            name="taxNo"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>วันเริ่มต้น</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="date"
                            // placeholder="Password"
                            name="taxActDate"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>วันสิ้นสุด</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="date"
                            // placeholder="Password"
                            name="taxExpDate"
                            onChange={changeEntity}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <h6>จดทะเบียน vat</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="boolean"
                            // placeholder="Password"
                            name="vatRegis"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>เลขที่ ภพ.20</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="pk20"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>สาขา</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="branch"
                            onChange={changeEntity}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <h6>note</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="note"
                            onChange={changeEntity}
                        />
                    </div>

                </div>



                <LoginBtn type="submit">Submit</LoginBtn>
            </form>


            {/* <Link to="/signup" style={NormalText}>
          First time here ? Let's sign up
        </Link> */}
            {/* </BackdropBox1> */}
        </>
    );
};

export default InsureType;
