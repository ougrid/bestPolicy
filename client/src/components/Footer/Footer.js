import React from "react";
import { FooterBody, FooterGrid, FooterGridBox, FooterTxt, FooterTopic } from "../StylesPages/FooterStyles";
import "./Footer.css";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebookSquare, FaInstagramSquare, FaFax } from "react-icons/fa";
import {BiTimeFive} from "react-icons/bi"
import logoamity from '../StylesPages/image/amity_3.webp'
function Footer() {
  return (
    <FooterBody className="footer">
      <FooterGrid>
        <FooterGridBox>
            <img to="/"
            style={{ height: "50px", 'marginLeft': '20px'}}
            src={logoamity}
            />
            <FooterTxt><MdLocationOn style={{fontSize: "20px", color: "#e1251b"}}/> 67/213 ม.3 ซ.คลองหลวง 17 ต.คลองหนึ่ง อ.คลองหลวง ปทุมธานี 12120</FooterTxt> 

            <FooterTxt><BiTimeFive style={{fontSize: "20px", color: "#e1251b"}}/>
            จันทร์ - ศุกร์ 8:30 - 17:30 น.
            </FooterTxt>
        </FooterGridBox>

        <FooterGridBox>
            <FooterTopic>ผลิตภัณฑ์ของเรา</FooterTopic>
            <FooterTxt>
                <li>ประกันภัย COVID-19</li>
                <li>ประกันภัยรถยนต์อัพทูไมล์</li>
                <li>ประกันภัยรถยนต์</li>
                
            </FooterTxt>
            
        </FooterGridBox>

        <FooterGridBox>
            <FooterTopic>บริการลูกค้า</FooterTopic>
            <FooterTxt>
                <li>วิธีการซื้อประกัน</li>
                <li>การชำระเงิน</li>
                <li>คำถามที่พบบ่อย</li>
                <li>แจ้งเรื่องร้องเรียน</li>
                <li>นโยบายการคุ้มครองข้อมูลส่วนบุคคล</li>
            </FooterTxt>
        </FooterGridBox>

        <FooterGridBox>
            
            <FooterTopic>ติดต่อเรา</FooterTopic>
            <FooterTxt><FaFax style={{fontSize: "20px", color: "#e1251b"}}/> 02-5298899</FooterTxt>
            <FooterTxt><BsFillTelephoneFill style={{fontSize: "20px", color: "#e1251b"}}/> 089-9449886</FooterTxt>
            <FooterTxt><FaFacebookSquare style={{fontSize: "20px", color: "#e1251b"}}/> Amityinsurancebroker</FooterTxt>
            {/* <FooterTxt><FaInstagramSquare style={{fontSize: "12px", color: "#e1251b"}}/> TDA InSure</FooterTxt>
            <FooterTxt><FaTwitterSquare style={{fontSize: "12px", color: "#e1251b"}}/> TDA InSure</FooterTxt> */}
            <FooterTxt><MdEmail style={{fontSize: "20px", color: "#e1251b"}}/> sales@amitybroker.com</FooterTxt>
        </FooterGridBox>
      </FooterGrid>
    </FooterBody>
  )
}

export default Footer