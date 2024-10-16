const mongoose = require("mongoose");

const Product = mongoose.model("Product",{
  title: String,
  imageUrl: String,
  description: String,
  price:Number,
  catagory:String,
  subCatagory:String,
  size:String,
  stock:Number
});

module.exports = Product;
