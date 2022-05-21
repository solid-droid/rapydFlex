const express = require('express');
require('dotenv').config();
const serverless = require('serverless-http');
const cors = require('cors');
const makeRequest = require('./utilities.js').makeRequest;
const methods = require('./methods.js');
const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const mongoose = require('mongoose');
process.env.CONTEXT = 'production';

router.get('/api', async (req,res)=>{
    res.status(200).json({success: true})
});

router.post('/api', async (req, res) => {
    try {
        const {url , method , body} =  req.body;
        if(method === 'GET'){
          const result = await makeRequest('GET', url);
          res.json(result);
        } else if(method === 'POST'){
          const result = await makeRequest('POST', url, body);
          res.json(result);
        } else {
          res.json({
            error: 'Invalid method'
          });
        }


      } catch (error) {
        res.json(error);
      }
});

router.post('/checkout', async (req, res) => {
  try {
    initFunction();
    const result = await methods.saveCheckout(req.params, req.body);
    res.json(result);

  } catch (error) {
    res.json(error);
  }
});

router.post('/store', async (req, res) => {
  try {
    initFunction();
    const result = await methods.saveStore(req.params, req.body);
    res.json(result);

  } catch (error) {
    res.json(error);
  }
});

router.post('/userCart', async (req, res) => {
  try {
    initFunction();
    const result = await methods.saveUserCart(req.params, req.body);
    res.json(result);

  } catch (error) {
    res.json(error);
  }
});

router.get('/userCart/:email', async (req, res) => {
  try {
    initFunction();
    const result = await methods.getUserCart(req.params, req.body);
    res.json(result);

  } catch (error) {
    res.json(error);
  }
});

router.get('/checkout/:checkoutID', async (req, res) => {
  try {
    initFunction();
    const result = await methods.getCheckout(req.params, req.body);
    res.json(result);

  } catch (error) {
    res.json(error);
  }
});


router.get('/store/:storeID', async (req, res) => {
  try {
    initFunction();
    const result = await methods.getStore(req.params, req.body);
    res.json(result);

  } catch (error) {
    res.json(error);
  }
});


router.get('/connect', async (req,res)=>  await initFunction(res));

async function initFunction(res = null) {
  console.log('Connecting to Database');
  console.log(process.env.testing);
  mongoose.connect( process.env.MONGO_URI,() => {
      console.log('connected to mongoDB');
      if(res){
          res.status(200).json({success: true, data: {}});
      }
  });
}

app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app);
