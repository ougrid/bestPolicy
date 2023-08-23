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

const createTransection = async (policy) => {
     
  //find credit term 
     const insurer = await sequelize.query(
      'select * FROM static_data."Insurers" where "insurerCode" = :insurerCode',
      {
        replacements: {
          insurerCode: policy.insurerCode,
        },
        type: QueryTypes.SELECT
      }
    )
    const agent = await sequelize.query(
      'select * FROM static_data."Agents" ' +
      'where "agentCode" = :agentcode',
      {
        replacements: {
          agentcode: policy.agentCode,
        },
        type: QueryTypes.SELECT
      }
    )
   
    
    // find comm ov defualt
    const commov1 = await sequelize.query(
      'select * FROM static_data."CommOVOuts" comout ' +
      'JOIN static_data."CommOVIns" comin ' +
      'ON comin."insurerCode" = comout."insurerCode" and comin."insureID" = comout."insureID" ' +
      'where comout."agentCode" = :agentcode ' +
      'and comout."insureID" = (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass) '+
      'and comout."insurerCode" = :insurerCode',
      {
        replacements: {
          agentcode: policy.agentCode,
          class: policy.class,
          subClass: policy.subClass,
          insurerCode: policy.insurerCode,
        },
        type: QueryTypes.SELECT
      }
    )

     
      
     // amity -> insurer (prem-out) && insurer -> amity (comm/ov-in)
     // seqnoins >1
     let date = new Date()
     for (let i = 1; i <= policy.seqNoins; i++) {
      //prem-out
          let totalamt = policy.totalprem/ policy.seqNoins
          const dueDate = new Date()
          dueDate.setDate(date.getDate() + i*insurer[0].premCreditT);
          await sequelize.query(
            'INSERT INTO static_data."Transactions" ' +
            '("transType", "subType", "insurerCode","agentCode", "policyNo", totalamt,remainamt,"dueDate",netgrossprem,duty,tax,totalprem,txtype2, polid, "seqNo",  mainaccountcode ) ' +
            'VALUES (:type, :subType, ' +
            '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
            ':agentCode, :policyNo, :totalamt,:totalamt, :duedate, :netgrossprem, :duty,:tax,:totalprem, :txtype2, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1), :seqno ,:mainaccountcode ) ',
            {
              replacements: {
                type: 'PREM-OUT',
                subType: -1,
                insurerCode: policy.insurerCode,
                agentCode: policy.agentCode,
                policyNo: policy.policyNo,
                totalamt: totalamt,
                duedate: dueDate,
                netgrossprem: policy.netgrossprem,
                duty: policy.duty,
                tax: policy.tax,
                totalprem: policy.totalprem,
                txtype2 :1,
                seqno:i,
                mainaccountcode: policy.insurerCode,
    
              },
              type: QueryTypes.INSERT
            }
          );
      
      //comm-in
      totalamt = policy.commInamt/ policy.seqNoins
      dueDate.setDate(dueDate.getDate() + insurer[0].commovCreditT);
      await sequelize.query(
        'INSERT INTO static_data."Transactions" ' +
        '("transType", "subType", "insurerCode","agentCode", "policyNo", commamt,commtaxamt,totalamt,remainamt,"dueDate",netgrossprem,duty,tax,totalprem,txtype2, polid, "seqNo", mainaccountcode ) ' +
        'VALUES (:type, :subType, ' +
        '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
        ':agentCode, :policyNo, :commamt , :commtaxamt, :totalamt,:totalamt, :duedate, :netgrossprem, :duty,:tax,:totalprem, :txtype2, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1) ,:seqno ,:mainaccountcode ) ',
        {
          replacements: {
            type: 'COMM-IN',
            subType: 1,
            insurerCode: policy.insurerCode,
            agentCode: policy.agentCode,
            policyNo: policy.policyNo,
            commamt: policy.commInamt,
            commtaxamt: policy.commIntaxamt,
            totalamt: totalamt,
            duedate: dueDate,
            netgrossprem: policy.netgrossprem,
            duty: policy.duty,
            tax: policy.tax,
            totalprem: policy.totalprem,
            txtype2 :1,
            seqno:i,
            mainaccountcode: 'Amity',
    

          },
          type: QueryTypes.INSERT
        }
      );
        //ov-in
        totalamt = policy.ovInamt/ policy.seqNoins
      await sequelize.query(
        'INSERT INTO static_data."Transactions" ' +
        '("transType", "subType", "insurerCode","agentCode", "policyNo", ovamt,ovtaxamt,totalamt,remainamt,"dueDate",netgrossprem,duty,tax,totalprem,txtype2, polid, "seqNo" ,mainaccountcode ) ' +
        'VALUES (:type, :subType, ' +
        '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
        ':agentCode, :policyNo, :ovamt , :ovtaxamt, :totalamt,:totalamt, :duedate, :netgrossprem, :duty,:tax,:totalprem, :txtype2, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1) ,:seqno ,:mainaccountcode) ',
        {
          replacements: {
            type: 'OV-IN',
            subType: 1,
            insurerCode: policy.insurerCode,
            agentCode: policy.agentCode,
            policyNo: policy.policyNo,
            ovamt: policy.ovInamt,
            ovtaxamt: policy.ovIntaxamt,
            totalamt: totalamt,
            duedate: dueDate,
            netgrossprem: policy.netgrossprem,
            duty: policy.duty,
            tax: policy.tax,
            totalprem: policy.totalprem,
            txtype2 :1,
            seqno:i,
            mainaccountcode: 'Amity',
    
          },
          type: QueryTypes.INSERT
        }
      );
     }

     // amity -> advisor1 (comm/ov-out) &&  advisor1  -> amity (prem-in)
     // seqnoagt >1
     date = new Date()
     for (let i = 1; i <= policy.seqNoagt; i++) {
      //prem-in
          let totalamt = policy.totalprem/ policy.seqNoagt
          const dueDate = new Date()
          dueDate.setDate(date.getDate() + i*agent[0].premCreditT);
          await sequelize.query(
            'INSERT INTO static_data."Transactions" ' +
            '("transType", "subType", "insurerCode","agentCode", "policyNo", totalamt,remainamt,"dueDate",netgrossprem,duty,tax,totalprem,txtype2, polid, "seqNo" , mainaccountcode ) ' +
            'VALUES (:type, :subType, ' +
            '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
            ':agentCode, :policyNo, :totalamt,:totalamt, :duedate, :netgrossprem, :duty,:tax,:totalprem, :txtype2, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1), :seqno ,:mainaccountcode  ) ',
            {
              replacements: {
                type: 'PREM-IN',
                subType: -1,
                insurerCode: policy.insurerCode,
                agentCode: policy.agentCode,
                policyNo: policy.policyNo,
                totalamt: totalamt,
                duedate: dueDate,
                netgrossprem: policy.netgrossprem,
                duty: policy.duty,
                tax: policy.tax,
                totalprem: policy.totalprem,
                txtype2 :1,
                seqno:i,
                mainaccountcode:policy.agentCode,

    
              },
              type: QueryTypes.INSERT
            }
          );
      
      //comm-out
      totalamt = policy.commOut1amt/ policy.seqNoagt
      dueDate.setDate(dueDate.getDate() + agent[0].commovCreditT);
      await sequelize.query(
        'INSERT INTO static_data."Transactions" ' +
        '("transType", "subType", "insurerCode","agentCode", "policyNo", commamt,commtaxamt,totalamt,remainamt,"dueDate",netgrossprem,duty,tax,totalprem,txtype2, polid, "seqNo", mainaccountcode ) ' +
        'VALUES (:type, :subType, ' +
        '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
        ':agentCode, :policyNo, :commamt , :commtaxamt, :totalamt,:totalamt, :duedate, :netgrossprem, :duty,:tax,:totalprem, :txtype2, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1) ,:seqno ,:mainaccountcode ) ',
        {
          replacements: {
            type: 'COMM-OUT',
            subType: -1,
            insurerCode: policy.insurerCode,
            agentCode: policy.agentCode,
            policyNo: policy.policyNo,
            commamt: policy.commOutamt,
            commtaxamt: null,
            totalamt: totalamt,
            duedate: dueDate,
            netgrossprem: policy.netgrossprem,
            duty: policy.duty,
            tax: policy.tax,
            totalprem: policy.totalprem,
            txtype2 :1,
            seqno:i,
            mainaccountcode: policy.agentCode,
    

          },
          type: QueryTypes.INSERT
        }
      );
        //ov-out
        totalamt = policy.ovOut1amt/ policy.seqNoagt
      await sequelize.query(
        'INSERT INTO static_data."Transactions" ' +
        '("transType", "subType", "insurerCode","agentCode", "policyNo", ovamt,ovtaxamt,totalamt,remainamt,"dueDate",netgrossprem,duty,tax,totalprem,txtype2, polid, "seqNo" ,mainaccountcode ) ' +
        'VALUES (:type, :subType, ' +
        '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
        ':agentCode, :policyNo, :ovamt , :ovtaxamt, :totalamt,:totalamt, :duedate, :netgrossprem, :duty,:tax,:totalprem, :txtype2, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1) ,:seqno ,:mainaccountcode) ',
        {
          replacements: {
            type: 'OV-OUT',
            subType: -1,
            insurerCode: policy.insurerCode,
            agentCode: policy.agentCode,
            policyNo: policy.policyNo,
            ovamt: policy.ovOutamt,
            ovtaxamt: null,
            totalamt: totalamt,
            duedate: dueDate,
            netgrossprem: policy.netgrossprem,
            duty: policy.duty,
            tax: policy.tax,
            totalprem: policy.totalprem,
            txtype2 :1,
            seqno:i,
            mainaccountcode: policy.agentCode,
    
          },
          type: QueryTypes.INSERT
        }
      );
     }

     // case 2 advisor amity -> advisor2 (comm/ov-out)
     
     if (policy.agentCode2 ) {
      date = new Date()
       const agent2 = await sequelize.query(
         'select * FROM static_data."Agents" ' +
         'where "agentCode" = :agentcode',
         {
           replacements: {
             agentcode: policy.agentCode2,
           },
           type: QueryTypes.SELECT
         }
       )
       //comm-out
      let totalamt = policy.commOut2amt/ policy.seqNoagt
      const dueDate = new Date()
      dueDate.setDate(date.getDate() + agent2[0].commovCreditT);
      await sequelize.query(
        'INSERT INTO static_data."Transactions" ' +
        '("transType", "subType", "insurerCode","agentCode", "policyNo", commamt,commtaxamt,totalamt,remainamt,"dueDate",netgrossprem,duty,tax,totalprem,txtype2, polid, "seqNo", mainaccountcode, "agentCode2", ) ' +
        'VALUES (:type, :subType, ' +
        '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
        ':agentCode, :policyNo, :commamt , :commtaxamt, :totalamt,:totalamt, :duedate, :netgrossprem, :duty,:tax,:totalprem, :txtype2, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1) ,:seqno ,:mainaccountcode, agentCode2 ) ',
        {
          replacements: {
            type: 'COMM-OUT',
            subType: -1,
            insurerCode: policy.insurerCode,
            agentCode: policy.agentCode,
            agentCode2: agentCode2,
            policyNo: policy.policyNo,
            commamt: policy.commOutamt,
            commtaxamt: null,
            totalamt: totalamt,
            duedate: dueDate,
            netgrossprem: policy.netgrossprem,
            duty: policy.duty,
            tax: policy.tax,
            totalprem: policy.totalprem,
            txtype2 :1,
            seqno:i,
            mainaccountcode: policy.agentCode2,
    

          },
          type: QueryTypes.INSERT
        }
      );
        //ov-out
        totalamt = policy.ovOut2amt/ policy.seqNoagt
      await sequelize.query(
        'INSERT INTO static_data."Transactions" ' +
        '("transType", "subType", "insurerCode","agentCode", "policyNo", ovamt,ovtaxamt,totalamt,remainamt,"dueDate", '+
        ' netgrossprem,duty,tax,totalprem,txtype2, polid, "seqNo" ,mainaccountcode, "agentCode2" ) ' +
        'VALUES (:type, :subType, ' +
        '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
        ':agentCode, :policyNo, :ovamt , :ovtaxamt, :totalamt,:totalamt, :duedate, :netgrossprem, :duty,:tax,:totalprem, :txtype2, '+
        '(select id from static_data."Policies" where "policyNo" = :policyNo limit 1) ,:seqno ,:mainaccountcode, :agentCode2 ) ',
        {
          replacements: {
            type: 'OV-OUT',
            subType: -1,
            insurerCode: policy.insurerCode,
            agentCode: policy.agentCode,
            agentCode2: agentCode2,
            policyNo: policy.policyNo,
            ovamt: policy.ovOutamt,
            ovtaxamt: null,
            totalamt: totalamt,
            duedate: dueDate,
            netgrossprem: policy.netgrossprem,
            duty: policy.duty,
            tax: policy.tax,
            totalprem: policy.totalprem,
            txtype2 :1,
            seqno:i,
            mainaccountcode: policy.agentCode2,
    
          },
          type: QueryTypes.INSERT
        }
      );
      
     }
   


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

  for (let i = 0; i < req.body.length; i++) {
    //create entity 
    await sequelize.query(
      'insert into static_data."Entities" ("personType","titleID","t_ogName","t_firstName","t_lastName","idCardType","idCardNo","taxNo") ' +
      'values (:personType, (select "TITLEID" from static_data."Titles" where "TITLETHAIBEGIN" = :title limit 1), :t_ogName, :t_firstName, :t_lastName,:idCardType,:idCardNo,:taxNo) ' +
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

      let insureeCode

      if (entity[1] === 1) {   // entity[1] === 1 when create new entity


        const insuree = await Insuree.create({ entityID: entity[0][0].id, insureeCode: 'A' + entity[0][0].id }, { returning: ['insureeCode'] })
       
        insureeCode = insuree['dataValues'].insureeCode
        
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
              district: req.body[i].district,
              tambon: req.body[i].subdistrict,
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

        insureeCode = insuree[0].insureeCode
        

      }

      //insert new car or select
      let cars = [{id: null}]
      if (req.body[i].class === 'Motor') {
        cars = await sequelize.query(
          'WITH inserted AS ( '+
          'INSERT INTO static_data."Motors" ("brand", "voluntaryCode", "model", "specname", "licenseNo", "motorprovinceID", "chassisNo", "modelYear") '+
          'VALUES (:brandname, :voluntaryCode , :modelname , :specname, :licenseNo, :motorprovinceID, :chassisNo, :modelYear) ON CONFLICT ("chassisNo") DO NOTHING RETURNING * ) '+
          'SELECT * FROM inserted UNION ALL SELECT * FROM static_data."Motors" WHERE "chassisNo" = :chassisNo ',
          {
            replacements: {
              licenseNo: req.body[i].licenseNo,
              chassisNo: req.body[i].chassisNo,
              brandname: req.body[i].brandname,
              voluntaryCode: req.body[i].voluntaryCode|| '220',
              modelname: req.body[i].modelname|| null,
              specname: 'tesz',
              // motorprovinceID: req.body[i].motorprovinceID,
              motorprovinceID:2,
              modelYear: req.body[i].modelYear,
            },
            type: QueryTypes.SELECT
          }
        )
      }

      //set defualt comm ov if null 
      const commov = await sequelize.query(
      'select * FROM static_data."CommOVOuts" comout ' +
      'JOIN static_data."CommOVIns" comin ' +
      'ON comin."insurerCode" = comout."insurerCode" and comin."insureID" = comout."insureID" ' +
      'where comout."agentCode" = :agentcode ' +
      'and comout."insureID" = (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass) '+
      'and comout."insurerCode" = :insurerCode',
      {
        replacements: {
          agentcode: req.body[i].agentCode,
          class: req.body[i].class,
          subClass: req.body[i].subClass,
          insurerCode: req.body[i].insurerCode,
        },
        type: QueryTypes.SELECT
      }
    )
    

      if(req.body[i][`commIn%`] === null && req.body[i][`ovIn%`] === null){
        req.body[i][`commIn%`] = commov[0].rateComIn
        req.body[i][`commInamt`] = commov[0].rateComIn * req.body[i][`netgrossprem`]
        req.body[i][`ovIn%`] = commov[0].rateOVIn_1
        req.body[i][`ovInamt`] = commov[0].rateOVIn_1 * req.body[i][`netgrossprem`] 
      }
      req.body[i][`commIntaxamt`] = req.body[i][`commInamt`] *7/100
      req.body[i][`ovIntaxamt`] =  req.body[i][`ovInamt`] *7/100

      if(req.body[i][`commOut1%`] === null && req.body[i][`ovOut1%`] === null){
        req.body[i][`commOut1%`] = commov[0].rateComOut
        req.body[i][`commOut1amt`] = commov[0].rateComOut * req.body[i][`netgrossprem`]
        req.body[i][`ovOut1%`] = commov[0].rateOVOut_1
        req.body[i][`ovOut1amt`] = commov[0].rateOVOut_1 * req.body[i][`netgrossprem`]
      }
      //check agentcode2
      if( req.body[i][`agentCode2`] ){
        const commov2 = await sequelize.query(
          'select * FROM static_data."CommOVOuts" comout ' +
          'where comout."agentCode" = :agentcode ' +
          'and comout."insureID" = (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass) '+
          'and comout."insurerCode" = :insurerCode',
          {
            replacements: {
              agentcode: req.body[i].agentCode2,
              class: req.body[i].class,
              subClass: req.body[i].subClass,
              insurerCode: req.body[i].insurerCode,
            },
            type: QueryTypes.SELECT
          }
        )
       if(req.body[i][`commOut2%`] === null && req.body[i][`ovOut2%`] === null ){
        req.body[i][`commOut2%`] = commov2[0].rateComOut
        req.body[i][`commOut2amt`] = commov2[0].rateComOut * req.body[i][`netgrossprem`]
        req.body[i][`ovOut2%`] = commov2[0].rateOVOut_1
        req.body[i][`ovOut2amt`] = commov2[0].rateOVOut_1 * req.body[i][`netgrossprem`]
       }
       req.body[i][`commOut%`] = req.body[i][`commOut1%`] + req.body[i][`commOut2%`] 
        req.body[i][`commOutamt`] = req.body[i][`commOut1amt`] +req.body[i][`commOut2amt`]
        req.body[i][`ovOut%`] = req.body[i][`ovOut1%`] + req.body[i][`ovOut2%`]
        req.body[i][`ovOutamt`] = req.body[i][`ovOut1amt`] + req.body[i][`ovOut2amt`]
        
      }else{
        req.body[i][`agentCode2`] = null
        req.body[i][`commOut2%`] = null
        req.body[i][`commOut2amt`] = null
        req.body[i][`ovOut2%`] = null
        req.body[i][`ovOut2amt`] = null
        req.body[i][`commOut%`] = req.body[i][`commOut1%`] 
        req.body[i][`commOutamt`] = req.body[i][`commOut1amt`]
        req.body[i][`ovOut%`] = req.body[i][`ovOut1%`]
        req.body[i][`ovOutamt`] = req.body[i][`ovOut1amt`]
      }

    
      //insert policy
      await sequelize.query(
        'insert into static_data."Policies" ("policyNo","applicationNo","insureeCode","insurerCode","agentCode","agentCode2","insureID","actDate", "expDate" ,grossprem, duty, tax, totalprem, ' +
        'commin_rate, commin_amt, ovin_rate, ovin_amt, commin_taxamt, ovin_taxamt, commout_rate, commout_amt, ovout_rate, ovout_amt, createusercode, "itemList", "policyDate","status", ' +
        'commout1_rate, commout1_amt, ovout1_rate, ovout1_amt, commout2_rate, commout2_amt, ovout2_rate, ovout2_amt, "seqNoins", "seqNoagt") ' +
        // 'values (:policyNo, (select "insureeCode" from static_data."Insurees" where "entityID" = :entityInsuree), '+
        'values (:policyNo, :applicationNo, :insureeCode, ' +
        '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
        ':agentCode, :agentCode2, (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass), ' +
        ':actDate, :expDate, :grossprem, :duty, :tax, :totalprem, ' +
        ':commin_rate, :commin_amt, :ovin_rate, :ovin_amt, :commin_taxamt, :ovin_taxamt, :commout_rate, :commout_amt, :ovout_rate, :ovout_amt, :createusercode, :itemList ,:policyDate,\'A\', ' +
        ' :commout1_rate, :commout1_amt, :ovout1_rate, :ovout1_amt,  :commout2_rate, :commout2_amt, :ovout2_rate, :ovout2_amt, :seqNoins, :seqNoagt)',
        {
          replacements: {
            policyNo: req.body[i].policyNo,
            applicationNo: req.body[i].applicationNo,
            seqNoins: req.body[i].seqNoins,
            seqNoagt: req.body[i].seqNoagt,
            // entityInsuree:
            insureeCode: insureeCode,
            insurerCode: req.body[i].insurerCode,
            class: req.body[i].class,
            subClass: req.body[i].subClass,
            agentCode: req.body[i].agentCode,
            agentCode2: req.body[i].agentCode2,
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
            commin_taxamt: req.body[i][`commIntaxamt`],
            ovin_taxamt: req.body[i][`ovIntaxamt`],
            commout_rate: req.body[i][`commOut%`],
            commout_amt: req.body[i][`commOutamt`],
            ovout_rate: req.body[i][`ovOut%`],
            ovout_amt: req.body[i][`ovOutamt`],
            commout1_rate: req.body[i][`commOut1%`],
            commout1_amt: req.body[i][`commOut1amt`],
            ovout1_rate: req.body[i][`ovOut1%`],
            ovout1_amt: req.body[i][`ovOut1amt`],
            commout2_rate: req.body[i][`commOut2%`],
            commout2_amt: req.body[i][`commOut2amt`],
            ovout2_rate: req.body[i][`ovOut2%`],
            ovout2_amt: req.body[i][`ovOut2amt`],
            createusercode: "kwanjai",
            itemList: cars[0].id,
            policyDate:  new Date().toJSON().slice(0, 10),
            
          },
          type: QueryTypes.INSERT
        }
      )


    })

    //insert transaction 
    createTransection(req.body[i])


    // //find credit term 
    // const insurer = await sequelize.query(
    //   'select * FROM static_data."Insurers" where "insurerCode" = :insurerCode',
    //   {
    //     replacements: {
    //       insurerCode: req.body[i].insurerCode,
    //     },
    //     type: QueryTypes.SELECT
    //   }
    // )
    // const agent = await sequelize.query(
    //   'select * FROM static_data."Agents" ' +
    //   'where "agentCode" = :agentcode',
    //   {
    //     replacements: {
    //       agentcode: req.body[i].agentCode,
    //     },
    //     type: QueryTypes.SELECT
    //   }
    // )
   
    
    // // find comm ov defualt
    // const records = await sequelize.query(
    //   'select * FROM static_data."CommOVOuts" comout ' +
    //   'JOIN static_data."CommOVIns" comin ' +
    //   'ON comin."insurerCode" = comout."insurerCode" and comin."insureID" = comout."insureID" ' +
    //   'where comout."agentCode" = :agentcode ' +
    //   'and comout."insureID" = (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass) '+
    //   'and comout."insurerCode" = :insurerCode',
    //   {
    //     replacements: {
    //       agentcode: req.body[i].agentCode,
    //       class: req.body[i].class,
    //       subClass: req.body[i].subClass,
    //       insurerCode: req.body[i].insurerCode,
    //     },
    //     type: QueryTypes.SELECT
    //   }
    // )

    //  // case 2 advisor
    //  let agent2 =[];
    //  let records2 =[];
    //  if (req.body[i].agentCode !== null) {
    //    agent2 = await sequelize.query(
    //      'select * FROM static_data."Agents" ' +
    //      'where "agentCode" = :agentcode',
    //      {
    //        replacements: {
    //          agentcode: req.body[i].agentCode2,
    //        },
    //        type: QueryTypes.SELECT
    //      }
    //    )
    //     // find comm ov defualt
    //  records2 = await sequelize.query(
    //    'select * FROM static_data."CommOVOuts" comout ' +
    //    'where comout."agentCode" = :agentcode ' +
    //    'and comout."insureID" = (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass) '+
    //    'and comout."insurerCode" = :insurerCode',
    //    {
    //      replacements: {
    //        agentcode: req.body[i].agentCode2,
    //        class: req.body[i].class,
    //        subClass: req.body[i].subClass,
    //        insurerCode: req.body[i].insurerCode,
    //      },
    //      type: QueryTypes.SELECT
    //    }
    //  )
    //  }
    
    // const setupcom = [["rateComOut", 'COMM-OUT', 'O'],
    // ["rateOVOut_1", 'OV-OUT', 'O'],
    // ["rateComIn", 'COMM-IN', 'I'],
    // ["rateOVIn_1", 'OV-IN', 'I'],
    
    // [null, 'PREM-IN', 'I'],
    // [null, 'PREM-OUT', 'O'],
    // ]

    // for (let j = 0; j < setupcom.length; j++) {
    //   let subType = null
    //   let commamt = null
    //   let ovamt = null
    //   let totalamt = null
    //   let dueDate = new Date()
    //   const seqnoins = req.body[i].seqNoins
    //   const seqnoang = req.body[i].seqNoagt
    //   let mainaccount = null
      
    //   //แบ่งงวด insurer
    //   for (let k = 1 ; k <= seqnoins ; k++){
    //     if (await records[0][setupcom[j][0]] != null) {

    //       if (setupcom[j][1] === 'COMM-OUT') {
    //         subType = -1
    //         commamt = req.body[i].commOutamt
    //         totalamt = req.body[i].commOutamt
    //         dueDate.setDate(dueDate.getDate() + agent[0].commovCreditT);
  
    //       } else if (setupcom[j][1] === 'OV-OUT') {
    //         subType = -1
    //         ovamt = req.body[i].ovOutamt
    //         totalamt = req.body[i].ovOutamt
    //         dueDate.setDate(dueDate.getDate() + agent[0].commovCreditT);
  
    //       } 
    //     } else {
    //       if (setupcom[j][1] === 'PREM-OUT') {
    //         subType = -1
    //         totalamt = req.body[i].totalprem
    //         dueDate.setDate(dueDate.getDate() + insurer[0].premCreditT);
    //       }
    //     }
    //     await sequelize.query(
    //       'INSERT INTO static_data."Transactions" ' +
    //       '("transType", "subType", "insurerCode","agentCode", "policyNo", commamt,commtaxamt,ovamt,ovtaxamt,totalamt,remainamt,"dueDate",grossprem,duty,tax,totalprem,txtype2, polid ) ' +
    //       'VALUES (:type, :subType, ' +
    //       '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
    //       ':agentCode, :policyNo, :commamt , :commtaxamt, :ovamt, :ovtaxamt,:totalamt,:totalamt, :duedate, :grossprem, :duty,:tax,:totalprem, :txtype2, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1)  ) ',
    //       {
    //         replacements: {
    //           type: setupcom[j][1],
    //           subType: subType,
    //           insurerCode: req.body[i].insurerCode,
    //           agentCode: req.body[i].agentCode,
    //           policyNo: req.body[i].policyNo,
    //           commamt: commamt,
    //           commtaxamt: null,
    //           ovamt: ovamt,
    //           ovtaxamt: null,
    //           totalamt: totalamt,
    //           duedate: dueDate,
    //           grossprem: req.body[i].grossprem,
    //           duty: req.body[i].duty,
    //           tax: req.body[i].tax,
    //           totalprem: req.body[i].totalprem,
    //           txtype2 :1,
  
    //         },
    //         type: QueryTypes.INSERT
    //       }
    //     );
    //   }
    //   if (await records[0][setupcom[j][0]] != null) {

    //     if (setupcom[j][1] === 'COMM-OUT') {
    //       subType = -1
    //       commamt = req.body[i].commOutamt/
    //       totalamt = req.body[i].commOutamt
    //       dueDate.setDate(dueDate.getDate() + agent[0].commovCreditT);

    //     } else if (setupcom[j][1] === 'OV-OUT') {
    //       subType = -1
    //       ovamt = req.body[i].ovOutamt
    //       totalamt = req.body[i].ovOutamt
    //       dueDate.setDate(dueDate.getDate() + agent[0].commovCreditT);

    //     } else if (setupcom[j][1] === 'COMM-IN') {
    //       subType = 1
    //       commamt = req.body[i].commInamt
    //       totalamt = req.body[i].commInamt
    //       dueDate.setDate(dueDate.getDate() + insurer[0].commovCreditT);

    //     } else if (setupcom[j][1] === 'OV-IN') {
    //       subType = 1
    //       ovamt = req.body[i].ovInamt
    //       totalamt = req.body[i].ovInamt
    //       dueDate.setDate(dueDate.getDate() + insurer[0].commovCreditT);
    //     }
    //   } else {
    //     if (setupcom[j][1] === 'PREM-IN') {
    //       subType = 1
    //       totalamt = req.body[i].totalprem
    //       dueDate.setDate(dueDate.getDate() + agent[0].premCreditT);
    //     } else if (setupcom[j][1] === 'PREM-OUT') {
    //       subType = -1
    //       totalamt = req.body[i].totalprem
    //       dueDate.setDate(dueDate.getDate() + insurer[0].premCreditT);
    //     }
    //   }
    //   console.log(dueDate);
    //   console.log({ commamt: commamt, ovamt: ovamt });
    //   await sequelize.query(
    //     'INSERT INTO static_data."Transactions" ' +
    //     '("transType", "subType", "insurerCode","agentCode", "policyNo", commamt,commtaxamt,ovamt,ovtaxamt,totalamt,remainamt,"dueDate",grossprem,duty,tax,totalprem,txtype2, polid ) ' +
    //     'VALUES (:type, :subType, ' +
    //     '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
    //     ':agentCode, :policyNo, :commamt , :commtaxamt, :ovamt, :ovtaxamt,:totalamt,:totalamt, :duedate, :grossprem, :duty,:tax,:totalprem, :txtype2, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1)  ) ',
    //     {
    //       replacements: {
    //         type: setupcom[j][1],
    //         subType: subType,
    //         insurerCode: req.body[i].insurerCode,
    //         agentCode: req.body[i].agentCode,
    //         policyNo: req.body[i].policyNo,
    //         commamt: commamt,
    //         commtaxamt: null,
    //         ovamt: ovamt,
    //         ovtaxamt: null,
    //         totalamt: totalamt,
    //         duedate: dueDate,
    //         grossprem: req.body[i].grossprem,
    //         duty: req.body[i].duty,
    //         tax: req.body[i].tax,
    //         totalprem: req.body[i].totalprem,
    //         txtype2 :1,

    //       },
    //       type: QueryTypes.INSERT
    //     }
    //   );

      
    // }

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