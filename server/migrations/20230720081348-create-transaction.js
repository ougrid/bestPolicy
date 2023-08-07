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
      agentCode: {
        type: Sequelize.STRING
      },
      agentCode: {
        type: Sequelize.STRING
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
      totalamt:{
        type: Sequelize.FLOAT
      },
      paidamt:{
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      remainamt:{
        type: Sequelize.FLOAT
      },
      status:{
        type: Sequelize.STRING
      },
      seqno:{
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      commamt:{
        type: Sequelize.FLOAT
      },
      commtaxamt:{
        type: Sequelize.FLOAT
      },
      ovamt:{
        type: Sequelize.FLOAT
      },
      ovtaxamt:{
        type: Sequelize.FLOAT
      },
      rprefdate: {
        type: Sequelize.DATEONLY
      },
      "premin-rprefdate": {
        type: Sequelize.DATEONLY
      },
      "premout-rprefdate": {
        type: Sequelize.DATEONLY
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