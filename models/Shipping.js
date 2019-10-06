const Sequelize = require('sequelize');
const db = require('../config/connect');



const Shipping = db.define('shipping', {
    shipping_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement:true
    },

    shipping_type: {
        type:Sequelize.STRING(100),
        allowNull: false
    },

    shipping_cost: {
        type:Sequelize.DECIMAL(10, 2),
        allowNull: false
    },

    shipping_region_id: {
        type: Sequelize.INTEGER,
        allowNull: false    
    }

},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Shipping;