'use strict';

const { ordersProductsSchema, ORDERS_PRODUCTS_TABLE } = require('../models/ordersProducts');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDERS_PRODUCTS_TABLE, ordersProductsSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDERS_PRODUCTS_TABLE);
  }
};
