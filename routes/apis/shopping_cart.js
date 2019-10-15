const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const uuid = require('uuid/v1');
const Shopping_cart = require('../../models/Shopping_cart');
const Product = require('../../models/Product');


//@Route        GET /shoppingcart/{cart_id}
//@description  Retrives list of products in a particular cart using it's Id
//@access       Access is public
router.get('/', (req, res) => {
    const cart_id = req.query.cart_id;
    Shopping_cart.findAll({
        where:{ cart_id }
    })
    .then(shopping_cart => {
        res.status(200).json(shopping_cart);
    })
    .catch(err => console.log(err))
})






//@Route        GET /shoppingcart/generateUniqueId
//@description  Generate  a unique id for shopping carts
//@access       Access is public
router.get('/generateUniqueId', (req, res) => {
    const id = uuid();
    res.status(200).json({
        cart_id: id
    })
  
})





//@Route        GET /shoppingcart/saveForLater/{item_id}
//@description  Saves products in the cart to be bought later
//@access       Access is public
router.get('/saveForLater/', (req, res) => {
    const item_id = req.query.item_id;
    Shopping_cart.update({
        buy_now: 0        
    },
    {where: 
        { item_id}
    }

   )
    .then(shopping_cart => {
        res.status(200).json(shopping_cart);
    })
    .catch(err => console.log(err))
})





//@Route        POST api/shoppingcart/getSaved/{cart_id}
//@description  Retrives all saved products in a particular cart
//@access       Access is public
router.get('/getSaved/', (req, res) => {
    const cart_id = req.query.cart_id;
    Shopping_cart.findAll({
        where:{
            cart_id,  buy_now: 0
        },
        raw:true
    })
    .then(shopping_cart => {
        res.status(200).json(shopping_cart);
    })
    .catch(err => console.log(err))


});






//@Route        GET shoppingcart/moveToCart/{item_id}
//@description  Moves a product to cart
//@access       Access is public
router.get('/moveToCart/', (req, res) => {
    const item_id = req.query.item_id;   
    Shopping_cart.update({
        buy_now: 1        
    },
    {where: 
        { item_id}
    }

   )
    .then(moved_item => {
        res.status(200).json(moved_item);
    })
    .catch(err => console.log(err))
})





//@Route        Post /shoppingcart/add/
//@description  Posts reviews about a particular product using it's id
//@access       access is public
router.post('/add/', ( req, res ) => {
    // destructuring data passed in through the request-body and assigning them to variables
    const { cart_id, product_id, attributes, quantity, subtotal  } = req.body;

    //a little backend validation to ensure all required data was submitted
    if ( !cart_id || !product_id || !attributes ) {
        return res.status(400).json({
            status: '400',
            code: 'USR_02',
            msg: 'Please fill in all the required fields',
            field: 'request body'
        })

    }
    
        const newCartEntry = new Shopping_cart({
            cart_id,
            product_id,
            attributes,
            quantity                
        })
  
        //Model the incoming data to fit the schema 
        
        //Store new product in database
        newCartEntry.save()             
        .then(newEntry=>{

            Product.findOne({
                attributes:[ 'name', 'image' ],
                where:{ product_id },
                raw: true
            })
            .then((prod_deets)=>{
                console.log(prod_deets);
                res.status(200).json({
                    item_id: newEntry.item_id,
                    name: prod_deets.name,
                    attributes: newEntry.attributes,
                    product_id: newEntry.product_id,
                    price: subtotal,
                    quantity: quantity,
                    image: prod_deets.image,
                    subtotal: subtotal
                })
            });
        })
    
                      
})





//@Route        PUT /shoppingcart/update
//@description  Updates the cart by item id
//@access       Access is public   
router.put('/update/', ( req, res ) => {     
    const item_id = req.query.item_id       
    // destructuring data passed in through the request-body and assigning them to variables
    const { quantity } = req.body;
    //if validation passes checks are then made to ensure user doesn't already exist.
    Shopping_cart.update({
         quantity     
    },
    {where: 
        { item_id}
    }

   )
   .then((rowsUpdated) => {
    res.json(rowsUpdated)
    })  
})






//@Route        GET /shoppingcart/totalAmount{cart_id}
//@description  Retrives list of products in a particular cart using it's Id
//@access       Access is public
router.get('/totalAmount/', (req, res) => {
    const cart_id = req.query.cart_id;
    Shopping_cart.findAll({
        attributes:['product_id'], 
        where:{ cart_id }
    })
    .then(prod_ids => {
        const ids = prod_ids.reduce(
            ( arr, elem ) => arr.concat(elem.product_id), []
            )
        console.log(ids);

        Product.findAll({
            attributes:['discounted_price'],
            where:{ product_id: ids },
            raw: true
        })
        .then((prod_prices)=>{
            const prices = prod_prices.reduce(
                (arr, elem)=> arr.concat(elem.discounted_price), []
                )
            console.log(prices);

            const totalAmount = (prices.map(function(i) { 
                      return /^\d+(\.\d+)?$/.test(i) ? parseFloat(i) : 0;
                }) 
                .reduce(
                (a, b) => a+b , 0
                ))

                res.status(200).json({
                    totalAmount
                });
        })  
        
    })
    .catch(err => console.log(err))
})





//@Route        DELETE /shoppingcart/removeProduct/{item_id}
//@description  Removes a single product using the item id
//@access       Access is public   
router.delete('/removeProduct/', ( req, res ) => {     
    const item_id = req.query.item_id;
    Shopping_cart.destroy({
        where: {
            item_id
        }
    })
   .then((rowsDeleted) => {
    res.json(rowsDeleted)
    })  
})





//@Route        DELETE /shoppingcart/empty/{cart_id}
//@description  Updates the cart by item
//@access       Access is public   
router.delete('/empty', ( req, res ) => {     
    const cart_id = req.query.cart_id

    Shopping_cart.destroy({
        where: {
           cart_id
        }
    })
   .then((rowsDeleted) => {
    res.json(rowsDeleted)
    })  
})





//@Route        GET /shoppingcart/item/{product_id}
//@description  Retrives a single cart item using the product id
//@access       Access is public 
router.get('/item', (req, res)=>{
    const product_id = req.query.product_id;
    const cart_id = req.query.cart_id;

    Shopping_cart.findAll({
        attributes:['item_id'],
        where:{ product_id, cart_id },
        raw: true
    })
    .then((item_id)=>{
        res.status(200).json(item_id);
    })
})


module.exports = router;