function totalMatches() {
    let fs = require('fs');
    let csv = require('fast-csv');
    let matches = [];
    fs.createReadStream('ipl/matches.csv').pipe(csv()).on('data', function (data) {
        //console.log(data);
        if (Number(data[1])) {
            matches.push(data[1]);
        }
    }).on('end', function () {
        let countedyears = matches.reduce((allyears, years) => {
            if (years in allyears) {
                allyears[years]++;
            } else {
                allyears[years] = 1;
            }
            return allyears;
        }, {});
        console.log(countedyears);
    });
   
}
totalMatches();





















//reading csv file
// let csvFile = fs.readFileSync('ipl/matches.csv', 'utf8');

//function to convert csv file into array of objects
// function csvParse(csvf) {

//     let lines = csvf.split("\n");

//     let matches = [];

//     let headers = lines[0].split(",");

//     for (let i = 1; i < lines.length - 1; i++) {

//         let obj = {};
//         let currentline = lines[i].split(",");

//         for (let j = 0; j < headers.length - 3; j++) {
//             obj[headers[j]] = currentline[j];
//             //matches.push(obj);
//         }
//         matches.push(obj);
//     }
//     return matches;

// }
// let matchData = csvParse(csvFile);
// console.log(matchData[637]);

//---------------function to count the matches per year
// let years=(data)=>{
//     let arr=[];
// for(let i=0;i<data.length;i++){
// arr.push(data[i].season);

// }
// return arr;
// }

//let matchYear=years(matches);


//---------------function to count the individual team win in every season of ipl 

//console.log(winners);

// var http=require('http');

// var server =http.createServer(function(req,res){res.writeHead(200,{'Content-type':'text/plan'});
// res.end('hey ninjas');
// });

// server.listen(3000,'127.0.0.1');
// console.log('listening');

// var express=require('express');
// var app=express();
// var path = require('path');

// app.get('/',function(req,res){
// res.sendFile(path.join(__dirname+'/index.html'));
// });

// app.listen(8000);

// console.log('listening');



































//JSON file

// fs.writeFile('matches.json',JSON.stringify(matches, null,4),(err)=> {
//     if (err) throw err;
//     console.log('Saved!');
//   });



//  let csv=require('fast-csv');
//let csvFile=fs.createReadStream('ipl/deliveries.csv')
// .pipe(csv())
// .on('data',function(data){
//     console.log(data);
// })
// .on('end',function(data){
//     console.log('Read Finished');
// })




// let fs = require('fs');

// fs.unlink('ae.txt',function (err) {
//   if (err) throw err;
//   console.log('deleted');
// }