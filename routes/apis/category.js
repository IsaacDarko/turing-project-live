const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Category = require('../../models/Category');
const Department = require('../../models/Department');
const ProductCategory = require('../../models/ProductCategory');





//@Route        GET /categories/get
//@description  Retrieves all Categories in the DB
//@access       Access is public
router.get('/get', (req, res) => {
        Category.findAll()
        .then((category) => {
            res.status(200).json({category});
        })
       
});




//@Route        GET /categories
//@description  Retrieves all Category information using Category ids passed into the request url
//@access       Access is public 
router.get('/', (req, res) => {
    const { category_id } = req.query;
    //validation to see if the category was passed in through the url request
    if( !category_id ){
        res.status(400).json({
            status:'400',
            code:'CAT_01',
            message:'category unknown, please make sure you submitted a valid category id',
            field:'request url'
        })
    }
    Category.findAll({
        attributes:['department_id'],
        where:{ category_id }
    })
    .then((id)=>{
    //console.log(id);
        dep_id = id.reduce(
            ( arr, elem ) => arr.concat(elem.department_id),[]
        )
        console.log(category_id);

        Department.hasMany(Category, { foreignKey: "department_id" });
        Category.belongsTo(Department, { foreignKey: "department_id" });
        Category.findAll({
            include:[{
                model:Department,
                attributes:['name'],
                where: { department_id:dep_id }
            }],
            limit:20,
            raw: true            
        })
        .then(categories => {
            let count = categories.length;
            res.status(200).json({
                count: count,
                rows:categories
            })
        })                    

    .catch(
        err => console.log(err)
        )

    })
})





//@Route        GET /categories/category?category_id
//@description  Retrieves all Category information using Category ids passed into the request url
//@access       Access is public
router.get('/category', (req, res) => {
    const category_id = req.query.category_id;
    if(!category_id){
        res.status(400).json({
            status:'400',
            code:'CAT_01',
            message:'category unknown, please make sure you submitted a valid category id',
            field:'request url'
        })
    }
    Category.findAll({
        where:{ category_id }
    })
    .then(categories => {
        console.log(categories);
        res.status(200).json(categories);
    })
    .catch(err => console.log(err))

}); 




//@Route        GET /categories/inProduct/{product_id}
//@description  Retrieves all Category information using Category ids passed into the request url
//@access       Access is public
router.get('/inProduct', (req, res) => {
    const product_id = req.query.product_id;
    if(!product_id){
        res.status(400).json({
            status:'400',
            code:'CAT_01',
            message:'category unknown, please make sure you submitted a valid product id',
            field:'request url'
        })
    }
    ProductCategory.findAll({
        attributes:['category_id'],
        where:{ product_id }
    })
    .then((id) => {
        category_id = id.reduce( 
            (arr, elem) => arr.concat(elem.category_id),[]
            )
            Category.findAll({
                attributes:['category_id', 'department_id', 'name'],
                where: { category_id }
            })
            .then((category) => {
                res.status(200).json({category});
            })
       
    })
    .catch(
        err => console.log(err)
    )

});





//@Route        GET /categories/inDepartment/{department_id}
//@description  Retrieves all Category information using Category ids passed into the request url
//@access       Access is public
router.get('/inDepartment', (req, res) => {
    const department_id = req.query.department_id;
    if(!department_id){
        res.status(400).json({
            status:'400',
            code:'CAT_01',
            message:'category unknown, please make sure you submitted a valid department id',
            field:'request url'
        })
    }
        Category.findAll({
                where: { department_id }
        })
        .then((category) => {
            res.status(200).json({category});
        })
       
    .catch(
        err => console.log(err)
    )

});


module.exports = router;