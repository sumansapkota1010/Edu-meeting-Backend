const Course = require("../../../model/coursesModel");

const singleCourse = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id",
    });
  }
  const course = await Course.find({ _id: id });
  if (course.length == 0) {
    res.status(400).json({
      message: "No course found with that id",
      course: [],
    });
  } else {
    res.status(200).json({
      message: "Single Course fetched successfully",
      course,
    });
  }
};

module.exports = singleCourse;
