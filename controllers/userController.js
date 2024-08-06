const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const { messageHandler } = require("../utils/utils");
const jwt =require("jsonwebtoken");
const {config} =require ("dotenv")
config("/.env")
const secretKey =process.env.SECRET_KEY;

const signUpHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username !== "" && password !== "" && email !== "") {
      const findUser = await User.findOne({ email });
      if (findUser) {
        res.json({ message: "User Already Registered" });
      } else {
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          username,
          email,
          password: hashPass,
        });
        if (newUser) {
          res.json({ message: "User Registered Sucessfully" });
        } else {
          res.json({ message: "Some error" });
        }
      }
    } else {
      res.json({ msg: "Enter All Credentials" });
    }
  } catch (error) {
    console.log("Something wrong with server");
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      return messageHandler(res, 203, "All credentails Required!");
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return messageHandler(res, 203, "No user Found");
    }

    const checkpass = await bcrypt.compare(password, existingUser.password);

    if (!checkpass) {
      return messageHandler(res, 203, "Password Incorrect");
    }

    const payload = existingUser._id;

    const createToken = await jwt.sign({ _id: payload }, secretKey);

    if (createToken) {
      res.json({ message: "user loggin success", token: createToken });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserDetails=async(req,res)=>{
  try {
    const {_id}=req.params;
    if(_id){
      const getUser = await User.findById(_id);
      messageHandler(res,200,{msg:"User Fetched SucessFully", "userdetails": getUser})
    }
  } catch (error) {
    console.log(error)
  }
}


const handleDelete=async (req,res)=>{
  try {
    const  {_id} =req.user;
    console.log(_id)
    const checkUser=await User.findById(_id);
    if(checkUser){
      await User.findByIdAndDelete(_id);
      messageHandler(res,200,"User Deleted Sucessfully");
    }else{
      messageHandler(res,200,"User not found")
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { signUpHandler, loginHandler ,getUserDetails,handleDelete};
