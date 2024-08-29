const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");

exports.registerUser = async (req, res) => {
  const { username, email, password, phonenumber } = req.body;

  if (!username || !email || !password || !phonenumber) {
    return res.status(400).json({
      message: "Please provide username,email,password,phonenumber",
    });
  }
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phonenumber)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  // check if that email user already exist or not

  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User with that email already registered",
    });
  }

  const userData = await User.create({
    userName: username,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 10),
    userPhoneNumber: phonenumber,
  });
  res.status(201).json({
    message: "User registered successfully",
    data: userData,
  });
};

exports.loginUser = async (req, res) => {
  const User = mongoose.model("User");

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(404).json({
      message: "User with that email is not registered",
    });
  }

  //password check
  const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);
  if (isMatched) {
    const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "50d",
    });

    //generate token

    res.status(200).json({
      message: "User logged in successfully",
      data: token,
    });
  } else {
    res.status(400).json({
      message: "Invalid Password",
    });
  }
};
