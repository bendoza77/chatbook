const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },

        content: {
            type: String,
            required: [true, "content is required"],
        },

        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },

        postId: {
            type: mongoose.Types.ObjectId,
            ref: "Post"
        }
    }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment