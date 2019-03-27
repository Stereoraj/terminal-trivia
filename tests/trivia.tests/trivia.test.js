const expect = require("expect");
const trivia = require("../../trivia/trivia.js");

describe("Trivia - trivia", () => {
    it("should return an array of trivia objects", (done) => {
        trivia.getTrivia()
        .then((res) => {
                expect(res).toHaveLength(10);
                done();
        });
    }).timeout(5000);
});