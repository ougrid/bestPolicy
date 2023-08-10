'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('b_jatws', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      keyidm: {
        type: Sequelize.INTEGER
      },
      "comm-outamt": {
        type: Sequelize.FLOAT
      },
      whtrate: {
        type: Sequelize.FLOAT
      },
      "whtcomm-outamt": {
        type: Sequelize.FLOAT
      },
      "ov-outamt": {
        type: Sequelize.FLOAT
      },
      "whtov-outamt": {
        type: Sequelize.FLOAT
      },
      taxid: {
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
    await queryInterface.dropTable('b_jatws',{ schema: 'static_data'});
  }
};