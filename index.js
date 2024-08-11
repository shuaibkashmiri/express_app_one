const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/connectDb");
const {
  signUpHandler,
  loginHandler,
  getUserDetails,
  handleDelete,
} = require("./controllers/userController");
const verifyUser = require("./controllers/userVerification");

const { config } = require("dotenv");
const isAuthenticated = require("./middlewares/auth");
const multmid =require("./middlewares/multer");    
const { getAllposts, handleCreatePost } = require("./controllers/postContoller");

config("/.env");
const port = process.env.PORT;
const server = express();

server.use(
  cors()
); /* Middle ware  (used to monitor incoming and outgoing data)*/
server.use(express.json());

//get routes
server.get("/", (req, res) => {
  res.json({ name: "Shoaib", email: "shoaib@gmail.com" });
});
server.get("/token/verify/:token", verifyUser);
server.get("/user/userdetails/:_id", getUserDetails);

//post routes
server.post("/user/signUp", signUpHandler);
server.post("/user/login", loginHandler);


//delete routes

server.delete("/user/delete/:token", isAuthenticated ,handleDelete);


// api roustes for posts feeds

server.post("/post/createPost/:token",isAuthenticated,multmid,handleCreatePost);
server.get("/post/getAll", getAllposts )

server.listen(port, () => {
  console.log(`Server is listening on port ${port} `);
});
connectDb();
