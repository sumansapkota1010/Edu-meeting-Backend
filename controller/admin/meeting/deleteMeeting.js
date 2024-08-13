const Meeting = require("../../../model/meetingModel");

const deleteMeeting = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id",
    });
  }
  await Meeting.findByIdAndDelete(id);
  res.status(200).json({
    message: "Meeting deleted successfully",
  });
};

module.exports = deleteMeeting;
