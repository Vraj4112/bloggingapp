const multer = require("multer");
const path = require("path");

// Define the list of acceptable MIME types for images
const imageMimeTypes = [
  "image/jpeg", // JPEG
  "image/png", // PNG
  "image/gif", // GIF
  "image/webp", // WebP
  "image/tiff", // TIFF
  "image/bmp", // BMP
  "image/svg+xml", // SVG
];

// Configure multer to use memory storage
//const storage = multer.memoryStorage();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/uploads");
  },
  filename: function (req, file, cb) {
    const { _id } = req.user;
    const userId = _id ? _id : "anonymous";
    const uniqueFilename = `${userId}-${Date.now()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage, // Use the storage we just defined
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB file size limit
  fileFilter: (req, file, cb) => {
    if (imageMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Invalid file type. Only image files are allowed."), false); // Reject the file
    }
  },
});

module.exports = upload;
