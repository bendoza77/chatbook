const AppError = require("../utils/AppError");
const Comment = require("../models/comment.model");
const catchAsync = require("../utils/catchAsynс");
const Post = require("../models/post.model");

const getComments = catchAsync(async (req, res, next) => {

    const comments = await Comment.find();

    return res.json(comments);

})

const getCommentByID = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        return next(new AppError("Enter valid id", 404));
    }

    const comment = await Comment.findById(id);

    return res.json(comment);

})

const deleteCommentByID = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        return next(new AppError("Enter valid id", 404));
    }

    const deleteComment = await Comment.findByIdAndDelete(id);

    return res.json(deleteComment);

})

const createComment = catchAsync(async (req, res, next) => {

    const { id } = req.params
    const { title, content, commentId, userId } = req.body;    

    if (!id) {
        return next(new AppError("Enter valid id", 404));
    }

    const post = await Post.findById(id);

    if (!post) {
        return next(new AppError("post not found", 404));
    }

    if (!title || !content) {
        return next(new AppError("all filed is required", 400));
    }

    const newComment = await Comment.create({
        title, 
        content,
        commentId,
        userId
    });

    await Post.findByIdAndUpdate(id, {$push: {commentId: newComment._id}}, {new: true});
    return res.status(201).json(newComment);

})

module.exports = {
    deleteCommentByID,
    getComments,
    getCommentByID,
    createComment
}

