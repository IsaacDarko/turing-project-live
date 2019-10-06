const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Product_category = require('../../models/Product_category');


//Get product list from database
router.get('/', (req, res) => 
    Product_category.findAll()
    .then(product_categories => {
        console.log(product_categories);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))

);

//Posts a product to the database


module.exports = router;