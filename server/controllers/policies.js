const Policy = require("../models").Policy; 
const Transaction = require("../models").Transaction; 
const CommOVIn = require("../models").CommOVIn; //imported fruits array
const CommOVOut = require("../models").CommOVOut;
const process = require('process');
require('dotenv').config();
// const Package = require("../models").Package;
// const User = require("../models").User;
const { Op, QueryTypes, Sequelize  } = require("sequelize");
//handle index request
// const showAll = (req,res) =>{
//     Location.findAll({
//     }).then((locations)=>{
//         res.json(locations);
//     })
// }

// Replace 'your_database', 'your_username', 'your_password', and 'your_host' with your database credentials
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
        dialectOptions: {
            ssl: {
                require: true,
                    rejectUnauthorized: false
            },
        },
});

const getPolicy = (req, res) => {
  Policy.findOne ({
    where: {
      policyNo: req.body.policyNo
    }
  }).then((policy) => {
    res.json(policy);
  });
};

const newPolicy = async (req, res) => {

  await sequelize.query(
    'select * FROM static_data."CommOVOuts" comout '+
    'JOIN static_data."CommOVIns" comin '+ 
    'ON comin."insurerCode" = comout."insurerCode" and comin."insureID" = comout."insureID" '+
    'where comout."AgentGroupCode" = ( '+
        'SELECT "agentGroupCode" FROM static_data."Agents" '+
        'where "agentCode" = :agentcode) ',
    {
      replacements: { agentcode: req.body.policy.agentCode },
      type: QueryTypes.SELECT
    }
  ).then((records) => {
    // let record =  JSON.stringify(records[0],null,2)
    // res.json(records[0].id)
   const setupcom = [["rateComOut","amountComOut",'Com','O'],
   ["rateComIn","amountComIn",'Com','I'],
   ["rateOVOut_1","amountOVOut_1",'OV','O'],
   ["rateOVOut_2","amountOVOut_2",'OV','O'],
   ["rateOVOut_3","amountOVOut_3",'OV','O'],
   ["rateOVOut_4","amountOVOut_4",'OV','O'],
   ["rateOVOut_5","amountOVOut_5",'OV','O'],
   ["rateOVIn_1","amountOVIn_1",'OV','I'],
   ["rateOVIn_2","amountOVIn_2",'OV','I'],
   ["rateOVIn_3","amountOVIn_3",'OV','I'],
   ["rateOVIn_4","amountOVIn_4",'OV','I'],
   ["rateOVIn_5","amountOVIn_5",'OV','I']]
  
    for (let i = 0; i < setupcom.length; i++) {
    if (records[0][setupcom[i][0]] != null || records[0][setupcom[i][1]] != null) {
      
     sequelize.query(
        'INSERT INTO static_data."Transactions" '+
        '("transType", "transStatus", "subType", "insurerCode", "agentGroupCode", "agentCode", "policyNo", "rate","amount", "duty","stamp", "total","dueDate" ) '+
        'VALUES (:type, :status, 1,:insurerCode ,:agentGroupCode ,:agentCode, :policyNo, :rate ,:amount ,:duty ,:stamp,:total,:duedate) ',  
        {
          replacements: { type: setupcom[i][2], 
                        status: setupcom[i][3],
                        insurerCode:req.body.policy.insurerCode,
                        agentGroupCode: records[0]["AgentGroupCode"],
                        agentCode:req.body.policy.agentCode ,
                        policyNo:req.body.policy.policyNo ,
                        rate: records[0][setupcom[i][0]],
                        amount: records[0][setupcom[i][1]],
                        duty: null,
                        stamp: null,
                        total: null,
                        duedate: '2022-05-01'},
          type: QueryTypes.INSERT
        }
      );
    
    }
    
   }
  })
  
  await Policy.create (req.body.policy);
  await res.json({status:'success'})
  };

const getTransactionByid = (req, res) => {
  Transaction.findOne ({
    where: {
      id: req.params.id
    }
  }).then((transection) => {
    res.json(transection);
  });
};

const newTransaction = (req, res) => {
  Transaction.create (req).then((transection) => {
      res.json(transection);
    });
  };

module.exports = {

  getPolicy,
  newPolicy,
  getTransactionByid,
  newTransaction
  // postCar,
  // removeCar,
  // editCar,
};