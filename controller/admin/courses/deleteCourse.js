const Course = require("../../../model/coursesModel");

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "please provide id",
    });
  }
  await Course.findByIdAndDelete(id);
  res.status(200).json({
    message: "Course deleted successfully",
  });
};

module.exports = deleteCourse;
