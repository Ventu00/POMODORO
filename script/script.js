function changeColor(color) {
    let colElements = document.querySelectorAll('.col');
    let barElement = document.querySelector('.bar');
    let modalbody = document.querySelector('.modal-body');
    modalbody.style.backgroundColor = color;

    colElements.forEach(function(element) {
        element.style.backgroundColor = color;
    });
    barElement.style.backgroundColor = color;
}
var isPaused = true;
var counterElement = document.getElementById('counter');
var timeLeft = 0 * 60; // minutos a segundos
var textbtn = document.getElementById('start_btn');
var countdownTimeout; // Variable para almacenar el timeout

function counter() {
    if (!isPaused) {
        textbtn.innerText = "Pause";

        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = String(seconds).padStart(2, '0');
        counterElement.textContent = minutes + ":" + seconds;
        timeLeft--;

        if (timeLeft >= 0) {
            countdownTimeout = setTimeout(counter, 1000);
        } else {
            var miModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
            miModal.show();
            textbtn.innerText = "Restart";
        }
    }
}

function start() {
    if (isPaused) {
        isPaused = false;
        textbtn.innerText = "Pause";
        counter(); // Comienza la cuenta regresiva
    } else {
        isPaused = true;
        textbtn.innerText = "Resume";
        clearTimeout(countdownTimeout); // Pausa la cuenta regresiva
    }

    if (textbtn.innerText === "Restart") {
        timeLeft = 1 * 60; // 1 minuto a segundos
        isPaused = false;
        counter(); // Reiniciar el contador
    }
}

// Inicializar el contador
counter();
(function () {
    document.addEventListener('DOMContentLoaded', function () {
  
  
  
      const item = document.querySelector('.item')
  
      item.addEventListener('dragstart', function (event) {
        event.target.classList.add('--hold')
        // setTimeout(() => {
        //   event.target.classList.add('--hide')
        // }, 0)
      })
  
      item.addEventListener('dragend', (event) => {
        event.target.classList.remove('--hold')//, '--hide'
  
      })
  
  
  
      const placeholders = document.querySelectorAll('.placeholder')
  
      for (const placeholder of placeholders) {
        placeholder.addEventListener('dragover', dragover)
        placeholder.addEventListener('dragenter', dragenter)
        placeholder.addEventListener('dragleave', dragleave)
        placeholder.addEventListener('drop', drop)
      }
  
      function dragover(event) {
        event.preventDefault()
      }
      function dragenter(event) {
        event.target.classList.add('--entered')
      }
      function dragleave(event) {
        event.target.classList.remove('--entered')
      }
      function drop(event) {
        event.target.prepend(item)
        event.target.classList.remove('--entered')
      }
  
  
  
    })
  })()




  

  