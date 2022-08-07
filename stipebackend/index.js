
const express = require('express')
const app = express()
const port = 3000

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


app.post('/login',(req, res) => {

    res.status(200).send({ success: true, error: "req.body.email "})
    });

 app.post('/', (req, res) => {
    try {

      let customerId;

        //Gets the customer who's email id matches the one sent by the client
       stripe.customers.list({
            email: "example@gmail.com",//req.body.email,
            limit: 1
        }).then((user)=>{
            if (user.length != 0) {
                customerId = user.data[0].id;
            }
            else {
             stripe.customers.create({
                    email: "example@gmail.com",//req.body.email
              }).then((customer) =>
              {
                customerId = customer.data.id;
              });
         
            }
        }).then((val) =>
        {
            stripe.ephemeralKeys.create(
                { customer: customerId },
                { apiVersion: '2020-08-27' }
            ).then((ephemeralKey) => 
            {
                stripe.paymentIntents.create({
                    amount: 200,//parseInt(req.body.amount),
                    currency: 'sgd',
                    customer: customerId,
                }).then((paymentIntent) =>
                {
                    res.status(200).send(
                        {
                          //  email: req.body.email,
                            paymentIntent: paymentIntent.client_secret,
                            ephemeralKey: ephemeralKey.secret,
                            customer: customerId,
                            success: true,
                            
                        })
                }).catch((err)=>
                {
                    res.status(404).send({ success: false, error: error.message })
                });
            }).catch((err)=>
            {
                res.status(404).send({ success: false, error: error.message })
            });
        }).catch((err)=>
        {
            res.status(404).send({ success: false, error: error.message })
        });
                
        //Checks the if the customer exists, if not creates a new customer
       

        //Creates a temporary secret key linked with the customer 
   

        //Creates a new payment intent with amount passed in from the client
    

       
        
    } catch (error) {
        res.status(404).send({ success: false, error: error.message })
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})