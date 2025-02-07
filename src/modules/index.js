const express = require("express");
const app = express();

const path = require("path");
app.set("views", path.resolve("./src/views"));

const user = require("./user/routes");
const blog = require("./blogs/routes");

app.use("/", user);
app.use("/blog", blog);

module.exports = app;
