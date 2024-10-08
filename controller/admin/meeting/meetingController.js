const Meeting = require("../../../model/meetingModel");

exports.createMeeting = async (req, res) => {
  const file = req.file;

  let filePath;
  if (!file) {
    filePath =
      "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
  } else {
    filePath = req.file.filename;
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
    meetingImage: process.env.BACKEND_URL + filePath,
  });

  res.status(200).json({
    message: "Meeting created successfully",
  });
};
