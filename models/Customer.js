const Sequelize = require('sequelize');
const db = require('../config/connect');
const Review = require('./Review');


const Customer = db.define('customer', {
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    name: {
        type:Sequelize.STRING(50),
        allowNull: false
    },

    email: {
        type:Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },

    password: {
        type:Sequelize.STRING(50),
        allowNull: false
    },

    credit_card: {
        type:Sequelize.TEXT
    },

    address_1: {
        type:Sequelize.STRING(100)
    },

    address_2: {
        type:Sequelize.STRING(100)
    },

    city: {
        type:Sequelize.STRING(100)
    },

    region: {
        type:Sequelize.STRING(100)
    },

    postal_code: {
        type:Sequelize.STRING(100)
    },

    country: {
        type:Sequelize.STRING(100)
    },

    shipping_region_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:'1'
    },

    day_phone: {
        type:Sequelize.STRING(100)        
    },

    eve_phone: {
        type:Sequelize.STRING(100)        
    },

    mob_phone: {
        type:Sequelize.STRING(100)
    }

},
{
    omitNull: true,
    freezeTableName: true,
    timestamps: false
    
});

Customer.associate = (models) => {
    // associations can be defined here
    Customer.belongsTo(Review, { foreignKey: 'customer_id' });
};

module.exports = Customer;