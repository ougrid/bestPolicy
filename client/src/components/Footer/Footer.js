import React from "react";
import { FooterBody, FooterGrid, FooterGridBox, FooterTxt, FooterTopic } from "../StylesPages/FooterStyles";
import "./Footer.css";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <FooterBody className="footer">
      <FooterGrid>
        <FooterGridBox>
            <img to="/"
            style={{ height: "50px" }}
            src="https://drive.google.com/uc?id=1C_LXEXZfAW3s7UwHXST5GZu8iEJX0zAf&authuser=0"
            />
            <FooterTopic>ABOUT US</FooterTopic>
            <FooterTxt>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam purus, semper ac auctor porttitor, rhoncus at mi. Donec nec dui nisl. Donec id orci elementum, ultricies enim et, facilisis libero. Maecenas at gravida ante, sit amet sollicitudin leo. Ut non venenatis augue. 
            </FooterTxt>
            <FooterTxt>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </FooterTxt>
        </FooterGridBox>
        <FooterGridBox>
            <FooterTopic>Packages</FooterTopic>
            <FooterTxt>
                <li>Phasellus ullamcorp mattis.</li>
                <li>Sed egestas sit amet tellus.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Quisque di purus, semper.</li>
            </FooterTxt>
            <FooterTopic>Products</FooterTopic>
            <FooterTxt>
                <li>Phasellus ullamcorp mattis.</li>
                <li>Sed egestas sit amet tellus.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Quisque di purus, semper.</li>
                <li>Phasellus ullamcorp mattis.</li>
                <li>Sed egestas sit amet tellus.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Quisque di purus, semper.</li>
                <li>Phasellus ullamcorp mattis.</li>
                <li>Sed egestas sit amet tellus.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Quisque di purus, semper.</li>
            </FooterTxt>
        </FooterGridBox>
        <FooterGridBox>
            <FooterTopic>Promotions</FooterTopic>
            <FooterTxt>
                <li>Phasellus ullamcorp mattis.</li>
                <li>Sed egestas sit amet tellus.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Quisque di purus, semper.</li>
                <li>Phasellus ullamcorp mattis.</li>
                <li>Sed egestas sit amet tellus.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Quisque di purus, semper.</li>
            </FooterTxt>
            <FooterTopic>Services</FooterTopic>
            <FooterTxt>
                <li>Phasellus ullamcorp mattis.</li>
                <li>Sed egestas sit amet tellus.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Quisque di purus, semper.</li>
                <li>Phasellus ullamcorp mattis.</li>
                <li>Sed egestas sit amet tellus.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Quisque di purus, semper.</li>
            </FooterTxt>
        </FooterGridBox>
        <FooterGridBox>
            <FooterTopic> Location <MdLocationOn style={{fontSize: "20px", color: "#e1251b"}}/> </FooterTopic>
            <FooterTxt>Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.</FooterTxt> <br/><br/>
            <FooterTopic>Contact Us</FooterTopic>
            <FooterTxt><BsFillTelephoneFill style={{fontSize: "10px", color: "#e1251b"}}/> 02-1234567</FooterTxt>
            <FooterTxt><BsFillTelephoneFill style={{fontSize: "10px", color: "#e1251b"}}/> 082-9999999</FooterTxt>
            <FooterTxt><FaFacebookSquare style={{fontSize: "12px", color: "#e1251b"}}/> TDA InSure</FooterTxt>
            <FooterTxt><FaInstagramSquare style={{fontSize: "12px", color: "#e1251b"}}/> TDA InSure</FooterTxt>
            <FooterTxt><FaTwitterSquare style={{fontSize: "12px", color: "#e1251b"}}/> TDA InSure</FooterTxt>
            <FooterTxt><MdEmail style={{fontSize: "13px", color: "#e1251b"}}/> tda.service@tda.com</FooterTxt>
        </FooterGridBox>
      </FooterGrid>
    </FooterBody>
  )
}

export default Footer