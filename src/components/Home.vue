<template>
  <header class="site-header">
    <marquee behavior="scroll" direction="left" scrollamount="5">
      Your all-in-one companion designed to streamline your day to day activities
    </marquee>
  </header>
  <section class="content">
    <h1 class="info-title">WELCOME TO MINDPAL</h1>

    <!-- Quote Slider -->
    <div class="quote-slider">
      <transition name="fade-slide" mode="out-in">
        <p class="quote-text" :key="currentIndex">
          "{{ currentQuote.q }}" - {{ currentQuote.a }}
        </p>
      </transition>
    </div>

    <div class="info-section">
      <div class="box-container">
        <router-link to="/habit-tracker" class="box green">
          <h3>Habit Tracker</h3>
          <p>Keep track of your daily routines, monitor your progress, and stay motivated</p>
        </router-link>

        <router-link to="/aiassistant" class="box blue">
          <h3>AI Assistant</h3>
          <p>Enhance your productivity with AI-driven tools and insights.</p>
        </router-link>

        <router-link to="/journal" class="box red">
          <h3>Journaling</h3>
          <p>Reflect on your day and express your thoughts.</p>
        </router-link>

        <router-link to="/todo" class="box orange">
          <h3>Todo List</h3>
          <p>Organize your tasks and stay on top of your to-do list.</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      quotes: [
  { q: "Stay positive and keep moving forward!", a: "Roy T. Bennett" },
  { q: "You are stronger than you think.", a: "A.A. Milne" },
  { q: "Each day is a fresh start.", a: "Oprah Winfrey" },
  { q: "Discipline is the bridge between goals and accomplishment.", a: "Jim Rohn" },
  { q: "Small daily improvements lead to stunning results.", a: "Robin Sharma" },
  { q: "Do what you can, with what you have, where you are.", a: "Theodore Roosevelt" },
  { q: "Success is the sum of small efforts repeated daily.", a: "Robert Collier" },
  { q: "Happiness depends upon ourselves.", a: "Aristotle" },
  { q: "Dream big. Start small. Act now.", a: "Robin Sharma" },
  { q: "Don’t let yesterday take up too much of today.", a: "Will Rogers" },
  { q: "Your limitation—it's only your imagination.", a: "Tony Robbins" },
  { q: "Turn your wounds into wisdom.", a: "Oprah Winfrey" },
  { q: "Success is not final, failure is not fatal: it is the courage to continue that counts.", a: "Winston Churchill" },
  { q: "Hustle beats talent when talent doesn’t hustle.", a: "Ross Simmonds" },
  { q: "Act as if what you do makes a difference. It does.", a: "William James" }
],

      currentIndex: 0,
    };
  },
  computed: {
    currentQuote() {
      return this.quotes[this.currentIndex];
    },
  },
  mounted() {
    this.startSlider();
  },
  methods: {
    startSlider() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.quotes.length;
      }, 5000); // Rotate every 5 seconds
    },
  },
};
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
  background: #0e0e0e;
  min-height: 100vh;
  width: 100%; /* changed from 100vw to 100% */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
}

.info-title {
  text-align: center;
  color: white;
  font-size: 2rem;
  margin-bottom: 10px;
}

.quote-slider {
  color: #ffae42;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 40px;
  padding: 0 20px;
  max-width: 600px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quote-text {
  transition: all 0.5s ease;
}

/* Fade + Slide Animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.info-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
  background: #0e0e0e;
}

.box-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}

.box {
  background-color: #1c1c1c;
  padding: 25px;
  border-top: 4px solid transparent;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-width: 350px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: block;
  margin: 0 auto;
}

.box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.box h3 {
  margin-bottom: 10px;
  font-size: 2rem;
}

.box p {
  color: whitesmoke;
  font-size: 16px;
}

.orange {
  border-top-color: #ffae42;
  color: #ffae42;
}
.green {
  border-top-color: #3cb371;
  color: #3cb371;
}
.blue {
  border-top-color: #1e90ff;
  color: #1e90ff;
}
.red {
  border-top-color: #ff4c4c;
  color: #ff4c4c;
}

@media (max-width: 600px) {
  .box-container {
    padding: 0 8vw;
    gap: 14px;
  }
  .box {
    min-width: 84vw;
    max-width: 100vw;
    padding: 16px;
  }
}

</style>
