import styled from "styled-components";
import amitybanner from './image/hero-banner-1.png'

export const BackgroundImg1 = styled.div`
    background-image: url(${amitybanner});
    // width:1;
    height: 525px;
    overflow:visible;
    // background-size: cover;
    background-repeat: no-repeat;
    z-index: -10;
`
export const Header = styled.h2`

color: #05276B;
    margin-top: 0;
    padding-top: 28px;
    z-index: 10;
`
export const InputBtn = styled.input`
text-align: center;
    border: none;
    border-radius: 5px;
    background: #DED5FE;
    color: black;
    height: 35px;
    width: 200px;
    margin-bottom: 8px;
    z-index: 10;

`
export const LoginBtn = styled.button`
color: white;
    border: none;
    height: 35px;
    width: 200px;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    background: #3A0CD2;
   
    cursor: pointer;
    z-index: 10;
`
export const NormalText = styled.p`
    padding: 10 px;
    color: #05276B;
`
export const BackdropBox1 = styled.div`
text-align: center;
color: #05276B;
    position: relative;
    top: 130px;
    height: 290px;
    max-width: 400px;
    margin: 0 auto;
    border-radius: 50px;
    backdrop-filter: blur(17px);
    z-index: 1;

`
export const BtnFilter = styled.button`
    border: none;
    height: 35px;
    width: 70px;
    margin-top: 15px;
    margin-bottom: 70px;
    border-radius: 20px;
    background: #3A0CD2;
    color: white;
    cursor: pointer;
    z-index: 10;
    margin-left: 8px;
`
export const BtnSelect = styled.select`
    border: none;
    height: 35px;
    width: 250px;
    margin-bottom: 70px;
    border-radius: 20px;
    // background: linear-gradient(90deg, rgba(169,176,244,1) 12%, rgba(244,192,195,1) 82%);
    background-color: #ded5fe;
    color: black;
`
