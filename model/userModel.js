const mongoose = require("mongoose");
const User = mongoose.model("User", {
  username : String,
    email : String,
    password : String,
    street:String,
    landMark : String,
    city : String,
    State: String,
    isEmailVerified : Boolean,
    cartValue : {type : Number },
    cart:[{
      productID:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
      quantity:{type : Number},
      price:{type:Number},
      size:{type:String},
      color:{type:String}
    }]

});

module.exports = User;
