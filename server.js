const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

//end of declarations of dependencies

//initializing app
const app = express(); 

//including routes directories and storing them inside constant vars
const product = require('./routes/apis/product');
const customer = require('./routes/apis/customer');
const department = require('./routes/apis/department');
const shipping = require('./routes/apis/shipping');
const category = require('./routes/apis/category');
const attribute = require('./routes/apis/attribute');
const attribute_value = require('./routes/apis/attribute_value');
const audit = require('./routes/apis/audit');
const order = require('./routes/apis/order');
const order_details = require('./routes/apis/order_details');
const product_category = require('./routes/apis/product_category');
const product_attribute = require('./routes/apis/product_attribute');
const shipping_region = require('./routes/apis/shipping_region');
const shopping_cart = require('./routes/apis/shopping_cart');
const tax = require('./routes/apis/tax');
const review = require('./routes/apis/review');
const user = require('./routes/apis/user');
const auth = require('./routes/apis/auth');
const customers = require('./routes/apis/customers');
const stripe = require('./routes/apis/stripe');


//Setting up DB connection
const db = require('./config/connect');

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//homepage route
app.get('/', (req, res) => res.send('INDEX'));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));


//serving up static files(assets/images)
app.use(express.static('assets/product-images'));

//setting up routes(apis)
app.use('/products', product);
app.use('/customer', customer);
app.use('/customers', customers);
app.use('/departments', department);
app.use('/shipping', shipping);
app.use('/categories', category);
app.use('/attributes', attribute);
app.use('/attribute_value', attribute_value);
app.use('/audit', audit);
app.use('/orders', order);
app.use('/order_details', order_details);
app.use('/product_categories', product_category);
app.use('/product_attributes', product_attribute);
app.use('/shipping/regions', shipping_region);
app.use('/shoppingcart', shopping_cart);
app.use('/tax', tax);
app.use('/stripe', stripe);
app.use('/reviews', review);
app.use('/user', user);
app.use('/auth', auth);



const port = process.env.PORT || 8000;
app.listen(port, ()=>console.log(`Server is now listening in on ${port}`));