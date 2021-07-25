const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const productModel = new Schema(
    {
        SERIAL_NO: {type:Number, required:true},
        NAME: {type:String, required:true},
        CATEGORY: {type:String, required:true},
        DESCRIPTION_COLOR: {type:String, required:true},
        FABRIC: {type:String},
        IMAGE: {type:String, required:true},
        PRICE: {type:Number, required:true},
        SIZE: {type:String},
        PRODUCT_ID: {type:Number, required:true, Unique:true},
        WEBSITE: {type:String, required:true},
        PRODUCT_URL: {type:String, required:true}
      }

)
module.exports = Mongoose.model('myntra-mens',productModel);