const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Product_attribute = require('../../models/Product_attribute');


//Get product list from database
router.get('/', (req, res) => 
    Product_attribute.findAll()
    .then(product_attributes => {
        console.log(product_attributes);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))

);

//Posts a product to the database


module.exports = router;