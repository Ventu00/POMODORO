let green = false;
let violet = false;
let blue = false;

function changeColor(color) {
  let modalBodyElements = document.querySelectorAll('.modal-body');
  modalBodyElements.forEach(function(element) {
      element.style.backgroundColor = color;
  });

  let colElements = document.querySelectorAll('.col');
  let barElement = document.querySelector('.bar');


  colElements.forEach(function(element) {
      element.style.backgroundColor = color;
  });
  barElement.style.backgroundColor = color;

  if (color === '#97429ade') {
      violet = true;
      blue = false;
      violetCounterFunction(); 
  } else {
      violet = false;
  }
  if (color === '#48a9a9e5') {
      blue = true;
      violet = false;
      blueCounterFunction();
  } else {
      blue = false;
  }
}


function violetCounterFunction() {
    if (violet) {
        const RestCounter = document.getElementById('RestCounter');
        RestCounter.style.display = 'block'; 
        let violetTimeLeft = 300; 

        function updateCounter() {
            const minutes = Math.floor(violetTimeLeft / 60);
            let seconds = violetTimeLeft % 60;
            seconds = String(seconds).padStart(2, '0');
            RestCounter.textContent = minutes + ":" + seconds;
            violetTimeLeft--;

            if (violetTimeLeft >= 0) {
                setTimeout(updateCounter, 1000);
            }
        }

        updateCounter(); 
    }
}

function blueCounterFunction() {
  if (blue) {
      const RestCounter = document.getElementById('RestCounter');
      RestCounter.style.display = 'block'; 
      let violetTimeLeft = 900; 

      function updateCounter() {
          const minutes = Math.floor(violetTimeLeft / 60);
          let seconds = violetTimeLeft % 60;
          seconds = String(seconds).padStart(2, '0');
          RestCounter.textContent = minutes + ":" + seconds;
          violetTimeLeft--;

          if (violetTimeLeft >= 0) {
              setTimeout(updateCounter, 1000);
          }
      }

      updateCounter(); 
  }
}

let isPaused = true;
let counterElement = document.getElementById('counter');
let timeLeft = 25 * 60; 
let textbtn = document.getElementById('start_btn');
let countdownTimeout; 

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
            let miModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
            miModal.show();
            textbtn.innerText = "Restart";
        }
    }
}


violetCounterFunction();
blueCounterFunction();

function start() {
    if (isPaused) {
        isPaused = false;
        textbtn.innerText = "Pause";
        counter(); 
    } else {
        isPaused = true;
        textbtn.innerText = "Resume";
        clearTimeout(countdownTimeout); 
    }

    if (textbtn.innerText === "Restart") {
        timeLeft = 1 * 60; 
        isPaused = false;
        counter(); 
    }
}

counter();
(function () {
    document.addEventListener('DOMContentLoaded', function () {
  
  
  
      const item = document.querySelector('.item')
  
      item.addEventListener('dragstart', function (event) {
        event.target.classList.add('--hold')
       
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

  // Función para obtener la fecha actual en formato legible
function obtenerFechaActual() {
  let fecha = new Date();
  let opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
  let opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return 'Date: ' + fecha.toLocaleDateString('es-ES', opcionesFecha) + ' Hour: ' + fecha.toLocaleTimeString('es-ES', opcionesHora);
}


function generarElemento() {
  let taskInput = document.getElementById('taskInput').value;
  let taskCont = document.getElementById('taskCont').value;
  
  // Verificar si el campo de entrada está vacío
  if (taskInput.trim() === '') {
      alert('Please enter a valid title.');
      return;
  }
  
  let item = document.createElement('div');
  item.className = 'item animate__animated animate__bounceIn';
  
  let titleElement = document.createElement('h2');
  titleElement.textContent = taskInput;
  
  let paragraphElement = document.createElement('p');
  paragraphElement.textContent = taskCont;
  
  let dateElement = document.createElement('span');
  dateElement.textContent = obtenerFechaActual();
  dateElement.className = 'date';
  
  let deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete btn btn-danger btn-sm';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    let confirmar = confirm('Are you sure you want to delete this item?');
    
    if (confirmar) {
        item.remove(); 
    }
});

  
  item.appendChild(deleteButton); 
  item.appendChild(titleElement);
  item.appendChild(paragraphElement);
  item.appendChild(dateElement);
    //item.textContent = taskInput + " " + taskCont; // Asignar el valor del campo de entrada y el contenido del campo de texto como contenido del elemento

    item.draggable = true; // Permitir que el elemento sea arrastrable
    let itemId = 'item' + Date.now(); // Generar un ID único para el elemento
    item.id = itemId;
    item.addEventListener('dragstart', dragStart);

    let contentPending = document.getElementById('contentPending');
    let contentProgress = document.getElementById('contentProgress');
    let contentCompleted = document.getElementById('contentCompleted');

    // Crear un placeholder 
    let placeholderPending = document.createElement('div');
    placeholderPending.className = 'placeholder --start';
    placeholderPending.addEventListener('dragover', dragOver);
    placeholderPending.addEventListener('drop', drop);
    contentPending.appendChild(placeholderPending);

    let placeholderProgress = document.createElement('div');
    placeholderProgress.className = 'placeholder --progress';
    placeholderProgress.addEventListener('dragover', dragOver);
    placeholderProgress.addEventListener('drop', drop);
    contentProgress.appendChild(placeholderProgress);

    let placeholderCompleted = document.createElement('div');
    placeholderCompleted.className = 'placeholder --done';
    placeholderCompleted.addEventListener('dragover', dragOver);
    placeholderCompleted.addEventListener('drop', drop);
    contentCompleted.appendChild(placeholderCompleted);

    placeholderPending.appendChild(item);

    // Limpiar el campo de entrada del formulario después de generar el elemento
    document.getElementById('taskInput').value = '';
    document.getElementById('taskCont').value = '';

  }

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

// Manipulador de evento para permitir soltar elementos
function dragOver(event) {
    event.preventDefault();
}

// Manipulador de evento para soltar elementos en los placeholders
function drop(event) {
  event.preventDefault();
  let itemId = event.dataTransfer.getData('text/plain');
  let item = document.getElementById(itemId);
  let targetPlaceholder = event.target;

  if (targetPlaceholder.classList.contains('--done')) {
    
      item.style.backgroundColor = '#09ff00';
      item.style.color = 'black';

      let checkEmoji = document.createElement('span');
      checkEmoji.textContent = '✅';
      checkEmoji.className = 'check-emoji';
      item.appendChild(checkEmoji);
  }

  targetPlaceholder.appendChild(item);
}



document.addEventListener('DOMContentLoaded', function() {
  const blockLayer = document.querySelector('.blocklayer');

  blockLayer.addEventListener('dragstart', function(event) {
      event.preventDefault(); // Detiene la acción predeterminada del evento de arrastre
      event.stopPropagation(); // Detiene la propagación del evento de arrastre
  });
});
