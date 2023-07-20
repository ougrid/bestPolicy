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
    policyNo:  Sequelize.STRING,
    insureeCode: Sequelize.STRING,
    insurerCode:  Sequelize.STRING,
    agentCode: Sequelize.STRING,
    // itemlistID or motorID
    itemList:  Sequelize.INTEGER,
    insureID: Sequelize.INTEGER,
    // Y = lastversion N = old version
    lastVersion:  Sequelize.CHAR,
    actDate: Sequelize.DATEONLY,
    expDate: Sequelize.DATEONLY,
    prem:  Sequelize.FLOAT,
    duty: Sequelize.FLOAT,
    stamp:  Sequelize.FLOAT,
    total:  Sequelize.FLOAT,
    detail:  Sequelize.STRING,
  }, {
    sequelize,
    modelName: 'Policy',
    schema: 'static_data'
  });
  return Policy;
};