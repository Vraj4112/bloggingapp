const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const foldername = path.resolve("./src/Images/blogs");
      cb(null, foldername);
    } catch (error) {
      cb(error); // Pass the error to multer
    }
  },
  filename: function (req, file, cb) {
    let { _id } = req.user;
    let filename = `${_id}-${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Correct property name
});

module.exports = upload;
