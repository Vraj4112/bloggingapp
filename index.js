//require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser")();

const src = require("./src/index");
const { connectToMongoDB } = require("./src/database/connect");
const {
  checkForAuthenticationCookie,
} = require("./src/middlewares/authentication");
const Blogs = require("./src/database/models/blog");

const app = express();
const PORT = process.env.PORT || 3002;

const main = async () => {
  try {
    await connectToMongoDB(process.env.MONGODB_CONNECT_URI)
      .then(() => console.log(`Mongodb connected`))
      .catch((error) => console.log(`Error connecting mongodb Err:${error}`));
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser);
app.use(checkForAuthenticationCookie("token"));
//app.use("/img", express.static("public"));
app.use(express.static(path.resolve("./src")));
app.use("/", src);
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.get("/", async (req, res) => {
  const blogs = await Blogs.find({});
  res.render("home", { user: req.user, blogs: blogs });
});

main();

app.listen(PORT, () => console.log(`app listen on port:${PORT}`));
