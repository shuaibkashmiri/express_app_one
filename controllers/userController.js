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
        res.json({ message: "user Already Registered" });
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
      res.json({ msg: "enter Credentials" });
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

module.exports = { signUpHandler, loginHandler };