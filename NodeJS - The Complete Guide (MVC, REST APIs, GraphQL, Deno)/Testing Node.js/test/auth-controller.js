const { expect } = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller", function () {
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

    it("should throw an error with code 500 if accessing the database fails", function (done) {
        sinon.stub(User, "findOne");
        User.findOne.throws();

        const req = {
            body: {
                email: "test@test.com",
                password: "tester",
            },
        };

        AuthController.login(req, {}, () => {})
            .then((result) => {
                expect(result).to.be.an("error");
                expect(result).to.have.property("statusCode", 500);
                done();
            })
            .catch((err) => console.log(err));

        User.findOne.restore();
    });

    it("should send a response with a valid user status for an existing user", function (done) {
        const req = { userId: "MONGODB_GENERATED_ID" };
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userStatus = data.status;
            },
        };
        AuthController.getUserStatus(req, res, () => {})
            .then(() => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.userStatus).to.be.equal("I am new!");
                done();
            })
            .catch((err) => console.log(err));
    });

    after(function (done) {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            })
            .catch((err) => console.log(err));
    });
});
