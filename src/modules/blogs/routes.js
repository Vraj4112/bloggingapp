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
  async (req, res) => {
    try {
      const userId = req.user ? req.user._id : "anonymous";
      const file = req.file;
      if (!file || !file.buffer) {
        throw new Error("File buffer is empty. Check multer configuration.");
      }

      const s3Key = `${folderName}/${userId}-${Date.now()}-${
        file.originalname
      }`;

      const s3Url = await uploadFileToVercelBlob(bucketName, file, s3Key);
      req.file.url = s3Url;
      res.json({ message: "File uploaded successfully", url: s3Url });
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
