const form = document.getElementById("formTask");
const input = document.getElementById("inputTask");
const list = document.getElementById("listTask");

let tasks = [];
let taskCount = 1;

loadState();
renderTasks();

form.addEventListener("submit", function (event) {
  // prevent the default action of the form submitting (refreshing the page)
  event.preventDefault();

  const inputValue = input.value;

  createTaskData(inputValue);

  // rendering the tasks on the page
  renderTasks();
});

function createTaskData(inputValue) {
  // CREATING OBJECT

  const obj = {
    // creating a property for the task status
    finished: false,
    // creating a property for the task
    task: inputValue,
    // creating a property for the task id
    id: taskCount,
  };

  // increasing the task count
  taskCount++;
  // adding the object to the tasks array
  tasks.push(obj);
  // storing data in local storage
  storeState();
}

function renderTasks() {
  // clearing the list before rendering the new tasks
  list.innerHTML = "";

  tasks.forEach((element) => {
    const listItem = createTask(element);
    // connecting list item with the ul list
    list.appendChild(listItem);
  });
}

function deleteTask(element) {
  // storing the index of the task to be deleted
  const delIndex = tasks.findIndex(
    (elementAtual) => elementAtual.id === element.id,
  );
  // deleting the one task from the array
  tasks.splice(delIndex, 1);
  // storing data in local storage
  storeState();
  // rendering the tasks again to update the list
  renderTasks();
}

function editTask(element) {
  // getting the new task from the user input
  const newTask = prompt("Edit task");
  // updating the task with the new one
  element.task = newTask;
  // storing data in local storage
  storeState();
  // rendering the tasks again to update the list
  renderTasks();
}

function createTask(element) {
  // CREATING LIST

  // creating new list item
  const newItem = document.createElement("li");
  newItem.className = "task";
  // creating new checkbox
  const checkItem = document.createElement("input");
  // setting the type of the input to checkbox
  checkItem.type = "checkbox";
  // setting the actual state of the checkbox to the task status
  checkItem.checked = element.finished;
  // creating event listener for the checkbox
  checkItem.addEventListener("change", function () {
    element.finished = checkItem.checked;
    // storing data in local storage
    storeState();
  });
  // creating new text to connect with the list item
  const newContent = document.createTextNode(element.task);
  // creating a button to delete tasks
  const deleteButton = document.createElement("button");
  // setting the text of the button to Delete
  deleteButton.textContent = "Delete";
  // adding a eventlistener to the delete button
  deleteButton.addEventListener("click", function () {
    deleteTask(element);
  });
  // creating a button to edit tasks
  const editButton = document.createElement("button");
  // setting the text of the button to Edit
  editButton.textContent = "Edit";
  // adding a eventlistener to the edit button
  editButton.addEventListener("click", function () {
    editTask(element);
  });
  // connecting list item with the checkbox
  newItem.appendChild(checkItem);
  // connecting list item with the text
  newItem.appendChild(newContent);
  // connecting list item with the edit button
  newItem.appendChild(editButton);
  // connecting list item with the delete button
  newItem.appendChild(deleteButton);

  return newItem;
}

function loadState() {
  console.log("Loading state...");

  const storedTasks = localStorage.getItem("tasks");
  console.log("Stored tasks:", storedTasks);

  if (storedTasks === null) {
    tasks = [];
    console.log("No saved tasks found.");
  } else {
    tasks = JSON.parse(storedTasks);
    console.log("Tasks loaded:", tasks);

    const ids = tasks.map((task) => task.id);
    console.log("Task IDs:", ids);

    let maxId = Math.max(...ids);
    console.log("Highest ID:", maxId);

    taskCount = maxId + 1;
    console.log("Next task ID:", taskCount);
  }
}

function storeState() {
  const stringJson = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringJson);
}
