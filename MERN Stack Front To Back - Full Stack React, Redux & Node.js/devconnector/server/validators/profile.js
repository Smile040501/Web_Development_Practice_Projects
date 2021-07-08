const { body, oneOf } = require("express-validator");

module.exports = [
    body("handle")
        .notEmpty()
        .withMessage("Profile handle is required")
        .isLength({ min: 2, max: 40 })
        .withMessage("Handle needs to be from 2 to 40 characters")
        .trim(),

    body("status").notEmpty().withMessage("Status field is required").trim(),

    body("skills").notEmpty().withMessage("Skills field is required").trim(),

    oneOf([
        body("website").optional(),
        body("website").isEmpty(),
        body("website").isURL().withMessage("Not a valid url"),
    ]),
    oneOf([
        body("youTube").optional(),
        body("youTube").isEmpty(),
        body("youTube").isURL().withMessage("Not a valid url"),
    ]),
    oneOf([
        body("twitter").optional(),
        body("twitter").isEmpty(),
        body("twitter").isURL().withMessage("Not a valid url"),
    ]),
    oneOf([
        body("facebook").optional(),
        body("facebook").isEmpty(),
        body("facebook").isURL().withMessage("Not a valid url"),
    ]),
    oneOf([
        body("linkedIn").optional(),
        body("linkedIn").isEmpty(),
        body("linkedIn").isURL().withMessage("Not a valid url"),
    ]),
    oneOf([
        body("instagram").optional(),
        body("instagram").isEmpty(),
        body("instagram").isURL().withMessage("Not a valid url"),
    ]),
];
