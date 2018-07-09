/////////////////////////////////* Matches JSON File*/////////////////////////////////

const fs = require('fs');
const matchesData = fs.readFileSync('./csv/matches.csv', 'utf-8');
const linesForMatches = matchesData.split(/\r?\n|\n/);
const matches = [];

const matchKeys = linesForMatches[0].split(',');

for (let i = 1; i < linesForMatches.length; i++) {
    let matchObj = {};
    let current = linesForMatches[i].split(',');
    for (let j = 0; j < linesForMatches[i].length; j++) {
        matchObj[matchKeys[j]] = current[j];
    }
    matches.push(matchObj);
}

// fs.writeFile('./json/matches.json', JSON.stringify(matches, null, 10), (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("File Created");
// });

/////////////////////////////////* Deliveries JSON File */////////////////////////////////

const deliveriesData = fs.readFileSync('./csv/deliveries.csv', 'utf-8');
const linesForDeliveries = deliveriesData.split(/\r?\n|\n/);
const deliveries = [];

const deliveriesKeys = linesForDeliveries[0].split(',');

for (let i = 1; i < linesForDeliveries.length; i++) {
    let deliveryObj = {};
    let cur = linesForDeliveries[i].split(',');
    for (let j = 0; j < linesForDeliveries[i].length; j++) {
        deliveryObj[deliveriesKeys[j]] = cur[j];
    }
    deliveries.push(deliveryObj);
}

// fs.writeFile('./json/deliveries.json', JSON.stringify(deliveries, null, 10), (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("File Created");
// });

/////////////////////////////////* No. of matches played per year */////////////////////////////////


function matchesPlayed() {

    let matchCount = 1;
    let matchesPerSeason = [];

    for (let i = 0; i < matches.length - 1; i++) {
        let season = matches[i].season;
        let nextSeason = matches[i + 1].season;
        if (season === nextSeason) {
            matchCount++;
        } else {
            let seasonObj = {};
            seasonObj[season] = matchCount;
            matchesPerSeason.push(seasonObj);
            matchCount = 1;
        }
    }

    // Highcharts.chart('container', {
    //     chart: {
    //         type: 'line'
    //     },
    //     title: {
    //         text: 'Number of Matches played per year'
    //     },
    //     subtitle: {
    //         text: 'Source: iplt20.com'
    //     },
    //     xAxis: {
    //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Matches'
    //         }
    //     },
    //     plotOptions: {
    //         line: {
    //             dataLabels: {
    //                 enabled: true
    //             },
    //             enableMouseTracking: false
    //         }
    //     },
    //     series: [{
    //         name: 'Year',
    //         data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    //     }]
    // });

    // fs.writeFile('./json/matchesPerSeason.json', JSON.stringify(matchesPerSeason, null, 10), (err) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log("File Created");
    // });
}

// matchesPlayed();

/////////////////////////////////* Matches won by teams */////////////////////////////////

function matchesWon() {

    let matchesPerSeason = [];
    let allteams = [];

    for (let i = 0; i < matches.length - 1; i++) {
        let team = matches[i].winner;
        if (!allteams.includes(team)) {
            if (team !== '') {
                allteams.push(team);
            }
        }
    }

    // console.log(allteams);

    let winningTeams = [];
    let winCount = 0;

    for (let i = 0; i < allteams.length; i++) {
        for (let j = 0; j < matches.length - 1; j++) {
            let season = matches[j].season;
            let nextSeason = matches[j + 1].season;
            if (season === nextSeason) {
                if (allteams[i] === matches[j].winner) {
                    winCount++;
                }
            } else {
                let teamObj = {
                    team: allteams[i],
                    season: season,
                    wins: winCount
                }
                winningTeams.push(teamObj);
                winCount = 0;
            }
        }
    }

    // console.log(winningTeams);

    // fs.writeFile('./json/winningTeams.json', JSON.stringify(winningTeams, null, 10), (err) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log("File Created");
    // });
}

// matchesWon();

/////////////////////////////////* 2016 extra runs conceded per team */////////////////////////////////

function extraRuns() {

    let allExtras = [];
    let extras = 0;

    for (let i = 0; i < matches.length; i++) {
        if (matches[i].season === '2016') {
            for (let j = 0; j < deliveries.length - 1; j++) {
                if (matches[i].id === deliveries[j].match_id) {
                    let team = deliveries[j].bowling_team;
                    let nextTeam = deliveries[j + 1].bowling_team;
                    if (team === nextTeam) {
                        extras += parseInt(deliveries[j].extra_runs);
                    } else {
                        let extraObj = {
                            team: team,
                            extras: extras
                        };
                        allExtras.push(extraObj);
                        extras = 0;
                    }
                }
            }
        }
    }

    // console.log(allExtras);

    let allteams = [];

    for (let i = 0; i < allExtras.length; i++) {
        let team = allExtras[i].team;
        if (!allteams.includes(team)) {
            allteams.push(team);
        }
    }

    let totalExtras = 0;
    let extrasPerTeam = [];

    for (let i = 0; i < allteams.length; i++) {
        let team = allteams[i];
        for (let j = 0; j < allExtras.length; j++) {
            if (team === allExtras[j].team) {
                totalExtras += allExtras[j].extras;
            }
        }
        let extraObj = {};
        extraObj[team] = totalExtras;
        extrasPerTeam.push(extraObj);
        totalExtras = 0;
    }

    console.log(extrasPerTeam);

    // fs.writeFile('./json/extrasPerTeam.json', JSON.stringify(extrasPerTeam, null, 10), (err) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log("File Created");
    // });
}

// extraRuns();

/////////////////////////////////* 2015 economical bowlers */////////////////////////////////

function economicalBowlers() {

    let allBowlers = [];
    let bowlersCount = 0;

    for (let i = 0; i < matches.length; i++) {
        if (matches[i].season === '2015') {
            for (let j = 0; j < deliveries.length; j++) {
                if (matches[i].id === deliveries[j].match_id) {
                    let bowler = deliveries[j].bowler;
                    if (!allBowlers.includes(bowler)) {
                        allBowlers.push(bowler);
                    }
                }
            }
        }
    }

    let startSeason;
    for (let i = 0; i < matches.length; i++) {
        if (matches[i].season === '2015') {
            startSeason = parseInt(matches[i].id);
            break;
        }
    }

    let endSeason;
    for (let i = 0; i < matches.length; i++) {
        if (matches[i].season === '2016') {
            endSeason = parseInt(matches[i].id);
            break;
        }
    }

    let bowlersCard = [];
    let runs = 0;
    let bowls = 0;
    for (let j = 0; j < deliveries.length; j++) {
        if ((deliveries[j].match_id >= startSeason) && (deliveries[j].match_id < endSeason)) {
            let bowler = deliveries[j].bowler;
            let nextBowler = deliveries[j + 1].bowler;
            if (bowler === nextBowler) {
                runs += parseInt(deliveries[j].total_runs);
                if ((deliveries[j].wide_runs !== '0') || (deliveries[j].noball_runs !== '0')) {
                    bowls--;
                }
                else{
                	bowls++;
                }
            } else {
                runs += parseInt(deliveries[j].total_runs);
                bowls++;
                bowlerObj = {
                    bowler: bowler,
                    runs: runs,
                    bowls: bowls
                }
                bowlersCard.push(bowlerObj);
                runs = 0;
                bowls = 0;
            }
        }
    }

    console.log(bowlersCard);

	let bowlersStats = [];

	for (let i = 0; i < allBowlers.length; i++) {
	    for (let j = 0; j < bowlersCard.length; j++) {
	        if (allBowlers[i] === bowlersCard[j].bowler) {
	            runs += bowlersCard[j].runs;
	            bowls += bowlersCard[j].bowls;
	        }
	    }
	    economyRate = ((runs / bowls) * 6);
	    let bowlerObj = {
	        bowler: allBowlers[i],
	        runs: runs,
	        bowls: bowls,
	        economyrate : economyRate
	    }
	    bowlersStats.push(bowlerObj);
	    runs = 0;
	    bowls = 0;
	}

	let bowlersEconomyRate = [];

	bowlersStats.sort(function(a, b){
		return a.economyrate - b.economyrate;
	});

	let topTenEconomicalBowlers = [];

	for(let i = 0; i < 10; i++){
		topTenEconomicalBowlers.push(bowlersStats[i]);
	}

	fs.writeFile('./json/topTenEconomicalBowlers.json', JSON.stringify(topTenEconomicalBowlers, null, 10), (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("File Created");
    });
}

// economicalBowlers();

/////////////////////////////////* 2015 economical bowlers */////////////////////////////////

function mostSixesPerSeason(){

    let allBatsman = [];
    let sixesCount = 0;

    for(let i = 0; i < deliveries.length; i++){
        if(parseInt(deliveries[i].batsman_runs) === 6){
            let sixesObj = {
                batsman : deliveries[i].batsman,
                yearid : deliveries[i].match_id
            };
            allBatsman.push(sixesObj);
        }
    }

    // console.log(allBatsman);
    // allBatsman.sort();

    let sixesPerSeason = [];

    for(let i = 0; i < allBatsman.length; i++){
        for(let j = 0; j < matches.length; j++){
            if(matches[j].id === allBatsman[i].yearid){
                let newObj = {
                    batsman : allBatsman[i].batsman,
                    season : matches[j].season   
                }
                sixesPerSeason.push(newObj);
            }
        }
    }

    // console.log(sixesPerSeason);

    let mostSixes = [];
    let batsmanCount = 0;

    let all = [];
    for(let i = 0; i < sixesPerSeason.length; i++){
        if(!all.includes(sixesPerSeason[i].batsman)){
            all.push(sixesPerSeason[i].batsman);
        }
    }

    // console.log(all);

    let topMostBatsman = [];

    // for(let i = 0; i < sixesPerSeason.length - 1; i++){
    //     let season = sixesPerSeason[i].season;
    //     let nextSeason = sixesPerSeason[i+1].season;
    //     if(season === nextSeason){
    //         for(let j = 0; j < all.length; j++){
    //             if(sixesPerSeason[i].batsman === all[j]){

    //             }
    //         }
    //     }
    //     else{
    //         let sObj = {
    //             season : season,
    //             batsman : sixesPerSeason[i].batsman,
    //             sixes : sixesCount
    //         }
    //         topMostBatsman.push(sObj);
    //     }
    // }

    for(let i = 0; i < all.length; i++){
        for(let j = 0; j < sixesPerSeason.length - 1; j++){
            let season = sixesPerSeason[j].season;
            let nextSeason;
            // if(j === sixesPerSeason.length - 2){
            //     nextSeason = sixesPerSeason[j].season;
            // }
            if(season === '2016'){
                console.log('aa to rha h');
            }
            // else{
            //     nextSeason = sixesPerSeason[j+1].season;
            // }
            // if(season === nextSeason){
            //     if(all[i] === sixesPerSeason[j].batsman){
            //         batsmanCount++;
            //     }
            // }
            // else{
            //     let sObj = {
            //         season : season,
            //         batsman : sixesPerSeason[i].batsman,
            //         sixes : batsmanCount
            //     }
            //     topMostBatsman.push(sObj);
            //     batsmanCount = 0;
            // }
        }
    }
    console.log(topMostBatsman);
}

// mostSixesPerSeason();
