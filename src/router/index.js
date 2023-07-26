import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FoodView from '@/views/FoodView.vue'

import Map from '@/views/Map.vue'

import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import ForgetPassword from '@/views/ForgetPasswordView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/food',
    name: 'food',
    component: FoodView
  },

  {
    path: '/map',
    name: 'map',
    component: Map
  },

  
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  
  {
    path: '/register',
    name: 'register',
    component: Register
  },

  
  {
    path: '/forget-password',
    name: 'forget-password',
    component: ForgetPassword
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
