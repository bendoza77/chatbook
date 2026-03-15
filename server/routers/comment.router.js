const express = require("express");
const { getComments, createComment, getCommentByID, deleteCommentByID } = require("../controllers/comment.controller");

const commentRouter = express.Router();

commentRouter.route("/").get(getComments);
commentRouter.route("/:id").get(getCommentByID).delete(deleteCommentByID).post(createComment);

module.exports = commentRouter