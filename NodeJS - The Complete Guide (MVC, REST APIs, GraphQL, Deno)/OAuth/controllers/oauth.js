const User = require("../models/users");
const { getAccessTokenFromCode, getGoogleUserInfo } = require("../oauth/google");

// Check if user with same email exists
// If not, check if email is verified
// If yes, create a new user and save it on DB
// Directly Login the current user
exports.handleGoogleSignupRedirect = async (req, res, next) => {
    if (req.query.error) {
        console.log(`An error occurred: ${req.query.error}`);
        return res.send("<h1>Error Occurred</h1>");
    }
    const code = req.query.code;
    console.log(`The code is: ${code}`);
    try {
        const accessToken = await getAccessTokenFromCode(code, "SIGNUP");
        const userInfo = await getGoogleUserInfo(accessToken);
        if (!userInfo.verified_email) {
            console.log("Google Account Not Verified");
            return res.redirect("/signup");
        }

        const user = await User.findOne({ email: userInfo.email });
        if (user) {
            console.log("User with that email already exists, Try Logging in");
            return res.redirect("/signup");
        }
        const newUser = new User({ email: userInfo.email, googleId: userInfo.id });

        const savedUser = await newUser.save();
        req.session.userId = savedUser._id.toString();
        req.session.isLoggedIn = true;
        req.session.save((err) => {
            res.redirect("/");
        });
    } catch (err) {
        console.log(err);
        res.send("<h1>Error Occurred</h1>");
    }
};

// Check if user exists and login
exports.handleGoogleLoginRedirect = async (req, res, next) => {
    if (req.query.error) {
        console.log(`An error occurred: ${req.query.error}`);
        return res.send("<h1>Error Occurred</h1>");
    }
    const code = req.query.code;
    try {
        const accessToken = await getAccessTokenFromCode(code, "LOGIN");
        const userInfo = await getGoogleUserInfo(accessToken);
        const user = await User.findOne({ email: userInfo.email, googleId: userInfo.id });
        if (!user) {
            console.log("No user with that email exists");
            return res.redirect("/login");
        }
        req.session.userId = user._id.toString();
        req.session.isLoggedIn = true;
        req.session.save((err) => {
            res.redirect("/");
        });
    } catch (err) {
        console.log(err);
        res.send("<h1>Error Occurred</h1>");
    }
};
