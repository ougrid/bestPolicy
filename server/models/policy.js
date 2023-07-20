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
    policyNo:  DataTypes.STRING,
    insureeCode: DataTypes.STRING,
    insurerCode:  DataTypes.STRING,
    agentCode: DataTypes.STRING,
    // itemlistID or motorID
    itemList:  DataTypes.INTEGER,
    insureID: DataTypes.INTEGER,
    // Y = lastversion N = old version
    lastVersion:  DataTypes.CHAR,
    actDate: DataTypes.DATEONLY,
    expDate: DataTypes.DATEONLY,
    prem:  DataTypes.FLOAT,
    duty: DataTypes.FLOAT,
    stamp:  DataTypes.FLOAT,
    total:  DataTypes.FLOAT,
    detail:  DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Policy',
    schema: 'static_data'
  });
  return Policy;
};