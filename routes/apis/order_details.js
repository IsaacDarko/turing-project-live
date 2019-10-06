const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Order_detail = require('../../models/Order_detail');


//Get product list from database
router.get('/', (req, res) => 
    Order_detail.findAll()
    .then(order_details => {
        console.log(order_details);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))

);

//Posts a product to the database


module.exports = router;