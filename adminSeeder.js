const User = require("./model/userModel");

const bcrypt = require("bcrypt");

const adminSeeder = async () => {
  //admin seeding

  // check whether admin exist or not

  const isAdminExist = await User.findOne({ userEmail: "admin@gmail.com" });

  console.log(isAdminExist);

  if (!isAdminExist) {
    await User.create({
      userEmail: "admin@gmail.com",
      userPassword: bcrypt.hashSync("admin", 10),
      userPhoneNumber: "9840300084",
      userName: "admin",
      role: "admin",
    });
    console.log("admin seeded successfully");
  } else {
    console.log("Admin already seeded");
  }
};

module.exports = adminSeeder;
