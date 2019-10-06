const Sequelize = require('sequelize');
const db = require('../config/connect');



const Product_attribute = db.define('product_attribute', {
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    attribute_value_id: {
        type:Sequelize.STRING(100),
        allowNull: false
    }
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Product_attribute;