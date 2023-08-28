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
      totalamt = policy.commin_amt/ policy.seqNoins
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
            commamt: policy.commin_amt,
            commtaxamt: policy.commin_taxamt,
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
        totalamt = policy.ovin_amt/ policy.seqNoins
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
            ovamt: policy.ovin_amt,
            ovtaxamt: policy.ovin_taxamt,
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
      totalamt = policy.commout1_amt/ policy.seqNoagt
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
            commamt: policy.commout_amt,
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
        totalamt = policy.ovout1_amt/ policy.seqNoagt
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
            ovamt: policy.ovout_amt,
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
      let totalamt = policy.commout2_amt/ policy.seqNoagt
      const dueDate = new Date()
      dueDate.setDate(date.getDate() + agent2[0].commovCreditT);
      await sequelize.query(
        'INSERT INTO static_data."Transactions" ' +
        '("transType", "subType", "insurerCode","agentCode", "policyNo", commamt,commtaxamt,totalamt,remainamt,"dueDate",netgrossprem,duty,tax,totalprem,txtype2, polid, "seqNo", mainaccountcode, "agentCode2" ) ' +
        'VALUES (:type, :subType, ' +
        '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
        ':agentCode, :policyNo, :commamt , :commtaxamt, :totalamt,:totalamt, :duedate, :netgrossprem, :duty,:tax,:totalprem, :txtype2, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1) ,:seqno ,:mainaccountcode, :agentCode2 ) ',
        {
          replacements: {
            type: 'COMM-OUT',
            subType: -1,
            insurerCode: policy.insurerCode,
            agentCode: policy.agentCode,
            agentCode2: policy.agentCode2,
            policyNo: policy.policyNo,
            commamt: policy.commout_amt,
            commtaxamt: null,
            totalamt: totalamt,
            duedate: dueDate,
            netgrossprem: policy.netgrossprem,
            duty: policy.duty,
            tax: policy.tax,
            totalprem: policy.totalprem,
            txtype2 :1,
            seqno:1,
            mainaccountcode: policy.agentCode2,
    

          },
          type: QueryTypes.INSERT
        }
      );
        //ov-out
        totalamt = policy.ovout2_amt/ policy.seqNoagt
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
            agentCode2: policy.agentCode2,
            policyNo: policy.policyNo,
            ovamt: policy.ovout_amt,
            ovtaxamt: null,
            totalamt: totalamt,
            duedate: dueDate,
            netgrossprem: policy.netgrossprem,
            duty: policy.duty,
            tax: policy.tax,
            totalprem: policy.totalprem,
            txtype2 :1,
            seqno:1,
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
    'select * from static_data."Policies" pol join static_data."InsureTypes" ins on ins.id = pol."insureID" ' +
    'where ' +
    'case when :insurerCode IS NOT NULL then "insurerCode" = :insurerCode else true end and ' +
    'case when :policyNo IS NOT NULL then "policyNo" = :policyNo else true end and ' +
    'case when :insureID IS NOT NULL then "insureID" = :insureID else true end and ' +
    'case when :createdAt IS NOT NULL then pol."createdAt" >= :createdAt else true end and ' +
    'case when :actDate IS NOT NULL then "actDate" >= :actDate else true end and  ' +
    'case when :agentCode IS NOT NULL then "agentCode" = :agentCode else true end and ' +
    'case when :itemList IS NOT NULL then "itemList" = :itemList else true end and ' +
    'status = :status',
    {
      replacements: {
        insurerCode: req.body.insurerCode,
        policyNo: req.body.policyNo,
        insureID: req.body.insureID,
        createdAt: req.body.createdAt,
        actDate: req.body.actDate,
        agentCode: req.body.agentCode,
        itemList: req.body.itemList,
        status : req.body.status,

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
    

      if(req.body[i][`commin_rate`] === null && req.body[i][`ovin_rate`] === null){
        req.body[i][`commin_rate`] = commov[0].rateComIn
        req.body[i][`commin_amt`] = commov[0].rateComIn * req.body[i][`netgrossprem`]
        req.body[i][`ovin_rate`] = commov[0].rateOVIn_1
        req.body[i][`ovin_amt`] = commov[0].rateOVIn_1 * req.body[i][`netgrossprem`] 
      }
      req.body[i][`commin_taxamt`] = req.body[i][`commin_amt`] *7/100
      req.body[i][`ovin_taxamt`] =  req.body[i][`ovin_amt`] *7/100

      if(req.body[i][`commout1_rate`] === null && req.body[i][`ovout1_rate`] === null){
        req.body[i][`commout1_rate`] = commov[0].rateComOut
        req.body[i][`commout1_amt`] = commov[0].rateComOut * req.body[i][`netgrossprem`]
        req.body[i][`ovout1_rate`] = commov[0].rateOVOut_1
        req.body[i][`ovout1_amt`] = commov[0].rateOVOut_1 * req.body[i][`netgrossprem`]
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
       if(req.body[i][`commout2_rate`] === null && req.body[i][`ovout2_rate`] === null ){
        req.body[i][`commout2_rate`] = commov2[0].rateComOut
        req.body[i][`commout2_amt`] = commov2[0].rateComOut * req.body[i][`netgrossprem`]
        req.body[i][`ovout2_rate`] = commov2[0].rateOVOut_1
        req.body[i][`ovout2_amt`] = commov2[0].rateOVOut_1 * req.body[i][`netgrossprem`]
       }
       req.body[i][`commout_rate`] = req.body[i][`commout1_rate`] + req.body[i][`commout2_rate`] 
        req.body[i][`commout_amt`] = req.body[i][`commout1_amt`] +req.body[i][`commout2_amt`]
        req.body[i][`ovout_rate`] = req.body[i][`ovout1_rate`] + req.body[i][`ovout2_rate`]
        req.body[i][`ovout_amt`] = req.body[i][`ovout1_amt`] + req.body[i][`ovout2_amt`]
        
      }else{
        req.body[i][`agentCode2`] = null
        req.body[i][`commout2_rate`] = null
        req.body[i][`commout2_amt`] = null
        req.body[i][`ovout2_rate`] = null
        req.body[i][`ovout2_amt`] = null
        req.body[i][`commout_rate`] = req.body[i][`commout1_rate`] 
        req.body[i][`commout_amt`] = req.body[i][`commout1_amt`]
        req.body[i][`ovout_rate`] = req.body[i][`ovout1_rate`]
        req.body[i][`ovout_amt`] = req.body[i][`ovout1_amt`]
      }

    
      //insert policy
      await sequelize.query(
        'insert into static_data."Policies" ("policyNo","applicationNo","insureeCode","insurerCode","agentCode","agentCode2","insureID","actDate", "expDate" ,grossprem, duty, tax, totalprem, ' +
        'commin_rate, commin_amt, ovin_rate, ovin_amt, commin_taxamt, ovin_taxamt, commout_rate, commout_amt, ovout_rate, ovout_amt, createusercode, "itemList", "policyDate","status", ' +
        'commout1_rate, commout1_amt, ovout1_rate, ovout1_amt, commout2_rate, commout2_amt, ovout2_rate, ovout2_amt, "seqNoins", "seqNoagt",netgrossprem) ' +
        // 'values (:policyNo, (select "insureeCode" from static_data."Insurees" where "entityID" = :entityInsuree), '+
        'values (:policyNo, :applicationNo, :insureeCode, ' +
        '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
        ':agentCode, :agentCode2, (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass), ' +
        ':actDate, :expDate, :grossprem, :duty, :tax, :totalprem, ' +
        ':commin_rate, :commin_amt, :ovin_rate, :ovin_amt, :commin_taxamt, :ovin_taxamt, :commout_rate, :commout_amt, :ovout_rate, :ovout_amt, :createusercode, :itemList ,:policyDate,\'A\', ' +
        ' :commout1_rate, :commout1_amt, :ovout1_rate, :ovout1_amt,  :commout2_rate, :commout2_amt, :ovout2_rate, :ovout2_amt, :seqNoins, :seqNoagt,:netgrossprem)',
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
            commin_rate: req.body[i][`commin_rate`],
            commin_amt: req.body[i][`commin_amt`],
            ovin_rate: req.body[i][`ovin_rate`],
            ovin_amt: req.body[i][`ovin_amt`],
            commin_taxamt: req.body[i][`commin_taxamt`],
            ovin_taxamt: req.body[i][`ovin_taxamt`],
            commout_rate: req.body[i][`commout_rate`],
            commout_amt: req.body[i][`commout_amt`],
            ovout_rate: req.body[i][`ovout_rate`],
            ovout_amt: req.body[i][`ovout_amt`],
            commout1_rate: req.body[i][`commout1_rate`],
            commout1_amt: req.body[i][`commout1_amt`],
            ovout1_rate: req.body[i][`ovout1_rate`],
            ovout1_amt: req.body[i][`ovout1_amt`],
            commout2_rate: req.body[i][`commout2_rate`],
            commout2_amt: req.body[i][`commout2_amt`],
            ovout2_rate: req.body[i][`ovout2_rate`],
            ovout2_amt: req.body[i][`ovout2_amt`],
            createusercode: "kwanjai",
            itemList: cars[0].id,
            netgrossprem: req.body[i].grossprem,
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
    //         commamt = req.body[i].commout_amt
    //         totalamt = req.body[i].commout_amt
    //         dueDate.setDate(dueDate.getDate() + agent[0].commovCreditT);
  
    //       } else if (setupcom[j][1] === 'OV-OUT') {
    //         subType = -1
    //         ovamt = req.body[i].ovout_amt
    //         totalamt = req.body[i].ovout_amt
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
    //       commamt = req.body[i].commout_amt/
    //       totalamt = req.body[i].commout_amt
    //       dueDate.setDate(dueDate.getDate() + agent[0].commovCreditT);

    //     } else if (setupcom[j][1] === 'OV-OUT') {
    //       subType = -1
    //       ovamt = req.body[i].ovout_amt
    //       totalamt = req.body[i].ovout_amt
    //       dueDate.setDate(dueDate.getDate() + agent[0].commovCreditT);

    //     } else if (setupcom[j][1] === 'COMM-IN') {
    //       subType = 1
    //       commamt = req.body[i].commin_amt
    //       totalamt = req.body[i].commin_amt
    //       dueDate.setDate(dueDate.getDate() + insurer[0].commovCreditT);

    //     } else if (setupcom[j][1] === 'OV-IN') {
    //       subType = 1
    //       ovamt = req.body[i].ovin_amt
    //       totalamt = req.body[i].ovin_amt
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

const draftPolicyList = async (req, res) => {

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
    

      if(req.body[i][`commin_rate`] === null && req.body[i][`ovin_rate`] === null){
        req.body[i][`commin_rate`] = commov[0].rateComIn
        req.body[i][`commin_amt`] = commov[0].rateComIn * req.body[i][`netgrossprem`]
        req.body[i][`ovin_rate`] = commov[0].rateOVIn_1
        req.body[i][`ovin_amt`] = commov[0].rateOVIn_1 * req.body[i][`netgrossprem`] 
      }
      req.body[i][`commin_taxamt`] = req.body[i][`commin_amt`] *7/100
      req.body[i][`ovin_taxamt`] =  req.body[i][`ovin_amt`] *7/100

      if(req.body[i][`commout1_rate`] === null && req.body[i][`ovout1_rate`] === null){
        req.body[i][`commout1_rate`] = commov[0].rateComOut
        req.body[i][`commout1_amt`] = commov[0].rateComOut * req.body[i][`netgrossprem`]
        req.body[i][`ovout1_rate`] = commov[0].rateOVOut_1
        req.body[i][`ovout1_amt`] = commov[0].rateOVOut_1 * req.body[i][`netgrossprem`]
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
       if(req.body[i][`commout2_rate`] === null && req.body[i][`ovout2_rate`] === null ){
        req.body[i][`commout2_rate`] = commov2[0].rateComOut
        req.body[i][`commout2_amt`] = commov2[0].rateComOut * req.body[i][`netgrossprem`]
        req.body[i][`ovout2_rate`] = commov2[0].rateOVOut_1
        req.body[i][`ovout2_amt`] = commov2[0].rateOVOut_1 * req.body[i][`netgrossprem`]
       }
       req.body[i][`commout_rate`] = req.body[i][`commout1_rate`] + req.body[i][`commout2_rate`] 
        req.body[i][`commout_amt`] = req.body[i][`commout1_amt`] +req.body[i][`commout2_amt`]
        req.body[i][`ovout_rate`] = req.body[i][`ovout1_rate`] + req.body[i][`ovout2_rate`]
        req.body[i][`ovout_amt`] = req.body[i][`ovout1_amt`] + req.body[i][`ovout2_amt`]
        
      }else{
        req.body[i][`agentCode2`] = null
        req.body[i][`commout2_rate`] = null
        req.body[i][`commout2_amt`] = null
        req.body[i][`ovout2_rate`] = null
        req.body[i][`ovout2_amt`] = null
        req.body[i][`commout_rate`] = req.body[i][`commout1_rate`] 
        req.body[i][`commout_amt`] = req.body[i][`commout1_amt`]
        req.body[i][`ovout_rate`] = req.body[i][`ovout1_rate`]
        req.body[i][`ovout_amt`] = req.body[i][`ovout1_amt`]
      }

    
      //insert policy
      await sequelize.query(
        'insert into static_data."Policies" ("applicationNo","insureeCode","insurerCode","agentCode","agentCode2","insureID","actDate", "expDate" ,grossprem, duty, tax, totalprem, ' +
        'commin_rate, commin_amt, ovin_rate, ovin_amt, commin_taxamt, ovin_taxamt, commout_rate, commout_amt, ovout_rate, ovout_amt, createusercode, "itemList","status", ' +
        'commout1_rate, commout1_amt, ovout1_rate, ovout1_amt, commout2_rate, commout2_amt, ovout2_rate, ovout2_amt, "seqNoins", "seqNoagt",netgrossprem) ' +
        // 'values (:policyNo, (select "insureeCode" from static_data."Insurees" where "entityID" = :entityInsuree), '+
        'values ( :applicationNo, :insureeCode, ' +
        '(select "insurerCode" from static_data."Insurers" where "insurerCode" = :insurerCode), ' +
        ':agentCode, :agentCode2, (select "id" from static_data."InsureTypes" where "class" = :class and  "subClass" = :subClass), ' +
        ':actDate, :expDate, :grossprem, :duty, :tax, :totalprem, ' +
        ':commin_rate, :commin_amt, :ovin_rate, :ovin_amt, :commin_taxamt, :ovin_taxamt, :commout_rate, :commout_amt, :ovout_rate, :ovout_amt, :createusercode, :itemList ,\'I\', ' +
        ' :commout1_rate, :commout1_amt, :ovout1_rate, :ovout1_amt,  :commout2_rate, :commout2_amt, :ovout2_rate, :ovout2_amt, :seqNoins, :seqNoagt,:netgrossprem)',
        {
          replacements: {
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
            netgrossprem: req.body[i].grossprem,
            duty: req.body[i].duty,
            tax: req.body[i].tax,
            totalprem: req.body[i].totalprem,
            commin_rate: req.body[i][`commin_rate`],
            commin_amt: req.body[i][`commin_amt`],
            ovin_rate: req.body[i][`ovin_rate`],
            ovin_amt: req.body[i][`ovin_amt`],
            commin_taxamt: req.body[i][`commin_taxamt`],
            ovin_taxamt: req.body[i][`ovin_taxamt`],
            commout_rate: req.body[i][`commout_rate`],
            commout_amt: req.body[i][`commout_amt`],
            ovout_rate: req.body[i][`ovout_rate`],
            ovout_amt: req.body[i][`ovout_amt`],
            commout1_rate: req.body[i][`commout1_rate`],
            commout1_amt: req.body[i][`commout1_amt`],
            ovout1_rate: req.body[i][`ovout1_rate`],
            ovout1_amt: req.body[i][`ovout1_amt`],
            commout2_rate: req.body[i][`commout2_rate`],
            commout2_amt: req.body[i][`commout2_amt`],
            ovout2_rate: req.body[i][`ovout2_rate`],
            ovout2_amt: req.body[i][`ovout2_amt`],
            createusercode: "kwanjai",
            itemList: cars[0].id,
            
          },
          type: QueryTypes.INSERT
        }
      )


    })


  }


  await res.json({ status: 'success' })
};

const editPolicyList = async (req, res) => {

  for (let i = 0; i < req.body.length; i++) {

    
      //update policy
      await sequelize.query(
       `update static_data."Policies" 
       SET "policyNo" = :policyNo,  grossprem = :grossprem, duty = :duty, tax = :tax, totalprem = :totalprem, 
       commin_rate = :commin_rate, commin_amt = :commin_amt, ovin_rate = :ovin_rate, ovin_amt = :ovin_amt, commin_taxamt = :commin_taxamt, 
       ovin_taxamt = :ovin_taxamt, commout_rate = :commout_rate, commout_amt = :commout_amt, ovout_rate = :ovout_rate, ovout_amt = :ovout_amt, 
      "policyDate" = :policyDate, "status" = 'A', commout1_rate = :commout1_rate, commout1_amt = :commout1_amt, ovout1_rate = :ovout1_rate, 
      ovout1_amt = :ovout1_amt, commout2_rate = :commout2_rate, commout2_amt = :commout2_amt, ovout2_rate = :ovout2_rate, ovout2_amt = :ovout2_amt,
      "seqNoins" = :seqNoins, "seqNoagt" = :seqNoagt
      WHERE "applicationNo" = :applicationNo and "status" = 'I' `,
        {
          replacements: {
            policyNo: req.body[i].policyNo,
            applicationNo: req.body[i].applicationNo,
            seqNoins: req.body[i].seqNoins,
            seqNoagt: req.body[i].seqNoagt,
            grossprem: req.body[i].grossprem,
            duty: req.body[i].duty,
            tax: req.body[i].tax,
            totalprem: req.body[i].totalprem,
            commin_rate: req.body[i][`commin_rate`],
            commin_amt: req.body[i][`commin_amt`],
            ovin_rate: req.body[i][`ovin_rate`],
            ovin_amt: req.body[i][`ovin_amt`],
            commin_taxamt: req.body[i][`commin_taxamt`],
            ovin_taxamt: req.body[i][`ovin_taxamt`],
            commout_rate: req.body[i][`commout_rate`],
            commout_amt: req.body[i][`commout_amt`],
            ovout_rate: req.body[i][`ovout_rate`],
            ovout_amt: req.body[i][`ovout_amt`],
            commout1_rate: req.body[i][`commout1_rate`],
            commout1_amt: req.body[i][`commout1_amt`],
            ovout1_rate: req.body[i][`ovout1_rate`],
            ovout1_amt: req.body[i][`ovout1_amt`],
            commout2_rate: req.body[i][`commout2_rate`],
            commout2_amt: req.body[i][`commout2_amt`],
            ovout2_rate: req.body[i][`ovout2_rate`],
            ovout2_amt: req.body[i][`ovout2_amt`],
            policyDate:  new Date().toJSON().slice(0, 10),
            
          },
          type: QueryTypes.INSERT
        }
      )

      //insert transaction 
      createTransection(req.body[i])
    }


  


  await res.json({ status: 'success' })
};


module.exports = {

  getPolicy,
  getPolicyList,
  newPolicy,
  getTransactionByid,
  newPolicyList,   //create policy status A from excel and add ARAP
  draftPolicyList, //create policy status I from excel
  editPolicyList, // change status I ->A and add ARAP
  // postCar,
  // removeCar,
  // editCar,
};