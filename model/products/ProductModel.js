const mongoose = require("mongoose");

const Product = mongoose.model("NewArrival", {
  title: String,
  imageUrl: String,
  description: String,
  price:Number,
  catagory:String,
  gender:String,
  size:Number
});

module.exports = Product;
