const express = require("express");
const {
  createMeeting,
  getMeeting,
} = require("../../controller/admin/meeting/meetingController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");

const router = express.Router();
const { multer, storage } = require("../../middleware/multerConfig");
const singleMeeting = require("../../controller/admin/meeting/singleMeeting");
const catchAsync = require("../../errorHandling/catchAsync");
const upload = multer({ storage: storage });

router
  .route("/meetings")
  .post(
    isAuthenticated,
    restrictTo("admin"),
    upload.single("meetingImage"),
    catchAsync(createMeeting)
  )
  .get(catchAsync(getMeeting));

router.route("/meetings/:id").get(catchAsync(singleMeeting));

module.exports = router;
