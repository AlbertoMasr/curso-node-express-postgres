
const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit =  100;
    for(let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data){
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category']
    });
    return products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if(!product) {
      throw boom.notFound('Product not found');
    }

    if(product.isBlock) {
      throw boom.conflict('Product is block');
    }

    return product;
  }

  async update(id, newData) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('Product not found');
    }

    this.products[index] = newData;
    return this.products[index];
  }

  async updatePartial(id, newData) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('Product not found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...newData
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
