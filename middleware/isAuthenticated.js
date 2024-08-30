const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { promisify } = require("util");

const isAuthenticated = async (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Please login",
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

    const doesUserExist = await User.findById(decoded.id);

    if (!doesUserExist) {
      return res.status(400).json({
        message: "User does not exist with that token/id",
      });
    }

    req.user = doesUserExist;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid token",
    });
  }
};

module.exports = isAuthenticated;
