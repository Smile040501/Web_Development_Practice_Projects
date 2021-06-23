const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const mainRoutes = require("./routes/main");
const oauthRoutes = require("./routes/oauth");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
    session({
        secret: "somesupersecretsecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1 * 60 * 60 * 1000, // 1hr
        },
    })
);

app.use(oauthRoutes);
app.use(mainRoutes);
app.use(authRoutes);

app.use((req, res, next) => {
    res.send("<h1>404: Not Found</h1>");
});

const uri = "MONGODB_ATLAS_URI";

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        app.listen(3000, () => {
            console.log("Server Running!");
        });
    })
    .catch((err) => {
        console.log(err);
    });
