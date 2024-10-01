const { memoryStorage } = require("multer");
const Product =require("../model/ProductModel");
const { messageHandler } = require("../utils/utils");

const handleCatagory=async(req,res,catagory) =>{
    try {
    const products = await Product.find({catagory:catagory});
    if(products.length ===0){
        return messageHandler(res,203,"No Products ")
    }
    res.json({message:catagory,products})
        
    } catch (error) {
        console.log(error)
    }
}

const handleSubCatagory=async (req,res,subCatagory)=>{
    try {
        const products=await Product.find({subCatagory:subCatagory});
        if(products.length===0){
            return messageHandler(res,203,"No Products");

        }
        res.json({message:"subCatagory",products})
    } catch (error) {
        console.log(error)
    }
}

module.exports={handleCatagory,handleSubCatagory};

