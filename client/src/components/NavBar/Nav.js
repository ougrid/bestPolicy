import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, redirect, useNavigate } from "react-router-dom";

import {
  NavBar,
  NavLogo,
  NavMenu,
  NavList,
  NavLink,
  Bars,
  ImgLogo,
} from "../StylesPages/NavBarStyles";

function Nav() {
  const navigate = useNavigate();
  const [showToggle, setShowToggle] = useState(false);
  const handleLogOut = (e) => {
    localStorage.removeItem("jwt");
  };

  const admin = (
    <NavList>
      <NavLink to="/admin">Admin</NavLink>
    </NavList>
  );

  
  if (localStorage.getItem("jwt") !== null) {
    // const decoded = jwt_decode(localStorage.getItem("jwt"));
    return (
      // Use React Fragment
      <>
        {/* Use components from NavBar-Style */}
        <NavBar showToggle={showToggle}>
          <Bars onClick={() => setShowToggle(!showToggle)} />

          <NavLogo to="/">
            <ImgLogo 
              style={{ height: "70px" }}
              src="/amitylogo.png"
            />
          </NavLogo>
        
          <NavMenu showToggle={showToggle}>
            {/* {decoded.is_admin ? admin : null} */}
            <div class="dropdown">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              กรมธรรม์
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item"  href="/findpolicy">ค้นหากรมธรรม์</a></li>
              <li><a class="dropdown-item"  href="/policyexcel">สร้างรายการใหม่ (excel)</a></li>
              <li><a class="dropdown-item"  href="/policyscreen">สร้างรายการใหม่ (screen)</a></li>
              <li><a class="dropdown-item"  href="/policyreconcile">Reconcile</a></li>
            </ul>
          </div>
          
          <div class="dropdown">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Bill Advisor
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" href="/bill/findbill">ค้นหารายการ</a></li>
              <li><a class="dropdown-item" href="/bill/createbill">สร้างรายการใหม่</a></li>
              {/* <li><a class="dropdown-item" href="/policyexcel">แก้ไขรายการ</a></li> */}
            </ul>
          </div>
          <div class="dropdown">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Cashier Receive
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" href="/cashier/findcashier">ค้นหารายการ</a></li>
              <li><a class="dropdown-item" href="/cashier/createcashier/premin">สร้างรายการรับเงิน Premin</a></li>
              <li><a class="dropdown-item" href="/cashier/createcashier/commin">สร้างรายการรับเงิน Commin</a></li>
              <li><a class="dropdown-item" href="/cashier/editcashier">แก้ไขรายการ</a></li>
            </ul>
          </div>
          <div class="dropdown">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              AR PREM-IN
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" href="/premin/find">ค้นหารายการ</a></li>
              <li><a class="dropdown-item" href="/premin/create">สร้างรายการใหม่</a></li>
              <li><a class="dropdown-item" href="/premin/createdirect">สร้างรายการใหม่ (จ่ายแบบ direct)</a></li>
              <li><a class="dropdown-item" href="/premin/paid/premout">ค้นหารายการ prem-out</a></li>
              <li><a class="dropdown-item" href="/premin/paid/commovout">ค้นหารายการ comm/ov-out</a></li>
              <li><a class="dropdown-item" href="/premin/paid/wht3">ค้นหารายการ WHT 3%</a></li>
            </ul>
          </div>
          <div class="dropdown">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              AP Prem-out
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" href="/premout/create">stament ค่าเบี้ยส่งทิพ</a></li>
            </ul>
          </div>
          <div class="dropdown">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              AR Comm-in
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" href="/commin/create">สร้างรายการใหม่</a></li>
            </ul>
          </div>

          <div class="dropdown">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              AP Comm-out
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" href="/commout/create">สร้างรายการใหม่</a></li>
            </ul>
          </div>
          <div class="dropdown">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              รายงาน
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" href="/reports/policy">รายงานบันทึกกรมธรรม์ประจำวัน </a></li>
              <li><a class="dropdown-item" href="/reports/endorse">รายงานบันทึกสลักหลัง </a></li>
              <li><a class="dropdown-item" href="/reports/invoice">รายงานบันทึกใบแจ้งหนี้ </a></li>
              <li><a class="dropdown-item" href="/reports/billadvisor">รายงานใบวางบิล </a></li>
              <li><a class="dropdown-item" href="/reports/cashier">รายงานรับเงิน </a></li>
              <li><a class="dropdown-item" href="/reports/arapadvisor">รายงานตัดหนี้/ตัดจ่าย ตัวแทน  </a></li>
              <li><a class="dropdown-item" href="/reports/arapdirect">รายงานลูกค้าจ่ายเงินที่ประกัน  </a></li>
              <li><a class="dropdown-item" href="/reports/arapinsurer">รายงานตัดหนี้/ตัดจ่าย ประกัน  </a></li>
              <li><a class="dropdown-item" href="/reports/tax">รายงานภาษี  </a></li>
              {/* <li><a class="dropdown-item" href="/insureType">สร้างแผนประกัน</a></li>
              <li><a class="dropdown-item" href="/agent">สร้างผู้แนะนำ</a></li>
              <li><a className="dropdown-item" href="/bank">สร้างธนาคาร</a></li> */}
            </ul>
          </div>
          <div class="dropdown">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              ข้อมูลทั่วไป
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" href="/insurer">สร้างบริษัทรับประกัน</a></li>
              <li><a class="dropdown-item" href="/insureType">สร้างแผนประกัน</a></li>
              <li><a class="dropdown-item" href="/agent">สร้างผู้แนะนำ</a></li>
              <li><a className="dropdown-item" href="/bank">สร้างธนาคาร</a></li>
            </ul>
          </div>
            {/* <NavList>
              <NavLink to="/static">Static-data</NavLink>  
              </NavList> */}

            
              <a class="btn btn-danger " href="/payment" role="button">
              ARAP
            </a>
            
            <a class="btn btn-secondary " href="/" role="button" onClick={handleLogOut}>
              logout
            </a>
              
             
          
            
          </NavMenu>
        </NavBar>
      </>
    );
  }
  return (
    <>
      {/* Use components from NavBar-Style */}
      <NavBar showToggle={showToggle}>
        <Bars onClick={() => setShowToggle(!showToggle)} />
        <NavLogo to="/">
          <img
            style={{ height: "70px" }}
            src="amitylogo.png"
          />
        </NavLogo>
        <NavMenu showToggle={showToggle}>
          {/* <NavList>
            <NavLink to="/">Packages</NavLink>
          </NavList> */}
          <NavList>
            <NavLink to="/signup">Sign Up</NavLink>
          </NavList>
          <NavList>
            <NavLink to="/login">Login</NavLink>
          </NavList>
        </NavMenu>
      </NavBar>
    </>
  );
}

export default Nav;
