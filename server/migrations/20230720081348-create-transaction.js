'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // prem comm ov1 ov2 ov3 disc
      transType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // i = in or o = out
      transStatus: {
        allowNull: false,
        type: Sequelize.CHAR
      },
      // 1  , -1
      subType: {
        defaultValue: 1,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      insurerCode: {
        type: Sequelize.STRING
      },
      agentGroupCode: {
        type: Sequelize.STRING
      },
      agentCode: {
        type: Sequelize.STRING
      },
      rate: {
        type: Sequelize.FLOAT
      },
      amount: {
        type: Sequelize.FLOAT
      },
      duty: {
        type: Sequelize.FLOAT
      },
      stamp: {
        type: Sequelize.FLOAT
      },
      total: {
        type: Sequelize.FLOAT
      },
      payDate: {
        type: Sequelize.DATE
      },
      // payNo or recipe NO
      payNo: {
        type: Sequelize.STRING
      },
      invoiceDate: {
        type: Sequelize.DATE
      },
      invoiceNo: {
        type: Sequelize.STRING
      },
      policyNo: {
        allowNull:false,
        type: Sequelize.STRING
      },
      endoseNo: {
        type: Sequelize.STRING
      },
      // level for MLM
      level: {
        type: Sequelize.INTEGER
      },
      dueDate:{
        allowNull:false,
        type: Sequelize.DATEONLY
      },
      groupSatmentID:{
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
    await queryInterface.dropTable('Transactions',{ schema: 'static_data'});
  }
};