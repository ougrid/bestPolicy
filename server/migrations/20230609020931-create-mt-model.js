'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MT_Models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MODELCODE: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      BRANDCODE: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      MOTORTYPE: {
        type: Sequelize.STRING
      },
      MODEL: {
        type: Sequelize.STRING
      },
      BODYTYPE: {
        type: Sequelize.STRING
      },
      CC: {
        type: Sequelize.STRING
      },
      SEAT: {
        type: Sequelize.INTEGER
      },
      WEIGHT: {
        type: Sequelize.INTEGER
      },
      WEIGHTUNIT: {
        type: Sequelize.STRING
      },
      MARKETTHAINAME: {
        type: Sequelize.STRING
      },
      MARKETENGNAME: {
        type: Sequelize.STRING
      },
      MARKETSHORTTHAINAME: {
        type: Sequelize.STRING
      },
      MARKETSHORTENGNAME: {
        type: Sequelize.STRING
      },
      INSURECOST: {
        type: Sequelize.INTEGER
      },
      GROUPCAR: {
        type: Sequelize.INTEGER
      },
      FLAGDELETE: {
        allowNull: false,
        type: Sequelize.STRING
      },
      MODELTYPE: {
        type: Sequelize.STRING
      },
      MODELCODETEXT: {
        type: Sequelize.STRING
      },
      MODELFIRSTNAME: {
        type: Sequelize.STRING
      },
      MODELSECONDNAME: {
        type: Sequelize.STRING
      },
      SIZETYPE: {
        type: Sequelize.STRING
      },
      TYPEOFCAR: {
        type: Sequelize.STRING
      },
      DHIPBRANDCODE: {
        type: Sequelize.INTEGER
      },
      DHIPMODELCODE: {
        type: Sequelize.INTEGER
      },
      DHIPSPECCODE: {
        type: Sequelize.INTEGER
      },
      CARSIZECODE: {
        type: Sequelize.INTEGER
      },
      DEFAULT_FLAG: {
        type: Sequelize.STRING
      },
      MODEL_SORT: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        defaultValue: new Date(),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: new Date(),
        allowNull: false,
        type: Sequelize.DATE
      }
    },{ schema: 'static_data'});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MT_Models',{ schema: 'static_data'});
  }
};