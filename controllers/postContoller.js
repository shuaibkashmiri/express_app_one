const { messageHandler } = require("../utils/utils");
const Post = require("../model/postModel");
const User = require("../model/userModel");
const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");
config("/.env");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const handleCreatePost=async(req,res)=>{
    try {
        const _id = req.user;
        const user =await User.findById(_id)
        if(!user){
           return messageHandler(res,404,"User Not Found")
        }

        const author=user.username
        const {title}=req.body;
        const image =req.file.path;

        if(title===""|| !image){
            return messageHandler(res,203,"Title And Image Required");
        }

        const upload= await cloudinary.uploader.upload(image);
        if(!upload){
            return messageHandler(res,200,"Cloudinary Error")
        }

        const imageUrl =upload.secure_url;

        const newPost= await Post.create({title,imageUrl,author})
        if(newPost){
            return messageHandler(res,201,"Post Created Sucessfully")
        }
        
        
    } catch (error) {
        console.log(error)
    }
}


const getAllposts = async(req,res)=>{
try {
    const posts=await Post.find().lean();
    if(posts){
        res.json({message:"Posts Fetched Sucessfully",posts})
    }else{
        messageHandler(res,404,"No Posts Found")
    }
} catch (error) {
    console.log(error)
}
}


module.exports={handleCreatePost,getAllposts}
