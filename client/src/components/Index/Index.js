import React, { Component, useState, useEffect } from "react";
import axios from "axios";
// import { Route, Routes, Link, Navigate } from "react-router-dom";
import CardPackage from "./CardPackage/CardPackage.js";
import { Flexarea } from "../StylesPages/CardPackageStyles";
import { Container } from "../StylesPages/PagesLayout";
import { Carousel } from "react-responsive-carousel";
import { BtnFilter, BtnSelect } from "../StylesPages/LoginStyles.js";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css"; // Npm pack for Carousel slide

import "./index.css";


const config = require("../../config.json");

/* eslint-disable react-hooks/exhaustive-deps */
const Index = (props) => {
  const [packages, setPackages] = useState([]);
  const [filterPack, setFilterPack] = useState([])
  const url = window.globalConfig.BEST_POLICY_V1_BASE_URL;
  // useEffect(() => {
  //   axios.get(url + "/packages").then((res) => {
  //     let pack = res.data.map((item) => {
  //       return <CardPackage key={[item.id,item.level]} detail={item} />;
  //     });
  //     setPackages(pack);
  //     setFilterPack(pack)
  //   });
  // }, []);

  const handleClick =(e) =>{
    e.preventDefault();
    if(e.target.filter.value === 'All'){
      setFilterPack(packages)
    }else{
      const tier = e.target.filter.value
      const filterList = []
      packages.forEach(item =>{
        if(item.key[item.key.length -1] == tier){
          filterList.push(item)
        }
      })
      setFilterPack(filterList) 
       }
  }


  return (
    <Container>
      <h1>Car Insurance Packages</h1>
      <form onSubmit={handleClick} >
      <BtnSelect name="filter">
        <option id="Option" value={null}>All</option>
        <option id="Option" value={1}>First Class</option>
        <option id="Option" value={2}>Second Class</option>
        <option id="Option" value={3}>Third Class</option>
      </BtnSelect>
      <BtnFilter className="btnHover" type="submit">Choose</BtnFilter>
      </form>
      <Flexarea>{filterPack}</Flexarea>

      <h2 className="head-of-slider">Not sure which one to choose ?</h2>
      <Carousel
        className="slider"
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
      >
        <div>
          <h3 className="firstclass">
            <span>First</span> class Insurance
          </h3>
          <p>Things you should consider ?</p>
          <ul>
            <li>
              In case you just bought your car and you want to protect it as
              much as possible.
            </li>
            <li>
              If you are just learn to drive and not sure if accident will
              present or not.
            </li>
            <li>If you like Fast & Furious movie . . .</li>
            <li>If you are travel a lot.</li>
          </ul>
        </div>
        <div>
          <h3 className="secondclass">
            <span>Second</span> class Insurance
          </h3>
          <p>Things you should consider ?</p>
          <ul>
            <li>You did't drive frequently.</li>
            <li>
              If your basement is kinda unsecure and unexpected thing can happen
              anytime.
            </li>
            <li>If your vehicle is over 7 years.</li>
            <li>If you are travel a lot.</li>
          </ul>
        </div>
        <div>
          <h3 className="thirdclass">
            <span>Third</span> class Insurance
          </h3>
          <p>Things you should consider ?</p>
          <ul>
            <li>
              If you did not like Fast & Furious that much and did't drive that
              frequently.
            </li>
            <li>If your vehicle is over 7 years</li>
          </ul>
        </div>
      </Carousel>
    </Container>
  );
};

export default Index;
