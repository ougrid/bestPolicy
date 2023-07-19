'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MT_Model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MT_Model.init({
    MODELCODE: DataTypes.INTEGER,
    BRANDCODE: DataTypes.INTEGER,
    MOTORTYPE: DataTypes.STRING,
    MODEL: DataTypes.STRING,
    BODYTYPE: DataTypes.STRING,
    CC: DataTypes.STRING,
    SEAT: DataTypes.INTEGER,
    WEIGHT: DataTypes.INTEGER,
    WEIGHTUNIT: DataTypes.STRING,
    MARKETTHAINAME: DataTypes.STRING,
    MARKETENGNAME: DataTypes.STRING,
    MARKETSHORTTHAINAME: DataTypes.STRING,
    MARKETSHORTENGNAME: DataTypes.STRING,
    INSURECOST: DataTypes.INTEGER,
    GROUPCAR: DataTypes.INTEGER,
    FLAGDELETE: DataTypes.STRING,
    MODELTYPE: DataTypes.STRING,
    MODELCODETEXT: DataTypes.STRING,
    MODELFIRSTNAME: DataTypes.STRING,
    MODELSECONDNAME: DataTypes.STRING,
    SIZETYPE: DataTypes.STRING,
    TYPEOFCAR: DataTypes.STRING,
    DHIPBRANDCODE: DataTypes.INTEGER,
    DHIPMODELCODE: DataTypes.INTEGER,
    DHIPSPECCODE: DataTypes.INTEGER,
    CARSIZECODE: DataTypes.INTEGER,
    DEFAULT_FLAG: DataTypes.STRING,
    MODEL_SORT: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MT_Model',
    schema: 'static_data'
  });
  return MT_Model;
};