const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.get("/signup", controller.handleRenderSignup);
router.get("/signin", controller.handleRenderSIgnin);

router.get("/logout", controller.handleLogout);
router.post("/signin", controller.handleUserSignin);
router.post("/signup", controller.handleUserSignup);

module.exports = router;
