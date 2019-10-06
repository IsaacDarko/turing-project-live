const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

//import model for this datatable
const User = require('../../models/User');

//@Route        POST api/user
//@description  registers new users (admin)
//@access       access is public   
router.post('/register', auth, ( req, res ) => {
    // destructuring data passed in through the request-body and assigning them to variables
    const { fname, lname, email, password } = req.body;

    //a little backend validation to ensure all required data was submitted
    if ( !fname || !lname || !email || !password  ) {
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
    //if user exists it returns a promise which is assigned to the variable "user" and an error message is returned
    .then((user)=>{
        if(user) {
            return res.status(400).json({
                status: '400',
                code: 'USR_04',
                mesasge : 'User already exists',
                field: 'email'
            });
    };
//if no user is found with the same email then the submitted values are stored in a newUser variable which is a new instance of the User model
            const newUser = new User({
                first_name: fname,
                last_name: lname,
                email,
                password
            });

            //Create Salt then hash
            bcrypt.genSalt(10, (err, salt)=>{  //salt generated
                bcrypt.hash(newUser.password, salt, (err, hash)=>{ //hash generated
                    if(err) throw err;
                    newUser.password = hash;   //submitted password is now hashed
                    newUser.save()             
                    .then(user=>{
                        jwt.sign(              
                            {id:user.id},
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token)=>{
                                if (err) throw err;
                                res.json({

                                    token,

                                    user:{
                                        id:user.id,
                                        name:user.first_name,
                                        email:user.email
                                    }
                                    
                                });
                            }
                        );
            //promised data(user id) encrypted along with a jason web token and returned as json            
                    })

                })
            })
    });

});

module.exports = router;


