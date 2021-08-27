const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userModel = new Schema(
    {
        NAME:{type:String,required:true},
        EMAIL:{type:String,required:true},
        PASSWORD:{type:String,required:true},
        CONTACT_DETAILS:{type:Array},

        WISHLIST:{type:Array},
        CART:{type:Array},
        OTP:{type:String}
    }
)
module.exports = Mongoose.model('users',userModel);

