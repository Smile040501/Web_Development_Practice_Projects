const { body } = require("express-validator");

module.exports = [
    body("text")
        .notEmpty()
        .withMessage("Text field is required.")
        .isLength({ min: 10, max: 300 })
        .withMessage("Post must be from 10 to 300 characters.")
        .trim(),
];
