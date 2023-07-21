import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { redirect, useNavigate } from "react-router-dom";

import {
  NavBar,
  NavLogo,
  NavMenu,
  NavList,
  NavLink,
  Bars,
  ImgLogo,
} from "../StylesPages/NavBarStyles";

function NavStatic() {
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

          
          <NavMenu showToggle={showToggle}>
            {/* {decoded.is_admin ? admin : null} */}
            <NavList>
              <NavLink to="/static/insurer">insurer</NavLink>
            </NavList>
            <NavList>
              <NavLink to="/static/insuree">insuree</NavLink>     
            </NavList>
            <NavList>
            <NavLink to="/static/insureType">insureType</NavLink>
          </NavList>
          <NavList>
            <NavLink to="/static/agent">agent</NavLink>
          </NavList>
          <NavList>
            <NavLink to="/static/motor">motor</NavLink>
          </NavList>
          <NavList>
            <NavLink to="/static/location">location</NavLink>
          </NavList>
          <NavList>
            <NavLink to="/static/policy">policy</NavLink>
          </NavList>
            <NavList>
              <NavLink to="/" onClick={handleLogOut}>
                Log Out
              </NavLink>
            </NavList>
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

export default NavStatic;
