const Sequelize = require('sequelize');
const db = require('../config/connect');



const Department = db.define('department', {
    department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement:true
    },

    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    description: {
        type: Sequelize.STRING(1000)
        
    }

},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Department;