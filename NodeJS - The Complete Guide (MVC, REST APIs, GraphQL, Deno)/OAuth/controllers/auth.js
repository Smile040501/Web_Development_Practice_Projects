const User = require("../models/users");
const { googleLoginUrl, googleSignupUrl } = require("../oauth/google");

exports.getSignup = (req, res, next) => {
    res.render("signup", {
        pageTitle: "SignUp",
        googleSignupUrl,
    });
};

exports.postSignup = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log("User with that email already exists");
            return res.redirect("/signup");
        }
        const newUser = new User({ email, password });
        await newUser.save();
        res.redirect("/login");
    } catch (err) {
        console.log(err);
        res.send("<h1>An Error Occurred</h1>");
    }
};

exports.getLogin = (req, res, next) => {
    res.render("login", {
        pageTitle: "Login",
        googleLoginUrl,
    });
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
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
        res.send("<h1>An Error Occurred</h1>");
    }
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};
