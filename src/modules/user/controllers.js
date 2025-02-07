const User = require("../../database/models/users");

const handleRenderSignup = async (req, res, next) => {
  return res.render("signup");
};
const handleRenderSIgnin = async (req, res, next) => {
  return res.render("signin");
};
const handleLogout = async (req, res, next) => {
  return res.clearCookie("token").redirect("/");
};
const handleUserSignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", user.token).redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("signin", { error: error.message });
  }
};
const handleUserSignup = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
};

module.exports = {
  handleRenderSignup,
  handleRenderSIgnin,
  handleLogout,
  handleUserSignin,
  handleUserSignup,
};
