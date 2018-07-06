function getFiles(path) {
    let fileItems = [];
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            fileItems = JSON.parse(this.responseText);
        }
    };
    request.open('GET', path, false);
    request.send();
    return fileItems;
}

function plotGraph() {
    let gt=getFiles('/jsonFile/matchesPerYear.json'); 
    let chart = Highcharts.chart('container', {
        chart: {
            type: 'column'
        },

        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Matches Per Year'
            }
        },
        legend: {
            enabled: false
        },
        series: [{

            data: gt
        }]
    });
}
plotGraph();