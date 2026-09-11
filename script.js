const form = document.getElementById('formTask');
const input = document.getElementById('inputTask');
const list = document.getElementById('listTask');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let task = input.value;
    
    const newItem = document.createElement('li');
    const newContent = document.createTextNode(task);
    newItem.appendChild(newContent);
    list.appendChild(newItem);
})