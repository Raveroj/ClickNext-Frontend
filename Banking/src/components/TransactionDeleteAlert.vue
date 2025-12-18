<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div class="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-left">
      <h2 class="text-xl font-bold mb-4">ยืนยันการลบ</h2>

      <div class="space-y-1 mb-8 text-gray-700">
        <p>จำนวนเงิน{{ item.status }} {{ item.amount.toLocaleString() }} บาท</p>
        <p>ของวันที่ {{ item.datetime }}</p>
        <p>จากอีเมล {{ item.email }}</p>
      </div>

      <div class="flex items-center gap-4">
        <button
          @click="$emit('confirm')"
          class="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-black transition-colors"
        >
          ยืนยัน
        </button>
        <button
          @click="$emit('cancel')"
          class="text-blue-500 hover:underline"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object
});
defineEmits(['confirm', 'cancel']);
</script>
