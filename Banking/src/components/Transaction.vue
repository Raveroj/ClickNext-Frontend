<template>
  <Menu />
  <main class="mx-auto max-w-5xl mt-10 p-4">
    <h2 class="text-2xl font-bold mb-6 text-left">ประวัติการฝากถอนเงิน</h2>

    <div class="overflow-x-auto shadow-md rounded-lg" @click.self="$emit('cancel')">
      <table class="min-w-full bg-white text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 uppercase font-bold">
          <tr>
            <th class="px-6 py-4 border">DateTime</th>
            <th class="px-6 py-4 border">Amount</th>
            <th class="px-6 py-4 border text-center">Status</th>
            <th class="px-6 py-4 border">Email</th>
            <th class="px-6 py-4 border text-center">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="item in store.history" :key="item.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 border">{{ item.datetime }}</td>
            <td class="px-6 py-4 border font-bold">{{ item.amount.toLocaleString() }}</td>
            <td class="px-6 py-4 border text-center">
              <span :class="item.status === 'ฝาก' ? 'text-green-600' : 'text-red-600'">
                {{ item.status }}
              </span>
            </td>
            <td class="px-6 py-4 border text-gray-500">{{ item.email }}</td>
            <td class="px-6 py-4 border text-center space-x-2">
              <button @click="openEdit(item)" class="bg-gray-800 text-white px-3 py-1 rounded hover:bg-black">Edit</button>
              <button @click="confirmDelete(item.id)" class="border border-gray-300 px-3 py-1 rounded hover:bg-red-50 text-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="editModal" class="fixed inset-0   flex items-center justify-center p-4">
        <div class="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 class="text-lg font-bold mb-4">แก้ไขจำนวนเงิน</h3>
            <input type="number" v-model="editAmount" class="border w-full p-2 rounded mb-4">
            <div class="flex justify-end gap-2">
                <button @click="saveEdit" class="bg-black text-white px-4 py-2 rounded">ยืนยัน</button>
                <button @click="editModal = false" class="text-gray-500">ยกเลิก</button>
            </div>
        </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import Menu from "@/components/Menu.vue";
import { useTransactionStore } from "@/stores/transactionStore";

const store = useTransactionStore();
const editModal = ref(false);
const editAmount = ref(0);
const currentId = ref(null);

const openEdit = (item) => {
    currentId.value = item.id;
    editAmount.value = item.amount;
    editModal.value = true;
};

const saveEdit = () => {
    if(editAmount.value > 0 && editAmount.value <= 100000) {
        store.editTransaction(currentId.value, editAmount.value);
        editModal.value = false;
    } else {
        alert("กรุณากรอก 1 - 100,000 บาท");
    }
};

const confirmDelete = (id) => {
    if(confirm("คุณยืนยันที่จะลบรายการนี้ใช่หรือไม่?")) {
        store.deleteTransaction(id);
    }
};
</script>
