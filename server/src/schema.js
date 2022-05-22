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
    }
});


module.exports = {
    userCart   :   mongoose.model('UserCart', userCart),
    checkOuts  :   mongoose.model('CheckOuts', checkOuts),
};