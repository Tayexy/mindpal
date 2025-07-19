import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import AIAssistant from '../components/AIAssistant.vue'
import Newsfeed from '../components/Newsfeed.vue'
import Journal from '../components/Journal.vue'
import Todo from '../components/Todo.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/aiassistant', name: 'AIAssistant', component: AIAssistant },
  { path: '/newsfeed', name: 'Newsfeed', component: Newsfeed },
  { path: '/journal', name: 'Journal', component: Journal },
  { path: '/todo', name: 'Todo', component: Todo },
  { path: '/:pathMatch(.*)*', redirect: '/' },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
