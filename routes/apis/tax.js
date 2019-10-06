const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Tax = require('../../models/Tax');




//@Route        GET /tax
//@description  Retrieves all taxes
//@access       Access is public
router.get('/', (req, res) => 
    Tax.findAll()
    .then(taxes => {
        res.status(200).json(taxes);
    })
    .catch(err => console.log(err))

);





//@Route        GET /tax/{tax_id}
//@description  Retrieves tax using tax_id                                                                                                                                                                                                                                                                                                                                                                                                                                      
//@access       Access is public
router.get('/id', (req, res) =>{ 
    const tax_id = req.query.tax_id;
    if( !tax_id ){
        res.status(400).json({
            status:'400',
            code: 'USR_02',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            message: 'Please provide all required fields',
            field: 'Request body'
        })
    }

    Tax.findAll({
        where: { tax_id }
    })
    .then(tax => {
        res.status(200).json(tax);
    })
    .catch(err => console.log(err))

});


module.exports = router;