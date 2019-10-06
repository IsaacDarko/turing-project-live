const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const config = require('config');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

//import model for this datatable
const User = require('../../models/User'); 

//
router.use(cors());

//@Route        POST api/auth
//@description  Authenticates users (admins)
//@access       access is public   
router.post('/', ( req, res ) => {
    // destructuring data passed in through the request-body and assigning them to variables
    const { email, password } = req.body;

    //a little backend validation to ensure all required data was submitted
    if ( !email || !password  ) {
        return res.status(400).json({
            status: '400',
            code: 'USR_02',
            message: 'Please fill in all the required fields',
            field: 'request body'
        });
    };
    //if validation passes checks are then made to ensure user doesn't already exist.
    User.findOne({
        where: {
            email
        }
    }) //where {email:email} translates in es6 notation {email}
    //if user exists it return s a promise which is assigned to the variable "user" and an error message is returned
    .then((user)=>{
        if(!user) {
            return res.status(400).json({
                status: '400',
                code: 'USR_05',
                message : 'User does not exist',
                field: 'email'            
            });
        }
            //Validate password
            bcrypt.compare(password, user.password)
            .then(isMatch=>{
                if(!isMatch){ return res.status(401).json({
                    status: '401',
                    code: 'USR_01',
                    message:'Email & Password Pairing is incorrect',
                    field: 'password'
                }) }

                jwt.sign(              
                    {id:user.id},
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token)=>{
                        if (err) throw err;
                        res.status(200).json({
                            token,
                            user:{
                                id:user.id,
                                name:user.first_name,
                                email:user.email
                            }                            
                        });
                    }
                );
            })
           
    });

});




//@Route        GET api/auth/user
//@description  Tells which user is making a request based on the token submitted(admins)
//@access       access is private
router.get('/user', auth, (req, res)=>{
   User.findByPk(req.user.id)    
    .then(user=>{    
        res.status(200).json({
            id:user.id, 
            fname:user.first_name, 
            lname:user.last_name, 
            email: user.email
        });
    });
        
});

module.exports = router;