const express = require("express");
const {
  createMeeting,
} = require("../../controller/admin/meeting/meetingController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");

const router = express.Router();

router
  .route("/meetings")
  .post(isAuthenticated, restrictTo("admin"), createMeeting);

module.exports = router;
