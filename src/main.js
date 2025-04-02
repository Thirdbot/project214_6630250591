import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import Setting from './components/Setting.vue'
import PageBase from './components/Reuse/PageBase.vue'
import BaseRouterButton from './components/Reuse/BaseRouterButton.vue'
import './assets/main.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', component: Home ,alias: '/'},
    { path: '/about', component: About },
    { path: '/setting', component: Setting },
    { path: '/contact', component: Contact }
  ]
})

const app = createApp(App)
app.component('page-base', PageBase)
app.component('base-router',BaseRouterButton)
app.use(router)
app.mount('#app')
