const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const connectDb = require("./utils/connectDb");
const {
  signUpHandler,
  loginHandler,
  getUserDetails,
  handleDelete,
  handleEdit,
} = require("./controllers/userController");
const verifyUser = require("./controllers/userVerification");

const isAuthenticated = require("./middlewares/auth");
const multmid = require("./middlewares/multer");
const {
  getAllposts,
  handleCreatePost,
} = require("./controllers/postContoller");
const { config } = require("dotenv");
config("/.env");
const port = process.env.PORT;
// const origin=process.env.ORIGIN;
const server = express();



//  MiddleWares
server.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true  
})); /* Middle ware  (used to monitor incoming and outgoing data)*/
server.use(express.json());
server.use(cookie());

//get routes
server.get("/", (req, res) => {
  res.json({
    name: "Shoaib",
    email: "shoaib@gmail.com",
    status: "Server Running",
  });
});
// Token Verify Route
server.get("/token/verify/:token", verifyUser);
//User Api Routes
server.post("/user/signUp", signUpHandler);
server.post("/user/login", loginHandler);
//User Api Routes Authenticated
server.get("/user/userdetails", isAuthenticated, getUserDetails);
server.put("/user/edit", isAuthenticated, handleEdit);
server.delete("/user/delete", isAuthenticated, handleDelete);

// api roustes for posts feeds

server.post("/post/createPost", isAuthenticated, multmid, handleCreatePost);
server.get("/post/getAll", isAuthenticated, getAllposts);
server.listen(port, () => {
  console.log(`Server is listening on port ${port} `);
});
connectDb();
