const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();

const { createUserSchema } = require('./userSchemas');

const createCustomerSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    user: createUserSchema
});

const getCustomerSchema = Joi.object({
    id: id.required(),
});

const updateCustomerSchema = Joi.object({
    name,
    lastName,
    phone,
    userId,
});

module.exports = { createCustomerSchema, getCustomerSchema, updateCustomerSchema }
