const Meeting = require("../../../model/meetingModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

exports.createMeeting = async (req, res) => {
  const file = req.file;

  let filePath;
  if (!file) {
    filePath =
      "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
  } else {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "meeting_images",
    });
    filePath = result.secure_url;
  }

  const {
    title,
    description,
    price,
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
    !date ||
    !hours ||
    !location ||
    !bookNow ||
    !category
  ) {
    return res.status(400).json({
      message:
        "Please provided title, description, price,date,hours,location,bookNow and category",
    });
  }

  await Meeting.create({
    title,
    description,
    price,
    date,
    hours,
    location,
    bookNow,
    category,
    meetingImage: filePath,
  });

  res.status(200).json({
    message: "Meeting created successfully",
  });
};
