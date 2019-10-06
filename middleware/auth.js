const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('xauthtoken');
    //check for token in request header
    if(!token){
        return res.status(401).json({
            status:'401',
            code:'AUT_01',
            message:'Unauthorized - Missing token.',
            field :'Headers'            
        })
    }
    try {
        //verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //extract user data from the token payload
        req.user = decoded;
        next();
        
    } catch (error) {
        res.status(401).json({
            status:'401',
            code:'AUT_02',
            message:'Access Unauthorized.',
            field :'Headers' 
        });
    }    
}

module.exports = auth;