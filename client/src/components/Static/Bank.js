// import UserDetails from "./UserDetail";
// import CarsDetails from "./CarsDetails";
import React, { useState,useEffect } from "react";
import { useParams, useNavigate, Link, redirect } from "react-router-dom";
// import PackagesDetails from "./PackagesDetails";
import jwt_decode from "jwt-decode";
// import "./Admin.css";
import NavStatic from "./NavStatic"
import Insurer  from "./Insurer";
import Insuree  from "./Insuree";
import InsureType from "./insureType";
import Agent from "./Agent";
import CommOv from "./CommOv"
import Policy from "./Policy";
import ExportFile from "./ExportFile"
import Payment from "./Payment";
import axios from "axios";


const Bank = () => {

    const [bankBrand, setBankBrand] = useState('')
    const [bankBranch, setBankBranch] = useState('')
    const [bankNo, setBankNo] = useState('')
    const [bankOf, setBankOf] = useState('M')
    const [bankOfCode, setBankOfCode] = useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()

        let data = JSON.stringify({
            "bankBrand": bankBrand,
            "bankBranch":bankBranch,
            "bankNo":bankNo,
            "type":bankOf,
            "code":bankOfCode
        });
        axios.post(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/static/bank/bank",data,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return(
        <div className="container" style={{paddingTop: "30px", paddingBottom: "30px" }}>
            <h1 className="text-center">ธนาคาร</h1>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form>
                        {/* Bank Brand */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankBrand" className="form-label">Bank Brand</label>
                            </div>
                            <div className="col-7">
                                <input type="text" id="bankBrand" value={bankBrand} onChange={(e) => setBankBrand(e.target.value)} className="form-control"/>
                            </div>
                        </div>

                        {/* Bank Branch */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankBranch" className="form-label">Bank Branch</label>
                            </div>
                            <div className="col-7">
                                <input type="text" id="bankBranch" value={bankBranch} onChange={(e) => setBankBranch(e.target.value)} className="form-control"/>
                            </div>
                        </div>

                        {/* Bank No */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankNo" className="form-label">Bank No</label>
                            </div>
                            <div className="col-7">
                                <input type="text" id="bankNo" value={bankNo} onChange={(e) => setBankNo(e.target.value)} className="form-control"/>
                            </div>
                        </div>

                        {/* Bank Of */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankOf" className="form-label">Bank Of</label>
                            </div>
                            <div className="col-7">
                                <select id="bankOf" value={bankOf} onChange={(e) => setBankOf(e.target.value)} className="form-control">
                                    <option value="M">Amity</option>
                                    <option value="I">Insurer</option>
                                    <option value="A">Advisor</option>
                                    {/*amity ="M" insurer = "I"  advisor = "A" customer = "C"';*/}
                                </select>
                            </div>
                        </div>
                        {/* Bank Of Code */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankOfCode" className="form-label">Bank Of Code</label>
                            </div>
                            <div className="col-7">
                                <input type="text" id="bankOfCode" value={bankOfCode} onChange={(e) => setBankOfCode(e.target.value)} className="form-control"/>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '20px' }}>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Bank;
