const express = require("express");

const profilesController = require("../controllers/profiles");
const profileInputValidators = require("../validators/profile");
const experienceInputValidators = require("../validators/experience");
const educationInputValidators = require("../validators/education");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

// @route   GET api/profiles
// @desc    Get all profiles
// @access  Public
router.get("/", profilesController.getAllProfiles);

// @route   GET api/profiles/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle/:handle", profilesController.getProfileByHandle);

// @route   ALL_OTHER_ROUTES
// @desc    Check Authentication
// @access  Private
router.use(checkAuth);

// @route   GET api/profiles/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", profilesController.getCurrentUserProfile);

// @route   POST api/profiles
// @desc    Create or Edit user's profile
// @access  Private
router.post("/", profileInputValidators, profilesController.createOrEditUserProfile);

// @route   POST api/profiles/experience
// @desc    Add experience to profile
// @access  Private
router.post("/experience", experienceInputValidators, profilesController.addExperience);

// @route   POST api/profiles/education
// @desc    Add education to profile
// @access  Private
router.post("/education", educationInputValidators, profilesController.addEducation);

// @route   DELETE api/profiles/experience/:eid
// @desc    Delete experience from profile
// @access  Private
router.delete("/experience/:eid", profilesController.deleteExperience);

// @route   DELETE api/profiles/education/:eid
// @desc    Delete education from profile
// @access  Private
router.delete("/education/:eid", profilesController.deleteEducation);

// @route   DELETE api/profiles
// @desc    Delete user and profile
// @access  Private
router.delete("/", profilesController.deleteProfile);

module.exports = router;
