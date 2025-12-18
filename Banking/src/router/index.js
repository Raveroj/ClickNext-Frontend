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

//ส่วนนี้มีไว้ให้ redirect routes โดยตรง !!!  router.beforeEach ให้รับค่าตามลำดับที่แน่นอน คือ to, from, next ลบสักอันไม่ได้
router.beforeEach((to, from, next) => {

  // ตรงนี้เอาไว้เช็คสถานะการ Login จาก LocalStorage ว่ามี isauth เป็น true ไหม ถ้าใช่ isAuthenticated จะเป็น true แล้วเอาไปเช็คในเงื่อนไขต่อ
  const isAuthenticated = localStorage.getItem("isAuth") === "true";

  // ถ้าไม่ได้ Login และพยายามจะไปหน้าอื่นที่ไม่ใช่ Login
  if (to.path !== '/' && !isAuthenticated) {
    next('/');
  }
  // ถ้า Login แล้วแต่จะพยายามกลับไปหน้า Login
  else if (to.path === '/' && isAuthenticated) {
    next('/withdraw-Deposit');
  }
  // ถ้าไม่เข้าเงื่อนไขข้างบนก็ไปหน้าอื่นเลย ถ้าไม่มีส่วนนี้ router beforeEach รอว่าต้องทำอะไร
  else {
    next();
  }
});

// to: หน้าปลายทางที่ผู้ใช้กำลังจะไป

// from: หน้าต้นทางที่ผู้ใช้เพิ่งจากมา

// next: ฟังก์ชันสำคัญที่ต้องเรียกใช้เพื่อบอก Router ว่าจะให้ทำอย่างไรต่อ:

// next(): อนุญาตให้ไปหน้าปลายทางได้

// next('/'): ไม่อนุญาต และสั่งให้เด้งไปที่หน้า Path ที่ระบุ (ในโค้ดของคุณคือหน้า Login)
export default router
