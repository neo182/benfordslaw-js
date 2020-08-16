function analyzeDistrubtion() {
    var min = document.getElementById("minValue").value;
    var max = document.getElementById("maxValue").value;

    var digitCount = new Array(10).fill(0);
    for (var i = min; i <= max; i++) {
        var firstDigit = getRandomArbitrary(min, max).toString().substr(0, 1);
        digitCount[firstDigit] = digitCount[firstDigit] + 1;
    }

    digitCount.splice(0,1);
    plotChart(digitCount);
    var count = 1;
    digitCount.filter(i => i > 0)
        .forEach(i => console.log("Digit : " + (count++) + " Count : " + i));
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function plotChart(data) {
    var ctx = document.getElementById('distributionChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['# of 1', '# of 2', '# of 3', '# of 4', '# of 5', '# of 6', '# of 7', '# of 8', '# of 9'],
            datasets: [{
                label: '# of first digit occurances',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            aintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
