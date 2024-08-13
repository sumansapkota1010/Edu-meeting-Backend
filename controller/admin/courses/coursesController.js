const Course = require("../../../model/coursesModel");

exports.createCourse = async (req, res) => {
  const { title, description, price, rating } = req.body;

  const parsedPrice = parseFloat(price);
  const parsedRating = parseFloat(rating);

  const file = req.file;

  let filePath;
  if (!file) {
    filePath =
      "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
  } else {
    filePath = req.file.filename;
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
    courseImage: "http://localhost:5000/" + filePath,
    rating: parsedRating,
  });

  res.status(201).json({
    message: "Course created successfully",
  });
};
