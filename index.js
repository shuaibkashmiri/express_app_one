const express = require("express");
const cors=require("cors");
const connectDb = require("./utils/connectDb");
const { signUpHandler } = require("./controllers/userController");
const port =4000;
const server =express();

server.use(cors());  /* Middle ware  (used to monitor incoming and outgoing data)*/
server.use(express.json())

server.get('/',(req,res)=>{res.json({name:'Shoaib',email:'shoaib@gmail.com'})})

server.post("/signUp", signUpHandler)

server.listen(port,()=>{
    console.log(`Server is listening on port ${port} `);
})
connectDb()