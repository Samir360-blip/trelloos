const addBtn = document.getElementById("add_btn");
const overlay = document.getElementById("overlay");
const overlayColumn = document.getElementById("overlay_column");
const closeDialog = document.querySelector(".close_dialog");
const closeDialogs = document.querySelector(".close_dialogs");
const taskForm = document.getElementById("task-form");
const taskColumnForm = document.querySelector("form[name='column-task']");
const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");


addBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
});

closeDialog.addEventListener("click", () => {
  overlay.style.display = "none";
});

closeDialogs.addEventListener("click", () => {
  overlayColumn.style.display = "none";
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskTitleInput.value;
  const description = taskDescriptionInput.value;

  if (title && description) {
    createTask(title, description);
    taskForm.reset();
    overlay.style.display = "none";
  } else {
    alert("Please fill in all fields");
  }
});


taskColumnForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskTitleInput.value;

  if (title) {
    createColumnTask(title);
    taskColumnForm.reset();
    overlayColumn.style.display = "none";
  } else {
    alert("Please enter a task title");
  }
});


function createTask(title, description) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task");
  const taskTitle = document.createElement("h3");
  taskTitle.textContent = title;
  const taskDescription = document.createElement("p");
  taskDescription.textContent = description;
  taskContainer.appendChild(taskTitle);
  taskContainer.appendChild(taskDescription);
  document.querySelector(".desk_cont").appendChild(taskContainer);
}


function createColumnTask(title) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task");
  const taskTitle = document.createElement("h3");
  taskTitle.textContent = title;
  taskContainer.appendChild(taskTitle);
  console.log("Column Task Created:", title);
}
