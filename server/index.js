const express = require("express");
const app = express();

const path = require("path");
app.set("views", path.resolve("./client/views"));

const ver = require("./modules/index");

app.use("/", ver);

module.exports = app;
