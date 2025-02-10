const path = require("path");
const multer = require("multer");
const { createFolderForBlogImages } = require("./createFolder");

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const FOLDERNAME = path.resolve("./src/Images/blogs");
    const newCreatedFolder = await createFolderForBlogImages(FOLDERNAME);
    req.ImageFolder = newCreatedFolder.dateFolderName;
    cb(null, newCreatedFolder.folder);
  },
  filename: async function (req, file, cb) {
    let filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
