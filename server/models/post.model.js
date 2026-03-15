const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: [true, "user id is required"]
        },

        fullName: {
            type: String,
            required: [true, "fullname is required"]
        },

        profileImage: String,

        postImg: String,

        title: {
            type: String,
            required: [true, "title is required"]
        },
        content: {
            type: String,
            required: [true, "content is required"]
        },
        likeCount: {
            type: Number,
            default: 0
        },

        commentId: [{
            type: mongoose.Types.ObjectId,
            ref: "Comment"
        }],

        tags: [{
            type: String
        }]
    }
)

// Text index for full-text search on title/content
postSchema.index({ title: "text", content: "text" });

// Tag filtering and like-based sorts
postSchema.index({ tags: 1 });
postSchema.index({ likeCount: -1 });

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;