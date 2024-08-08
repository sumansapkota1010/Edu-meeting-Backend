const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");
const {
  createCourse,
} = require("../../controller/admin/courses/coursesController");

const router = express.Router();

router
  .route("/courses")
  .post(isAuthenticated, restrictTo("admin"), createCourse);

module.exports = router;
