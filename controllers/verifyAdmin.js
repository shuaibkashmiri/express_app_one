const User=require("../model/userModel");
const { config } = require("dotenv");
const { messageHandler } = require("../utils/utils");
config("/.env");

const verifyAdmin=async (req,res)=>{
    try {
        const adminMail=process.env.ADMIN_EMAIL
        const id =req.user;
        const finduser=await User.findById(id);
        const usermail =finduser.email;
        if(usermail===adminMail){
            return messageHandler(res,201,"Admin Verified")
        }else{
            return messageHandler(res,200,"Unauthorised")
        }
        console.log(usermail)
        
    } catch (error) {
        console.log(error)
    }

}

module.exports=verifyAdmin