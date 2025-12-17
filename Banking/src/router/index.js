import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import WithdrawView from '../views/WithdrawView.vue'
import TransactionView from '../views/TransactionView.vue' // สมมติว่ามีหน้าประวัติ

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/withdraw-Deposit',
      name: 'withdraw-Deposit',
      component: WithdrawView
    },
    {
      path: '/withdraw-Deposit',
      name: 'withdraw',
      component: WithdrawView
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionView
    }
  ]
})

// --- ย้ายมาไว้ข้างนอก routes ---
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuth") === "true";

  // ถ้าไม่ได้ Login และพยายามจะไปหน้าอื่นที่ไม่ใช่ Login
  if (to.path !== '/' && !isAuthenticated) {
    next('/');
  }
  // ถ้า Login แล้วแต่จะพยายามกลับไปหน้า Login
  else if (to.path === '/' && isAuthenticated) {
    next('/withdraw-Deposit');
  }
  else {
    next();
  }
});

export default router
