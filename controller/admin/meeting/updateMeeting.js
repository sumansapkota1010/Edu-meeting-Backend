const Meeting = require("../../../model/meetingModel");
const fs = require("fs");

const updateMeeting = async (req, res) => {
  const { id } = req.params;
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
    !category ||
    !id
  ) {
    return res.status(400).json({
      message:
        "Please provided title, description, price,date,hours,location,bookNow ,category,id",
    });
  }
  const oldData = await Meeting.findById(id);
  if (!oldData) {
    return res.status(400).json({
      message: "No data found with that id ",
    });
  }

  const oldMeetingImage = oldData.meetingImage; //"http://localhost:5000/meeting-01.jpg"
  const lengthToCut = process.env.BACKEND_URL;
  const finalFilePath = oldMeetingImage.slice(lengthToCut);
  if (req.file && req.file.filename) {
    // remove file from uploads folder
    fs.unlink("./uploads/" + finalFilePath, (err) => {
      if (err) {
        console.log("error deleting file");
      } else {
        console.log("File deleted Successfully");
      }
    });
  }
  const datas = await Meeting.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      date,
      hours,
      location,
      bookNow,
      category,
      meetingImage:
        req.file && req.file.filename
          ? process.env.BACKEND_URL + req.file.filename
          : oldMeetingImage,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "Product updated Successfully",
    datas,
  });
};

module.exports = updateMeeting;
