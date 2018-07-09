function getFiles(path) {
    let fileItems = [];
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            fileItems = JSON.parse(this.responseText);
        }
    };
    request.open("GET", path, false);
    request.send();
    return fileItems;
}

function plotGraph() {
    let gt = getFiles("/jsonFile/matchesPerYear.json");
    let chart = new Highcharts.chart("container", {
        chart: {
            type: "column"
        },
        title: {
            text: "IPL Matches Per Year"
        },
        xAxis: {
            type: "category",
            labels: {
                rotation: -45,
                style: {
                    fontSize: "13px",
                    fontFamily: "Verdana, sans-serif"
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: "Matches Per Year"
            }
        },
        legend: {
            enabled: false
        },
        series: [{

            data: gt,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: "#FFFFFF",
                align: "right",
                format: "{point.y:.1f}", // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: "13px",
                    fontFamily: "Verdana, sans-serif"
                }
            }
        }],

    });
}
plotGraph();
