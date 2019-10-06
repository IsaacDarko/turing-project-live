const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const cors = require('cors');
const Sequelize = require('sequelize');
const uuid = require('uuid/v1');
const auth = require('../../middleware/auth');
const Product = require('../../models/Product');
const Shopping_cart = require('../../models/Shopping_cart');
const Order = require('../../models/Order');
const Order_detail = require('../../models/Order_detail');


router.use(cors());




//@Route        POST /orders
//@description  Creates an order
//@access       Access is private
router.post('/', auth, (req, res) => {
    const customer_id = req.user.id;
    const{ cart_id, shipping_id, tax_id } = req.body;
    if( !cart_id || !shipping_id || !tax_id ){
        res.status(400).json({
            status:'400',
            code:'',
            message:'All required fields must be filled',
            field:'request body'
        })
    }

    //Listing out all the associations between the database models as rules for the joint queries
    Order_detail.belongsTo(Order, { foreignKey: "order_id" });
    Order.hasOne(Order_detail,{ foreignKey: "order_id" });
    Product.hasMany(Shopping_cart, { foreignKey: "product_id" });
    Shopping_cart.hasMany(Product, { foreignKey: "product_id" });

    //first retrieve all the product ids which can be found in the cart associated with the submitted 'cart_id'
    Shopping_cart.findAll({
        attributes:['product_id'],
        where:{ cart_id }
    })
    .then((ids)=>{
        //reducing the returned object into a flat array of product_ids
        product_id = ids.reduce(
            (arr, elem) => arr.concat(elem.product_id),[]
        )
        //run a join query on both shopping cart and product models to provide the needed data to fill order_detail
            Shopping_cart.findAll({
                attributes:['attributes', 'quantity', 'product_id', 'products.name', 'products.discounted_price'],
                include:[{            
                    model:Product,
                    attributes:[],
                    where: { product_id } 
                }],
                
                where:  [ {product_id}, { buy_now: 1 } ],
                
                    
                raw:true
            })
            .then((data)=>{  
                  
        //reducing the discounted prices in the object response into a flat array and assigning it to a variable 'prices'
                const prices = data.reduce(
                    (arr, elem)=> arr.concat(elem.discounted_price), []
                    )

        //parsing all the element of the prices array as floats and running reduce to sum them up 
                const total_amount = (prices.map(function(i) { 
                    return /^\d+(\.\d+)?$/.test(i) ? parseFloat(i) : 0;
                  }) 
                .reduce(
                  (a, b) => a+b , 0
                ))
        //defining and assigning values to the 'reference' and 'auth' codes
                const auth = cart_id.slice(24,35);
                const ref = cart_id.slice(0,7);
                const auth_code= `Auth-${auth}`;
                const reference= `Ref-${ref}`;
        //create a new instance of the Order model and save to the database
                const newOrder = new Order({
                    total_amount,
                    customer_id,
                    auth_code,
                    reference,
                    shipping_id,
                    tax_id
                })
                newOrder.save()
                .then(newOrder => {
        //loop through all individual object in the returned object and retrieve each object model as 'singleItem'
                    data.forEach(item =>{
                        let singleItem = {...item};
                        const productids = singleItem.product_id;
                        const attributes = singleItem.attributes;
                        const product_name = singleItem.name;
                        const quantity = singleItem.quantity;
                        const unit_cost = singleItem.discounted_price;
        //Create a new instance of the Order_detail model and save to database (uncluding data extracted from singleItem)          
                        const newOrderDeets = new Order_detail({
                            order_id:newOrder.order_id,
                            product_id: productids,
                            attributes,
                            product_name,
                            quantity,
                            unit_cost
                        })
                        newOrderDeets.save()
                        .then((newOrderDetails)=>{
                           
                        })
                    })
                    res.status(200).json(newOrder.order_id);
                })
               
            })
        })   
.catch(
    err => console.log(err)        
    )
})





//@Route        GET /orders/{order_id}
//@description  Retrieves an order using the order id
//@access       Access is private
router.get('/', auth, (req, res) => {
    const order_id = req.query.order_id;
    if ( !order_id ){
        res.status(400).json({
            status :'400',
            code : 'USR_02',
            message : 'Please provide all required data',
            field : 'request url'
        })
    }

    Order_detail.findAll({
        where:{ order_id }
    })
    .then(order => {
        res.status(200).json(order);
    })
    .catch(err => console.log(err))

});





//@Route        GET /orders/inCustomer
//@description  Retrieves all orders using the customer's id
//@access       Access is private
router.get('/inCustomer', auth, (req, res) => {
    const customer_id = req.user.id;

    Order_detail.belongsTo(Order, { foreignKey: "order_id" });
    Order.hasOne(Order_detail,{ foreignKey: "order_id" });

    Order.findAll({
        attributes:['order_id'],
        where:{ customer_id }
    })
    .then((ids)=>{
        const order_id = ids.reduce(
            (arr, elem) => arr.concat(elem.order_id), []
            )
            Order.findAll({
                attributes:['order_id', 'order_detail.product_name', 'order_detail.quantity', 'order_detail.product_id', 'order_detail.unit_cost', 'total_amount', 'created_on', 'customer_id', 'auth_code', 'reference', 'shipping_id', 'tax_id'],
                where:{ order_id },
                include:[{
                    model:Order_detail,
                    attributes:[],
                    where:{ order_id }
                }],
                raw:true
            })
            .then(order => {
                res.status(200).json(order);
            })
    })    
    .catch(err => console.log(err))

});





/*
//@Route        GET /orders/inCustomerCart
//@description  Retrieves all orders for the current session using the customer's id
//@access       Access is private
router.get('/inCustomerCart', auth, (req, res) => {
    const customer_id = req.user.id;
    const cart_id = req.query.cart_id;
    const Op = Sequelize.Op;
    Order_detail.belongsTo(Order, { foreignKey: "order_id" });
    Order.hasOne(Order_detail,{ foreignKey: "order_id" });
    Order.belongsTo(Shopping_cart, { foreignKey: "" });

    Order.findAll({
        attributes:['order_id'],
        where: { [Op.and]: [ {customer_id}, {cart_id} ]  }
    })
    .then((ids)=>{
        const order_id = ids.reduce(
            (arr, elem) => arr.concat(elem.order_id), []
            )
            Order.findAll({
                attributes:['order_id', 'order_detail.product_name', 'order_detail.quantity', 'order_detail.product_id', 'order_detail.unit_cost', 'total_amount', 'created_on', 'customer_id', 'auth_code', 'reference', 'shipping_id', 'tax_id'],
                where:{ order_id },
                include:[{
                    model:Order_detail,
                    attributes:[],
                    where:{ order_id }
                }],
                raw:true
            })
            .then(order => {
                res.status(200).json(order);
            })
    })    
    .catch(err => console.log(err))

});
*/





//@Route        GET /orders/shortDetail/{order_id}
//@description  Retrieves short details of an order using the order id
//@access       Access is private
router.get('/shortDetail/', (req, res) => {
    const order_id = req.query.order_id;

    Order_detail.belongsTo(Order, { foreignKey: "order_id" });
    Order.hasOne(Order_detail,{ foreignKey: "order_id" });

     Order.findAll({
            attributes:[ 'order_id', 'total_amount', 'created_on', 'shipped_on', 'status', 'order_detail.product_name' ],
            where:{ order_id },
            include:[{
                model:Order_detail,
                attributes:[],
                where:{ order_id }
            }],

            raw:true
            })
    .then(shopping_cart => {
        res.status(200).json(shopping_cart);
    })
    .catch(err => console.log(err))
})


module.exports = router;