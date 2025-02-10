const multer = require("multer");
const path = require("path");
const { createFolderForBlogImages } = require("./createFolder");

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const FOLDERNAME = path.resolve("./src/Images/blogs");
      const newCreatedFolder = await createFolderForBlogImages(FOLDERNAME);

      if (!newCreatedFolder) {
        throw new Error("Failed to create folder");
      }

      req.ImageFolder = newCreatedFolder.dateFolderName;
      cb(null, newCreatedFolder.folder);
    } catch (error) {
      cb(error); // Pass the error to multer
    }
  },
  filename: function (req, file, cb) {
    let filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Correct property name
});

module.exports = upload;
