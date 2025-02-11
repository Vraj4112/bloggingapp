const express = require("express");
const fs = require("fs").promises;
const app = express();
const {
  checkForAuthenticationCookie,
} = require("../middlewares/authentication");

const path = require("path");
app.set("views", path.resolve("./src/views"));

let tempVar;
const user = require("./user/routes");
const blog = require("./blogs/routes");

app.use(checkForAuthenticationCookie("token"));

app.use(
  "/",
  async (req, res) => {
    console.log("hi there:-", req.customDIR);
  },
  user
);
app.use("/blog", blog);

async function testFunction() {
  // Ensure the base directory exists
  await fs.mkdir(path.resolve("./src/Images/blogs/vraj123/jklm"), {
    recursive: true,
  });
  return null;
}

testFunction();

module.exports = app;
