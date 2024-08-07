const mongoose = require("mongoose");

const Meeting = require("../../../model/meetingModel");

exports.createMeeting = async (req, res) => {
 

  const {
    title,
    description,
    price,
    image,
    date,
    hours,
    location,
    bookNow,
    category,
  } = req.body;

  if (
    !title ||
    !description ||
    !price ||
    !image ||
    !date ||
    !hours ||
    !location ||
    !bookNow ||
    !category
  ) {
    return res.status(400).json({
      message:
        "Please provided title, description, price,image,date,hours,location,bookNow and category",
    });
  }

  await Meeting.create({
    title,
    description,
    price,
    image,
    date,
    hours,
    location,
    bookNow,
    category,
  });

  res.status(200).json({
    message: "Meeting created successfully",
  });
};
