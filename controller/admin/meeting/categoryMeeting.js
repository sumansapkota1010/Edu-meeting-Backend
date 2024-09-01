const Meeting = require("../../../model/meetingModel");

exports.categoryMeeting = async (req, res) => {
  try {
    const { category } = req.params;

    const validCategories = ["All Meetings", "Soon", "Important", "Attractive"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    let meetings;

    if (category === "All Meetings") {
      meetings = await Meeting.find();
    } else {
      meetings = await Meeting.find({ category });
    }

    res.status(200).json({
      success: true,
      data: meetings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
