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

const Insurer = () => {
    const url = config.url;
    const navigate = useNavigate();
    const [insurerData, setInsurerData] = useState({entityID : null});
    const [entityData, setEntityData] = useState({personType : 'C'});
    const [locationData, setLocationData] = useState({entityID : null, locationType: 'A'});
    // dropdown
    const [provinceDD, setProvinceDD] = useState([])
    const [districDD, setDistricDD] = useState([])
    const [subDistricDD, setSubDistricDD] = useState([])
    const [zipcodeDD, setZipCodeDD] = useState([])
    const [titleDD, setTitleDD] = useState([])

    const changeInsurer = (e) => {
        setInsurerData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const changeEntity = (e) => {
        // console.log(entityData);
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
        if (e.target.name === 'provinceID') {
            getDistrict(e.target.value)
        }else if ((e.target.name === 'districtID')){
            getSubDistrict(e.target.value)
        }
    };

    const getDistrict =(provinceID) =>{
        //get distric in province selected
        axios
            .get(url + "/static/amphurs/" + provinceID)
            .then((distric) => {
                const array = []
                distric.data.forEach(ele => {
                   array.push(<option key={ele.amphurid} value={ele.amphurid}>{ele.t_amphurname}</option>)
                });
                setDistricDD(array)
            })
            .catch((err) => {
              
                    alert("cant get aumphur");
                
            });
    }

    
    const getSubDistrict =(districID) =>{
        //get tambons in distric selected
        axios
            .get(url + "/static/tambons/" + districID)
            .then((subdistric) => {
                const arraySub = []
                const arrayZip = []
                const zip  = []
                subdistric.data.forEach(ele=> {
                   arraySub.push(<option key={ele.tambonid} value={ele.tambonid}>{ele.t_tambonname}</option>)
                   zip.push(ele.postcodeall.split("/"))
                });
                const uniqueZip = [...new Set(...zip)];
                console.log(uniqueZip);
                uniqueZip.forEach(zip =>{arrayZip.push(<option  value={zip}>{zip}</option>)})
                setSubDistricDD(arraySub)
                setZipCodeDD(arrayZip)
            })
            .catch((err) => {
              
                    alert("cant get tambons");
                
            });
    }

    useEffect(() => {
        //get province
        axios
        .get(url + "/static/provinces/all")
        .then((province) => {
            // let token = res.data.jwt;
            // let decode = jwt_decode(token);
            // navigate("/");
            // window.location.reload();
            // localStorage.setItem("jwt", token);
    
            const array = []
            province.data.forEach(ele => {
                array.push(<option key={ele.provinceid} value={ele.provinceid}>{ele.t_provincename}</option>)
            });
            setProvinceDD(array)

            axios
            .get(url + "/static/titles/company/all")
            .then((title) => {
                const array2 = []
                title.data.forEach(ele => {
                    array2.push(<option key={ele.TITLEID} value={ele.TITLEID}>{ele.TITLETHAIBEGIN}</option>)
                });
                setTitleDD(array2)
            })
            .catch((err) => {
              
                    alert("cant get company");
                
            });
        })
        .catch((err) => {
          
                alert("cant get province");
            
        });
        // get title all of company type
       
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(url + "/persons/insurernew", {insurer: insurerData, entity:entityData, location: locationData})
            .then((res) => {
                // let token = res.data.jwt;
                // let decode = jwt_decode(token);
                // navigate("/");
                // window.location.reload();
                // localStorage.setItem("jwt", token);
                console.log(res.data);
                alert("create new insurer success")
            })
            .catch((err) => {
              
                    alert("create new insurer fail");
                
            });
    };

    return (
        <>

            {/* <BackdropBox1> */}
            <form className="container text-center" onSubmit={handleSubmit}>
                {/* insurer table */}
                <h1>บริษัทรับประกัน</h1>
                <div class="row">
                    <div class="col">
                        <h6>InsurerCode</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            className="col-md-4"
                            type="text"
                            required
                            // placeholder="InsurerCode"
                            name="insurerCode"
                            onChange={changeInsurer}
                        />
                    </div>
                    <div class="col">
                        <h6>รหัส คปภ.</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            required
                            // placeholder="Password"
                            name="KPPCode"
                            onChange={changeInsurer}
                        />
                    </div>
                    <div class="col">
                        <h6>รูปแบบการหักภาษี</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            required
                            // placeholder="Password"
                            name="deductTaxType"
                            onChange={changeInsurer}
                        />
                    </div>
                    <div class="col">
                            <h6>อัตราภาษี</h6>
                        </div>
                        <div class="col">
                            <InputBtn
                                type="number" 
                                step={0.1}
                                required
                                // placeholder="Password"
                                name="deductTaxRate"
                                onChange={changeInsurer}
                            />
                        </div>
                </div>
                    
                <div class="row">
                    <div class="col">
                        <h6>เครดิตเทอมค่าเบี้ย</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="premCreditT"
                            onChange={changeInsurer}
                        />
                    </div>
                    <div class="col">
                        <h6>เครดิตเทอมค่าคอมมิสชั่น</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="commCreditT"
                            onChange={changeInsurer}
                        />
                    </div>
                    <div class="col">
                        <h6>เครดิตเทอมค่าOV</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="number"
                            // placeholder="Password"
                            name="ovCreditT"
                            onChange={changeInsurer}
                        />
                    </div>
                </div>

                {/* entity table */}
                <div class="row">
                    <div class="col">
                        <h6>คำนำหน้า</h6>
                    </div>
                    <div class="col">
                        {/* <InputBtn
                            type="number"
                            required
                            // placeholder="Password"
                            name="titleID"
                            onChange={changeEntity}
                        /> */}
                            <select   className="col" name="titleID"  onChange={changeEntity}>
                            <option value="" selected disabled hidden>เลือกคำนำหน้า</option>
                                {titleDD}
                            </select>
                    </div>
                    <div class="col">
                        <h6>ชื่อ</h6>
                    </div>
                    <div class="col">
                        <InputBtn
                            type="text"
                            required
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
                            required
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
                            required
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
                            required
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
                            type="checkbox"
                            
                            // placeholder="Password"
                            name="vatRegis"
                            onChange={e => setEntityData({...entityData, vatRegis: e.target.checked})}
                         
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
                            required
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
                        {/* <InputBtn
                            type="number"
                            required
                            // placeholder="Password"
                            name="provinceID"
                            onChange={changeLocation}
                        />onChange={e => setInsureData({...insureData, insureType: e.target.value})} */}
                            <select   className="col" name="provinceID" onChange={changeLocation}>
                            <option value="" selected disabled hidden>เลือกจังหวัด</option>
                                {provinceDD}
                            </select>
                    </div>
                    <div class="col">
                        <h6>อำเภอ</h6>
                    </div>
                    <div class="col">
                        {/* <InputBtn
                            type="number"
                            required
                            // placeholder="Password"
                            name="districtID"
                            onChange={changeLocation}
                        /> */}
                        <select   className="col" name="districtID" onChange={changeLocation}>
                        <option value="" selected disabled hidden>เลือกอำเภอ</option>
                                {districDD}
                            </select>
                    </div>
                    <div class="col">
                        <h6>ตำบล</h6>
                    </div>
                    <div class="col">
                        {/* <InputBtn
                            type="number"
                            required
                            // placeholder="Password"
                            name="subDistrictID"
                            onChange={changeLocation}
                        /> */}
                        <select   className="col" name="subDistrictID" onChange={changeLocation}>
                        <option value="" selected disabled hidden>เลือกตำบล</option>
                                {subDistricDD}
                            </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <h6>รหัสไปรษณีย์</h6>
                    </div>
                    <div class="col">
                        {/* <InputBtn
                            type="text"
                            required
                            // placeholder="Password"
                            name="zipcode"
                            onChange={changeLocation}
                        /> */}
                         <select   className="col" name="zipcode" onChange={changeLocation}>
                        <option value="" selected disabled hidden>เลือกรหัสไปรษณีย์</option>
                                {zipcodeDD}
                            </select>
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

export default Insurer;
