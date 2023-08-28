const TURUN = require("../models").TURUN;

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

const getRunNo = async (BrCode, RunType, ParamClass, SubClass, OutletCode, UpdateUserCode, EffectiveDate) => {

    //public static long GetRunNo(string BrCode, string RunType, string ParamClass, string SubClass, string OutletCode, string UpdateUserCode, DateTime EffectiveDate)

    let RunNo = 0;
    BrCode = BrCode.Trim();
    RunType = RunType.Trim();
    ParamClass = ParamClass.Trim();
    SubClass = SubClass.Trim();
    OutletCode = OutletCode.Trim();
    UpdateUserCode = UpdateUserCode.Trim();


    try {

        await sequelize.authenticate();
        await sequelize.query('SET lock mode to wait 5');
        await sequelize.query('SET isolation to repeatable read');
        const transaction = await sequelize.transaction();

        //table TURUNT
          const basisResult = await sequelize.query(`SELECT PeriodBasis FROM TURUNT WHERE RunType = '${RunType}'`, { type: sequelize.QueryTypes.SELECT });
    if (basisResult.length === 0) {
      throw new Error(`RunType: ${RunType} not found in TURUNT !`);
    }
    const basis = basisResult[0].PeriodBasis.trim();

    const condition = {
        BrCode,
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
      if (OutletCode === '') {
        condition.Outlet = null;
      } else {
        condition.Outlet = OutletCode;
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
        await TURUN.update({ xlock: 'A' }, { where: { BrCode, RunID: RunID.toString() }, transaction });
      } catch (error) {
        RunNo = -999;
        throw new Error('TURUN: Record is Locked!!');
      }
    }

    const updatedTurunResult = await TURUN.findOne({ where: { BrCode, RunID: RunID.toString() }, transaction });
    if (updatedTurunResult) {
      RunNo = updatedTurunResult.LastNo + 1;
      await TURUN.update({
        LastNo: RunNo,
        UpdateDate: sequelize.fn('current'),
        UpdateUserCode,
        UpdateBrCode: BrCode,
      }, {
        where: { BrCode, RunID: RunID.toString() },
        transaction,
      });
    } else {
      const maxRunIDResult = await sequelize.query(`SELECT MAX(RunID) FROM TURUN WHERE BrCode = '${BrCode}'`, { type: sequelize.QueryTypes.SELECT, transaction });
      if (maxRunIDResult[0]['MAX(RunID)'] === null) {
        RunID = 1;
      } else {
        RunID = maxRunIDResult[0]['MAX(RunID)'] + 1;
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
        BrCode,
        RunType,
        Class: pClass,
        SubClass: pSubClass,
        EffectiveDate,
        LastNo: RunNo,
        UpdateDate: sequelize.fn('current'),
        UpdateUserCode,
        UpdateBrCode: BrCode,
        Outlet: OutletCode,
      }, { transaction });
    }
    await transaction.commit();
} catch (error) {
    throw error;
}


    return RunNo;



}



module.exports = {


    getRunNo,

};