<!-- Example: Tracker.vue -->
<template>
    <div class="content">
  <div class="container">
    <div class="todo-app">
      <h2>Stay Organized With Our Task Manager</h2>

      <textarea
        id="input-box"
        v-model="inputBox"
        placeholder="Type in your to-do-list"
      ></textarea>

      <div class="btn-gap">
<input type="date"  class="task-date" v-model="taskDate" /> <!-- Calendar date picker -->
      <button @click="addTask">Add Task</button>
      </div>
    </div>
  </div>
  <ul ref="listContainer" id="task-column" class="task-display"></ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const inputBox = ref('');
const taskDate = ref(''); 
const listContainer = ref(null);

function addTask() {
  if (inputBox.value.trim() === '') {
    alert('You need to write a new task');
    return;
  }

  const li = document.createElement('li');
  li.textContent = inputBox.value;
  if (taskDate.value) {
    li.textContent += ` (Due: ${taskDate.value})`; // Append date to task
  }

  // Create delete button (X)
  const span = document.createElement('span');
  span.className = 'delete-btn';
  span.innerHTML = '\u00d7';
  span.onclick = function () {
    li.remove();
    saveData();
  };

  li.appendChild(span);
  listContainer.value.appendChild(li);
  inputBox.value = '';
  taskDate.value = '';
  saveData();
}

function saveData() {
  localStorage.setItem('taskData', listContainer.value.innerHTML);
}

function loadTasks() {
  listContainer.value.innerHTML = localStorage.getItem('taskData') || '';
  Array.from(listContainer.value.querySelectorAll('li span')).forEach((span) => {
    span.onclick = function () {
      span.parentElement.remove();
      saveData();
    };
  });
}

onMounted(() => {
  loadTasks();

  listContainer.value.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      saveData();
    }
  });
});
</script>

<style scoped>

 .content{
  
  background-color: #3c3744;
  
}


.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    
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



.todo-app h2{
    color:whitesmoke;
    font-size: 2rem;
    margin-bottom: 10px;
    margin-left: 20px;
    animation: text 10s linear infinite;
}

 @keyframes text {
    0% { color:#ffffff; }
    25% { color:red; }
    50% { color: blue;}
    75% { color: orange;}
    100% { color:green; }
}



.todo-app{
    background: #1c1c1c;
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  
}





button{
    height: 5vh;
    width: 20vh;
    background: orange;
    color:#fff;
    border-radius: 5px;
    border: none;
    padding: 5px;
}

button:hover{
    background:red;
    color: #fbfff1;
}





.link {
    background: #3c3744;
    color: #ddd;
    padding: 10px 20px;
    text-decoration: none;
    font-size: 1rem;
    border-radius: 10px;
    text-align: center;
}

.link:hover{
    background: #ddd;
    color: #3c3744;
}
#input-box{
  width: 600px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background:#1c1c1c;
  color: #fff;
  outline: none;
  border: none;
  box-shadow:inset 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 10px;
}

.task-display {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  color: #fff;
  background-color: #000;
}

#task-column p {
  text-align: left;
  font-size: 1rem;
  background: #1c1c1c;
  color: #fbfff1;
  padding: 20px;
  border-radius: 10px;
  white-space: normal;
  overflow-wrap: break-word;
  position: relative;
  min-height: 150px;
}
ul li {
  text-align: left;
  width: 50%;
  list-style: none;
  padding: 12px 40px 12px 40px;
  background: #3c3744;
  color: #fff;
  font-size: 20px;
  text-transform: capitalize;
  user-select: none;
  cursor: pointer;
  border-bottom: black;
  white-space: normal;
  overflow-wrap: break-word;
  position: relative;
  border-radius: 8px;
  margin: 5px 0;
}

/* When task is completed */
ul li.checked {
  color: #bbb;
  text-decoration: line-through;
}

/* Add checkmark on completed tasks */
ul li.checked::before {
  content: '✔';
  position: absolute;
  left: 10px;
  color: green;
  font-size: 20px;
}

/* Delete Button (X) */
ul li span.delete-btn {
  position: absolute;
  right: 10px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
}

ul li span.delete-btn:hover {
  color: red;
}



</style>
