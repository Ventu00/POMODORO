// Variables globales para el estado de los colores
let green = false;
let violet = false;
let blue = false;

// Función para cambiar el color y manejar el estado de violet
function changeColor(color) {
    let colElements = document.querySelectorAll('.col');
    let barElement = document.querySelector('.bar');
    let modalbody = document.querySelector('.modal-body');
    modalbody.style.backgroundColor = color;

    colElements.forEach(function(element) {
        element.style.backgroundColor = color;
    });
    barElement.style.backgroundColor = color;

    if (color === '#97429ade') {
        violet = true;
        blue = false;

        violetCounterFunction(); // Llama a la función para mostrar y actualizar el contador violeta
    } else {
        violet = false;
    }
    if (color === '#48a9a9e5') {
      blue = true;
      violet = false;

      blueCounterFunction(); // Llama a la función para mostrar y actualizar el contador violeta
  } else {
    blue = false;
  }
}

// Función para el contador violeta
function violetCounterFunction() {
    if (violet) {
        const RestCounter = document.getElementById('RestCounter');
        RestCounter.style.display = 'block'; // Mostrar el contador violeta
        let violetTimeLeft = 300; // 5 minutos en segundos

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

        updateCounter(); // Iniciar el contador violeta
    }
}

function blueCounterFunction() {
  if (blue) {
      const RestCounter = document.getElementById('RestCounter');
      RestCounter.style.display = 'block'; // Mostrar el contador violeta
      let violetTimeLeft = 900; // 5 minutos en segundos

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

      updateCounter(); // Iniciar el contador violeta
  }
}

// Resto de tu código relacionado con el contador y el modal
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

// Llamada inicial para iniciar el contador violeta si violet es verdadero
violetCounterFunction();
blueCounterFunction();

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

  // Función para obtener la fecha actual en formato legible
function obtenerFechaActual() {
  var fecha = new Date();
  var opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
  var opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return 'Fecha: ' + fecha.toLocaleDateString('es-ES', opcionesFecha) + ' Hora: ' + fecha.toLocaleTimeString('es-ES', opcionesHora);
}


function generarElemento() {
  var taskInput = document.getElementById('taskInput').value;
  var taskCont = document.getElementById('taskCont').value;
  
  // Verificar si el campo de entrada está vacío
  if (taskInput.trim() === '') {
      alert('Por favor ingrese un título válido.');
      return;
  }
  
  // Crear un nuevo elemento para el item
  var item = document.createElement('div');
  item.className = 'item animate__animated animate__bounceIn';
  
  // Crear un elemento h2 para el título y asignarle el valor de taskInput
  var titleElement = document.createElement('h2');
  titleElement.textContent = taskInput;
  
  // Crear un elemento p para el contenido del párrafo y asignarle el valor de taskCont
  var paragraphElement = document.createElement('p');
  paragraphElement.textContent = taskCont;
  
  // Crear un nuevo elemento span para la fecha y asignarle el valor de la fecha actual
  var dateElement = document.createElement('span');
  dateElement.textContent = obtenerFechaActual();
  dateElement.className = 'date'; // Añadir la clase 'date' al elemento
  
  // Crear un botón para eliminar el elemento
  var deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete btn btn-danger btn-sm';
  deleteButton.textContent = 'Delete';
  // Agregar un manejador de evento para eliminar el elemento al hacer clic en el botón
  deleteButton.addEventListener('click', function() {
    // Mostrar una alerta para confirmar la eliminación
    var confirmar = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    
    // Verificar si el usuario hizo clic en "Aceptar" en la alerta
    if (confirmar) {
        item.remove(); // Eliminar el elemento 'item'
    }
});

  
  // Agregar los elementos al elemento 'item'
  item.appendChild(deleteButton); // Agregar el botón de eliminar
  item.appendChild(titleElement);
  item.appendChild(paragraphElement);
  item.appendChild(dateElement);
    //item.textContent = taskInput + " " + taskCont; // Asignar el valor del campo de entrada y el contenido del campo de texto como contenido del elemento

    item.draggable = true; // Permitir que el elemento sea arrastrable
    var itemId = 'item' + Date.now(); // Generar un ID único para el elemento
    item.id = itemId;
    item.addEventListener('dragstart', dragStart);

    // Obtener los contenedores de cada columna
    var contentPending = document.getElementById('contentPending');
    var contentProgress = document.getElementById('contentProgress');
    var contentCompleted = document.getElementById('contentCompleted');

    // Crear un placeholder vacío para cada columna
    var placeholderPending = document.createElement('div');
    placeholderPending.className = 'placeholder --start';
    placeholderPending.addEventListener('dragover', dragOver);
    placeholderPending.addEventListener('drop', drop);
    contentPending.appendChild(placeholderPending);

    var placeholderProgress = document.createElement('div');
    placeholderProgress.className = 'placeholder --progress';
    placeholderProgress.addEventListener('dragover', dragOver);
    placeholderProgress.addEventListener('drop', drop);
    contentProgress.appendChild(placeholderProgress);

    var placeholderCompleted = document.createElement('div');
    placeholderCompleted.className = 'placeholder --done';
    placeholderCompleted.addEventListener('dragover', dragOver);
    placeholderCompleted.addEventListener('drop', drop);
    contentCompleted.appendChild(placeholderCompleted);

    // Agregar el nuevo elemento al placeholder inicial
    placeholderPending.appendChild(item);

    // Limpiar el campo de entrada del formulario después de generar el elemento
    document.getElementById('taskInput').value = '';
    document.getElementById('taskCont').value = '';

  }

// Manipulador de evento para iniciar el arrastre
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
  var itemId = event.dataTransfer.getData('text/plain');
  var item = document.getElementById(itemId);
  var targetPlaceholder = event.target;

  if (targetPlaceholder.classList.contains('--done')) {
    
      // Cambiar el color de fondo y el color del texto del item
      item.style.backgroundColor = '#09ff00';
      item.style.color = 'black';

      // Crear un span para el emoji de check
      var checkEmoji = document.createElement('span');
      checkEmoji.textContent = '✅';
      checkEmoji.className = 'check-emoji';
      // Añadir el emoji de check al contenido existente del item
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
