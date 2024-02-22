function changeColor(color) {
    let colElements = document.querySelectorAll('.col');
    let barElement = document.querySelector('.bar');
  
    colElements.forEach(function(element) {
        element.style.backgroundColor = color;
    });
    barElement.style.backgroundColor = color;
}
var isPaused = true;
var counterElement = document.getElementById('counter');
var timeLeft =  25 *  60; // minutos a segundos
let textbtn = document.getElementById('start_btn');

function counter() {

    const countdownInterval = setInterval(() => {
        if (!isPaused) {
            textbtn.innerText = "Pause";

            const minutes = Math.floor(timeLeft /  60);
            let seconds = timeLeft %  60;
            seconds = String(seconds).padStart(2, '0');
            counterElement.textContent = minutes + ":" + seconds;
            timeLeft--;

            if (timeLeft <=  0) {
                clearInterval(countdownInterval);
                counterElement.textContent = 'Tiempo terminado';
            }
        }
    },  1000);
}

function start() {

    if (isPaused) {
        isPaused = false;
        textbtn.innerText = "Pause";
    } else {
        isPaused = true;
        textbtn.innerText = "Resume";
    }
}

// Inicializar el contador
counter();
