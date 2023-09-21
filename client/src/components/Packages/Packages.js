import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container } from "../StylesPages/PagesLayout";
import {
  BoxCard,
  GridArea,
  GridBox,
  ImgPackage,
  H1,
  H2,
  BuyBtn,
  CarList,
  TxtLorem,
} from "../StylesPages/PackagesStyles";

import { DescriptTxt } from "../StylesPages/CardPackageStyles";
import "./Package.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
const config = require("../../config.json");

function Packages() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [cars, setCars] = useState([]);
  const [qr, setQr] = useState("");
  const { id } = useParams();
  const url = window.globalConfig.BEST_POLICY_V1_BASE_URL;
  let cost = new Intl.NumberFormat().format(packages.cost);
  async function getPackages() {
    axios
      .get(url + "/packages/" + id)
      .then((res) => {
        setPackages(res.data);
      })

      .catch((err) => {});
  }
  const myCarList = (userId) => {
    axios
      .get(url + "/cars/mycar/" + userId)
      .then((res) => {
        setCars(res.data);
      })

      .catch((err) => {});
  };
  useEffect(() => {
    getPackages();
    if (localStorage.getItem("jwt") !== null) {
      const decoded = jwt_decode(localStorage.getItem("jwt"));
      myCarList(decoded.id);
    }
  }, []);

  const handleBuy = (e) => {
    e.preventDefault();
    axios
      .put(url + "/cars/" + e.target.cars.value, {
        insurance_id: id,
      })
      .then((res) => {
        // alert("Buy completed");
        // navigate("/");
        axios
          .post(url + "/qrgen/generate", {
            amount: parseFloat(packages.cost),
          })
          .then((res) => {
            setQr(res.data.Result);
          })
          .catch((err) => {});
      })

      .catch((err) => {
        alert("Not sure which one to choose ?");
      });
  };

  const carlist = cars
    .filter((item) => {
      return packages.type.includes(item.type);
    })
    .map((item) => {
      return (
        <option value={`${item.id}`}>
          id : {item.plate_number} brand : {item.brand} type: {item.type}
        </option>
      );
    });
  const buyForm = (
    <form onSubmit={handleBuy}>
      Choose a car:
      <CarList name="cars" id="cars">
        {carlist}
      </CarList>
      <BuyBtn className="buyBtn" type="submit" value="BUY" />
    </form>
  );
  return (
    <Container>
      <BoxCard>
        <ImgPackage src={packages.picture} />
        <H1>{packages.name}</H1>
        <H2>{cost} Baht / Year</H2>
        <GridArea>
          <GridBox>
            <b>for </b>
            {packages.type === undefined ? null : packages.type.join(",")}
            <DescriptTxt>{packages.descript}</DescriptTxt>
            {localStorage.getItem("jwt") === null ? (
              <h3>Login to buy</h3>
            ) : (
              buyForm
            )}
          </GridBox>
          <GridBox>
            <TxtLorem>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac
              tincidunt purus. Aliquam iaculis maximus nunc, vitae blandit
              sapien tristique quis. In tristique euismod augue, et accumsan
              diam hendrerit sed. In pulvinar cursus sem quis rhoncus.{" "}
            </TxtLorem>
            <TxtLorem>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac
              tincidunt purus. Aliquam iaculis maximus nunc, vitae blandit
              sapien tristique quis.
            </TxtLorem>
          </GridBox>
        </GridArea>
        <div id="modal" style={{ display: qr !== "" ? "block" : "none" }}>
          <img id="logo-qr" src="https://pp.js.org/img/PromptPay-logo.jpg" />
          <H2> Prompt Pay accout : 081-5623390</H2>
          <img id="imgqr" src={qr} />
          <H2>name accout : TDA insurance</H2>
          <H2>amount : {cost} Baht</H2>
          <br></br>
          <button onClick={() => navigate("/")}>Done</button>
        </div>
      </BoxCard>
    </Container>
  );
}

export default Packages;
