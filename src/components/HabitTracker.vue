<template>
   <header class="site-header">
    <marquee behavior="scroll" direction="left" scrollamount="5">
      ⚠ Your data is stored locally in your browser. Clearing browser data or using a different browser/device will remove your saved progress.
    </marquee>
  </header>
 
  
  <div class="tracker">
     <button class="back-button" @click="$router.go(-1)">Back</button>
    <h2>Take Charge of Your Habit</h2>
    <div class="tracker-content">
      <p>Track your habits and stay motivated!</p>
    </div>

    <!-- Add Habit -->
    <input
      type="text"
      v-model="newHabit"
      ref="inputTracker"
      placeholder="Add a new habit..."
      @keyup.enter="addHabit"
    />
    <button @click="addHabit">Add Habit</button>

    <!-- Habit List -->
    <div class="habit-list" v-if="habitList.length > 0">
      <ul>
        <li v-for="(habit, index) in habitList" :key="index">
          <input
            type="checkbox"
            v-model="habit.completed"
            @change="saveHabits"
          />
          <span :class="{ completed: habit.completed }">{{ habit.name }}</span>
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
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const inputTracker = ref(null);
const habitList = ref([]); // List of habit objects { name: '', completed: false }
const newHabit = ref('');

// Add Habit
function addHabit() {
  if (newHabit.value.trim()) {
    habitList.value.push({ name: newHabit.value.trim(), completed: false });
    newHabit.value = ''; // Clear input
    saveHabits(); // Save to localStorage
    if (inputTracker.value) {
      inputTracker.value.focus(); // Focus back on input
    }
  }
}

// Remove Habit
function removeHabit(index) {
  habitList.value.splice(index, 1);
  saveHabits();
}

// Save Habits to Local Storage
function saveHabits() {
  localStorage.setItem('habitList', JSON.stringify(habitList.value));
}

// Load Habits from Local Storage
onMounted(() => {
  const storedHabits = localStorage.getItem('habitList');
  if (storedHabits) {
    habitList.value = JSON.parse(storedHabits);
  }
});

// Computed property for completed habits
const completedHabits = computed(() =>
  habitList.value.filter((habit) => habit.completed).length
);
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
.tracker {
  min-height: 100vh;
  background: #3c3774;
  color: #ffffff;
  padding: 40px;
  text-align: center;
  font-family: Arial, sans-serif;
}

input[type="text"] {
  padding: 8px;
  width: 40%;
  border-radius: 5px;
  border: none;
}

button {
  margin-left: 10px;
  padding: 8px 12px;
  background: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #e67e22;
}

.habit-list ul {
  list-style-type: none;
  padding: 0;
}

.habit-list li {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.habit-list span.completed {
  text-decoration: line-through;
  color: #aaa;
}

.habit-summary {
  margin-top: 20px;
}
</style>
