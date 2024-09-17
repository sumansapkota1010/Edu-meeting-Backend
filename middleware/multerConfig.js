const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //check mimetype of the image
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error("This filetype is not supported"));
      return;
    }

    cb(null, "./uploads");
    gi;
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = {
  multer,
  storage,
};
