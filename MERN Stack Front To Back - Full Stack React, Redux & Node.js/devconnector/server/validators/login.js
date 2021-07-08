const { body } = require("express-validator");

module.exports = [
    body("email")
        .notEmpty()
        .withMessage("Email field is required")
        .isEmail()
        .withMessage("Email is invalid")
        .normalizeEmail(),

    body("password").notEmpty().withMessage("Password field is required").trim(),
];
