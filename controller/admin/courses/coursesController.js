const Course = require("../../../model/coursesModel");

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
    filePath = file.filename;
  }

  if (!title || !description || isNaN(parsedPrice) || isNaN(parsedRating)) {
    return res.status(400).json({
      message: "Please provide title, description, price, and rating",
    });
  }

  const backendUrl = "https://edu-meeting-backend.vercel.app";
  const imageUrl = `${backendUrl}/${filePath.replace(/^\//, "")}`;

  try {
    await Course.create({
      title,
      description,
      price: parsedPrice,
      courseImage: imageUrl,
      rating: parsedRating,
    });

    res.status(201).json({
      message: "Course created successfully",
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      message: "An error occurred while creating the course",
      error: error.message,
    });
  }
};
