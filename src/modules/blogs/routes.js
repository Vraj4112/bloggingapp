const express = require("express");
const router = express.Router();
const controller = require("./controllers");
const upload = require("../../utilities/multerConfig");

router.get("/add-new", controller.handleRenderAddBlog);
router.get("/:id", controller.handleViewSingleBlog);
router.post(
  "/",
  upload.single("coverImage"),
  controller.handleUploadImageToVercelBolb,
  controller.handleAddNewBlog
);

//comments routes
router.post("/comment/:blogId", controller.handleAddNewComment);

module.exports = router;
