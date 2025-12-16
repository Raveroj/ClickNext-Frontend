import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',      // เมื่อเข้าหน้าแรก
      name: 'login',
      component: LoginView // ให้แสดงหน้านี้ (ซึ่งข้างในมี component Login อยู่)
    },
    {
      path: '/HomeView',      // เมื่อเข้าหน้าแรก
      name: 'HomeView',
      component: HomeView // ให้แสดงหน้านี้ 
    },

  ],
})

export default router
