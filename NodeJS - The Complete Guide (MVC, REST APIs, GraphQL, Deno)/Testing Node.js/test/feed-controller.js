const { expect } = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const Post = require("../models/post");
const FeedController = require("../controllers/feed");

describe("Feed Controller", function () {
    before(function (done) {
        mongoose
            .connect("MONGODB_ATLAS_URI", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            })
            .then((result) => {
                const user = new User({
                    email: "test@test.com",
                    password: "tester",
                    name: "Test",
                    posts: [],
                    _id: "MONGODB_GENERATED_ID",
                });
                return user.save();
            })
            .then(() => {
                done();
            })
            .catch((err) => console.log(err));
    });

    beforeEach(function () {});

    afterEach(function () {});

    it("should add a created post to the post of the creator", function (done) {
        const req = {
            body: {
                title: "Test Post",
                content: "A Test Post",
            },
            file: {
                path: "abc",
            },
            userId: "MONGODB_GENERATED_ID",
        };

        const res = {
            status: function (code) {
                return this;
            },
            json: function (data) {},
        };

        FeedController.createPost(req, res, () => {}).then((savedUser) => {
            expect(savedUser).to.have.property("posts");
            expect(savedUser.posts).to.have.length(1);
            done();
        });
    });

    after(function (done) {
        User.deleteMany({})
            .then(() => {
                return Post.deleteMany({});
            })
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            })
            .catch((err) => console.log(err));
    });
});
