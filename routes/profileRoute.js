const express = require("express");
const catchAsync = require("../errorHandling/catchAsync");
const isAuthenticated = require("../middleware/isAuthenticated");
const { getMyProfile } = require("../user/profileController");

const router = express.Router();

router.route("/profile").get(isAuthenticated, getMyProfile);

module.exports = router;
