const Joi = require('joi');

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer();

const getOrdersProductsSchema = Joi.object({
    id: id.required(),
});

const createOrdersProductsSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required(),
});

module.exports = { getOrdersProductsSchema, createOrdersProductsSchema };