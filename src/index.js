const express = require("express");
const app = express();

const version_if_any = require("./modules/index");

app.use("/", version_if_any);

module.exports = app;
