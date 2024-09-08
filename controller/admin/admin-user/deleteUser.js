const User = require("../../../model/userModel");

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id ",
    });
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({
    message: "User deleted successfully",
  });
};

module.exports = deleteUser;
