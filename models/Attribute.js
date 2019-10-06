const Sequelize = require('sequelize');
const db = require('../config/connect');



const Attribute = db.define('attribute', {
    attribute_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type:Sequelize.STRING(100),
        allowNull: false
    },

},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Attribute;