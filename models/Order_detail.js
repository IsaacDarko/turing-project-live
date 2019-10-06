const Sequelize = require('sequelize');
const db = require('../config/connect');



const Order_detail = db.define('order_detail', {
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement:true
    },

    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    attributes: {
        type: Sequelize.STRING(1000),
        allowNull: false    
    },

    product_name: {
        type: Sequelize.STRING(100),
        allowNull: false    
    },

    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false    
    },

    unit_cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false    
    }
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Order_detail;