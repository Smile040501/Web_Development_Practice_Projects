const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const axios = require("axios");

const Profile = require("../models/profile");
const User = require("../models/user");
const HttpError = require("../models/httpError");

const fetchProfileRepos = async (username) => {
    try {
        const count = 5;
        const sort = "created: asc";
        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;
        const repos =
            await axios.get(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&
        client_id=${clientId}&client_secret=${clientSecret}`);
        return repos.data.map((repo) => ({
            repoId: repo.id,
            html_url: repo.html_url,
            name: repo.name,
            description: repo.description,
            stargazers_count: repo.stargazers_count,
            watchers_count: repo.watchers_count,
            forks_count: repo.forks_count,
        }));
    } catch (err) {
        console.log(err);
        throw new HttpError("Failed to load github repositories", 500);
    }
};

const getAllProfiles = async (req, res, next) => {
    let profiles;
    try {
        profiles = await Profile.find({}).populate("userId", ["name", "avatar"]);
    } catch (err) {
        const error = new HttpError("Could not fetch profiles, please try again", 500);
        return next(error);
    }

    if (profiles.length === 0) {
        const error = new HttpError("No Profiles found", 404);
        return next(error);
    }

    res.json({ profiles: profiles.map((profile) => profile.toObject({ getters: true })) });
};

const getProfileByHandle = async (req, res, next) => {
    const { handle } = req.params;

    let profile;
    try {
        profile = await Profile.findOne({ handle }).populate("userId", ["name", "avatar"]);
    } catch (err) {
        const error = new HttpError("Could not fetch profile, please try again", 500);
        return next(error);
    }
    if (!profile) {
        const error = new HttpError("No Profile found", 404);
        return next(error);
    }

    let repos = [];
    if (profile.githubUsername) {
        try {
            repos = await fetchProfileRepos(profile.githubUsername);
        } catch (err) {
            console.log(err);
            const error = new HttpError("Failed to load github repositories", 500);
            return next(error);
        }
    }

    res.json({ profile: profile.toObject({ getters: true }), repos });
};

const getCurrentUserProfile = async (req, res, next) => {
    const { userId } = req.userData;
    let profile;
    try {
        profile = await Profile.findOne({ userId }).populate("userId", ["name", "avatar"]);
    } catch (err) {
        const error = new HttpError("Could not get current user profile, please try again", 500);
        return next(error);
    }
    if (!profile) {
        const error = new HttpError("Profile not found", 404);
        return next(error);
    }
    res.json({ profile: profile.toObject({ getters: true }) });
};

const createOrEditUserProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Validation error!", 422, errors));
    }

    const { userId } = req.userData;
    const {
        handle,
        status,
        skills,
        company,
        website,
        location,
        bio,
        githubUsername,
        youTube,
        twitter,
        facebook,
        linkedIn,
        instagram,
    } = req.body;

    const profileFields = {
        userId,
        handle,
        status,
        skills: skills.split(","),
        company,
        website,
        location,
        bio,
        githubUsername,
        social: { youTube, twitter, facebook, linkedIn, instagram },
    };

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError("Some error occurred, please try again", 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError("User Not Found", 404);
        return next(error);
    }

    let profile;
    try {
        profile = await Profile.findOne({ userId });
    } catch (err) {
        const error = new HttpError("Some error occurred, please try again", 500);
        return next(error);
    }

    let existingProfileWithSameHandle;
    try {
        existingProfileWithSameHandle = await Profile.findOne({ handle });
    } catch (err) {
        const error = new HttpError("Could not create user profile, please try again", 500);
        return next(error);
    }

    if (
        (!profile && existingProfileWithSameHandle) ||
        (profile &&
            existingProfileWithSameHandle &&
            profile.id.toString() !== existingProfileWithSameHandle.id.toString())
    ) {
        const error = new HttpError("User handle already exists", 422);
        return next(error);
    }

    if (profile) {
        try {
            profile = await Profile.findOneAndUpdate(
                { userId },
                { $set: profileFields },
                { new: true }
            );
        } catch (err) {
            const error = new HttpError("Could not edit user profile, please try again", 500);
            return next(error);
        }
        return res.json({ profile });
    }

    const newProfile = new Profile(profileFields);
    try {
        await newProfile.save();
    } catch (err) {
        const error = new HttpError("Could not create user profile, please try again", 500);
        return next(error);
    }
    res.json({ newProfile: newProfile.toObject({ getters: true }) });
};

const addExperience = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Validation error!", 422, errors));
    }

    const { userId } = req.userData;

    let profile;
    try {
        profile = await Profile.findOne({ userId }).populate("userId", ["name", "avatar"]);
    } catch (err) {
        const error = new HttpError("Could not add experience, please try again", 500);
        return next(error);
    }

    if (!profile) {
        const error = new HttpError("Profile not found", 404);
        return next(error);
    }

    const { title, company, location, from, to, current, description } = req.body;
    const newExp = { title, company, location, from, to, current, description };

    profile.experience.unshift(newExp);

    try {
        await profile.save();
    } catch (err) {
        const error = new HttpError("Could not add experience, please try again", 500);
        return next(error);
    }
    res.json({ profile: profile.toObject({ getters: true }) });
};

const addEducation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Validation error!", 422, errors));
    }

    const { userId } = req.userData;

    let profile;
    try {
        profile = await Profile.findOne({ userId }).populate("userId", ["name", "avatar"]);
    } catch (err) {
        const error = new HttpError("Could not add education, please try again", 500);
        return next(error);
    }

    if (!profile) {
        const error = new HttpError("Profile not found", 404);
        return next(error);
    }

    const { school, degree, fieldOfStudy, from, to, current, description } = req.body;
    const newEdu = { school, degree, fieldOfStudy, from, to, current, description };

    profile.education.unshift(newEdu);

    try {
        await profile.save();
    } catch (err) {
        const error = new HttpError("Could not add education, please try again", 500);
        return next(error);
    }
    res.json({ profile: profile.toObject({ getters: true }) });
};

const deleteExperience = async (req, res, next) => {
    const { userId } = req.userData;
    const { eid } = req.params;

    let profile;
    try {
        profile = await Profile.findOne({ userId }).populate("userId", ["name", "avatar"]);
    } catch (err) {
        const error = new HttpError("Could not delete experience, please try again", 500);
        return next(error);
    }

    if (!profile) {
        const error = new HttpError("Profile not found", 404);
        return next(error);
    }

    const idx = profile.experience.findIndex((exp) => exp.id.toString() === eid.toString());

    if (idx === -1) {
        const error = new HttpError("Experience not found", 404);
        return next(error);
    }

    profile.experience.splice(idx, 1);

    try {
        await profile.save();
    } catch (err) {
        const error = new HttpError("Could not delete experience, please try again", 500);
        return next(error);
    }
    res.json({ profile: profile.toObject({ getters: true }) });
};

const deleteEducation = async (req, res, next) => {
    const { userId } = req.userData;
    const { eid } = req.params;

    let profile;
    try {
        profile = await Profile.findOne({ userId }).populate("userId", ["name", "avatar"]);
    } catch (err) {
        const error = new HttpError("Could not delete education, please try again", 500);
        return next(error);
    }

    if (!profile) {
        const error = new HttpError("Profile not found", 404);
        return next(error);
    }

    const idx = profile.education.findIndex((exp) => exp.id.toString() === eid.toString());

    if (idx === -1) {
        const error = new HttpError("Education not found", 404);
        return next(error);
    }

    profile.education.splice(idx, 1);

    try {
        await profile.save();
    } catch (err) {
        const error = new HttpError("Could not delete education, please try again", 500);
        return next(error);
    }
    res.json({ profile: profile.toObject({ getters: true }) });
};

const deleteProfile = async (req, res, next) => {
    const { userId } = req.userData;

    let profile;
    try {
        profile = await Profile.findOne({ userId });
    } catch (err) {
        const error = new HttpError("Could not delete profile and account, please try again", 500);
        return next(error);
    }

    if (!profile) {
        const error = new HttpError("Profile Not Found", 404);
        return next(error);
    }

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError("Could not delete profile and account, please try again", 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError("User Not Found", 404);
        return next(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await profile.remove({ session });
        await user.remove({ session });
        await session.commitTransaction();
    } catch (err) {
        const error = new HttpError("Could not delete profile and account, please try again", 500);
        return next(error);
    }
    res.json({ success: true });
};

module.exports = {
    getAllProfiles,
    getProfileByHandle,
    getCurrentUserProfile,
    createOrEditUserProfile,
    addExperience,
    addEducation,
    deleteExperience,
    deleteEducation,
    deleteProfile,
};
