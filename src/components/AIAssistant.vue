<template>
    
    <header class="site-header">
      <marquee behavior="scroll" direction="left" scrollamount="5">
       Your all-in-one companion designed to streamline your day to day activities 
      </marquee>
    </header>
    <div class="content">
    <button class="back-button" @click="$router.go(-1)">Back</button>
  <div class="chat-page">
   
    <div class="chat-container">
      <div class="chat-header">
        <h1>AI Assistant</h1>
      </div>

      <!-- Chat Messages -->
      <div class="chat-messages" ref="chatMessages">
        <div 
          v-for="(msg, index) in messages" 
          :key="index" 
          :class="['message', msg.isUser ? 'user-message' : 'bot-message']"
        >
          <div class="message-content">{{ msg.text }}</div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="chat-input-container">
        <input 
          v-model="userText"
          type="text" 
          placeholder="Type your message..." 
          @keypress.enter.prevent="handleUserInput"
        />
        <button @click="handleUserInput">Send</button>
      </div>
    </div>
  </div>
  </div>
</template>




<script setup>
import { ref, nextTick } from 'vue'

const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

const messages = ref([])      // Stores all chat messages
const userText = ref('')      // User input
const chatMessages = ref(null)

function scrollToBottom() {
  nextTick(() => {
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight
  })
}

async function generateResponse(prompt) {
  if (!API_KEY) {
    return "AI is not available. Please set your API key.";
  }
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    if (!response.ok) {
      return "AI service error. Please try again later.";
    }
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";
  } catch (err) {
    return "Network error. Please check your connection or try again later.";
  }
}

async function handleUserInput() {
  if (!userText.value.trim()) return
  const text = userText.value
  messages.value.push({ text, isUser: true })
  userText.value = ''
  scrollToBottom()

  // Show "typing..." placeholder
  const botIndex = messages.value.push({ text: '...', isUser: false }) - 1

  try {
    const botReply = await generateResponse(text)
    messages.value[botIndex].text = botReply
  } catch (error) {
    messages.value[botIndex].text = "Sorry, I couldn't respond. Try again."
    console.error(error)
  } finally {
    scrollToBottom()
  }
}
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

.content{
 background-color: #1a1a1a;
}
.chat-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
 
  color: #e0e0e0;
  padding: 0 10px;
  box-sizing: border-box;
}

.chat-container {
  width: 90%;
  max-width: 800px;
  height: 90vh;
  background: #1c1c1c;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.chat-header {
  background-color: #2a2a2a;
  padding: 15px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #3a3a3a;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.message {
  display: flex;
  max-width: 75%;
  padding: 10px 15px;
  border-radius: 15px;
  line-height: 1.4;
  word-wrap: break-word;
  animation: fadeIn 0.2s ease-in-out;
  font-size: 1rem;
}

.user-message {
  align-self: flex-end;
  background-color: orange;
  color: #fff;
  border-bottom-right-radius: 0;
}

.bot-message {
  align-self: flex-start;
  background-color: green;
  color: #e0e0e0;
  border-bottom-left-radius: 0;
}

.chat-input-container {
  display: flex;
  padding: 15px;
  background-color: #2a2a2a;
  border-top: 1px solid #3a3a3a;
  gap: 10px;
}

.chat-input-container input {
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background-color: #3a3a3a;
  color: #e0e0e0;
  font-size: 1rem;
  outline: none;
  min-width: 0;
}

.chat-input-container button {
  margin-left: 0;
  padding: 10px 20px;
  background-color: red;
  border: none;
  border-radius: 20px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.chat-input-container button:hover {
  background-color: #3a7bc8;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #4a4a4a;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #5a5a5a;
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

/* Responsive styles */
@media (max-width: 1024px) {
  .chat-container {
    max-width: 98vw;
    height: 85vh;
  }
  .chat-messages {
    padding: 12px;
  }
}

@media (max-width: 700px) {
  .chat-container {
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  .chat-header {
    padding: 10px;
    font-size: 1.1rem;
  }
  .chat-messages {
    padding: 8px;
    font-size: 0.98rem;
  }
  .message {
    font-size: 0.98rem;
    padding: 8px 10px;
    max-width: 90%;
  }
  .chat-input-container {
    padding: 8px;
    gap: 5px;
  }
  .chat-input-container input {
    font-size: 0.98rem;
    padding: 8px 10px;
  }
  .chat-input-container button {
    padding: 8px 12px;
    font-size: 0.98rem;
  }
}

@media (max-width: 500px) {
  .chat-container {
    height: 100vh;
    min-width: 0;
  }
  .chat-header {
    font-size: 1rem;
    padding: 7px;
  }
  .chat-messages {
    padding: 4px;
    font-size: 0.95rem;
  }
  .message {
    font-size: 0.95rem;
    padding: 6px 6px;
    max-width: 98%;
  }
  .chat-input-container {
    padding: 4px;
    gap: 3px;
  }
  .chat-input-container input {
    font-size: 0.95rem;
    padding: 6px 6px;
  }
  .chat-input-container button {
    padding: 6px 8px;
    font-size: 0.95rem;
  }
}
</style>
