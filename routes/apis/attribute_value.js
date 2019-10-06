const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Attribute_value = require('../../models/Attribute_value');


//Get product list from database
router.get('/', (req, res) => 
Attribute_value.findAll()
    .then(attribute_values => {
        console.log(attribute_values);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))
);

//Posts a product to the database


module.exports = router;