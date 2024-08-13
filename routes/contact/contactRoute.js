const express = require("express");
<<<<<<< HEAD
=======

>>>>>>> 1173080 (feat:sending mail)
const isAuthenticated = require("../../middleware/isAuthenticated");
const contactForm = require("../../controller/admin/contact/contactForm");

const router = express.Router();

router.route("/contact").post(isAuthenticated, contactForm);

module.exports = router;
