const Policy = require("../models").Policy;
const Transaction = require("../models").Transaction;
const CommOVIn = require("../models").CommOVIn; //imported fruits array
const CommOVOut = require("../models").CommOVOut;
const b_jabilladvisor = require('../models').b_jabilladvisor;
const b_jabilladvisordetail = require('../models').b_jabilladvisordetail;
const process = require('process');
const runningno = require('./lib/runningno');
require('dotenv').config();
// const Package = require("../models").Package;
// const User = require("../models").User;
const { Op, QueryTypes, Sequelize } = require("sequelize");

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

const findPolicyARPremIn = async (req,res) => {

    const trans = await sequelize.query(
        `select t."agentCode", t."insurerCode", 
        t."dueDate", t."policyNo", t."endorseNo", j."invoiceNo", t."seqNo" ,
        (select "id" from static_data."Insurees" where "insureeCode" = p."insureeCode" ) as customerid, 
        (select "t_firstName"||' '||"t_lastName"  as insureeName from static_data."Entities" where id =
        (select "entityID" from static_data."Insurees" where "insureeCode" = p."insureeCode" ) ) as insureeName , 
       
        j.polid, (select "licenseNo" from static_data."Motors" where id = p."itemList") , (select  "chassisNo" from static_data."Motors" where id = p."itemList"), j.netgrossprem, j.duty, j.tax, j.totalprem, j.commout_rate,
        j.commout_amt, j.ovout_rate, j.ovout_amt, t.netflag, t.remainamt
        from static_data."Transactions" t 
        join static_data.b_jupgrs j on t.polid = j.polid and t."seqNo" = j."seqNo" 
        join static_data."Policies" p on p.id = j.polid
        where p."policyNo" >='pol' and  p."policyNo" <='pol' and t."transType" = 'PREM-IN' `,
        {
            replacements: {
                billadvisorno: req.body.billadvisorno,
              },
              type: QueryTypes.SELECT
        }
    )      
        if (trans.length === 0) {
          await res.status(201).json({msg:"not found policy"})
        }else{

          await res.json({billdata: records, trans : trans})
        }
  
  
}

const getbilldata = async (req,res) => {

    const records = await sequelize.query(
        'select (select "insurerCode" from static_data."Insurers" where id = insurerno ), '+
        '(select "agentCode" from static_data."Agents" where id = advisorno ), *  from static_data.b_jabilladvisors '+
        'where active =\'Y\' and billadvisorno = :billadvisorno ',
            {
              replacements: {
                billadvisorno: req.body.billadvisorno,
              },
              type: QueryTypes.SELECT
            }
          );
    const trans = await sequelize.query(
        `select t."agentCode", t."insurerCode", 
        t."dueDate", t."policyNo", t."endorseNo", j."invoiceNo", t."seqNo" ,
        (select "id" from static_data."Insurees" where "insureeCode" = p."insureeCode" ) as customerid, 
        (select "t_firstName"||' '||"t_lastName"  as insureeName from static_data."Entities" where id =
        (select "entityID" from static_data."Insurees" where "insureeCode" = p."insureeCode" ) ) as insureeName , 
       
        j.polid, (select "licenseNo" from static_data."Motors" where id = p."itemList") , (select  "chassisNo" from static_data."Motors" where id = p."itemList"), j.netgrossprem, j.duty, j.tax, j.totalprem, j.commout_rate,
        j.commout_amt, j.ovout_rate, j.ovout_amt, t.netflag, t.remainamt
        from static_data."Transactions" t 
        join static_data.b_jupgrs j on t.polid = j.polid and t."seqNo" = j."seqNo" 
        join static_data."Policies" p on p.id = j.polid
        where t.billadvisor = :billadvisorno and t."transType" = 'PREM-IN' `,
        {
            replacements: {
                billadvisorno: req.body.billadvisorno,
              },
              type: QueryTypes.SELECT
        }
    )      
        if (records.length === 0) {
          await res.status(201).json({msg:"not found billadvisorno"})
        }else{

          await res.json({billdata: records, trans : trans})
        }
  
}


const getcashierdata = async (req,res) => {

    const records = await sequelize.query(
        'select  *  from static_data.b_jacashiers '+
        'where cashierreceiveno = :cashierreceiveno ',
            {
              replacements: {
                cashierreceiveno : req.body.CashierReceiveNo,
              },
              type: QueryTypes.SELECT
            }
          );
          
        if (records.length === 0) {
          await res.status(201).json({msg:"not found cashierno"})
        }else{

          await res.json(records)
        }
  
}


const saveARPremin = async (req,res) =>{

    const t = await sequelize.transaction();
    try{
  
    
        //insert to master jaarap
        const billdate = new Date().toISOString().split('T')[0]
        // const billno = 'B' +  Date.now()
        req.body.master.xxx = 'BILL' + await runningno.getRunNo('bill',null,null,'kw','2023-09-05');
        const arPremIn = await sequelize.query(
          `insert into static_data.b_jaaraps (billadvisorno, cashierreceiveno, cashieramt, insurerno, advisorno, type, transactiontype, actualvalue, diffamt, status, 
            createusercode )
          values( :billadvisorno, :cashierreceiveno, :cashieramt, :insurerno, :advisorno, :type, :transactiontype, :actualvalue, :diffamt, :status, 
            :createusercode ) `,
              {
                replacements: {
                    billadvisorno: req.body.master.billadvisorno,
                    cashierreceiveno: req.body.master.cashierreceiveno,
                    cashieramt : req.body.master.cashieramt,
                    insurerno : req.body.master.insurerno,
                    advisorno : req.body.master.advisorno,
                    type : 'AR',
                    transactiontype : "PREM-IN",
                    actualvalue : req.body.master.actualvalue ,
                    diffamt : req.body.master.diffamt,
                    status : 'I',
                    createusercode : "kkk", 
                 
                  billdate: billdate,
                  createusercode: "kewn"
                },
                transaction: t ,
                type: QueryTypes.INSERT
              }
            );
        for (let i = 0; i < req.body.trans.length; i++) {
            //insert to deteil of jaarapds
            sequelize.query(
              `insert into static_data.b_jaarapds (keyidm, polid, "policyNo", "endorseNo", "invoiceNo", "seqNo", netflag, netamt) 
              values( :keyidm , (select id from static_data."Policies" where "policyNo" = :policyNo ), :policyNo, :endorseNo, :invoiceNo, :seqNo, :netflag, :netamt)`,
                  {
                    replacements: {
                      keyidm: arPremIn[0][0].id,
                      policyNo: req.body.trans[i].policyNo,
                      endorseNo: req.body.trans[i].endorseNo,
                      invoiceNo: req.body.trans[i].invoiceNo,
                      seqNo: req.body.trans[i].seqNo,
                      netflag: req.body.trans[i].netflag,
                      netamt: req.body.trans[i].netamt,
                    },
                    transaction: t ,
                    type: QueryTypes.INSERT
                    
                  }
                );
  
              }
              console.log(billadvisors[0][0].id);
              //update ARAP table
              await sequelize.query(
                'DO $$ '+
                  'DECLARE a_polid int; a_billadvisorno text; a_netflag text; a_seqno int;'+
                  'BEGIN FOR a_polid,a_billadvisorno,a_netflag, a_seqno IN '+
                      'SELECT polid, billadvisorno, netflag ,seqno FROM static_data.b_jabilladvisors m JOIN static_data.b_jabilladvisordetails d ON m.id = d.keyidm WHERE m.active = \'Y\' and m.id =  '+ billadvisors[0][0].id +
                  ' LOOP  '+
                  'UPDATE static_data."Transactions" SET billadvisor = a_billadvisorno, netflag = a_netflag WHERE polid = a_polid and "seqNo" = a_seqno ; '+
                  'END LOOP; '+
                'END $$;',{
                  transaction: t ,
                }
                
              )
              await t.commit();
          } catch (error) {
            console.log(error);
            await t.rollback();
  
            }
          
          
          await res.json({msg:`created billadvisorNO : ${req.body.bill.billadvisor} success!!` })
  }


  const submitARPremin = async (req,res) =>{

    const t = await sequelize.transaction();
    try{
  
    
        //insert to master jaarap
        const billdate = new Date().toISOString().split('T')[0]
        // const billno = 'B' +  Date.now()
        req.body.master.xxx = 'BILL' + await runningno.getRunNo('bill',null,null,'kw','2023-09-05');
        const arPremIn = await sequelize.query(
          `insert into static_data.b_jaaraps (billadvisorno, cashierreceiveno, cashieramt, insurerno, advisorno, type, transactiontype, actualvalue, diffamt, status, 
            createusercode, dfrpreferno, rprefdate, transactiontype, netprem, commin, 
            vatcommin, ovin, vatovin, whtcommout, whtovout, )
          values( :billadvisorno, :cashierreceiveno, :cashieramt, :insurerno, :advisorno, :type, :transactiontype, :actualvalue, :diffamt, :status, 
            :createusercode,   1, 1, 1, 1, 1, 1,'1', 100, 100, 200, 'kku') `,
              {
                replacements: {
                    billadvisorno: req.body.master.billadvisorno,
                    cashierreceiveno: req.body.master.cashierreceiveno,
                    cashieramt : req.body.master.cashieramt,
                    insurerno : req.body.master.insurerno,
                    advisorno : req.body.master.advisorno,
                    type : 'AR',
                    transactiontype : "PREM-IN",
                    actualvalue : req.body.master.actualvalue ,
                    diffamt : req.body.master.diffamt,
                    status : 'I',
                    createusercode : "kkk", 
                 
                  billdate: billdate,
                  createusercode: "kewn",
                  amt:req.body.bill.amt,
                  cashierreceiptno:null,
                },
                transaction: t ,
                type: QueryTypes.INSERT
              }
            );
        for (let i = 0; i < req.body.detail.length; i++) {
            //insert to deteil of jabilladvisor
            sequelize.query(
              'insert into static_data.b_jabilladvisordetails (keyidm, polid, customerid, motorid, grossprem, duty, tax, totalprem, "comm-out%", "comm-out-amt", '+
              ' "ov-out%", "ov-out-amt", netflag, billpremium,updateusercode, seqno) '+
              'values (:keyidm, (select id from static_data."Policies" where "policyNo" = :policyNo limit 1), (select id from static_data."Insurees" where "insureeCode" = :insureeCode limit 1), :motorid, '+
              ':grossprem, :duty, :tax, :totalprem, :commout_rate, :commout_amt, :ovout_rate, :ovout_amt, :netflag, :billpremium, :updateusercode, :seqno) ',
                  {
                    replacements: {
                      keyidm: billadvisors[0][0].id,
                      policyNo: req.body.detail[i].policyNo,
                      insureeCode: req.body.detail[i].insureeCode,
                      motorid: req.body.detail[i].itemList || null,
                      grossprem: req.body.detail[i].grossprem,
                      duty: req.body.detail[i].duty,
                      tax: req.body.detail[i].tax,
                      totalprem: req.body.detail[i].totalprem,
                      commout_rate: req.body.detail[i].commout_rate,
                      commout_amt: req.body.detail[i].commout_amt,
                      ovout_rate: req.body.detail[i].ovout_rate,
                      ovout_amt: req.body.detail[i].ovout_amt,
                      netflag: req.body.detail[i].statementtype,
                      billpremium: req.body.detail[i].billpremium,
                      updateusercode: "kewn",
                      seqno: req.body.detail[i].seqNo,
                    },
                    transaction: t ,
                    type: QueryTypes.INSERT
                    
                  }
                );
  
              }
              console.log(billadvisors[0][0].id);
              //update ARAP table
              await sequelize.query(
                'DO $$ '+
                  'DECLARE a_polid int; a_billadvisorno text; a_netflag text; a_seqno int;'+
                  'BEGIN FOR a_polid,a_billadvisorno,a_netflag, a_seqno IN '+
                      'SELECT polid, billadvisorno, netflag ,seqno FROM static_data.b_jabilladvisors m JOIN static_data.b_jabilladvisordetails d ON m.id = d.keyidm WHERE m.active = \'Y\' and m.id =  '+ billadvisors[0][0].id +
                  ' LOOP  '+
                  'UPDATE static_data."Transactions" SET billadvisor = a_billadvisorno, netflag = a_netflag WHERE polid = a_polid and "seqNo" = a_seqno ; '+
                  'END LOOP; '+
                'END $$;',{
                  transaction: t ,
                }
                
              )
              await t.commit();
          } catch (error) {
            console.log(error);
            await t.rollback();
  
            }
          
          
          await res.json({msg:`created billadvisorNO : ${req.body.bill.billadvisor} success!!` })
  }

const findPolicyByBillno = async (req,res) => {

  const records = await sequelize.query(
    'select * from   static_data."Transactions"  tran join static_data."Policies" pol   on tran."policyNo" = pol."policyNo" where tran.billadvisor = :billadvisor  and "transType" = \'PREM-IN\'',
        {
          replacements: {
            billadvisor: req.body.billadvisor
          },
          type: QueryTypes.SELECT
        }
      );
      const old_keyid = await sequelize.query('select id from static_data.b_jabilladvisors where billadvisorno = :billadvisor',{
        replacements: {
          billadvisor: req.body.billadvisor
        },
        type: QueryTypes.SELECT
      })

      if (records.length === 0) {
        await res.status(201).json({msg:"not found policy in bill"})
      }else{

        await res.json({data:records, old_keyid: old_keyid[0].id})
      }

}



const findbilladvisor =async (req,res) =>{
  
  const records = await sequelize.query(
    'select (select "insurerCode" from static_data."Insurers" where id = insurerno ), '+
    '(select "agentCode" from static_data."Agents" where id = advisorno ), *  from static_data.b_jabilladvisors '+
    'where 1=1 and cashierreceiptno is null '+ 
    'and active =\'Y\' '+
    'and (case when :insurerid is null then true else insurerno = :insurerid end) '+ 
    'and (case when :agentid is null then true else advisorno = :agentid end) '+
    'and (case when :billadvisorno is null then true else billadvisorno = :billadvisorno end) '+
    'and (case when :billdate is null then true else billdate <= :billdate end) ',
        {
          replacements: {
            insurerid: req.body.insurerid,
            agentid:req.body.agentid,
            billadvisorno: req.body.billadvisorno,
            billdate: req.body.billdate,
          },
          type: QueryTypes.SELECT
        }
      );
      
  await res.json(records)
}

const getbilladvisordetail =async (req,res) =>{
  
  const records = await sequelize.query(
    'select *   from  static_data.b_jabilladvisordetails d '+
    'join  static_data."Policies" pol on pol.id = d.polid '+
    'where 1=1 and d.keyidm = :keymid',
        {
          replacements: {
            keymid: req.body.keymid,
          },
          type: QueryTypes.SELECT
        }
      );

  await res.json(records)
}

const editbilladvisor = async (req,res) =>{
  //insert new bill to master jabilladvisor
  const t = await sequelize.transaction();
  try{

    req.body.bill.billadvisor = 'BILL' + await runningno.getRunNo('bill',null,null,'kw','2023-09-05');
  const billadvisors = await sequelize.query(
    'INSERT INTO static_data.b_jabilladvisors (insurerno, advisorno, billadvisorno, billdate, createusercode, amt, cashierreceiptno, active, old_keyid ) ' +
    'VALUES ((select id from static_data."Insurers" where "insurerCode" = :insurerCode), '+
    '(select id from static_data."Agents" where "agentCode" = :agentCode), '+
    ':billadvisorno, :billdate, :createusercode, :amt, :cashierreceiptno, \'Y\', :old_keyid) RETURNING "id"',
        {
          replacements: {
            insurerCode:req.body.bill.insurerCode,
            agentCode:req.body.bill.agentCode,
            billadvisorno: req.body.bill.billadvisorno,
            billdate: new Date(),
            createusercode: "kewn",
            amt:req.body.bill.amt,
            cashierreceiptno:null,
            old_keyid: req.body.bill.old_keyid,
          },
          transaction: t ,
          type: QueryTypes.INSERT
        }
      );

      //update status old bill
       await sequelize.query(
        'UPDATE static_data.b_jabilladvisors SET active = \'N\', inactiveusercode = :inactiveusercode, inactivedate = :inactivedate WHERE id = :old_keyid ;',
            {
              replacements: {
                inactivedate: new Date(),
                inactiveusercode: "kewneditja",
                old_keyid: req.body.bill.old_keyid,
              },
              transaction: t ,
              type: QueryTypes.INSERT
            }
          );

  for (let i = 0; i < req.body.detail.length; i++) {
      //insert to deteil of jabilladvisor
      await sequelize.query(
        'insert into static_data.b_jabilladvisordetails (keyidm, polid, customerid, motorid, grossprem, duty, tax, totalprem, "comm-out%", "comm-out-amt", '+
        ' "ov-out%", "ov-out-amt", netflag, billpremium,updateusercode) '+
        'values (:keyidm, (select id from static_data."Policies" where "policyNo" = :policyNo), (select id from static_data."Insurees" where "insureeCode" = :insureeCode), :motorid, '+
        ':grossprem, :duty, :tax, :totalprem, :commout_rate, :commout_amt, :ovout_rate, :ovout_amt, :netflag, :billpremium, :updateusercode) ',
            {
              replacements: {
                keyidm: billadvisors[0][0].id,
                policyNo: req.body.detail[i].policyNo,
                insureeCode: req.body.detail[i].insureeCode,
                motorid: req.body.detail[i].itemList,
                grossprem: req.body.detail[i].grossprem,
                duty: req.body.detail[i].duty,
                tax: req.body.detail[i].tax,
                totalprem: req.body.detail[i].totalprem,
                commout_rate: req.body.detail[i].commout_rate,
                commout_amt: req.body.detail[i].commout_amt,
                ovout_rate: req.body.detail[i].ovout_rate,
                ovout_amt: req.body.detail[i].ovout_amt,
                netflag: req.body.detail[i].netflag,
                billpremium: req.body.detail[i].billpremium,
                updateusercode: "kewn",
              },
              transaction: t ,
              type: QueryTypes.INSERT
            }
          );

        }
        console.log('oldkeyid : ' +req.body.bill.old_keyid);
        console.log('billid : ' +billadvisors[0][0].id);
        //update ARAP table remove old billadvisor && netflag then update
        await sequelize.query(
          `DO $$ 
          DECLARE 
            a_polid int; 
            a_billadvisorno text; 
            a_netflag text; 
          BEGIN 
            -- Update rows where billadvisor matches
            UPDATE static_data."Transactions" 
            SET billadvisor = null, netflag = null 
            WHERE billadvisor = (SELECT billadvisor FROM static_data.b_jabilladvisors WHERE id = ${req.body.bill.old_keyid} ); 
            
            -- Loop through selected rows and update
            FOR a_polid, a_billadvisorno, a_netflag IN 
              SELECT d.polid, m.billadvisorno, d.netflag 
              FROM static_data.b_jabilladvisordetails d 
              JOIN static_data.b_jabilladvisors m ON m.id = d.keyidm 
              WHERE m.active = 'Y' AND m.id = ${billadvisors[0][0].id} 
            LOOP
              UPDATE static_data."Transactions" 
              SET billadvisor = a_billadvisorno, netflag = a_netflag 
              WHERE polid = a_polid; 
            END LOOP; 
          END $$;`,
          { 
          transaction: t ,
          raw: true 
        }
        )

        await t.commit();

     } catch (error) {
      console.log(error);
      await t.rollback();
      }
    await res.json({msg:"success!!"})
}

const createcashier = async (req,res) =>{
  //deaw ma tum tor
  const cashier = await sequelize.query(
    'insert into static_data.b_jacashiers (billadvisorno, cashierreceiven, cashierdate, ARNO, transactiontype, insurercode,advisorcode, customerid, '+
    'receivefrom, receivename, receivetype, "partnerBank", "partnerBankbranch", "partnerAccountno", amt, createusercode, "amityBank", "amityBankbranch", "amityAccountno") '+
    'values ()',
        {
          replacements: {
            insurerID:req.body.bill.insurerID,
            agentID:req.body.bill.agentID,
            billadvisorno: req.body.bill.billadvisorno,
            billdate: Date.now(),
            createusercode: "kewn",
            amt:req.body.bill.amt,
            cashierreceiptno:null,
          },
          type: QueryTypes.INSERT
        }
      );
  
    
    await res.json({msg:"success!!"})
}

module.exports = {

    getbilldata,
    getcashierdata,
  createbilladvisor,
  findbilladvisor,
  getbilladvisordetail,
  editbilladvisor
};