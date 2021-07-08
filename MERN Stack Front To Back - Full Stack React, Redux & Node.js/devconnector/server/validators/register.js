const { body } = require("express-validator");

module.exports = [
    body("name")
        .notEmpty()
        .withMessage("Name field is required")
        .isLength({ min: 2, max: 30 })
        .withMessage("Name must be between 2 to 30 characters.")
        .trim(),

    body("email")
        .notEmpty()
        .withMessage("Email field is required")
        .isEmail()
        .withMessage("Email is invalid")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password field is required")
        .isLength({ min: 6, max: 12 })
        .withMessage("Password must be 6 to 12 characters long")
        .isAlphanumeric()
        .withMessage("Password should contain only alphanumeric characters (letters, digits, _)")
        .trim(),

    body("confirmPassword")
        .notEmpty()
        .withMessage("Confirm Password field is required")
        .trim()
        .custom((val, { req }) => {
            if (val !== req.body.password) {
                throw new Error("Passwords have to match!");
            }
            return true;
        }),
];
