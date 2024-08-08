const Course = require("../../../model/coursesModel");

exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, image, rating } = req.body;

    const parsedPrice = parseFloat(price);
    const parsedRating = parseFloat(rating);

    if (
      !title ||
      !description ||
      isNaN(parsedPrice) ||
      !image ||
      isNaN(parsedRating)
    ) {
      return res.status(400).json({
        message: "Please provide title, description, price, image, and rating",
      });
    }

    await Course.create({
      title,
      description,
      price: parsedPrice,
      image,
      rating: parsedRating,
    });

    res.status(201).json({
      message: "Course created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
