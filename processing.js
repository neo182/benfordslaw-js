window.onload = () => {
    document.getElementById("btnAnalyse").disabled = true;
}

const imageInput = document.getElementById('imageInput')
imageInput.onchange = function (e) {
  if (e.target.files && e.target.files.item(0)) {
    srcImage.src = URL.createObjectURL(e.target.files[0])
  }
}

const imageCanvas = document.getElementById('imageCanvas')
const ctx = imageCanvas.getContext('2d')
const srcImage = new Image

srcImage.onload = function () {
  var aspectRatio = 0.50;
  imageCanvas.width = srcImage.width * aspectRatio
  imageCanvas.height = srcImage.height * aspectRatio
  ctx.drawImage(srcImage, 0, 0, srcImage.width * aspectRatio, srcImage.height * aspectRatio)
  
  document.getElementById("btnAnalyse").disabled = false;
}

function analyseImage() {
    var imageData = ctx.getImageData(0, 0, srcImage.width, srcImage.height)
    var pix = imageData.data;
    console.log("Size of pixel : " + pix.length)

    var digitOccArray = new Array(10).fill(0);
    for (var i = 0; i < pix.length; i += 4) {    
        var red   = pix[i];
        var green = pix[i + 1];
        var blue  = pix[i + 2];
        var alpha = pix[i + 3];

        var rgba = (red << 24) + (green << 16) + (blue << 8) + (alpha);
        var firstDigit = rgba.toString().substr(0, 1)
        
        digitOccArray[firstDigit] = digitOccArray[firstDigit] + 1;
    }

    //removing the first element of array ie digitOccArray[0] which is useless
    digitOccArray.splice(0,1)
    var counterTotalSize = digitOccArray.reduce((a, b) => a + b, 0)
    
    var index = 1;
    digitOccArray
        .forEach(digitCount => console.log("Digit : " + (index++) + ", Percentage : " + (digitCount.toFixed(4)/counterTotalSize.toFixed(4)) * 100));
    
    plotChart(digitOccArray)
}

function plotChart(data) {
    var ctx = document.getElementById('chartCanvas');
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
