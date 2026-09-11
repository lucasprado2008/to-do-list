const form = document.getElementById('formTask');
const input = document.getElementById('inputTask');
const list = document.getElementById('listTask');

let tasks = [];
let taskCount = 1;

form.addEventListener('submit', function(event) {
    // prevent the default action of the form submitting (refreshing the page)
    event.preventDefault();
    // creating new object to store the task data
    let obj = new Object();
    // creating a property for the task status
    obj.finished = false;
    // creating a property for the task
    obj.task = input.value;
    // creating a property for the task id
    obj.id = taskCount;
    // increasing the task count
    taskCount++;
    // adding the object to the tasks array
    tasks.push(obj);
    // creating new list item
    const newItem = document.createElement('li');
    // creating new text to connect with the list item
    const newContent = document.createTextNode(obj.task);
    // connecting list item with the text
    newItem.appendChild(newContent);
    // connecting list item with the ul list
    list.appendChild(newItem);
    
    //getting the last item of the tasks array and printing it for testing.
    console.log(tasks[tasks.length - 1]);
})