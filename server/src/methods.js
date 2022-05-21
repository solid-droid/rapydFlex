const table = require('./schema.js');

const saveUserCart = async (params, body) => {
    const record = (await table.userCart.find({email:body.email}))[0];
    if(record){
        await table.userCart.findOneAndUpdate({email:body.email}, body);
        return {success: true, data: body};
    }else{
        //create new
        await (new table.userCart(body)).save();
        return {success: true, data: body};
    }
};


const getUserCart = async (params, body) => {
    const record = (await table.userCart.find({email:params.email}))[0];
    if(record){
        return {success: true, data: record};
    }else{
        return {success: false, data: null};
    }
};

const saveCheckout = async (params, body) => {
    const record = (await table.checkOuts.find({checkoutId:body.checkoutId}))[0];
    if(record){
        await table.checkOuts.findOneAndUpdate({checkoutId:body.checkoutId}, body);
        return {success: true, data: body};
    }else{
        //create new
        await (new table.checkOuts(body)).save();
        return {success: true, data: body};
    }

};

const saveStore = async (params, body) => {


};



const getCheckout = async (params, body) => {
    const record = (await table.checkOuts.find({checkoutId:params.checkoutID}))[0];
    if(record){
        return {success: true, data: record};
    }else{
        return {success: false, data: null};
    }

};


const getStore = async (params, body) => {


};


module.exports = {
    saveUserCart,
    saveCheckout,
    saveStore,
    getCheckout,
    getUserCart,
    getStore,
};