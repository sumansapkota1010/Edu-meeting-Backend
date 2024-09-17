const Meeting = require("../../../model/meetingModel");

exports.createMeeting = async (req, res) => {
  try {
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
          "Please provide title, description, price, date, hours, location, bookNow, and category",
      });
    }

    const backendUrl = "https://edu-meeting-backend.vercel.app";
    const imageUrl = `${backendUrl}/uploads/${filePath}`;

    await Meeting.create({
      title,
      description,
      price,
      date,
      hours,
      location,
      bookNow,
      category,
      meetingImage: imageUrl,
    });

    res.status(201).json({
      message: "Meeting created successfully",
    });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({
      message: "An error occurred while creating the meeting",
      error: error.message,
    });
  }
};
