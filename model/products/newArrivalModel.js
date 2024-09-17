const mongoose = require("mongoose");

const NewArrival = mongoose.model("NewArrival", {
  title: String,
  imageUrl: String,
  description: String,
  price:Number
});

module.exports = NewArrival;
