const Course = require("../../../model/coursesModel");
const cloudinary = require("cloudinary").v2;
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

  let newImageUrl;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "courses_images",
    });
    newImageUrl = result.secure_url;

    //old image exists garxa bhane delete garne
    if (oldData.courseImage) {
      const publicId = oldData.courseImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`courses_images/${publicId}`);
    }
    fs.unlinkSync(req.file.path);
  }

  const courseDatas = await Course.findByIdAndUpdate(id, {
    title,
    description,
    price: parsedPrice,
    courseImage: newImageUrl || oldData.courseImage,

    rating: parsedRating,
  });
  res.status(200).json({
    message: "Course updated successfully",
    courseDatas,
  });
};

module.exports = updateCourse;
