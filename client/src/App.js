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
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Static from "./components/Static/Static";
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
          <Route path="/static" element={<Static />} />
          <Route path="/static/:name" element={<Static />} />
          <Route path="/packages/:id" element={<Packages />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
}

export default App;
