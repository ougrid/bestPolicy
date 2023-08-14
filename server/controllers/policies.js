const Policy = require("../models").Policy;
const Transaction = require("../models").Transaction;
const CommOVIn = require("../models").CommOVIn; //imported fruits array
const CommOVOut = require("../models").CommOVOut;
const Insuree = require("../models").Insuree;
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

const createTransection = async (req) => {
  await sequelize.query(
    'select * FROM static_data."CommOVOuts" comout ' +
    'JOIN static_data."CommOVIns" comin ' +
    'ON comin."insurerCode" = comout."insurerCode" and comin."insureID" = comout."insureID" ' +
    'where comout."agentCode" =  :agentcode ',
    {
      replacements: { agentcode: req.body.policy.agentCode },
      type: QueryTypes.SELECT
    }
  ).then((records) => {
    // let record =  JSON.stringify(records[0],null,2)
    // res.json(records[0].id)
    const setupcom = [["rateComOut", "amountComOut", 'Com', 'O'],
    ["rateComIn", "amountComIn", 'Com', 'I'],
    ["rateOVOut_1", "amountOVOut_1", 'OV', 'O'],
    ["rateOVOut_2", "amountOVOut_2", 'OV', 'O'],
    ["rateOVOut_3", "amountOVOut_3", 'OV', 'O'],
    ["rateOVOut_4", "amountOVOut_4", 'OV', 'O'],
    ["rateOVOut_5", "amountOVOut_5", 'OV', 'O'],
    ["rateOVIn_1", "amountOVIn_1", 'OV', 'I'],
    ["rateOVIn_2", "amountOVIn_2", 'OV', 'I'],
    ["rateOVIn_3", "amountOVIn_3", 'OV', 'I'],
    ["rateOVIn_4", "amountOVIn_4", 'OV', 'I'],
    ["rateOVIn_5", "amountOVIn_5", 'OV', 'I']]

    for (let i = 0; i < setupcom.length; i++) {
      if (records[0][setupcom[i][0]] != null || records[0][setupcom[i][1]] != null) {
        let subType = 1
        if (setupcom[i][3] === 'O') { subType = -1 }
        sequelize.query(
          'INSERT INTO static_data."Transactions" ' +
          '("transType", "transStatus", "subType", "insurerCode", "agentGroupCode", "agentCode", "policyNo", "rate","amount", "duty","tax", "totalprem","dueDate" ) ' +
          'VALUES (:type, :status, :subType,:insurerCode ,:agentGroupCode ,:agentCode, :policyNo, :rate ,:amount ,:duty ,:tax,:totalprem,:duedate) ',
          {
            replacements: {
              type: setupcom[i][2],
              status: setupcom[i][3],
              subType: subType,
              insurerCode: req.body.policy.insurerCode,
              agentGroupCode: records[0]["AgentGroupCode"],
              agentCode: req.body.policy.agentCode,
              policyNo: req.body.policy.policyNo,
              rate: records[0][setupcom[i][0]],
              amount: records[0][setupcom[i][1]],
              duty: null,
              tax: null,
              totalprem: null,
              duedate: '2022-05-01'
            },
            type: QueryTypes.INSERT
          }
        );

      }

    }
  })
}

const getPolicy = (req, res) => {
  Policy.findOne({
    where: {
      policyNo: req.body.policyNo
    }
  }).then((policy) => {
    res.json(policy);
  });
};

const getPolicyList = async (req, res) => {
  const records = await sequelize.query(
    'select * from static_data."Policies" ' +
    'where ' +
    'case when :insurerCode IS NOT NULL then "insurerCode" = :insurerCode else true end and ' +
    'case when :policyNo IS NOT NULL then "policyNo" = :policyNo else true end and ' +
    'case when :insureID IS NOT NULL then "insureID" = :insureID else true end and ' +
    'case when :createdAt IS NOT NULL then "createdAt" >= :createdAt else true end and ' +
    'case when :actDate IS NOT NULL then "actDate" >= :actDate else true end and  ' +
    'case when :agentCode IS NOT NULL then "agentCode" = :agentCode else true end and ' +
    'case when :itemList IS NOT NULL then "itemList" = :itemList else true end ',
    {
      replacements: {
        insurerCode: req.body.insurerCode,
        policyNo: req.body.policyNo,
        insureID: req.body.insureID,
        createdAt: req.body.createdAt,
        actDate: req.body.actDate,
        agentCode: req.body.agentCode,
        itemList: req.body.itemList,

      },
      type: QueryTypes.SELECT
    }
  )
  res.json(records)
};

const newPolicy = async (req, res) => {
  createTransection(req)
  await Policy.create(req.body.policy);
  await res.json({ status: 'success' })
};

const getTransactionByid = (req, res) => {
  Transaction.findOne({
    where: {
      id: req.params.id
    }
  }).then((transection) => {
    res.json(transection);
  });
};

const newTransaction = async (req, res) => {
  Transaction.create(req).then((transection) => {
    res.json(transection);
  });
};

const newPolicyList = async (req, res) => {

  //create entity 
  for (let i = 0; i < req.body.length; i++) {
    await sequelize.query(
      'insert into static_data."Entities" ("personType","titleID","t_ogName","t_firstName","t_lastName","idCardType","idCardNo","taxNo") ' +
      'values (:personType, (select "TITLEID" from static_data."Titles" where "TITLEABTHAIBEGIN" = :title), :t_ogName, :t_firstName, :t_lastName,:idCardType,:idCardNo,:taxNo) ' +
      'ON CONFLICT ((case when :personType = \'P\' then "idCardNo" else "taxNo" end)) DO NOTHING RETURNING "id" ',
      {
        replacements: {
          personType: req.body[i].personType,
          title: req.body[i].title,
          t_ogName: req.body[i].t_ogName,
          t_firstName: req.body[i].t_firstName,
          t_lastName: req.body[i].t_lastName,
          idCardType: req.body[i].idCardType,
          idCardNo: req.body[i].idCardNo,
          taxNo: req.body[i].taxNo
        },
        type: QueryTypes.INSERT
      }
    ).then(async (entity) => {

      console.log(entity);
      let insureeCode

      if (entity[1] === 1) {   // entity[1] === 1 when create new entity


        const insuree = await Insuree.create({ entityID: entity[0][0].id, insureeCode: 'A' + entity[0][0].id }, { returning: ['insureeCode'] })
        console.log({ true: insuree });
        insureeCode = insuree['dataValues'].insureeCode
        //insert policy
        // await  sequelize.query(
        //     'insert into static_data."Policies" ("policyNo","insureeCode","insurerCode","agentCode","insureID","actDate", "expDate" ,grossprem, duty, tax, totalprem) ' +
        //     // 'values (:policyNo, (select "insureeCode" from static_data."Insurees" where "entityID" = :entityInsuree), '+
        //     'values (:policyNo, :insureeCode, ' +
        //     '(select "insurerCode" from static_data."Insurers" where "entityID" = (select id from static_data."Entities" where "t_ogName" = :insurername)), ' +
        //     ':agentCode, (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass), ' +
        //     ':actDate, :expDate, :grossprem, :duty, :tax, :totalprem) ',
        //     {
        //       replacements: {
        //         policyNo: req.body[i].policyNo,
        //         // entityInsuree:
        //         insureeCode: insuree['dataValues'].insureeCode,
        //         insurername :req.body[i].insurerName,
        //         class: req.body[i].class,
        //         subClass: req.body[i].subClass,
        //         agentCode: req.body[i].agentCode,
        //         actDate: req.body[i].actDate,
        //         expDate: req.body[i].expDate,
        //         grossprem: req.body[i].grossprem,
        //         duty: req.body[i].duty,
        //         tax: req.body[i].tax,
        //         totalprem: req.body[i].totalprem
        //       },
        //       type: QueryTypes.INSERT
        //     }
        //   )

        //create location
        await sequelize.query(

          'INSERT INTO static_data."Locations" ("entityID", "t_location_1", "t_location_2", "t_location_3", "t_location_4", "t_location_5", "provinceID", "districtID", "subDistrictID", "zipcode", "telNum_1","locationType") ' +
          'values(:entityID, :t_location_1, :t_location_2,  :t_location_3, :t_location_4, :t_location_5, ' +
          '(select "provinceid" from static_data.provinces where t_provincename = :province), ' +
          '(select "amphurid" from static_data."Amphurs" where t_amphurname = :district), ' +
          '(select "tambonid" from static_data."Tambons" where t_tambonname = :tambon), ' +
          ':zipcode, :tel_1, :locationType) ',
          {
            replacements: {
              entityID: entity[0][0].id,
              t_location_1: req.body[i].t_location_1.toString(),
              t_location_2: req.body[i].t_location_2.toString(),
              t_location_3: req.body[i].t_location_3.toString(),
              t_location_4: req.body[i].t_location_4.toString(),
              t_location_5: req.body[i].t_location_5.toString(),
              province: req.body[i].province,
              district: req.body[i].distric,
              tambon: req.body[i].subdistric,
              zipcode: req.body[i].zipcode.toString(),
              tel_1: req.body[i].telNum_1,
              locationType: 'A'
            },
            type: QueryTypes.INSERT
          }
        )
      } else {
        //select insuree
        const insuree = await sequelize.query(
          'select * FROM static_data."Insurees" ins JOIN static_data."Entities" ent ON ins."entityID" = ent."id" WHERE (CASE WHEN ent."personType" = \'P\' THEN "idCardNo" ELSE "taxNo" END) = :idNo ',
          { replacements: { idNo: req.body[i].personType === "P" ? req.body[i].idCardNo : req.body[i].taxNo }, type: QueryTypes.SELECT })
        console.log({ false: insuree });
        insureeCode = insuree[0].insureeCode
        //insert policy
        // await  sequelize.query(
        //     'insert into static_data."Policies" ("policyNo","insureeCode","insurerCode","agentCode","insureID","actDate", "expDate" ,grossprem, duty, tax, totalprem) ' +
        //     // 'values (:policyNo, (select "insureeCode" from static_data."Insurees" where "entityID" = :entityInsuree), '+
        //     'values (:policyNo, :insureeCode, ' +
        //     '(select "insurerCode" from static_data."Insurers" where "entityID" = (select id from static_data."Entities" where "t_ogName" = :insurername)), ' +
        //     ':agentCode, (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass), ' +
        //     ':actDate, :expDate, :grossprem, :duty, :tax, :totalprem) ',
        //     {
        //       replacements: {
        //         policyNo: req.body[i].policyNo,
        //         // entityInsuree:
        //         insureeCode: insuree[0].insureeCode,
        //         insurername :req.body[i].insurerName,
        //         class: req.body[i].class,
        //         subClass: req.body[i].subClass,
        //         agentCode: req.body[i].agentCode,
        //         actDate: req.body[i].actDate,
        //         expDate: req.body[i].expDate,
        //         grossprem: req.body[i].grossprem,
        //         duty: req.body[i].duty,
        //         tax: req.body[i].tax,
        //         totalprem: req.body[i].totalprem
        //       },
        //       type: QueryTypes.INSERT
        //     }
        //   )

      }
      //insert policy
      await sequelize.query(
        'insert into static_data."Policies" ("policyNo","insureeCode","insurerCode","agentCode","insureID","actDate", "expDate" ,grossprem, duty, tax, totalprem, ' +
        'commin_rate, commin_amt, ovin_rate, ovin_amt, commin_taxamt, ovin_taxamt, commout_rate, commout_amt, ovout_rate, ovout_amt, createusercode  ) ' +
        // 'values (:policyNo, (select "insureeCode" from static_data."Insurees" where "entityID" = :entityInsuree), '+
        'values (:policyNo, :insureeCode, ' +
        '(select "insurerCode" from static_data."Insurers" where "entityID" = (select id from static_data."Entities" where "t_ogName" = :insurername)), ' +
        ':agentCode, (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass), ' +
        ':actDate, :expDate, :grossprem, :duty, :tax, :totalprem, ' +
        ':commin_rate, :commin_amt, :ovin_rate, :ovin_amt, :commin_taxamt, :ovin_taxamt, :commout_rate, :commout_amt, :ovout_rate, :ovout_amt, :createusercode )',
        {
          replacements: {
            policyNo: req.body[i].policyNo,
            // entityInsuree:
            insureeCode: insureeCode,
            insurername: req.body[i].insurerName,
            class: req.body[i].class,
            subClass: req.body[i].subClass,
            agentCode: req.body[i].agentCode,
            actDate: req.body[i].actDate,
            expDate: req.body[i].expDate,
            grossprem: req.body[i].grossprem,
            duty: req.body[i].duty,
            tax: req.body[i].tax,
            totalprem: req.body[i].totalprem,
            commin_rate: req.body[i][`commIn%`],
            commin_amt: req.body[i][`commInamt`],
            ovin_rate: req.body[i][`ovIn%`],
            ovin_amt: req.body[i][`ovInamt`],
            commin_taxamt: null,
            ovin_taxamt: null,
            commout_rate: req.body[i][`commOut%`],
            commout_amt: req.body[i][`commOutamt`],
            ovout_rate: req.body[i][`ovOut%`],
            ovout_amt: req.body[i][`ovOutamt`],
            createusercode: "kwanjai",
            
          },
          type: QueryTypes.INSERT
        }
      )


    })


    // find comm ov defualt
    const records = await sequelize.query(
      'select * FROM static_data."CommOVOuts" comout ' +
      'JOIN static_data."CommOVIns" comin ' +
      'ON comin."insurerCode" = comout."insurerCode" and comin."insureID" = comout."insureID" ' +
      'where comout."agentCode" = :agentcode ' +
      'and comout."insureID" = (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass) ',
      {
        replacements: {
          agentcode: req.body[i].agentCode,
          class: req.body[i].class,
          subClass: req.body[i].subClass,
        },
        type: QueryTypes.SELECT
      }
    )
    // let record =  JSON.stringify(records[0],null,2)
    // res.json(records[0].id)
    const setupcom = [["rateComOut", 'COMM-OUT', 'O'],
    ["rateComIn", 'COMM-IN', 'I'],
    ["rateOVOut_1", 'OV-OUT', 'O'],
    // ["rateOVOut_2", "amountOVOut_2", 'OV', 'O'],
    // ["rateOVOut_3", "amountOVOut_3", 'OV', 'O'],
    // ["rateOVOut_4", "amountOVOut_4", 'OV', 'O'],
    // ["rateOVOut_5", "amountOVOut_5", 'OV', 'O'],
    ["rateOVIn_1", 'OV-IN', 'I'],
    // ["rateOVIn_2", "amountOVIn_2", 'OV', 'I'],
    // ["rateOVIn_3", "amountOVIn_3", 'OV', 'I'],
    // ["rateOVIn_4", "amountOVIn_4", 'OV', 'I'],
    // ["rateOVIn_5", "amountOVIn_5", 'OV', 'I'],
    [null, 'PREM-IN', 'I'],
    [null, 'PREM-OUT', 'O'],
    ]

    for (let j = 0; j < setupcom.length; j++) {
      let subType = null
      let commamt = null
      let ovamt = null
      let totalamt = null
      if (await records[0][setupcom[j][0]] != null) {

        if (setupcom[j][1] === 'COMM-OUT') {
          subType = -1
          commamt = req.body[i].commOutamt
          totalamt = req.body[i].commOutamt

        } else if (setupcom[j][1] === 'OV-OUT') {
          subType = -1
          ovamt = req.body[i].ovOutamt
          totalamt = req.body[i].ovOutamt

        } else if (setupcom[j][1] === 'COMM-IN') {
          subType = 1
          commamt = req.body[i].commInamt
          totalamt = req.body[i].commInamt

        } else if (setupcom[j][1] === 'OV-IN') {
          subType = 1
          ovamt = req.body[i].ovInamt
          totalamt = req.body[i].ovInamt
        }
      } else {
        if (setupcom[j][1] === 'PREM-IN') {
          subType = 1
          totalamt = req.body[i].totalprem
        } else if (setupcom[j][1] === 'PREM-OUT') {
          subType = -1
          totalamt = req.body[i].totalprem
        }
      }
      console.log({ commamt: commamt, ovamt: ovamt });
      await sequelize.query(
        'INSERT INTO static_data."Transactions" ' +
        '("transType", "subType", "insurerCode","agentCode", "policyNo", commamt,commtaxamt,ovamt,ovtaxamt,totalamt,remainamt,"dueDate",grossprem,duty,tax,totalprem,txtype2  ) ' +
        'VALUES (:type, :subType, ' +
        '(select "insurerCode" from static_data."Insurers" where "entityID" = (select id from static_data."Entities" where "t_ogName" = :insurername)), ' +
        ':agentCode, :policyNo, :commamt , :commtaxamt, :ovamt, :ovtaxamt,:totalamt,:totalamt, :duedate, :grossprem, :duty,:tax,:totalprem, :txtype2 ) ',
        {
          replacements: {
            type: setupcom[j][1],
            subType: subType,
            insurername: req.body[i].insurerName,
            agentCode: req.body[i].agentCode,
            policyNo: req.body[i].policyNo,
            commamt: commamt,
            commtaxamt: null,
            ovamt: ovamt,
            ovtaxamt: null,
            totalamt: totalamt,
            duedate: '2022-05-01',
            grossprem: req.body[i].grossprem,
            duty: req.body[i].duty,
            tax: req.body[i].tax,
            totalprem: req.body[i].totalprem,
            txtype2 :1,

          },
          type: QueryTypes.INSERT
        }
      );

      // }else if (setupcom[j][2] === 'Prem'){
      //   let subType = 1
      //   if(setupcom[j][3] === 'O'){subType = -1}
      //   sequelize.query(
      //     'INSERT INTO static_data."Transactions" ' +
      //     '("transType", "transStatus", "subType", "insurerCode", "agentCode", "policyNo", "amount", "duty","tax", "totalprem",totalamt,remainamt,"dueDate" ) ' +
      //     'VALUES (:type, :status, :subType, ' +
      //     '(select "insurerCode" from static_data."Insurers" where "entityID" = (select id from static_data."Entities" where "t_ogName" = :insurername)), ' +
      //     ':agentCode, :policyNo,:amount ,:duty ,:tax,:totalprem,:totalprem,:totalprem,:duedate) ',
      //     {
      //       replacements: {
      //         type: 'Prem',
      //         status: setupcom[j][3],
      //         subType : subType,
      //         insurername: req.body[i].insurerName,
      //         agentCode: req.body[i].agentCode,
      //         policyNo: req.body[i].policyNo,
      //         amount:  req.body[i].grossprem,
      //         duty: req.body[i].duty,
      //         tax: req.body[i].tax,
      //         totalprem: req.body[i].totalprem,
      //         duedate: '2022-05-01'
      //       },
      //       type: QueryTypes.INSERT
      //     }
      //   );

      // }

    }






  }




  await res.json({ status: 'success' })
};

module.exports = {

  getPolicy,
  getPolicyList,
  newPolicy,
  getTransactionByid,
  newTransaction,
  newPolicyList,
  // postCar,
  // removeCar,
  // editCar,
};