const Sequelize = require('sequelize');
const db = require('../config/connect');



const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    first_name: {
        type:Sequelize.STRING(100),
        allowNull: false
    },

    last_name: {
        type:Sequelize.STRING(100),
        allowNull: false
    },

    email: {
        type:Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },

    password: {
        type:Sequelize.STRING(255),
        allowNull: false
    },

    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
       default: new Date()
    },

    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date()
    }

},
{
    freezeTableName: true,
})

module.exports = User;