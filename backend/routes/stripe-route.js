const express = require('express');
const stripe = require('stripe')("sk_test_51Me1dRL1CAti0I7MjprNFeNaC3OAdr7f8lZd2bH0rbiCMz9AcWjGJrrrX1HC8st5Pib5JGlW940qXPOzI7SWqs6b00u5xNxTP5");
const { v4: uuidv4 } = require('uuid')

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('it get respond from researcher');
    res.json({
        message: 'it works'
    });
});

router.post('/pay', (req, res, next) => {
    console.log(req.body.token)
    const { token, amount } = req.body;
    const idempotencykey = uuidv4()
    return stripe.customers.create({
        email: token.email,
        source: token
    }).then(customer => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, { idempotencykey })
    }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
    });

});
module.exports = router;