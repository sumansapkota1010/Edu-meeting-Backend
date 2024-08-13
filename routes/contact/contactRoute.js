const express = require("express");
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 1173080 (feat:sending mail)
=======

=======
>>>>>>> origin/main
>>>>>>> bfb9df58d8828ce9e2a704069d4bbdf337e9eda4
const isAuthenticated = require("../../middleware/isAuthenticated");
const contactForm = require("../../controller/admin/contact/contactForm");

const router = express.Router();

router.route("/contact").post(isAuthenticated, contactForm);

module.exports = router;
