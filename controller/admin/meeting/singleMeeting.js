const Meeting = require("../../../model/meetingModel");

const singleMeeting = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id(meeting id)",
    });
  }
  const meetings = await Meeting.find({ _id: id });
  if (meetings.length == 0) {
    res.status(400).json({
      message: "No meetings found with that id",
      meetings: [],
    });
  } else {
    res.status(200).json({
      message: "Meeting fetched Successfully",
      meetings,
    });
  }
};

module.exports = singleMeeting;
