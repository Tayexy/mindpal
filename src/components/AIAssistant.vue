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

const messages = ref([])
const userText = ref('')
const chatMessages = ref(null)

function scrollToBottom() {
  nextTick(() => {
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight
  })
}

// Call your serverless API
async function generateResponse(prompt) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
    if (!response.ok) {
      return 'AI service error. Please try again later.'
    }
    const data = await response.json()
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond."
  } catch (err) {
    return 'Network error. Please check your connection or try again later.'
  }
}

async function handleUserInput() {
  if (!userText.value.trim()) return
  const text = userText.value
  messages.value.push({ text, isUser: true })
  userText.value = ''
  scrollToBottom()

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
/* Keep your existing CSS styles */
</style>
