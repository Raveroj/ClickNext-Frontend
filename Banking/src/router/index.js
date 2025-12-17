import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/WithdrawView.vue'
import WithdrawView from '../views/WithdrawView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',      // เมื่อเข้าหน้าแรก
      name: 'login',
      component: LoginView // ให้แสดงหน้านี้ (ซึ่งข้างในมี component Login อยู่)
    },
    {
      path: '/Withdraw-Deposit',      // เมื่อเข้าหน้าแรก
      name: 'Withdraw-Deposit',
      component: WithdrawView // ให้แสดงหน้านี้
    },

  ],
})

export default router
