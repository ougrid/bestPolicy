'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Motors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brandID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      modelID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      chassisNo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      carRegisNo: {
        
        type: Sequelize.STRING
      },
      carRegisYear: {
        allowNull: false,
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
    await queryInterface.dropTable('Motors',{ schema: 'static_data'});
  }
};