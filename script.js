const form = document.getElementById("formTask");
const input = document.getElementById("inputTask");
const list = document.getElementById("listTask");

let tasks = [];
let taskCount = 1;

// load saved tasks before rendering the list
loadState();
renderTasks();

form.addEventListener("submit", function (event) {
  // prevent refreshing the page (default of submit event)
  event.preventDefault();

  const inputValue = input.value.trim();

  if (inputValue === "") {
    window.alert("Please enter a task");
    resetInput();
    return;
  }

  createTaskData(inputValue);
  resetInput();
  renderTasks();
});

form.addEventListener('reset', function (event) {
  // prevent clearing the form (default of reset event)
  event.preventDefault();
  clearList();
});

function createTaskData(inputValue) {
  const obj = {
    // creating properties for the object
    finished: false,
    task: inputValue,
    id: taskCount,
  };

  taskCount++;
  tasks.push(obj);
  storeState();
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((element) => {
    const listItem = createTask(element);
    list.appendChild(listItem);
  });
}

function deleteTask(element) {
  const result = window.confirm("Are you sure you want to delete this task?");
  if (!result) {
    return;
  }

  const delIndex = tasks.findIndex(
    (elementAtual) => elementAtual.id === element.id,
  );
  tasks.splice(delIndex, 1);
  storeState();
  renderTasks();
}

function editTask(element) {
  let newTask = prompt("Edit task");

  if (newTask === null) {
    return;
  }

  newTask = newTask.trim();

  if(newTask === "") {
    alert("Task can't be empty! Please, try again");
    return;
  }

  element.task = newTask;
  storeState();
  renderTasks();
}

function clearList () {
  const result = window.confirm("Are you sure you want to clear the list?");
  if (!result) {
    return;
  }
  tasks = [];
  storeState();
  renderTasks();
}

function createTask(element) {
  const newItem = document.createElement("li");
  newItem.className = "task";

  const checkItem = document.createElement("input");
  checkItem.type = "checkbox";
  checkItem.checked = element.finished;
  checkItem.addEventListener("change", function () {
    element.finished = checkItem.checked;
    storeState();
  });


  const newContent = document.createElement('span');
  newContent.textContent = element.task;
  newContent.className = "taskText";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "🗑️";
  deleteButton.className = "buttonLi delete"
  deleteButton.ariaLabel = "Delete"
  deleteButton.addEventListener("click", function () {
    deleteTask(element);
  });

  const editButton = document.createElement("button");
  editButton.textContent = "📝";
  editButton.className = "buttonLi edit";
  editButton.ariaLabel = "Edit"
  editButton.addEventListener("click", function () {
    editTask(element);
  });

  newItem.appendChild(checkItem);
  newItem.appendChild(newContent);
  newItem.appendChild(editButton);
  newItem.appendChild(deleteButton);

  return newItem;
}

function loadState() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks === null) {
    tasks = [];
  }
  else {
    // parsing the stored JSON string into a JavaScript value
    tasks = JSON.parse(storedTasks);
    if(tasks.length === 0) {
      taskCount = 1;
      return;
    }
    // for each task in the tasks array, store its id in the ids array
    const ids = tasks.map((task) => task.id);
    // getting the maximum id, ... spread the array into individual values
    let maxId = Math.max(...ids);
    taskCount = maxId + 1;
  }
}

function storeState() {
  // converting the tasks array into a JSON string
  const stringJson = JSON.stringify(tasks);
  // key identifies the stored data, value is the data itself
  localStorage.setItem("tasks", stringJson);
}

function resetInput() {
  input.value = "";
  input.focus();
}