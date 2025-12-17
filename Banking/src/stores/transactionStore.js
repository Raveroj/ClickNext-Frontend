// stores/transactionStore.js
import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    // โหลดประวัติจาก LocalStorage ถ้าไม่มีให้เป็น Array ว่าง
    history: JSON.parse(localStorage.getItem('history')) || [],
    initialBalance: 1000000
  }),

  getters: {
    // คำนวณเงินคงเหลือจากประวัติทั้งหมด
    currentBalance(state) {
      return state.history.reduce((total, item) => {
        return item.status === 'ฝาก'
          ? total + Number(item.amount)
          : total - Number(item.amount);
      }, state.initialBalance);
    }
  },

  actions: {
    addTransaction(amount, type) {
      const email = localStorage.getItem("userEmail");
      const newRecord = {
        id: Date.now(),
        datetime: new Date().toLocaleString('th-TH'),
        amount: Number(amount),
        status: type === 'deposit' ? 'ฝาก' : 'ถอน',
        email: email
      };
      this.history.unshift(newRecord);
      this.save();
    },

    deleteTransaction(id) {
      this.history = this.history.filter(item => item.id !== id);
      this.save();
    },

    editTransaction(id, newAmount) {
      const record = this.history.find(item => item.id === id);
      if (record) {
        record.amount = Number(newAmount);
        this.save();
      }
    },

    save() {
      localStorage.setItem('history', JSON.stringify(this.history));
    }
  }
})
