'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Policies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      policyNo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      insureeCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      insurerCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      agentCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // itemlistID or motorID
      itemList: {
        type: Sequelize.INTEGER
      },
      insureID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      // Y = lastversion N = old version
      lastVersion: {
        defaultValue: 'Y',
        allowNull: false,
        type: Sequelize.CHAR
      },
      actDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      expDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      prem: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      duty: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      stamp: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      total: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      detail: {
     
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Policies',{ schema: 'static_data'});
  }
};