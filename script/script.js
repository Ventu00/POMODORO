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
var timeLeft =  0 * 60; // minutos a segundos
var textbtn = document.getElementById('start_btn');
var countdownInterval; // Variable para almacenar el intervalo

function counter() {
    countdownInterval = setInterval(() => {
        if (!isPaused) {
            textbtn.innerText = "Pause";

            const minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            seconds = String(seconds).padStart(2, '0');
            counterElement.textContent = minutes + ":" + seconds;
            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(countdownInterval);
                var miModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
                miModal.show();
                textbtn.innerText = "Restart";
            }
        }
    }, 1000);
}

function start() {
    if (isPaused) {
        isPaused = false;
        textbtn.innerText = "Pause";
    } else {
        isPaused = true;
        textbtn.innerText = "Resume";
    }

    if (textbtn.innerText === "Restart") {
        
        timeLeft = 0 * 60; // 25 minutos a segundos
        isPaused = false;
        counter(); // Reiniciar el contador
    }
}

// Inicializar el contador
counter();

