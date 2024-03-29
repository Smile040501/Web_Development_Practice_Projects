const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Article = mongoose.model("Article", articleSchema);

// ********************** Requests Targetting All The Articles ***************************************

app.route("/articles")
    .get(function (req, res) {
        Article.find({}, function (err, foundArticles) {
            if (!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
        });
        newArticle.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully added a new article.");
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (!err) {
                res.send("Successfully deleted all the articles.");
            } else {
                res.send(err);
            }
        });
    });

// ********************** Requests Targetting A Specific Article ***************************************

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        Article.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
            if (err) {
                res.send(err);
            } else {
                if (foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send("No articles matching that article was found.");
                }
            }
        });
    })
    .put(function (req, res) {
        Article.update(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true },
            function (err) {
                if (!err) {
                    res.send("Successfully updated the content of the selected article.");
                } else {
                    res.send(err);
                }
            }
        );
    })
    .patch(function (req, res) {
        Article.update({ title: req.params.articleTitle }, { $set: req.body }, function (err) {
            if (!err) {
                res.send("Successfully updated the content of the selected article.");
            } else {
                res.send(err);
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteOne({ title: req.params.articleTitle }, function (err) {
            if (!err) {
                res.send("Successfully deleted the selected article.");
            } else {
                res.send(err);
            }
        });
    });

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
