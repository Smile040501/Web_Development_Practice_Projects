const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Post = require("../models/post");
const User = require("../models/user");
const HttpError = require("../models/httpError");

const getPosts = async (req, res, next) => {
    let posts;
    try {
        posts = await Post.find({});
    } catch (err) {
        const error = new HttpError("Fetching Posts failed, please try again later.", 500);
        return next(error);
    }
    if (posts.length === 0) {
        const error = new HttpError("Could not find posts.", 404);
        return next(error);
    }
    posts.sort((p1, p2) => new Date(p2.date) - new Date(p1.date));
    res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const getPostById = async (req, res, next) => {
    const { postId } = req.params;
    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new HttpError("Fetching Post failed, please try again later.", 500);
        return next(error);
    }
    if (!post) {
        const error = new HttpError("Could not find post.", 404);
        return next(error);
    }
    res.json({ post: post.toObject({ getters: true }) });
};

const createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Validation error!", 422, errors));
    }

    const { text, name, avatar } = req.body;
    const { userId } = req.userData;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError("Creating post failed, please try again", 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError("Could not find user for provided user id", 404);
        return next(error);
    }

    const newPost = new Post({ text, name, avatar, userId });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newPost.save({ session });
        user.posts.push(newPost);
        await user.save({ session });
        await session.commitTransaction();
    } catch (err) {
        const error = new HttpError("Creating post failed, please try again.", 500);
        return next(error);
    }

    res.status(201).json({ post: newPost.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.userData;

    let post;
    try {
        post = await Post.findById(postId).populate("userId");
    } catch (err) {
        const error = new HttpError("Deleting post failed, please try again.", 500);
        return next(error);
    }

    if (!post) {
        const error = new HttpError("Could not find post for provided post id", 404);
        return next(error);
    }

    if (post.userId.id.toString() !== userId.toString()) {
        const error = new HttpError("Not Authorized", 403);
        return next(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.remove({ session });
        post.userId.posts.pull(post);
        await post.userId.save({ session });
        await session.commitTransaction();
    } catch (err) {
        const error = new HttpError("Deleting post failed, please try again.", 500);
        return next(error);
    }

    res.json({ success: true });
};

const likePost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.userData;

    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new HttpError("Liking post failed, please try again.", 500);
        return next(error);
    }

    if (!post) {
        const error = new HttpError("Could not find post for provided post id", 404);
        return next(error);
    }

    if (post.userId.toString() === userId.toString()) {
        const error = new HttpError("You can't like your own post", 403);
        return next(error);
    }

    const idx = post.likes.findIndex((like) => like.userId.toString() === userId.toString());

    if (idx >= 0) {
        const error = new HttpError("You have already liked this post", 400);
        return next(error);
    }

    try {
        post.likes.unshift({ userId });
        await post.save();
    } catch (err) {
        const error = new HttpError("Liking post failed, please try again.", 500);
        return next(error);
    }

    res.json({ post: post.toObject({ getters: true }) });
};

const unlikePost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.userData;

    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new HttpError("UnLiking post failed, please try again.", 500);
        return next(error);
    }

    if (!post) {
        const error = new HttpError("Could not find post for provided post id", 404);
        return next(error);
    }

    if (post.userId.toString() === userId.toString()) {
        const error = new HttpError("You can't unlike your own post", 403);
        return next(error);
    }

    const idx = post.likes.findIndex((like) => like.userId.toString() === userId.toString());

    if (idx === -1) {
        const error = new HttpError("You have not liked this post yet.", 400);
        return next(error);
    }

    try {
        post.likes.splice(idx, 1);
        await post.save();
    } catch (err) {
        const error = new HttpError("UnLiking post failed, please try again.", 500);
        return next(error);
    }

    res.json({ post: post.toObject({ getters: true }) });
};

const addComment = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Validation error!", 422, errors));
    }

    const { postId } = req.params;
    const { userId } = req.userData;

    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new HttpError("Commenting post failed, please try again.", 500);
        return next(error);
    }

    if (!post) {
        const error = new HttpError("Could not find post for provided post id", 404);
        return next(error);
    }

    const { text, name, avatar } = req.body;
    const newComment = { text, name, avatar, userId };

    try {
        post.comments.unshift(newComment);
        await post.save();
    } catch (err) {
        const error = new HttpError("Commenting post failed, please try again.", 500);
        return next(error);
    }
    res.json({ post: post.toObject({ getters: true }) });
};

const deleteComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = req.userData;

    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new HttpError("Deleting comment failed, please try again.", 500);
        return next(error);
    }

    if (!post) {
        const error = new HttpError("Could not find post for provided post id", 404);
        return next(error);
    }

    const idx = post.comments.findIndex(
        (comment) => comment.id.toString() === commentId.toString()
    );

    if (idx === -1) {
        const error = new HttpError("Comment not found", 404);
        return next(error);
    }

    if (post.comments[idx].userId.toString() !== userId.toString()) {
        const error = new HttpError("Not authorized", 403);
        return next(error);
    }

    try {
        post.comments.splice(idx, 1);
        await post.save();
    } catch (err) {
        const error = new HttpError("Deleting comment failed, please try again.", 500);
        return next(error);
    }
    res.json({ post: post.toObject({ getters: true }) });
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    deletePost,
    likePost,
    unlikePost,
    addComment,
    deleteComment,
};
