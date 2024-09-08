const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");
const { getAllUsers } = require("../../controller/admin/admin-user/getAllUser");
const catchAsync = require("../../errorHandling/catchAsync");
const deleteUser = require("../../controller/admin/admin-user/deleteUser");
const router = express.Router();

router
  .route("/admin/user")
  .get(isAuthenticated, restrictTo("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .delete(isAuthenticated, restrictTo("admin"), catchAsync(deleteUser));

module.exports = router;
