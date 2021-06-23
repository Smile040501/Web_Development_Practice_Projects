const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

const authMiddleware = require("../middleware/isAuth.js");

describe("Auth Middleware", function () {
    it("should throw an error if no authorization header is present", function () {
        const req = {
            get: function (headerName) {
                return null;
            },
        };

        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw("Not authenticated.");
    });

    it("should throw an error if the authorization header is only one string", function () {
        const req = {
            get: function (headerName) {
                return "xyz";
            },
        };

        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

    it("should throw an error if the token cannot be verified", function () {
        const req = {
            get: function (headerName) {
                return "Bearer xyz";
            },
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

    it("should yield a userId after decoding the token", function () {
        const req = {
            get: function (headerName) {
                return "Bearer xyzadkajdskjakdakjakskahdks";
            },
        };
        // if will replace that object's method with empty function
        // Also do things like, registering function calls - so we can test for has the function been called or not
        sinon.stub(jwt, "verify");
        jwt.verify.returns({ userId: "abc" }); // method added by sinon
        authMiddleware(req, {}, () => {});
        expect(req).to.have.property("userId");
        expect(req).to.have.property("userId", "abc");
        expect(jwt.verify.called).to.be.true;
        jwt.verify.restore(); // restore the original function
    });
});
