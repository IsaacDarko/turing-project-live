const Sequelize = require('sequelize');
const db = require('../config/connect');



const ProductCategory = db.define('product_category', {
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
        
    },

    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
       
    },

},
{
    freezeTableName: true,
    timestamps: false,
    //raw: true
})

module.exports = ProductCategory;