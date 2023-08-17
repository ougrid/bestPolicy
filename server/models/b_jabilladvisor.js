'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class b_jabilladvisor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  b_jabilladvisor.init({
    old_keyid: DataTypes.INTEGER,
    insurerno: DataTypes.INTEGER,
    advisorno:  DataTypes.INTEGER,
    billadvisorno:  DataTypes.STRING,
    billdate:  DataTypes.DATEONLY,
    createusercode:  DataTypes.STRING,
    amt:  DataTypes.FLOAT,
    cashierreceiptno: DataTypes.STRING,
    active:  DataTypes.STRING,
    inactivedate:  DataTypes.DATEONLY,
    inactiveusercode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'b_jabilladvisor',
    schema: 'static_data'
  });
  return b_jabilladvisor;
};