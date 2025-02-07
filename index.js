const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser")();
require("dotenv").config();

const src = require("./server/index");
const { connectToMongoDB } = require("./server/database/connect");
const {
  checkForAuthenticationCookie,
} = require("./server/middlewares/authentication");
const Blogs = require("./server/database/models/blog");

const app = express();
const PORT = process.env.PORT || 3002;

connectToMongoDB(process.env.MONGODB_CONNECT_URI)
  .then(() => console.log(`Mongodb connected`))
  .catch((error) => console.log(`Error connecting mongodb Err:${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser);
app.use(checkForAuthenticationCookie("token"));
//app.use("/img", express.static("public"));
app.use(express.static(path.resolve("./public")));
app.use("/", src);
app.set("view engine", "ejs");
app.set("views", path.resolve("./client/views"));

app.get("/", async (req, res) => {
  const blogs = await Blogs.find({});
  res.render("home", { user: req.user, blogs: blogs });
});

app.listen(PORT, () => console.log(`app listen on port:${PORT}`));
