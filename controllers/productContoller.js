const { messageHandler } = require("../utils/utils");
const NewArrival = require("../model/products/newArrivalModel");
const User = require("../model/userModel");
const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");
config("/.env");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const handleNewArrivals = async (req, res) => {
  try {
    const _id = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return messageHandler(res, 404, "User Not Found");
    }


    const { title,description,price } = req.body;
    const image = req.file.path;

    if (title === ""  && !image && description==="" && price==="") {
      return messageHandler(res, 203, "All Fields Required");
    }

    const upload = await cloudinary.uploader.upload(image);
    if (!upload) {
      return messageHandler(res, 200, "Cloudinary Error");
    }

    const imageUrl = upload.secure_url;

    const newProduct = await NewArrival.create({ title, imageUrl, price,description });
    if (newProduct) {
      return messageHandler(res, 201, "Product Added SucessFully");
    }
  } catch (error) {
    console.log(error);
  }
};

const getNewArrivals = async (req, res) => {
  try {
    const newProducts = await NewArrival.find();
    if (newProducts) {
      res.json({ message: "Products Fetched Sucessfully", newProducts });
    } else {
      messageHandler(res, 404, "No Produts Found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleNewArrivals, getNewArrivals };
