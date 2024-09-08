const Contact = require("../../../model/contactModel");

const getContactForm = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (err) {
    console.log("Error in fetching contact forms:", err);
    res.status(500).json({
      message: "Error in fetching contact forms",
      error: err.message,
    });
  }
};

module.exports = getContactForm;
