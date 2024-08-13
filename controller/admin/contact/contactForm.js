const Contact = require("../../../model/contactModel");

const contactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Please provide name ,subject,message",
      });
    }
    const contactData = await Contact.create({
      name,
      email,
      subject,
      message,
    });
    res.status(200).json({
      message: "Message send successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Message not delivered ",
    });
  }
};

module.exports = contactForm;
