import React, { useState } from "react";
// import axios from "axios"
import { Link } from "react-router-dom";
import "./CardPackage.css";
import {
  StyledBox,
  CardHeader,
  StyledImage,
  DescriptTxt
} from "../../StylesPages/CardPackageStyles";
import { H2UpperCase, H3 } from "../../StylesPages/PackagesStyles"

const CardPackage = (props) => {
  let cost = new Intl.NumberFormat().format(props.detail.cost);
  return (
    <StyledBox>
      <CardHeader>
        <StyledImage src={props.detail.picture} />
      </CardHeader>

      <Link to={`/packages/${props.detail.id}`}>
        <H2UpperCase>{props.detail.name}</H2UpperCase>
        <H3>{cost} Baht / Year</H3>
        <DescriptTxt>{props.detail.descript}</DescriptTxt>
      </Link>
    </StyledBox>
  );
};

export default CardPackage;
