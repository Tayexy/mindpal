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
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.task-date {
  font-size: 0.9rem;
  color: #bbb;
  margin-left: 10px;
  background-color: green;
  border: none;
  padding: 5px;
  border-radius: 5px;
}

.btn-gap {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.todo-app h2 {
  color: whitesmoke;
  font-size: 2rem;
  margin-bottom: 10px;
  margin-left: 20px;
  animation: text 10s linear infinite;
}

@keyframes text {
  0% {
    color: #ffffff;
  }
  25% {
    color: red;
  }
  50% {
    color: blue;
  }
  75% {
    color: orange;
  }
  100% {
    color: green;
  }
}

.todo-app {
  background: #1c1c1c;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

button {
  height: 5vh;
  width: 20vh;
  background: orange;
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
}

button:hover {
  background: red;
  color: #fbfff1;
}

#input-box {
  width: 100%;
  max-width: 600px;
  min-width: 200px;
  height: 150px;
  background: #1c1c1c;
  color: #fff;
  outline: none;
  border: none;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-sizing: border-box;
  resize: vertical;
}

.task-display {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  color: #fff;
  background-color: #000;
  box-sizing: border-box;
}

ul li {
  text-align: left;
  list-style: none;
  padding: 12px 10px;
  background: #3c3744;
  color: #fff;
  font-size: 20px;
  text-transform: capitalize;
  user-select: none;
  position: relative;
  border-radius: 8px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  word-break: break-word;
  max-width: 100%;
}

/* When task is completed */
ul li.checked span {
  color: #bbb;
  text-decoration: line-through;
}

/* Edit Button */
.edit-btn {
  background: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn:hover {
  background: darkblue;
}

/* Delete Button */
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

/* Edit input */
.edit-input {
  width: 100%;
  background: #1c1c1c;
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 5px;
  outline: none;
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
  #input-box {
    max-width: 100vw;
    min-width: 0;
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
    padding: 5px;
    font-size: 0.95rem;
  }
  .todo-app h2{
    font-size: 1.5rem;
  }
  ul li {
    padding: 8px 2px;
    font-size: 0.95rem;
  }
  #input-box {
    height: 100px;
    font-size: 0.95rem;
  }
  .btn-gap {
    flex-direction: column;
    align-items: center;
    justify-content: center;;
    gap: 8px;
  }
  .date-label {
    display: block;
    margin-bottom: 2px;
    margin-right: 0;
  }
  .task-date,
  .btn-gap button {
    width: 100%;
  }
}
</style>
