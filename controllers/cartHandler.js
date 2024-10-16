const Product = require("../model/ProductModel");
const User = require("../model/userModel");
const { messageHandler } = require("../utils/utils");

const addToCart = async (req, res) => {
  try {
    const userId = req.user;
    const productID = req.params;
    console.log(productID);
    const { quantity, size, color } = req.body;

    const getUser = await User.findById(userId);

    const cartObj = {
      productID: productID,
      quantity: quantity,
      size: size,
      color: color,
      price: 33,
    };
    if (getUser) {
      getUser.cart.push(cartObj);
      await getUser.save();
      return messageHandler(res, 201, "Added To Cart");
    }
 
  } catch (error) {
    console.log(error);
  }
};

const getCart = async (req, res) => {
  try {
    // const userId = req.user;
    const userId = "67095e51401b5a59ffc1ceaf";
    const getUser = await User.findById(userId);

    if (getUser) {
      return res.json({ message: "cart Fetched", getUser });
    }
    return messageHandler(res, 306, "No user");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addToCart, getCart };
