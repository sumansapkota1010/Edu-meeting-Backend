const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");
const { getAllUsers } = require("../../controller/admin/admin-user/getAllUser");
const router = express.Router();

router
  .route("/admin/user")
  .get(isAuthenticated, restrictTo("admin"), getAllUsers);

module.exports = router;
