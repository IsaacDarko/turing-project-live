const Sequelize = require('sequelize');
const db = require('../config/connect');



const Product_category = db.define('product_category', {
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Product_category;