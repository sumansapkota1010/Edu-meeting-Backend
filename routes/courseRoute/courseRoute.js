const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { multer, storage } = require("../../middleware/multerConfig");
const restrictTo = require("../../middleware/restrictTo");
const {
  createCourse,
} = require("../../controller/admin/courses/coursesController");
const catchAsync = require("../../errorHandling/catchAsync");
const getCourse = require("../../controller/admin/courses/getCourse");
const singleCourse = require("../../controller/admin/courses/singleCourse");
const deleteCourse = require("../../controller/admin/courses/deleteCourse");
const updateCourse = require("../../controller/admin/courses/updateCourse");
const upload = multer({ storage: storage });

const router = express.Router();

router
  .route("/courses")
  .post(
    isAuthenticated,
    restrictTo("admin"),
    upload.single("courseImage"),
    catchAsync(createCourse)
  )
  .get(catchAsync(getCourse));

router
  .route("/courses/:id")
  .get(catchAsync(singleCourse))
  .delete(isAuthenticated, restrictTo("admin"), catchAsync(deleteCourse))
  .patch(
    isAuthenticated,
    restrictTo("admin"),
    upload.single("courseImage"),
    catchAsync(updateCourse)
  );

module.exports = router;
