'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class b_jugltxtype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  b_jugltxtype.init({
    ttype:  DataTypes.STRING,
    seqno:  DataTypes.INTEGER,
    accountno:DataTypes.STRING,
    gltype: DataTypes.STRING,
    command: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'b_jugltxtype',
    schema: 'static_data'
  });
  return b_jugltxtype;
};