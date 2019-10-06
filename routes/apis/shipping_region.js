const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Shipping_region = require('../../models/Shipping_region');



//@Route        GET /shipping/regions
//@description  Retrives  customer details from user token
//@access       Access is private
router.get('/', (req, res) => 
    Shipping_region.findAll()
    .then(shipping_regions => {
        res.status(200).json(shipping_regions);
    })
    .catch(err => console.log(err))

);





//@Route        GET /shipping/regions/{shipping_region_id}
//@description  Retrives  customer details from user token
//@access       Access is private
router.get('/id', (req, res) => {
    const shipping_region_id = req.query.shipping_region_id;
    Shipping_region.findAll({
        where:{ shipping_region_id }
    })
    .then(shipping_region => {
        res.status(200).json(shipping_region);
    })
    .catch(err => console.log(err))

});

//Posts a product to the database


module.exports = router;