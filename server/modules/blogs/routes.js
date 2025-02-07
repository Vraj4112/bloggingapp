const express = require("express");
const router = express.Router();
const controller = require("./controllers");

const path = require("path");
const multer = require("multer");
const { createFolderForBlogImages } = require("../../utilities/createFolder");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const FOLDERNAME = path.resolve("./public/Images/blogs");
    const newCreatedFolder = createFolderForBlogImages(FOLDERNAME);
    req.ImageFolder = newCreatedFolder.dateFolderName;
    cb(null, newCreatedFolder.folder);
  },
  filename: function (req, file, cb) {
    let filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({
  storage: storage,
  limit: { fileSize: 5 * 1024 * 1024 },
});

router.get("/add-new", controller.handleRenderAddBlog);
router.get("/:id", controller.handleViewSingleBlog);
router.post("/", upload.single("coverImage"), controller.handleAddNewBlog);

//comments routes
router.post("/comment/:blogId", controller.handleAddNewComment);

module.exports = router;
