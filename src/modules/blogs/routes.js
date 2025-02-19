const express = require("express");
const router = express.Router();
const path = require("path");
const {
  uploadFileToVercelBlob,
} = require("../../utilities/uploadFileToVercelBlob");
const controller = require("./controllers");

const upload = require("../../utilities/multerConfig");

const bucketName = "blogging-app";
const folderName = "blog-images";

router.get("/add-new", controller.handleRenderAddBlog);
router.get("/:id", controller.handleViewSingleBlog);
router.post(
  "/",
  upload.single("coverImage"),
  async (req, res, next) => {
    try {
      const file = req.file;

      const userId = req.user ? req.user._id : "anonymous";

      const originalFilename = file.originalname;
      const extension = originalFilename.split(".").pop();

      const uniqueFilename = `${userId}-${Date.now()}-${file.originalname}`;
      const tempPath = path.resolve("./src/Images/blogs");
      const finalPath = path.join(tempPath, uniqueFilename);

      if (!file || !file.buffer) {
        throw new Error("File buffer is empty. Check multer configuration.");
      }

      const s3Key = `${folderName}/${userId}-${Date.now()}-${
        file.originalname
      }`;

      const s3Url = await uploadFileToVercelBlob(bucketName, file, s3Key);
      req.file.url = s3Url;
      next();
    } catch (error) {
      console.log("Vercel blob Error", error);
      res.status(500).json({ messge: "File upload failed", error: error });
    }
  },
  controller.handleAddNewBlog
);

//comments routes
router.post("/comment/:blogId", controller.handleAddNewComment);

module.exports = router;
