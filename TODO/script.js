class Task {
  constructor(description) {
    this.description = description;
    this.startTime = new Date().toLocaleTimeString();
    this.completed = false;
    this.endTime = null;
  }
}

class ToDoList {
  constructor() {
    this.tasks = [];
  }

  addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDesc = taskInput.value.trim();
    if (taskDesc === "") {
      alert("Task cannot be empty!");
      return;
    }
    const task = new Task(taskDesc);
    this.tasks.unshift(task); // LIFO order (Last In, First Out)
    this.render();
    taskInput.value = "";
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.render();
  }

  markCompleted(index) {
    this.tasks[index].completed = true;
    this.tasks[index].endTime = new Date().toLocaleTimeString();
    this.render();
  }

  render() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    this.tasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";
      if (task.completed) taskDiv.classList.add("completed");

      taskDiv.innerHTML = `
                        <span>${task.description}</span>
                        <div>
                            <span class="time">Start: ${task.startTime}</span>
                            ${
                              task.completed
                                ? `<span class="time"> | End: ${task.endTime}</span>`
                                : ""
                            }
                            ${
                              !task.completed
                                ? `<button onclick="todoList.markCompleted(${index})">✔</button>`
                                : ""
                            }
                            <button class="delete-btn" onclick="todoList.removeTask(${index})">✖</button>
                        </div>
                    `;
      taskList.appendChild(taskDiv);
    });
  }
}

const todoList = new ToDoList();
