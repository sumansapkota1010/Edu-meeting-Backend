const mongoose = require("mongoose");
const User = require("../model/userModel");
const adminSeeder = require("../adminSeeder");

exports.databaseConnection = async (URI) => {
  await mongoose.connect(URI);
  console.log("MongoDB connected Successfully");

  adminSeeder();
};
