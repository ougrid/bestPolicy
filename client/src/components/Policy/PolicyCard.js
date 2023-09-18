import axios from "axios";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { CenterPage } from "../StylesPages/AdminStyles";
import { Container } from "../StylesPages/PagesLayout";
import { async } from "q";
const config = require("../../config.json");

const PolicyCard = (props) => {
  const index = props.index;
  const url = config.url;
  const tax = config.tax
  const duty = config.duty

  //import excel
  const [formData, setFormData] = useState(props.formData);
  const [provinceDD, setProvinceDD] = useState([]);
  const [districDD, setDistricDD] = useState([]);
  const [subDistricDD, setSubDistricDD] = useState([]);
  const [zipcodeDD, setZipCodeDD] = useState([]);
  const [titleDD, setTitleDD] = useState([]);
  const [insureTypeDD, setInsureTypeDD] = useState([]);
  const [insureClassDD, setInsureClassDD] = useState([]);
  const [insureSubClassDD, setInsureSubClassDD] = useState([]);
  const [insurerDD, setInsurerDD] = useState([]);
  const [motorbrandDD, setMotorbrandDD] = useState([]);
  const [motormodelDD, setMotormodelDD] = useState([]);
  const [installment, setInstallment] = useState({ insurer: [], advisor: [] })

  const handleChange = async (e) => {
    e.preventDefault();

    //set dropdown subclass when class change
    if (e.target.name === "class") {
      const array = [];
      insureTypeDD.forEach((ele) => {
        if (e.target.value === ele.class) {
          array.push(
            <option key={ele.id} value={ele.subClass}>
              {ele.subClass}
            </option>
          );
        }
      });
      setInsureSubClassDD(array);
    }
    //  set totalprem
    if (
      formData.duty !== null &&
      formData.tax !== null &&
      formData.grossprem !== null
    ) {
      const newTotalPrem =
        parseFloat(formData.grossprem) -
        parseFloat(formData.duty) -
        parseFloat(formData.tax);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        totalprem: newTotalPrem,
      }));
    } else {
      if (e.target.name === 'commin_rate') {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
          commin_amt: (formData[`commin_rate`] * formData[`grossprem`]) / 100
        }));
      } else if (e.target.name === 'ovin_rate') {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
          ovin_amt: (formData[`ovin_rate`] * formData[`grossprem`]) / 100
        }));
      } else if (e.target.name === 'commout_rate') {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
          commout_amt: (formData[`commout_rate`] * formData[`grossprem`]) / 100
        }));
      } else if (e.target.name === 'ovout_rate') {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
          ovout_amt: (formData[`ovout_rate`] * formData[`grossprem`]) / 100
        }));
      } else if (e.target.name === 'grossprem')
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
          duty: (duty * formData[`grossprem`]) / 100,
          tax: (tax * formData[`grossprem`]) / 100
        }));
    }

    //set dropdown title follow to personType
    if (e.target.name === "personType") {
      if (e.target.value === "P") {
        axios
          .get(url + "/static/titles/person/all")
          .then((title) => {
            const array2 = [];
            title.data.forEach((ele) => {
              array2.push(
                <option key={ele.TITLEID} value={ele.TITLETHAIBEGIN}>
                  {ele.TITLETHAIBEGIN}
                </option>
              );
            });
            setTitleDD(array2);
          })
          .catch((err) => { });
      } else {
        axios
          .get(url + "/static/titles/company/all")
          .then((title) => {
            const array2 = [];
            title.data.forEach((ele) => {
              array2.push(
                <option key={ele.TITLEID} value={ele.TITLETHAIBEGIN}>
                  {ele.TITLETHAIBEGIN}
                </option>
              );
            });
            setTitleDD(array2);
          })
          .catch((err) => { });
      }
    }

    //set dropdown distric subdistric
    if (e.target.name === "province") {

      getDistrict(e.target.value);
    } else if (e.target.name === "district") {
      getSubDistrict(e.target.value);
    } else if (e.target.name === "brandname") {
      getMotormodel(e.target.value);
    }
    //get com/ov setup

    console.log(formData.insurerCode !== null &&
      formData.class !== null &&
      formData.subClass !== null);
  };

  const getDistrict = (provincename) => {
    //get distric in province selected
    axios
      .post(url + "/static/amphurs/search", { provincename: provincename })
      .then((distric) => {
        const array = [];
        distric.data.forEach((ele) => {
          array.push(
            <option id={ele.amphurid} value={ele.t_amphurname} value2={ele.t_amphurname}>
              {ele.t_amphurname}
            </option>
          );
        });
        setDistricDD(array);
      })
      .catch((err) => {
        // alert("cant get aumphur");
      });
  };

  const getMotormodel = (brandname) => {
    //get distric in province selected
    axios
      .post(url + "/static/mt_models/search", { brandname: brandname })
      .then((model) => {
        const array = [];
        model.data.forEach((ele) => {
          array.push(
            <option value={ele.MODEL} >
              {ele.MODEL}
            </option>
          );
        });
        setMotormodelDD(array);
      })
      .catch((err) => {
        // alert("cant get aumphur");
      });
  };
  const getcommov = (e) => {
    e.preventDefault();
    //get comm  ov setup
    axios
      .post(url + "/insures/getcommov", formData)
      .then((res) => {
        console.log(res.data);
        setFormData((prevState) => ({
          ...prevState,
          [`commin_rate`]: res.data[0].rateComIn,
          [`ovin_rate`]: res.data[0].rateOVIn_1,
          [`commout_rate`]: res.data[0].rateComOut,
          [`ovout_rate`]: res.data[0].rateOVOut_1,
          [`commin_amt`]: res.data[0].rateComIn * formData[`grossprem`] / 100,
          [`ovin_amt`]: res.data[0].rateOVIn_1 * formData[`grossprem`] / 100,
          [`commout_amt`]: res.data[0].rateComOut * formData[`grossprem`] / 100,
          [`ovout_amt`]: res.data[0].rateOVOut_1 * formData[`grossprem`] / 100,

        }));
      })
      .catch((err) => {
        // alert("cant get aumphur");
      });

    // if (formData[`commin_rate`] == null && formData[`ovin_rate`] == null ) {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [`commin_rate`]: 10,
    //     [`ovin_rate`]: 15,
    //   }));

    // }
    //  if (formData[`commout_rate`] == null && formData[`ovout_rate`] == null){
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [`commout_rate`]: 10,
    //     [`ovout_rate`]: 15,
    //   }));
    // }


  }



  const getSubDistrict = (amphurname) => {
    //get tambons in distric selected
    axios
      .post(url + "/static/tambons/search", { amphurname: amphurname })
      .then((subdistric) => {
        const arraySub = [];
        const arrayZip = [];
        const zip = [];
        subdistric.data.forEach((ele) => {
          arraySub.push(
            <option id={ele.tambonid} value={ele.t_tambonname}>
              {ele.t_tambonname}
            </option>
          );
          zip.push(ele.postcodeall.split("/"));
        });
        const uniqueZip = [...new Set(...zip)];
        console.log(uniqueZip);
        uniqueZip.forEach((zip) => {
          arrayZip.push(<option value={zip}>{zip}</option>);
        });
        setSubDistricDD(arraySub);
        setZipCodeDD(arrayZip);
      })
      .catch((err) => {
        // alert("cant get tambons");
      });
  };

  const editInstallment = (e,type, index) => {
    // e.preventDefault();
    //get tambons in distric selected
    const arrI =[]
    const arrA =[]
    // get old installment
    installment.insurer.map(ele =>{
      arrI.push(ele)
    })
    installment.advisor.map(ele =>{
      arrA.push(ele)
    })
    if (type === 'insurer') {
      const dueDate = document.getElementsByName(`dueDate-${index}`)[0].value
      const netgrossprem = parseFloat(document.getElementsByName(`netgrossprem-${index}`)[0].value)
      const dutyamt = parseFloat((netgrossprem * duty).toFixed(2))
      const taxamt = parseFloat((netgrossprem * tax).toFixed(2))
      const commin_amt = parseFloat((formData.commin_rate * netgrossprem / 100).toFixed(2))
      const ovin_amt = parseFloat((formData.ovin_rate * netgrossprem / 100).toFixed(2))

      
      arrI[index] = {
        netgrossprem: netgrossprem,
        tax: taxamt,
        duty: dutyamt,
        totalprem: parseFloat((netgrossprem + tax + duty).toFixed(2)),
        dueDate: dueDate,
        commin_amt: commin_amt,
        commin_taxamt: parseFloat((commin_amt * tax).toFixed(2)),
        ovin_amt: ovin_amt,
        ovin_taxamt: parseFloat((ovin_amt * tax).toFixed(2))
      }
      console.log(arrI);
      setInstallment()

    } else if (type === 'advisor') {
      const dueDate = document.getElementsByName(`dueDate-${index}`)[0].value
      const netgrossprem = parseFloat(document.getElementsByName(`netgrossprem-${index}`)[0].value)
      const dutyamt = parseFloat((duty * netgrossprem).toFixed(2))
      const taxamt = parseFloat((tax * netgrossprem).toFixed(2))
      const commin_amt = parseFloat((formData.commin_rate * netgrossprem / 100).toFixed(2))
      const ovin_amt = parseFloat((formData.ovin_rate * netgrossprem / 100).toFixed(2))
      const commout1_amt = parseFloat((formData.commout1_rate * netgrossprem / 100).toFixed(2))
      const ovout1_amt = parseFloat((formData.ovout1_rate * netgrossprem / 100).toFixed(2))

    // get old installment
    arrA[index] = {
      netgrossprem: netgrossprem,
      tax: taxamt,
      duty: dutyamt,
      totalprem: parseFloat((netgrossprem + tax + duty).toFixed(2)),
      dueDate: dueDate,
      commin_amt: commin_amt,
      commin_taxamt: parseFloat((commin_amt * tax).toFixed(2)),
      ovin_amt: ovin_amt,
      ovin_taxamt: parseFloat((ovin_amt * tax).toFixed(2)),
      commout1_amt: commout1_amt,
      ovout1_amt: ovout1_amt
    }
    
  }
  setInstallment({insurer: arrI, advisor : arrA})
  };


  const handleSubmit = async (e) => {
    const data = [];
    for (let i = 0; i < formData.length; i++) {
      let t_ogName = null;
      let t_firstName = null;
      let t_lastName = null;
      let idCardType = "idcard";
      let idCardNo = null;
      let taxNo = null;
      const totalprem = parseFloat(formData[i].grossprem) -
        parseFloat(formData[i].duty) -
        parseFloat(formData[i].tax);


      if (formData[i].personType === "P") {
        t_firstName = formData[i].t_fn;
        t_lastName = formData[i].t_ln;
        idCardNo = formData[i].regisNo.toString();
        data.push({
          ...formData[i],
          t_firstName: t_firstName,
          t_lastName: t_lastName,
          totalprem: totalprem,
          idCardNo: idCardNo,
          idCardType: idCardType,
          t_ogName: t_ogName,
          taxNo: taxNo,
        });
      } else {
        t_ogName = formData[i].t_fn;

        taxNo = formData[i].regisNo.toString();
        data.push({
          ...formData[i],
          t_ogName: t_ogName,
          taxNo: taxNo,
          t_firstName: t_firstName,
          t_lastName: t_lastName,
          totalprem: totalprem,
          idCardNo: idCardNo,
          idCardType: idCardType,
        });
      }
    }
    console.log(data);
    e.preventDefault();
    await axios.post(url + "/policies/policynew/batch", data).then((res) => {
      alert("policy batch Created");
      window.location.reload(false);
    });
  };
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

        const array = [];
        province.data.forEach((ele) => {
          array.push(
            <option value={ele.t_provincename} >
              {ele.t_provincename}
            </option>
          );
        });
        setProvinceDD(array);
        // get title
        axios
          .get(url + "/static/titles/company/all")
          .then((title) => {
            const array2 = [];
            title.data.forEach((ele) => {
              array2.push(
                <option key={ele.TITLEID} value={ele.TITLEID}>
                  {ele.TITLETHAIBEGIN}
                </option>
              );
            });
            setTitleDD(array2);
          })
          .catch((err) => { });
      })
      .catch((err) => { });
    // get title all of company type

    //get insureType
    axios
      .get(url + "/insures/insuretypeall")
      .then((insuretype) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);

        const array = [];
        insuretype.data.forEach((ele) => {
          array.push(
            <option key={ele.id} value={ele.class}>
              {ele.class}
            </option>
          );
        });
        setInsureTypeDD(insuretype.data);
        setInsureClassDD(array);
      })
      .catch((err) => { });

    //get insurer
    axios
      .get(url + "/persons/insurerall")
      .then((insurer) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);

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
      .catch((err) => {
        // alert("cant get province");
      });

    //get motor brand
    axios
      .get(url + "/static/mt_brands/all")
      .then((brands) => {
        // let token = res.data.jwt;
        // let decode = jwt_decode(token);
        // navigate("/");
        // window.location.reload();
        // localStorage.setItem("jwt", token);

        const array = [];
        brands.data.forEach((ele) => {
          array.push(
            <option key={ele.id} value={ele.BRANDNAME}>
              {ele.BRANDNAME}
            </option>
          );
        });
        setMotorbrandDD(array);
      })
      .catch((err) => { });
    //get installment
    if (props.formData.installment) {
      setInstallment(props.formData.installment)
    }
  }, []);

  const calinstallment = (e) => {
    e.preventDefault();
    // set installment data
    const installI = document.getElementsByName("installmentInsurer")[0].checked
    const seqNoins = parseInt(document.getElementsByName("seqNoins")[0].value)
    const seqNoinstime = parseInt(document.getElementsByName("seqNoinstime")[0].value)
    const seqNoinstype = document.getElementsByName("seqNoinstype")[0].value
    const flagallowduty = document.getElementsByName("flagallowduty")[0].checked

    const installA = document.getElementsByName("installmentAdvisor")[0].checked
    const seqNoagt = parseInt(document.getElementsByName("seqNoagt")[0].value)
    const seqNoagttime = parseInt(document.getElementsByName("seqNoagttime")[0].value)
    const seqNoagttype = document.getElementsByName("seqNoagttype")[0].value

    const arrI = []
    if (installI) {
      let premperseq = parseFloat((formData.netgrossprem / seqNoins).toFixed(2))
      console.log(formData.netgrossprem - premperseq * (seqNoins - 1));
      let dueDate = new Date()
      for (let i = 1; i <= seqNoins; i++) {
        let dutyseq = 0

        // cal prem
        if (i === 1) {
          premperseq = parseFloat((formData.netgrossprem - premperseq * (seqNoins - 1)).toFixed(2))

        }
        else { premperseq = parseFloat((formData.netgrossprem / seqNoins).toFixed(2)) }
        //cal tax
        let taxseq = parseFloat((tax * premperseq).toFixed(2))

        //cal duty
        if (flagallowduty) { dutyseq = parseFloat((premperseq * duty).toFixed(2)) }
        else {
          if (i === 1) {
            dutyseq = parseFloat((formData.netgrossprem * duty).toFixed(2))
          } else { dutyseq = 0 }
        }
        // cal duedate
        if (seqNoinstype === 'M') {
          dueDate.setMonth(dueDate.getMonth() + seqNoinstime)
        } else { dueDate.setDate(dueDate.getDate() + seqNoinstime) }

        //cal comm-ov in
        let comminseq = parseFloat((formData.commin_rate * premperseq / 100).toFixed(2))
        let ovinseq = parseFloat((formData.ovin_rate * premperseq / 100).toFixed(2))
        arrI.push({
          netgrossprem: premperseq,
          tax: taxseq,
          duty: dutyseq,
          totalprem: parseFloat((premperseq + taxseq + dutyseq).toFixed(2)),
          dueDate: dueDate.toISOString().split('T')[0],
          commin_amt: comminseq,
          commin_taxamt: parseFloat((comminseq * tax).toFixed(2)),
          ovin_amt: ovinseq,
          ovin_taxamt: parseFloat((ovinseq * tax).toFixed(2)),
        })

      }
      console.log(arrI);
    }

    const arrA = []
    if (installA) {
      let premperseq = parseFloat((formData.netgrossprem / seqNoagt).toFixed(2))
      console.log(formData.netgrossprem - premperseq * (seqNoagt - 1));
      let dueDate = new Date()
      for (let i = 1; i <= seqNoagt; i++) {
        let dutyseq = 0

        // cal prem
        if (i === 1) {
          premperseq = parseFloat((formData.netgrossprem - premperseq * (seqNoagt - 1)).toFixed(2))

        }
        else { premperseq = parseFloat((formData.netgrossprem / seqNoagt).toFixed(2)) }
        //cal tax
        let taxseq = parseFloat((tax * premperseq).toFixed(2))

        //cal duty
        if (flagallowduty) { dutyseq = parseFloat((premperseq * duty).toFixed(2)) }
        else {
          if (i === 1) {
            dutyseq = parseFloat((formData.netgrossprem * duty).toFixed(2))
          } else { dutyseq = 0 }
        }
        // cal duedate
        if (seqNoagttype === 'M') {
          dueDate.setMonth(dueDate.getMonth() + seqNoagttime)
        } else { dueDate.setDate(dueDate.getDate() + seqNoagttime) }

        //cal comm-ov in
        let comminseq = parseFloat((formData.commin_rate * premperseq / 100).toFixed(2))
        let ovinseq = parseFloat((formData.ovin_rate * premperseq / 100).toFixed(2))
        //cal comm-ov out
        let commoutseq = parseFloat((formData.commout1_rate * premperseq / 100).toFixed(2))
        let ovoutseq = parseFloat((formData.ovout1_rate * premperseq / 100).toFixed(2))
        arrA.push({
          netgrossprem: premperseq,
          tax: taxseq,
          duty: dutyseq,
          totalprem: premperseq + taxseq + dutyseq,
          dueDate: dueDate.toISOString().split('T')[0],
          commin_amt: comminseq,
          commin_taxamt: comminseq * tax,
          ovin_amt: ovinseq,
          ovin_taxamt: ovinseq * tax,
          commout1_amt: commoutseq,
          ovout1_amt: ovoutseq
        })

      }
      console.log(arrI);
    }
    setInstallment({ insurer: arrI, advisor: arrA })
  }
  
  return (
    <div>
      <h1 className="text-center">กรมธรรม์ฉบับที่ {parseInt(index) + 1}</h1>
      {/* policy table */}
      <div className="row form-group form-inline ">
        <div className="col-1"></div>
        <div className="col-2 form-group  ">
          <label class="form-label ">
            เลขที่กรมธรรม์<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            value={formData.policyNo || ''}
            name={`policyNo`}
            onChange={handleChange}
          />
        </div>

        <div class="col-2 form-group ">
          <label class="form-label">
            วันที่เริ่มคุ้มครอง<span class="text-danger"> *</span>
          </label>
          <input
            disabled
            className="form-control"
            type="date"
            defaultValue={formData.actDate}
            name={`actDate`}
            onChange={handleChange}
          />
        </div>

        <div class="col-2 form-group ">
          <label class="form-label ">
            วันที่สิ้นสุด<span class="text-danger"> *</span>
          </label>
          <input
            disabled
            className="form-control"
            type="date"
            defaultValue={formData.expDate}
            name={`expDate`}
            onChange={handleChange}
          />
        </div>
        <div className="col-2 form-group  ">
          <label class="form-label ">
            issueDate<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="date"
            value={formData.issueDate || ''}
            name={`issueDate`}
            onChange={handleChange}
          />
        </div>
        <div class="col-3">{/* null */}</div>
      </div>

      <div class="row">
        <div className="col-1"></div>
        <div class="col-2 form-group ">
          <label class="form-label px-3">
            บริษัทรับประกัน<span class="text-danger"> *</span>
          </label>
          <select
            disabled
            className="form-control"
            name={`insurerCode`}
            onChange={handleChange}
          >
            <option value={formData.insurerCode} selected disabled hidden>
              {formData.insurerCode}
            </option>
            {insurerDD}
          </select>
        </div>

        <div class="col-2 form-group ">
          <label class="form-label px-3">
            รหัสผู้แนะนำ<span class="text-danger"> *</span>
          </label>
          <input
            disabled
            className="form-control"
            type="text"
            defaultValue={formData.agentCode}
            name={`agentCode`}
            onChange={handleChange}
          />
        </div>
        <div class="col-2 form-group ">
          <label class="form-label px-3">
            รหัสผู้แนะนำ 2<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            disabled
            defaultValue={formData.agentCode2}
            name={`agentCode2`}
            onChange={handleChange}
          />
        </div>
        <div class="col-2 form-group ">
          <div className="row">

            <div className="col form-group">
              <label class="form-label ">
                Class
              </label>
              <select
                disabled
                className="form-control"
                name={`class`}
                onChange={handleChange}
              >
                <option value={formData.class} selected disabled hidden>
                  {formData.class}
                </option>
                {insureClassDD}
              </select>
            </div>
            <div className="col form-group">
              <label class="form-label ">
                Subclass
              </label>
              <select
                disabled
                className="form-control"
                name={`subClass`}
                onChange={handleChange}
              >
                <option value={formData.subClass} selected disabled hidden>
                  {formData.subClass}
                </option>
                {insureSubClassDD}
              </select>
            </div>

          </div>

        </div>

      </div>
      {/* policy table */}

      <div class="row">
        <div className="col-1"></div>
        <div class="col-2">
          <label class="form-label ">
            ค่าเบี้ย<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="number"
            step={0.1}
            value={formData.grossprem}
            name={`grossprem`}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div class="col-2">
          <label class="form-label ">
            ส่วนลด %
          </label>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                step={0.1}
                value={formData[`specdiscrate`]}
                name={`specdiscrate`}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                disabled
                step={0.1}
                value={parseFloat((formData[`specdiscrate`] * formData[`grossprem`] / 100).toFixed(2)) || ""}
                name={`specdiscamt`}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

        </div>

        <div class="col-2">
          <div className="row">
            <div className="col">
              <label class="form-label ">
                duty
              </label>
              <input
                className="form-control"
                type="number"
                step={0.1}
                disabled
                // netgrossprem * tax 
                value={parseFloat(((100 - formData[`specdiscrate`]) * formData[`grossprem`] / 100 * duty).toFixed(2)) || ""}
                //value={formData.duty}
                name={`duty`}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label class="form-label ">
                tax
              </label>
              <input
                className="form-control"
                type="number"
                step={0.1}
                disabled
                // netgrossprem * tax 
                value={parseFloat(((100 - formData[`specdiscrate`]) * formData[`grossprem`] / 100 * tax).toFixed(2)) || ""}
                //value={formData.tax}
                name={`tax`}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>

        <div class="col-2">
          <label class="form-label ">
            ค่าเบี้ยรวม<span class="text-danger"> *</span>
          </label>
          <input
            type="number" // Use an input element for displaying numbers
            className="form-control"
            // value={formData.totalprem} // Display the totalprem value from the state
            // value={parseFloat(formData.grossprem) - parseFloat(formData.duty) - parseFloat(formData.tax)}
            value={parseFloat(((100 - formData[`specdiscrate`]) * formData[`grossprem`] / 100 * (1 + duty + tax)).toFixed(2)) || ""}
            step={0.1}
            name={`totalprem`}
            readOnly
          />
        </div>
      </div>

      {/* <div class="row">
        <div className="col-1"></div>
        <div class="col-2">
          <label class="form-label ">
            comm_in%<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="number"
            step={0.1}
            value={formData[`commin_rate`]}
            name={`commin_rate`}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="col-2">
          <label class="form-label ">
            จำนวนเงิน<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="number"
            disabled
            step={0.1}
            value={(formData[`commin_rate`] * formData[`grossprem`]) / 100 || ""}
            name={`commin_amt`}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div class="col-2">
          <label class="form-label ">
            OV_in %<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="number"
            step={0.1}
            value={formData[`ovin_rate`]}
            name={`ovin_rate`}
            onChange={handleChange}
          />
        </div>

        <div class="col-2">
          <label class="form-label ">
            จำนวนเงิน<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="number"
            disabled
            step={0.1}
            name={`ovin_amt`}
            value={(formData[`ovin_rate`] * formData[`grossprem`]) / 100 || ""}
            onChange={handleChange}
          />
        </div>

      </div> */}

      <div class="row">
        <div className="col-1"></div>
        <div class="col-2">
          <label class="form-label ">
            comm_in% <span class="text-danger"> *</span>
          </label>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                step={0.1}
                value={formData[`commin_rate`]}
                name={`commin_rate`}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                disabled
                step={0.1}
                value={parseFloat((formData[`commin_rate`] * (100 - formData[`specdiscrate`]) * formData[`grossprem`] / 10000).toFixed(2)) || ""}
                name={`commin_amt`}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

        </div>


        <div class="col-2">
          <label class="form-label ">
            OV_in % <span class="text-danger"> *</span>
          </label>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                step={0.1}
                value={formData[`ovin_rate`]}
                name={`ovin_rate`}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                disabled
                step={0.1}
                name={`ovin_amt`}
                value={parseFloat((formData[`ovin_rate`] * (100 - formData[`specdiscrate`]) * formData[`grossprem`] / 10000).toFixed(2)) || ""}
                onChange={handleChange}
              />
            </div>
          </div>

        </div>

        <div class="col-2">
          <label class="form-label ">
            comm_out% (1)<span class="text-danger"> *</span>
          </label>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                step={0.1}
                value={formData[`commout1_rate`]}
                name={`commout1_rate`}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                disabled
                step={0.1}
                value={(formData[`commout1_rate`] * formData[`grossprem`]) / 100 || ""}
                name={`commout1_amt`}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>
        <div class="col-2">
          <label class="form-label ">
            OV_out % (1)<span class="text-danger"> *</span>
          </label>

          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                step={0.1}
                value={formData[`ovout1_rate`]}
                name={`ovout1_rate`}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                disabled
                step={0.1}
                name={`ovout1_amt`}
                //value={(formData[`ovout1_rate`] * formData[`grossprem`]) / 100 || ""}
                value={parseFloat((formData[`ovout1_rate`] * (100 - formData[`specdiscrate`]) * formData[`grossprem`] / 10000).toFixed(2)) || ""}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>
        {/* <div class="col-1 align-bottom">
        
          <button type="button" class="btn btn-primary align-bottom form-control" onClick={getcommov} >defualt comm/ov</button>
        </div> */}


      </div>
      {/* <div className="row">
        <div className="col-1"></div>
        <div class="col-2">
          <label class="form-label ">
            comm_out%<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="number"
            step={0.1}
            value={formData[`commout_rate`]}
            name={`commout_rate`}
            onChange={handleChange}
          />
        </div>

        <div class="col-2">
          <label class="form-label ">จำนวนเงิน</label>
          <input
            className="form-control"
            type="number"
            disabled
            step={0.1}
            value={(formData[`commout_rate`] * formData[`grossprem`]) / 100 || ""}
            name={`commout_amt`}
            onChange={handleChange}
          />
        </div>
        <div class="col-2">
          <label class="form-label ">
            OV_out %<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="number"
            step={0.1}
            value={formData[`ovout_rate`]}
            name={`ovout_rate`}
            onChange={handleChange}
          />
        </div>
        <div class="col-2">
          <label class="form-label ">จำนวนเงิน</label>
          <input
            className="form-control"
            type="number"
            disabled
            step={0.1}
            name={`ovout_amt`}
            value={(formData[`ovout_rate`] * formData[`grossprem`]) / 100 || ""}
            onChange={handleChange}
          />
        </div>

        <div class="col-2 align-bottom">

          <button type="button" class="btn btn-primary align-bottom" onClick={getcommov} >defualt comm/ov</button>
        </div>
      </div> */}

      <div class="row">
        <div className="col-1"></div>


        <div class="col-2">
          <label class="form-label ">
            comm_out% (2)<span class="text-danger"> *</span>
          </label>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                step={0.1}
                value={formData[`commout2_rate`]}
                name={`commout2_rate`}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                disabled
                step={0.1}
                value={parseFloat((formData[`commout2_rate`] * (100 - formData[`specdiscrate`]) * formData[`grossprem`] / 10000).toFixed(2)) || ""}
                //value={(formData[`commout2_rate`] * formData[`grossprem`]) / 100 || ""}
                name={`commout2_amt`}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>
        <div class="col-2">
          <label class="form-label ">
            OV_out % (2)<span class="text-danger"> *</span>
          </label>

          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                step={0.1}
                value={formData[`ovout2_rate`]}
                name={`ovout2_rate`}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                disabled
                step={0.1}
                name={`ovout2_amt`}
                //value={(formData[`ovout2_rate`] * formData[`grossprem`]) / 100 || ""}
                value={parseFloat((formData[`ovout2_rate`] * (100 - formData[`specdiscrate`]) * formData[`grossprem`] / 10000).toFixed(2)) || ""}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>
        <div class="col-2">
          <label class="form-label ">
            comm_out% (sum)
          </label>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                step={0.1}
                value={formData[`commout_rate`]}
                name={`commout_rate`}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                disabled
                step={0.1}
                //value={(formData[`commin2_rate`] * formData[`grossprem`]) / 100 || ""}
                value={parseFloat((formData[`commout_rate`] * (100 - formData[`specdiscrate`]) * formData[`grossprem`] / 10000).toFixed(2)) || ""}
                name={`commout_amt`}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

        </div>


        <div class="col-2">
          <label class="form-label ">
            OV_out % (sum)
          </label>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                step={0.1}
                value={formData[`ovout_rate`]}
                name={`ovout_rate`}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                disabled
                step={0.1}
                name={`ovout_amt`}
                //value={(formData[`ovin2_rate`] * formData[`grossprem`]) / 100 || ""}
                value={parseFloat((formData[`ovout_rate`] * (100 - formData[`specdiscrate`]) * formData[`grossprem`] / 10000).toFixed(2)) || ""}
                onChange={handleChange}
              />
            </div>
          </div>

        </div>
        {/* <div class="col-1 align-bottom">

          <button type="button" class="btn btn-primary align-bottom" onClick={getcommov} >defualt comm/ov</button>
        </div> */}


      </div>

      <div class="row">
        <div className="col-1"></div>
        <div className="col-2">

          <h4 class="form-label ">
            installment
          </h4>
        </div>
      </div>

      <div class="row">
        <div className="col-1"></div>
        <div className="col-1">

          <div class="form-check ">
            <input class="form-check-input" type="checkbox" name="installmentInsurer" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckChecked">
              insurer
            </label>
          </div>
        </div>

        <div class="col-1">
          <label class="form-label ">
            จำนวนงวด<span class="text-danger"> </span>
          </label>
        </div>
        <div class="col-1">

          <input
            className="form-control"
            type="number"
            defaultValue={formData.t_fn}
            name={`seqNoins`}
            onChange={handleChange}
          />
        </div>

        <div class="col-1">

          <label class="form-label ">
            เวลา/งวด
          </label>
        </div>
        <div class="col-1">
          <input
            className="form-control"
            type="number"
            defaultValue={formData.t_fn}
            name={`seqNoinstime`}
            onChange={handleChange}
          />
        </div>
        <div className="col-1">

          <select
            className="form-control"
            name={`seqNoinstype`}
            onChange={handleChange}
          >
            <option value={formData.seqNoinstype} disabled selected hidden>
              {formData.seqNoinstype}
            </option>
            <option value="D">วัน</option>
            <option value="M">เดือน</option>
          </select>
        </div>




        <div class="col-2">

          <div class="form-check ">
            <input class="form-check-input" type="checkbox" name="flagallowduty" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckChecked">
              allowcate duty
            </label>
          </div>

        </div>
        <div class="col-2 align-bottom">

          <button type="button" class="btn btn-primary align-bottom" onClick={calinstallment} >calculate installment</button>
        </div>

      </div>

      <div class="row">
        <div className="col-1"></div>
        <div className="col-1">

          <div class="form-check ">
            <input class="form-check-input" type="checkbox" name="installmentAdvisor" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckChecked">
              Advisor
            </label>
          </div>
        </div>

        <div class="col-1">
          <label class="form-label ">
            จำนวนงวด<span class="text-danger"> </span>
          </label>
        </div>
        <div class="col-1">

          <input
            className="form-control"
            type="number"
            defaultValue={formData.t_fn}
            name={`seqNoagt`}
            onChange={handleChange}
          />
        </div>

        <div class="col-1">

          <label class="form-label ">
            เวลา/งวด
          </label>
        </div>
        <div class="col-1">
          <input
            className="form-control"
            type="number"
            defaultValue={formData.t_fn}
            name={`seqNoagttime`}
            onChange={handleChange}
          />
        </div>
        <div className="col-1">

          <select
            className="form-control"
            name={`seqNoagttype`}
            onChange={handleChange}
          >
            <option value={formData.seqNoagttype} disabled selected hidden>
              {formData.seqNoagttype}
            </option>
            <option value="D">วัน</option>
            <option value="M">เดือน</option>
          </select>
        </div>
        <div className="col-2"></div>







      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col-1">instype</th>
            <th scope="col-1">seqNo</th>
            <th scope="col-2">dueDate</th>
            <th scope="col-2">netgrossprem</th>
            <th scope="col-1">duty</th>
            <th scope="col-1">tax</th>
            <th scope="col-1">commin</th>
            <th scope="col-1">ovin</th>
            <th scope="col-1">commout</th>
            <th scope="col-1">ovout</th>
          </tr>
        </thead>
        <tbody>
          {installment.insurer.map((ele, i) => {
            return (<tr>
              <th scope="row">insurer</th>
              <td scope="col-1">{i + 1}</td>
              <td scope="col-2"><input type="date" className="w-100" name={`dueDate-${i}`} defaultValue={ele.dueDate}></input></td>
              <td scope="col-2"><input type="number" className="w-100" name={`netgrossprem-${i}`} step={.01} defaultValue={ele.netgrossprem}></input></td>
              {/* <td scope="col-1"><input type="number" className="w-100" name={`duty-${i}`} step={.01} defaultValue={ele.duty}></input></td>
              <td scope="col-1"><input type="number" className="w-100" name={`tax-${i}`} step={.01} defaultValue={ele.tax}></input></td>
              <td scope="col-1"><input type="number" className="w-100" name={`commin_amt-${i}`} step={.01} defaultValue={ele.commin_amt}></input></td>
              <td scope="col-1"><input type="number" className="w-100" name={`ovin_amt-${i}`} step={.01} defaultValue={ele.ovin_amt}></input></td> */}
              <td scope="col-1">{ele.duty}</td>
              <td scope="col-1">{ele.tax}</td>
              <td scope="col-1">{ele.commin_amt}</td>
              <td scope="col-1">{ele.ovin_amt}</td>
              <td scope="col-1"></td>
              <td scope="col-1"></td>
              <td scope="col-1"><button onClick={e=>editInstallment(e,'insurer', i)}>Edit</button></td>
            </tr>)
          })}
          {installment.advisor.map((ele, i) => {
            return (<tr>
              <th scope="row">advisor</th>
              <td>{i + 1}</td>
              <td scope="col-2"><input type="date" name={`dueDate-${i}`} defaultValue={ele.dueDate}></input></td>
              <td scope="col-2"><input type="number" name={`netgrossprem-${i}`} step={.01} defaultValue={ele.netgrossprem}></input></td>
              {/* <td scope="col-1"><input type="number" name={`duty-${i}`} step={.01} defaultValue={ele.duty}></input></td>
              <td scope="col-1"><input type="number" name={`tax-${i}`} step={.01} defaultValue={ele.tax}></input></td>
              <td scope="col-1"><input type="number" name={`commin_amt-${i}`} step={.01} defaultValue={ele.commin_amt}></input></td>
              <td scope="col-1"><input type="number" name={`ovin_amt-${i}`} step={.01} defaultValue={ele.ovin_amt}></input></td>
              <td scope="col-1"><input type="number" name={`commout1_amt-${i}`} step={.01} defaultValue={ele.commout1_amt}></input></td>
              <td scope="col-1"><input type="number" name={`ovout1_amt-${i}`} step={.01} defaultValue={ele.ovout1_amt}></input></td> */}
              <td scope="col-1">{ele.duty}</td>
              <td scope="col-1">{ele.tax}</td>
              <td scope="col-1">{ele.commin_amt}</td>
              <td scope="col-1">{ele.ovin_amt}</td>
              <td scope="col-1">{ele.commout1_amt}</td>
              <td scope="col-1">{ele.ovout1_amt}</td>
              <td scope="col-1"><button onClick={e=>editInstallment(e,'advisor', i)}>Edit</button></td>
            </tr>)
          })}
          {installment.insurer.length > 0 ?
            <tr>
              <th scope="row">Summary Insurer</th>
              <td></td>
              <td></td>
              <td scope="col-1">{ installment.insurer.reduce((prev, curr) => prev + parseFloat(curr.netgrossprem.toFixed(2)), 0)}</td>
              <td scope="col-1">{installment.insurer.reduce((prev, curr) => prev + parseFloat(curr.duty.toFixed(2)), 0)}</td>
              <td scope="col-1">{installment.insurer.reduce((prev, curr) => prev + parseFloat(curr.tax.toFixed(2)), 0)}</td>
              <td scope="col-1">{installment.insurer.reduce((prev, curr) => prev + parseFloat(curr.commin_amt.toFixed(2)), 0)}</td>
              <td scope="col-1">{installment.insurer.reduce((prev, curr) => prev + parseFloat(curr.ovin_amt.toFixed(2)), 0)}</td>
              <td></td>
              <td></td>
            </tr>
            : null}

          {installment.advisor.length > 0 ?
            <tr>
              <th scope="row">Summary Advisor</th>
              <td></td>
              <td></td>
              <td scope="col-1">{installment.advisor.reduce((prev, curr) => prev + parseFloat(curr.netgrossprem.toFixed(2)), 0)}</td>
              <td scope="col-1">{installment.advisor.reduce((prev, curr) => prev + parseFloat(curr.duty.toFixed(2)), 0)}</td>
              <td scope="col-1">{installment.advisor.reduce((prev, curr) => prev + parseFloat(curr.tax.toFixed(2)), 0)}</td>
              <td scope="col-1">{installment.advisor.reduce((prev, curr) => prev + parseFloat(curr.commin_amt.toFixed(2)), 0)}</td>
              <td scope="col-1">{installment.advisor.reduce((prev, curr) => prev + parseFloat(curr.ovin_amt.toFixed(2)), 0)}</td>
              <td scope="col-1">{installment.advisor.reduce((prev, curr) => prev + parseFloat(curr.commout1_amt.toFixed(2)), 0)}</td>
              <td scope="col-1">{installment.advisor.reduce((prev, curr) => prev + parseFloat(curr.ovout1_amt.toFixed(2)), 0)}</td>
            </tr>
            : null}


          <tr>
            <th scope="row">This Policy</th>
            <td></td>
            <td></td>
            <td>{formData.netgrossprem}</td>
            <td>{formData.duty}</td>
            <td>{formData.tax}</td>
            <td>{formData.commin_amt}</td>
            <td>{formData.ovin_amt}</td>
            <td></td>
            <td></td>
          </tr>

        </tbody>
      </table>
      {/* entity table */}
      {/* <div class="row">
        <div className="col-1"></div>
        <div class="col-1">
          <label class="form-label ">
            type<span class="text-danger"> *</span>
          </label>
          <select
            className="form-control"
            name={`personType`}
            onChange={handleChange}
          >
            <option value={formData.personType} disabled selected hidden>
              {formData.personType}
            </option>
            <option value="P">บุคคล</option>
            <option value="C">นิติบุคคล</option>
          </select>
        </div>

        <div class="col-1">
          <label class="form-label ">
            คำนำหน้า<span class="text-danger"> </span>
          </label>
          <select
            className="form-control"
            name={`title`}
            onChange={handleChange}
          >
            <option value={formData.title} disabled selected hidden>
              {formData.title}
            </option>
            {titleDD}
          </select>
        </div>

        <div class="col-2">
          <label class="form-label ">
            ชื่อ<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            defaultValue={formData.t_fn}
            name={`t_fn`}
            onChange={handleChange}
          />
        </div>
        {formData.personType === "P" ? (
          <div class="col-2">
            <label class="form-label ">
              นามสกุล<span class="text-danger"> *</span>
            </label>
            <input
              className="form-control"
              type="text"
              defaultValue={formData.t_ln}
              name={`t_ln`}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div class="col-2">
            <label class="form-label ">
              นามสกุล<span class="text-danger"></span>
            </label>
            <input
              className="form-control"
              type="text"
              readOnly
              defaultValue={formData.t_ln}
              name={`t_ln`}
              onChange={handleChange}
            />
          </div>
        )}

        <div class="col-2">
          <label class="form-label ">
            เลขประจำตัว<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            defaultValue={formData.regisNo}
            name={`regisNo`}
            onChange={handleChange}
          />
        </div>
      </div>
      // location table 
      <div class="row">
        <div className="col-1"></div>
        <div class="col-2">
          <label class="form-label ">
            บ้านเลขที่<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            name={`t_location_1`}
            defaultValue={formData.t_location_1}
            onChange={handleChange}
          />
        </div>
        <div class="col-2">
          <label class="form-label ">
            หมู่บ้าน/อาคาร<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            name={`t_location_2`}
            defaultValue={formData.t_location_2}
            onChange={handleChange}
          />
        </div>
        <div class="col-2">
          <label class="form-label ">
            หมู่<span class="text-danger"> *</span>
          </label>
          <input
            type="text"
            className="form-control"
            name={`t_location_3`}
            defaultValue={formData.t_location_3}
            onChange={handleChange}
          />
        </div>
        <div class="col-2">
          <label class="form-label ">
            ซอย<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            name={`t_location_4`}
            defaultValue={formData.t_location_4}
            onChange={handleChange}
          />
        </div>
        <div class="col-2">
          <label class="form-label ">
            ถนน<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            name={`t_location_5`}
            defaultValue={formData.t_location_5}
            onChange={handleChange}
          />
        </div>
      </div>
      <div class="row">
        <div className="col-1"></div>
        <div class="col-2">
          <label class="form-label ">
            จังหวัด<span class="text-danger"> *</span>
          </label>
          <select
            className="form-control"
            name={`province`}
            onChange={handleChange}
          >
            <option value={formData.province} disabled selected hidden>
              {formData.province}
            </option>
            {provinceDD}
          </select>
        </div>
        <div class="col-2">
          <label class="form-label ">
            อำเภอ<span class="text-danger"> *</span>
          </label>
          <select
            className="form-control"
            name={`district`}
            onChange={handleChange}
          >
            <option value={formData.district} disabled selected hidden>
              {formData.district}
            </option>
            {districDD}
          </select>
        </div>
        <div class="col-2">
          <label class="form-label ">
            ตำบล<span class="text-danger"> *</span>
          </label>
          <select
            className="form-control"
            name={`subdistrict`}
            onChange={handleChange}
          >
            <option value={formData.subdistrict} disabled selected hidden>
              {formData.subdistrict}
            </option>
            {subDistricDD}
          </select>
        </div>
        <div class="col-2">
          <label class="form-label ">
            รหัสไปรษณี<span class="text-danger"> *</span>
          </label>
          <select
            className="form-control"
            name={`zipcode`}
            onChange={handleChange}
          >
            <option value={formData.zipcode} disabled selected hidden>
              {formData.zipcode}
            </option>
            {zipcodeDD}
          </select>
        </div>
      </div>
      // motor table 
      {formData.class === "Motor" ? (
        <>
          <div class="row">
            <div className="col-1"></div>
            <div class="col-2">
              <label class="form-label ">
                เลขทะเบียนรถ<span class="text-danger"> *</span>
              </label>
              <input
                className="form-control"
                type="text"
                name={`licenseNo`}
                defaultValue={formData.licenseNo}
                onChange={handleChange}
              />
            </div>
            <div class="col-2">
              <label class="form-label ">
                ยี่ห้อรถยนต์<span class="text-danger"> *</span>
              </label>

              <select
                className="form-control"
                name={`brandname`}
                onChange={handleChange}
              >
                <option value={formData.brandname} selected disabled hidden>
                  {formData.brandname}
                </option>
                {motorbrandDD}
              </select>
            </div>
            <div class="col-2">
              <label class="form-label ">
                รุ่น<span class="text-danger"> *</span>
              </label>
              <select
                className="form-control"
                name={`modelname`}
                onChange={handleChange}
              >
                <option value={formData.modelname} selected disabled hidden>
                  {formData.modelname}
                </option>
                {motormodelDD}
              </select>

            </div>
            <div class="col-2">
              <label class="form-label ">
                เลขตัวถังรถ<span class="text-danger"> *</span>
              </label>
              <input
                className="form-control"
                type="text"
                name={`chassisNo`}
                defaultValue={formData.chassisNo}
                onChange={handleChange}
              />
            </div>
            <div class="col-2">
              <label class="form-label ">
                ปีที่จดทะเบียน<span class="text-danger"> *</span>
              </label>
              <input
                className="form-control"
                type="text"
                name={`modelYear`}
                defaultValue={formData.modelYear}
                onChange={handleChange}
              />
            </div>
          </div>
        </>
      ) : null}
      <div class="row">
        <div className="col-1"></div>
        <div class="col-2">
          <label class="form-label ">
            เบอร์โทรศัพท์<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            defaultValue={formData.telNum_1}
            name={`telNum_1`}
            onChange={handleChange}
          />
        </div>
        <div class="col-2">
          <label class="form-label ">
            Email<span class="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            defaultValue={formData.Email}
            name={`Email`}
            onChange={handleChange}
          />
        </div>
      </div> */}
      <div class="d-flex justify-content-center">

        <button className="p-2 btn btn-primary" name="saveChange" onClick={e => props.setFormData(e, props.index, { ...formData, installment: installment })}>
          Save Changes
        </button>
        <button className="p-2 btn btn-secondary " name="closed" onClick={e => props.setFormData(e)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PolicyCard;
