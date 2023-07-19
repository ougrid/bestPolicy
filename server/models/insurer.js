'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insurer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Insurer.init({
    personType: DataTypes.CHAR,
    t_ogName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Insurer',
  });
  return Insurer;
};