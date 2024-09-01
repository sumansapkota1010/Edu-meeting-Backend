const express = require("express");

const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");

const router = express.Router();
const { multer, storage } = require("../../middleware/multerConfig");
const singleMeeting = require("../../controller/admin/meeting/singleMeeting");
const catchAsync = require("../../errorHandling/catchAsync");
const deleteMeeting = require("../../controller/admin/meeting/deleteMeeting");
const {
  createMeeting,
} = require("../../controller/admin/meeting/meetingController");
const getMeeting = require("../../controller/admin/meeting/getMeeting");
const updateMeeting = require("../../controller/admin/meeting/updateMeeting");
const {
  categoryMeeting,
} = require("../../controller/admin/meeting/categoryMeeting");
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

router
  .route("/meetings/:id")
  .get(catchAsync(singleMeeting))
  .delete(isAuthenticated, restrictTo("admin"), catchAsync(deleteMeeting))
  .patch(
    isAuthenticated,
    restrictTo("admin"),
    upload.single("meetingImage"),
    catchAsync(updateMeeting)
  );
router.route("/meetings/category/:category").get(catchAsync(categoryMeeting));

module.exports = router;
