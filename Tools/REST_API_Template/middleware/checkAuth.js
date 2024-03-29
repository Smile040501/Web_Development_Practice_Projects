// Middleware to check whether the user is authenticated or not
// User needs to send JWT token for all protected routes which was sent when user login/singup
const jwt = require("jsonwebtoken");
const HttpError = require("../models/httpError");

module.exports = (req, res, next) => {
    // OPTIONS is a special browser request
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const authHeader = req.get("Authorization");
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Authentication failed!");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        if (!decodedToken) {
            throw new Error("Authentication failed!");
        }
        // NOTE: Use below line as per your needs
        // req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError("Authentication failed!", 401);
        return next(error);
    }
};
