<template>
  <div
    class="fixed inset-0 flex justify-center items-center z-50"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-4">

      <h2 class="text-xl font-bold text-gray-800 mb-4">
        ยืนยันการฝาก-ถอน
      </h2>

      <p class="text-gray-600 mb-8">
        จำนวนเงิน
        <span class="text-gray-900 ml-2">
          {{ amount }} บาท
        </span>
      </p>

      <!-- ส่วนให้เลือกปุ่มว่าจะฝากหรือไม่ -->
      <div class="flex items-center space-x-6">
        <button
          @click="$emit('confirm')"
          class="bg-[#4a4a4a] hover:bg-black text-white px-6 py-2 rounded-md transition-colors font-medium"
        >
          ยืนยัน
        </button>

        <button
          @click="$emit('cancel')"
          class="text-blue-500 hover:text-blue-700 transition-colors font-medium"
        >
          ยกเลิก
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
// รับ props จากตัวแม่
const props = defineProps({
  //รอรับ amount เป็น Number ค่าเริ่มต้น 0
  amount: {
    type: Number,
    required: true,
    default: 0
  }
});

// กำหนดเหตุการณ์ที่จะส่งกลับ
defineEmits(['confirm', 'cancel']);
</script>
