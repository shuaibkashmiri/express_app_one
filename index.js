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

server.listen(port, () => {
  console.log(`Server is listening on port ${port} `);
});
connectDb();
