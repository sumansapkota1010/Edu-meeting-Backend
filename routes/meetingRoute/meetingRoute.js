const express = require("express");
const {
  createMeeting,
} = require("../../controller/admin/meeting/meetingController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");

const router = express.Router();
const { multer, storage } = require("../../middleware/multerConfig");
const upload = multer({ storage: storage });

router
  .route("/meetings")
  .post(
    isAuthenticated,
    restrictTo("admin"),
    upload.single("image"),
    createMeeting
  );

module.exports = router;
