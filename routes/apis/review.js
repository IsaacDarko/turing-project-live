const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Review = require('../../models/Review');


//Get product list from database
router.get('/', (req, res) => 
    Review.findAll()
    .then(review => {
        console.log(review);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))

);

//Posts a product to the database


module.exports = router;