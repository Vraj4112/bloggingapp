const Blog = require("../../database/models/blog");
const Comment = require("../../database/models/comment");
const {
  uploadFileToVercelBlob,
} = require("../../utilities/uploadFileToVercelBlob");
const folderName = "blog-images";
const path = require("path");

const handleRenderAddBlog = (req, res, next) => {
  return res.render("addBlog", {
    user: req.user,
  });
};
const handleViewSingleBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");

  const comments = await Comment.find({
    blogId: req.params.id,
  }).populate("createdBy");

  return res.render("blog", {
    user: req.user,
    blog: blog,
    comments,
  });
};
const handleAddNewBlog = async (req, res, next) => {
  const { title, body } = req.body;
  const { url } = req.file;
  const { _id } = req.user;
  const blog = await Blog.create({
    title,
    body,
    coverImageURL: url,
    createdBy: _id,
  });

  return res.redirect(`/blog/${blog._id}`);
};

const handleAddNewComment = async (req, res, next) => {
  const { content } = req.body;
  await Comment.create({
    content: content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
};

const handleUploadImageToVercelBolb = async (req, res, next) => {
  try {
    const file = req.file;
    const userId = req.user ? req.user._id : "anonymous";

    if (!file || !file.buffer) {
      throw new Error("File buffer is empty. Check multer configuration.");
    }

    const s3Key = `${folderName}/${userId}-${Date.now()}-${file.originalname}`;

    const s3Url = await uploadFileToVercelBlob(file, s3Key);
    req.file.url = s3Url;
    next();
  } catch (error) {
    console.log("Vercel blob Error", error);
    res.status(500).json({ messge: "File upload failed", error: error });
  }
};

module.exports = {
  handleRenderAddBlog,
  handleViewSingleBlog,
  handleAddNewBlog,
  handleAddNewComment,
  handleUploadImageToVercelBolb,
};
