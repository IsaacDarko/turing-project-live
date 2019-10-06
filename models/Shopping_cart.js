const Sequelize = require('sequelize');
const db = require('../config/connect');



const Shopping_cart = db.define('shopping_cart', {
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true
    },

    cart_id: {
        type: Sequelize.STRING(32),
        unique: true,
        allowNull: false
    },

    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    attributes: {
        type:Sequelize.STRING(1000),
        allowNull: false
    },

    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    buy_now: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },

    added_on: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }

},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Shopping_cart;