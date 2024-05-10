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

          if (violetTimeLeft < 0) {
              clearInterval(violetInterval); // Stop the interval when time runs out
          }
      }

      const violetInterval = setInterval(updateCounter, 1000); // Run updateCounter every second
  }
}


function blueCounterFunction() {
if (blue) {
    const RestCounter = document.getElementById('RestCounter');
    RestCounter.style.display = 'block'; 
    let blueTimeLeft = 900; 

    function updateCounter() {
        const minutes = Math.floor(blueTimeLeft / 60);
        let seconds = blueTimeLeft % 60;
        seconds = String(seconds).padStart(2, '0');
        RestCounter.textContent = minutes + ":" + seconds;
        blueTimeLeft--;

        if (blueTimeLeft < 0) {
            clearInterval(blueInterval); // Stop the interval when time runs out
        }
    }

    const blueInterval = setInterval(updateCounter, 1000); // Run updateCounter every second
}
}

let isPaused = true;
let counterElement = document.getElementById('counter');
let timeLeft =25 * 60; 
let textbtn = document.getElementById('start_btn');
let countdownInterval; 

function counter() {
  if (!isPaused) {
      textbtn.innerText = "Pause";

      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      seconds = String(seconds).padStart(2, '0');
      counterElement.textContent = minutes + ":" + seconds;
      timeLeft--;

      if (timeLeft < 0) {
          clearInterval(countdownInterval); // Stop the interval when time runs out
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
      countdownInterval = setInterval(counter, 1000); // Start the countdown interval
  } else {
      isPaused = true;
      textbtn.innerText = "Resume";
      clearInterval(countdownInterval); // Pause the countdown interval
  }

  if (textbtn.innerText === "Restart") {
      timeLeft = 1 * 60; 
      isPaused = false;
      counter(); 
  }
}

counter();



  // Función para obtener la fecha actual en formato legible
  function obtenerFechaActual() {
    let fecha = new Date();
    let opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    let opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return 'Date: ' + fecha.toLocaleDateString('es-ES', opcionesFecha) + ' Hour: ' + fecha.toLocaleTimeString('es-ES', opcionesHora);
  }
  
  // Agregar un nuevo elemento al hacer clic en el botón
  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', addItem);
  
  function addItem() {
    // Obtener los valores del formulario
    const taskName = document.getElementById('taskName').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    // Crear un nuevo elemento con los detalles proporcionados
    const newElement = document.createElement('div');
    newElement.classList.add('item');
    newElement.draggable = true;

    // Contenido del nuevo elemento (incluyendo el botón de eliminar)
    newElement.innerHTML = `
        <p>Tarea: ${taskName}</p>
        <p>Descripción: ${description}</p>
        <p>Categoría: ${category}</p>
        <p>${obtenerFechaActual()}</p>
        <button class="deleteButton">Eliminar</button>
    `;

    // Asignar un ID único al nuevo elemento
    const newId = 'item' + (document.querySelectorAll('.item').length + 1);
    newElement.id = newId;

    // Agregar el nuevo elemento al primer contenedor
    const firstBox = document.getElementById('box1');
    firstBox.appendChild(newElement);

    // Añadir el controlador de eventos dragstart al nuevo elemento
    newElement.addEventListener('dragstart', dragStart);

    // Agregar el controlador de eventos clic al botón de eliminar
    const deleteButton = newElement.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
        // Mostrar un alerta y eliminar el elemento si se confirma
        if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
            newElement.remove();
        }
    });
}

  

// Función para el evento dragstart
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}


/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');

    // Verificar si el contenedor es el boxcompleted
    if (e.target.id === 'boxcompleted') {
        e.dataTransfer.dropEffect = 'move'; // Cambiar el efecto de drop solo si es en boxcompleted
    } else {
        e.dataTransfer.dropEffect = 'copy'; // Permitir la copia (efecto predeterminado) en otros contenedores
    }
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    // Verificar si el contenedor es el boxcompleted
    if (e.target.id === 'boxcompleted') {
        // Obtener el ID del elemento arrastrado
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);

        // Agregar el elemento al contenedor boxcompleted
        e.target.appendChild(draggable);

        // Deshabilitar la capacidad de arrastre del elemento
        draggable.removeAttribute('draggable');

        // Evitar que el elemento se pueda arrastrar fuera del contenedor boxcompleted
        draggable.removeEventListener('dragstart', dragStart);

        // Añadir clase al contenedor boxcompleted para indicar que un elemento ha sido soltado en él
        e.target.classList.add('dropped-in-boxcompleted');
    } else {
        // get the draggable element
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);

        // add it to the drop target
        e.target.appendChild(draggable);

        // display the draggable element
        draggable.classList.remove('hide');
    }
}


