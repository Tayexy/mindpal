<template>
  <header class="site-header">
    <marquee behavior="scroll" direction="left" scrollamount="5">
      ⚠ Your data is stored locally. Clearing browser data will remove progress.
    </marquee>
  </header>
<div class="tracker-container">
  

    <!-- Back Button -->
  <button class="back-button" @click="$router.go(-1)">Back</button>

  <div class="tracker">
    <h2>Take Charge of Your Habit</h2>
    

    <!-- Add Habit Form -->
    <div class="form-group">
      <input
        type="text"
        v-model="newHabit"
        ref="inputTracker"
        placeholder="Add a new habit..."
        @keyup.enter="addHabit"
      />
      <input type="datetime-local" v-model="taskDate" />
      <button @click="addHabit">Add Habit</button>
    </div>

    <!-- Habit List -->
    <div class="habit-list" v-if="habitList.length > 0">
      <ul>
        <li
          v-for="(habit, index) in habitList"
          :key="index"
          :class="{
            expired: isExpired(habit),
            completed: habit.completed,
            successful: isSuccessful(habit)
          }"
        >
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="habit.completed"
              @change="saveHabits"
            />
            checkbox
          </label>
          <span>
            {{ habit.name }}
            <span v-if="isSuccessful(habit)">🏆</span>
            <span v-if="isExpired(habit)">⏰ Timeout</span>
          </span>
          <small>Due: {{ formatDate(habit.date) }}</small>
          <button @click="removeHabit(index)">Remove</button>
        </li>
      </ul>
    </div>
    <p v-else>No habits added yet.</p>

    <!-- Summary -->
    <div class="habit-summary">
      <h3>Your Habits Summary</h3>
      <p>Total Habits: {{ habitList.length }}</p>
      <p>Completed: {{ completedHabits }}</p>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const inputTracker = ref(null);
const habitList = ref([]);
const newHabit = ref('');
const taskDate = ref('');

function addHabit() {
  if (newHabit.value.trim() && taskDate.value) {
    habitList.value.push({
      name: newHabit.value.trim(),
      completed: false,
      date: taskDate.value
    });
    newHabit.value = '';
    taskDate.value = '';
    saveHabits();
    if (inputTracker.value) inputTracker.value.focus();
  }
}

function removeHabit(index) {
  habitList.value.splice(index, 1);
  saveHabits();
}

function saveHabits() {
  localStorage.setItem('habitList', JSON.stringify(habitList.value));
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString();
}

function isExpired(habit) {
  return !habit.completed && new Date() > new Date(habit.date);
}

function isSuccessful(habit) {
  return habit.completed && new Date(habit.date) >= new Date();
}

onMounted(() => {
  const storedHabits = localStorage.getItem('habitList');
  if (storedHabits) {
    habitList.value = JSON.parse(storedHabits);
  }
});

const completedHabits = computed(() =>
  habitList.value.filter((habit) => habit.completed).length
);
</script>

<style scoped>
.site-header {
  background: #000;
  color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.back-button {
  background: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 1em;
  cursor: pointer;
  margin: 15px 20px;
}
.tracker-container {
  background: #1c1c1c;
  min-width: none;
}

.tracker {
  padding: 20px;
  color: #fff;
  font-family: sans-serif;
  box-sizing: border-box;
}

.tracker h2 {
  text-align: center;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

input[type="text"],
input[type="datetime-local"] {
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 1em;
  min-width: 250px;
  height: 20px;
}

button {
  padding: 10px 15px;
  background: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex-shrink: 0;
}

button:hover {
  background: #e67e22;
}

.habit-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.habit-list li {
  background: #000;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: background 0.3s;
}

.habit-list li.expired {
  background: #ff4e4e;
  color: #fff;
}

.habit-list li.successful {
  background: #2ecc71;
  color: #fff;
}

.habit-list span.completed {
  text-decoration: line-through;
}

.checkbox-label {
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.habit-summary {
  margin-top: 20px;
  background: #161616;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

@media (max-width: 600px) {
  .form-group {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  
  button {
    width: 100%;
    font-size: 0.9em;
    padding: 6px;
    height: 36px; /* Match input height */
  }

  .back-button {
    margin: 8px;
    width: calc(100% - 16px);
    padding: 6px;
    font-size: 0.9em;
  }
}


</style>
