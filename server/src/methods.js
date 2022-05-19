const table = require('./schema.js');

const saveUserCart = async (params, body) => {
    const record = (await table.configs.find({email:params.email}))[0];
    if(record){
        await table.userCart.findOneAndUpdate({email:params.email}, body);
        return {success: true, data: body};
    }else{
        //create new
        await (new table.userCart(body)).save();
        return {success: true, data: body};
    }
};


const getUserCart = async (params, body) => {

};

const saveCheckout = async (params, body) => {


};



module.exports = {
    saveUserCart,
    getUserCart,
};