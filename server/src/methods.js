const table = require('./schema.js');

const saveUserCart = async (params, body) => {
    //add current timestamp
    const data = {...body, timestap:new Date()};
    const record = (await table.userCart.find({email:data.email}))[0];
    if(record){
        await table.userCart.findOneAndReplace({email:data.email}, data);
    }else{
        await table.userCart.create(data);
    }

    return {success: true, data};
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
    const data = {...body, timestap:new Date()};
     //markmodified create or update
    const record = (await table.checkOuts.find({checkoutId:data.checkoutId}))[0];
    if(record){
        if(!data.updateCart){
            data.cart = record.cart;
            data.paymentDetails = record.paymentDetails;
        }
        delete data.updateCart;
        await table.checkOuts.findOneAndReplace({checkoutId:data.checkoutId}, data);
    }else{
        delete data.updateCart;
        await table.checkOuts.create(data);
    }
    return {success: true, data: body};
};

const saveStore = async (params, body) => {
    let data = {...body, timestap:new Date()};
    if(data._id){
        data = await table.store.findOneAndReplace({_id:data._id}, data);
    } else {
        data = await table.store.create(data);
    }
    return {success: true, data: data};
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
    const record = (await table.store.find({_id:params.storeID}))[0];
    if(record){
        return {success: true, data: record};
    }else{
        return {success: false, data: null};
    }


};


module.exports = {
    saveUserCart,
    saveCheckout,
    saveStore,
    getCheckout,
    getUserCart,
    getStore,
};