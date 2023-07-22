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
    brandID: DataTypes.INTEGER,
    modelID: DataTypes.INTEGER,
    chassisNo: DataTypes.STRING,
    carRegisNo: DataTypes.STRING,
    carRegisYear: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Motor',
    schema: 'static_data'
  });
  return Motor;
};