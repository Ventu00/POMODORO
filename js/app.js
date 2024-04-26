/* draggable element */
const item = document.querySelector('.item');

item.addEventListener('dragstart', dragStart);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}
// Agregar un nuevo elemento al hacer clic en el botón
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addItem);

function addItem() {
    // Creamos un nuevo elemento con la clase y atributos necesarios
    const newElement = document.createElement('div');
    newElement.classList.add('item');
    newElement.draggable = true;
    newElement.textContent = 'Nuevo Elemento';

    // Asignamos un ID único al nuevo elemento
    const newId = 'item' + (document.querySelectorAll('.item').length + 1);
    newElement.id = newId;

    // Agregamos el nuevo elemento al primer contenedor
    const firstBox = document.getElementById('box1');
    firstBox.appendChild(newElement);

    // Añadimos el controlador de eventos dragstart al nuevo elemento
    newElement.addEventListener('dragstart', dragStart);
}


/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
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

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');
}