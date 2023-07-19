'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entity.init({
    personType: DataTypes.CHAR,
    t_ogName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entity',
  });
  return Entity;
};