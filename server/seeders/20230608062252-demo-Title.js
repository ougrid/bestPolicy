'use strict';



/** @type {import('sequelize-cli').Migration} */
const data  = require('../rawdata/title.json')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

        await   queryInterface.bulkInsert({ tableName: "Titles", schema: 'static_data' },data.value,{});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({ tableName: "Titles", schema: 'static_data' },null,{});
  }
};
