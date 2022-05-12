const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')

const app = express()
const router = express.Router();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


router.get('/test', async (req,res)=>{
    res.status(200).json({success: true})
});

app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app)
