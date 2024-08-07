const express = require("express");
const {
  createMeeting,
} = require("../../controller/admin/meeting/meetingController");

const router = express.Router();

router.route("/meetings").post(createMeeting);

module.exports = router;
