const express = require("express");
const { getUser, getUsers, deleteUser, updateUser } = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");


const userRouter = express.Router();


userRouter.get("/", protect, getUsers);
userRouter.get("/:id", protect, getUser);
userRouter.delete("/:id", protect, deleteUser);
userRouter.patch("/:id", protect, updateUser);

module.exports = userRouter