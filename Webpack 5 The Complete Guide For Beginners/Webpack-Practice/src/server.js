const path = require("path");
const fs = require("fs");

const express = require("express");

const app = express();

app.get("/helloWorld", (req, res, next) => {
    const pathToHtmlFile = path.resolve(__dirname, "..", "dist", "helloWorld.html");
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
    res.send(contentFromHtmlFile);
});

app.get("/smile", (req, res, next) => {
    const pathToHtmlFile = path.resolve(__dirname, "..", "dist", "smile.html");
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
    res.send(contentFromHtmlFile);
});

app.use("/static", express.static(path.resolve(__dirname, "..", "dist")));

app.listen(8000, () => {
    console.log("Server running!");
});
