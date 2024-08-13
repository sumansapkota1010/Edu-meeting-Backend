const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { multer, storage } = require("../../middleware/multerConfig");
const restrictTo = require("../../middleware/restrictTo");
const {
  createCourse,
} = require("../../controller/admin/courses/coursesController");
const catchAsync = require("../../errorHandling/catchAsync");
const upload = multer({ storage: storage });

const router = express.Router();

router
  .route("/courses")
  .post(
    isAuthenticated,
    restrictTo("admin"),
    upload.single("courseImage"),
    catchAsync(createCourse)
  );

module.exports = router;
