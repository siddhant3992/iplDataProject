let fs = require('fs');

//reading csv file
let csvFile = fs.readFileSync('ipl/matches.csv', 'utf8');

//function to convert csv file into array of objects
function csvParse(csvf) {

    let lines = csvf.split("\n");

    let matches = [];

    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length - 1; i++) {

        let obj = {};
        let currentline = lines[i].split(",");

        for (let j = 0; j < headers.length - 3; j++) {
            obj[headers[j]] = currentline[j];
            //matches.push(obj);
        }
        matches.push(obj);
    }
    return matches;

}
let matchData = csvParse(csvFile);
// console.log(matchData[637]);

//---------------function to count the matches per year
let years=(data)=>{
    let arr=[];
for(let i=0;i<data.length;i++){
arr.push(data[i].season);

}
return arr;
}

let matchYear=years(matchData);

let countedyears=matchYear.reduce((allyears,years)=>{
    if (years in allyears) {
        allyears[years]++;
      }
      else {
        allyears[years] = 1;
      }
      return allyears;
},{});
//console.log(countedyears);

//---------------function to count the individual team win in every season of ipl 






































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