const TURUN = require("../../models").TURUN;

const process = require('process');
require('dotenv').config();
const { throws } = require("assert");

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
// getRunNo ลอกมาจาก iia
// brCode = ยังไม่ใช้
//RunType = บอกว่าเป็น runno ของค่าอะไร ,
// Paramclass, subclass -> ในกรณีที่เลข runno แบ่งย่อยตาม class/subclass ประกัน 
// outletcode -> ยังไม่ใช้
const getRunNo = async (req,res) => {

    //public static long GetRunNo(string BrCode, string RunType, string ParamClass, string SubClass, string OutletCode, string UpdateUserCode, DateTime EffectiveDate)
 
    let RunNo = 0;
    let RunType = req.runtype
    let ParamClass = req.paramclass
    let SubClass = req.subclass
    let UpdateUserCode = req.usercode
    let EffectiveDate = req.effdate

    try {

        await sequelize.authenticate();
        await sequelize.query('set lock_timeout = 5000');
        await sequelize.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
        const transaction = await sequelize.transaction();

        //table TURUNT
          const basisResult = await sequelize.query(`SELECT "PeriodBasis" FROM static_data."TURUNT" WHERE "RunType" = '${RunType}'`, { type: sequelize.QueryTypes.SELECT });
    if (basisResult.length === 0) {
      throw new Error(`RunType: ${RunType} not found in TURUNT !`);
    }
    const basis = basisResult[0].PeriodBasis.trim();

    const condition = {
        RunType,
      };
      if (ParamClass === '') {
        condition.Class = null;
      } else {
        condition.Class = ParamClass;
      }
      if (SubClass === '') {
        condition.SubClass = null;
      } else {
        condition.SubClass = SubClass;
      }
      
      if (basis !== '') {
        if (basis === 'D') {
          condition.EffectiveDate = EffectiveDate;
        } else {
          condition.EffectiveDate = sequelize.where(sequelize.fn('YEAR', sequelize.col('EffectiveDate')), EffectiveDate.getFullYear());
          if (basis === 'M') {
            condition.EffectiveDate = sequelize.and(condition.EffectiveDate, sequelize.where(sequelize.fn('MONTH', sequelize.col('EffectiveDate')), EffectiveDate.getMonth() + 1));
          }
        }
      }

      const turunResult = await TURUN.findOne({ where: condition, transaction });
    let RunID = 0;

    if (!turunResult) {
      RunID = 0;
    } else {
      RunID = turunResult.RunID;
      try {
        await TURUN.update({ xlock: 'A' }, { where: {  RunID: RunID.toString() }, transaction });
      } catch (error) {
        RunNo = -999;
        throw new Error('TURUN: Record is Locked!!');
      }
    }

    const updatedTurunResult = await TURUN.findOne({ where: {  RunID: RunID.toString() }, transaction });
    if (updatedTurunResult) {
      RunNo = updatedTurunResult.LastNo + 1;
      await TURUN.update({
        LastNo: RunNo,
        UpdateDate: sequelize.fn('current'),
        UpdateUserCode,
      }, {
        where: {  RunID: RunID.toString() },
        transaction,
      });
    } else {
      const maxRunIDResult = await sequelize.query(`SELECT MAX("RunID") FROM static_data."TURUN" `, { type: sequelize.QueryTypes.SELECT, transaction });
      if (maxRunIDResult[0]['max'] === null) {
        RunID = 1;
      } else {
        RunID = maxRunIDResult[0]['max'] + 1;
      }
      RunNo = 1;

      let effDateRunNo = '';
      let pClass = '';
      let pSubClass = '';

          if (basis === 'Y') {
        effDateRunNo = EffectiveDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
      } else if (basis === 'M') {
        effDateRunNo = EffectiveDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
      } else {
        effDateRunNo = EffectiveDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
      }
      pClass = ParamClass === '' ? null : ParamClass;
      pSubClass = SubClass === '' ? null : SubClass;

      await TURUN.create({
        RunID,
        RunType,
        Class: pClass,
        SubClass: pSubClass,
        EffectiveDate,
        LastNo: RunNo,
        UpdateDate: sequelize.fn('current'),
        UpdateUserCode,
      }, { transaction });
    }
    await transaction.commit();
} catch (error) {
    throw error;
}


    return RunNo;



}

const testRunno =  async (req,res) =>{

  //deaw ma tum tor
    const result = await getRunNo(req.body,{})
   await res.json({result: result})
}
module.exports = {

testRunno

};