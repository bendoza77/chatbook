const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name field is required"]
        },

        email: {
            type: String,
            required: [true, "email field is required"]
        },

        role: {
            enum: ["user", "admin", "moderator"],
            type: String,
            default: "user"
        },

        postId: [{
            type: mongoose.Types.ObjectId,
            ref: "Posts"
        }],

        password: {
            type: String,
            required: [true, "password field is required"]
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        verificationCode: String



    }, { timestamps: true }
);

// Ensure fast lookups and uniqueness by email
userSchema.index({ email: 1 }, { unique: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    next();
})

userSchema.methods.comparePassword = async (candidate, password) => {
    return await bcrypt.compare(candidate, password);
}


userSchema.methods.createVerificationCode = function () {
    const code = crypto.randomBytes(12).toString("hex");
    this.verificationCode = code;
    return code;
}

const User = mongoose.model("Users", userSchema);

module.exports = User;