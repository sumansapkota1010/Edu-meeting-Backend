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

    // Save contact form data to the database
    const contactData = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // NodeMailer transport setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "educationmeetings7@gmail.com",
        pass: "bcvo fncy lswt zyxa", // Replace with your App Password
      },
    });

    const mailOptions = {
      from: email,
      to: "educationmeetings7@gmail.com", // The admin email
      subject: `New Contact Form Submission: ${subject}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };
    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("Error occurred:", err); // Log the error for debugging
    res.status(500).json({
      message: "Message not delivered",
      error: err.message, // Include the actual error message in the response
    });
  }
};

module.exports = contactForm;
