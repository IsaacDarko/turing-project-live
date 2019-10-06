const Sequelize = require('sequelize');
const db = require('../config/connect');
const Customer = require('./Customer');
const Product = require('./Product');



const Review = db.define('review', {
    review_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true
    },

    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        foreignKey:true
    },

    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    review: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    rating: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },

    created_on: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }

},
{
    freezeTableName: true,
    timestamps: false,
    raw:true
},
);

Review.associate = (models) => {
    // associations can be defined here
    Review.hasMany(Customer, { foreignKey: 'customer_id', });
    Review.hasMany(Product, { foreignKey: 'product_Id' });
};


module.exports = Review;