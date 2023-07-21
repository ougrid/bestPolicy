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

const Insuree = () => {
    const url = config.url;
    const navigate = useNavigate();
    const [insureeData, setinsureeData] = useState({entityID : null});
    const [entityData, setEntityData] = useState({personType : 'P'});
    const [locationData, setLocationData] = useState({entityID : null});

    const changeInsuree = (e) => {
        setinsureeData((prevState) => ({
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

    const changeLocation = (e) => {
        setLocationData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(url + "/auth/login", {insurer: insureeData, entity:entityData, location:locationData })
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
                <h1>ผู้เอาประกัน</h1>
                <div class="row">
                    <div class="col">
                        <h6>InsureeCode</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            className="col-md-4"
                            type="text"
                            // placeholder="InsurerCode"
                            name="InsureeCode"
                            onChange={changeInsuree}
                        />
                    </div>
                    <div class="col">
                        <h6>ประเภทผู้เอาประกัน</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="insureeType"
                            onChange={changeInsuree}
                        />
                    </div>
                    <div class="col">
                        <h6>ติด Blacklist</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="blackList"
                            onChange={changeInsuree}
                        />
                    </div>
                    <div class="col">
                            <h6>เหตุผล</h6>
                        </div>
                        <div class="col">
                            <InputBtn
                                type="text"
                                // placeholder="Password"
                                name="blacklistDesp"
                                onChange={changeInsuree}
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
                            onChange={changeInsuree}
                        />
                    </div>
                    
                </div>
                {/* entity table */}
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
                            name="t_firstName"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>นามสกุล</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="t_lastName"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>Email</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="email"
                            onChange={changeEntity}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <h6>ประเภทบัตร</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="idCardType"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>เลขที่บัตร</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="idCardNo"
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
                            name="idCardActDate"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>วันหมดอายุ</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="date"
                            // placeholder="Password"
                            name="idCardExpDate"
                            onChange={changeEntity}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <h6>วันเกิด</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="date"
                            // placeholder="Password"
                            name="dateOfBirth"
                            onChange={changeEntity}
                        />
                    </div>
                    <div class="col">
                        <h6>เพศ</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="gender"
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

                {/* location table */}
                <div class="row">
                <h5>Location</h5>
                </div>
                <div class="row">
                    <div class="col">
                        <h6>บ้านเลขที่</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="t_location_1"
                            onChange={changeLocation}
                        />
                    </div>
                    <div class="col">
                        <h6>หมู่บ้านอาคาร</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="t_location_2"
                            onChange={changeLocation}
                        />
                    </div>
                    <div class="col">
                        <h6>หมู่</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="t_location_3"
                            onChange={changeLocation}
                        />
                    </div>
                    <div class="col">
                        <h6>ซอย</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="t_location_4"
                            onChange={changeLocation}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <h6>ถนน</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="t_location_5"
                            onChange={changeLocation}
                        />
                    </div>
                    <div class="col">
                        <h6>จังหวัด</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="provinceID"
                            onChange={changeLocation}
                        />
                    </div>
                    <div class="col">
                        <h6>อำเภอ</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="districtID"
                            onChange={changeLocation}
                        />
                    </div>
                    <div class="col">
                        <h6>ตำบล</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="subDistrictID"
                            onChange={changeLocation}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <h6>รหัสไปรษณีย์</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            // placeholder="Password"
                            name="zipcode"
                            onChange={changeLocation}
                        />
                    </div>
                    <div class="col">
                        <h6>เบอร์โทรศัพท์</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="telNum_1"
                            onChange={changeLocation}
                        />
                    </div>
                    <div class="col">
                        <h6>เบอร์มือถือ</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="telNum_2"
                            onChange={changeLocation}
                        />
                    </div>
                    <div class="col">
                        <h6>เบอร์โทรสาร</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="telNum_3"
                            onChange={changeLocation}
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
                            onChange={changeLocation}
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

export default Insuree;
