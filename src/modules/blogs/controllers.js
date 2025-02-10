const Blog = require("../../database/models/blog");
const Comment = require("../../database/models/comment");

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
  const blog = await Blog.create({
    title,
    body,
    coverImageURL: `/Images/blogs/${req.file.filename}`,
    createdBy: req.user._id,
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

module.exports = {
  handleRenderAddBlog,
  handleViewSingleBlog,
  handleAddNewBlog,
  handleAddNewComment,
};
