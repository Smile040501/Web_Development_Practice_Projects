const { body } = require("express-validator");

module.exports = [
    body("school").notEmpty().withMessage("School field is required").trim(),
    body("degree").notEmpty().withMessage("Degree field is required").trim(),
    body("fieldOfStudy").notEmpty().withMessage("Study field is required").trim(),
    body("from").notEmpty().withMessage("From date field is required"),
    body("to")
        .optional()
        .custom((val, { req }) => {
            if (new Date(val) <= new Date(req.body.from)) {
                throw new Error("To time has to be greater than from time");
            }
            return true;
        }),
];
