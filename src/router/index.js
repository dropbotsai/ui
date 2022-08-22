import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Bot from '../components/Bots/Bot.vue'

const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/bots/:id',
    component: Bot,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
