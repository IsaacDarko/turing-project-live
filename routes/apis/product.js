const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Sequelize = require('sequelize')
const Product = require('../../models/Product');
const Review = require('../../models/Review');
const Category = require('../../models/Category');
const Customer = require('../../models/Customer');
const Department = require('../../models/Department');
const auth = require('../../middleware/auth');
const ProductCategory = require('../../models/ProductCategory');


//@Route        POST api/products
//@description  Retrives entire product list from database in chunks based on page number
//@access       Access is public
router.get('/', async function  (req, res) { 
    const pagination = req.query.pagination ? parseInt(req.query.pagination) :20;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    let products = await Product.findAll({
        offset: (page - 1)* pagination, 
        limit: pagination
    });   //querying the database with the Product model to retrieve products
    res.status(200).json(products);   //returning json response
   
});





//@Route        POST api/products/search
//@description  Retrives entire product list of search results
//@access       Access is public
router.get('/search', async function  (req, res) { 
    const query_string = req.query.query_string;
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 16;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    if(!query_string){
        res.status(400).json({
            status:'400',
            code:'USR_02',
            message:'please provide a query string',
            field:'seach field'
        }) 
    }

    Product.findAll({
        where:{
            name : query_string
        },
        limit: pagination
    })
        
        .then(results => {
            res.status(200).json({
                search_results:results,
                pagenumber:page
            })
    
        })/*

    let products = await Product.findAll({
        attributes:['name'],
        limit: pagination
    });   //querying the database with the Product model to retrieve products*/
    res.status(200).json(products);   //returning json response
   
});





//@Route        GET /products
//@description  Fetches a particular product by id 
//@access       access is public
router.get('/id', async function  (req, res) { 
    try{
        const id = req.query.id;   //retrieving procuct id from the request url and assigning it to a variable id.
        await Product.findOne({
            where: { product_id : id }  //querying the database using the Product model to retrieve the product with id.
        })                              
        .then((product)=>{
            res.status(200).json(product); //returns a json response containing the requested products details
        })
    }
    catch(err){
        console.log(err);  //logs all unhandled errors to the console
    }
});





//@Route        GET /products/{product_id}/details
//@description  Fetches a particular product's details by id 
//@access       access is public
router.get('/id/details', async function  (req, res) { 
    try{
        const id = req.query.id;   //retrieving procuct id from the request url and assigning it to a variable id.
        await Product.findOne({
            where: { product_id : id }  //querying the database using the Product model to retrieve the product with id.
        })                              
        .then((product)=>{
            res.status(200).json({
                image:product.image,
                image_2:product.image_2,
                price:product.price,
                description: product.description
            }); //returns a json response containing the requested products details
        })
    }
    catch(err){
        console.log(err);  //logs all unhandled errors to the console
    }
});






//@Route        GET /products/inCategory
//@description  Fetches all products inside a particular category using that category's id
//@access       access is public
router.get('/inCategory', async function  (req, res) { 
    try{
        const category_id = req.query.id;  //retrieve the category id from the request url and assigns it to a variable
        await ProductCategory.findAll({
//queries the database using the ProductCategory model and finds all product_ids associated with the provided category_id
            attributes: ['product_id'], 
            where: { category_id },    
            raw:true
        })            
//returns an object containing all the product_ids which is then flattened into an array and assigned to a variable "ids"
            .then((product_ids)=>{
                let ids = product_ids.reduce(
                    (arr, elem) =>arr.concat(elem.product_id), []
                )
//iterate "ids" and run another query on database using the Product model to find products with product_id matching the ids               
                    Product.findAll({
                        where: {product_id: [...ids]}
                    })
                    .then((products)=>{  //returns an object of all products assigned to a variable "products"
                        res.status(200).json(products); //sends a json response with all products in the requested category 
                    }
                    )})
    }
        catch(err){
        console.log(err); //logs all unhandled errors to the console
        }

});





//@Route        GET products/id/locations
//@description  Fetches a product's location using the product's id
//@access       access is public
router.get('/id/locations', async function  (req, res) { 
    try{
        const product_id = req.query.id;  //retrieves the product id from the request url and assigns it to a variable
        await ProductCategory.findAll({
//queries the database using the ProductCategory model and finds the category_ids associated with the provided product_id
            attributes: ['category_id'], 
            where: { product_id },    
            raw:true
        })            
//returns an object containing all applicable category_ids and then flattens into an array and assigned to a variable "id"
            .then((category_id)=>{
                let id = category_id.reduce(
                    (arr, elem) =>arr.concat(elem.category_id),[]
                )
               // console.log(id);
/* Run another query on database using the Category model to find department_ids along with category_names that associate
 with the the category ids returned in the 'ids' variable */            
                    Category.findAll({
                        attributes:['department_id', 'name'],
                        where: {category_id: id}
                    })
/*returns an object of all requested department_ids and names associated to the caterogy_id provided, assigning them to 
a variable "data" then reduce data to a basic array*/
                    .then((data)=>{  
                        let idd = data.reduce(
                            (arr, elem) =>arr.concat(elem.department_id),[]
                        )
                    Department.findAll({                            
                            attributes:['name'],
                            where:{ department_id: [...idd]}
                        })
                        .then((dep_names)=>{
                            deppid = data[0].department_id;
                            catname = data[0].name;
                            catid = id;
                            depname = dep_names[0].name;
                            res.status(200).json({
                                department_id:deppid,
                                department_name:depname,
                                category_id:catid[0],
                                category_name:catname
                            });
         //sends a json response with all locations associated with the product id in the requested category 
                        })

                        
                       
                    })
            //})
    })
}
        catch(err){
        console.log(err); //logs all unhandled errors to the console
        }

});






//@Route        GET /products/inDepartment
//@description  Fetches all products inside a particular department using the department's id
//@access       access is public
router.get('/inDepartment', async function  (req, res) { 
    try{
        const department_id = req.query.id; //retrieve department id from the request url and assign to a variable
        await Category.findAll({
//query the database using the Category model and find all category_ids that the requested department is associated with
            attributes: ['category_id'],
            where: { department_id },
            raw:true
        })            
/*the query returns an obeject of all category_ids which is flattened into an array of ids and assigned to a variable 
'ids'*/
            .then((category_ids)=>{
                let ids = category_ids.reduce(
                    (arr, elem) =>arr.concat(elem.category_id), []
                )
/*iterating the ids array run another query using the ProductCategory model to find all product_ids associated with each
 id inside the ids array*/                
                    ProductCategory.findAll({
                        attributes: ['product_id'],
                        where: {category_id: [...ids]}
                    })
//the query returns an object of product_ids which is flattened into a basic array of ids and assigned to a variable 'pids'
                    .then((pids)=>{    
                        let product_ids = pids.reduce(
                            (arr, elem) =>arr.concat(elem.product_id), []
                        )
/*iterating the pids array a final query is ran using the Product model to find all products whose product_ids match the 
ids inside the pids array*/
                            Product.findAll({
                                where: {product_id: [...product_ids]}
                            })
                            .then((products)=>{
                                res.status(200).json(products);
                            })
                    })
            })
    }
        catch(err){
        console.log(err); // logs all unhandled errors to the console
        }

});





//@Route        GET /products/id/reviews
//@description  Fetches all products inside a particular category using that category's id
//@access       access is public
router.get('/id/reviews', async(req, res)=>{
    let product_id = req.query.id;
    await Review.findAll({
        attributes:[ 'customer_id'],
        where: { product_id },                  
                
    })
    .then((ids)=>{    
        console.log(ids); 
        let customer_ids = ids.reduce(
            (arr, elem) =>arr.concat(elem.customer_id), []
        )
        console.log(customer_ids);
        Review.belongsTo(Product, { foreignKey: "product_id" });
        Customer.belongsTo(Review, { foreignKey: "customer_id" });
        Review.hasMany(Customer, { foreignKey: "customer_id" });
        Review.findAll({
            include:[{            
                model:Customer,
                attributes:['name'],
                where: { customer_id:customer_ids } 
            }],
            attributes:[ 'review', 'rating', 'created_on' ],
            where: { customer_id:customer_ids },
            
            raw:true
        })
        .then((data)=>{
            console.log(data);
           
                res.status(200).json({
                    data
                 }) 
        })
    })
})





//@Route        Post /products/id/reviews
//@description  Posts reviews about a particular product using it's id
//@access       access is private
router.post('/id/reviews', auth, ( req, res ) => {
    const customer_id = req.user.id;
    const product_id = req.query.id;
    // destructuring data passed in through the request-body and assigning them to variables
    const { review, rating } = req.body;

    //a little backend validation to ensure all required data was submitted
    if ( !review || !rating ) {
        return res.status(400).json({
            status: '400',
            code: 'USR_02',
            msg: 'Please fill in all the required fields',
            field: 'request body'
        })

    };
    
    //Model the incoming data to fit the schema 
            const newReview = new Review({
                customer_id,
                product_id,
                review,
                rating                 
            });

            //Store new product in database
            newReview.save()             
            .then(review=>{
                res.json({review});
            });
                      
})





//@Route        POST api/products/add
//@description  Saves new products to the database (admins only)
//@access       Access is private
router.post('/add', auth, ( req, res ) => {
    // destructuring data passed in through the request-body and assigning them to variables
    const { prod_name, prod_desc, price, disc_price, img, img_two, thumbnail } = req.body;

    //a little backend validation to ensure all required data was submitted
    if ( !prod_name || !prod_desc || !price || !disc_price ) {
        return res.status(400).json({
            status:400,
            code: 'USR_02',
            message: 'Please fill in all the required fields',
            field: 'request body'
        });
    };
    
    //Model the incoming data to fit the schema 
            const newProduct = new Product({
                name: prod_name,
                description: prod_desc,
                        price,
                discounted_price: disc_price,
                image: img,
                image_2: img_two,
                thumbnail: thumbnail,
                
            });

            //Store new product in database
            newProduct.save()             
            .then(product=>{
                res.json({product});
            });
                      
})

module.exports = router;