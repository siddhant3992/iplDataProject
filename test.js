let expect = require("chai").expect;
let app = require("./app.js");
describe("app", function () {
    it("should return total number of matches played per year", function () {

        let matches = ['2017',
            '2017',
            '2016',
            '2016',
            '2016',
            '2015',
            '2015'
        ]

        let expectedResult = [
            ['2017', 2],
            ['2016', 3],
            ['2015', 2],
        ]
        let result = app.totalMatches(matches);

        expect(result).deep.equal(expectedResult);
    })


})