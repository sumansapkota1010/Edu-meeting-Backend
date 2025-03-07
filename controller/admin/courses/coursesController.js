const Course = require("../../../model/coursesModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

exports.createCourse = async (req, res) => {
  const { title, description, price, rating } = req.body;

  const parsedPrice = parseFloat(price);
  const parsedRating = parseFloat(rating);

  const file = req.file;
  console.log(file);

  let filePath;
  if (!file) {
    filePath =
      "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
  } else {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "courses_images",
    });
    filePath = result.secure_url;
  }

  if (!title || !description || isNaN(parsedPrice) || isNaN(parsedRating)) {
    return res.status(400).json({
      message: "Please provide title, description, price,and rating",
    });
  }

  await Course.create({
    title,
    description,
    price: parsedPrice,
    courseImage: filePath,
    rating: parsedRating,
  });

  res.status(201).json({
    message: "Course created successfully",
  });
};
