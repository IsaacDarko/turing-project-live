const express = require('express');
const router = express.Router();
const db = require('../../config/connect');
const Attribute = require('../../models/Attribute');
const ProductAttribute = require('../../models/Product_attribute');
const AttributeValue = require('../../models/Attribute_value');


//@Route        GET /attributes
//@description  Retrieves all attributes information from attributes table
//@access       Access is public
router.get('/', (req, res) => {
    Attribute.findAll()
    .then(attributes => {
        res.status(200).json(attributes);
    })
});





//@Route        GET /attributes/attribute/{attribute_id}
//@description  Retrieves attributes information using attribute id passed into the request url
//@access       Access is public
router.get('/attribute', (req, res) => {
    const attribute_id = req.query.attribute_id;
    if(!attribute_id){
        res.status(400).json({
            status:'400',
            code:'ATT_01',
            message:'attribute id required',
            field:'request url'
        })
    }
    Attribute.findAll({
        where:{ attribute_id }    
    })
    .then(attribute => {
        res.status(200).json(attribute);
    })
    .catch(
        err => console.log(err)
    )
});




//@Route        GET /attributes/values/{attribute_id}
//@description  Retrieves all attributes information from attributes table
//@access       Access is public
router.get('/values', (req, res) => {
    const attribute_id = req.query.attribute_id;
    AttributeValue.findAll({
        attributes:['attribute_value_id', 'value'],
        where:{ attribute_id }
    })
    .then(attribute_values => {
        res.status(200).json(attribute_values);
    })
    .catch(
        err => console.log(err)
    )
});






//@Route        GET /attributes/inProduct/{product_id}
//@description  Retrieves all attributes information from attributes table
//@access       Access is public
router.get('/inProduct', (req, res) => {
    const product_id = req.query.product_id;
    ProductAttribute.findAll({
        attributes:['attribute_value_id'],
        where:{ product_id }
    })
    .then((ids) =>{
        attribute_value_id = ids.reduce(
            (arr, elem) => arr.concat(elem.attribute_value_id), []
        )
        Attribute.hasMany(AttributeValue, { foreignKey: "attribute_value_id" });
        AttributeValue.belongsTo(Attribute, { foreignKey: "attribute_value_id" } )
        AttributeValue.findAll({
            include:[{
                    model: Attribute,
                    attributes:['name']
            }],
            attributes:['attribute_value_id', 'value'],
            where:{ attribute_value_id }
        })
        .then(attributes => {
            res.status(200).json(attributes);
        })
    })

    
    .catch(
        err => console.log(err)
    )
});



module.exports = router;