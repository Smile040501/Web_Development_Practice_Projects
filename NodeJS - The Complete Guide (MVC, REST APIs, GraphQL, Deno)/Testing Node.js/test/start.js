const expect = require("chai").expect;

describe("Basic Tests", function () {
    it("should add numbers correctly", function () {
        const a = 2,
            b = 3;
        expect(a + b).to.equal(5);
    });
});
