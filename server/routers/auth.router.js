const express = require("express");
const { signUp, login, verifyEmail, authoLogin, logout } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);

authRouter.get("/verify/:code", verifyEmail);

authRouter.post("/autho-login", protect, authoLogin);
authRouter.post("/logout", logout);


module.exports = authRouter;