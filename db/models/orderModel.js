const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customerModel');

const ORDER_TABLE = 'order';

const orderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    createAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
    total: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.items.reduce((total, item) => total + item.price, 0);
        },
    }
};

class Order extends Model {

    static associate(models) {
        this.belongsTo(models.Customer, { as: 'customer' });
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId',
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false,
        }
    }

}

module.exports = { Order, ORDER_TABLE, orderSchema };