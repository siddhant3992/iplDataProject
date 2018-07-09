let expect = require("chai").expect;
let path = require("path");
let filename = path.resolve("./app.js");
let app = require(filename);
let dataset = path.resolve("./ipl/matchTest.csv");
describe("app", function () {

    //------------test cases for number of matches----------.
    it("should return total number of matches played per year", function (done) {

        let expectedResult = [
            ["2017", 10]
        ];
        app.readCsv(dataset).then(function (data) {
            try {
                expect(data).deep.equal(expectedResult);
                done();
            } catch (e) {
                done(e);
            }
        });

    });
    //------------file not found case--------------------.
    it("should return file not found", async function () {
        let expectedResult = false;
        let dat = "./ipl/text.txt";
        const data = await app.readCsv(dat);
        expect(data).equal(expectedResult);
    });
});
