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

<<<<<<< HEAD
=======
    // Save contact form data to the database
>>>>>>> origin/main
    const contactData = await Contact.create({
      name,
      email,
      subject,
      message,
    });

<<<<<<< HEAD
=======
    // NodeMailer transport setup
>>>>>>> origin/main
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "educationmeetings7@gmail.com",
<<<<<<< HEAD
        pass: "bcvo fncy lswt zyxa",
=======
        pass: "bcvo fncy lswt zyxa", // Replace with your App Password
>>>>>>> origin/main
      },
    });

    const mailOptions = {
      from: email,
<<<<<<< HEAD
      to: "educationmeetings7@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

=======
      to: "educationmeetings7@gmail.com", // The admin email
      subject: `New Contact Form Submission: ${subject}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };
    // Send the email
>>>>>>> origin/main
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Message sent successfully",
<<<<<<< HEAD
      contactData,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      message: "Message not delivered",
      error: err.message,
=======
    });
  } catch (err) {
    console.error("Error occurred:", err); // Log the error for debugging
    res.status(500).json({
      message: "Message not delivered",
      error: err.message, // Include the actual error message in the response
>>>>>>> origin/main
    });
  }
};

module.exports = contactForm;
