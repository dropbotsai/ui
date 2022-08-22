import { createApp } from 'vue'
import router from './router'
import axios from 'axios'
import './style.css'
import App from './App.vue'

const BASE_URL = import.meta.env.VITE_BASE_URL

// axios defaults
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true
axios.defaults.headers['accept'] = 'application/json'

const app = createApp(App)

app.provide('BASE_URL', BASE_URL)
app.provide('axios', axios)
app.use(router).mount('#app')
