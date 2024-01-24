const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./orderModel');
const { PRODUCT_TABLE } = require('./productModel');

const ORDERS_PRODUCTS_TABLE = 'orders_products';

const ordersProductsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: ORDER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    productId: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: PRODUCT_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    createAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
};

class OrderProduct extends Model {

    static associate(models) {
        
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDERS_PRODUCTS_TABLE,
            modelName: 'OrderProduct',
            timestamps: false,
        }
    }

}

module.exports = { OrderProduct, ORDERS_PRODUCTS_TABLE, ordersProductsSchema };