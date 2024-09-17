const jwt = require("jsonwebtoken");
const { messageHandler } = require("../utils/utils");
const { config } = require("dotenv");
config("/.env");

const isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.cookies;
    const secretKey = process.env.SECRET_KEY;
    jwt.verify(token, secretKey, (error, decode) => {
      if (error) {
        messageHandler(res, 401, "Unauthorised");
      } else {
        req.user = decode._id;
        return next();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = isAuthenticated;
