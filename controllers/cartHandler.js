const Product =require("../model/ProductModel")
const User =require("../model/userModel");
const { messageHandler } = require("../utils/utils");

const addToCart =async(req,res)=>{
    try {
        const userId=req.user;
        const productID=req.params
        console.log(productID)
        const {quantity,size,color}=req.body;
        
        const getUser=await User.findById(userId);
        if(getUser){
            getUser.cart.push({productID:productID._id,quantity:parseInt(quantity),size:size,color:color})
            await getUser.save()
            return messageHandler(res,201,"Added To Cart")
        }
        return messageHandler(res,306,"Some Error")
    } catch (error) {
        console.log(error)
    }
}

module.exports={addToCart}