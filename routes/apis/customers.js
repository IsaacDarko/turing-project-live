const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../middleware/auth');
const Customer = require('../../models/Customer');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.use(cors());



//@Route        POST /customers
//@description  Registers new customers
//@access       Access is public   
router.post('/', ( req, res ) => {
    // destructuring data passed in through the request-body and assigning them to variables
    const { name, email, password, credit_card, address_1, address_2, city, region, postal_code, country, shipping_region_id, day_phone, eve_phone, mob_phone } = req.body;

    //a little backend validation to ensure all required data was submitted
    if ( !name || !email || !password  ) {
        return res.status(400).json({
                status: '400',
                code: 'USR_02',
                message: 'Please make sure all required fields are submitted',
                field : 'request body'
        })
    };
    //if validation checks out ensure user doesn't already exist.
    Customer.findOne({
        where: {
            email
        }
    }) //where {email:email} translates in es6 notation {email}
    //if user exists it returns a promise which is assigned to the variable "user" and an error message is returned
    .then((customer)=>{
        if(customer) {
            return res.status(400).json({
                status: '400',
                code: 'USR_04',
                message: 'You already have an account with us, please login',
                field: 'email'
            })
    }
//if no user is found with the same email then the submitted values are stored in a newUser variable which is a new instance of the User model
            const newCustomer = new Customer({
                name, 
                email, 
                password, 
                credit_card, 
                address_1, 
                address_2, 
                city, 
                region, 
                postal_code, 
                country, 
                shipping_region_id, 
                day_phone, 
                eve_phone, 
                mob_phone
            });

            //Create Salt then hash
            bcrypt.genSalt(10, (err, salt)=>{  //salt generated
                bcrypt.hash(newCustomer.password, salt, (err, hash)=>{ //hash generated
                    if(err) throw err;
                    newCustomer.password = hash;   //submitted password is now hashed
                    newCustomer.save()             
                    .then(customer=>{
                        jwt.sign(              
                            {id:customer.customer_id},
                            config.get('jwtSecret'),
                            {expiresIn: 86400},
                            (err, token)=>{
                                if (err) throw err;
                                res.json({                                    
                                        token,
                                     customer:{
                                            id:customer.customer_id,
                                            name:customer.name,
                                            email:customer.email,
                                            credit_card: customer.credit_card, 
                                            address_1: customer.address_1, 
                                            address_2: customer.address_2, 
                                            city: customer.city, 
                                            region: customer.region, 
                                            postal_code: customer.postal_code, 
                                            country: customer.country, 
                                            shipping_region_id: customer.shipping_region_id, 
                                            day_phone: customer.day_phone, 
                                            eve_phone: customer.eve_phone, 
                                            mob_phone: customer.mob_phone
                                        }
                                    //promised data(user id) encrypted along with a jason web token and returned as json
                                    });
                            }
                        );
                        
                    })

                })
            })

    });

});





//@Route        POST /customers/login
//@description  Authenticates customers during shopping
//@access       Access is public   
router.post('/login', ( req, res ) => {
    // destructuring data passed in through the request-body and assigning them to variables
    const { email, password } = req.body;

    //a little backend validation to ensure all required data was submitted
    if ( !email || !password  ) {
        return res.status(400).json({
            status:'400',
            code:'USR_02',
            message: 'Please fill in all the required fields',
            field:'request body'
        });
    }
    //if validation passes checks are then made to ensure user doesn't already exist.
    Customer.findOne({
        where: {
            email
        }
    }) //where {email:email} translates in es6 notation {email}
    //if user exists it return s a promise which is assigned to the variable "user" and an error message is returned
    .then((customer)=>{
        if(!customer) return res.status(400).json({
                status: '400',
                code: 'USR_05',
                message : 'User does not exist',
                field: 'email'            
            })
       
            //console.log(customer.password);          
        
            //Validate password
            bcrypt.compare( password, customer.password )
            .then((isMatch)=>{
                if(!isMatch){ return res.status(401).json({
                    status: '401',
                    code: 'USR_01',
                    message:'Email & Password Pairing is incorrect',
                    field: 'password'
                }) }
                else{
                    jwt.sign(              
                        {id:customer.customer_id},
                        config.get('jwtSecret'),
                        { expiresIn: 86400 },
                        (err, token)=>{
                            if (err) throw err;
                            res.status(200).json({
                                token,
                                user:{
                                    id:customer.customer_id,
                                    name:customer.name,
                                    email:customer.email,
                                    credit_card: customer.credit_card, 
                                    address_1: customer.address_1, 
                                    address_2: customer.address_2, 
                                    city: customer.city, 
                                    region: customer.region, 
                                    postal_code: customer.postal_code,
                                    country: customer.country,
                                    shipping_region_id: customer.shipping_region_id,
                                    day_phone: customer.day_phone,
                                    eve_phone: customer.eve_phone,
                                    mob_phone: customer.mob_phone
    
                                    
                                }                    
                                
                            });

                        }

                    );

                }
                
            }) 
            
        })
    });





//@Route        PUT /customers/creditCard
//@description  Updates Customers CreditCard Details
//@access       Access is private   
router.put('/creditCard', auth, ( req, res ) => {
    const id = req.user.id;
    const { credit_card } = req.body;
    //data validation
    if( !credit_card ){
        return res.status(400).json({
            status: '400',
            code: 'USR_02',
            message: 'Please make sure all required fields are submitted',
            field : 'request body'
        })
    }
    Customer.update({
        credit_card 
        },
        {where: {customer_id: id}}
       )
       .then((rowsUpdated) => {
        res.json(rowsUpdated)
        })          

});





//@Route        PUT /customers/address
//@description  Updates Customers' Address via Forms
//@access       Access is private   
router.put('/address', auth, ( req, res ) => {     
    const id = req.user.id;        
    // destructuring data passed in through the request-body and assigning them to variables
    const { address_1, address_2, city, region, postal_code, country, shipping_region_id } = req.body;
    //if validation passes checks are then made to ensure user doesn't already exist.
    Customer.update({
        address_1, 
        address_2, 
        city, 
        region, 
        postal_code, 
        country,
        shipping_region_id       
    },
    {where: 
        { customer_id: id}
    }

   )
   .then((rowsUpdated) => {
    res.json(rowsUpdated)
    })  
})






router.get('/checkToken', auth, function(req, res) {
    res.sendStatus(200);
  }
)

module.exports = router; 

