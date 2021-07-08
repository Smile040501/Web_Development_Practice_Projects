const { body } = require("express-validator");

module.exports = [
    body("title").notEmpty().withMessage("Job title field is required").trim(),
    body("company").notEmpty().withMessage("Company field is required").trim(),
    body("from").notEmpty().withMessage("From date field is required").trim(),
    body("to")
        .optional()
        .custom((val, { req }) => {
            if (new Date(val) <= new Date(req.body.from)) {
                throw new Error("To time has to be greater than from time");
            }
            return true;
        }),
];
