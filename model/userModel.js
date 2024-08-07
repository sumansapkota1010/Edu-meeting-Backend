const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username must be provided"],
    },
    userEmail: {
      type: String,
      required: [true, "Email must be provided"],
    },
    userPassword: {
      type: String,
      required: [true, "Password must be provided"],
    },
    userPhoneNumber: {
      type: Number,
      required: [true, "PhoneNumber must be provided"],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
