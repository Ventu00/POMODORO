let green = false;
let violet = false;
let blue = false;

let isPaused = true;
let counterElement = document.getElementById('counter');
let timeLeft = 0.5 * 60; 
let textbtn = document.getElementById('start_btn');
let countdownInterval; 
violetCounterFunction();
blueCounterFunction();
counter();




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

      const violetInterval = setInterval(updateCounter, 1000); 
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
            clearInterval(blueInterval); 
        }
    }

    const blueInterval = setInterval(updateCounter, 1000); 
}
}




function counter() {
  if (!isPaused) {
      textbtn.innerText = "Pause";

      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      seconds = String(seconds).padStart(2, '0');
      counterElement.textContent = minutes + ":" + seconds;
      timeLeft--;

      if (timeLeft < 0) {
          clearInterval(countdownInterval); 
          let miModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
          miModal.show();
          textbtn.innerText = "Restart";
      }
  }
}




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




  function obtenerFechaActual() {
    let fecha = new Date();
    let opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    let opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return 'Date: ' + fecha.toLocaleDateString('es-ES', opcionesFecha) + ' Hour: ' + fecha.toLocaleTimeString('es-ES', opcionesHora);
  }
  
  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', addItem);
  
  function addItem() {
    const taskName = document.getElementById('taskName').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const newElement = document.createElement('div');
    newElement.classList.add('item');
    newElement.draggable = true;

    newElement.innerHTML = `
        <p>Tarea: ${taskName}</p>
        <p>Descripción: ${description}</p>
        <p>Categoría: ${category}</p>
        <p>${obtenerFechaActual()}</p>
        <button class="deleteButton">Eliminar</button>
    `;

    // AsignaMOS EL ID 
    const newId = 'item' + (document.querySelectorAll('.item').length + 1);
    newElement.id = newId;

    // Agregamos eL elemento al primer contenedor
    const firstBox = document.getElementById('box1');
    firstBox.appendChild(newElement);

    // Añadimos el controlador de eventos dragstart
    newElement.addEventListener('dragstart', dragStart);

    const deleteButton = newElement.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
        if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
            newElement.remove();
        }
    });
}

  

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}


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
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    if (e.target.id === 'boxcompleted') {

        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);

        // Agregar el elemento al contenedor boxcompleted
        e.target.appendChild(draggable);

        // Deshabilitar la capacidad de arrastre del elemento
        draggable.removeAttribute('draggable');
        draggable.removeEventListener('dragstart', dragStart);

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


