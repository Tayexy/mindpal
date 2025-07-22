<template>
   <header class="site-header">
    <marquee behavior="scroll" direction="left" scrollamount="5">
      ⚠ Your data is stored locally in your browser. Clearing browser data or using a different browser/device will remove your saved progress.
    </marquee>
  </header>
  <div class="content">
     <button class="back-button" @click="$router.go(-1)">Back</button>
    <div class="container">
      <div class="todo-app">
        <h2>Stay Organized With Our Task Manager</h2>

        <textarea
          id="input-box"
          v-model="inputBox"
          placeholder="Type in your to-do list"
        ></textarea>

        <div class="btn-gap">
          <label for="taskDate">Select Date & Time:</label>
          <input type="datetime-local" class="task-date" v-model="taskDate" />
          <button @click="addTask">Add Task</button>
        </div>
      </div>
    </div>

    <ul id="task-column" class="task-display">
      <li v-for="(task, index) in tasks" :key="index" :class="{ checked: task.completed }">
        <input
          type="checkbox"
          v-model="task.completed"
          @change="saveData"
        />
        <span v-if="!task.editing" @dblclick="editTask(index)">
          {{ task.text }} <small v-if="task.date">(Due: {{ task.date }})</small>
        </span>
        <input
          v-else
          type="text"
          v-model="task.text"
          @keyup.enter="finishEdit(index)"
          @blur="finishEdit(index)"
          class="edit-input"
        />
        <button class="edit-btn" @click="editTask(index)" v-if="!task.editing">Edit</button>
        <button class="delete-btn" @click="removeTask(index)">✖</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const inputBox = ref('');
const taskDate = ref('');
const tasks = ref([]);

// Add a new task
function addTask() {
  if (inputBox.value.trim() === '') {
    alert('You need to write a new task');
    return;
  }

  tasks.value.push({
    text: inputBox.value.trim(),
    date: taskDate.value,
    completed: false,
    editing: false
  });

  inputBox.value = '';
  taskDate.value = '';
  saveData();
}

// Save tasks to localStorage
function saveData() {
  localStorage.setItem('taskData', JSON.stringify(tasks.value));
}

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('taskData')) || [];
  tasks.value = storedTasks;
}

// Remove a task
function removeTask(index) {
  tasks.value.splice(index, 1);
  saveData();
}

// Edit a task
function editTask(index) {
  tasks.value[index].editing = true;
}

// Finish editing a task
function finishEdit(index) {
  tasks.value[index].editing = false;
  saveData();
}

onMounted(() => {
  loadTasks();
});
</script>

<style scoped>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Prevent horizontal scroll */
  background-color: #3c3744;
  font-family: Arial, sans-serif;
}

.site-header {
  background-color: #000000;
  color: #fff;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.content {
  background-color: #3c3744;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.todo-app {
  background: #1c1c1c;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}

.todo-app h2 {
  color: whitesmoke;
  font-size: 2rem;
  margin-bottom: 10px;
  animation: text 10s linear infinite;
}

@keyframes text {
  0% { color: #ffffff; }
  25% { color: red; }
  50% { color: blue; }
  75% { color: orange; }
  100% { color: green; }
}

textarea#input-box {
  width: 100%;
  height: 150px;
  background: #1c1c1c;
  color: #fff;
  outline: none;
  border: none;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-sizing: border-box;
  resize: vertical;
  font-size: 1rem;
  margin-bottom: 10px;
}

.btn-gap {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

button {
  height: 40px;
  background: orange;
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 0 15px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: red;
  color: #fbfff1;
}

/* Dark theme date input */
.task-date {
  font-size: 0.95rem;
  color: #fff;
  background-color: #222;
  border: 1px solid #444;
  padding: 8px;
  border-radius: 5px;
  outline: none;
  width: 100%;
  max-width: 250px;
  transition: border-color 0.3s ease;
}

.task-date:focus {
  border-color: orange;
}

.task-date::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

.task-display {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  color: #fff;
  background-color: #000;
  box-sizing: border-box;
  width: 100%;
}

ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 10px;
  background: #3c3744;
  border-radius: 8px;
  word-break: break-word;
  width: 100%;
  box-sizing: border-box;
}

ul li span {
  flex: 1; /* Allow task text to fill remaining space */
}

.edit-input {
  flex: 1; /* Make input take the available space */
  background: #1c1c1c;
  color: #fff;
  border: 1px solid #444;
  padding: 5px 8px;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  font-size: 1rem;
}

.edit-btn:hover {
  background: darkblue;
}

.delete-btn {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  background: darkred;
}

.edit-input {
  width: 100%;
  background: #1c1c1c;
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 5px;
  outline: none;
}
label {
  color: white;
  font-size: 0.9rem;
  margin-bottom: 4px;
  display: block;
}


/* Responsive styles */
@media (max-width: 1024px) {
  .task-display {
    grid-template-columns: repeat(2, 1fr);
  }
  .container {
    padding: 10px;
  }
}

@media (max-width: 700px) {
  .task-display {
    grid-template-columns: 1fr;
    padding: 10px;
    gap: 15px;
  }
  .container {
    padding: 5px;
  }
  textarea#input-box {
    height: 120px;
    font-size: 1rem;
  }
  ul li {
    font-size: 1rem;
    padding: 10px 5px;
  }
}

@media (max-width: 500px) {
  .container {
    padding: 2px;
  }
  .todo-app {
    padding: 10px;
    font-size: 0.95rem;
  }
  .todo-app h2 {
    font-size: 1.5rem;
  }
  ul li {
    padding: 8px 2px;
    font-size: 0.95rem;
  }
  textarea#input-box {
    height: 100px;
    font-size: 0.95rem;
  }
  .btn-gap {
    flex-direction: column;
    gap: 8px;
  }
  .task-date,
  .btn-gap button {
    width: 100%;
    max-width: none;
  }
}

</style>
