const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const postRouter = require("./routers/post.router");
const globalErrorHandler = require("./controllers/error.controller");
const authRouter = require("./routers/auth.router");
const commentRouter = require("./routers/comment.router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routers/user.router");
const path = require("path")

require("dotenv").config();


const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true
}));

app.use(express.static(path.join(__dirname, "dist")));

app.use(cookieParser());
app.use(express.json());
app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.use("/comment", commentRouter);
app.use("/users", userRouter);

app.use(globalErrorHandler);

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server is running at port ${process.env.PORT}`)
        })
    }).catch((error) => {
        console.log("Database connection error", error);
        process.exit(1);
    })
