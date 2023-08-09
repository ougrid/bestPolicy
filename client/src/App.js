import "./App.css";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import "./App.css";

import Nav from "./components/NavBar/Nav";
import Index from "./components/Index/Index";
import Login from "./components/Login/Login";
import React from "react";
import Admin from "./components/Admin/Admin";
import SignUp from "./components/SignUp/SignUp";
import Packages from "./components/Packages/Packages";
import PolicyExcel from "./components/Policy/PolicyExcel";
import Footer from "./components/Footer/Footer";
import Static from "./components/Static/Static";
import Payment from "./components/Static/Payment";
import Insurer from "./components/Static/Insurer";
import InsureType from "./components/Static/insureType";
import Agent from "./components/Static/Agent";
import FindPolicy from "./components/Policy/FindPolicy";
import FindBillAdvisor from "./components/ฺBillAdvisor/FindBillAdvisor";
function App() {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/insurer" element={<Insurer />} />
          <Route path="/insuretype" element={<InsureType />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/findpolicy" element={<FindPolicy />} />
          <Route path="/static" element={<Static />} />
          <Route path="/static/:name" element={<Static />} />
          <Route path="/packages/:id" element={<Packages />} />
          <Route path="/policyexcel" element={<PolicyExcel />} />
          <Route path="bill/findbill" element={<FindBillAdvisor />} />
        </Routes>
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
}

export default App;
