const Course = require("../../../model/coursesModel");

const getCourse = async (req, res) => {
  const courses = await Course.find();
  if (courses.length == 0) {
    res.status(400).json({
      message: "No courses found",
      courses: [],
    });
  } else {
    res.status(200).json({
      message: "Courses fetched Successfully",
      courses,
    });
  }
};

module.exports = getCourse;
