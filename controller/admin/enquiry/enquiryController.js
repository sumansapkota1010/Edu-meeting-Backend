const Enquiry = require("../../../model/enquiryModel");

exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Please provide name, email, subject, and message",
      });
    }
    await Enquiry.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Enquiry created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
