'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Motor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Motor.init({
    voluntaryCode: DataTypes.STRING,
    brandID: DataTypes.INTEGER,
    modelID: DataTypes.INTEGER,
    specname: DataTypes.STRING,
    licenseNo: DataTypes.STRING,
    motorprovinceID: DataTypes.INTEGER,
    chassisNo: DataTypes.STRING,
    modelYear: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Motor',
    schema: 'static_data'
  });
  return Motor;
};