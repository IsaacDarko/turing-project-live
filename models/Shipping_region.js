const Sequelize = require('sequelize');
const db = require('../config/connect');



const Shipping_region = db.define('shipping_region', {
    shipping_region_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    shipping_region: {
        type:Sequelize.STRING(100),
        allowNull: false
    }
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Shipping_region;