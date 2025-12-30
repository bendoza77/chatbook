const express = require("express");
const { getPosts, getPost, createPost, deletePost, updatePost } = require("../controllers/post.controller");
const { protect, allowTo } = require("../middleware/auth.middleware");
const postRouter = express.Router();

// get all post
postRouter.get("/", protect, getPosts);

// get post by id
postRouter.get("/:id", getPost);

// delete post by id
postRouter.delete("/:id", protect, allowTo("user"), deletePost);

// create post
postRouter.post("/", protect, allowTo("user"), createPost);

// update post by id 
postRouter.patch("/:id", protect, allowTo("user"), updatePost);

module.exports = postRouter