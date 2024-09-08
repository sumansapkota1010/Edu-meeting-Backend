const express = require("express");

const isAuthenticated = require("../../middleware/isAuthenticated");
const contactForm = require("../../controller/admin/contact/contactForm");
const getContactForm = require("../../controller/admin/contact/getContactForm");
const restrictTo = require("../../middleware/restrictTo");

const router = express.Router();

router.route("/contact").post(isAuthenticated, contactForm);
router
  .route("/admin/contact")
  .get(isAuthenticated, restrictTo("admin"), getContactForm);

module.exports = router;
