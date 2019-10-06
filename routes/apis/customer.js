const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../middleware/auth');
const Customer = require('../../models/Customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

router.use(cors());

//@Route        GET api/customer
//@description  Retrives  customer details from user token
//@access       Access is private
router.get('/', auth, (req, res)=>{
/*using the auth middleware to decode the customer_id from the header token and using it 
to run a querey on the customer table to retrieve the customer's full details*/

    Customer.findByPk(req.user.id)    
     .then(user=>{    
         res.json({
             id: user.customer_id,
             name: user.name,
             email: user.email,
             address_1: user.address_1,
             address_2: user.address_2,
             city: user.city,
             region: user.region,
             postal_code: user.postal_code,
             country: user.country,
             shipping_region_id: user.shipping_region_id,
             day_phone: user.day_phone,
             eve_phone: user.eve_phone,
             mob_phone: user.mob_phone,
             credit_card: user.credit_card
         })
     });
         
 });

//@Route        PUT api/customer
//@description  Updates Customers' Account Details via Forms
//@access       access is private   
router.put('/', auth, ( req, res ) => {     
        const id = req.user.id;
        // destructuring data passed in through the request-body and assigning them to variables
        let { name, email, password, day_phone, eve_phone, mob_phone } = req.body;
        // hash the submitted password
        bcrypt.genSalt(10, (err, salt)=>{  //salt generated
            bcrypt.hash(password, salt, (err, hash)=>{ //hash generated
                if(err) throw err;
                password = hash;
        //Query the customer database and update all details of the current user.
                Customer.update({
                    name, 
                    email, 
                    password: hash , 
                    day_phone, 
                    eve_phone, 
                    mob_phone        
                },
                {where: 
                    { customer_id: id}
                }

            )
            .then((rowsUpdated) => {
                res.json(rowsUpdated)
                }) 
            })
    });
});       

module.exports = router; 