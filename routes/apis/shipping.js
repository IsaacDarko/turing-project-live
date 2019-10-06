const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Shipping = require('../../models/Shipping');


//@Route        GET /shipping
//@description  Retrieves all shipping methods
//@access       Access is public
router.get('/', (req, res) => 
    Shipping.findAll()
    .then(shipments => {
        res.status(200).json(shipments);
    })
    .catch(err => console.log(err))

);





//@Route        GET /shipping/forRegion
//@description  Retrieves all shipping methods associated to a particular region
//@access       Access is public
router.get('/forRegion', (req, res) =>{
    const shipping_region_id = req.query.shipping_region_id;
    Shipping.findAll({
        where:{
            shipping_region_id
        }
    })
    .then((methods)=>{
        res.status(200).json(methods);
    })
})

module.exports = router;