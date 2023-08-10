'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('b_jaaraps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      billadvisorno: {
        type: Sequelize.STRING
      },
      cashierreceiveno: {
        type: Sequelize.STRING
      },
      cashieramt: {
        type: Sequelize.FLOAT
      },
      insurercode: {
        type: Sequelize.STRING
      },
      advisorcode: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      transactiontype: {
        type: Sequelize.STRING
      },
      actualvalue: {
        type: Sequelize.FLOAT
      },
      diffamt: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      createusercode:{
        type :Sequelize.STRING
      },
      updateusercode:{
        type:Sequelize.STRING
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
    await queryInterface.dropTable('b_jaaraps',{ schema: 'static_data'});
  }
};