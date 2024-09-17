const Meeting = require("../../../model/meetingModel");

exports.categoryMeeting = async (req, res) => {
  try {
    const category = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const validCategories = ["All Meetings", "Soon", "Important", "Attractive"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const query = category === "All Meetings" ? {} : { category };
    const totalMeetings = await Meeting.countDocuments(query);
    const meetings = await Meeting.find(query).skip(skip).limit(limit);
    console.log(meetings);

    res.status(200).json({
      success: true,
      meetings,
      page,
      limit,
      totalPages: Math.ceil(totalMeetings / limit),
      totalMeetings,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
