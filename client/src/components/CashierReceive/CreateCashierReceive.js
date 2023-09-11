import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Modal from 'react-bootstrap/Modal';
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
import {Button} from "react-bootstrap";

const config = require("../../config.json");

const NormalText = {
    color: "white",
    paddingBottom: "10px",
};
// import joi from joi;
const Joi = require('joi');
/* eslint-disable react-hooks/exhaustive-deps */

const CreateCashierReceive = () => {
    const url = config.url;
    const navigate = useNavigate();
    
    const [billAdvisorNo, setBillAdvisorNo] = useState("")
    const [Insurer, setInsurer] = useState("");
    const [Advisor, setAdvisor] = useState("")
    const [Customer, setCustomer] = useState("");
    const [cashierReceiptNo, setCashierReceiptNo] = useState("");
    const [cashierDate, setCashierDate] = useState("");
    const [receiveForm, setReceiveForm] = useState("Advisor");
    const [receiveName, setReceiveName] = useState("");
    const [receiveType, setReceiveType] = useState("เงินโอน");
    const [transactionType, setTransactionType] = useState("PREM-IN");
    const [bankPartner, setBankPartner] = useState("");
    const [bankBranchPartner, setBankBranchPartner] = useState("");
    const [bankNoPartner, setBankNoPartner] = useState("");
    const [bankAmity, setBankAmity] = useState("");
    const [bankBranchAmity, setBankBranchAmity] = useState("");
    const [bankNo, setBankNo] = useState("");
    const [amount, setAmount] = useState("");
    
    //select data
    const [bankAmityBrandData, setBankAmityBrandData] = useState([]);
    const [bankAmityBranchData, setBankAmityBranchData] = useState([])
    const [bankAmityNoData, setBankAmityNoData] = useState([])
    //partner Data
    const [bankPartnerBrandData, setBankPartnerBrandData] = useState([]);
    const [bankPartnerBranchData, setBankPartnerBranchData] = useState([]);
    const [bankPartnerNoData, setBankPartnerNoData] = useState([]);
    
    //read only
    const [advisoryReadOnly, setAdvisoryReadOnly] = useState(false)
    const [insurerReadOnly, setInsurerReadOnly] = useState(false)
    const [transactionTypeReadOnly, setTransactionTypeReadOnly] = useState(false)
    const [receiveFromReadOnly, setReceiveFromReadOnly] = useState(false)
    
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalText, setModalText] = useState()
    

    
    const onSearch = (e) =>{
        e.preventDefault()
        console.log(billAdvisorNo)

        let data = JSON.stringify({
            "billadvisorno": billAdvisorNo
        });
        axios.post(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/bills/findDataByBillAdvisoryNo",data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSSUQiOjEsImlhdCI6MTY5MzE5NzY5MCwiZXhwIjoxNjkzMjA0ODkwfQ.YXyE5vG5yrtD8JVkEy4dpWe11J4EAePcFY7jKyAOJqA'
            }
        })
            .then((response) => {
                // console.log(response);
                setInsurer(response.data[0].insurerCode)
                setInsurerReadOnly(true)
                setAdvisoryReadOnly(true)
                setAdvisor(response.data[0].agentCode)
                setTransactionTypeReadOnly(true)
                setReceiveFromReadOnly(true)
                setReceiveForm("Advisor")
                
                
            })
            
            .catch((error) => {
                console.log(error);
            });
        
    }

    useEffect(() => {
        let data={}
        axios.get(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/static/bank/BankAmityBrand",data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSSUQiOjEsImlhdCI6MTY5MzE5NzY5MCwiZXhwIjoxNjkzMjA0ODkwfQ.YXyE5vG5yrtD8JVkEy4dpWe11J4EAePcFY7jKyAOJqA'
            }
        })
            .then((response) => {
                console.log(response.data);
                setBankAmityBrandData(response.data)
                setBankAmity(response.data[0].bankBrand)

            })

            .catch((error) => {
                console.log(error);
            });
        
        axios.get(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/static/bank/BankPartnerBrand?"+"type=I",data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSSUQiOjEsImlhdCI6MTY5MzE5NzY5MCwiZXhwIjoxNjkzMjA0ODkwfQ.YXyE5vG5yrtD8JVkEy4dpWe11J4EAePcFY7jKyAOJqA'
            }
        })
            .then((response) => {
                console.log(response.data);
                setBankPartnerBrandData(response.data)
                setBankPartner(response.data[0].bankBrand)

            })

            .catch((error) => {
                console.log(error);
            });
    }, []);
    
    
    useEffect(() => {
        let data={}
        if (bankAmity!="")
        axios.get(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/static/bank/BankAmityBranch?brand="+bankAmity,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSSUQiOjEsImlhdCI6MTY5MzE5NzY5MCwiZXhwIjoxNjkzMjA0ODkwfQ.YXyE5vG5yrtD8JVkEy4dpWe11J4EAePcFY7jKyAOJqA'
            }
        })
            .then((response) => {
                console.log(response.data);
                setBankAmityBranchData(response.data)

            })

            .catch((error) => {
                console.log(error);
            });
        
        
    }, [bankAmity]);
    useEffect(() => {
        let data={}
        console.log(bankBranchAmity)
        if (bankBranchAmity!="")
        axios.get(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/static/bank/BankAmityBranch?branch="+bankBranchAmity+"&brand="+bankAmity,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSSUQiOjEsImlhdCI6MTY5MzE5NzY5MCwiZXhwIjoxNjkzMjA0ODkwfQ.YXyE5vG5yrtD8JVkEy4dpWe11J4EAePcFY7jKyAOJqA'
            }
        })
            .then((response) => {
                // console.log(response.data);
                setBankAmityNoData(response.data)

            })

            .catch((error) => {
                console.log(error);
            });


    }, [bankBranchAmity]);
    
    useEffect(() => {
        let data={}
        if (bankPartner!="")
        axios.get(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/static/bank/BankPartnerBranch?brand="+bankPartner+"&type=I",data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSSUQiOjEsImlhdCI6MTY5MzE5NzY5MCwiZXhwIjoxNjkzMjA0ODkwfQ.YXyE5vG5yrtD8JVkEy4dpWe11J4EAePcFY7jKyAOJqA'
            }
        })
            .then((response) => {
                console.log(response.data);
                setBankPartnerBranchData(response.data)

            })

            .catch((error) => {
                console.log(error);
            });


    }, [bankPartner]);
    useEffect(() => {
        let data={}
        console.log(bankBranchAmity)
        if (bankBranchPartner!="")
        axios.get(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/static/bank/BankAmityBranch?branch="+bankBranchPartner+"&brand="+bankPartner+"&type=I",data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSSUQiOjEsImlhdCI6MTY5MzE5NzY5MCwiZXhwIjoxNjkzMjA0ODkwfQ.YXyE5vG5yrtD8JVkEy4dpWe11J4EAePcFY7jKyAOJqA'
            }
        })
            .then((response) => {
                // console.log(response.data);
                setBankPartnerNoData(response.data)

            })

            .catch((error) => {
                console.log(error);
            });


    }, [bankBranchPartner]);
    
    
    
    
    useEffect(() => {

        
    }, [receiveForm]);
    const handleSubmit = () => {
        let data={
            // keyid: Joi.string().required(),
            billadvisorno: billAdvisorNo,
            // cashierreceiveno: Joi.string().required(),
            // cashierdate: Joi.date().required(),
            // dfrpreferno: Joi.string().required(),
            transactiontype: transactionType,
            insurercode: Insurer,
            advisorcode: Advisor,
            customerid: Customer,
            receivefrom: receiveForm,
            receivename: receiveName,
            receivetype: receiveType,
            PartnerBank: bankPartner,
            PartnerBankbranch: bankPartner,
            PartnerAccountno: bankNoPartner,
            AmityBank: bankAmity,
            AmityBankBranch: bankBranchAmity,
            AmityAccountno: bankNo,
            Amt: amount
            // createdate: Joi.date().required(),
            // createtime: Joi.string().required(),
            // createusercode: Joi.string().required(),
            // updatedate: Joi.date().required(),
            // updatetime: Joi.string().required(),
            // updateusercode: Joi.string().required(),
            // canceldate: Joi.date().required(),
            // canceltime: Joi.string().required(),
            // cancelusercode: Joi.string().required(),
            // status: Joi.string().valid('I').required()
        }


        const schema = Joi.object({
            // keyid: Joi.string().required(),
            billadvisorno: Joi.string().required(),
            // cashierreceiveno: Joi.string().required(),
            // cashierdate: Joi.date().required(),
            // dfrpreferno: Joi.string().required(),
            transactiontype: Joi.string().required(),
            insurercode: Joi.string().required(),
            advisorcode: Joi.string().required(),
            customerid: Joi.string().required(),
            receivefrom: Joi.string().required(),
            receivename: Joi.string().required(),
            receivetype: Joi.string().required(),
            PartnerBank: Joi.string().required(),
            PartnerBankbranch: Joi.string().required(),
            PartnerAccountno: Joi.string().required(),
            AmityBank: Joi.string().required(),
            AmityBankBranch: Joi.string().required(),
            AmityAccountno: Joi.string().required(),
            Amt: Joi.number().required(),
            // createdate: Joi.date().required(),
            // createtime: Joi.string().required(),
            // createusercode: Joi.string().required(),
            // updatedate: Joi.date().required(),
            // updatetime: Joi.string().required(),
            // updateusercode: Joi.string().required(),
            // canceldate: Joi.date().required(),
            // canceltime: Joi.string().required(),
            // cancelusercode: Joi.string().required(),
            // status: Joi.string().valid('I').required()
        });
        const {error} = schema.validate(data);
        if (error) {
            setModalText(error)
            return
        }
        
        axios.post(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/bills/submitCasheir",data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSSUQiOjEsImlhdCI6MTY5MzE5NzY5MCwiZXhwIjoxNjkzMjA0ODkwfQ.YXyE5vG5yrtD8JVkEy4dpWe11J4EAePcFY7jKyAOJqA'
            }
        })
            .then((response) => {

                if (response.status==200) {
                    console.log("Success")
                    setModalText("Success")
                    setShow(true)
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };
    const handleSave = () => {
        const schema = Joi.object({
            // keyid: Joi.string().required(),
            billadvisorno: Joi.string().required(),
            // cashierreceiveno: Joi.string().required(),
            // cashierdate: Joi.date().required(),
            // dfrpreferno: Joi.string().required(),
            transactiontype: Joi.string().required(),
            insurercode: Joi.string().required(),
            advisorcode: Joi.string().required(),
            customerid: Joi.string().required(),
            receivefrom: Joi.string().required(),
            receivename: Joi.string().required(),
            receivetype: Joi.string().required(),
            PartnerBank: Joi.string().required(),
            PartnerBankbranch: Joi.string().required(),
            PartnerAccountno: Joi.string().required(),
            AmityBank: Joi.string().required(),
            AmityBankBranch: Joi.string().required(),
            AmityAccountno: Joi.string().required(),
            Amt: Joi.number().required(),
            // createdate: Joi.date().required(),
            // createtime: Joi.string().required(),
            // createusercode: Joi.string().required(),
            // updatedate: Joi.date().required(),
            // updatetime: Joi.string().required(),
            // updateusercode: Joi.string().required(),
            // canceldate: Joi.date().required(),
            // canceltime: Joi.string().required(),
            // cancelusercode: Joi.string().required(),
            // status: Joi.string().valid('I').required()
        });
        let data={
            // keyid: Joi.string().required(),
            billadvisorno: billAdvisorNo,
            // cashierreceiveno: Joi.string().required(),
            // cashierdate: Joi.date().required(),
            // dfrpreferno: Joi.string().required(),
            transactiontype: transactionType,
            insurercode: Insurer,
            advisorcode: Advisor,
            customerid: Customer,
            receivefrom: receiveForm,
            receivename: receiveName,
            receivetype: receiveType,
            PartnerBank: bankPartner,
            PartnerBankbranch: bankPartner,
            PartnerAccountno: bankNoPartner,
            AmityBank: bankAmity,
            AmityBankBranch: bankBranchAmity,
            AmityAccountno: bankNo,
            Amt: amount
            // createdate: Joi.date().required(),
            // createtime: Joi.string().required(),
            // createusercode: Joi.string().required(),
            // updatedate: Joi.date().required(),
            // updatetime: Joi.string().required(),
            // updateusercode: Joi.string().required(),
            // canceldate: Joi.date().required(),
            // canceltime: Joi.string().required(),
            // cancelusercode: Joi.string().required(),
            // status: Joi.string().valid('I').required()
        }
        const {error} = schema.validate(data);
        if (error) {
            setModalText(error)
            return
        }
        axios.post(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/bills/saveCasheir",data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSSUQiOjEsImlhdCI6MTY5MzE5NzY5MCwiZXhwIjoxNjkzMjA0ODkwfQ.YXyE5vG5yrtD8JVkEy4dpWe11J4EAePcFY7jKyAOJqA'
            }
        })
            .then((response) => {
                console.log(response)
                if (response.status==200) {
                    setModalText("Success")
                    setShow(true)
                    console.log("Success")
                }
            })
            .catch((error) => {
                console.log(error);
            });
        
    };
    const searchBill = (e) =>{
        e.preventDefault()
        let data = JSON.stringify({
            "billadvisorno": billAdvisorNo
        });
        axios.post(window.globalConfig.BEST_POLICY_V1_BASE_URL+"/bills/findDataByBillAdvisoryNo",data,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                // console.log(response.data);
                if (response.data[0])
                {
                    Insurer(response.data[0].insurerCode)
                    Advisor(response.data[0].agentCode)
                    setTransactionType("PREM-IN")
                    setInsurerReadOnly(true)
                    setAdvisoryReadOnly(true)
                    setTransactionTypeReadOnly(true)
                    setModalText("Success")
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalText}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        <div className="container" style={{marginTop:"30px",marginBottom:"30px"}}>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form>
                        <h2 className="text-center" style={{marginBottom:"30px"}}>สร้างรายการ Cashier ใหม่</h2>

                        {/* Bill Advisor No */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="billAdvisorNo" className="form-label">Bill Advisor No</label>
                            </div>
                            <div className="col-7">
                                <input type="text" required id="billAdvisorNo" value={billAdvisorNo} onChange={(e) => setBillAdvisorNo(e.target.value)} className="form-control"/>
                            </div>
                            <div className="col-1 text-center">
                                <button type="submit" className="btn btn-primary" onClick={onSearch}>Search</button>
                            </div>
                        </div>

                        {/* Insurer */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="Insurer" className="form-label">Insurer</label>
                            </div>
                            <div className="col-7">
                                <input type="text" id="Insurer" required value={Insurer} readOnly={insurerReadOnly} onChange={(e) => setInsurer(e.target.value)} className="form-control"/>
                            </div>
                        </div>
                        {/* Advisor */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="Advisor" className="form-label">Advisor</label>
                            </div>
                            <div className="col-7">
                                <input type="text" id="Advisor"  required value={Advisor} readOnly={advisoryReadOnly} onChange={(e) => setAdvisor(e.target.value)} className="form-control"/>
                            </div>
                        </div>

                        {/* Customer */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="Customer" className="form-label">Customer</label>
                            </div>
                            <div className="col-7">
                                <input type="text" id="Customer" value={Customer} required onChange={(e) => setCustomer(e.target.value)} className="form-control"/>
                            </div>
                        </div>

                        {/* Cashier Receipt No */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="cashierReceiptNo" className="form-label">Cashier Receipt No</label>
                            </div>
                            <div className="col-7">
                                <input type="text" id="cashierReceiptNo" required  value={cashierReceiptNo} onChange={(e) => setCashierReceiptNo(e.target.value)} className="form-control"/>
                            </div>
                        </div>

                        {/* Cashier Date */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="cashierDate" className="form-label">Cashier Date</label>
                            </div>
                            <div className="col-7">
                                <input type="datetime-local" id="cashierDate" required value={cashierDate} onChange={(e) => setCashierDate(e.target.value)} className="form-control"/>
                            </div>
                        </div>

                        {/* Receive Form */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="receiveForm" className="form-label">Receive Form</label>
                            </div>
                            <div className="col-7">
                                <select type="text" id="receiveForm" value={receiveForm} onChange={(e) => setReceiveForm(e.target.value)} 
                                        className="form-control"
                                        disabled={receiveFromReadOnly}
                                        style={{ backgroundColor: receiveFromReadOnly ? 'grey' : 'white' }}
                                >
                                    <option value="" disabled>Select Transaction Type</option>
                                    <option value="PREM-IN">Advisor</option>
                                    <option value="PREM-OUT">Insurer</option>
                                    <option value="COMM-OUT">Customer</option>
                                </select>
                            </div>
                        </div>

                        {/* Receive Name */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="receiveName" className="form-label">Receive Name</label>
                            </div>
                            <div className="col-7">
                                <input type="text" id="receiveName" value={receiveName} required onChange={(e) => setReceiveName(e.target.value)} className="form-control"/>
                            </div>
                        </div>
                        {/* Receive Type */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="receiveType" className="form-label">Receive Type</label>
                            </div>
                            <div className="col-7">
                                <select  id="receiveType" value={receiveType} onChange={(e) => setReceiveType(e.target.value)} className="form-control">
                                    <option value="" disabled>Select Transaction Type</option>
                                    <option value="PREM-IN">เงินโอน</option>
                                    <option value="PREM-OUT">เช็ค</option>
                                    <option value="COMM-OUT">เงินสด</option>
                                    <option value="COMM-IN">draft</option>
                                    <option value="COMM-IN">อื่นๆ</option>
                                </select>
                            </div>
                        </div>

                        {/* Transaction Type */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="transactionType" className="form-label">Transaction Type</label>
                            </div>
                            <div className="col-7">
                                <select
                                    id="transactionType"
                                    value={transactionType}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                    className="form-control"
                                    disabled={transactionTypeReadOnly}
                                    style={{ backgroundColor: transactionTypeReadOnly ? 'grey' : 'white' }}
                                >
                                    <option value="" disabled>Select Transaction Type</option>
                                    <option value="PREM-IN">PREM-IN</option>
                                    <option value="PREM-OUT">PREM-OUT</option>
                                    <option value="COMM-OUT">COMM-OUT</option>
                                    <option value="COMM-IN">COMM-IN</option>
                                </select>
                            </div>
                        </div>


                        {/* Bank Partner */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankPartner" className="form-label">Bank Partner</label>
                            </div>
                            <div className="col-7">
                                <select
                                    id="bankPartner"
                                    value={bankPartner}
                                    onChange={(e) => {
                                        setBankPartner(e.target.value)
                                    }
                                    }
                                    className="form-control"
                                >
                                    <option value="" disabled>Select Partner Bank</option>
                                    {

                                        bankPartnerBrandData.map((bank, index) => (
                                            <option key={index} value={bank.bankBrand}>
                                                {`${bank.bankBrand} `}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        {/* Bank Branch Partner */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankBranchPartner" className="form-label">Bank Branch Partner</label>
                            </div>
                            <div className="col-7">
                                <select
                                    id="bankBranchPartner"
                                    value={bankBranchPartner}
                                    onChange={(e) => {
                                        setBankBranchPartner(e.target.value)
                                    }
                                    }
                                    className="form-control"
                                >
                                    <option value="" disabled>Select Partner Bank Branch</option>
                                    {
                                        bankPartnerBranchData.map((bank, index) => (
                                            <option key={index} value={bank.bankBranch}>
                                                {`${bank.bankBranch} `}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        {/* Bank No Partner */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankNoPartner" className="form-label">Bank No Partner</label>
                            </div>
                            <div className="col-7">
                                <select
                                    id="bankNoPartner"
                                    value={bankNoPartner}
                                    onChange={(e) => {
                                        setBankNoPartner(e.target.value)
                                    }
                                    }
                                    className="form-control"
                                >
                                    <option value="" disabled>Select Partner Bank No</option>
                                    {
                                        bankPartnerBranchData.map((bank, index) => (
                                            <option key={index} value={bank.bankNo}>
                                                {`${bank.bankNo} `}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        {/* Bank Amity */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankAmity" className="form-label">Bank Amity</label>
                            </div>
                            <div className="col-7">
                                <select
                                    id="bankAmity"
                                    value={bankAmity}
                                    onChange={(e) => {
                                        setBankAmity(e.target.value)
                                    }
                                }
                                    className="form-control"
                                >
                                    <option value="" disabled>Select Amity Bank</option>
                                    {
                                        
                                        bankAmityBrandData.map((bank, index) => (
                                            <option key={index} value={bank.bankBrand}>
                                                {`${bank.bankBrand} `}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        {/* Bank Branch Amity */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankBranchAmity" className="form-label">Bank Branch Amity</label>
                            </div>
                            <div className="col-7">
                                <select
                                    id="bankBranchAmity"
                                    value={bankBranchAmity}
                                    onChange={(e) => {
                                        setBankBranchAmity(e.target.value)
                                    }
                                    }
                                    className="form-control"
                                >
                                    <option value="" disabled>Select Amity Bank Branch</option>
                                    {
                                        bankAmityBranchData.map((bank, index) => (
                                            <option key={index} value={bank.bankBranch}>
                                                {`${bank.bankBranch} `}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        {/* Bank No */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="bankNo" className="form-label">Bank No</label>
                            </div>
                            <div className="col-7">
                                <select
                                    id="bankAmityNo"
                                    value={bankNo}
                                    onChange={(e) => {
                                        setBankNo(e.target.value)
                                    }
                                    }
                                    className="form-control"
                                >
                                    <option value="" disabled>Select Amity Bank No</option>
                                    {
                                        bankAmityNoData.map((bank, index) => (
                                            <option key={index} value={bank.bankNo}>
                                                {`${bank.bankNo} `}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="row mb-3">
                            <div className="col-4">
                                <label htmlFor="amount" className="form-label">Amount</label>
                            </div>
                            <div className="col-7">
                                <input type="text" id="amount" required value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control"/>
                            </div>
                        </div>

                    </form>


                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary btn-lg" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
export default CreateCashierReceive;
