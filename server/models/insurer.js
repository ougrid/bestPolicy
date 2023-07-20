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
    insurerCode: DataTypes.STRING,
    // code คปภ ของ บริษัทประกัน
    KPPCode:  DataTypes.STRING,
    // รูปแบบการหักภาษี
    deductTaxType:  DataTypes.CHAR,
    // อัตราภาษี
    deductTaxRate:  DataTypes.INTEGER,
    premCreditT:  DataTypes.INTEGER,
    commCreditT:  DataTypes.INTEGER,
    ovCreditT: DataTypes.INTEGER,
    entityID:  DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Insurer',
    schema: 'static_data'
  });
  return Insurer;
};