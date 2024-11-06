import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="app">
    <h1>Todo List</h1>
    <input id="new-task" type="text" placeholder="New task" />
    <button id="add-task">Add Task</button>
    <ul id="task-list"></ul>
  </div>
`;

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

let tasks: Task[] = [];
let taskIdCounter = 1;

const taskInput = document.getElementById('new-task') as HTMLInputElement;
const addButton = document.getElementById('add-task') as HTMLButtonElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.className = task.completed ? 'completed' : '';

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => deleteTask(task.id);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
    toggleButton.className = 'complete-btn';
    toggleButton.onclick = () => toggleTaskCompletion(task.id);

    taskItem.append(taskText, toggleButton, deleteButton);
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTask: Task = {
      id: taskIdCounter++,
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
  }
}

function deleteTask(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function toggleTaskCompletion(id: number) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

renderTasks();
