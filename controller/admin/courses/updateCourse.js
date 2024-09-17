const Course = require("../../../model/coursesModel");

const fs = require("fs");

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, rating } = req.body;
  const parsedPrice = parseFloat(price);
  const parsedRating = parseFloat(rating);

  if (
    !title ||
    !description ||
    isNaN(parsedPrice) ||
    isNaN(parsedRating) ||
    !id
  ) {
    return res.status(400).json({
      message: "Please provide title, description, price,rating and id",
    });
  }

  const oldData = await Course.findById(id);
  if (!oldData) {
    return res.status(400).json({
      message: "No data found with that id",
    });
  }

  const oldCourseImage = oldData.courseImage; //https://edu-meeting-backend.vercel.app/course-01.jpg
  const lengthToCut = process.env.BACKEND_URL;
  const finalFilePath = oldCourseImage.slice(lengthToCut);

  if (req.file && req.file.filename) {
    // remove file from uploads folder
    fs.unlink("./uploads/" + finalFilePath, (err) => {
      if (err) {
        console.log("error deleting file");
      } else {
        console.log("File deleted Successfully");
      }
    });
  }

  const courseDatas = await Course.findByIdAndUpdate(id, {
    title,
    description,
    price: parsedPrice,
    courseImage:
      req.file && req.file.filename
        ? process.env.BACKEND_URL + req.file.filename
        : oldCourseImage,
    rating: parsedRating,
  });
  res.status(200).json({
    message: "Course updated successfully",
    courseDatas,
  });
};

module.exports = updateCourse;
