/**
 * Controllers for Post resources: list, retrieve, create, update, and delete posts.
 * Includes a helper to translate request queries into MongoDB-compatible filters.
 */
const Post = require("../models/post.model");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsynс");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");

/**
 * Build a MongoDB filter object from query string parameters.
 * Supports comparison operators via bracket syntax: field[gte|gt|lte|lt]=value
 * Numeric strings are coerced to numbers.
 *
 * @param {Object.<string, string>} query
 * @returns {Record<string, unknown>} MongoDB filter
 */

const formatMongoQuery = (query) => {
    const mongoQuery = {};

    for (const [key, value] of Object.entries(query)) {
        const match = key.match(/^(.+)\[(gte|gt|lte|lt)\]$/);
        if (match) {
            const [, field, op] = match;
            mongoQuery[field] = {
                ...mongoQuery[field],
                [`$${op}`]: isNaN(value) ? value : Number(value)
            };
        } else {
            mongoQuery[key] = isNaN(value) ? value : Number(value);
        }
    }

    return mongoQuery;
}

/**
 * Get all posts with optional filtering, sorting, tag matching and field limiting.
 * Query params:
 * - sort: sort expression, e.g. "-createdAt,title"
 * - tags: comma-separated; matches posts containing all listed tags
 * - limitFields: comma-separated fields to remove from the result objects
 * - filters: supports comparison operators using bracket syntax
 */

const getPosts = catchAsync(async (req, res, next) => {

    const { sort, tags, limitFields, userId, ...filters } = req.query;

    const mongoQuery = formatMongoQuery(filters);
    if (tags) {
        mongoQuery.tags = { $all: tags.trim().split(",") }
    }

    if (userId) {
        mongoQuery.userId = new mongoose.Types.ObjectId(userId);
    }

    const posts = await Post.find(mongoQuery).sort(sort).lean();

    if (limitFields) {
        const propertys = limitFields.trim().split(",");
        for (const obj of posts) {
            for (const key of propertys) {
                console.log(obj[key])
                delete obj[key]
            }
        }
    }

    return res.json({
        status: "succassfuly",
        length: posts.length,
        data: {posts}
    });
});  

/**
 * Get a post by its id.
 */

const getPost = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(new AppError("post not found", 404));
    }

    const post = await Post.findById(id);

    return res.json(post);

});

/**
 * Create a post. Requires body: { title, content, tags }.
 */

const createPost = catchAsync(async (req, res, next) => {

    const { title, content, tags, userId, fullName } = req.body;
    const { file } = req

    if (!title || !content) {
        next(new AppError("all field is required", 400));
    }

    const newPost = await Post.create({
        userId: req.user._id,
        fullName: req.user.name,
        title,
        content,
        likeCount: 0,
        tags,
        postImg: file ? file.filename : null
    });

    const updateUser = await User.findByIdAndUpdate(req.user._id, {$push: {postId: newPost._id}});

    return res.status(201).json(newPost);

});

/**
 * Delete a post by id and return the deleted document.
 */

const deletePost = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
       return next(new AppError("post not found", 404));
    }

    const post = await Post.findById(id);
    
    if (post.userId != req.user._id.toString()) {
        return next(new AppError("you dont have permission to delete post", 403));
    }

    await Post.findByIdAndDelete(id);

    return res.status(204).send();
})

/**
 * Update a post by id with fields provided in the request body.
 */

const updatePost = catchAsync(async (req, res, next) => {

    const { content, title } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("post not found", 404));
    }

    const post = await Post.findById(id);
    
    if (post.userId != req.user._id.toString()) {
        return next(new AppError("you dont have permission to update post", 403));
    }

    if (title) post.title = title;

    if (content) post.content = content;

    await post.save({ validateBeforeSave: false });


    return res.json(post);

})

/**
 * Export post controller handlers.
 */
module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
};