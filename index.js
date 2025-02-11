require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const corsConfig = {
  origin: "*",
  Credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
const cookieParser = require("cookie-parser")();

const src = require("./src/index");
const { connectToMongoDB } = require("./src/database/connect");
const Blogs = require("./src/database/models/blog");

const app = express();
const port = process.env.PORT || 3002;

const main = async () => {
  try {
    await connectToMongoDB(process.env.MONGODB_CONNECT_URI)
      .then(() => console.log(`Mongodb connected`))
      .catch((error) => console.log(`Error connecting mongodb Err:${error}`));
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};
main();

app.use(express.json());
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser);
//app.use("/img", express.static("public"));
app.use(express.static(path.resolve("./src")));
app.use(
  "/",
  async function (req, res, next) {
    req.customDIR = __dirname;
    next();
  },
  src
);
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.get("/", async (req, res) => {
  const blogs = await Blogs.find({});
  res.render("home", { user: req.user, blogs: blogs });
});

app.listen(port, () => console.log(`app listen on port:${port}`));

const os = require("os");

function getCurrentIP() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName];
    for (const alias of networkInterface) {
      if (alias.family === "IPv4" && !alias.internal) {
        console.log(`Current IP Address: ${alias.address}`);
        return alias.address;
      }
    }
  }
  console.log("No external IPv4 address found.");
  return null;
}

getCurrentIP();
