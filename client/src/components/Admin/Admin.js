import UserDetails from "./UserDetail";
import CarsDetails from "./CarsDetails";
import { useState } from "react";
import PackagesDetails from "./PackagesDetails";
import jwt_decode from "jwt-decode";
import "./Admin.css";

const Admin = () => {
  const [page, setPage] = useState(<UserDetails />);
  const [btn, setBtn] = useState("UserDetails");
  const handlePage = (p) => {
    setPage(p);
  };

  if (localStorage.getItem("jwt") !== null) {
    const decoded = jwt_decode(localStorage.getItem("jwt"));
    if (decoded.is_admin) {
      const header = (
        <header>
          <h1>Admin {decoded.username}</h1>
          <button
            className={
              btn === "UserDetails" ? "dashboardBtn active" : "dashboardBtn"
            }
            onClick={() => {
              handlePage(<UserDetails />);
              setBtn("UserDetails");
            }}
          >
            Users Detail
          </button>
          <button
            className={
              btn === "CarsDetails" ? "dashboardBtn active" : "dashboardBtn"
            }
            onClick={() => {
              handlePage(<CarsDetails />);
              setBtn("CarsDetails");
            }}
          >
            Cars Detail
          </button>
          <button
            className={
              btn === "PackagesDetails" ? "dashboardBtn active" : "dashboardBtn"
            }
            onClick={() => {
              handlePage(<PackagesDetails />);
              setBtn("PackagesDetails");
            }}
          >
            Packages Detail
          </button>
        </header>
      );
      return (
        <div>
          {header}
          <main>{page}</main>
        </div>
      );
    }
    return (
      <div>
        <h1>You're not admin.</h1>
      </div>
    );
  } else {
    return <h1>Unauthorized</h1>;
  }
};

export default Admin;
