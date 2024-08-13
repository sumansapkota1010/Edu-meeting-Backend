const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const contactForm = require("../../controller/admin/contact/contactForm");

const router = express.Router();

router.route("/contact").post(isAuthenticated, contactForm);

module.exports = router;
