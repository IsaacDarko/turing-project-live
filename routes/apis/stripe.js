const express = require('express');
const router = express.Router();
const uuid = require('uuid/v1');
const stripe = require('stripe')('sk_test_Nys2YAyOz9wOX6xZsnt7D9Yj00TI8LLd4C');



router.post("/charge", async (req, res) => {
  console.log("Stripe Request:", req.body);

  let error;
  let status;

  try {
    const { token, product_names, amount } = req.body

    const customer = await stripe.customers.create({
      email : token.email,
      source : token.id
    })

    const idempotency_key = uuid();

    const charge = await stripe.charges.create({
      amount: parseFloat(amount)*100,
      currency: "usd",
      receipt_email:token.email,
      description: `An charge for purchase of ${product_names}`,
      shipping: {
        name: token.card.name,
        address: {
              line1:token.card.address_line1,
              line2:token.card.address_line2,
              city:token.card.address_city,
              country:token.card.address_country,
              postal_code:token.card.address_zip
        }
      },
      source : token.id      
    }, 
        { idempotency_key }
    );
    console.log("Charge:", {charge} );
    status = "success";
  } catch (error) {
    console.error( "Error:", error );
    status = "failure";
  }

  res.json({ error, status });
});







module.exports = router;