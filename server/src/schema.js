const mongoose = require('mongoose');
const userCart = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    checkOuts : {
        type: Array,
        default: []
    },
    cart : {
        type: Array,
        default: []
    },
    timestap:{
        type: Date,
        default: Date.now
    }
});

const checkOuts = new mongoose.Schema({
    checkoutId : {
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    cart : {
        type: Array,
        default: []
    },
    status:{
        type: String,
        default:'pending'
    },
    timestap:{
        type: Date,
        default: Date.now
    },
    paymentDetails:{
        type: Object,
        default: {}
    }
});

const store = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    productImage:{
        type: String,
        required: true
    },
    productURL:{
        type: String,
    },
    sellerName:{
        type: String,
        required: true
    },
    sellerEmail:{
        type: String,
        required: true
    },
    rapydWallet:{
        type: String,
        required: true
    },
    supportLink:{
        type: String,
    },
    timestap:{
        type: Date,
        default: Date.now
    },
    affiliatePercent:{
        type: Number,
        default: 0
    },
    active:{
        type: Boolean,
        default: true
    }
});


module.exports = {
    userCart   :   mongoose.model('UserCart', userCart),
    checkOuts  :   mongoose.model('CheckOuts', checkOuts),
    store      :   mongoose.model('Store', store),
};