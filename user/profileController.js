const User = require("../model/userModel");

exports.getMyProfile = async (req, res) => {
  const userId = req.user.id;
  const myProfile = await User.findById(userId);
  // send response
  res.status(200).json({
    data: myProfile,
    message: "Profile fetched successfully",
  });
};
