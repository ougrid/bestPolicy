// const apm = require('elastic-apm-node').start();

const express = require('express');
const https = require('https');
const fs = require('fs');
require("dotenv").config();

const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require('nodemailer');
const cors = require("cors");

const app = express();
const port = process.env.PORT ;

const corsOptions = {
  origin: process.env.alloworigin,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


//middleware-every request goes through it
app.use(cors(corsOptions));
// app.use(bodyParser);
app.use(bodyParser.json({ limit: '200kb' }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: { // ข้อมูลการเข้าสู่ระบบ
      user: 'kwanmhn@gmail.com', // email user ของเรา
      pass: 'lxgjroepchqevxcv' // email password
    }
   });
const routes = require("./routes");

//static data
app.use("/", routes.system);
app.use("/v1/static/provinces", routes.provinces);
app.use("/v1/static/amphurs", routes.amphurs);
app.use("/v1/static/tambons", routes.tambons);
app.use("/v1/static/titles", routes.titles);
app.use("/v1/static/mt_brands", routes.MT_Brands);
app.use("/v1/static/mt_models", routes.MT_Models);
app.use("/v1/static/bank", routes.banks);

app.use("/v1/locations", routes.locations);
app.use("/v1/persons", routes.persons);
app.use("/v1/auth", routes.auth);
app.use("/v1/insures", routes.insures);
app.use("/v1/policies", routes.policies);
app.use("/v1/payments", routes.payments);
app.use("/v1/bills", routes.bills);
// app.use("/v1/reports", routes.reports);
app.use("/v1/getrunno", routes.runno);  
app.use("/v1/araps", routes.arap);  

const options ={
  key:  fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}

// app.listen(port, () => {
//     console.log(`App running on http://localhost:${port}
//                 --- env config ---
//                 DB_USERNAME = ${process.env.DB_USERNAME}
//                 DB_PASSWORD = ${process.env.DB_PASSWORD}
//                 DB_NAME     = ${process.env.DB_NAME}
//                 DB_HOST     = ${process.env.DB_HOST}
//                 DB_DIALECT  = ${process.env.DB_DIALECT}
//                 DB_PORT     = ${process.env.DB_PORT}
//                 secretkey   = ${process.env.secretkey}
//                 alloworigin = ${process.env.alloworigin}`);
// });
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`App running on https://localhost:${port}
              --- env config ---
              DB_USERNAME = ${process.env.DB_USERNAME}
              DB_PASSWORD = ${process.env.DB_PASSWORD}
              DB_NAME     = ${process.env.DB_NAME}
              DB_HOST     = ${process.env.DB_HOST}
              DB_DIALECT  = ${process.env.DB_DIALECT}
              DB_PORT     = ${process.env.DB_PORT}
              secretkey   = ${process.env.secretkey}
              alloworigin = ${process.env.alloworigin}`);
});
