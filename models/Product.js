const Sequelize = require('sequelize');
const db = require('../config/connect');
const Review = require('./Review');



const Product = db.define('product', {
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    name: {
        type:Sequelize.STRING(100),
        allowNull: false
    },

    description: {
        type:Sequelize.STRING(1000),
        allowNull: false
    },

    price: {
        type:Sequelize.DECIMAL(10, 2),
        allowNull: false
    },

    discounted_price: {
        type:Sequelize.DECIMAL(10, 2),
        allowNull: false
    },

    image: {
        type:Sequelize.STRING(150),
        
    },

    image_2: {
        type:Sequelize.STRING(150),
        
    },

    thumbnail: {
        type:Sequelize.STRING(150),
        
    },
    
    display: {
        type:Sequelize.SMALLINT(6),
        allowNull: false
    },
},


{
    freezeTableName: true,
    timestamps: false
});

/*{
    indexes: [
        // add a FULLTEXT index
        { 
            type: 'FULLTEXT', 
            name: 'text_idx', 
            fields: ['description', 'name'] 
        }
      ]
};*/


Product.associate = (models) => {
    // associations can be defined here
    Product.hasMany(Review, { foreignKey: 'product_id' });
};


module.exports = Product;