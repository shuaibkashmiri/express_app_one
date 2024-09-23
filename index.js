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

const {isAuthenticated, isAdmin} = require("./middlewares/auth");
const multmid = require("./middlewares/multer");
const {
  handleNewArrivals,
  getNewArrivals,
  handleAddProducts,
  getProducts,
} = require("./controllers/productContoller");
const { config } = require("dotenv");
const verifyAdmin = require("./controllers/verifyAdmin");
config("/.env");
const port = process.env.PORT;
// const frontOrigin=process.env.ORIGIN;
const server = express();



//  MiddleWares
server.use(cors({
  // origin: 'http://localhost:3000',  
  origin:"https://adventure-outfits-shuaibkashmiris-projects.vercel.app",
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
server.get("/token/verify", verifyUser);
//User Api Routes
server.post("/user/signUp", signUpHandler);
server.post("/user/login", loginHandler);
//User Api Routes Authenticated
server.get("/user/userdetails", isAuthenticated, getUserDetails);
server.put("/user/edit", isAuthenticated, handleEdit);
server.delete("/user/delete", isAuthenticated, handleDelete);
//Admin Routes
// admin route for front-End Verification
server.get("/user/isAdmin",isAuthenticated,verifyAdmin)


// api roustes for Products 

server.post("/products/add", isAuthenticated,isAdmin, multmid, handleAddProducts);
server.get("/products/getAll",getProducts);
server.listen(port, () => {
  console.log(`Server is listening on port ${port} `);
});

connectDb();
