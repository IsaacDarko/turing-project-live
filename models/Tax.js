const Sequelize = require('sequelize');
const db = require('../config/connect');



const Tax = db.define('tax', {
    tax_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },

    tax_type: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    tax_percentage: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }

},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Tax;