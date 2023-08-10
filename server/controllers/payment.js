const Policy = require("../models").Policy;
const Transaction = require("../models").Transaction;
const CommOVIn = require("../models").CommOVIn; //imported fruits array
const CommOVOut = require("../models").CommOVOut;
const process = require('process');
require('dotenv').config();
// const Package = require("../models").Package;
// const User = require("../models").User;
const { Op, QueryTypes, Sequelize } = require("sequelize");
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

const findTransaction = async (req,res) => {
  // let transac1 = null
  // let transac2 = null
  let transac = []
  if (req.body.payType === 'amity') {
    if (req.body.repType === 'insuerName') {
      transac.push(['PREM-OUT', 'O'])
      // transac1 = ['Prem','I']
    } else if (req.body.repType === 'agentCode') {
      transac.push(['COMM-OUT', 'O'])
      transac.push(['OV-OUT', 'O'])
      // transac1 = ['Com/OV','O']
    }
  } else if (req.body.payType === 'insuerName' && req.body.repType === 'amity') {
    transac.push(['COMM-IN', 'I'])
    transac.push(['OV-IN', 'I'])
    // transac1 = ['Com/OV','I']
  } else if (req.body.payType === 'agentCode') {
    transac.push(['PREM-IN', 'I'])
    // transac1 = ['Prem','I']
    if (req.body.repType === 'insuerName') {
      transac.push(['PREM-OUT', 'O'])
      // transac2 = ['Prem','O']
    } else if (req.body.repType === 'amity') {
      transac.push(['COMM-OUT', 'O'])
      transac.push(['OV-OUT', 'O'])
      // transac2 = ['Com/OV','O']
    }
  }
  const records = []
    for (let i = 0; i < transac.length; i++) {
    
    const data = await sequelize.query(
          'select (select ent."t_ogName" from static_data."Insurers" ins join static_data."Entities" ent on ent.id = ins."entityID" where ins."insurerCode" = tran."insurerCode" ) as "insurerName",* from static_data."Transactions" tran  where '+
          'CASE WHEN :filter = \'policyNo\'  THEN tran."policyNo" = :value '+
          'WHEN :filter = \'agentCode\' then tran."agentCode" = :value '+
          'else tran."insurerCode" = (select "insurerCode" from static_data."Insurers" ins join static_data."Entities" ent on ent.id = ins."entityID" where ent."t_ogName" = :value ) '+
          'END and tran."payNo" is null and tran."transType" = :transType  ',
          {
            replacements: {
              filter:req.body.filterName,
              value:req.body.value,
              transType: transac[i][0],
              //status: transac[i][1]
            },
            type: QueryTypes.SELECT
          }
        );
        records.push(...data)

    }
    await res.json(records)
  
}

const findPolicyByPreminDue = async (req,res) => {

    const data = await sequelize.query(
          'select (select ent."t_ogName" from static_data."Insurers" ins join static_data."Entities" ent on ent.id = ins."entityID" where ins."insurerCode" = tran."insurerCode" ) as "insurerName",* from static_data."Transactions" tran  where '+
          'CASE WHEN :filter = \'policyNo\'  THEN tran."policyNo" = :value '+
          'WHEN :filter = \'agentCode\' then tran."agentCode" = :value '+
          'else tran."insurerCode" = (select "insurerCode" from static_data."Insurers" ins join static_data."Entities" ent on ent.id = ins."entityID" where ent."t_ogName" = :value ) '+
          'END and tran."payNo" is null and tran."transType" = :transType  ',
          {
            replacements: {
              filter:req.body.filterName,
              value:req.body.value,
              transType: transac[i][0],
              //status: transac[i][1]
            },
            type: QueryTypes.SELECT
          }
        );
        records.push(...data)

    
    await res.json(records)
  
}




module.exports = {


  findTransaction,
  findPolicyByPreminDue,
  // removeCar,
  // editCar,
};