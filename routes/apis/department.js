const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Department = require('../../models/Department');

 
//@Route        GET api/department
//@description  Fetches all available departments
//@access       access is public
router.get('/', async function  (req, res) { 
    let departments = await Department.findAll();
    res.status(200).json(departments);
   
});

//@Route        GET api/department
//@description  Fetches a particular department by id 
//@access       access is public
router.get('/one', async function  (req, res) { 
    try{
        const id = req.query.id;
        await Department.findOne({
            where: { department_id : id }
        })
        .then((departments)=>{
            res.status(200).json(departments);
        })
    }
    catch(err){
        console.log(err);
    }
});


module.exports = router;