const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

const io = require("../socket.js");
const Post = require("../models/post.js");
const User = require("../models/user.js");

exports.getPosts = (req, res, next) => {
    const currPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    Post.find()
        .countDocuments()
        .then((count) => {
            totalItems = count;
            return Post.find()
                .populate("creator")
                .sort({ createdAt: -1 })
                .skip((currPage - 1) * perPage)
                .limit(perPage);
        })
        .then((posts) => {
            res.status(200).json({
                message: "Fetched posts successfully",
                posts,
                totalItems,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }

    if (!req.file) {
        const error = new Error("No image provided.");
        error.statusCode = 422;
        throw error;
    }

    const imageUrl = req.file.path.replace("\\", "/");

    const { title, content } = req.body;
    let creator;
    const post = new Post({
        title,
        content,
        imageUrl,
        creator: req.userId,
    });
    post.save()
        .then((result) => {
            return User.findById(req.userId);
        })
        .then((user) => {
            creator = user;
            user.posts.push(post);
            return user.save();
        })
        .then((result) => {
            // io.getIO().broadcast() // Send to all connected user except current one
            // Send msgs to all the connected user including current one
            io.getIO().emit("posts", {
                action: "create",
                post: { ...post._doc, creator: { _id: req.userId, name: creator.name } },
            }); // event name, data we want to send
            res.status(201).json({
                message: "Post created successfully!",
                post: post,
                creator: {
                    _id: creator._id,
                    name: creator.name,
                },
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getPost = (req, res, next) => {
    const { postId } = req.params;
    Post.findById(postId)
        .populate("creator")
        .then((post) => {
            if (!post) {
                const error = new Error("Could not find Post.");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: "Post fetched.",
                post,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updatePost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }

    const { postId } = req.params;
    const { title, content } = req.body;
    let imageUrl = req.body.image;
    if (req.file) {
        imageUrl = req.file.path.replace("\\", "/");
    }
    if (!imageUrl) {
        const error = new Error("No file picked.");
        error.statusCode(422);
        throw error;
    }
    Post.findById(postId)
        .populate("creator")
        .then((post) => {
            if (!post) {
                const error = new Error("Could not find Post.");
                error.statusCode = 404;
                throw error;
            }
            if (post.creator._id.toString() !== req.userId) {
                const error = new Error("Not Authorized.");
                error.statusCode = 403;
                throw error;
            }
            if (imageUrl !== post.imageUrl) {
                clearImage(post.imageUrl);
            }
            post.title = title;
            post.imageUrl = imageUrl;
            post.content = content;
            return post.save();
        })
        .then((result) => {
            io.getIO().emit("posts", { action: "update", post: result });
            res.status(200).json({ message: "Post updated!", post: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deletePost = (req, res, next) => {
    const { postId } = req.params;
    Post.findById(postId)
        .then((post) => {
            if (!post) {
                const error = new Error("Could not find Post.");
                error.statusCode = 404;
                throw error;
            }
            if (post.creator.toString() !== req.userId) {
                const error = new Error("Not Authorized.");
                error.statusCode = 403;
                throw error;
            }
            clearImage(post.imageUrl);
            return Post.findByIdAndRemove(postId);
        })
        .then((result) => {
            return User.findById(req.userId);
        })
        .then((user) => {
            user.posts.pull(postId);
            return user.save();
        })
        .then((result) => {
            io.getIO().emit("posts", { action: "delete", post: postId });
            res.status(200).json({ message: "Deleted Post" });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err);
        }
    });
};
