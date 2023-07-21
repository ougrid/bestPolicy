'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    
    // prem comm ov1 ov2 ov3 disc
    transType:  DataTypes.STRING,
    // i = in or o = out
    transStatus:  DataTypes.CHAR,
    // 1  , -1
    subType:  DataTypes.INTEGER,
    insurerCode: DataTypes.STRING,
    agentGroupCode: DataTypes.STRING,
    agentCode:  DataTypes.STRING,
    rate:  DataTypes.FLOAT,
    amount: DataTypes.FLOAT,
    duty:  DataTypes.FLOAT,
    stamp:  DataTypes.FLOAT,
    total:  DataTypes.FLOAT,
    payDate: DataTypes.DATE,
    // payNo or recipe NO
    payNo:  DataTypes.STRING,
    invoiceDate: DataTypes.DATE,
    invoiceNo: DataTypes.STRING,
    policyNo:  DataTypes.STRING,
    endoseNo:  DataTypes.STRING,
    // level for MLM
    level:  DataTypes.INTEGER,
    dueDate: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Transaction',
    schema: 'static_data'
  });
  return Transaction;
};