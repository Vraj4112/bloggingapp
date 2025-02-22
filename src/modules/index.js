const express = require("express");
const app = express();

const {
  checkForAuthenticationCookie,
} = require("../middlewares/authentication");

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

const user = require("./user/routes");
const blog = require("./blogs/routes");

app.use(checkForAuthenticationCookie("token"));

app.use("/", user);
app.use("/blog", blog);

module.exports = app;
