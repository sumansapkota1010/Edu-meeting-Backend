const Meeting = require("../../../model/meetingModel");

const getMeeting = async (req, res) => {
  const meetings = await Meeting.find();
  if (meetings.length == 0) {
    res.status(400).json({
      message: "No meetings found",
      meetings: [],
    });
  } else {
    res.status(200).json({
      message: "Meetings fetched successfully",
      meetings,
    });
  }
};

module.exports = getMeeting;
