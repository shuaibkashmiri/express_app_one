const User =require('../model/userModel');

const signUpHandler=async(req,res)=>{
    try {
        
        const {username,email,password} =req.body;

        const newUser=await new User({username,email,password})
        const updateDb=await newUser.save();
        if(updateDb){
            res.json({msg:"User Registered Successfully"})
        }
    } catch (error) {
        console.log('Something wrong with server')
    }

}

module.exports={signUpHandler}