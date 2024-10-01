const { messageHandler } = require("../utils/utils");
const Product = require("../model/ProductModel");
const User = require("../model/userModel");
const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");
config("/.env");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const handleAddProducts = async (req, res) => {
  try {
    const _id = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return messageHandler(res, 404, "User Not Found");
    }


    const { title,description,price,catagory,subCatagory,size} = req.body;
    const image = req.file.path;

    if (title === ""  && !image && description==="" && price==="" && catagory && subCatagory && size) {
      return messageHandler(res, 203, "All Fields Required");
    }

    const upload = await cloudinary.uploader.upload(image);
    if (!upload) {
      return messageHandler(res, 200, "Cloudinary Error");
    }

    const imageUrl = upload.secure_url;

    const newProduct = await Product.create({ title, imageUrl, price,description,catagory,subCatagory,size});
    if (newProduct) {
      return messageHandler(res, 201, "Product Added SucessFully");
    }
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const newProducts = await Product.find();
    if (newProducts) {
      res.json({ message: "Products Fetched Sucessfully", newProducts });
    } else {
      messageHandler(res, 404, "No Produts Found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleAddProducts, getProducts };
