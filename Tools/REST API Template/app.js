const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// import your routes
const sampleRoutes = require("./routes/sample");
const HttpError = require("./models/httpError");

const app = express();

app.use(bodyParser.json());

// serve static files here

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});

// use your routes here

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

(async () => {
    try {
        await mongoose.connect(
            // Confirm URI at MongoDB Atlas Project Cluster
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lnjtv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
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
