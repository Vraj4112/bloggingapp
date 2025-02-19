const multer = require("multer");

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
const storage = multer.memoryStorage();

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
