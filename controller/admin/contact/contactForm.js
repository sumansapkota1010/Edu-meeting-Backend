const Contact = require("../../../model/contactModel");
const nodemailer = require("nodemailer");

const contactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Please provide name, subject, and message",
      });
    }

    const contactData = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "educationmeetings7@gmail.com",
        pass: "bcvo fncy lswt zyxa",
      },
    });

    const mailOptions = {
      from: email,
      to: "educationmeetings7@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Message sent successfully",
      contactData,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      message: "Message not delivered",
      error: err.message,
    });
  }
};

module.exports = contactForm;
