const express = require("express");
const {
  createEnquiry,
} = require("../../controller/admin/enquiry/enquiryController");
const isAuthenticated = require("../../middleware/isAuthenticated");

const router = express.Router();

router.route("/contact").post(isAuthenticated, createEnquiry);

module.exports = router;
