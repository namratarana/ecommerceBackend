const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userModel = new Schema(
    {
        NAME:{type:String,required:true},
        EMAIL:{type:String,required:true},
        PASSWORD:{type:String,required:true},
        OTP:{type:Number}
    }
)
module.exports = Mongoose.model('users',userModel);

