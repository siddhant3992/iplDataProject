//------------matches per Year-----------

function readCsv(path) {
    let fs = require("fs");
    let csv = require("fast-csv");
    let matches = [];
    let countYears = [];
    if (!fs.existsSync(path)) {
        console.log("file not found");
        return false;
    } else {
        return new Promise(function (resolve, reject) {
            fs.createReadStream(path).pipe(csv()).on("data", function (data) {
                if (Number(data[1])) {
                    matches.push(data[1]);
                }
            }).on("end", function () {

                let noOfMatches = 1;
                for (let i = 0; i < matches.length; i++) {
                    let nextElement = matches[i + 1];
                    if (matches[i] === nextElement) {
                        noOfMatches += 1;
                    } else {
                        countYears.push([matches[i], noOfMatches]);
                        noOfMatches = 1;
                    }
                }
                resolve(countYears);
            });

        });
    }
}

//exporting function
module.exports = {
    readCsv: readCsv
};