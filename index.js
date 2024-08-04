const express = require("express");
const cors=require("cors");
const connectDb = require("./utils/connectDb");
const {signUpHandler, loginHandler, getUserDetails} = require("./controllers/userController");
const verifyUser = require("./controllers/userVerification");

const {config} =require ("dotenv")
config("/.env")
const port =process.env.PORT;
const server =express();

server.use(cors());  /* Middle ware  (used to monitor incoming and outgoing data)*/
server.use(express.json())

server.get('/',(req,res)=>{res.json({name:'Shoaib',email:'shoaib@gmail.com'})})

server.post("/user/signUp", signUpHandler)
server.post("/user/login", loginHandler)

server.get("/token/verify/:token", verifyUser)
server.get("/user/userdetails/:_id", getUserDetails)



server.listen(port,()=>{
    console.log(`Server is listening on port ${port} `);
})
connectDb()