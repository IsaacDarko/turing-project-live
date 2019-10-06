const Sequelize = require('sequelize');
const db = require('../config/connect');



const Category = db.define('category', {
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },

    department_id: {
        type:Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true,
        foreignKey:true
    },

    name: {
        type:Sequelize.STRING(100),
        allowNull: false
    },

    description: {
        type:Sequelize.STRING(1000)
    },

},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Category;