const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const User = require("../models/user");
const HttpError = require("../models/httpError");

const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Validation error!", 422, errors));
    }

    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        const error = new HttpError("Registering user failed, please try again later.", 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError("User exists already, please login instead.", 422);
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError("Registering user failed, please try again later.", 500);
        return next(error);
    }

    const avatar = gravatar.url(email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm", // Default Image
    });

    const createdUser = new User({ name, email, password: hashedPassword, avatar });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError("Registering user failed, please try again.", 500);
        return next(error);
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email });
};

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Validation error!", 422, errors));
    }

    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        const error = new HttpError("Logging user failed, please try again later.", 500);
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError("Invalid credentials, could not log you in.", 401);
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            "Could not log you in, please check your credentials and try again.",
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError("Invalid credentials, could not log you in.", 401);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError("Logging in failed, please try again.", 500);
        return next(error);
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        avatar: existingUser.avatar,
        expiresIn: 3600,
        token,
    });
};

module.exports = { register, login };
