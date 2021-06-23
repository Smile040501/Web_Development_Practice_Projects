const User = require("../models/users");

exports.getMain = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            console.log("Main - No user found");
            return res.redirect("/login");
        }
        const userType = user.googleId ? "Google" : "Local";
        res.render("main", {
            pageTitle: "Main Page",
            userEmail: user.email,
            userType,
        });
    } catch (err) {
        console.log(err);
        res.send("<h1>An Error Occurred</h1>");
    }
};
