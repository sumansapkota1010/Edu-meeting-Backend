const jwt = require("jsonwebtoken");
const { decode } = require("punycode");
const User = require("../model/userModel");
const promisify = require("util").promisify;

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "Please login",
    });
  }
  // pathayo bhaney k garne ta
  // verify if the token is legit or not
  /*  jwt.verify(token, process.env.SECRET_KEY, (err, success) => {
    if (err) {
      res.status(400).json({
        message: "Invalid Token",
      });
    } else {
      res.status(200).json({
        message: "Valid Token",
      });
    }
  }); */

  //Alernative

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

    const doesUserExist = await User.findOne({ _id: decoded.id });
    if (!doesUserExist) {
      return res.status(400).json({
        message: "User doesnot exists with that token/id",
      });
    }

    req.user = doesUserExist;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// check if decoded.id(userID) exists in the user table

module.exports = isAuthenticated;
