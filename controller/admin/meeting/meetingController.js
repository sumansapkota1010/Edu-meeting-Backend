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
      meetingImage: "http://localhost:5000/" + filePath,
    });

    res.status(200).json({
      message: "Meeting created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.getMeeting = async (req, res) => {
  const meetings = await Meeting.find();
  if (meetings.length == 0) {
    res.status(400).json({
      message: "No meetings found",
      meetings: [],
    });
  } else {
    res.status(200).json({
      message: "Meetings fetched successfully",
      meetings,
    });
  }
};
