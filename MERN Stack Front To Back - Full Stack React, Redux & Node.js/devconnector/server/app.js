const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts");
const profilesRoutes = require("./routes/profiles");
const usersRoutes = require("./routes/users");
const HttpError = require("./models/httpError");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.use("/api/profiles", profilesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || "An unknown error occurred!",
        errors: error.errors ? error.errors : null,
    });
});

(async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lnjtv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }
        );
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log("Server running!");
        });
    } catch (err) {
        console.log(err);
    }
})();
