const Meeting = require("../../../model/meetingModel");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
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

  let newImageUrl;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "meeting_images",
    });
    newImageUrl = result.secure_url;

    // old image exists garxa bhane delete garne

    if (oldData.meetingImage) {
      const publicId = oldData.meetingImage.split("/").pop().split(".")[0]; //https://res.cloudinary.com/your-cloud-name/image/upload/v1234567/meeting_images/abc123.jpg"; abc123 matra aauxa
      // destroy garna paryo
      await cloudinary.uploader.destroy(`meeting_images/${publicId}`);
    }
    fs.unlinkSync(req.file.path);
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
      meetingImage: newImageUrl || oldData.meetingImage,
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
