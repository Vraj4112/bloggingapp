const express = require("express");
const app = express();

const path = require("path");
app.set("views", path.resolve("./src/views"));

const version_if_any = require("./modules/index");

app.use(
  "/",
  async (req, res) => {
    console.log("hi there:-", req.customDIR);
  },
  version_if_any
);

module.exports = app;
