const express = require('express');
require('dotenv').config();
const serverless = require('serverless-http');
const cors = require('cors');
const makeRequest = require('./utilities.js').makeRequest;
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

router.get('/connect', async (req,res)=>  await initFunction(res));

async function initFunction(res = null) {
  console.log('Connecting to Database');
  mongoose.connect( process.env.MONGO_URI,() => {
      console.log('connected to mongoDB');
      if(res){
          res.status(200).json({success: true, data: {}});
      }
  });
}

app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app);
