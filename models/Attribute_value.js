const Sequelize = require('sequelize');
const Attribute = require('./Attribute');
const db = require('../config/connect');



const Attribute_value = db.define('attribute_value', {
    attribute_value_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    attribute_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: Attribute,
       
            // This is the column name of the referenced model
            key: 'attribute_id',
        }
    },

    value: {
        type:Sequelize.STRING(100),
        allowNull: false
    }
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Attribute_value;