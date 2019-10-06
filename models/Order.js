const Sequelize = require('sequelize');
const db = require('../config/connect');
const Customer = require('./Customer');
const Shipping = require('./Shipping');



const Order = db.define('order', {
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },

    created_on: {
        type: Sequelize.DATE,
        allowNull: false,        
        defaultValue: Sequelize.NOW
    },

    shipped_on: {
        type: Sequelize.DATE,
    },

    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },

    comments: {
        type: Sequelize.STRING(255)
    },

    customer_id: {
        type: Sequelize.INTEGER,

        references: {
            model: Customer,

            key: 'customer_id'
        }
        
    },

    auth_code: {
        type: Sequelize.STRING(50)
        
    },
    
    reference: {
        type: Sequelize.STRING(50)
    },

    shipping_id: {
        type: Sequelize.INTEGER,

        references: {
            model: Shipping,

            key: 'shipping_id'
        }
    },

    tax_id: {
        type: Sequelize.INTEGER
    }
},
{
    timestamps: false
})

module.exports = Order;