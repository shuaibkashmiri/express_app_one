const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const { messageHandler } = require("../utils/utils");
config("/.env");

const verifyUser=(req,res)=>{
    try {
        const secretKey=process.env.SECRET_KEY;
        const {token}=req.params;

        jwt.verify(token,secretKey,(error,decode)=>{
            if(error){
                res.json({msg:"not verified"})
            }else{
                res.json({msg:"Token verified" ,decode})
            }
        })
        
    } catch (error) {
        console.log(error)
    }
}

module.exports=verifyUser;