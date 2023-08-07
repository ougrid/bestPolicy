// import UserDetails from "./UserDetail";
// import CarsDetails from "./CarsDetails";
import { useState,useEffect } from "react";
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


const Static = () => {
    const { name } = useParams();
  const [page, setPage] = useState(<></>);
//   const [btn, setBtn] = useState("UserDetails");
//   const handlePage = (p) => {
//     setPage(p);
//   };
    useEffect(() => {
        
        // Update the document title using the browser API
        if (name === 'insurer') {
            setPage(<Insurer />)
        }else if (name === 'insuree'){
            setPage(<Insuree />)
        }else if (name === 'insureType'){
            setPage(<InsureType />)
        }else if (name === 'agent'){
            setPage(<Agent />)
        }else if (name === 'commOv'){
            setPage(<CommOv />)
        }else if (name === 'policy'){
          setPage(<Policy />)
      }else if (name === 'report'){
          setPage(<ExportFile />)
      }else if (name === 'payment'){
        setPage(<Payment />)
    }
    },[name]);
  if (localStorage.getItem("jwt") !== null) {
    const decoded = jwt_decode(localStorage.getItem("jwt"));
    
    return (
      <div>
        <div>
          <NavStatic/>
          <>{page}</>
          {/* {main} */}
        </div>
      </div>
    );
  } else {
    return <h1>Unauthorized</h1>;
  }
};

export default Static;
