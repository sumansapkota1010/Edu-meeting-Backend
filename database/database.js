const mongoose = require("mongoose");
const User = require("../model/userModel");

exports.databaseConnection = async (URI) => {
  await mongoose.connect(URI);
  console.log("MongoDB connected Successfully");

  //admin seeding

  // check whether admin exist or not

  const isAdminExist = await User.findOne({ userEmail: "admin@gmail.com" });

  console.log(isAdminExist);

  if (!isAdminExist) {
    await User.create({
      userEmail: "admin@gmail.com",
      userPassword: "admin",
      userPhoneNumber: "9840300084",
      userName: "admin",
      role: "admin",
    });
    console.log("admin seeded successfully");
  } else {
    console.log("Admin already seeded");
  }
};
