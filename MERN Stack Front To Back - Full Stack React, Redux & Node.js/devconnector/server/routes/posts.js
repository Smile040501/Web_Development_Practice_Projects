const express = require("express");

const postsController = require("../controllers/posts");
const postInputValidators = require("../validators/post");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/", postsController.getPosts);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:postId", postsController.getPostById);

// @route   ALL_OTHER_ROUTES
// @desc    Check Authentication
// @access  Private
router.use(checkAuth);

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post("/", postInputValidators, postsController.createPost);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete("/:postId", postsController.deletePost);

// @route   POST api/posts/:id/like/
// @desc    Like post
// @access  Private
router.post("/:postId/like", postsController.likePost);

// @route   POST api/posts/:id/unlike
// @desc    Unlike post
// @access  Private
router.post("/:postId/unlike", postsController.unlikePost);

// @route   POST api/posts/:id/comment
// @desc    Add comment to the post
// @access  Private
router.post("/:postId/comments", postInputValidators, postsController.addComment);

// @route   DELETE api/posts/:id/comment/:id
// @desc    Remove comment from post
// @access  Private
router.delete("/:postId/comments/:commentId", postsController.deleteComment);

module.exports = router;
