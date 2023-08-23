'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Policy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Policy.init({
    insureID: DataTypes.INTEGER,
    insurerCode:  DataTypes.STRING,
    actDate: DataTypes.DATEONLY,
    actTime:  DataTypes.STRING,
    expDate: DataTypes.DATEONLY,
    expTime:  DataTypes.STRING,
    policyDate: DataTypes.DATEONLY,
    policyTime:  DataTypes.STRING,
    policyNo:  DataTypes.STRING,
    endorseNo:  DataTypes.STRING,
    invoiceNo:  DataTypes.STRING,
    taxinvoiceNo:  DataTypes.STRING,
    seqNoins: DataTypes.INTEGER,
    seqNoagt: DataTypes.INTEGER,
    insureeCode: DataTypes.STRING,
    itemList:  DataTypes.INTEGER,
    netgrossprem:  DataTypes.FLOAT,
    specdiscrate:  DataTypes.FLOAT,
    specdiscamt:  DataTypes.FLOAT,
    netgrossprem:  DataTypes.FLOAT,
    duty: DataTypes.FLOAT,
    tax:  DataTypes.FLOAT,
    totalprem:  DataTypes.FLOAT,
    commin_rate:  DataTypes.FLOAT,
    commin_amt: DataTypes.FLOAT,
    ovin_rate:  DataTypes.FLOAT,
    ovin_amt:  DataTypes.FLOAT,
    commin_taxamt: DataTypes.FLOAT,
    ovin_taxamt:  DataTypes.FLOAT,
    agentCode: DataTypes.STRING,
    agentCode2: DataTypes.STRING,
    commout1_rate:  DataTypes.FLOAT,
    commout1_amt: DataTypes.FLOAT,
    ovout1_rate:  DataTypes.FLOAT,
    ovout1_amt:  DataTypes.FLOAT,
    commout2_rate:  DataTypes.FLOAT,
    commout2_amt: DataTypes.FLOAT,
    ovout2_rate:  DataTypes.FLOAT,
    ovout2_amt:  DataTypes.FLOAT,
    commout_rate:  DataTypes.FLOAT,
    commout_amt: DataTypes.FLOAT,
    ovout_rate:  DataTypes.FLOAT,
    ovout_amt:  DataTypes.FLOAT,
    createusercode: DataTypes.STRING,
    lastVersion:  DataTypes.CHAR,
    // A or I
    status:  DataTypes.CHAR,
    applicationNo:  DataTypes.STRING,
 
  }, {
    sequelize,
    modelName: 'Policy',
    schema: 'static_data'
  });
  return Policy;
};