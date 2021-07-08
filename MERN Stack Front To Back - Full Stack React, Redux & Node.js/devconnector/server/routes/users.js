const express = require("express");

const registerInputValidators = require("../validators/register");
const loginInputValidators = require("../validators/login");
const usersController = require("../controllers/users");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post("/register", registerInputValidators, usersController.register);

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", loginInputValidators, usersController.login);

module.exports = router;
