const express = require("express");

const oauthController = require("../controllers/oauth");

const router = express.Router();

router.get("/auth/google/signup", oauthController.handleGoogleSignupRedirect);

router.get("/auth/google/login", oauthController.handleGoogleLoginRedirect);

module.exports = router;
